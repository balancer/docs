# LiquidityBootstrappingPool

## More functions are inherited

This page breaks out the functions that are not common to all pools. See more functions on the [Pools page](./).

## API

### `onSwap`

```cpp
// Inherited from BaseMinimalSwapInfoPool
onSwap(SwapRequest request,
       uint256 balanceTokenIn,
       uint256 balanceTokenOut) 
returns (uint256 amount[In/Out])
```

When the Vault is handling a swap, it will call `onSwap` to ask the pool what the amounts should be. Pools that use weighted math only need the input/output tokens to determine price.

### `getSwapEnabled`

```cpp
function getSwapEnabled()
returns (bool)
```

Returns `True` if the pool has swaps enabled.

### `getGradualWeightUpdateParam`

```cpp
function getGradualWeightUpdateParams()
returns (
    uint256 startTime, 
    uint256 endTime, 
    uint256[] endWeights)
```

Return start time, end time, and endWeights as an array. Current weights should be retrieved via getNormalizedWeights().

## Permissioned Functions

All of the following functions are only callable by the pool owner.

### `setSwapEnabled`

```cpp
function setSwapEnabled(bool swapEnabled)
```

Enables swaps if passed `True`, disables them if passed `False`.

### `updateWeightsGradually`

```cpp
function updateWeightsGradually(
    uint256 startTime, 
    uint256 endTime,
    uint256[] endWeights)
```

Schedule a gradual weight change, from the current weights to the given `endWeights`, from `startTime` to `endTime`.
