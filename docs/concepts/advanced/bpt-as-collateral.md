# StablePool's BPT as Collateral

Throughout this document, the term "`StablePools` with `RateProviders`" is used. This refers to any Balancer V2 
pool employing the `StableMath` library and allowing for the inclusion of `RateProviders` for some or all 
constituent tokens. Several pool factories deploy pools which employs `StableMath`, such as `MetaStablePool`, 
`StablePhantomPool`, and `ComposableStablePool`.

# How to price BPT of a stable pool without rate providers?

[Chainlink's article on pricing Curve LP tokens](https://blog.chain.link/using-chainlink-oracles-to-securely-utilize-curve-lp-pools/) 
serves as the canonical reference. The article describes a methodology for computing the worst-case price of 
traditional `StableSwap` liquidity positions, which can be useful specifically for lending markets. The approach 
has been utilized by countless Curve integrators, including Aave, Maker, and Yearn.

## Curve

Curve's methodology is as follows (consider a classical Curve 3pool):

1. Query Chainlink prices for `DAI`, `USDC`, and `USDT`.
2. Compute the minimum of those three prices and call it `minPrice`.
3. The final answer is `minPrice * pool.get_virtual_price()`.

Curve's `get_virtual_price()` is perfectly analogous to Balancer's `getRate()`: it returns the price of the pool 
in terms of its "base asset", which in the case of the 3pool is some imaginary version of "USD". In other words, 
`get_virtual_price()` accounts for the accumulation of yield since the creation of the pool, and **assuming all 
three underlying price pegs are good**, it can be considered a valid USD price of the 3pool LP token.

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

# Problem: Introducing `RateProviders`

The introduction of `RateProviders` into the `StablePool` creates an obvious issue. Consider the computation of the 
minimum price (we use $P_i$ to denote the price of constituent $i$):

$$ minPrice = min({P_0}, {P_1}, {P_2}) $$

If the constituent tokens have `RateProviders`, then by definition they cannot be **like-kind assets**. 
Theoretically, they are all somehow pegged to the same "base asset", or else they wouldn't be included in 
a `StablePool`, but the nature of each peg can now differ. One token might be worth $1 while another is worth 
$1.50 and the third $100. If that's the case, then the minimum formula is not applicable and in fact returns a 
very wrong result.

There's a reason to use the term "constituent" instead of "underlying":

* "constituent" assets are the exact tokens included in the pool;
* "underlying" assets are the innermost constituents of nested derivatives (pools or wrapped tokens). 

Example: in `bb-a-USD`, the constituents are three `LinearPool` BPTs: `bb-a-DAI`, `bb-a-USDC`, and `bb-a-USDT`. But the 
underlying tokens are `DAI`, `USDC`, and `USDT`.

# The Solution

The mathematical demonstration of the solution is found at the [Appendix](#appendix).

The constituent tokens have two different valuations: the market price (Chainlink oracles) and the pool price
(RateProvider). The market price and the RateProvider price are usually close in value, so a division between these
numbers tends to be close to 1, making the division to be a good candidate to normalize prices and find the lowest
price. So, the `minPrice` (from `minPrice * pool.getRate()` formula described above) would be calculated by

$$ minPrice = min({P_{M_0} \over P_{RP_0}}, {P_{M_1} \over P_{RP_1}}, {P_{M_2} \over P_{RP_2}}, ...) $$

where
* $P_{M_i}$ is market price of constituent `i`;
* $P_{RP_i}$ is the RateProvider price for constituent `i`. When no rate provider is available, use `1e18`.

Therefore, BPT price can be calculated by:

$$ bptPrice = minPrice * pool.getRate() $$

# Examples

## `ComposableStablePools` with `LinearPool` BPTs (e.g. `bb-a-USD`)

### 1. Get the market price of each constituent token of `bb-a-USD`.

In order to get the market price of each constituent token of `bb-a-USD` (i.e., `bb-a-USDT`, `bb-a-USDC`, `bb-a-DAI`), we should use 
the following formula (using `USDT` as an example):

$$ P_{M_{bb-a-USDT}} = P_{USDT} * rate_{pool_{aUSDT}} $$

where
* $P_{USDT}$ is the Chainlink oracle price for `USDT` (in terms of USD);
* $rate_{pool_{aUSDT}}$ is `pool.getRate()` from the `bb-a-USDT` pool;

### 2. Get the `RateProvider` price of each constituent token.

In order to get the `RateProvider` price of each constituent token of `bb-a-USD`, we should use the `getTokenRate()` function of the
`bb-a-USD` pool for each token address (`bb-a-USDT`, `bb-a-USDC` and `bb-a-DAI`).

$$ P_{RP_{bb-a-TOKEN}} = tokenRate_{bb-a-TOKEN} $$

In this case, $tokenRate_{bb-a-TOKEN}$ is equal to `pool.getRate()` from the given pool (e.g., `bb-a-USDT`, `bb-a-USDC`, `bb-a-DAI`).

It may seem redundant to multiply by `pool.getRate()` to get the market price, then divide by `pool.getRate()` again.
Remember that this is a generic method to calculate BPT prices that works for tokens of different types, as will be 
demonstrated in the next examples.

### 3. Get minimum price

$$ minPrice = min({P_{M_{bb-a-USDT}} \over P_{RP_{bb-a-USDT}}}, {P_{M_{bb-a-USDC}} \over P_{RP_{bb-a-USDC}}}, {P_{M_{bb-a-DAI}} \over P_{RP_{bb-a-DAI}}}) $$

Since $tokenRate_{bb-a-TOKEN}$ is equal to `pool.getRate()` of `bb-a-TOKEN` pool, the division 
${P_{M_{bb-a-TOKEN}} \over P_{RP_{bb-a-TOKEN}}}$ can be simplified

$$ {P_{M_{bb-a-TOKEN}} \over P_{RP_{bb-a-TOKEN}}} = {P_{TOKEN} * rate_{pool_{aTOKEN}} \over rate_{pool_{aTOKEN}}} = P_{TOKEN}$$

Therefore, minPrice is calculated as

$$ minPrice = min(P_{USDT}, P_{USDC}, P_{DAI}) $$

Remembering, not always the RateProvider price will be included in the Market price. This assumption is valid only for
Linear Pool tokens.

### 4. Calculates the BPT price

$$ P_{BPT_{bb-a-USD}} = minPrice * rate_{pool_{bb-a-USD}} $$

where `rate_pool_bb-a-USD` is `pool.getRate()` of bb-a-USD pool.

## MetaStablePools (e.g. wstETH-WETH)

### 1. Get market price for each constituent token

Get market price of wstETH and WETH in terms of USD, using chainlink oracles.

### 2. Get RateProvider price for each constituent token

Since wstETH - WETH pool is a MetaStablePool and not a ComposableStablePool, it does not have `getTokenRate()` function.
Therefore, it`s needed to get the RateProvider price manually for wstETH, using the rate providers of the pool. The rate 
provider will return the wstETH token in terms of stETH.

Note that WETH does not have a rate provider for this pool. In that case, assume a value of `1e18` (it means,
market price of WETH won't be divided by any value, and it's used purely in the minPrice formula).

### 3. Get minimum price

$$ minPrice = min({P_{M_{wstETH}} \over P_{RP_{wstETH}}}, P_{M_{WETH}}) $$

### 4. Calculates the BPT price

$$ P_{BPT_{wstETH-WETH}} = minPrice * rate_{pool_{wstETH-WETH}} $$

where `rate_pool_wstETH-WETH` is `pool.getRate()` of wstETH-WETH pool.

## ComposableStablePools (stMATIC-wMATIC)

stMATIC is a special case, since `stMATIC` accrues value and doesn't rebase, so it's not 1:1 with WMATIC. Therefore,
it cannot be reduced to anoter underlying token.

However, the generalized formula from the solution above also works for this.

### 1. Get market price for each constituent token

Get market price of stMATIC and wMATIC in terms of USD, using chainlink oracles.

### 2. Get RateProvider price for each constituent token

Since stMATIC-wMATIC pool is a ComposableStablePool, it has `getTokenRate()` function, which make it easier to fetch
RateProvider rates for each token. Notice that wMATIC rate is 1e18, even if the rate provider is not set for this token.

### 3. Get minimum price

$$ minPrice = min({P_{M_{stMATIC}} \over P_{RP_{stMATIC}}}, {P_{M_{wMATIC}} \over P_{RP_{wMATIC}}}) $$

### 4. Calculates the BPT price

$$ P_{BPT_{stMATIC-wMATIC}} = minPrice * rate_{pool_{stMATIC-wMATIC}} $$

where `rate_pool_stMATIC-wMATIC` is `pool.getRate()` of stMATIC-wMATIC pool.

# Appendix

## Proof of the solution

**How to choose the token with the minimum price, if they are not directly related (pegged)?**

Answering the question above is the key to calculate the BPT price from a `StablePool` with `RateProviders`. To answer 
that, consider the basic formula of a stable pool invariant near equilibrium:

$$ k = chi * (\sum_{i=0}^{n} P_{RP_i} * B_i) + (\prod_{i=0}^{n} P_{RP_i} * B_i)$$

where
* $P_{RP_i}$ is the price from RateProvider of token `i`;
* $B_i$ is the balance of token `i`;
* $chi$ is a function of the amplification factor of the stable pool. The closer to the equilibrium,
  the greater is $chi$;
* $n$ is the total number of tokens in the pool.

When the stable pool is near equilibrium, the $chi$ parameter is near infinite, so the invariant will be approximately 
the constant sum invariant.

$$ invariant = \sum_{i=0}^{n} P_{RP_i} * B_i $$

The invariant is used to calculate `pool.getRate()`, which is `uint256 rate = invariant/actualBptSupply`. So, in order 
to multiply `minPrice * pool.getRate()`, the RateProviders prices of the invariant must be normalized. To accomplish 
that, an understanding of the price components of an underlying token is needed.

### Constituent Token Prices

The constituent tokens have two different valuations: the market price (Chainlink oracles) and the pool price
(RateProvider). The market price and the RateProvider price are usually close in value, so a division between these
numbers tends to be close to 1, making the division to be a good candidate to normalize prices and find the lowest
price. So, the `minPrice` would be calculated by

$$ minPrice = min({P_{M_0} \over P_{RP_0}}, {P_{M_1} \over P_{RP_1}}, ..., {P_{M_n} \over P_{RP_n}}) $$

where
* $P_{M_i}$ is market price of constituent `i`;
* $P_{RP_i}$ is the RateProvider price for constituent `i`. When no rate provider is available, use `1e18`;
* $n$ is the total number of tokens in the pool.

The following calculation for BPT price is reached using this `minPrice` and multiplying by `pool.getRate()`, 
assuming that the `StablePool` is near equilibrium and `token 0` is the token with the lowest price:

$$ bptPrice = minPrice * pool.getRate() = {P_{M_0} \over P_{RP_0}} * {\sum_{i=0}^{n} P_{RP_i} * B_i \over actualBptSupply} $$

Simplifying the formula above

$$ bptPrice = P_{M_0} * {(B_0 + \sum_{i=1}^{n} {P_{RP_i} \over P_{RP_0}} * B_i) \over actualBptSupply} $$

Notice that RateProviders prices were normalized by $P_{RP_0}$, for all tokens, before multiplying by $P_{M_0}$
(market price of token 0).