# Asset Managers

{% hint style="warning" %}
### Heads up!

Asset Managers can only be used with pools deployed from factories that enable them in their pools. There currently are no pool factories that support pools with Asset Managers. The first use cases are expected to become available after Managed Pools (which have admin controls) are launched.

### Why?

While it is possible to write an Asset Manager, their primary intended use-case is more elegantly solved with Boosted Pools. There may still be use-cases for which Asset Managers are advantageous, but for now they have not yet been implemented.
{% endhint %}

## `managePoolBalance`

```
enum PoolBalanceOpKind { WITHDRAW, DEPOSIT, UPDATE }
    
struct PoolBalanceOp {
    PoolBalanceOpKind kind;
    bytes32 poolId;
    IERC20 token;
    uint256 amount;
}
    
function managePoolBalance(PoolBalanceOp[] ops);
```

Each token in the pool can be associated with an Asset Manager contract. Authorized Asset Managers can call the Vault's `managePoolBalance` function to perform batch operations on pools. They can withdraw tokens from the Vault (and then "invest" them according to the strategy), return them to the Vault with deposit, or update the total (to report gains/losses).

## Inheriting from `AssetManager`

Asset Managers will subclass the base `AssetManager`, which has not yet been fully defined. The expected interface will likely be similar to the following

```
getBalance(bytes32 poolId) returns (uint256 managedTokenBalance)

getInvestablePercent(bytes32 poolId) returns (uint256) 

setInvestablePercent(bytes32 poolId, uint256 investmentPercent)

maxInvestableBalance(bytes32 poolId) returns (int256 maxBalance)

// Called by anyone, to realize gains/losses
updateBalanceOfPool(bytes32 poolId)
```
