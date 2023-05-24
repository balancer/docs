# Managed Pools

## Overview

Managed Pools are designed to bring extreme flexibility to Balancer, unlocking possibilities for sophisticated portfolio strategies and fine-grained control. 

Managed Pools use [Weighted Math](/reference/math/weighted-math.md) and allow users to have pools of up to 50 tokens. These pools provide a framework for fund managers, can be used to track a wider crypto sector, and feature time-based weight shifting mechanisms similar to those of [Liquidity Bootstrapping Pools](liquidity-bootstrapping.md).

## Advantages

### Feature Rich

Managed Pools are feature rich. Some of the features include:

- Pool Manager(s)
- Management Fees (optional)
- Liquidity Provider Allowlists
- Up to 50 tokens
- Active Token Management
  - Add
  - Remove
  - Change token weights
- Circuit Breakers to protect from malicious/compromised tokens

## Weights

An important feature of Managed Pools that makes them unique from a standard Weighted Pool is the ability for managers to update token weights. This allows managers to adjust the distributions of assets within a pool, in order to shift to different DeFi strategies. An example of this is modifying token weights in response to changes in market conditions.

### Gradual Updates

Updating weights gradually in a linear manner over a set period of time is the recommend method for adjusting token weights. This steady weight update allows token prices to slowly adjust, baiting arbitratures to rebalance pool balances in line with the desired weights.

### Risks

There are pricing risks that liquidity providers are exposed to during weight changes. If token weights are adjusted too quickly before argitragers get a chance to rebalance, prices will have a significantly negative effect. It is important for managers to allow ample time for the pool to change weights in order to mitigate this risk. This ensures that sufficient time is given for market corrections, reducing potential slippage.

### Examples
[ManagedPoolSetting.sol](https://github.com/baileyspraggins/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for viewing and updating token weights within a Managed Pool. Below are a few basic examples of how a manager can interact with token weights on a Managed Pool.

```solidity
// Time for weight change to finalize
uint256 private constant _REWEIGHT_DURATION = 7 days;

// Adjust pool weights in a pool with 3 tokens
function changeWeights() public {
  uint256[] memory newWeights = new uint256[](3);

  // Weights must add up to 100% or 1e18
  newWeights[0] = 30e16 // 30%
  newWeights[1] = 30e16 // 30%
  newWeights[2] = 40e16 // 40%

  _updateWeights(block.timestamp, block.timestamp + _REWEIGHT_DURATION, _poolTokens, newWeights);
}
```
```solidity
// View current weights of tokens in a Managed Pool
uint256[] memory tokenWeights = _managedPool.getNormalizedWeights();
```