# Valuing BPT

## Overview

There are a variety of reasons that one might want to determine the value of a Balancer Pool Token (BPT). Ultimately, it comes down to assessing the value of the underlying tokens per BPT. Please **pay attention to the warnings on this page**, as they are critical for calculating values accurately.

### Informational

If evaluating a BPT purely for informational purposes (e.g. displaying on a UI), the calculation is quite trivial.

### On-Chain

When evaluating for mission critical operations (e.g. determining if a loan with BPT as collateral can be liquidated), however, data validity and manipulation resistance are extremely important.

## Getting BPT Supply

::: warning Don't use `totalSupply` without reading this first!
Balancer Pools with [pre-minted BPT](../preminted-bpt.md) will always return `type(uint211).max`.
:::

There are three potential functions to query when determining the BPT supply depending on pool type. When evaluating a new pool type, ensure that you are using the correct supply function!

### `getActualSupply`

This is the most common/current function to call. `getActualSupply` is used by the most recent versions of Weighted and Stable Pools. It accounts for pre-minted BPT as well as due protocol fees.

### `getVirtualSupply`

This is used by Linear Pools and "legacy" Stable Phantom Pools. It accounts for pre-minted BPT but does not take due protocol fees into account. The omission of protocol fee calculations in Linear Pools is intentional since they do not pay protocol fees.

### `totalSupply`

In general, `totalSupply` only makes sense to call for older "legacy" pools. The original Weighted and Stable Pools do not have pre-minted BPT, so they follow the typical convention of using `totalSupply` to account for issued pool shares.

## Informational Price Evaluation

::: warning Don't use this on-chain!
This calculation is for infomational purposes only since it can be easily manipulated.
:::

In short, BPT value is calculated by getting all underlying balances, multiplying those by their market prices, and dividing by the total supply of LP tokens.

$$ price*{BPT} = \frac{\sum*{i=0\rightarrow n}{Balance*i \* Price_i}}{Supply*{BPT}} $$

## On-Chain Price Evaluation

::: warning Check for Balancer Vault re-entrancy on ALL on-chain price evaluations!!!
When evaluating BPT price on-chain, it is **CRUCIAL** to verify that the Balancer Vault is not being re-entered.

The recommended method for doing this is using Balancer's [VaultReentrancyLib](https://github.com/balancer/balancer-v2-monorepo/blob/90f77293fef4b8782feae68643c745c754bac45c/pkg/pool-utils/contracts/lib/VaultReentrancyLib.sol). Calling `ensureNotInVaultContext(vault)` will perform a noop call to the Vault that will fail if an attacker is attempting a read-only re-entrancy attack.

This library can be imported from version >= 3.1.2 of [v2-pool-utils](https://www.npmjs.com/package/@balancer-labs/v2-pool-utils).
:::

### Weighted Pools

When calculating a Weighted Pool BPT price on-chain, it's important to use a manipulation resistant technique. The below formula uses the invariant, V, instead of balances directly. While token balances _are_ used in the calculation of the invariant, the error is bounded by the swap fees that an attacker would have to pay to significantly imbalance a pool.

$$ Price*{BPT}=\frac{V}{Supply*{BPT}} \* \prod*{i=0\rightarrow n} \lparen \frac{{Price_i}}{weight_i}\rparen^{weight_i} $$
Where V is the WeightedMath invariant calculated as:
$$ V=\prod*{i=0\rightarrow n}{Balance_i^{weight_i}} $$

Forumla derivation [here](https://twitter.com/0xa9a/status/1539227193808629761).

### Stable Pools

The `pool.getRate()` function returns the exchange rate of a BPT to the underlying base asset of the pool accounting for rate providers, if they exist.
A few examples:

- The `WETH/wstETH` pool will return a rate relative to `WETH`
- `bb-a-USD` will return a rate relative to USD, calculated as a weighted average of the underlying stablecoins (`DAI`, `USDC`, `USDT`) in the nested linear pools (`bb-a-DAI`, `bb-a-USDC`, `bb-a-USDT`)

#### Using `StablePool` BPT as Collateral

To use BPT as Collateral, please refer to [this page](./bpt-as-collateral.md).

### Linear Pools

Linear Pools have a `pool.getRate()` function that return the exchange rate of a BPT to the underlying base asset (`mainToken`) of the pool.
