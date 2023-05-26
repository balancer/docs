# Managed Pools

## BPT Supply

### `getActualSupply`

```solidity
getActualSupply() 
returns (uint256)
```

::: warning
Since this function reads balances directly from the Vault, it is potentially subject to manipulation via reentrancy. To call this function safely, attempt to trigger the reentrancy guard in the Vault by calling a non-reentrant function before calling `getActualSupply`.
:::

Returns the effective BPT Supply. Implemented in `ManagedPoolSettings`. 

## Swap Fees

### `getSwapFeePercentage`

```
getSwapFeePercentage() 
returns (uint256)
```

Returns the current value of the swap fee percentage. Implemented in `ManagedPoolSettings`.

### `getGradualSwapFeeUpdateParams`
```solidity
getGradualSwapFeeUpdateParams()
returns (uint256 startTime,
         uint256 endTime,
         uint256 startSwapFeePercentage,
         uint256 endSwapFeePercentage)
```

Returns the current gradual swap fee update parameters. Implemented in `ManagedPoolSettings`.

### `updateSwapFeeGradually`

```solidity
updateSwapFeeGradually(uint256 startTime,
                                uint256 endTime,
                                uint256 startSwapFeePercentage,
                                uint256 endSwapFeePercentage)

emits GradualSwapFeeUpdateScheduled(uint256 startTime,
                                    uint256 endTime,
                                    uint256 startSwapFeePercentage,
                                    uint256 endSwapFeePercentage)
```

Schedules a gradual update in swap fees. This is a permissioned function that can only be called by an authorized address. If the pool is paused, the call will revert. Implemented in `ManagedPoolSettings`.

## Weights

### `getNormalizedWeights`

```solidity
getNormalizedWeights() 
returns (uint256[] memory)
```

Returns the normalized weights in the same order as the Pool's tokens. Implemented in `ManagedPoolSettings`.

### `getGradualWeightUpdateParams`

```solidity
getGradualWeightUpdateParams()
returns (uint256 startTime,
         uint256 endTime,
         uint256[] memory startWeights,
         uint256[] memory endWeights)
```

Returns the current gradual weight change update parameters. Implemented in `ManagedPoolSettings`.

### `updateWeightsGradually`

```solidity
updateWeightsGradually(uint256 startTime,
                       uint256 endTime,
                       IERC20[] memory tokens,
                       uint256[] memory endWeights)

emit GradualWeightUpdateScheduled(uint256 startTime,
                                  uint256 endTime,
                                  uint256[] startWeights,
                                  uint256[] endWeights)
```

Schedules a gradual weight change at the block timestamp provided in startTime, up until endTime. This is a permissioned function that can only be called by an authorized address set by the `owner`. If the pool is paused, the call will revert. Implemented in `ManagedPoolSettings`.

## Swaps

### `getSwapEnabled`

```solidity
getSwapEnabled() 
returns (bool)
```

Returns whether swaps are enabled. 

### `setSwapEnabled`

```solidity
setSwapEnabled(bool swapEnabled)

emit SwapEnabledSet(bool swapEnabled)
```

Enables or disable trading. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

## Joins and Exits

### `getJoinExitEnabled`

```solidity
getJoinExitEnabled() 
returns (bool)
```

Returns whether joins and exits are enabled. Implemented in `ManagedPoolSettings`.

### `setJoinExitEnabled`

```solidity
setJoinExitEnabled(bool joinExitEnabled)

emits JoinExitEnabledSet(bool joinExitEnabled)
```

Enable or disable joins and exits. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

::: info
Note: This does not affect Recovery Mode exits
:::

## Allowlist

### `getMustAllowlistLPs`

```solidity
getMustAllowlistLPs() 
returns (bool)
```

Returns whether the allowlist for Liquidity Providers in enabled.

### `isAddressOnAllowlist`

```solidity
isAddressOnAllowlist(address member) 
returns (bool)
```

- **Note:** Checks the allowlist regardless of whether the allowlist features is enabled
- **Parameters:** `member` - The address to check against the allowlist
- **Returns:** Whether a given address is on the allowlist.

### `setMustAllowlistLPs`

```solidity
setMustAllowlistLPs(bool mustAllowlistLPs)

emit AllowlistAddressAdded(address indexed member);
emit AllowlistAddressRemoved(address indexed member);
```

Enables or disables the LP allowlist. 
## AUM Fees

  ```solidity
  function getManagementAumFeeParams()
    returns (uint256 aumFeePercentage, uint256 lastCollectionTimestamp)
  ```

  - **Returns:** 
      - `uint256` The management AUM fee perecentage as an 18-decimal fixed point number
      - `uint256` The timestamp of the last collection of AUM fees.

## Circuit Breakers

  ```solidity
  function getCircuitBreakerState(IERC20 token)
    returns (
      uint256 bptPrice,
      uint256 referenceWeight,
      uint256 lowerBound,
      uint256 upperBound,
      uint256 lowerBptPriceBound,
      uint256 upperBptPriceBound
    )
  ```

  - **Returns:** 
    - `uint256` The Current BPT Price.
    - `uint256` The Reference Weight // TODO: What is this
    - `uint256` The lower bound of the circuit breaker
    - `uint256` The upper bound of the circuit breaker
    - `uint256` The lower bound of the price of BTP
    - `uint256` The upper bound of the price of BTP
