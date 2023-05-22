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

## Swap Fees

Swap fees are taken during joins, exits and regular token swaps. They are payed out between Liquidity Providers and the Protocol. For a current break down of swap fee distribution see [Governable Protocol Fees](https://docs.balancer.fi/concepts/governance/protocol-fees.html#swap-fees). 

Managers can adjust swap fee percentages in order to influencing the economic activity and incentives around a Managed Pool. The fluxuation of swap fee percentages is a key driver in adding/removing tokens, changing weights and guiding transaction volume. 

### Limits
[ManagedPoolSettings.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) defines `_MAX_SWAP_FEE_PERCENTAGE = 95e16` or 95% and `_MIN_SWAP_FEE_PERCENTAGE = 1e12` or 0.0001%. A maximum swap fee is set in order to safe guard from potential reverts during division and that may occur when performing joins and exits on a pool, in the case that a pool's token balance is less than the fee amount. The minimum swap fee prevents the pool from being drained due to the presence of transaction costs, while also incentivizing liquidity providers to provide and maintain liquidity in the pool. Managers can set custom swap fee percentages in their own implementations as long as they are in the bounds of `_MAX_SWAP_FEE_PERCENTAGE` and `_MIN_SWAP_FEE_PERCENTAGE`.

### Gradual Updates
Gradually updating swap fees over a set period of time is the recommended method for adjusting swap fee percentages. The concept is to implement a linear shift in swap fees, starting from the maximum swap fee set by the manager and gradually reducing it to a nominal or near 0% fee. This approach promotes healthy interactions with the pool and enables arbitragers to adjust the pool's weights gradually over time without the risk of completely draining liquidity.

### Instantaneous Updates
Instantaneous updates occur when swap fees are updated immediately instead of on a slow, gradual basis. This approach is not recommended as it can lead to significant slippage, giving arbitragers an opportunity to completely drain the pool.

### Examples:
[ManagedPoolSetting.sol](https://github.com/baileyspraggins/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for viewing and updating swap fees within a Managed Pool. Below are a few basic examples of how a Manager can interact with swap fees on a Managed Pool.

```sol
// Set custom swap fees (Must be >= 1e12 and <>= 95e16)
uint256 private constant _MAX_SWAP_FEE_PERCENTAGE = 92e16
uint256 private constant _MIN_SWAP_FEE_PERCENTAGE = 2e12
```

```sol
// Update swap fees from max fee to min fee
_managedPool.updateSwapFeeGradually(
  block.timestamp,
  block.timestamp + _REBALANCE_DURATION,
  _MAX_SWAP_FEE_PERCENTAGE,
  _MIN_SWAP_FEE_PERCENTAGE
);
```

```sol
// Get the current value of the swap fee percentage
uint256 swapFeePercentage = _managedPool.getSwapFeePercentage();
```
