---
title: Joining a pool
order: 1
---
# How to join a pool using Balancer SDK?

Under the hood joining a pool is about sending your ERC20 tokens to the Vault where they are used as liquidity. In exchange for providing liquidity you will receive another ERC20 tokens representing a share in the pool. We call them balancer pool tokens, or BPTs in short. When you want to exit the pool you need to send BPT to the vault and in return you will receive pool tokens.

### Types of Pools in Balancer

Balancer offers various pool types, with two main joining methods:

* [Direct joins](#direct-joins)
* [Joining via swaps](#joining-via-swaps)

Pools, which contain nested pools, can only be joined through swaps. This guide will first cover direct join pools, then provide an example of joining a pool using a swap.

**Joining comes down to three steps:**

1. [Approving ERC20 tokens](#erc20-approvals) so the vault can use them on your behalf (needs to be done at least once for each token)
2. [Building a join transaction](#building-a-join-transaction) and estimating how many BPTs you will receive to protect yourself from getting rekt.
3. [Sending tokens to the vault](#send-tokens-to-the-pool-with-the-joinpool-call)

Let’s start with the project setup. Here is a complete example you can play with in replit:

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@balancer/joins?embed=true"></iframe>

In this example we are going to join wETH/wstETH stable pool on mainnet. SDK supports Polygon, Arbitrum and Goerli as well.

```javascript
import { BalancerSDK } from '@balancer-labs/sdk'

const balancer = new BalancerSDK({
  network: 1, // mainnet
  rpcUrl: 'https://rpc.ankr.com/eth'
});

const signer = balancer.provider.getSigner()

const poolId = '0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080'
const pool = balancer.pools.find(poolId)
```

## Prerequirements

### ERC20 Approvals

It's important to note that you can set a limit on the amount of tokens you approve for the contract to access. For example, if you own 100 tokens and only want to invest 50 of them in the pool, you can set the approval limit to 50. This will ensure that the contract can only access and move the approved amount of tokens, and not all of your assets.

> Balancer Vault is an audited contract, which means it has been thoroughly reviewed and tested for security. However, it's always better to be safe than sorry and set the approval safety limit to the amount of tokens you want to invest in the pool.

To approve the tokens you need to know their addresses and amounts you would like to invest with. For wETH and wstETH:

```javascript
// wETH
const tokens = [
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // wETH
  '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0'  // wstETH
]
const amounts = [
  parseEther('1'), // amount of wETH
  parseEther('1')  // amount of wstETH
]

const vault = balancer.contracts.vault

const approveVault = async (token, amount) =>
  ERC20(token, signer).approve(vault.address, amount)
``` 

## Direct joins

### Building a join transaction

`pool.buildJoin` handles building transaction payload which can be send to the provider. It takes following parameters:
```typescript
function buildJoin(
  address: string,   // address of the account joining the pool
  tokens:  string[], // token addresses joining the pool
  amounts: string[], // amounts in uint as string
  slippage: string   // in basis points
) => {
  to: string,           // address of the vault
  data: string,         // encoded transaction payload
  attributes: JoinPool, // decoded transaction attrs
  minBPTOut: string     // BPT out including slippage
}
```
#### Setting slippage

Setting `slippage`, also called "limits", is a way to protect yourself from potential losses when joining a pool. It means setting a minimum BPTs that you expect to receive when you join the pool. The vault will abort in case return amount is below it. It can be set as low as 0 when no discrepancy from the estimate is accepted.

#### Proportional join

While pool can be joined with any arbitrary amount, it is recommended to join with all the pool's tokens in exact proportions in order to minimize the price impact of the join.

>This method is particularly useful for joining pools with high relative liquidity, as it helps to minimize the potential for slippage, which can occur when join is changing token balances and at the same time their prices.

Use current pool token balances and from your wallet pick a token to calculate optimal complementary token amounts for.

```javascript
// Get optimal join amounts relative to `token`
const { tokens, amounts } = pool.calcProportionalAmounts(token, amount)
```
It's important to note that the token amounts in the pool may change over time as the pool's liquidity change. 

The following snippet shows how to check the expected returned BPT price impact before sending tokens to the Vault.

```javascript
const priceImpact = await pool.calcPriceImpact(
  amounts,
  minBPTOut,
  true // isJoin
)

const impactPercentage = (100 * priceImpact / 1e18).toFixed(2)
```

### Send tokens to the pool with the `joinPool` call

Building function returns to and data parameters which are all what's needed to send a transaction. Time between calling buildJoin and sending transaction should be minimal to avoid issues with outdated limits.

```javascript
const joinReceipt = await (
  await signer.sendTransaction({ to, data })
).wait()
```

joinReceipt will contain the logs confirming all the state changes in the vault.

## Joining via swaps

The method makes use of the Balancer relayer contract. This allows for the chaining of multiple swaps with a final join by using the output of one call as input in another. That way all operations are executed in a single transaction.

As an example let's join a pool where Stargate token is paired with balancer USD stable pool. We can join the pool directly only with STG or bbaUSD tokens. Suppose we only have DAI in our wallet. We can first swap DAI for the bbaUSD pool token and then join the Stargate pool using the output of that swap.

```javascript
const Relayer = balancer.relayer.constructor
const SWAP_RESULT_BBAUSD = Relayer.toChainedReference('1')

const swap = Relayer.encodeBatchSwap({
  swapType: 0, // exact amount in
  swaps: [
    {
      poolId: bbaDai,
      assetInIndex: 0,  // DAI
      assetOutIndex: 1, // bbaDAI
      amount,
      userData: '0x',
    },
    {
      poolId: bbaUSD,
      assetInIndex: 1,  // bbaDAI
      assetOutIndex: 2, // bbaUSD
      amount: '0',
      userData: '0x',
    },
  ],
  assets: [
    dai,
    bbaDAI,
    bbaUSD,
  ],
  funds: {
    fromInternalBalance: false,
    recipient: address,
    sender: address,
    toInternalBalance: true,
  },
  limits: [MaxInt256, '0', '0'], // +ve for max to send, -ve for min to receive
  deadline: `${Math.ceil(Date.now() / 1000) + 3600}`, // 1 hour from now
  value: '0',
  outputReferences: [{ index: 2, key: SWAP_RESULT_BBAUSD }]
});

const join = Relayer.encodeJoinPool({
  poolId,
  kind: 0,
  sender: address,
  recipient: address,
  joinPoolRequest: {
    assets: [usdAdd, stg],
    maxAmountsIn: [MaxInt256, MaxInt256], // TODO: show how limits can be set
    userData: defaultAbiCoder.encode(
      ['uint256', 'uint256[]', 'uint256'],
      [1, [SWAP_RESULT_BBAUSD, '0'], '0']
    ),
    fromInternalBalance: true,
  },
  value: '0',
  outputReference: '0',
})

const data = balancer.contracts.relayerV4.interface.encodeFunctionData('multicall', [
  [swap, join]
]);

const tx = await (await signer.sendTransaction({ to: relayer, data })).wait()
```

## Notable features

### Using native assets

Balancer allows for the use of native assets, such as ETH, as inputs for joining and exiting pools. For example, you can join any pool containing wETH by sending ETH and specifying "tokenIn" as `0x0000000000000000000000000000000000000000`
