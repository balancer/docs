# Rate Providers

## Overview

Rate Providers are contracts that provide an exchange rate between two assets. These exchange rates can come from any on-chain source, whether that may be an oracle, a ratio of queryable balances, or another calculation.

Rate Providers implement a `getRate()` function that returns an exchange rate.

## Use Cases

You can use `rateProvider`s for all, some, or none of the assets in your pool. If you are not using a rateProvider for an asset, you must pass the zero address (`0x0000000000000000000000000000000000000000`), which will result in a rate of 1.

### All Assets

You will want to use `rateProvider`s for all assets in your pool when each asset has its own price that is independent of all the other assets' prices. If we have tokens A, B, and C and only have price feeds with respect to USD, then we would want all assets to have price feeds. When internally calculating relative prices, the USD would cancel out, giving us prices for A:B, A:C, B:C, and their inverses.

### Some Assets

You will want to use `rateProvider`s for some assets in your pool when you have rates that directly convert between the assets. If we have tokens A and B and a rate provider that gives the price of A with respect to B, then the `rateProvider` corresponding to token A would get the A:B price feed, and the `rateProvider` corresponding to token B would be the zero address.&#x20;

### None of the Assets

You will have no `rateProvider`s in your pool when your tokens are price-pegged to each other. For example, a pool with `USDC`, `USDT`, and `DAI` would have all `rateProvider`s set to the zero address since the exchange rate between those tokens is 1.&#x20;

## Examples

### Direct Balance Query

Wrapping rebasing tokens, such as `stETH`, makes them compatible with Balancer, but knowing the exchange rate between the underlying rebasing token and the wrapped token is necessary to facilitate Stableswap trades. As such, the `wstETH` `rateProvider` has a `getRate()` function that calls `wstETH`'s own `stEthPerToken()` function. [See the contract here](https://github.com/balancer-labs/metastable-rate-providers/blob/master/contracts/WstETHRateProvider.sol).

### Oracles

Using oracles for price feeds is a simple way to determine an exchange rate. There are two example contracts for how to use Chainlink as a price source: [`ChainlinkRegistryRateProvider`](https://github.com/balancer-labs/metastable-rate-providers/blob/master/contracts/ChainlinkRegistryRateProvider.sol) and [`ChainlinkRateProvider`](https://github.com/balancer-labs/metastable-rate-providers/blob/master/contracts/ChainlinkRateProvider.sol).

#### ``[`ChainlinkRegistryRateProvider`](https://github.com/balancer-labs/metastable-rate-providers/blob/master/contracts/ChainlinkRegistryRateProvider.sol)``

This contract makes use of Chainlink's registry contract so it can handle if Chainlink migrates to a new price feed for a given asset pair. Though there are increased gas costs for this, its a tradeoff for ensuring the pool doesn't get stuck on an abandoned price feed. While this is an unlikely scenario, it doesn't hurt to be careful.

#### ``[`ChainlinkRateProvider`](https://github.com/balancer-labs/metastable-rate-providers/blob/master/contracts/ChainlinkRateProvider.sol)``

If you're running on a network for which Chainlink doesn't have a registry and you think the risk of a deprecated price feed is low enough, then you can use the rateProvider that directly queries a given Chainlink oracle.
