---
order: 1
title: Overview
---

# Pools

Balancer is infinitely extendible to allow for any conceivable pool type with custom curves, logic, parameters, and more.

## Pool Types

<div class="pills-box">
<PillLink title="Weighted" link="/concepts/pools/weighted" />
<PillLink title="Composable Stable" link="/concepts/pools/composable-stable" />
<PillLink title="Linear" link="/concepts/pools/linear" />
<PillLink title="Boosted" link="/concepts/pools/boosted" />
<PillLink title="Liquidity Bootstrapping" link="/concepts/pools/liquidity-bootstrapping" />
<PillLink title="Managed" link="/concepts/pools/managed" />
<PillLink title="Protocol" link="/concepts/pools/protocol" />
</div>

## Pool Composability

The above classes of pools already highlights the flexibility of Balancer, but taking this a step further _composition_ of those pools is where Balancer starts to shine. A great example of this is tokens paired with the boosted stable pool. Most tokens will want to pair with either stables or native assets like ETH and historically every token creates an AMM pool which leads to something like `ABC/USDC`, `XYZ/USDC`, etc. That ends up being a lot of duplicated & isolated stable liquidity that also needs further hops to connect to other stablecoins. On Balancer, `ABC` and `XYZ` can both be paired with `bb-a-usd` which has amazing shared capital efficiency and creates direct routes between `ABC->USDC`, `ABC->USDT`, and `ABC->DAI`.

These types of nested pools and unique combinations are only possible on Balancer due to the vault architecture, and other concepts like pre-minted BPTs, relayers to allow for joinswaps, and more.
