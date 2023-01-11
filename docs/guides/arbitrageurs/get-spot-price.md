# Get the Spot Price of a Pool


## Overview
This guide will walk through various examples of fetching pricing from a pool using the SDK or direct calls.

::: info Definitions

Spot price is used as a broader term and it's important to distinguish between the types of pricing data a pool can provide.

**Mid Price** - the direct price of one asset in terms of the other asset assuming zero fees. The price of the other is the direct inverse $1 / n$ 

**Spot Price** - the price of one asset in terms of the other assuming an infinitesimally small amount is traded. In other words, the mid price plus or minus the swap fee depending on which direction the trade occurs

**Execution Price** - The resulting average price (i.e. ratio of assets sent to received) for executing a swap of a given amount

:::

## Setup

All examples using the SDK will require installing the sdk:

::: code-tabs#shell

@tab yarn

```bash
yarn install @balancer-labs/sdk
```

@tab npm

```bash
npm install @balancer-labs/sdk
```
:::

And then initializing the SDK:

```typescript
import { BalancerSDK, BalancerSdkConfig, Network } from '@balancer-labs/sdk';

const config: BalancerSdkConfig = {
  network: Network.MAINNET,
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA}`,
};
const balancer = new BalancerSDK(config);
```

## Examples

::: tip Choosing how to get a spot price

There are few different ways to go about getting the spot price. For example, if you already know a specific pool and want the spot price of the two assets you can call the `calcSpotPrice()` method on the `pool` instance shown [below](#weighted-pool-spot-price-using-the-sdk). If you just want to know the spot price of a pair across all of Balancer then using the pricing module will first find the most liquid path for the pair and then return the spot price. That is shown in [this example](#all-pools-spot-price-using-the-sdk).
:::

### Weighted Pool Spot Price Using the SDK

@[code{11-22} ts](code/sdk-spot-price.ts)

<RunCode />

### All Pools Spot Price Using the SDK
### Boosted Pool Spot Price

TODO

### Spot Price of Complex Path

TODO