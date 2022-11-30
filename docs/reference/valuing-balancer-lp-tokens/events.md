# Events

## AuthorizerSet

When governance changes the Authorizer contract

```
event AuthorizerSet(IAuthorizer indexed newAuthorizer)
```

## RelayerApprovalChange

When a relayer has privileges approved or revoked

```
event RelayerApprovalChanged(address indexed relayer,
                             address indexed sender,
                             bool approved)
```

## SwapFeePercentageChanged

When associated with a Pool, records a change to the Pool's swap fee. When emitted from the ProtocolFeeCollector, records a change to the Protocol Swap Fee

```
event SwapFeePercentageChanged(uint256 swapFeePercentage)
```

## FlashLoanFeePercentageChanged

Records a change to the Protocol Flash Loan Fee

```
event FlashLoanFeePercentageChanged(uint256 newFlashLoanFeePercentage)
```

## PoolCreated and PoolRegistered

Emitted by BasePoolFactory when a new pool is deployed

```
event PoolCreated(address indexed pool)

event PoolRegistered(bytes32 indexed poolId,
                     address indexed poolAddress,
                     PoolSpecialization specialization)
```

## TokensRegistered

Add a set of tokens to a Pool

```
event TokensRegistered(bytes32 indexed poolId,
                       IERC20[] tokens,
                       address[] assetManagers)
```

## TokensDeregistered

Remove a set of tokens from a Pool

```
event TokensDeregistered(bytes32 indexed poolId, IERC20[] tokens)
```

## InternalBalanceChanged

Record Internal (User) Balance transaction

```
event InternalBalanceChanged(address indexed user,
                             IERC20 indexed token,
                             int256 delta)
```

## ExternalBalanceTransfer

Record transfer between external accounts, using Vault allowance

```
event ExternalBalanceTransfer(IERC20 indexed token,
                              address indexed sender,
                              address recipient,
                              uint256 amount)
```

## PoolBalanceChanged

Emitted when an LP joins or exits a Pool

```
event PoolBalanceChanged(bytes32 indexed poolId,
                         address indexed liquidityProvider,
                         IERC20[] tokens,
                         int256[] deltas,
                         uint256[] protocolFeeAmounts)
```

## Swap

Records an individual swap with a Pool (might be part of a batch swap)

```
event Swap(bytes32 indexed poolId,
           IERC20 indexed tokenIn,
           IERC20 indexed tokenOut,
           uint256 amountIn,
           uint256 amountOut)
```

## PoolBalanceManaged

Records an Asset Manager interaction with a Pool (Deposit, Withdrawal, or Update)

```
event PoolBalanceManaged(bytes32 indexed poolId,
                         address indexed assetManager,
                         IERC20 indexed token,
                         int256 cashDelta,
                         int256 managedDelta)
```

## FlashLoan

Records a FlashLoan&#x20;

```
event FlashLoan(IFlashLoanRecipient indexed recipient,
                IERC20 indexed token,
                uint256 amount,
                uint256 feeAmount)
```
