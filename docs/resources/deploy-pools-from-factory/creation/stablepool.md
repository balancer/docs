# StablePool

{% hint style="warning" %}
This is a page for the original implementation of the StablePool. While it is valid to use one of these pools, it is advantageous to use the more flexible StablePhantomPool in many cases.

* Support for swapping tokens that are not necessarily pegged 1:1 with the use of `rateProviders`
* Support for nesting BPT with the use of Phantom BPT; pool join/exit operations are done with swaps
{% endhint %}

## Common Arguments

In addition to the arguments listed below, you should also consider the [common arguments](./#common-arguments) when creating a pool.&#x20;

## Pool Creation Arguments

### Amplification Parameter

StableMath relies on an amplification parameter. The amplification parameter determines how "flat" the invariant curve is, or in other words, how strongly correlated the tokens in the pool are.&#x20;

If there is a StablePool with two very reputable stablecoins, one would expect it to have a high amplification parameter. On the other hand, if there's a StablePool with one reputable stablecoin, and one new, unproven stablecoin, it may have a low amplification parameter to account for token volatility.&#x20;

For more information on the amplification parameter, read about [StableMath in the main docs](https://docs.balancer.fi/concepts/math/stable-math).&#x20;
