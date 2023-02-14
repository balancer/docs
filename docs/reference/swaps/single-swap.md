---
order: 2
---

# Single Swap

## Function and Struct Definitions

### Swap function

```solidity
swap(SingleSwap singleSwap,
     FundManagement funds,
     uint256 limit,
     uint256 deadline) returns (uint256 amountCalculated[In/Out])
```

- `singleSwap`: A definition of the swap to be executed, defined below
- `funds`: A definition of where funds are going to/from, defined below
- `limit`: The meaning of `limit` depends on the value of `singleSwap.kind`
  - `GIVEN_IN`: The minimum amount of tokens to receive from the swap.
  - `GIVEN_OUT`: The maximum amount of tokens to send for the swap.
- `deadline`: The UNIX timestamp at which our trade must be completed by - if the transaction is confirmed after this time then the transaction will fail.

### SingleSwap struct

The `SingleSwap` struct is defined as below.

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

- `poolId`: The id of the pool to trade with.
- `kind`: The type of swap to perform - either "Out Given Exact In" or "In Given Exact Out."
- `assetIn`: The address of the token to swap into the pool.
- `assetOut`: The address of the token to receive in return.
- `amount`: The meaning of `amount` depends on the value of `kind`.
  - `GIVEN_IN`: The amount of tokens being sent
  - `GIVEN_OUT`: The amount of tokens being received
- `userData`: Any additional data which the pool requires to perform the swap. This allows pools to have more flexible swapping logic in future - for all current Balancer pools this can be left empty.

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

- `sender`: The address from which tokens will be taken to perform the trade
- `fromInternalBalance`: Whether the trade should use tokens owned by the `sender` which are already stored in the Vault.
- `recipient`: The address to which tokens will be sent to after the trade.
- `toInternalBalance`: Whether the tokens should be sent to the `recipient` or stored within their internal balance within the Vault.
