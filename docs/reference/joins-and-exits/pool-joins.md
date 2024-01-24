---
order: 1
---

# Pool Joins

::: info
Calls to `joinPool()` are made on the Vault contract! You cannot send this command directly to a pool.
:::

## API

```solidity
joinPool(
    bytes32 poolId,
    address sender,
    address recipient,
    JoinPoolRequest request
)

struct JoinPoolRequest {
    address[] assets,
    uint256[] maxAmountsIn,
    bytes userData,
    bool fromInternalBalance
}
```

### Arguments Explained

- `poolId` - ID of the pool you're interacting with
- `sender` - Address sending tokens to the pool
- `recipient` - Address receiving BPT (usually the same as sender)
- `request` - JoinPoolRequest tuple made up of the following:
  - `assets` - Sorted list of all tokens in pool (see below)
  - `maxAmountsIn` - Maximum token send amounts (see below)
  - `userData` - Custom bytes field (see below)
  - `fromInternalBalance` - `True` if sending from internal token balances. `False` if sending ERC20.

### Token Ordering

When providing your assets, you must ensure that the tokens are sorted numerically by token address. It's also important to note that the values in maxAmountsIn correspond to the same index value in assets, so these arrays must be made in parallel _after_ sorting.

### `maxAmountsIn`

In the joinPool call, you have to provide `maxAmountsIn`, the upper limits for the tokens to send. In short, what are the maximum amounts you would find acceptable to send, given the amount of BPT you are receiving?

A good practice is to use [`queryJoin` in `BalancerQueries`](/reference/contracts/query-functions.md#queryjoin) to find the current amount of BPT you would get for your tokens, and then account for some possible slippage.

Let's say that you want to allow a 1% slippage. After computing how many tokens you expect to provide for a given amount of BPT, you'd apply a factor of 1.01 to all the amounts. These thresholds are important because it's possible for token amounts to change in the pool between the time you send your transaction and when your transaction executes.

### `userData`

userData is a highly versatile field; as such, it needs to be encoded for its specific use case. For joins, userData encodes a `JoinKind` to tell the pool what style of join you're performing. Not every pool uses every `JoinKind`, so it's important to keep track of what each pool type can handle.
::: info 
When encoding `userData` for pools that include their own BPT as part of the pool's tokens, the BPT are not included in the `userData`, except for `INIT` joins where they need to be included.
:::

#### WeightedPool JoinKinds

```solidity
enum JoinKind {
    INIT,
    EXACT_TOKENS_IN_FOR_BPT_OUT,
    TOKEN_IN_FOR_EXACT_BPT_OUT,
    ALL_TOKENS_IN_FOR_EXACT_BPT_OUT
}
```

Applies to:

- WeightedPool
- WeightedPool2Tokens
- LiquidityBootstrappingPool
- InvestmentPool

#### StablePool JoinKinds

::: warning 
ComposableStablePools have different `JoinKind` enums compared to StablePools and MetaStablePools 
:::

For **StablePool** and **MetaStablePool** the following `JoinKind` applies: 

```solidity
enum JoinKind {
    INIT,
    EXACT_TOKENS_IN_FOR_BPT_OUT,
    TOKEN_IN_FOR_EXACT_BPT_OUT
 }
```

For **ComposableStablePool** the following `JoinKind` applies: 

```solidity
enum JoinKind {
    INIT,
    EXACT_TOKENS_IN_FOR_BPT_OUT,
    TOKEN_IN_FOR_EXACT_BPT_OUT,
    ALL_TOKENS_IN_FOR_EXACT_BPT_OUT
 }
```


#### JoinKinds Explained

- **Initial Join** (`INIT`)
  - User sends the precise initial tokens to seed a pool. This can be done only once.
- **Exact Tokens Join** (`EXACT_TOKENS_IN_FOR_BPT_OUT`)
  - User sends precise quantities of tokens, and receives an estimated but unknown (computed at run time) quantity of BPT.
- **Single Token Join** (`TOKEN_IN_FOR_EXACT_BPT_OUT`)
  - User sends an estimated but unknown (computed at run time) quantity of a single token, and receives a precise quantity of BPT.
- **Proportional Join** (`ALL_TOKENS_IN_FOR_EXACT_BPT_OUT`)
  - User sends estimated but unknown (computed at run time) quantities of tokens, and receives precise quantity of BPT.

#### Encoding

- **Initial Join**
  - userData ABI
    - `['uint256', 'uint256[]']`
  - userData
    - `[INIT, amountsIn]`
- **Exact Tokens Join**
  - userData ABI
    - `['uint256', 'uint256[]', 'uint256']`
  - userData
    - `[EXACT_TOKENS_IN_FOR_BPT_OUT, amountsIn, minimumBPT]`
- **Single Token Join**
  - userData ABI
    - `['uint256', 'uint256', 'uint256']`
  - userData
    - `[TOKEN_IN_FOR_EXACT_BPT_OUT, bptAmountOut, enterTokenIndex]`
- **Proportional Join**
  - userData ABI
    - `['uint256', 'uint256']`
  - userData
    - `[ALL_TOKENS_IN_FOR_EXACT_BPT_OUT, bptAmountOut]`
