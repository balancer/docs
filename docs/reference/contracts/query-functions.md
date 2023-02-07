# Query Functions

## Overview

`BalancerQueries` is a helper contract to provide quotes for common interactions like swaps / joins / exits without submitting a transaction.

Deployed at <span class="address-link">0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5</span> on all chains.

::: warning Etherscan
Even though Etherscan labels the query functions as write methods, they can be read through a static `eth_call`. This is due to nuances in how the query is crafted.
:::

::: danger Don't use onchain queries

If you are using `queryBatchSwap`, `queryJoin`, or `queryExit` to calculate `limits`, `maxAmountsIn`, or `minAmountsOut`, this is ONLY useful if you simulate these calls OUTSIDE of the transaction you end up making. You SHOULD NOT call these functions to calculate limits from a smart contract at transaction time.

There are valid use cases for calling these functions on chain, but **do not use them to determine limits**.
:::

Each query method has a section below. For reference, this snippet contains common structs / types used.

```solidity
enum SwapKind { GIVEN_IN, GIVEN_OUT }

struct SingleSwap {
    bytes32 poolId;
    SwapKind kind;
    IAsset assetIn;
    IAsset assetOut;
    uint256 amount;
    bytes userData; // 0x for most swaps
}

struct FundManagement {
    address sender;
    bool fromInternalBalance;
    address payable recipient;
    bool toInternalBalance;
}

struct JoinPoolRequest {
    address[] assets,
    uint256[] maxAmountsIn,
    bytes userData,
    bool fromInternalBalance
}

struct ExitPoolRequest {
    address[] assets,
    uint256[] minAmountsOut,
    bytes userData,
    bool toInternalBalance
}
```

## Queries

::: info Nested Pools

**Composable Stable Pools** or **Boosted Pools** do not have join or exit functionality since those are handled as swaps! For example, if you want to figure out how much `bb-a-USD` you'll get for an amount of `DAI`, you'll need to use `queryBatchSwap` on a trade route that swaps `DAI` for `bb-a-DAI` and then swaps `bb-a-DAI` for `bb-a-USD`.
:::

### `querySwap`

```solidity
querySwap(
    IVault.SingleSwap memory singleSwap,
    IVault.FundManagement memory funds)
returns (uint256)
```

### `queryBatchSwap`

```solidity
queryBatchSwap(
    SwapKind kind,
    BatchSwapStep[] swaps,
    IAsset[] assets,
    FundManagement funds)
returns (int256[] assetDeltas)
```

### `queryJoin`

```solidity
queryJoin(
    bytes32 poolId,
    address sender,
    address recipient,
    JoinPoolRequest request)
returns (uint256 bptOut, uint256[] amountsIn)
```

### `queryExit`

```solidity
queryExit(
    bytes32 poolId,
    address sender,
    address recipient,
    ExitPoolRequest request)
returns (uint256 bptIn, uint256[] amountsOut)
```
