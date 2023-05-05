---
order: 5
---

# Boosted Pools

## Overview

Boosted Pools are actually a subclass of [Composable Stable Pools](./composable-stable.md) but deserve their own page due to their powerful feature set. Boosted pools bring the best of both worlds to Liquidity Providers and Swappers. Swappers get access to deep stablecoin liquidity with near-parity exchange rates while Liquidity Providers get their liquidity positions sent to external protocols, such as [Aave](https://aave.com/).

These versions of Stable Pools don't directly hold the stablecoins themselves, but rather hold the pool tokens (BPTs) of nested Linear Pools, which, for the Aave example, maintain proper balances of _TOKEN_ and _aTOKEN_.

## Advantages

### High Capital Efficiency

Boosted Pools are designed to deliver high capital efficiency by enabling users to provide swap liquidity for common tokens while forwarding idle tokens to external protocols. This gives liquidity providers the benefits of Aave **on top of** the swap fees they collect from swaps.

### Superfluid, Consolidated Liquidity

Nesting pool tokens creates a powerful avenue to make swaps between any stablecoin and any aToken in the Boosted Pool. On top of that, any token in a pool with a Boosted Pool Token can tap directly into the underlying tokens.

## How Do They Work?

### Linear Pools

[Linear Pools](./linear.md) are the base component of Boosted Pools. They use Linear Math to facilitate swaps between two tokens at a known exchange rate. They also use a positive/negative fee mechanism to incentivize arbitrageurs to maintain a desired ratio between the two tokens. For example, the [Balancer Aave Boosted Pool (DAI)](https://etherscan.io/token/0xae37D54Ae477268B9997d4161B96b8200755935c) balances DAI with aDAI, facilitating DAI swaps while maintaining a large aDAI balance for an extra boost to Liquidity Providers.

### Preminted Pool Tokens ("Preminted BPT")

One of the key features that makes swaps through Boosted Pools so simple is the use of **Preminted BPT**. Normally when a Liquidity Provider joins/exits a pool, the pool mints/burns pool tokens as needed. This is gas intensive and requires users to execute a `join` or `exit`.

In pools that use Preminted BPT, however, **all pool tokens are minted at the time of pool creation** and are **held by the pool itself**. With Preminted BPT, Liquidity Providers use a **`swap`** (or more likely a **`batchSwap`**) to swap to or from a pool token to join or exit, respectively.

## Use Cases

The Balancer Boosted Aave USD Pool (bb-a-USD) demonstrates how nesting Linear Pools with Preminted BPT inside a Stable Pool with Preminted BPT can consolidate stablecoin liquidity while improving the Liquidity Provider experience. The architecture of the pool is outlined below.

#### Start with three Aave Linear Pools

Our building blocks are Aave Linear Pools for DAI, USDC, and USDT:

![](/images/linearPools.png)

As explained above, these pools have Preminted BPT (the `bb-a-*` tokens) and maintain target balances for base tokens and their aToken counterparts.

#### Put the Linear Pool Tokens into a Stable Pool

By adding the Linear Pool Tokens into a Stable Pool, we are effectively putting the pools inside another pool.

### How do I swap between stablecoins?

Since Linear Pools have Preminted BPT, we can craft a `batchSwap` call that goes from one stablecoin to another.

For example, consider the following swap steps:

1. Swap USDC to the USDC Linear Pool Token
   1. USDC -> bb-a-USDC
2. Swap USDC Linear Pool token for the DAI Linear Pool Token
   1. bb-a-USDC -> bb-a-DAI
3. Swap DAI Linear Pool Token for DAI
   1. bb-a-DAI -> DAI

![](/images/stablecoinBatchSwap.png)

#### Design other pools with the Stable Pool Token as you would any stablecoin

Why have a WETH/DAI pool with idle DAI when you could have a WETH/bb-a-USD pool? By pairing with the Boosted Pool Token, you make a direct link between WETH and all of the stablecoins in bb-a-USD (DAI, USDC, USDT) **AND** Liquidity Providers get the extra boost from the underlying tokens being on Aave.

Now, this pool can swap between any of the following tokens:

- WETH
- DAI
- USDC
- USDT
- aDAI
- aUSDC
- aUSDT
