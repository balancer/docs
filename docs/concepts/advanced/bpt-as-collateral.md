# StablePool's BPT as Collateral

Throughout this document, we use the term, "`StablePools` with `RateProviders`". This refers to any Balancer V2 
pool employing the `StableMath` library and allowing for the inclusion of `RateProviders` for some or all 
constituent tokens. These pools need not all come from the same factory; some examples include `MetaStablePool`, 
`StablePhantomPool`, and `ComposableStablePool`.

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
minimum price (we use `p` to denote a price):

```solidity
minPrice = min(pConstituent0, pConstituent1, pConstituent2)
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

$$ k = chi * (P_{RP_0} * B_0 + P_{RP_1} * B_1 + ...) + (P_{RP_0} * B_0 * P_{RP_1} * B_1 * ...)$$

where 
* `P_RP_i` is the price from RateProvider of token `i`;
* `B_i` is the balance of token `i`;
* `chi` is a function of the amplification factor of the stable pool. The closer to the equilibrium, 
  the greater is `chi`.

Assuming that the stable pool is near equilibrium, we can assume that chi parameter is near infinite, so
the invariant will be approximately the constant sum invariant.

$$ invariant = P_{RP_0} * B_0 + P_{RP_1} * B_1 + ... $$

The invariant is used to calculate `pool.getRate()`, which is `uint256 rate = invariant/actualBptSupply`. So, if we
want to multiply `minPrice * pool.getRate()`, we first need to normalize the RateProviders prices of the invariant.
To do that, let's analyse the price components of an underlying token.

## Underlying Token Prices

The underlying tokens have two different valuations: the market price (Chainlink oracles) and the pool price 
(RateProvider). The market price and the RateProvider price are usually close in value, so a division between these
numbers tends to be close to 1, making the division to be a good candidate to normalize prices and find the lowest
price. So, the `minPrice` would be calculated by

$$ minPrice = min({P_{M_0} \over P_{RP_0}}, {P_{M_1} \over P_{RP_1}}, {P_{M_2} \over P_{RP_2}}, ...) $$

where 
* `P_M_i` is market price of constituent `i`;
* `P_RP_i` is the RateProvider price for constituent `i`. When no rate provider is available, use `1e18`.

Using this `minPrice` and multiplying by `pool.getRate()`, assuming that the `StablePool` is near equilibrium, we'd
have (assuming token 0 has the lowest minPrice):

$$ bptPrice = minPrice * pool.getRate() = {P_{M_0} \over P_{RP_0}} * {P_{RP_0} * B_0 + P_{RP_1} * B_1 + ... \over actualBptSupply} $$

Simplifying the formula above, we have

$$ bptPrice = P_{M_0} * (B_0 + {P_{RP_1} \over P_{RP_0}} * B_1 + ... + {P_{RP_n} \over P_{RP_0}} * B_n) $$

So, we can see that RateProviders prices were normalized by `P_RP_0`, for all tokens, before multiplying by `P_M_0` 
(market price of token 0).

# Examples

## ComposableStablePools with Linear Pool BPTs (e.g. bb-a-USD)

### 1. Get market price of each constituent token of bb-a-USD

In order to get market price for each constituent token of bb-a-USD (bb-a-USDT, bb-a-USDC, bb-a-DAI) we should use 
the following formula (using USDT as example):

$$ P_{M_{bb-a-USDT}} = P_{USDT} * rate_{pool_{aUSDT}} $$

where
* `P_USDT` is the chainlink oracle price for USDT (in terms of USD);
* `rate_pool_aUSDT` is `pool.getRate()` of bb-a-USDT pool;

### 2. Get RateProvider price of each pool token

In order to get RateProvider price of each constituent token of bb-a-USD, we should use getTokenRate() function of
bb-a-USD pool for each token address (bb-a-USDT, bb-a-USDT and bb-a-DAI).

$$ P_{RP_{bb-a-USDT}} = tokenRate_{bb-a-USDT} $$

### 3. Get minimum price

$$ minPrice = min({P_{M_{bb-a-USDT}} \over P_{RP_{bb-a-USDT}}}, {P_{M_{bb-a-USDC}} \over P_{RP_{bb-a-USDC}}}, {P_{M_{bb-a-DAI}} \over P_{RP_{bb-a-DAI}}}) $$

### 4. Calculates the BPT price

$$ P_{BPT_{bb-a-USD}} = minPrice * rate_{pool_{bb-a-USD}} $$

where `rate_pool_bb-a-USD` is `pool.getRate()` of bb-a-USD pool.

If we manually solve this formula, assuming a pool near equilibrium point to simplify invariant calculation and having 
USDT's value as minPrice, we'd have:

$$ P_{BPT_{bb-a-USD}} = {P_{M_{bb-a-USDT}} \over P_{RP_{bb-a-USDT}}} * {(P_{RP_{bb-a-USDT}} * B_{bb-a-USDT}) + (P_{RP_{bb-a-USDC}} * B_{bb-a-USDC}) + (P_{RP_{bb-a-DAI}} * B_{bb-a-DAI}) \over actualBptSupply} $$

which, simplifying, becomes

$$ P_{BPT_{bb-a-USD}} = P_{M_{bb-a-USDT}} * {B_{bb-a-USDT} + ({P_{RP_{bb-a-USDC}} \over P_{RP_{bb-a-USDT}}} * B_{bb-a-USDC}) + ({P_{RP_{bb-a-DAI}} \over P_{RP_{bb-a-USDT}}} * B_{bb-a-DAI}) \over actualBptSupply} $$

## MetaStablePools (e.g. wstETH-wETH)

### 1. Get market price for each constituent token

Get market price of wstETH and wETH in terms of USD, using chainlink oracles.

### 2. Get RateProvider price for each constituent token

Since wstETH - wETH pool is a MetaStablePool and not a ComposableStablePool, it does not have `getTokenRate()` function.
Therefore, we need to get the RateProvider price manually for wstETH, using the rate providers of the pool. The rate 
provider will return the wstETH token in terms of stETH.

Note that wETH does not have a rate provider for this pool. In that case, we assume a value of `1e18` (it means, 
we won't divide market price of wETH by any value and use it purely in the minPrice formula).

### 3. Get minimum price

$$ minPrice = min({P_{M_{wstETH}} \over P_{RP_{wstETH}}}, P_{M_{wETH}}) $$

### 4. Calculates the BPT price

$$ P_{BPT_{wstETH-wETH}} = minPrice * rate_{pool_{wstETH-wETH}} $$

where `rate_pool_wstETH-wETH` is `pool.getRate()` of wstETH-wETH pool.

If we manually solve this formula, assuming a pool near equilibrium point to simplify invariant calculation and having
wstETH's value as minPrice, we'd have:

$$ P_{BPT_{wstETH-wETH}} = {P_{M_{wstETH}} \over P_{RP_{wstETH}}} * {(P_{RP_{wstETH}} * B_{wstETH}) + (P_{RP_{wETH}} * B_{wETH}) \over actualBptSupply} $$

which, simplifying, and remembering that `P_RP_wETH` is 1e18, becomes:

$$ P_{BPT_{wstETH-wETH}} = P_{M_{wstETH}} * { B_{wstETH} + ({1e18 \over P_{RP_{wstETH}}} * B_{wETH}) \over actualBptSupply} $$

## ComposableStablePools (stMATIC-wMATIC)

stMATIC is a special case, since `stMATIC` is like `wstETH` in that it doesn't rebase (it's not 1:1 with `WMATIC`), but 
it's like `stETH` in that it is not a wrapper: it cannot be reduced to another underlying token.

However, the generalized formula from the solution above also works for this.

### 1. Get market price for each constituent token

Get market price of stMATIC and wMATIC in terms of USD, using chainlink oracles.

### 2. Get RateProvider price for each constituent token

Since stMATIC-wMATIC pool is a ComposableStablePool, it has `getTokenRate()` function, so we should use that to fetch
RateProvider rates for each token. Notice that wMATIC rate is 1e18, even if the rate provider is not set for this token.

### 3. Get minimum price

$$ minPrice = min({P_{M_{stMATIC}} \over P_{RP_{stMATIC}}}, {P_{M_{wMATIC}} \over P_{RP_{wMATIC}}}) $$

### 4. Calculates the BPT price

$$ P_{BPT_{stMATIC-wMATIC}} = minPrice * rate_{pool_{stMATIC-wMATIC}} $$

where `rate_pool_stMATIC-wMATIC` is `pool.getRate()` of stMATIC-wMATIC pool.