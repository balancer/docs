---
title: Exiting a pool
order: 2
---
# How to exit a pool using Balancer SDK?

Exiting a Balancer pool is done by sending Balancer pool tokens (BPT) to the pool. In exchange, you receive the underlying tokens that make up the pool. For example, if the pool is stETH, composed of wstETH and wETH tokens, there are three exit options:

1. Exit the exact amount of BPT to the pool:
    a. Receive all underlying tokens wstETH and wETH.
    b. Receive the entire value in a single token, eg: wETH
2. Request specific amounts of tokens from the pool and exit only what is required.

> Note: Use swaps to exit boosted pools and composable stable pools.

### Example

```javascript
import { BalancerSDK } from '@balancer-labs/sdk'

const balancer = new BalancerSDK({
  network: 1, // mainnet
  rpcUrl: 'https://rpc.ankr.com/eth'
});

const signer = balancer.provider.getSigner()

// stETH pool
const poolId = '0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080'
const pool = balancer.pools.find(poolId)

const { to, data } = pool.buildExitExactBPTIn(
  address,
  bpt,
  slippage,
  false, // optional, should unwrap native tokens
  weth   // optional, exit to this asset only
))

const exitReciept = await (
  await signer.sendTransaction({ to, data })
).wait()
```

When exiting with all underlying tokens in proportional amounts
```javascript
const { to, data } = pool.buildExitExactBPTIn(
  address,
  bpt,
  slippage,
  false, // optional, should unwrap native tokens
))
```

When exiting to a single token.
```javascript
const { to, data } = pool.buildExitExactBPTIn(
  address,
  bpt,
  slippage,
  false, // optional, should unwrap native tokens
  weth   // optional, exit to this asset only
))
```

When exiting to specific amounts.
```javascript
const { to, data } = pool.buildExitExactTokensOut(
  address,
  [weth, wsteth], // possible to exit with any token from the pool and native ETH when pool has WETH
  ['0.1', '0.1'].map(parseEther).map(a => a.toString()), // weth, wsteth
  slippage,
))
```

### Pools with premined BPT

Exit boosted pools or weighted pools paired with boosted pools by taking advantage of swaps to reach the boosted underlying asset. As an example, when exiting the Stargate pool, you can exit to DAI, USDC, or USDT as they are all part of the boosted pool. To exit to DAI, use a relayer first to exit the weighted pool, then swap bbaUSD to bbaDAI, and finally to DAI.

```javascript
// Stargate BPT address
const bptAddress = '0x4ce0bd7debf13434d3ae127430e9bd4291bfb61f'

// Fetch BPT amount
const amount = await balancer.contracts.ERC20(bptAddress, signer).balanceOf(address).then(b => b.toString())

// Setup relayer
const Relayer = balancer.relayer.constructor
const relayer = balancer.contracts.relayerV4.address
// Authorise relayer to spend your vault balance
// needs to be done only once
await balancer.contracts.vault.connect(signer).setRelayerApproval(address, relayer, true)

// Build exit
const EXIT_BBAUSD = Relayer.toChainedReference('1')

const exit = Relayer.encodeExitPool({
  poolId,
  poolKind: 0, // 0 =  only Weighted Pool is supported
  sender: address,
  recipient: address,
  exitPoolRequest: {
    assets: [usdAdd, stg],
    minAmountsOut: ['0', '0'],
    userData: defaultAbiCoder.encode(
      ['uint256', 'uint256', 'uint256'],
      [0, amount, '0'] // kind, amount, token index
    ),
    toInternalBalance: true,
  },
  outputReferences: [{ index: 0, key: EXIT_BBAUSD }],
})

// Build swap
const swap = Relayer.encodeBatchSwap({
  swapType: 0,
  swaps: [
    {
      poolId: bbaUSD,
      assetInIndex: 0,  // bbaUSD
      assetOutIndex: 1, // bbaDAI
      amount: EXIT_BBAUSD,
      userData: '0x',
    },
    {
      poolId: bbaDai,
      assetInIndex: 1,  // bbaDAI
      assetOutIndex: 2, // DAI
      amount: '0',
      userData: '0x',
    }
  ],
  assets: [
    usdAdd,
    daiAdd,
    dai,
  ],
  funds: {
    fromInternalBalance: true,
    recipient: address,
    sender: address,
    toInternalBalance: false,
  },
  limits: [MaxInt256, '0', '0'], // +ve for max to send, -ve for min to receive
  deadline: `${Math.ceil(Date.now() / 1000) + 3600}`, // 1 hour from now
  value: '0',
  outputReferences: []
});

// Query to make sure multicall is passing
const staticCall = await balancer.contracts.relayerV4.connect(signer).callStatic.multicall([exit, swap]);

const data = balancer.contracts.relayerV4.interface.encodeFunctionData('multicall', [
  [exit, swap]
]);

const tx = await (await signer.sendTransaction({ to: relayer, data })).wait()
```
