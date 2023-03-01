---
title: Exiting a pool
order: 2
---

# How to exit a pool using Balancer SDK?

Balancer Pool Tokens (BPT) grant you access to a share of the pool's underlying tokens. There are three ways you can redeem them:

1. [Single token exit](#single-token-exit) - receive the full value in a single token.
2. [Proportional exit](#proportional-exit) - receive an equal portion of all the underlying.
3. [Exact token amounts](#exact-token-amounts) - choose a specific amount of the underlying tokens from the pool and burn only the required amount of BPT.

> Note: Use swaps to exit boosted pools and composable stable pools. [Explaination](#boosted-pools)

## Exit strategies

Set up the SDK and get the pool with liquidity service methods as `pool` ([methods interface](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts/#L321))

```javascript
import { BalancerSDK } from '@balancer-labs/sdk';

const balancer = new BalancerSDK({
  network: 1, // mainnet
  rpcUrl: 'https://rpc.ankr.com/eth',
});

// stETH pool
const poolId =
  '0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080';

// Get the SDK pool with service methods
const pool = await balancer.pools.find(poolId);
```

### Single token exit

Receive an equal portion of all the underlying. Use `buildExitExactBPTIn` method.

```javascript
/**
 * Builds an exit calldata and returns params ready for
 * ethers sendTransaction call.
 *
 * @param address   user address exiting the pool
 * @param bptIn     amount of BPT redeemed
 * @param slippage  acceptable slippage in bsp, eg. 100 = 1%
 * @param unwrap    optional, unwraps wrapped native tokens upon exit
 * @param token     optional, address of a single token to exit to
 *
 * @returns Object with ethers sendTransaction params
 *  {
 *    to: string
 *    data: string
 *  }
 */
const { to, data } = pool.buildExitExactBPTIn(
  address,  // user address exiting the pool
  bpt,      // amount of BPT redeemed
  slippage, // acceptable slippage in bsp, eg. 100 = 1%
  false,    // optional, should unwrap native tokens
  weth      // optional, address of a single token to exit to
))
```

### Proportional exit

Receive an equal portion of all the underlying tokens. Use `buildExitExactBPTIn` and skip last parameter used for single token exits.

```javascript
const { to, data } = pool.buildExitExactBPTIn(
  address,  // user address exiting the pool
  bpt,      // amount of BPT redeemed
  slippage, // acceptable slippage in bsp, eg. 100 = 1%
  false,    // optional, should unwrap native tokens
))
```

### Exact token amounts

Choose a specific amount of the underlying tokens from the pool and burn only the required amount of BPT. Use `buildExitExactTokensOut` method.

```javascript
const amt = parseEther('1').toString()
const { to, data } = pool.buildExitExactTokensOut(
  address,        // user address exiting the pool
  [weth, wsteth], // possible to exit with any token from the pool and native ETH when pool has WETH
  [amt, amt],     // corresponding token amounts in wad strings
  slippage,       // acceptable slippage in bsp, eg. 100 = 1%
))
```

Finally broadcast transaction using your signer.

```javascript
const signer = balancer.provider.getSigner();

const exitReciept = await (await signer.sendTransaction({ to, data })).wait();
```

## Boosted pools

Exit boosted pools by swapping BPT for the underlying asset. As an example, when exiting the Stargate pool composed of STG and bbaUSD, you can exit to STG or bbaUSD BPT, but you can as well exit to DAI, USDC, or USDT as they are all part of the bbaUSD pool.

To do that in one transaction we can use the balancer relayer contract where it's possible to use outputs from one action as inputs in the other action. For example to exit to DAI, first exit the weighted pool to bbaUSD and then swap to bbaDAI, and finally to DAI.

![](/images/exit-swap-diagram.png)

Balancer Vault actions accept two types of amounts: wad strings and chained references. Chained references allow a specific output of an action to be labeled so it can be used later as an input. This enables multiple actions to be linked together without knowing the intermediate token amounts. For example, the exit amount from an STG pool can be used as an input for a swap in the bbaUSD pool. To create a chained reference, use `Relayer.toChainReference` with any string as long as it's unique in a single call.

### Example script

```javascript
import { Relayer, WeightedPoolEncoder } from '@balancer-labs/sdk';

// Stargate bbaUSD BPT address
const stgBptAddress = '0x4ce0bd7debf13434d3ae127430e9bd4291bfb61f';

// Fetch BPT amount
const amount = await balancer.contracts
  .ERC20(stgBptAddress, signer)
  .balanceOf(address)
  .then(b => b.toString());

// Setup relayer
const relayer = balancer.contracts.relayerV4.address;
// Authorise relayer to spend your vault balance
// needs to be done only once
await balancer.contracts.vault
  .connect(signer)
  .setRelayerApproval(address, relayer, true);

// Define chained reference for using the exit amount as an input in a swap
const EXIT_BBAUSD = Relayer.toChainedReference('1');

// Encode the exit action by specify type of the exit and the amount
// exitExactBPTInForOneTokenOut(amountIn, indexOf a tokenOut)
const userData = WeightedPoolEncoder.exitExactBPTInForOneTokenOut(amount, 0);

// Build exit
const exit = Relayer.encodeExitPool({
  poolId,
  poolKind: 0, // 0 =  only Weighted Pool is supported, https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/VaultActions.sol/#L105
  sender: address,
  recipient: address,
  exitPoolRequest: {
    assets: [usdAdd, stg],
    minAmountsOut: ['0', '0'],
    userData,
    toInternalBalance: true,
  },
  outputReferences: [{ index: 0, key: EXIT_BBAUSD }],
});

// Build swap
const swap = Relayer.encodeBatchSwap({
  swapType: 0,
  swaps: [
    {
      poolId: bbaUSD,
      assetInIndex: 0, // bbaUSD
      assetOutIndex: 1, // bbaDAI
      amount: EXIT_BBAUSD,
      userData: '0x',
    },
    {
      poolId: bbaDai,
      assetInIndex: 1, // bbaDAI
      assetOutIndex: 2, // DAI
      amount: '0', // 0 amount means the vault batchswap will use the previous step's output
      userData: '0x',
    },
  ],
  assets: [usdAdd, daiAdd, dai],
  funds: {
    fromInternalBalance: true,
    recipient: address,
    sender: address,
    toInternalBalance: false,
  },
  limits: [MaxInt256, '0', '0'], // +amount for max to send, -amount for min to receive
  deadline: `${Math.ceil(Date.now() / 1000) + 3600}`, // 1 hour from now
  value: '0',
  outputReferences: [],
});

// Query to make sure multicall is passing
const staticCall = await balancer.contracts.relayerV4
  .connect(signer)
  .callStatic.multicall([exit, swap]);

const data = balancer.contracts.relayerV4.interface.encodeFunctionData(
  'multicall',
  [[exit, swap]]
);

const tx = await (await signer.sendTransaction({ to: relayer, data })).wait();
```

### How to check limits?

TODO: Query to check how many tokens will be returned by the vault and set limits before sending transaction.
