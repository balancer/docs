# WeightedPool2Tokens

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

Returns latest pair price, BPT price, or invariant depending on what `variable` enum you pass. Samples are recorded by the pool as calculated with the pre-operation balances. For example, the spot price _**before**_ a swap is the value stored as the most recent `PAIR_PRICE`.

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
