---
title: Joining a pool
order: 1
---
# How to join a pool using Balancer SDK?

Under the hood joining a pool is about depositing your ERC20 tokens to the Vault where they are used as liquidity. In exchange for providing liquidity you will receive another ERC20 tokens representing a share in the pool. We call them balancer pool tokens, or BPTs in short. When you want to exit the pool you need to send BPT to the vault and in return you will receive pool tokens.

### Types of Pools in Balancer

Balancer offers various pool types, with two main joining methods:

* [Direct joins](#direct-joins)
* [Joining via swaps](#joining-via-swaps)

Pools, which contain nested pools, can only be joined through swaps. This guide will first cover direct join pools, then provide an example of joining a pool using a swap.

**Joining comes down to three steps:**

1. [Approving ERC20 tokens](#erc20-approvals) so the vault can use them on your behalf (needs to be done at least once for each token)
2. [Building a join transaction](#building-a-join-transaction) and estimating how many BPTs you will receive to protect yourself from getting rekt.
3. [Send a join transaction](#send-join-transaction-with-the-joinpool-call)

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

ERC20 approvals - Balancer vault needs to be approved to use deposited tokens as liquidity.

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

Setting `slippage`, also called "limits", is a way to protect yourself from potential losses when joining a pool. It means setting a minimum BPTs that you expect to receive when you join the pool. The vault will abort in case return amount is below it.

#### Proportional join

While pool can be joined with any arbitrary amount, it is recommended to join with all the pool's tokens in exact proportions in order to minimize the price impact of the join.

>This method is particularly useful for providing relatively high liquidity compared to the current pool's liquidity. It helps to minimize the slippage, which occurs when join is changing individual token balances and at the same time their prices.

Use current pool token balances and from your wallet pick a token to calculate optimal complementary token amounts for.

```javascript
// Out of the tokens in the pool, you pick one and set an amount.
// The helper will calculate the proportional amounts for the remaining tokens in the pool.
const { tokens, amounts } = pool.calcProportionalAmounts(token, amount)
```
It's important to note that the token amounts in the pool may change over time as the pool's liquidity change. 

The following snippet shows how to check the expected returned BPT price impact before depositing tokens to the Vault.

```javascript
const priceImpact = await pool.calcPriceImpact(
  amounts,
  minBPTOut,
  true // isJoin
)

const impactPercentage = formatEther( priceImpact.mul(100) )
```

### Send join transaction with the `joinPool` call

Building function returns to and data parameters which are all what's needed to send a transaction. Time between calling buildJoin and sending transaction should be minimal to avoid issues with outdated limits.

```javascript
const joinReceipt = await (
  await signer.sendTransaction({ to, data })
).wait()
```

joinReceipt will contain the logs confirming all the state changes in the vault.

## Joining via swaps

Balancer relayer contract allows to combine swaps and joins in a single transaction. This method is particulary useful for joining a pool containing a boosted pool, for example bbaUSD, because it makes possible to join with any bbaUSD's underlying asset.

As an example let's join the Stargate pool with DAI. First step is to swap DAI to bbaDAI to bbaUSD pool token, and then join using the output of that swap.

![](./2023-02-03-15-13-29.png)

Balancer Vault actions accept two types of amounts: wad strings and chained references. Chained references allow a specific output of an action to be labeled so it can be used later as an input. This enables multiple actions to be linked together without knowing the intermediate token amounts. For example, the swap output with a bbaUSD amount can be used as an input for a join pool. To create a chained reference, use `Relayer.toChainReference` with any string as long as it's unique in a single call.

```javascript
import { Relayer, WeightedPoolEncoder } from '@balancer-labs/sdk'

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
      amount: '0',      // 0 amount means the vault batchswap will use the previous step's output
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

// Encode the join action by specify type of the join and the amount as a chained reference from a swap
// exitExactBPTInForOneTokenOut(amountIn, indexOf a tokenOut)
const userData = WeightedPoolEncoder.joinExactTokensInForBPTOut([SWAP_RESULT_BBAUSD, '0'], '0')

const join = Relayer.encodeJoinPool({
  poolId,
  kind: 0,
  sender: address,
  recipient: address,
  joinPoolRequest: {
    assets: [usdAdd, stg],
    maxAmountsIn: [MaxInt256, MaxInt256], // TODO: show how limits can be set
    userData,
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

Balancer allows for the use of native assets, such as ETH, as inputs for joining and exiting pools. For example, you can join any pool containing wETH by depositing ETH and specifying "tokenIn" as `0x0000000000000000000000000000000000000000`
