# The Vault

## Authorization

### `getAuthorizer`

```
getAuthorizer() 
returns (IAuthorizer) 
```

Returns the Vault's Authorizer (Balancer governance contract). Implemented in `VaultAuthorization`

### `setAuthorizer`

```
setAuthorizer(IAuthorizer newAuthorizer)

emits AuthorizerSet(IAuthorizer indexed newAuthorizer)
```

Sets a new Authorizer for the Vault. The caller must be allowed by the current Authorizer to do this. Implemented in `VaultAuthorization`

### `hasApprovedRelayer`

```
hasApprovedRelayer(
    address user, 
    address relayer) 
returns(bool)
```

&#x20;Returns true if `user` has allowed `relayer` to act as a relayer for them. Implemented in `VaultAuthorization`

### `setRelayerApproval`

```
setRelayerApproval(
    address sender, 
    address relayer,
    bool approved)
    
emits RelayerApprovalChanged(address indexed relayer,
                             address indexed sender,
                             bool approved)
```

Grants or revokes approval for the given `relayer` to call Authorizer-approved functions on behalf of `user`.  Implemented in `VaultAuthorization`

## Internal Balances

### **`getInternalBalance`**

```
getInternalBalance(
    address user, 
    IERC20[] tokens) 
returns (uint256[])
```

Get a user's internal balances. This is called UserBalance in external interfaces, and "internal balance" in the internal functions. Implemented in `UserBalance`.

### `manageUserBalance`

{% hint style="info" %}
For a more in-depth explanation check out [Internal User Balances](../../../resources/internal-user-balances.md) in the Resources.
{% endhint %}

```
manageUserBalance(UserBalanceOp[] ops)

emits one of:

InternalBalanceChanged(address indexed user,
                       IERC20 indexed token,
                       int256 delta)
                       
ExternalBalanceTransfer(IERC20 indexed token,
                        address indexed sender,
                        address recipient,
                        uint256 amount)
```

There are four possible operations in `manageUserBalance`: each designates a sender/receiver, asset, and amount. The asset is either a token address or the zero address (meaning ETH). The Vault does not store ETH, but you can use ETH when interacting with internal balances; the Vault will do any necessary wrapping/unwrapping.

## Pools

### **`registerPool`**

```
registerPool(PoolSpecialization specialization) 
returns(bytes32)

emits PoolRegistered(bytes32 indexed poolId,
                     address indexed poolAddress,
                     PoolSpecialization specialization)
```

Called from the pool contract to generate a  Pool ID, and enter it in the Vault's pool data structures. Implemented in `PoolRegistry`.

### **`getPool`**

```
getPool(bytes32 poolId) 
returns (address, 
    PoolSpecialization)
```

Returns a Pool's contract address and specialization setting. Implemented in `PoolRegistry`.

### **`registerTokens`**

```
registerTokens(
    bytes32 poolId, 
    IERC20[] tokens, 
    address[] assetManagers)
    
emits TokensRegistered(indexed bytes32 poolId,
                       IERC20[] tokens,
                       address[] assetManagers)
```

Called from the pool contract to tell the Vault which tokens are valid for this pool (i.e., which can be used to swap, join, or exit). An asset manager can also be assigned to each token at this step, which is thereafter immutable (unless you deregister and register again). Implemented in `PoolTokens`.

### **`deregisterTokens`**

```
deregisterTokens(
    bytes32 poolId, 
    IERC20[] tokens)
    
emits TokensDeregistered(indexed bytes32 poolId, IERC20[] tokens)
```

Remove tokens from the pool (must have zero balance). Implemented in `PoolTokens`.

### **`getPoolTokenInfo`**

```
getPoolTokenInfo(bytes32 poolId, 
    IERC20 token) 
returns (uint256 cash, 
    uint256 managed, 
    uint256 blockNumber, 
    address assetManager)
```

Return details of a particular token. While `getPoolTokens` gives the total balance, `getPoolTokenInfo` returns each component of the balance, as well as the time (block) it was last modified, and the asset manager. Implemented in `PoolTokens`.

### `getPoolTokens`

```
getPoolTokens(bytes32 poolId)
returns (IERC20[] tokens, 
    uint256[] balances,
    uint256 lastChangeBlock)
```

Returns a Pool's registered tokens, the total balance for each, and the most recent block in which any of the tokens were updated. Implemented by PoolAssets. Implemented in `PoolTokens`.

## Joins and Exits

{% hint style="info" %}
For a more in-depth explanation check out [Joins and Exits](../../../resources/joins-and-exits/) in the Resources.
{% endhint %}

{% hint style="warning" %}
Note that any functions that take a token array always expect input "parallel" to the pool tokens. If you are joining a 7-token pool with one token, you must pass an array of 7 amounts, with the rest set to 0.
{% endhint %}

### `joinPool`

```
joinPool(
    bytes32 poolId, 
    address sender, 
    address recipient, 
    JoinPoolRequest request)
```

### `exitPool`

