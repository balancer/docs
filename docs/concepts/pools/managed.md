# Managed Pools

## Overview

Managed Pools are designed to bring extreme flexibility to Balancer, unlocking possibilities for sophisticated portfolio strategies and fine-grained control. 

Managed Pools use [Weighted Math](/reference/math/weighted-math.md) and allow users to have pools of up to 50 tokens. These pools provide a framework for fund managers, can be used to track a wider crypto sector, and feature time-based weight shifting mechanisms similar to those of [Liquidity Bootstrapping Pools](liquidity-bootstrapping.md).

## Advantages

### Feature Rich

Managed Pools are feature rich. Some of the features include:

- Pool Owner(s)
- Management Fees (optional)
- Liquidity Provider Allowlists
- Up to 50 tokens
- Active Token Management
  - Add
  - Remove
  - Change token weights
- Circuit Breakers to protect from malicious/compromised tokens

## Weights

An important feature of Managed Pools that makes them distinct from standard Weighted Pools is that they allow the pool `owner` to update token weights. This allows `owner`s to adjust the distributions of assets within a pool, in order to shift to different DeFi strategies. An example of this is modifying token weights in response to changes in market conditions.

### Gradual Updates

The recommended technique for updating weights in a Managed Pool is to do so gradually. In a gradual weight update, the pool calculates each weight by linearly interpolating between the start and end weights for the specified time. This steady weight update slowly adjusts token prices, encouraging arbitrageurs to rebalance pool balances in line with the desired weights.

### Risks

There are pricing risks that liquidity providers are exposed to during weight changes. If token weights are adjusted too quickly, prices can become unfavorable for the pool (and its Liquidity Providers). Arbitrageurs are able to extract more value when there is a sharper price discrepancy, so it is important for `owner`s to allow ample time for the pool to change weights in order to mitigate this risk. This ensures that sufficient time is given for market/arbitrage corrections, lowering the price impact of the pool rebalancing.

### Examples
[ManagedPoolSetting.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for viewing and updating token weights within a Managed Pool. Only an `owner` can call `updateWeightsGradually`, but anyone can call the getters.

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

  _managedPool.updateWeightsGradually(
    block.timestamp, 
    block.timestamp + _REWEIGHT_DURATION, 
    _poolTokens, 
    newWeights
  );
}
```
```solidity
// View current weights of tokens in a Managed Pool
uint256[] memory tokenWeights = _managedPool.getNormalizedWeights();

// View the current gradual weight change update parameters
(
  uint256 startTime,
  uint256 endTime,
  uint256[] memory startWeights,
  uint256[] memory endWeights
) = _managedPool.getGradualWeightUpdateParams();
```

## Adding and Removing Tokens
Pool `owner`s can edit the basket of assets in a Managed Pool by adding and removing tokens. 

### Adding Tokens
`addToken` adds a token to the Pool's list of tradeable tokens. When adding a token to a Managed Pool the weights of all other tokens in the pool will decrease. Once the new token is added it will have an initial balance of 0. Because regular join functions do not work with tokens whoes balances are 0 it is the `owner`s responsibility to deposit an initial amount of tokens into the pool via an `assetManager`. The `assetManager` is set by the `owner` when adding a token to the pool. It should be noted that during weight changes or when a weight change is scheduled in the future, token additions are forbidden. 

#### Depositing Tokens via an Asset Manager


### Removing Tokens
`removeToken` removes a token from the Pool's list of tradeable tokens. When removing a token from a Managed Pool the weights of all other tokens in the pool will increase. `owner`s can remove a token from the pool as long as there are three or more tokens currently in the pool. This is because Managed Pools cannot have fewer than two tokens, not including BPT. Similarly to the rules surrounding adding tokens, it should be noted that during weight changes or when a weight change is scheduled in the future, token removals are forbidden. 

### Examples
[ManagedPoolAddRemoveTokenLib.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolAddRemoveTokenLib.sol) provides the necessary logic for adding and removing tokens from a Managed Pool. Below are a few basic examples of how an `owner` can add and remove tokens from a Managed Pool.

```solidity
// Variable declarations
IERC20 token = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2); // WETH
address assetManager = 0x123456789....; 
uint256 tokensNormalizedWeight = 10e16; // 10% normalized weight
uint256 mintAmount = 100e18;
uint256 burnAmount = 100e18;
```

// TODO: Add an example of how an `owner` can deposit tokens into a pool via an `assetManager` after adding a token to the pool.
```solidity
// Add a token to the pool
_managedPool.addToken(
  token,
  assetManager,
  tokensNormalizedWeight,
  mintAmount,
  msg.sender
);
```

```solidity
// Remove a token from the pool
_managedPool.removeToken(
  token,
  burnAmount,
  msg.sender
)
```

## Pause Swaps
Managed Pool `owner`s have the ability to pause and unpause swaps. This feature has a wide range of practical applications, including, but not limited to, `owner`s shielding the pool's assets during security vulnerabilities, navigating through volatile market conditions, or preserving the pool's composition as a static basket of assets. `owner`s can be creative with this feature to fit their needs.

### Examples
[ManagedPoolSettings.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for viewing the swap status of a pool, as well as enabling and disabling swaps within a Managed Pool. Below are a few basic examples of how an `owner` can accomplish this within a Managed Pool. 

```solidity
// Disable swaps
_managedPool.setSwapEnabled(false);

