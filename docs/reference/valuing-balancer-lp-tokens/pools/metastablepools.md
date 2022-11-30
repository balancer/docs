# MetaStablePools

## More functions are inherited

This page breaks out the functions that are not common to all pools. See more functions on the [Pools page](./).

## API

### `onSwap`

```cpp
// Inherited from BaseGeneralPool
onSwap(SwapRequest swapRequest,
       uint256[] balances,
       uint256 indexIn,
       uint256 indexOut) 
returns (uint256 amount[In/Out])
```

When the Vault is handling a swap, it will call `onSwap` to ask the pool what the amounts should be. Pools that use stable math need the all tokens balances to determine price.

### `getAmplificationParameter`

```
function getAmplificationParameter()
returns (uint256 value, bool isUpdating, uint256 precision)
```

Returns the amplification parameter value, a boolean to determine if it's updating, and its precision.

### `enableOracle`

```cpp
enableOracle() 
```

Enables the oracle functionality.

### `getMiscData`

```cpp
getMiscData() 
returns (
        int256 logInvariant,
        int256 logTotalSupply,
        uint256 oracleSampleCreationTimestamp,
        uint256 oracleIndex,
        bool oracleEnabled,
        uint256 swapFeePercentage)
```

Returns a variety of data fields, listed above.

### `getLargestSafeQueryWindow`

```cpp
getLargestSafeQueryWindow() 
returns (uint256)
```

Returns largest safe query window.

### `getLatest`

```cpp
enum Variable { PAIR_PRICE, BPT_PRICE, INVARIANT }
getLatest(Variable variable) returns (uint256)
```

Returns latest pair price, BPT price, or invariant depending on what `variable` enum you pass.

### `getTimeWeightedAverage`

```cpp
enum Variable { PAIR_PRICE, BPT_PRICE, INVARIANT }
struct OracleAverageQuery {
    Variable variable;
    uint256 secs;
    uint256 ago;
}
getTimeWeightedAverage(OracleAverageQuery[] queries) 
returns (uint256[] results)
```

Returns time weighted average prices corresponding to the variables in each query. `secs` is the duration of the query in seconds, and `ago` is the time in seconds from since **end** of that duration. Prices are represented as 18 decimal fixed point values.

{% hint style="warning" %}
Note that you can only call `getTimeWeightedAverage` after the buffer is full, or it will revert with `ORACLE_NOT_INITIALIZED`. If you call `getSample(1023)` and it returns 0's, that means the buffer's not full yet.
{% endhint %}

### `getPastAccumulators`

```cpp
enum Variable { PAIR_PRICE, BPT_PRICE, INVARIANT }
struct OracleAccumulatorQuery {
        Variable variable;
        uint256 ago;
}
getPastAccumulators(OracleAccumulatorQuery[] queries 
returns (int256[] results)
```

Returns estimates for the accumulator at a time `ago` seconds ago for each query.

### `getRateProviders`

```
function getRateProviders() 
returns (IRateProvider[] providers)
```

Returns rate providers that provide exchange rates between the tokens

### `getPriceRateCache`

```
function getPriceRateCache(IERC20 token)
returns (uint256 rate, uint256 duration, uint256 expires)
```

Returned the cached rate, the cache duration, and the time of expiry for the current rate.

### `updatePriceRateCache`

```
function updatePriceRateCache(IERC20 token)
```

Updates the cached price rate for the given token.

## Permissioned Functions

All of the following functions are only callable by the pool owner.

### `startAmplificationParameterUpdate`

```
function startAmplificationParameterUpdate(
    uint256 rawEndValue,
    uint256 endTime)
```

Begins changing the amplification parameter to `rawEndValue` over time. The value will change linearly until `endTime` is reached, when it will be `rawEndValue`.&#x20;

**NOTE**: Internally, the amplification parameter is represented using higher precision. The values returned by `getAmplificationParameter` have to be corrected to account for this when comparing to `rawEndValue`.

### `stopAmplificationParameterUpdate`

```
function stopAmplificationParameterUpdate() external
```

Stops the amplification parameter change process, keeping the current value.

### `setPriceRateCacheDuration`

```
function setPriceRateCacheDuration(
    IERC20 token, 
    uint256 duration) 
```

Sets the given `token`'s price rate cache duration to `duration`.
