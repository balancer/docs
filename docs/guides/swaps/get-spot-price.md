# Get the Spot Price of a Pool


## Overview
This guide will walk through various examples of fetching pricing from a pool using the SDK or direct calls.

::: info Definitions

Spot price is used as a broader term and it's important to distinguish between the types of pricing data a pool can provide.

**Mid Price** - the direct price of one asset in terms of the other asset assuming zero fees. The price of the other is the direct inverse $1 / n$ 

**Spot Price** - the price of one asset in terms of the other assuming an infinitesimally small amount is traded. In other words, the mid price plus or minus the swap fee depending on which direction the trade occurs

**Execution Price** - The resulting average price (i.e. ratio of assets sent to received) for executing a swap of a given amount

:::

```typescript
@include(code/sdk-spot-price.ts{11-24})
```

<RunCode />