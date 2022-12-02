# Stable Pool

## Overview

For advantages and use cases of Stable Pools, please refer to [the standard documentation](https://docs.balancer.fi/products/balancer-pools/stable-pools).

For more interfaces, such as updating the `amplificationParameter`, see the [StablePool API](../../references/valuing-balancer-lp-tokens/pools/stablepools.md#api).

## Interfacing

Some elements to consider when interfacing with Stable Pools:

* Using [Stable Math](../pool-math/stable-math.md)
* Pools have between 2 and 5 tokens
* Pools rely on the `amplificationParameter`, which is defined at pool creation and can be gradually updated later.

## Getting Pool Data

In addition to the [common pool data](./#getting-common-pool-data), you will likely want the following data when interfacing with Stable Pools:

### Amplification Parameter

The Amplification Parameter is stored at the pool level. For example, calling

```
pool.getGetAmplificationParameter()
```

returns something resembling

```
value :  620000
isUpdating :  False
precision :  1000
```

where the amplification parameter is $$\frac{value}{precision} = \frac{620000}{1000}=620$$ in this case.
