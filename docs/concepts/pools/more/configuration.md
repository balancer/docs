---
order: 2
---

# Pool Configuration

## Overview

Balancer is a flexibile protocol and as such there are many choices an user or project has to make when creating a new pool. This page will walk through the different tradeoffs when it comes to pool types, token composition, fees, and more to best optimize liquidity and trading volume.

## Pool Types

Choosing the type of pool to use is straightforward based on a few simple factors. The primary being the expected price variations between the tokens in the pool. For most non-stable assets a [Weighted Pool](/concepts/pools/weighted.md) is the right choice. For assets that are stable like stablecoins or assets that are stable against each other with a known price rate (ex: wstETH/weth), a [Composable Stable Pool](/concepts/pools/composable-stable.md) allows for much deeper liquidity.

The Balancer Dapp has a [pool creation interface](https://app.balancer.fi/#/ethereum/pool/create) for weighted pools. For stable pool creation, reach out to our devs on [Discord](https://discord.balancer.fi/) for assistance.

### Features enabled on each type

| Feature                      | Composable Pool - V3  | Weighted Pool - V3   | Linear Pool - V2    |
|------------------------------|-----------------------|----------------------|---------------------|
| Date of Release              | 02/06/2023            | 02/06/2023           | 02/06/2023          |
| BPT Token at 0 index         | :heavy_check_mark:    | :x:                  | :x:                 |
| Tokens sorted alphabetically | :x:                   | :heavy_check_mark:   | :heavy_check_mark:  |
| Recovery mode                | :heavy_check_mark:    | :heavy_check_mark:   | :heavy_check_mark:  |
| Proportional Join            | :heavy_check_mark:    | :heavy_check_mark:   | :heavy_check_mark:  |
| Exit Join                    | :heavy_check_mark:    | :heavy_check_mark:   | :heavy_check_mark:  |

### Features enabled on each type - Deprecated Pools

| Feature                      | Phanton Stable Pool - V1 | Weighted Pool - V2  | Meta Stable Pool |
|------------------------------|--------------------------|---------------------|------------------|
| Date of Release              |                          |                     |                  |
| BPT Token at 0 index         | :x:                      | :x:                 |                  |
| Tokens sorted alphabetically | :heavy_check_mark:       | :heavy_check_mark:  |                  |
| Recovery mode                | :x:                      |                     |                  |
| Proportional Join            | :x:                      |                     |                  |
| Exit Join                    |                          |                     |                  |

## Token Composition

### Weighted Pools

One of the frequent mistakes in new weighted pools has to do with the token composition. A common example is an user creating a 33/33/33 weighted pool with XYZ / WETH / USDC (where XYZ represents any arbitrary token). The thinking behind this is by adding both WETH & USDC to the pool it makes it easier to trade XYZ into either. In a vacuum this may be true, but by doing so this actually hurts slippage for this pool and also is not ideal for overall platform liquidity. Instead a better option is to pair XYZ with a WETH/USDC pool BPT (or even more ideally a bb-a-USDC/(wstETH/weth) pool BPT). Now if a trader wanted to go from WETH->XYZ, for the same dollar amounts the 50/50 pool will have more liquidity and therefore better slippage for a given pair than 33/33. All of the frontends, aggregators, and arbitrageurs can automatically see the underlying tokens of the BPT paired and create direct paths from WETH->XYZ and USDC->XYZ with minimal gas costs.

In general weighted pools should stick to 2 tokens and pair with a "core routing" Balancer pool like bb-a-usd, (wstETH/weth), or (bb-a-usd/wst-ETH). More than 2 tokens in a pool can be useful for stable pools or managed pools where the pool is viewed more as an ETF.

## Fees

There a few choices to make when setting the swap fees for a new pool:

1. Should the fee be permanently fixed?
2. If variable who should control the updates?
   - Balancer Governance
   - A set address or contract
3. What should the swap fee amount be?

To set a permanent fee, an `owner` of `0x0000000000000000000000000000000000000000` is set upon pool creation. However in general the recommendation is to allow Balancer governance (and delegated addresses) to dynamically adjust the fees. This is done by setting an owner of `0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b`.

There are lots of discussion and research around how to best set a swap fee amount, but a general rule of thumb is for stable assets it should be lower (ex: `0.1%`) and non-stable pairs should be higher (ex: `0.3%`).