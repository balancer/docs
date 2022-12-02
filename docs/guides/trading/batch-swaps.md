# Batch Swaps

## Overview

Balancer V2 allows powerful multi-hop trades, or "batch swaps", which pull the best prices from all the pools registered with the Vault.

The Vault exposes the `batchSwap` function to allow multi-hop trades with the the interface below.

```solidity
batchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds,
          int256[] limits,
          uint256 deadline) returns (int256[] assetDeltas)
```

To simplify the inputs to this function, we have grouped related fields into a number of structs which are explained below.

### Struct

```solidity
struct BatchSwapStep {
    bytes32 poolId;
    uint256 assetInIndex;
    uint256 assetOutIndex;
    uint256 amount;
    bytes userData;
}
```

* `poolId`: The id of the pool to trade with.
* `assetInIndex`: The index of the token within `assets` which to use as an input of this step.
* `assetOutIndex`: The index of the token within `assets` which is the output of this step.
* `amount`: The meaning of `amount` depends on the value of `kind` which passed to the `batchSwap` function.
  * `GIVEN_IN`: The amount of tokens we are sending to the pool in this step.
  * `GIVEN_OUT`: The amount of tokens we want to receive from the pool in this step.
* `userData`: Any additional data which the pool requires to perform the swap. This allows pools to have more flexible swapping logic in future - for all current Balancer pools this can be left empty.

::: info
When performing multi-hop trades, it's not always possible to know the value of `amount`exactly. For example, consider a case where we want to trade USDC for ETH but the trade is being routed through a DAI-USDC pool and then a ETH-DAI pool. It's not possible to know exactly how much DAI we'll receive from this first step so we can't set `amount` to that value at the time we send the transaction.

For this reason setting `amount` to 0 will be interpreted to use the full output of the previous trade. We can then trade USDC for DAI and then all of the DAI we receive will be traded for ETH.
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

* `sender`: The address from which tokens will be taken to perform the trade
* `fromInternalBalance`: Whether the trade should use tokens owned by the `sender` which are already stored in the Vault.
* `recipient`: The address to which tokens will be sent to after the trade.
* `toInternalBalance`: Whether the tokens should be sent to the `recipient` or stored within their internal balance within the Vault.

For more information on internal balances see [Core Concepts](broken-reference).

### BatchSwap function

```solidity
batchSwap(SwapKind kind,
          BatchSwapStep[] swaps,
          IAsset[] assets,
          FundManagement funds,
          int256[] limits,
          uint256 deadline) returns (int256[] assetDeltas)
```

* `kind`: The type of swap we want to perform in the first swap - either "Out given in" or "In given out" where we know the amount of tokens we're sending to the pool and want to know how many we'll receive or vice versa.
* `assets`: An array of tokens which are used in the batch swap. This is referenced from within `swaps`
* `limits`: An array of of the maximum net amounts of each asset which can be taken to perform the swap. Should the total trade require more than `limits[i]` tokens to be taken from `sender` for any `i`then the transaction shall fail.
* `deadline`: The UNIX timestamp at which our trade must be completed by - if the transaction is confirmed after this time then the transaction will fail.

## Worked Examples

In these examples, we’re trading token A for token C, through the intermediate token B. A, B, and C token could be in different pools, or in the same pool.

"Given In" means the caller knows the exact amount of the incoming token, and is asking the pool to calculate the tokenOut amount. The opposite is true of "Given Out." 

### Example 1 ("Given In")

The first case is a "Given In" Swap: say we have 10 A and want to know how much C we can get for it. We can accomplish this with a two-step multi-hop swap: A for B, then B for C.

Since we know the starting amount of A, the first swap is “Given In,” with an amount of 10.

The first swap will produce some amount of B, but we don’t know in advance how much. Since the amount of B **will** be known when the second swap executes, the second swap in the batch is also “Given In.”

Since we don’t know the amount of B when constructing the multi-hop, we initialize the amount in the second swap to 0, which instructs the multi-hop logic to use the calculated output amount from the first swap as input to the second.

| Parameter     | Swap 1   | Swap 2   |
| ------------- | -------- | -------- |
| Amount        | 10       | 0        |
| Swap Kind     | Given In | Given In |
| Tokens In/Out | A / B    | B / C    |

Say we get 5 B from the first swap. The amount of the second swap is then set to 5 in the Vault logic, and the second “Given In” swap produces some output amount of C. (The caller would then validate the overall swap by comparing this value to the minimum amountOut of C.)

### Example 2 ("Given Out")

The second case is a “Given Out” Swap: say we want 20 C, and want to know how much A that will cost. Here we need to do the swaps “backwards,” first trading C for B, then B for A.

The first swap is “Given Out,” and the amount is the desired amount of token C. It will produce some amount of token B, but as before, we don’t know how much in advance. So again we set the amount of the second swap to zero.

After the first swap, the amount of B will be known, and the zero amount in the second swap instructs the multi-hop logic to substitute the calculated amount from the last swap. Since this is “Given In,” the result will be some input amount of token A. (The caller would then validate the overall swap by comparing this value to the maximum amountIn of A.)

| Parameter     | Swap 1    | Swap 2   |
| ------------- | --------- | -------- |
| Amount        | 20        | 0        |
| Swap Kind     | Given Out | Given In |
| Tokens In/Out | B / C     | B / A    |

So in both cases, setting the amount of a swap within a batch to zero causes the multi-hop logic to substitute the calculated amount from the previous swap. If the previous swap was “Given In,” the calculated amount will be the “output” (tokenOut). If the previous swap was “Given Out,” the calculated amount will be the “input” (tokenIn).

Of course, the amount of the first swap in a batch cannot be zero.
