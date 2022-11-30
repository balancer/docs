# Weighted Pool

## Overview

For advantages and use cases of Weighted Pools, please refer to [the standard documentation](https://docs.balancer.fi/products/balancer-pools/weighted-pools).

For more interfaces, see the [WeightedPool API](../../references/valuing-balancer-lp-tokens/pools/weightedpool.md#api) and [WeightedPool2Tokens API](../../references/valuing-balancer-lp-tokens/pools/weightedpool2tokens.md#api).

## Interfacing

Some elements to consider when interfacing with Weighted Pools:

* Using [Weighted Math](../pool-math/weighted-math.md)
* Pool weights are static, defined at pool creation
* Pools have between 2 and 8 tokens
* Pool weights range from 1% to 99%

## Getting Pool Data

In addition to the [common pool data](./#getting-common-pool-data), you will likely want the following data when interfacing with Weighted Pools:

### Weights

Weights are stored at the pool level. For example, calling

```
pool.getNormalizedWeights()
```

returns something resembling

```
[800000000000000000, 200000000000000000]
```

which are the weights represented with 18 decimals. A pool with 80%/20% weights corresponds to \[0.8, 0.2] after scaling for decimals.

### Oracle Data

To query oracle data from a pool of type `WeightedPool2Tokens`, refer to the [Oracle Pools ](oracle-pools.md#overview)interfacing page.&#x20;