```
exitPool(
    bytes32 poolId, 
    address sender, 
    address recipient, 
    ExitPoolRequest request)
```

`JoinPoolRequest` and `ExitPoolRequest` takes a `userData` argument, which specifies exactly how the pool should be joined/exited (e.g., the token addresses and balances transferred to/from the Vault, and expected number of pool tokens to be burned). Implemented by `PoolBalances`.

Both joins and exits emit the `PoolBalanceChanged` event.

```
emits PoolBalanceChanged(
        bytes32 indexed poolId,
        address indexed liquidityProvider,
        IERC20[] tokens,
        int256[] deltas,
        uint256[] protocolFeeAmounts)
```

## Single Swaps

{% hint style="info" %}
For a more in-depth explanation check out the [Single Swaps](../../../guides/swaps/single-swaps.md) page in Guides.
{% endhint %}

The vault supports "single swaps," a way to perform exactly one trade directly and gas-efficiently with a particular pool (e.g., for token sale GUIs). You can still use the internal balance.

### **`swap`**

```
swap(
    SingleSwap request, 
    FundManagement funds, 
    uint256 limit, 
    uint256 deadline) 
returns (uint256 assetDelta)
```

Implemented in `Swaps`.

## Batch Swaps

{% hint style="info" %}
For a more in-depth explanation check out the [Batch Swaps](../../../guides/swaps/batch-swaps.md) page in Guides.
{% endhint %}

Batch swap "steps" specify the assets involved, "many-to-many" sources and destinations, and min/max token limits to guard against slippage. There is also an optional deadline, after which the swap will timeout and revert. These return the token "deltas" - the net result of executing each swap sequentially.&#x20;

### **`batchSwap`**

```
batchSwap(
    SwapKind kind,
    BatchSwapStep[] swaps, 
    IAsset[] assets, 
    FundManagement funds, 
    int256[] limits, 
    uint256 deadline) 
returns (int256[] assetDeltas)
```

Implemented in `Swaps.`Both single and batch swaps emit a `Swap` event for each swap.

```
event Swap(
        bytes32 indexed poolId,
        IERC20 indexed tokenIn,
        IERC20 indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut)
```

### `queryBatchSwap`

```
queryBatchSwap(
    SwapKind kind, 
    BatchSwapStep[] swaps, 
    IAsset[] assets, 
    FundManagement funds) 
returns (int256[] assetDeltas)
```

The `queryBatchSwap` method executes the exact same code as `batchSwap` - but reverts at the end. This is for GUIs or scripts to calculate a "dry run" of a sequence of swaps. Implemented in `Swaps`.

{% hint style="warning" %}
`queryBatchSwap` is **not** defined as a `view` function even though that is a common use case. To use it as such, you need to use `eth_call` instead of `eth_sendTransaction`.

For example in `ethers.js`, the command would look something like:\
`const quote = await vault.callStatic.queryBatchSwap(0, [swap0, swap1], assets, funds);`
{% endhint %}

## Flash Loans

### **`flashLoan`**

```
flashLoan(
    IFlashLoanRecipient recipient, 
    IERC20[] tokens, 
    uint256[] amounts, 
    bytes userData)
    
emits FlashLoan(IFlashLoanRecipient indexed recipient,
                IERC20 indexed token,
                uint256 amount,
                uint256 feeAmount)
```

Execute a flash loan. This sends the given token amounts to the flash loan receiver contract; all borrowed funds - plus the protocol flash loan fee - must be returned to the vault in the same transaction, or it will revert. Implemented by a `FlashLoans` subclass. Implemented in `FlashLoans`.

## Asset Management

This can only be called by the asset manager of a token in a pool.

### `managePoolBalance`

```
managePoolBalance(
    PoolBalanceOp[] ops)
    
emits PoolBalanceManaged(
        bytes32 indexed poolId,
        address indexed assetManager,
        IERC20 indexed token,
        int256 cashDelta,
        int256 managedDelta)
```

&#x20;Deposit or withdraw funds from the pool (i.e., move funds between _cash_ and _managed_ balances), or update the total balance (i.e., reporting a gain or loss from management activities). Implemented in `AssetManagers`. Each `PoolBalanceOp` describes the type of operation (deposit/withdraw/update), the pool ID, the token, and the amount.

## Miscellaneous

### **`getProtocolFeesCollector`**&#x20;

```
getProtocolFeesCollector() 
returns (ProtocolFeesCollector) 
```

The external contract authorized to collect protocol fees. Implemented by `Fees`.

### **`setPaused`**&#x20;

```
setPaused(bool paused)

emits PausedStateChanged(bool paused)
```

Safety mechanism to halt most Vault operations in the event of an emergency. The only functions allowed involve withdrawing funds (e.g., from internal balances, or proportional pool exits). Implemented by `Vault`.

### **`WETH`**&#x20;

```
WETH()  
returns (IWETH)
```

The Vault's address for WETH. Implemented by `Vault`.
