# Oracle Pools

## Overview

Oracle Pools are Balancer pools that can report back time-weighted average prices for tokens within the pool.&#x20;

Different `poolTypes` can implement Oracle Functionality. Since `WeightedPool2Tokens` were the first pool to implement the oracles, they were originally referred to as "Oracle Pools," but they are no longer alone in providing this functionality.

### Pool Types with Oracles

The types of pools that have oracles include but are not limited to:

* WeightedPool2Tokens ([Full API](../../references/valuing-balancer-lp-tokens/pools/weightedpool2tokens.md))
* MetaStablePool ([Full API](../../references/valuing-balancer-lp-tokens/pools/metastablepools.md))

## Getting Oracle Data

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

Returns time weighted average prices corresponding to the variables in each query.

* `variable` - One of `{ PAIR_PRICE, BPT_PRICE, INVARIANT }`
* `secs` - The duration of the query in seconds
* `ago` - The time in seconds from since **end** of that duration.&#x20;

Prices are represented as 18 decimal fixed point values.

### `getLatest`

```
enum Variable { PAIR_PRICE, BPT_PRICE, INVARIANT }
getLatest(Variable variable) returns (uint256)
```

For a simpler query (which is more prone to error/manipulation), you can also query getLatest to get the latest value of `variable`, which is one of `{ PAIR_PRICE, BPT_PRICE, INVARIANT }`.

### Additional Queries

The above are just samples of what you can query. For a more complete list, please refer to the Full APIs for the [WeightedPool2Tokens](../../references/valuing-balancer-lp-tokens/pools/weightedpool2tokens.md) and [MetaStablePool](../../references/valuing-balancer-lp-tokens/pools/metastablepools.md).&#x20;
