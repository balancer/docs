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

Wrapping rebasing tokens, such as `stETH`, makes them compatible with Balancer, but knowing the exchange rate between the underlying rebasing token and the wrapped token is necessary to facilitate Stableswap swaps. As such, the `wstETH` `rateProvider` has a `getRate()` function that calls `wstETH`'s own `stEthPerToken()` function. [See the contract here](https://github.com/balancer-labs/metastable-rate-providers/blob/master/contracts/WstETHRateProvider.sol).

### Oracles

Using oracles for price feeds is a simple way to determine an exchange rate. There are two example contracts for how to use Chainlink as a price source: [`ChainlinkRegistryRateProvider`](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/ChainlinkRegistryRateProvider.sol) and [`ChainlinkRateProvider`](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/ChainlinkRateProvider.sol).

#### [`ChainlinkRegistryRateProvider`](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/ChainlinkRegistryRateProvider.sol)

This contract makes use of Chainlink's registry contract so it can handle if Chainlink migrates to a new price feed for a given asset pair. Though there are increased gas costs for this, its a tradeoff for ensuring the pool doesn't get stuck on an abandoned price feed. While this is an unlikely scenario, it doesn't hurt to be careful.

#### [`ChainlinkRateProvider`](https://github.com/balancer/metastable-rate-providers/blob/master/contracts/ChainlinkRateProvider.sol)

If you're running on a network for which Chainlink doesn't have a registry and you think the risk of a deprecated price feed is low enough, then you can use the rateProvider that directly queries a given Chainlink oracle.

## Application of Rate Providers By Pool Type

Different types of pools utilize rate providers in different contexts.

| PoolType                   | Yield Fee        |  Pricing Equations| 
| -----------                | -----------      |  -----------      |
| Composable Stable Pool     | ✅               | ✅                |
| Meta Stable (EOL)          | ✅               | ✅                |
| Weighted Pool              | ✅               | ❌                |
| Managed Pool               | ✅               | ❌                |
| Liquity Bootstrapping Pool | ❌               | ❌                |


Stable Pools require the reported token balances from , `vault.getPoolTokens(poolId)`, be manipulated in two distinct manners before prices can be calculated using StableMath:

1. Scale token balances to an 18-decimal fixed point number.
2. Multiply the scaled balance by the rate.


ComposableStablePools & MetaStablePools have different implementations for the scaling operations but the outcome is the same.


### Composable Stable Pool Implementation
Scaling Example:

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

### Composable Stable Pool Swap Example

This trade was executed in Block 17233083. Looking at the token balances the pool has before the swap it can be seen that:

|     Token                                              | balances                              |  rate                |  scaled balance                           | 
| -----------                                            | -----------                           |  -----------         |  -----------                              | 
| BPT - 0x5aee1e99fe86960377de9f88689616916d5dcabe       | 2596148429265848431954582359320590    | 100000000000000000   |  2596148429265848431954582359320590       | 
| wstETH - 0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0    | 6998331684674570187580                | 1123265399574462175  |  7860983836140600107855                   | 
| sfrxETH - 0xac3e018457b222d93114458476f3e3416abbe38f   | 7388958961745977404526                | 1038371994655823641  |  7672488055538194248508                   | 
| rETH - 0xae78736cd615f374d3085123a210448e74fc6393      | 5950507951882438548950                | 1069881935087994199  |  6366340962316480428138                   | 

\*Bear in mind that the tokens used for demonstration in these examples all have 18 decimals and Balancer natively uses 18 decimals for internal accounting. If tokens have different decimals, the scaled balances scale with the tokens decimals as well.

