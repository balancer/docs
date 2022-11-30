# Managed Pools

## Overview

For advantages and use cases of Managed Pools, please refer to [the standard documentation](https://docs.balancer.fi/products/balancer-pools/managed-pools).

For more interfaces, such as updating pool weights, see the [Managed Pools API](../../references/valuing-balancer-lp-tokens/pools/investmentpools.md).

## Interfacing

Some elements to consider when interfacing with Managed Pools:

* Using [Weighted Math](../pool-math/weighted-math.md)
* Pool weights can be dynamic
* Pool swaps may be disabled by the pool owner. Typically this is to prevent swaps before the weight shifting occurs, but this can technically happen at any time.
* Pool weights range from 1% to 99%
* Pools can have up to 50 tokens

## Getting Pool Data

In addition to the [common pool data](./#getting-common-pool-data), you will likely want the following data when interfacing with Liquidity Bootstrapping Pools:

### Weights

#### Instantaneous Query

Weights are stored at the pool level. For example, calling

```
pool.getNormalizedWeights()
```

returns something resembling

```
[800000000000000000, 200000000000000000]
```

which are the weights represented with 18 decimals. A pool with 80%/20% weights corresponds to \[0.8, 0.2] after scaling for decimals. It is important to note that this method will only query **instantaneous weights**. If you are querying a pool that is actively changing weights, the pool weights can differ between off-chain query and weights at time of execution.

#### Calculate Weights at a Specific Time

By combining the above instantaneous weight query with the weight-shifting parameters, we can calculate weights at a point in the future. Calling

```
pool.getGradualWeightUpdateParams()
```

returns something resembling

```
startTime :  1631523600
endTime :  1638781200
endWeights :  [180010681315327688, 820004577706569009]
```

With these datapoints, you can calculate the weights at a given point in time by interpolating between the current weights and the final weights.

### Are Swaps Enabled?

Pool owners may choose to enable/disable swaps based on what they're doing with their pool. Oftentimes, pool owners will have swaps paused before a weight-shifting event and enable them as the weight-shifting begins. Technically, however, pool owners can pause swaps whenever they like; therefore, it's important to check it swaps are enabled when dealing with these pools. Simply calling

```
pool.getSwapEnabled()
```

returns `True` or `False`.&#x20;
