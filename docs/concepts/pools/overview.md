---
order: 1
---

# Overview

Balancer is infinitely extendible to allow for any conceivable pool type with custom curves, logic, parameters, and more.

## Yield Liquidity

## Composability

The above classes of pools already highlights the flexibility of Balancer, but taking this a step further _composition_ of those pools is where Balancer starts to shine. A great example of this is tokens paired with the boosted stable pool. Most tokens will want to pair with either stables or native assets like ETH and historically every token creates an AMM pool which leads to something like `ABC/USDC`, `XYZ/USDC`, etc. That ends up being a lot of duplicated & isolated stable liqudity that also needs further hops to connect to other stablecoins. On Balancer, `ABC` and `XYZ` can both be paired with `bb-a-usd` which has amazing shared capital efficiency and creates direct routes between `ABC->USDC`, `ABC->USDT`, and `ABC->DAI`.

These types of nested pools and unique combinations are only possible on Balancer due to the vault architecture, and other concepts like pre-minted BPTs, relayers to allow for joinswaps, and more.
