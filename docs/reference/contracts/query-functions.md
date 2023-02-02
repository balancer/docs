# Query Functions

## Overview

In many scenarios, you might want to know how much X of TokenA you'll receive for Y of TokenB. Fortunately, Balancer has query functions to simulate transactions.

::: warning
If you look on Etherscan (or similar), all three of the query functions will show up as "Write" functions. That is ok! You can still call these with `eth_call` to get numerical results without spending any gas.
:::

::: danger Be very careful if you call a query function from a contract!!!

If you are using `queryBatchSwap`, `queryJoin`, or `queryExit` to calculate `limits`, `maxAmountsIn`, or `minAmountsOut`, this is ONLY useful if you simulate these calls OUTSIDE of the transaction you end up making. You SHOULD NOT call these functions to calculate limits from a smart contract at transaction time.

There are valid use cases for calling these functions on chain, but **do not use them to determine limits**.
:::

### Why?

Calculating these values ahead of time is useful for enforcing slippage tolerances to mitigate losses due to sandwich attacks. **If you are querying these values at execution time, you end up getting your values mid-sandwich!** This leaves you entirely vulnerable to the attacker's manipulation, and is as foolish as using a 100% slippage tolerance.

## Queries

::: info Calculate amounts for a nested

**Composable Stable Pools** or **Boosted Pools** do not have join or exit functionality since those are handled as swaps! For example, if you want to figure out how much `bb-a-USD` you'll get for an amount of `DAI`, you'll need to use `queryBatchSwap` on a trade route that swaps `DAI` for `bb-a-DAI` and then swaps `bb-a-DAI` for `bb-a-USD`.
:::

### `queryBatchSwap`

To calculate the inputs/outputs for a trade (you can specify given-in or given-out), you will use the `queryBatchSwap` function in the [`Vault`](/reference/contracts/apis/vault.md#querybatchswap). This functionality is important if not crucial for calculating your limits when constructing your `batchSwap` arguments.

```solidity
queryBatchSwap(
    SwapKind kind,
    BatchSwapStep[] swaps,
    IAsset[] assets,
    FundManagement funds)
returns (int256[] assetDeltas)
```

### `queryJoin`

To calculate amounts of BPT out and tokens in, you will use `queryJoin` in [`BalancerHelpers`](/reference/contracts/apis/balancer-helpers.md#queryjoin). This functionality is important for calculating `maxAmountsIn` and/or `minBptOut` on joins

```solidity
queryJoin(
    bytes32 poolId,
    address sender,
    address recipient,
    JoinPoolRequest request)
returns (uint256 bptOut, uint256[] amountsIn)
```

### `queryExit`

To calculate amounts of BPT in and tokens out, you will use `queryExit` in [`BalancerHelpers`](/reference/contracts/apis/balancer-helpers.md#queryexit). This functionality is important for calculating `minAmountsOut` and/or `maxBptIn` on exits.

```solidity
queryExit(
    bytes32 poolId,
    address sender,
    address recipient,
    ExitPoolRequest request)
returns (uint256 bptIn, uint256[] amountsOut)
```
