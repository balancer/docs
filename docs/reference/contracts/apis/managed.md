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

  ```solidity
    function getNormalizedWeights() returns (uint256[] memory)
  ```

  - **Returns:** Then normalized weights in the same order as the Pool's tokens.

  ```solidity
  function getGradualWeightUpdateParams()
    returns (
        uint256 startTime,
        uint256 endTime,
        uint256[] memory startWeights,
        uint256[] memory endWeights
    )
  ```

  - **Returns:** The current gradual weight change update parameters.

## Swaps

// TODO: Verify the validity of these apis

  ```solidity
  function getSwapEnabled() returns (bool)
  ```

  - **Returns:** Whether swaps are enabled.

## Joins and Exits
  ```solidity
  function getJoinExitEnabled() returns (bool)
  ```

  - **Returns:** Whether joins and exits are enabled.

## Allowlist

  ```solidity
  function getMustAllowlistLPs() returns (bool)
  ```

  - **Returns:** Whether the allowlist for Liquidity Providers in enabled.

  ```solidity
  function isAddressOnAllowlist(address member) returns (bool)
  ```

  - **Note:** Checks the allowlist regardless of whether the allowlist features is enabled
  - **Parameters:** `member` - The address to check against the allowlist
  - **Returns:** Whether a given address is on the allowlist.

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
