---
order: 2
---

# Pool Exits

::: info
Calls to `exitPool()` are made on the Vault contract! You cannot send this command directly to a pool.
:::

## API

```solidity
exitPool(
    bytes32 poolId,
    address sender,
    address recipient,
    ExitPoolRequest request
)

struct ExitPoolRequest {
    address[] assets,
    uint256[] minAmountsOut,
    bytes userData,
    bool toInternalBalance
}
```

### Arguments Explained

- `poolId` - ID of the pool you're interacting with
- `sender` - Address sending BPT
- `recipient` - Address receiving tokens (usually the same as sender)
- `request` - ExitPoolRequest tuple made up of the following:
  - `assets` - List of your tokens, ordered (see below)
  - `minAmountsOut` - Minimum token receive amounts (see below)
  - `userData` - Custom bytes field (see below)
  - `toInternalBalance` - `True` if you receiving tokens as internal token balances. `False` if receiving as ERC20.

### Token Ordering

When providing your assets, you must ensure that the tokens are sorted numerically by token address. It's also important to note that the values in minAmountsOut correspond to the same index value in assets, so these arrays must be made in parallel _after_ sorting.

### `minAmountsOut`

In the exitPool call, you have to provide `minAmountsOut`, the lower limits for the tokens to receive. In short, what are the minimum amounts you would find acceptable, given the amount of BPT you are providing?

A good practice would be to user [`queryExit` in `BalancerQueries`](../contracts/query-functions.md#queryexit) to find the current amounts of tokens you would get for your BPT, and then account for some possible slippage.

Let's say that you want to allow a 1% slippage. After computing how many tokens you expect for a given amount of BPT, you'd apply a factor of 0.99 to all the amounts. These thresholds are important because it's possible for token amounts to change in the pool between the time you send your transaction and the when your transaction executes.

### `userData`

userData is a highly versatile field; as such, it needs to be encoded for its specific use case. For exits, userData encodes a `ExitKind` to tell the pool what style of exit you're performing. Since pool types are customizable, not every pool necessarily uses the same `ExitKind`, so it's important to keep track of what each pool type can handle.
::: info 
When encoding `userData` for pools that include their own BPT as part of the pool's tokens, the BPT are not included in the `userData`.
:::

#### WeightedPool ExitKinds

```solidity
enum ExitKind {
    EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
    EXACT_BPT_IN_FOR_TOKENS_OUT,
    BPT_IN_FOR_EXACT_TOKENS_OUT,
    MANAGEMENT_FEE_TOKENS_OUT // for InvestmentPool
}
```

The **first three** types of`ExitKind` apply to the following pools:

- WeightedPool
- WeightedPool2Tokens
- LiquidityBootstrappingPool
- InvestmentPool

As noted in the comment, only the InvestmentPool has a fourth:`MANAGEMENT_FEE_TOKENS_OUT`. This is used as an `internal` function only, so it is out of the scope of this page.

#### StablePool ExitKinds

::: warning 
ComposableStablePools have different `ExitKind` enum ordering from StablePools and MetaStablePools 
:::

For **StablePool** and **MetaStablePool** the following `ExitKind` applies: 

```solidity
enum ExitKind {
    EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
    EXACT_BPT_IN_FOR_TOKENS_OUT,
    BPT_IN_FOR_EXACT_TOKENS_OUT
}
```

For **ComposableStablePool** the following `ExitKind` applies: 


```solidity
enum ExitKind { 
  EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
  BPT_IN_FOR_EXACT_TOKENS_OUT,
  EXACT_BPT_IN_FOR_ALL_TOKENS_OUT
}

```


#### Exit Types Explained

- **Single Asset Exit** (`EXACT_BPT_IN_FOR_ONE_TOKEN_OUT`)
  - User sends a precise quantity of BPT, and receives an estimated but unknown (computed at run time) quantity of a single token.
- **Proportional Exit** (`EXACT_BPT_IN_FOR_TOKENS_OUT`)
  - User sends a precise quantity of BPT, and receives an estimated but unknown (computed at run time) quantities of all tokens.
- **Custom Exit** (`BPT_IN_FOR_EXACT_TOKENS_OUT`)
  - User sends an estimated but unknown (computed at run time) quantity of BPT, and receives precise quantities of specified tokens.

#### Encoding

- Single Asset Exit
  - userData ABI
    - `['uint256', 'uint256', 'uint256']`
  - userData
    - `[EXACT_BPT_IN_FOR_ONE_TOKEN_OUT, bptAmountIn, exitTokenIndex]`
- Proportional Exit
  - userData ABI
    - `['uint256', 'uint256']`
  - userData
    - `[EXACT_BPT_IN_FOR_TOKENS_OUT, bptAmountIn]`
- Custom Exit
  - userData ABI
    - `['uint256', 'uint256[]', 'uint256']`
  - userData
    - `[BPT_IN_FOR_EXACT_TOKENS_OUT, amountsOut, maxBPTAmountIn]`
