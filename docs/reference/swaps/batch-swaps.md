---
order: 1
---

# Batch Swaps

## Batch Swap Overview

Balancer V2 allows powerful multi-hop swaps, or "batch swaps", which pull the best prices from all the pools registered with the Vault.

The Vault exposes the `batchSwap` function to allow multi-hop swaps with the the interface below.

```solidity
batchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds,
          int256[] limits,
          uint256 deadline) returns (int256[] assetDeltas)
```

Each struct which is explained below.

### BatchSwapStep struct

```solidity
struct BatchSwapStep {
    bytes32 poolId;
    uint256 assetInIndex;
    uint256 assetOutIndex;
    uint256 amount;
    bytes userData;
}
```

- `poolId`: The id of the pool to swap with.
- `assetInIndex`: The index of the token within `assets` which to use as an input of this step.
- `assetOutIndex`: The index of the token within `assets` which is the output of this step.
- `amount`: The meaning of `amount` depends on the value of `kind` which passed to the `batchSwap` function.
  - `GIVEN_IN`: The amount of tokens swapped into the pool in this step
  - `GIVEN_OUT`: The amount of tokens received from the pool in this step
- `userData`: Any additional data which the pool requires to perform the swap. This allows pools to have more flexible swapping logic in future - for all current Balancer pools this can be left empty.

::: tip Amounts for multi-hop swaps
When performing multi-hop swaps, it's not always possible to know the value of `amount` for a given step.

By setting `amount` to `0`, the vault will interpret this to use the full output of the previous hop.
:::

### FundManagement struct

The `FundManagement` struct defines where the input tokens for the first swap are coming from and where any tokens received from swaps should be sent. The `FundManagement` struct is defined as below.

```solidity
struct FundManagement {
    address sender;
    bool fromInternalBalance;
    address payable recipient;
    bool toInternalBalance;
}
```

- `sender`: The address from which tokens will be taken to perform the swap.
- `fromInternalBalance`: Whether the swap should use tokens owned by the `sender` which are already stored in the Vault.
- `recipient`: The address to which tokens will be sent to after the swap.
- `toInternalBalance`: Whether the tokens should be sent to the `recipient` or stored within their internal balance within the Vault.

