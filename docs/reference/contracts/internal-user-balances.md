# Internal User Balances

## Overview

Similar to how the Vault keeps track of what tokens are in a pool, the Vault can also maintain balances for users or any other smart contract. Balances can be deposited to, withdrawn from, and transferred. When utilizing internal balances in Balancer transactions (swap/join/exit), gas costs are reduced since there are fewer (or no) ERC20 tokens transferred and everything is handled by the Vault's bookkeeping.

::: tip Arbitraging with Interal Balances
An arbitrageur that holds `WETH` and `USDC` as internal balances in the Vault can perform an extremely low gas cost swap with no token transfers and then complete the other leg of the arb on a centralized exchange.
:::

## API

```solidity
// Vault function
manageUserBalance(
    UserBalanceOp[] ops
)

// Struct Definition
UserBalanceOp{
    uint8 kind,
    address asset,
    uint256 amount,
    address sender,
    address recipient
}

// Relevant Enum definition for "kind"
enum UserBalanceOpKind {
    DEPOSIT_INTERNAL,
    WITHDRAW_INTERNAL,
    TRANSFER_INTERNAL,
    TRANSFER_EXTERNAL
}
```

### Arguments Explained

- `ops` - An array of UserBalanceOps, explained below
  - `kind` - Enum of type `UserBalanceOpKind`
  - `asset` - The token you are moving
  - `sender` - Address sending tokens or internal balance
  - `recipient` - Address receiving tokens or internal balance

### Enums Explained

- `DEPOSIT_INTERNAL`
  - Increases the Internal Balance of the `recipient` account by transferring tokens from the corresponding`sender`. The sender must have allowed the Vault to use their tokens via `IERC20.approve()`. ETH can be used by passing the ETH sentinel value (the zero address) as the asset and forwarding ETH in the call: it will be wrapped and deposited as WETH. Any ETH amount remaining will be sent back to the caller (not the sender, which is relevant for relayers). Emits an `InternalBalanceChanged` event.
- `WITHDRAW_INTERNAL`

  - Decreases the Internal Balance of the `sender` account by transferring tokens to the `recipient`. ETH can be used by passing the ETH sentinel value (the zero address) as the asset. This will deduct WETH instead, unwrap it and send

    it to the recipient as ETH. Emits an `InternalBalanceChanged` event.

- `TRANSFER_INTERNAL`
  - Transfers tokens from the Internal Balance of the `sender` account to the Internal Balance of `recipient`. Reverts if the ETH sentinel value (the zero address) is passed. Emits an `InternalBalanceChanged` event.
- `TRANSFER_EXTERNAL`
  - Transfers tokens from `sender` to `recipient`, using the Vault's ERC20 allowance. This is typically used by relayers, as it lets them reuse a user's Vault allowance. Reverts if the ETH sentinel value (the zero address) is passed. Emits an `ExternalBalanceTransfer` event.
