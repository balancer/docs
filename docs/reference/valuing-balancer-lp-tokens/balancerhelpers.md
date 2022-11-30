# BalancerHelpers

### `queryJoin`

```
queryJoin(
    bytes32 poolId, 
    address sender, 
    address recipient, 
    JoinPoolRequest request)
returns (uint256 bptOut, uint256[] amountsIn)

JoinPoolRequest(
    address[] assets,
    uint256[] maxAmountsIn,
    bytes userData,
    bool fromInternalBalance
)
```

### `queryExit`

```
queryExit(
    bytes32 poolId, 
    address sender, 
    address recipient, 
    ExitPoolRequest request)
returns (uint256 bptIn, uint256[] amountsOut)

ExitPoolRequest(
    address[] assets,
    uint256[] minAmountsOut,
    bytes userData,
    bool toInternalBalance 
)
```
