# Managed Pools

## BPT Supply

### `getActualSupply`

```solidity
getActualSupply() 
returns (uint256)
```

Returns the effective BPT Supply. Implemented in `ManagedPoolSettings`. 

::: warning
Since this function reads balances directly from the Vault, it is potentially subject to manipulation via reentrancy. To call this function safely, attempt to trigger the reentrancy guard in the Vault by calling a non-reentrant function before calling `getActualSupply`.
:::

## Swap Fees

### `getSwapFeePercentage`

```
getSwapFeePercentage() 
returns (uint256)
```

Returns the current value of the swap fee percentage. Implemented in `ManagedPoolSettings`.

### `getGradualSwapFeeUpdateParams`
```solidity
getGradualSwapFeeUpdateParams()
returns (uint256 startTime,
         uint256 endTime,
         uint256 startSwapFeePercentage,
         uint256 endSwapFeePercentage)
```

Returns the current gradual swap fee update parameters. Implemented in `ManagedPoolSettings`.

### `updateSwapFeeGradually`

```solidity
updateSwapFeeGradually(uint256 startTime,
                       uint256 endTime,
                       uint256 startSwapFeePercentage,
                       uint256 endSwapFeePercentage)

emits GradualSwapFeeUpdateScheduled(uint256 startTime,
                                    uint256 endTime,
                                    uint256 startSwapFeePercentage,
                                    uint256 endSwapFeePercentage)
```

Schedules a gradual update in swap fees at the block timestamp provided in `startTime`, up until `endTime`. This is a permissioned function that can only be called by an authorized address. If the pool is paused, the call will revert. Implemented in `ManagedPoolSettings`.

## Weights

### `getNormalizedWeights`

```solidity
getNormalizedWeights() 
returns (uint256[] memory)
```

Returns the normalized weights in the same order as the pool's tokens. Implemented in `ManagedPoolSettings`.

### `getGradualWeightUpdateParams`

```solidity
getGradualWeightUpdateParams()
returns (uint256 startTime,
         uint256 endTime,
         uint256[] memory startWeights,
         uint256[] memory endWeights)
```

Returns the current gradual weight change update parameters. Implemented in `ManagedPoolSettings`.

### `updateWeightsGradually`

```solidity
updateWeightsGradually(uint256 startTime,
                       uint256 endTime,
                       IERC20[] memory tokens,
                       uint256[] memory endWeights)

emit GradualWeightUpdateScheduled(uint256 startTime,
                                  uint256 endTime,
                                  uint256[] startWeights,
                                  uint256[] endWeights)
```

Schedules a gradual weight change at the block timestamp provided in `startTime`, up until `endTime`. This is a permissioned function that can only be called by an authorized address set by the `owner`. If the pool is paused, the call will revert. Implemented in `ManagedPoolSettings`.

## Joins and Exits

### `getJoinExitEnabled`

```solidity
getJoinExitEnabled() 
returns (bool)
```

Returns whether joins and exits are enabled. Implemented in `ManagedPoolSettings`.

### `setJoinExitEnabled`

```solidity
setJoinExitEnabled(bool joinExitEnabled)

emits JoinExitEnabledSet(bool joinExitEnabled)
```

Enables or disables joins and exits. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

::: info
**Note:** This does not affect Recovery Mode exits
:::

## Swaps

### `getSwapEnabled`

```solidity
getSwapEnabled() 
returns (bool)
```

Returns whether swaps are enabled. Implemented in `ManagedPoolSettings`.

### `setSwapEnabled`

```solidity
setSwapEnabled(bool swapEnabled)

emit SwapEnabledSet(bool swapEnabled)
```

Enables or disables trading. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

## Allowlist

### `getMustAllowlistLPs`

```solidity
getMustAllowlistLPs() 
returns (bool)
```

Returns whether the allowlist for Liquidity Providers in enabled. Implemented in `ManagedPoolSettings`.

### `isAddressOnAllowlist`

```solidity
isAddressOnAllowlist(address member) 
returns (bool)
```

Returns whether a given address, `member`, is on the allowlist. Checks the allowlist regardless of whether the allowlist features is enabled. Implemented in `ManagedPoolSettings`.

