# StablePhantom Pool

## Common Arguments

In addition to the arguments listed below, you should also consider the [common arguments](./#common-arguments) and [those of the StablePool](stablepool.md) when creating a StablePhantom Pool.&#x20;

{% hint style="warning" %}
When performing an INIT join on a StablePhantom Pool, **you must include the BPT of the pool itself** as one of the `tokens` you provide. The amount you should pass for this token is the max UINT112 `(2**112 - 1)`. This is an artifact of the pool holding its own pre-minted, or "Phantom," BPT.&#x20;



After performing the `INIT` join, any other join on the pool will fail; with Phantom BPT, all _effective_ joins and exits are done via swapping to/from BPT within the pool.
{% endhint %}

## Pool Creation Arguments

### `rateProvider`s

MetaStable Pools rely on rate providers to inform the exchange rate between the tokens in the pool. A rate provider is a contract which implements a `getRate()` function to return a price feed for its corresponding token. If you pass the zero address (`0x0...0`) as a token's rate provider, it will return a value of 1.&#x20;

#### When should I use the zero address as a `rateProvider`?

If there is a pool with `TokenA` and `TokenB` and a rate provider `rateProviderAB` with a `getRate()` function that returns the price of `TokenA` relative to `TokenB`, then we can pass the address of `rateProviderAB` for `TokenA` and the zero address (`0x0...0`) for `TokenB`.&#x20;

#### When should I pass a `rateProvider` for each token?

Let's say there is a pool with `TokenA` and `TokenB.` We also have a rate provider `rateProviderAC` with a `getRate()` function that returns the price of `TokenA` relative to `TokenC` and a rate provider `rateProviderBC` with a `getRate()` function that returns the price of `TokenB` relative to `TokenC`.

Passing \[`rateProviderAC`, `rateProviderBC`] for \[`TokenA`, `TokenB`] respectively will give us the correct price since `PriceC` in each rate cancels out.

$$
\frac{\frac{Price_A}{Price_C}}{\frac{Price_B}{Price_C}} = \frac{Price_A}{Price_B}
$$

### `priceRateCacheDuration`

The `priceRateCacheDuration` for each `rateProvider` defines how long that the rate should be cached in seconds. Using a cached time saves gas on swaps. For prices that change very slowly, a long cache time can be helpful. A `priceRateCacheDuration` of zero will query the `rateProvider` each time. &#x20;

