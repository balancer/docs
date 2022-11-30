# WeightedPool

## More functions are inherited

This page breaks out the functions that are not common to all pools. See more functions on the [Pools page](./).

## API

### `onSwap`

```cpp
// Inherited from BaseMinimalSwapInfoPool
onSwap(SwapRequest request,
       uint256 balanceTokenIn,
       uint256 balanceTokenOut) 
returns (uint256 amount[In/Out])
```

When the Vault is handling a swap, it will call `onSwap` to ask the pool what the amounts should be. Pools that use weighted math only need the input/output tokens to determine price.
