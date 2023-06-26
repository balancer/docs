---
order: 5
---

# Boosted Pools

## Overview

Boosted Pools are actually a subclass of other pools (typically [Composable Stable Pools](./composable-stable.md) and [Weighted Pools](./weighted.md)) but deserve their own page due to their powerful feature set. Boosted Pools bring the best of both worlds to Liquidity Providers (LPs) and Swappers. Swappers get access to deep liquidity with minimized price impact while Liquidity Providers get their liquidity positions sent to external protocols, such as [Aave](https://aave.com/).

### Motivation
In liquidity pools, swap prices are determined by pool balances. A large pool is great for swappers: the larger the balances in the pool, the less the price changes from a given swap. The downside, however, is that large pools are not as great for LPs.
While the full amount of the balances support token prices, only a fraction of the balances in the pool are actively swapped back and forth to facilitate swaps. As a result, much of the pool sits idle.

## Advantages

### Better for LPs, Better for Swappers
How can changes in pool structure improve the LP experience? By using the idle liquidity to gain value in other ways. With this idle liquidity in other protocols, LPs can get a boost (e.g. lending fees from Aave) and the pool becomes more enticing than other pools. Since the pool is more appealing for LPs, the liquidity will grow even larger, offering even better prices to swappers.

### High Capital Efficiency
Boosted Pools are designed to deliver high capital efficiency by enabling users to provide swap liquidity for common tokens while forwarding idle tokens to external protocols. This gives liquidity providers the benefits of protocols like Aave **on top of** the swap fees they collect from swaps.

### Superfluid, Consolidated Liquidity

Nesting pool tokens creates a powerful avenue to make swaps between any stablecoin and any `aToken` in the Boosted Pool. On top of that, any token in a pool alongside a Boosted Pool Token can tap directly into the underlying tokens.

## Crucial Building Blocks: Linear Pools

To understand Boosted Pool, it's important to understand their core building block: [Linear Pools](./linear.md).

> Linear Pools are Balancer pools that facilitate the exchange of an asset and its wrapped, yield bearing counterpart at a known (calculated or queried) exchange rate. For example, `DAI` and wrapped `aDAI` from Aave. Linear pools have target ranges to incentivize how much of the native token should be kept available for swaps vs the yield bearing counterpart. They use a fee/reward mechanism to incentivize arbitrageurs to maintain a desired ratio between the two tokens (pay fees for leaving the target range, receive those previously collected fees for returning to range). One additional critical feature of Linear Pools is that they allow users to swap directly to BPT; no joins or exits are needed.

### Nesting Linear Pools
Since BPT are ERC-20 tokens themselves, Linear Pool BPT can be nested within another pool. This creates a simple `batchSwap` path between base assets and tokens in the outer pool because swappers can swap from BPT to one of the Linear Pool's underlying tokens.

## Example

Let's say there is a hypothetical new Weighted Pool with two tokens: 50% USDC and 50% WETH. One can expect that swaps on this pool will touch just a fraction of its depth (i.e. swaps typically won't use more than ~20% of the balances in the pool since swaps of that scale would significantly change the price).

![](/images/idle-tokens.png)

As the figure above illustrates, only a tiny amount of the pool would be touched by swaps. The remaining assets are in the pool to compose the price and reduce price impact, but are idle and therefore not generating yield or fees directly. **Boosted Pools aim to optimize assets usage of a pool.**

If this were instead to be built as a Boosted Pool, the idle assets can become yield bearing versions on some hypothetical protocol, ProtocolX, with `xTokens` that are yield bearing versions of their base `tokens`. By boosting this pool with nested Linear Pools, the previously vanilla Weighted Pool becomes far more efficient.

![](/images/linear-pool-nested.png)

## Case Study: bb-a-USD
![](/images/bb-a-USD.png)

[Balancer Boosted Aave USD](https://app.balancer.fi/#/ethereum/pool/0xfebb0bbf162e64fb9d0dfe186e517d84c395f016000000000000000000000502) (symbol: `bb-a-USD`) is a Composable Stable Pool that facilitates swaps between three US Dollar stablecoins (`USDC`, `USDT`, and `DAI`) while sending idle liquidity to Aave. The underlying Linear Pools are:
* `bb-a-USDC` (consisting of `USDC` and wrapped `aUSDC`)
* `bb-a-USDT` (consisting of `USDT` and wrapped `aUSDT`)
* `bb-a-DAI` (consisting of `DAI` and wrapped `aDAI`)

::: info Why are the aTokens wrapped?
aTokens are incompatible with the Balancer Vault because they have streaming balances. These tokens must be wrapped into a static token, which accounts for any accrued value.
:::

![](/images/aave-linear-pools-USD.png)

### bb-a-USD as a Pairing Token
`bb-a-USD` has [preminted BPT](../advanced/preminted-bpt.md), which enable it to be nested within even higher level pools. When creating a pool, using `bb-a-USD` as a constituent token offers a number of benefits:
1. Easy access to swap paths for multiple USD tokens without fragmenting stablecoin liquidity
2. Benefit LPs with additional boost from Aave

#### Aave USD MetaPool
When a protocol or organization has a new stablecoin for which they want to establish boosted liquidity, they do not need to source independent liquidity for alternate stablecoins. Instead, they can pair their new token's Aave Boosted Linear Pool with `bb-a-USD`. This reduces liquidity fragmentation and simplifies the onboarding process.

#### Weighted Pool Pairing
A pool of `bb-a-USD` and `WETH`, for example, can facilitate swaps between all underlying tokens of `USDC`, `USDT`, `DAI`, their respective wrapped `aTokens`, and `WETH`.

![](/images/bb-a-USD-pairing.png)
