# query{BatchSwap,Join,Exit}

## Overview

In many scenarios, you might want to know how much X of TokenA you'll receive for Y of TokenB. Fortunately, Balancer has query functions to simulate transactions.

{% hint style="warning" %}
If you look on Etherscan (or similar), all three of the query functions will show up as "Write" functions. That is ok! You can still call these with `eth_call` to get numerical results without spending any gas.
{% endhint %}

## !⚠️! WARNING !⚠️!

### Be very careful if you call `query*` from a contract!!!

If you are using `queryBatchSwap`, `queryJoin`, or `queryExit` to calculate `limits`,  `maxAmountsIn`, or `minAmountsOut`, this is ONLY useful if you simulate these calls OUTSIDE of the transaction you end up making. You SHOULD NOT call these functions to calculate limits from a smart contract at transaction time.

There are valid use cases for calling these functions on chain, but **do not use them to determine limits**.

### Why?

Calculating these values ahead of time is useful for enforcing slippage tolerances to mitigate losses due to sandwich attacks. **If you are querying these values at execution time, you end up getting your values mid-sandwich!** This leaves you entirely vulnerable to the attacker's manipulation, and is as foolish as using a 100% slippage tolerance.

## Queries

{% hint style="info" %}
### Are you trying to calculate amounts for a pool that uses Phantom BPT?

**\*LinearPools** and **StablePhantomPools** do not have join or exit functionality since those are handled as swaps! For example, if you want to figure out how much `bb-a-USD` you'll get for an amount of `DAI`, you'll need to use `queryBatchSwap` on a trade route that swaps `DAI` for `bb-a-DAI` and then swaps `bb-a-DAI` for `bb-a-USD`.&#x20;
{% endhint %}

### `queryBatchSwap`

To calculate the inputs/outputs for a trade (you can specify given-in or given-out), you will use the `queryBatchSwap` function in the [`Vault`](../references/contracts/apis/the-vault.md#querybatchswap). This functionality is important if not crucial for calculating your limits when constructing your `batchSwap` arguments.

```
queryBatchSwap(
    SwapKind kind, 
    BatchSwapStep[] swaps, 
    IAsset[] assets, 
    FundManagement funds) 
returns (int256[] assetDeltas)
```

### `queryJoin`

To calculate amounts of BPT out and tokens in, you will use `queryJoin` in [`BalancerHelpers`](../references/valuing-balancer-lp-tokens/balancerhelpers.md#queryjoin). This functionality is important for calculating `maxAmountsIn` and/or `minBptOut` on joins

```
queryJoin(
    bytes32 poolId, 
    address sender, 
    address recipient, 
    JoinPoolRequest request)
returns (uint256 bptOut, uint256[] amountsIn)
```

### `queryExit`

To calculate amounts of BPT in and tokens out, you will use `queryExit` in [`BalancerHelpers`](../references/valuing-balancer-lp-tokens/balancerhelpers.md#queryexit). This functionality is important for calculating `minAmountsOut` and/or `maxBptIn` on exits.

```
queryExit(
    bytes32 poolId, 
    address sender, 
    address recipient, 
    ExitPoolRequest request)
returns (uint256 bptIn, uint256[] amountsOut)
```
