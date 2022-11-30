# Pools

## Many Pool Operations Done Via The Vault!

See the [Vault API](../../contracts/apis/the-vault.md) for the following functions.

```
registerPool(PoolSpecialization specialization) returns (bytes32 poolID)

getPool(bytes32 poolId) returns (address pool, PoolSpecialization)

getPoolTokens(bytes32 poolId) returns (
    IERC20[] tokens,
    uint256[] balances,
    uint256 maxBlockNumber)
    
getPoolTokenInfo(bytes32 poolId, IERC20 token) returns (
    uint256 cash,
    uint256 managed,
    uint256 blockNumber,
    address assetManager)
 
joinPool(bytes32 poolId,
         address sender,
         address recipient,
         JoinPoolRequest request)
         
exitPool(bytes32 poolId,
         address sender,
         address payable recipient,
         ExitPoolRequest request)
```

## Didn't find what you were looking for in the Vault API?

There are some function implemented in [BasePool.sol](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-utils/contracts/BasePool.sol) that most (if not all) pools inherit.&#x20;

### `getVault`

```
getVault() returns (IVault vaultAddress)
```

Returns pool's Vault.

### `getPoolId`

```
getPoolId() returns (bytes32 poolID)
```

Returns pool's poolId.

### `getSwapFeePercentage`

```
getSwapFeePercentage() returns (uint256 swapFeePercentage) 
```

Returns the pool's current swap fee.

### `setSwapFeePercentage`

```
setSwapFeePercentage(uint256 swapFeePercentage)
```

Updates the pool's swap fee.&#x20;

Note: This can **only** be called by an **authorized account**, denoted by the pool's owner. There are three cases for swap fee control:

* Swap Fees are immutable
  * Owner: 0x0000000000000000000000000000000000000000
* Swap Fees are controlled by a third party (currently [Gauntlet](https://medium.com/balancer-protocol/balancer-partners-with-gauntlet-to-make-dynamic-fee-pools-a-reality-97b3fb1760df))
  * Owner: 0xBA1BA1ba1BA1bA1bA1Ba1BA1ba1BA1bA1ba1ba1B
* Swap Fees are controlled by an account immutably set at pool creation
  * Owner: the account which was set at pool creation

### `setPaused`

```
function setPaused(bool paused)
```

Pauses trading within the pool. Users can exit their positions proportionally.

Note: This can **only** be called by an **authorized account** and is intended to be used only as an emergency stop if something goes wrong.

### `on{Join,Exit}Pool`

```
onJoinPool(
        bytes32 poolId,
        address sender,
        address recipient,
        uint256[] currentBalances,
        uint256 latestBlockNumberUsed,
        uint256 protocolSwapFeePercentage,
        bytes userData
    ) returns (uint256[] amountsIn, uint256[] dueProtocolFeeAmounts)
    
onExitPool(
        bytes32 poolId,
        address sender,
        address recipient,
        uint256[] currentBalances,
        uint256 latestBlockNumberUsed,
        uint256 protocolSwapFeePercentage,
        bytes userData
    ) returns (uint256[] amountsOut, uint256[] dueProtocolFeeAmounts) {
```

`onJoinPool` and `onExitPool` are called by the Vault when an account joins or exits a pool.

## Additional Interfaces

Some pools have their own specific functions. These are defined in the respective pool-specific pages.
