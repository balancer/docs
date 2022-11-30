# Boosted Pools

## Overview

Boosted Pools bring the best of both worlds to Liquidity Providers and Swappers. Swappers get access to deep stablecoin liquidity with near-parity exchange rates while Liquidity Providers get their liquidity positions sent to external protocols, such as [Aave](https://aave.com/).

These versions of Stable Pools don't directly hold the stablecoins themselves, but rather hold the pool tokens of nested Linear Pools, which, for the Aave example, maintain proper balances of _TOKEN_ and _aTOKEN_.

## Advantages

### High Capital Efficiency

Boosted Pools are designed to deliver high capital efficiency by enabling users to provide trade liquidity for common tokens while forwarding idle tokens to external protocols. This gives liquidity providers the benefits of Aave **on top of** the swap fees they collect from trades.

### Superfluid, Consolidated Liquidity

Nesting pool tokens creates a powerful avenue to make swaps between any stablecoin and any aToken in the Boosted Pool. On top of that, any token in a pool with a Boosted Pool Token can tap directly into the underlying tokens.

## How Do They Work?

### Linear Pools

Linear Pools are the base component of Boosted Pools. They use Linear Math to facilitate trades between two tokens at a known exchange rate. They also use a positive/negative fee mechanism to incentivize arbitrageurs to maintain a desired ratio between the two tokens. For example, the [Balancer Aave Boosted Pool (DAI)](https://etherscan.io/token/0x804cdb9116a10bb78768d3252355a1b18067bf8f) balances DAI with aDAI, facilitating DAI trades while maintaining a large aDAI balance for an extra boost to Liquidity Providers.

### Phantom Pool Tokens ("Phantom BPT")

One of the key features that makes trades through Boosted Pools so simple is the use of **Phantom BPT**. Normally when a Liquidity Provider joins/exits a pool, the pool mints/burns pool tokens as needed. This is gas intensive and requires users to execute a `join` or `exit`.&#x20;

In pools that use Phantom BPT, however, **all pool tokens are minted at the time of pool creation** and are **held by the pool itself**. With Phantom BPT, Liquidity Providers use a **`swap`** (or more likely a **`batchSwap`**) to trade to or from a pool token to join or exit, respectively.&#x20;

![](<../../.gitbook/assets/Screen Shot 2021-12-15 at 9.51.57 AM.png>)

## Use Cases

The Balancer Boosted Aave USD Pool (bb-a-USD) demonstrates how nesting Linear Pools with Phantom BPT inside a Stable Pool with Phantom BPT can consolidate stablecoin liquidity while improving the Liquidity Provider experience. The architecture of the pool is outlined below.

#### Start with three Aave Linear Pools

Our building blocks are Aave Linear Pools for DAI, USDC, and USDT:

![](../../.gitbook/assets/linearPools.png)

As explained above, these pools have Phantom BPT (the `bb-a-*` tokens) and maintain target balances for base tokens and their aToken counterparts.

#### Put the Linear Pool Tokens into a Stable Pool

By adding the Linear Pool Tokens into a Stable Pool, we are effectively putting the pools inside another pool.

![](<../../.gitbook/assets/Screen Shot 2021-12-15 at 9.41.34 AM.png>)

### How do I swap between stablecoins?

Since Linear Pools have Phantom BPT, we can craft a `batchSwap` call that goes from one stablecoin to another.

For example, consider the following swap steps:

1. Trade USDC to the USDC Linear Pool Token
   1. USDC -> bb-a-USDC
2. Trade USDC Linear Pool token for the DAI Linear Pool Token
   1. bb-a-USDC -> bb-a-DAI
3. Trade DAI Linear Pool Token for DAI
   1. bb-a-DAI -> DAI

![](../../.gitbook/assets/stablecoinBatchSwap.png)

#### Design other pools with the Stable Pool Token as you would any stablecoin

Why have a WETH/DAI pool with idle DAI when you could have a WETH/bb-a-USD pool? By pairing with the Boosted Pool Token, you make a direct link between WETH and all of the stablecoins in bb-a-USD (DAI, USDC, USDT) **AND** Liquidity Providers get the extra boost from the underlying tokens being on Aave.

![](<../../.gitbook/assets/Screen Shot 2021-12-15 at 9.45.56 AM.png>)

Now, this pool can trade between any of the following tokens:

* WETH
* DAI
* USDC
* USDT
* aDAI
* aUSDC
* aUSDT
