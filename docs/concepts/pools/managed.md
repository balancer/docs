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

Swap fees are collected during token swaps (as well as some joins and exits: specifically when the transactions are not proportional with the rest of the pool). Swap fees accrue to the pool, and therefore increase the amount of underlying tokens in the pool. This in turn translates to collected fees going to Liquidity Providers by means of increasing the value of their LP tokens (BPT). Unlike most other Balancer pools, Managed Pools do not split swap fees with the protocol.

Managers can adjust swap fee percentages in order to influencing the economic activity and incentives around a Managed Pool. For example, when re-enabling swaps in a previously paused pool, running a swap fee update from a very high swap fee to a low swap fee can help mitigate arbitrage losses.

### Limits
[ManagedPoolSettings.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) defines `_MAX_SWAP_FEE_PERCENTAGE = 95e16` or 95% and `_MIN_SWAP_FEE_PERCENTAGE = 1e12` or 0.0001%. Swap fee limits exist to safeguard from potential math errors and to incentivize Liquidity Providers to join pools. Managers can set custom swap fee percentages in their own implementations as long as they are in the bounds of `_MAX_SWAP_FEE_PERCENTAGE` and `_MIN_SWAP_FEE_PERCENTAGE`.

### Gradual Updates
Gradually updating swap fees over a set period of time is the recommended method for adjusting swap fee percentages, especially if the manager is _lowering_ fees. An example  concept is to implement a linear shift in swap fees, starting from the upper value swap fee set by the manager and gradually reducing it to a nominal or near 0% fee. This approach promotes healthy interactions with the pool and enables arbitragers to adjust the pool's balances gradually over time mitigating arbitrage losses.

### Instantaneous Updates
Instantaneous updates occur when swap fees are updated immediately instead of on a slow, gradual basis. Lowering fees instantaneously is generally not recommended as it can lead to instantaneous arbitrage opportunities, giving arbitragers an opportunity to extract value. Instantaneous swap fee increases are generally considered safe.

### Examples:
[ManagedPoolSetting.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for viewing and updating swap fees within a Managed Pool. Below are a few basic examples of how a Manager can interact with swap fees on a Managed Pool.

```solidity
// Set custom swap fees (Must be >= 1e12 and <>= 95e16)
uint256 private constant _INITIAL_SWAP_FEE_PERCENTAGE = 92e16
uint256 private constant _FINAL_SWAP_FEE_PERCENTAGE = 2e12
```

```solidity
// Update swap fees from max fee to min fee
_managedPool.updateSwapFeeGradually(
  block.timestamp,
  block.timestamp + _REBALANCE_DURATION,
  _INITIAL_SWAP_FEE_PERCENTAGE,
  _FINAL_SWAP_FEE_PERCENTAGE
);
```

```solidity
// Get the current value of the swap fee percentage
uint256 swapFeePercentage = _managedPool.getSwapFeePercentage();
```

## Pause Swaps
Managed Pool `owner`s have the ability to pause and unpause swaps. This feature enables `owner`s to protect a pools assets in the case of security vulnerabilities, volital market conditions or in the case that pool actions do not work in a predicted manner.

### Examples
[ManagedPoolStorageLib.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolStorageLib.sol) provides the necessary logic for viewing the status of a pool, as well as pausing and unpausing swap within a Managed Pool. Below are a few basic examples of how an `owner` can accomplish this with a Managed Pool.

```solidity
// Enable swaps
_managedPool.setSwapEnabled(true);

// Disable swaps
_managedPool.setSwapEnabled(false);
```

```solidity
// Returns true if swaps are currently allowed
_managedPool.getSwapEnabled();
```