After the token balances have been upscaled, they are fed into `_calcOutGivenIn` [here](https://dashboard.tenderly.co/tx/mainnet/0x72d756d0fcd663343ca1b2adcfc7e114e8598bc0be28386752f16222384a29b3?trace=0.4.2.2.19.11.0.3.0.5).
That is how `rateProvider` feeds a rate into the pricing equation for ComposableStablePools.

### Meta Stable Pool Implementation
Scaling Example:

```
function _scalingFactor(IERC20 token) internal view virtual override returns (uint256) {
        uint256 baseScalingFactor = super._scalingFactor(token);
        uint256 priceRate = _priceRate(token);
        // Given there is no generic direction for this rounding, it simply follows the same strategy as the BasePool.
        return baseScalingFactor.mulDown(priceRate);
    }
```

### Meta Stable Pool Swap Example
Looking at this [transaction](https://etherscan.io/tx/0x67f477517acf6e0c91ec7997e665ca25d2806da060af30272876742584f0aa21). 50 ETH is being exchanged for 46.68 rETH. This pool is a MetaStablePool. According to the next table the rate, the `rateProvider`  supplies is being taken into account during the swap. Looking at the Trade equations, a well suited parameter to weave in the `rate` is the balances which are used to compute `OutGivenIn` or `InGivenOut`.

Querying the balances of this pool via `vault.getPoolTokens(poolId)` returns  
20040415915824227571764 for rETH and 21953505292747563228232 for WETH. 
  
| Token                                             | balances                              |  rate                |  scaled balance                           | 
| -----------                                       | -----------                           |  -----------         |  -----------                              | 
| rEth 0xae78736cd615f374d3085123a210448e74fc6393   | 20040415915824227571764                | 1070121751154609309  |  21445684973708525874136                  | 
| WETH 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2   | 21953505292747563228232                | 1000000000000000000  |  21953505292747563228232                  | 

The token balances used in the Trade Equations are then [upscaled](https://dashboard.tenderly.co/tx/mainnet/0x67f477517acf6e0c91ec7997e665ca25d2806da060af30272876742584f0aa21?trace=0.5.2.1.5.11) the scaled balance. Only after upscaling are the apparent balances supplied to
[`OnSwapGivenIn()`](https://dashboard.tenderly.co/tx/mainnet/0x67f477517acf6e0c91ec7997e665ca25d2806da060af30272876742584f0aa21?trace=0.5.2.1.5.13.2). 


### Rate Provider being used in a MetaStablePool swap

## Rate Providers being used to collect yieldFees for WeightedPools

Rate providers play a crucial role in determining whether yield fees are charged during pool join or exit. The primary factor used for this determination is the comparison of the `_athRateProduct` private variable with a dynamically calculated `rateProduct` on every pool join or exit. Here's an example illustrating what the `rateProduct` represents:

`rateProduct` is calculated as the weighted product of all current rates:
## Yield Fees for WeightedPools
| Token                    |  Weight          |  rate           | 
| -----------              | -----------      |  -----------    |   
| A (yield bearing)        |       0.3        | 1.01            | 
| B (non yield bearing)    |       0.5        | 1.00            |   
| C (yield bearing)              |       0.2        | 1.05            |  

The rate product is obtained by multiplying the weighted rates together:

Rate product = (0.3 * 1.01) * (0.5 * 1) * (0.2 * 1.05) = 1.013

As part of the calculation of the rateProduct, the `rateProvider` of the pool tokens are queried for their rates [here](https://github.com/balancer/balancer-v2-monorepo/blob/cbce7d63479dafb4f4ea9ad8cb2dbdbb26edae50/pkg/pool-weighted/contracts/WeightedPoolProtocolFees.sol#L304). This occurs in the following code snippet:

```
/**
     * @notice Returns the contribution to the total rate product from a token with the given weight and rate Provider.
     */
    function _getRateFactor(uint256 normalizedWeight, IRateProvider provider) internal view returns (uint256) {
        return provider == IRateProvider(0) ? FixedPoint.ONE : provider.getRate().powDown(normalizedWeight);
    }
```

There are several scenarios in which no yield fees are paid during a pool join or exit operation. Here are a couple of examples:

- `rateProduct' remain unchanged: If multiple joins or exits occur without any factors contributing to a `newATHRateProduct`, no yield fees are minted. 
- Rate fluctuations of different tokens: In some cases, the rate of one token may increase while the rate of another token decreases. If, on a normalized basis, the rate increase of Token A is less than the rate decrease of Token B, the calculated `rateProduct` would not reach the ceiling of `ATHRateProduct`. As a result, no yield fees would be paid during the pool join or exit, as the rateProduct did not increase sufficiently.


As part of this [transaction](https://dashboard.tenderly.co/mkflow/project/tx/mainnet/0x9e1d45013f4b65f444bb9b2ef823c0d4fd0a53e2b2bad85ba85a8e26c0bed45d?trace=0.2.7.3.7.1.2.2) yield fees are minted. This can be seen by the positive return values of the `_getYieldProtocolFeesPoolPercentage` function

Whereas in this [transaction](https://dashboard.tenderly.co/mkflow/project/tx/mainnet/0xe2d8d7f705d23c18e7d25e68bf01ac2544cc73806c8e4572135d9bc16790b4f5) the `ATHRateProduct` did not increase
and (0,0) is [returned](https://github.com/balancer/balancer-v2-monorepo/blob/cbce7d63479dafb4f4ea9ad8cb2dbdbb26edae50/pkg/pool-weighted/contracts/WeightedPoolProtocolFees.sol#L191) since `rateProduct <= athRateProduct`. This indicates that no yield fees were paid in this transaction due to the insufficient increase in the rateProduct.


