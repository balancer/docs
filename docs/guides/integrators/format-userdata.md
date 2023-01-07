# Format Data for Joins/Exits

::: tip
Adding or removing liquidity to a pool, commonly referred to as joins or exits, is done directly through the vault and not the indvidiual pool contracts. There are many different ways to go about joining/exiting due to the number of join/exit kinds and different types of pools. This guide will showcase several different options, so feel free to jump to the section that best matches your use case.
:::

## Precursor

Before diving into the guide, it's good to quickly review the entry point on the Vault to understand how all of the code in the guide boils down into this method.

```solidity
function joinPool(
    bytes32 poolId, 
    address sender, 
    address recipient, 
    JoinPoolRequest memory request
) external payable;

struct JoinPoolRequest {
    IAsset[] assets,
    uint256[] maxAmountsIn,
    bytes userData,
    bool fromInternalBalance
}
```