For more information on internal balances see [Core Concepts](/concepts/vault/#internal-balances).

### BatchSwap function

```solidity
batchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds,
          int256[] limits,
          uint256 deadline) returns (int256[] assetDeltas)
```

- `kind`: The type of batch swap to perform - either "Out Given Exact In" or "In Given Exact Out."
- `assets`: An array of tokens which are used in the batch swap. This is referenced from within `swaps`
- `limits`: An array of maximum amounts of each `asset` to be transferred. For tokens going **in** to the Vault, the `limit` shall be a positive number. For tokens going **out** of the Vault, the `limit` shall be a negative number. If the `amount` to be transferred for a given asset is greater than its `limit`, the swap will fail with error `BAL#507: SWAP_LIMIT`.
  - **How do you determine what your `limits` should be?** If you want to compute `limits`, it is recommended to use `queryBatchSwap` and then [add a slippage tolerance](batch-swaps.md#adding-a-slippage-tolerance).
- `deadline`: The UNIX timestamp at which our swap must be completed by - if the transaction is confirmed after this time, the transaction will fail.

## `queryBatchSwap`

`queryBatchSwap` is an extremely useful function in the `Vault` contract. With `queryBatchSwap`, you can get the exact amounts for a given swap with the on-chain state. You can use these amounts to calculate input/output limits based on a slippage tolerance.

::: danger
You should **NOT** use `queryBatchSwap` to calculate limits from a smart contract that is executing a swap. **This will leave you vulnerable to sandwich attacks.**

You should only use `queryBatchSwap` **before** sending a `batchSwap` transaction, when calculating your `batchSwap` arguments off-chain.
:::

Calling `queryBatchSwap` is very similar to calling [`batchSwap`](batch-swaps.md#batchswap-function) itself, just without the `limit` and `deadline` arguments.

```solidity
queryBatchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds)
          returns (int256[] assetDeltas)
```

::: info
To use `queryBatchSwap`, you must use `eth_call`.

You may notice that `queryBatchSwap` shows up on Etherscan as a `write` function, but this is simply due to the fact that the function fully executes a `batchSwap` before reverting.
:::

### Adding a Slippage Tolerance

Once you have received your `assetDeltas` from calling [`queryBatchSwap`](batch-swaps.md#querybatchswap), you can calculate `limits` for a `batchSwap` by applying your slippage tolerance.

#### `GIVEN_IN`

To perform a `GIVEN_IN` `batchSwap` and apply a 1% slippage tolerance, multiply the negative `assetDeltas` by 0.99. Positive amounts do not need to be modified since the amount going into the pool is known.

#### `GIVEN_OUT`

To perform a `GIVEN_OUT` `batchSwap` and apply a 1% slippage tolerance, multiply the positive `assetDeltas` by 1.01. Negative amounts do not need to be modified since the amount being received from the pool is known.

## Multi-hop Examples

In these examples, token A is being swapped for token C, through the intermediate token B (illustrated as A->B->C). Tokens A, B, and C could be in different pools, or in the same pool.

"Given In" means the caller knows the exact amount of the incoming token, and is asking the pool to calculate the tokenOut amount. The opposite is true of "Given Out."

### Example 1 ("Given In")

The first case is a "Given In" Batch Swap: an user has 10 A and wants to know how much C they can get for it. This can be accomplished with a two-step multi-hop swap: A for B, then B for C.

Since 10 A to start is known, the swap kind is `GIVEN_IN`, and the amount for the first swap is 10. The first swap will produce some output amount of B, but the exact amount of B isn't known in advance.

Since B is unknown when constructing the multi-hop, the amount in the second swap is set to 0, which instructs the multi-hop logic to use the calculated output amount from the first swap as input to the second.

| Parameter | Swap 1 | Swap 2 |
| --------- | ------ | ------ |
| Amount    | 10     | 0      |
| Token In  | A      | B      |
| Token Out | B      | C      |

If the result of the first swap is 5 B. The amount of the second swap is then set to 5 in the Vault logic, and the second swap produces some output amount of C. (The caller would then validate the overall swap by comparing this value to the minimum amountOut of C.)

### Example 2 ("Given Out")

The second case is a “Given Out” Batch Swap: an user wants to receive 20 C, and wants to know how much A that will cost. Here the swaps happen “backwards,” first swapping C for B, then B for A.

Since a 20 C output is known, the swap kind is `GIVEN_OUT`, and the amount for the first swap is 20. The first swap will produce some require input amount of token B, but as before, the exact amount is not known in advance. So again, the amount of the second swap is set to zero.

After the first swap, the amount of B will be known, and the zero amount in the second swap instructs the multi-hop logic to substitute the calculated amount from the first swap. Since this is a “Given In” Batch Swap, the result will be the required input amount of token A. (The caller would then validate the overall swap by comparing this value to the maximum amountIn of A.)

| Parameter | Swap 1 | Swap 2 |
| --------- | ------ | ------ |
| Amount    | 20     | 0      |
| Token Out | C      | B      |
| Token In  | B      | A      |

So in both cases, setting the amount of a swap within a batch to zero causes the multi-hop logic to substitute the calculated amount from the previous swap. If the batch swap kind is “Given In,” the calculated amount will be the “output” of the previous step. If the batch swap kind is “Given Out,” the calculated amount will be the “input” from the previous step.

Of course, the amount of the first swap in a batch cannot be zero. The batch swap must begin with a known piece of data: for a "Given In," the input amount; or for a "Given Out," the output amount.

## Parallel Examples

As described in the examples above, batch swaps are most commonly used for multi-hop swaps. Although much less common, it is also possible to use batch swaps for a set of unrelated swaps to be performed in parallel.

### Example 3 (Parallel Single Swaps - "Given In")

In this case, the input amount of each swap must be provided explicitly. In this `GIVEN_IN` batch swap, the user will supply 99 A, 42 C, and 5 E, and will be returned computed amounts of B, D, and F.

| Parameter | Swap 1 | Swap 2 | Swap 3 |
| --------- | ------ | ------ | ------ |
| Amount    | 99     | 42     | 5      |
| Token In  | A      | C      | E      |
| Token Out | B      | D      | F      |

### Example 4 (Combined Swaps - "Given Out")

And of course, it is also possible to combine multi-hop swaps and single-hop swaps in parallel. This example performs two swaps in `GIVEN_OUT` fashion: A->B->C->D and E->F. The final outputs will be 100 D and 50 F, if the user can supply the computed amounts of A and E.

| Parameter | Swap 1 | Swap 2 | Swap 3 | Swap 4 |
| --------- | ------ | ------ | ------ | ------ |
| Amount    | 100    | 0      | 0      | 50     |
| Token Out | D      | C      | B      | F      |
| Token In  | C      | B      | A      | E      |