### `addAllowedAddress`

```solidity
addAllowedAddress(address member)

emits AllowlistAddressAdded(address indexed member)
```

Adds an address, `member`, to the LP allowlist. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

### `removeAllowedAddress`

```solidity
removeAllowedAddress(address member)

emits AllowlistAddressRemoved(address indexed member)
```

Removes an address, `member`, from the LP allowlist. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

### `setMustAllowlistLPs`

```solidity
setMustAllowlistLPs(bool mustAllowlistLPs)

emit MustAllowlistLPsSet(bool mustAllowlistLPs)
```

Enables or disables the LP allowlist. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

## AUM Fees

### `getManagementAumFeeParams`

```solidity
getManagementAumFeeParams()
returns (uint256 aumFeePercentage, uint256 lastCollectionTimestamp)
```

Returns the AUM fee percentage as an 18-decimal fixed point number, and the timestamp of the last collection of AUM fees. Implemented in `ManagedPoolSettings`.

###  `setManagementAumFeePercentage`

```solidity
setManagementAumFeePercentage(uint256 managementAumFeePercentage)
returns (uint256)

emits ManagementAumFeePercentageChanged(uint256 managementAumFeePercentage)
```

Sets the yearly percentage AUM fee, which is payable to the pool `owner`. The amount of BPT minted to the manager before the update is returned. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

###  `collectAumManagementFees`

```solidity
collectAumManagementFees()

emits ManagementAumFeeCollected(uint256 bptAmount)
```

Collects any accrued AUM fees and sends them to the Managed pool `owner`. It will also be called automatically whenever supply changes occur (e.g., joins/exits, add/remove token) and before any fee percentage changes. This is not a permissioned function and can be called by anyone. Implemented in `ManagedPoolSettings`.

## Circuit Breakers

### `getCircuitBreakerState`

```solidity
getCircuitBreakerState(IERC20 token)
returns (uint256 bptPrice,
         uint256 referenceWeight,
         uint256 lowerBound,
         uint256 upperBound,
         uint256 lowerBptPriceBound,
         uint256 upperBptPriceBound)
```

Returns the full circuit breaker state for a given `token`. Implemented in `ManagedPoolSettings`.

### `setCircuitBreakers`

```solidity
setCircuitBreakers(IERC20[] memory tokens,
                   uint256[] memory bptPrices,
                   uint256[] memory lowerBoundPercentages,
                   uint256[] memory upperBoundPercentages)

emit CircuitBreakerSet(IERC20 indexed token,
                       uint256 bptPrice,
                       uint256 lowerBoundPercentage,
                       uint256 upperBoundPercentage)
```

Sets a current circuit breaker for one or more `tokens`. The lower and upper bound percentages correspond to a relative change in the token's spot price. An example of this would be that a lower bound of 0.8 means the breaker should prevent trades that result in the value of the token dropping 20% or more relative to the rest of the pool. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

## Add/Remove Tokens

### Add Token

```solidity
addToken(IERC20 tokenToAdd,
         address assetManager,
         uint256 tokenToAddNormalizedWeight,
         uint256 mintAmount,
         address recipient)

emits TokenAdded(IERC20 indexed token, uint256 normalizedWeight)
```

Adds a token, `tokenToAdd`, to the pool's list of tradeable tokens. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

::: warning
When adding a new token to a pool, the weights of all other tokens will be decreased. The new token will have a balance of zero, so it is up to the owner to provide some imediate liquidity after calling this function.
:::

::: info 
**Note:** Regular joins do not work when a new token has a balance of zero. The only way to deposit an initial amount is by using an Asset Manager.
:::


### Remove Token

```solidity
removeToken(IERC20 tokenToRemove,
            uint256 burnAmount,
            address sender)

emits TokenRemoved(IERC20 indexed token)
```

Removes a token, `tokenToRemove`, to the pool's list of tradeable tokens. This is a permissioned function that can only be called by an authorized address set by the `owner`. Implemented in `ManagedPoolSettings`.

::: info
**Note:** Tokens can only be removed if the pool has more than two tokens (not including BPT).
:::