// Enable swaps
// Enbaling swaps might create an instant arbitrage opportunity. 
// Applying a gradual swap fee update can help mitigate this.
_managedPool.setSwapEnabled(true);
```

```solidity
// Returns true if swaps are currently allowed
_managedPool.getSwapEnabled();
```

## Swap Fees

Swap fees are collected during token swaps (as well as some joins and exits: specifically when the transactions are not proportional with the rest of the pool). Swap fees accrue to the pool, and therefore increase the amount of underlying tokens in the pool. This in turn translates to collected fees going to Liquidity Providers by means of increasing the value of their LP tokens (BPT). Unlike most other Balancer pools, Managed Pools do not split swap fees with the protocol.

`owner`s can adjust swap fee percentages in order to influence the economic activity and incentives around a Managed Pool. For example, when re-enabling swaps in a previously paused pool, running a swap fee update from a very high swap fee to a low swap fee can help mitigate arbitrage losses.

### Limits
[ManagedPoolSettings.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) defines `_MAX_SWAP_FEE_PERCENTAGE = 95e16` or 95% and `_MIN_SWAP_FEE_PERCENTAGE = 1e12` or 0.0001%. Swap fee limits exist to safeguard from potential math errors and to incentivize Liquidity Providers to join pools. `owner`s can set custom swap fee percentages in their own implementations as long as they are in the bounds of `_MAX_SWAP_FEE_PERCENTAGE` and `_MIN_SWAP_FEE_PERCENTAGE`.

### Gradual Updates
Gradually updating swap fees over a set period of time is the recommended method for adjusting swap fee percentages, especially if the `owner` is _lowering_ fees. An example  concept is to implement a linear shift in swap fees, starting from the upper value swap fee set by the `owner` and gradually reducing it to a nominal or near 0% fee. This approach promotes healthy interactions with the pool and enables arbitragers to adjust the pool's balances gradually over time mitigating arbitrage losses.

### Instantaneous Updates
Instantaneous updates occur when swap fees are updated immediately instead of on a slow, gradual basis. Lowering fees instantaneously is generally not recommended as it can lead to instantaneous arbitrage opportunities, giving arbitragers an opportunity to extract value. Instantaneous swap fee increases are generally considered safe.

### Examples
[ManagedPoolSetting.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for viewing and updating swap fees within a Managed Pool. Below are a few basic examples of how to interact with swap fees on a Managed Pool. Only an `owner` can set the swap fee parameters, but anyone can call the getter.

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

// Get the current gradual swap fee update parameters
(
  uint256 startTime,
  uint256 endTime,
  uint256 startSwapFeePercentage,
  uint256 endSwapFeePercentage
) = _managedPool.getGradualSwapFeeUpdateParams();
```

## Management and Protocol Fees
Assets Under Management (AUM) fees are paid out to the `owner` for maintaining the pool. In Managed Pools, protocol fees are only taken as a percentage of AUM fees, as opposed to the standard method of being extracted from swap fees. The maximum allowable AUM fee that an `owner` can set is 95% (represented as `95e16`). The protocol fee percentage is established by [ProtocolFeePercentagesProvider](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/ProtocolFeePercentagesProvider.sol). 

### Examples
[ManagedPoolSetting.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for collecting and setting management fees. Below are examples of how an `owner` can set and view AUM fees in a Managed Pool.

```solidity
// Set AUM fee to 2%
uint256 desiredAumFeePercentage = 2e16;
_managedPool.setManagementAumFeePercentage(managementFeePercentage);

// Get the current AUM fee, as well as the last time fee collections occurred
(uint256 aumFeePercentage, uint256 lastCollectionTimestamp) = _managedPool.getManagementAumFeeParams();
```

## Liquidity Provider Allowlists
Pool `owner`s can restrict liquidity providers' access to joining a Managed Pool. This feature empowers an `owner` to limit liquidity providers to specific addresses, which can be useful in setting up a private pool. The `owner` can adjust the allowlist by adding or removing addresses as needed, and can also toggle whether the allowlist is enforced or not. It's important to note that while this feature provides control over joining the pool, it does not restrict exiting, to ensure that liquidity providers can always exit the pool.

### Examples
[ManagedPoolSetting.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for viewing and managing the LP `_allowedAddresses`. Below are examples of how to change and query the Liquidity Provider Allowlist in a Managed Pool.

```solidity
// Mock address used for examples
address private _allowedAddress = 0x1234567890123456789012345678901234567890;
```
```solidity
// Enable LP allowlist
_managedPool.setMustAllowlistLPs(true);

// Disable LP allowlist
_managedPool.setMustAllowlistLPs(false);
```
```solidity
// Add an address to the allowlist
_managedPool.addAllowedAddress(_allowedAddress);

// Remove an address from the allowlist
_managedPool.removeAllowedAddress(_allowedAddress);
```
```solidity
// Check if an address is on the allowlist
bool isAllowed = _managedPool.isAddressOnAllowlist(_allowedAddress);

// Get the current allowlist status
bool mustAllowlistLPs = _managedPool.getMustAllowlistLPs();
```

## Enabling Joins and Exits

Managed Pool `owner`s can enable and disable joins and exits. Like pausing and unpausing swaps, disabling joins and exits has a wide range of possible use cases, such as ensuring exact balances during complex pool management operations; `owner`s can be creative with this feature to fit their needs.

### Examples
[ManagedPoolSetting.sol](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/managed/ManagedPoolSettings.sol) provides the necessary logic for viewing the status of joins and exits, as well as enabling and disabling joins and exits within a Managed Pool. Below are a few basic examples of how to accomplish this within a Managed Pool. 

```solidity
// Get the current status of joins and exits
bool joinExitEnabled = _managedPool.getJoinExitEnabled();
```
```solidity
// Enable joins and exits
_managedPool.setJoinExitEnabled(true);

// Disable joins and exits
_managedPool.setJoinExitEnabled(false);
```
