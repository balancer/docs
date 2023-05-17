# Rate Providers

## Overview

Rate Providers are contracts that provide an exchange rate between two assets. These exchange rates can come from any on-chain source, whether that may be an oracle, a ratio of queryable balances, or another calculation.

Rate Providers implement a `getRate()` function that returns an exchange rate.

## Use Cases

You can use `rateProvider`s for all, some, or none of the assets in your pool. If you are not using a rateProvider for an asset, you must pass the zero address (`0x0000000000000000000000000000000000000000`), which will result in a rate of 1.

### All Assets

You will want to use `rateProvider`s for all assets in your pool when each asset has its own price that is independent of all the other assets' prices. If we have tokens A, B, and C and only have price feeds with respect to USD, then we would want all assets to have price feeds. When internally calculating relative prices, the USD would cancel out, giving us prices for A:B, A:C, B:C, and their inverses.

### Some Assets

You will want to use `rateProvider`s for some assets in your pool when you have rates that directly convert between the assets. If we have tokens A and B and a rate provider that gives the price of A with respect to B, then the `rateProvider` corresponding to token A would get the A:B price feed, and the `rateProvider` corresponding to token B would be the zero address.

### None of the Assets

You will have no `rateProvider`s in your pool when your tokens are price-pegged to each other. For example, a pool with `USDC`, `USDT`, and `DAI` would have all `rateProvider`s set to the zero address since the exchange rate between those tokens is 1.

## Examples

### Direct Balance Query

Wrapping rebasing tokens, such as `stETH`, makes them compatible with Balancer, but knowing the exchange rate between the underlying rebasing token and the wrapped token is necessary to facilitate Stableswap trades. As such, the `wstETH` `rateProvider` has a `getRate()` function that calls `wstETH`'s own `stEthPerToken()` function. [See the contract here](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/WstETHRateProvider.sol).

### Oracles

Using oracles for price feeds is a simple way to determine an exchange rate. There are two example contracts for how to use Chainlink as a price source: [`ChainlinkRegistryRateProvider`](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/ChainlinkRegistryRateProvider.sol) and [`ChainlinkRateProvider`](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/ChainlinkRateProvider.sol).

#### [`ChainlinkRegistryRateProvider`](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/ChainlinkRegistryRateProvider.sol)

This contract makes use of Chainlink's registry contract so it can handle if Chainlink migrates to a new price feed for a given asset pair. Though there are increased gas costs for this, its a tradeoff for ensuring the pool doesn't get stuck on an abandoned price feed. While this is an unlikely scenario, it doesn't hurt to be careful.

#### [`ChainlinkRateProvider`](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/ChainlinkRateProvider.sol)

If you're running on a network for which Chainlink doesn't have a registry and you think the risk of a deprecated price feed is low enough, then you can use the rateProvider that directly queries a given Chainlink oracle.

## RateProviders as part of a pool's lifecycle
| PoolType              | Yield Fee        |  Pricing Equations| 
| -----------           | -----------      |  -----------      |
| Composable Stable Pool| ✅               | ✅                |
| Weighted Pool         | ✅               | ❌              |
| Managed Pool          | Text             | Text              |
| Custom Pool           | Text             | Text              |

Looking at this [transaction](https://etherscan.io/tx/0x67f477517acf6e0c91ec7997e665ca25d2806da060af30272876742584f0aa21). 50 ETH is being exchanged for 46.68 rETH. This pool is a MetaStablePool. According to the table the rate, the rateProvider, supplies is being taken into account during the swap. Looking at the Trade equations, the best suited parameter to weave in the `rate` is the balances which are used to compute `OutGivenIn` or `InGivenOut`.

Querying the balances of this pool via `vault.getPoolTokens(poolId)` returns  
20040415915824227571764 for rETH and 21953505292747563228232 for Weth. 

Before these balances are being used in the Trade equations two operations will be done to them:
- 1. Upscaling. 
- 2. Applying the rate
Effectively changing the value of the balances reported via the earlier call to `vault.getPoolTokens(poolId)`.
<summary> Implementation for MetaStablePools (superseded by ComposableStablePool) </summary>

```
function _scalingFactor(IERC20 token) internal view virtual override returns (uint256) {
        uint256 baseScalingFactor = super._scalingFactor(token);
        uint256 priceRate = _priceRate(token);
        // Given there is no generic direction for this rounding, it simply follows the same strategy as the BasePool.
        return baseScalingFactor.mulDown(priceRate);
    }
```

<summary> Implementation for Composable Stable Pool </summary>

```
function _scalingFactors() internal view virtual override returns (uint256[] memory) {
        // There is no need to check the arrays length since both are based on `_getTotalTokens`
        uint256 totalTokens = _getTotalTokens();
        uint256[] memory scalingFactors = new uint256[](totalTokens);

        for (uint256 i = 0; i < totalTokens; ++i) {
            scalingFactors[i] = _getScalingFactor(i).mulDown(_getTokenRate(i));
        }

        return scalingFactors;
    }
```

The token balances used in the Trade Equations are then [upscaled](https://dashboard.tenderly.co/tx/mainnet/0x67f477517acf6e0c91ec7997e665ca25d2806da060af30272876742584f0aa21?trace=0.5.2.1.5.11). In the example transaction the tokenOutBalances which are fed into
[`OnSwapGivenIn()`](https://dashboard.tenderly.co/tx/mainnet/0x67f477517acf6e0c91ec7997e665ca25d2806da060af30272876742584f0aa21?trace=0.5.2.1.5.13.2) is 21445684973708525874136. Meaning the rate, the providers supplies is "baked in" the balances.
