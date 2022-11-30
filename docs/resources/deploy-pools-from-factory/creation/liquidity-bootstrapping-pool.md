# Liquidity Bootstrapping Pool

## Common Arguments

In addition to the arguments listed below, you should also consider the [common arguments](./#common-arguments) and [those of the WeightedPool](weightedpool.md) when creating a Liquidity Bootstrapping Pool.

## Pool Creation Arguments

### `swapEnabledOnStart`

The `swapEnabledOnStart` on argument allows pool creators to deploy the pool in a state with frozen trades; this can be highly advantageous for preventing bots from trading with the pool as soon as liquidity is added.

While not every application needs this feature, deploying a pool with swaps disabled and later activating them (especially at an announced time) allows for a more level playing field.
