# Single Swaps

## Swap Overview

Balancer V2 supports multi-hop "batch" swaps to get the best possible prices - but in many cases there is only one pool involved. If both tokens involved are in the same pool, it is possible to optimize the data structures to save gas.

For this reason the Vault exposes the `swap` function for simple swaps which just interact with a single pool with the the interface below.

```solidity
swap(SingleSwap singleSwap,
     FundManagement funds,
     uint256 limit,
     uint256 deadline) returns (uint256 amountCalculated[In/Out])
```

It's recommended to use this function if not routing through multiple pools as it reduces gas costs by approximately 6000 gas.

To simplify the inputs to this function, we have grouped related fields into a number of structs which are explained below.

### SingleSwap struct

The `SingleSwap` struct defines which pool we're trading with and what kind of swap we want to perform. The `SingleSwap` struct is defined as below.

```solidity
enum SwapKind { GIVEN_IN, GIVEN_OUT }

struct SingleSwap {
   bytes32 poolId;
   SwapKind kind;
   IAsset assetIn;
   IAsset assetOut;
   uint256 amount;
   bytes userData;
}
```

* `poolId`: The id of the pool to trade with.
* `kind`: The type of swap we want to perform - either "Out given in" or "In given out" where we know the amount of tokens we're sending to the pool and want to know how many we'll receive or vice versa.
* `assetIn`: The address of the token which we are sending to the pool.
* `assetOut`: The address of the token which we will receive in return.
* `amount`: The meaning of `amount` depends on the value of `kind`.
  * `GIVEN_IN`: The amount of tokens we are sending to the pool.
  * `GIVEN_OUT`: The amount of tokens we want to receive from the pool.
* `userData`: Any additional data which the pool requires to perform the swap. This allows pools to have more flexible swapping logic in future - for all current Balancer pools this can be left empty.

### FundManagement struct

The `FundManagement` struct defines where the input tokens for the swap are coming from and where the output tokens should be sent. The `FundManagement` struct is defined as below.

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

### Swap function

Jumping back to the `swap` function we see there are two final arguments

```solidity
swap(SingleSwap singleSwap,
     FundManagement funds,
     uint256 limit,
     uint256 deadline) returns (uint256 amountCalculated[In/Out])
```

* `limit`: The meaning of `limit` depends on the value of `singleSwap.kind`
  * `GIVEN_IN`: The minimum amount of tokens we would accept to receive from the swap.
  * `GIVEN_OUT`: The maximum amount of tokens we would accept having to send for the swap.
* `deadline`: The UNIX timestamp at which our trade must be completed by - if the transaction is confirmed after this time then the transaction will fail.

