# MetaStable Pool

## Overview

For advantages and use cases of MetaStable Pools, please refer to [the standard documentation](https://docs.balancer.fi/products/balancer-pools/metastable-pools).

For more interfaces, such as updating the `amplificationParameter` or querying price data from the pool oracle interface, see the [MetaStablePool API](../../references/valuing-balancer-lp-tokens/pools/metastablepools.md).

## Interfacing

Some elements to consider when interfacing with Stable Pools:

* Using the **MetaStable extension** of [Stable Math](../pool-math/stable-math.md) (be sure to see `MetaStable.ts`!)
* Pools have 2 tokens
* Pools rely on the `amplificationParameter`, which is defined at pool creation and can be gradually updated later.
* Pools also rely on `RateProviders` for each token in the pool to determine the exchange rate. If a token's `RateProvider` is set to the zero address, the rate is set to `1`.

## Getting Pool Data

In addition to the [common pool data](./#getting-common-pool-data), you will likely want the following data when interfacing with MetaStable Pools:

### Amplification Parameter

The Amplification Parameter is stored at the pool level. For example, calling

```
pool.getAmplificationParameter()
```

returns something resembling

```
value :  620000
isUpdating :  False
precision :  1000
```

where the amplification parameter is $$\frac{value}{precision} = \frac{620000}{1000}=620$$ in this case.

### Rate Providers

The `RateProviders` are contract addresses stored at the pool level. The pool calls these providers to get the current exchange rates between the tokens in the pool. Calling

```
pool.getRateProviders()
```

returns something resembling

```
[0x72d07d7dca67b8a406ad1ec34ce969c90bfee768]
```

where the contract at [0x72d07d7dca67b8a406ad1ec34ce969c90bfee768](https://etherscan.io/address/0x72d07d7dca67b8a406ad1ec34ce969c90bfee768) is a `RateProvider` that has a function called `getRate()`. In this example, this MetaStable Pool has only one `RateProvider`. This implies that the rate is the ratio of Token1:Token2.

{% hint style="info" %}
In other use cases, there may be multiple `RateProviders` that provide a price from each token to a common base. For example, the rate providers could be

`Token1RateProvider` returns Token1:USD

`Token2RateProvider` returns Token2:USD

And to find the price of Token1:Token2, you would divide Token1:USD/Token2:USD to cancel out the intermediate USD.
{% endhint %}

### Price Rate Cache

MetaStable Pools cache prices from `RateProviders` up to a maximum duration. These cached prices are updated either manually using `updatePriceRateCache()` or automatically during a trade when the cache has expired.

#### `getScalingFactors`

To access the simplest form of Price Rate data, you can call&#x20;

```
pool.getScalingFactors()
```

which will return something resembling

```
[1047560735332976763, 1000000000000000000]
```

where the values are the cached prices scaled to have appropriate decimals. For tokens that do not have a RateProvider (set to `0x0000000000000000000000000000000000000000`), they will return a `scalingFactor` of `1000000000000000000` = $$1e18$$.&#x20;

Values are ordered according to numerically sorted token addresses. In this example, these values correspond to `[0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0, 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2]`.&#x20;

#### `getPriceRateCache`

To see exactly what price rate data a MetaStable pool is currently using, call

```
pool.getPriceRateCache(tokenAddress)
```

and the results will resemble one of the following:

#### For tokens that DO have a Price Rate

```
  rate   uint256 :  1047560735332976763
  duration   uint256 :  10800
  expires   uint256 :  1636558429
```

#### For tokens that DO NOT have a Price Rate

```
  rate   uint256 :  0
  duration   uint256 :  0
  expires   uint256 :  0
```

In these samples, you can see that the token **with a Price Rate** has a `duration` of 10800 seconds (3 hours) and an expiration timestamp. The `rate` is cached exactly as it comes from the `RateProvider`. It's possible that a token price may need to be decimal adjusted for the price rate to make sense.

For the token **without a Price Rate**, the `rate` is not actually interpreted as 0, but rather as `1000000000000000000` = $$1e18$$.

### Oracle Data

To query oracle data from a MetaStable Pool, refer to the [Oracle Pools ](oracle-pools.md#overview)interfacing page.&#x20;
