# BPT as Collateral

<aside>
💡 Throughout this document, we use the term, "`StablePools` with `RateProviders`." This refers to any Balancer V2 
    pool employing the `StableMath` library and allowing for the inclusion of `RateProviders` for some or all 
    constituent tokens. These pools need not all come from the same factory; some examples include `MetaStablePool`, 
    `StablePhantomPool`, and `ComposableStablePool`.
</aside>

# How to price BPT of a stable pool without rate providers?

[Chainlink's article on pricing Curve LP tokens](https://blog.chain.link/using-chainlink-oracles-to-securely-utilize-curve-lp-pools/) 
serves as the canonical reference. The article describes a methodology for computing the worst-case price of 
traditional `StableSwap` liquidity positions, which can be useful specifically for lending markets. The approach 
has been utilized by countless Curve integrators, including Aave, Maker, and Yearn.

## Curve

It looks like this (consider a classical Curve 3pool):

1. Query Chainlink prices for `DAI`, `USDC`, and `USDT`.
2. Compute the minimum of those three prices and call it `minPrice`.
3. The final answer is `minPrice * pool.get_virtual_price()`.

Curve's `get_virtual_price()` is perfectly analogous to Balancer's `getRate()`: it returns the price of the pool 
in terms of its "base asset," which in the case of the 3pool is some imaginary version of "USD." In other words, 
`get_virtual_price()` accounts for the accumulation of yield since the creation of the pool, and **assuming all 
three underlying price pegs are pretty good**, it can be considered a valid USD price of the 3pool LP token.

In case of a depeg, step #2 above ensures that we underprice (at worst) the LP token so as not to make any poor 
price assumptions to the upside and leave lending markets at risk of accumulating bad debt. It is better to 
underestimate and over-liquidate than it is to do the opposite, and in fact the minimum price should be 
representative of the pool's entire balance as long as the amplification factor is sufficiently high.

## Balancer

To translate this methodology for any Balancer `StablePool` (from the original `StablePoolFactory`, 
which does not include `RateProviders`):

1. Query Chainlink prices for all constituent tokens (i.e., `vault.getPoolTokens(poolId)`).
2. Compute the minimum of those prices and call it `minPrice`.
3. Return `minPrice * pool.getRate()`.

# Problem Introducing `RateProviders`

The introduction of `RateProviders` into the `StablePool` creates an obvious issue. Consider the computation of the 
minimum (we use `p` to denote a price):

```solidity
min(pConstituent0, pConstituent1, pConstituent2)
```

If our constituent tokens have `RateProviders`, then by definition they cannot be **like-kind assets**. 
Theoretically, they are all somehow pegged to the same "base asset", or else they wouldn't be included in 
a `StablePool`, but the nature of each peg can now differ. One token might be worth $1 while another is worth 
$1.50 and the third $100. If that's the case, then the minimum doesn't tell us anything and in fact returns a 
very wrong result.

There's a reason we've used the term "constituent" so far instead of "underlying", and that's to illustrate a 
subtle difference: the "constituent" assets are the exact tokens included in the pool, whereas we might think 
of "underlying" as the innermost constituents of nested derivatives (pools or wrapped tokens). For example, in 
`bb-a-USD`, the constituents are three `LinearPool` BPTs: `bb-a-DAI`, `bb-a-USDC`, and `bb-a-USDT`. But the 
underlying tokens are `DAI`, `USDC`, and `USDT`.

# The Solution

To calculate the BPT price from a `StablePool` with `RateProviders`, we need to answer the question: **How to 
choose the token with the minimum price, if they are not directly related?**

To answer that, we need to evaluate the basic formula of a stable pool invariant near equilibrium:

```solidity
    uint256 k = chi * (P_RP_0 * B_0 + P_RP_1 * B_1 + ...) + (P_RP_0 * B_0 * P_RP_1 * B_1 * ...)
```

where 
* `P_RP_i` is the price from RateProvider of token `i`;
* `B_i` is the balance of token `i`;
* `chi` is a function of the amplification factor of the stable pool. The closer to the equilibrium, 
  the greater is `chi`.

Assuming that the stable pool is near equilibrium, we can assume that chi parameter is near infinite, so
the invariant will be approximately the constant sum invariant.

```solidity
    uint256 invariant = P_RP_0 * B_0 + P_RP_1 * B_1 + ...
```

The invariant is used to calculate `pool.getRate()`, which is `uint256 rate = invariant/actualBptSupply`. So, if we
want to multiply `minPrice * pool.getRate()`, we first need to normalize the RateProviders prices of the invariant.
To do that, let's analyse the price components of an underlying token.

## Underlying Token Prices

The underlying tokens have two different valuations: the market price (Chainlink oracles) and the pool price 
(RateProvider). The market price and the RateProvider price are usually close in value, so a division between these
numbers tends to be close to 1, making the division to be a good candidate to normalize prices and find the lowest
price. So, the `minPrice` would be calculated by

```solidity
    uint256 minPrice = min(P_M_0/P_RP_0, P_M_1/P_RP_1, P_M_2/P_RP_2)
```

Where `P_M_i` is market price of constituent `i`, and `P_RP_i` is the RateProvider price for constituent `i`.

Using this `minPrice` and multiplying by `pool.getRate()`, assuming that the `StablePool` is near equilibrium, we'd
have (assuming token 0 has the lowest minPrice):

```
    bptPrice = minPrice * pool.getRate() = (P_M_0 / P_RP_0) * (P_RP_0 * B_0 + P_RP_1 * B_1 + ...) / actualBptSupply
```

Simplifying the formula above, we have

```
    bptPrice = P_M_0 * (B_0 + (P_RP_1/P_RP_0)*B_1 + ... + (P_RP_n/P_RP_0) * B_n)
```

So, we can see that RateProviders prices were normalized by P_RP_0, for all tokens, before multiplying by market 
price of token 0.

# Examples

## Example 1: `bb-a-USD`

For `bb-a-USD`, the step-by-step to calculate the BPT price is:

1. 

```solidity
min(pDAI, pUSDC, pUSDT) * pool.getRate()
```

This works because `bb-a-USD.getRate()` conveniently **includes the rates of its constituents (`bb-a-DAI`, `bb-a-USDC`, 
`bb-a-USDT`) already!**

### Example 2: `wstETH/WETH`

Similarly, for the `wstETH/WETH` pool, we want to do this:

```solidity
min(pStETH, pWETH) * pool.getRate()
```

Note that we are using the price of (unwrapped) `stETH` instead of the actual constituent, `wstETH`! This is very 
counter-intuitive to some, but it makes sense if we consider a long time horizon. Eventually, we would expect 1 
`wstETH` to be worth 100 `WETH`, as yield will continue to accrue in perpetuity. At that point, a direct comparison 
between them would obviously not make sense, as `wstETH` would need to lose 99% of its value relative to `WETH` 
before the minimum would ever change.

We need to compare the prices of **like-kind assets** like `stETH` and `WETH`, before including the pool's overall 
rate which is expressed in terms of the "base asset" (ETH) and therefore **already includes the `stETH`->`wstETH` 
price conversion!**

# Practical Solutions

So, the solution seems self-evident, but the question is how do we arrive at the same solution for all pools? Is 
there a way to fully generalize this methodology to any `StablePool` with `RateProviders`, or does building these 
oracles necessitate possessing some extra off-chain information about each pool's composition? And is there a single 
solution that will work for all oracle architectures, or is this bespoke in nature?

It might be helpful to think about crafting a solution that satisfies both examples above, which are quite different: 
in one case, all constituents are `LinearPool` BPTs, and in the other there are two tokens but only one `RateProvider` 
(which does not belong to a BPT).

## A Potentially Problematic Example

There is also perhaps a third example which is even more challenging: the `stMATIC/WMATIC` pool. `stMATIC` is like 
`wstETH` in that it doesn't rebase (it's not 1:1 with `WMATIC`), but it's like `stETH` in that it is not a wrapper: 
it cannot be reduced to another underlying token. So, how could we fit a token like this into the minimum-underlying 
formula?

It seems that one possible solution would be to have two oracles: the market rate (which reflects the current trading 
price) and the on-chain rate (which reflects the theoretical price: deposits/supply). To compute a `WMATIC`-equivalent 
price of `stMATIC` for insertion into `min()`, take the market rate and divide by the on-chain rate. This works because 
a depeg event can be identified as a divergence of the market rate from the theoretical rate. Important: the pool's 
`RateProvider` would have to use the on-chain rate in this case.

This would be analogous to the `wstETH` example like so:

```solidity
// In the wstETH/WETH pool...
//   the RateProvider uses pOnChainStEth2WstEth
//   the correct price for min() is pMarketWeth2StEth
pMarketWeth2WstEth = pMarketWeth2StEth * pOnChainStEth2WstEth

// In the stMATIC/WMATIC pool...
//   the RateProvider must use pOnChainWmatic2StMatic (does it?)
//   the correct price for min() is pIntermediate
pMarketWmatic2StMatic = pIntermediate * pOnChainWmatic2StMatic
pIntermediate = pMarketWmatic2StMatic / pOnChainWmatic2StMatic
```