# Stable Pool

## Overview

For advantages and use cases of Stable Pools, please refer to [the standard documentation](https://docs.balancer.fi/products/balancer-pools/stable-pools).

## Interfacing

Some elements to consider when interfacing with Stable Pools:

- Using [Stable Math](../math/stable-math.md)
- Pools have between 2 and 5 tokens
- Pools rely on the `amplificationParameter`, which is defined at pool creation and can be gradually updated later.

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

where the amplification parameter is $\frac{value}{precision} = \frac{620000}{1000}=620$ in this case.
