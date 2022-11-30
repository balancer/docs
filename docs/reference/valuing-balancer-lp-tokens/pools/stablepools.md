# StablePools

## More functions are inherited

This page breaks out the functions that are not common to all pools. See more functions on the [Pools page](./).

## API

### `onSwap`

```cpp
// Inherited from BaseGeneralPool
onSwap(SwapRequest swapRequest,
       uint256[] balances,
       uint256 indexIn,
       uint256 indexOut) 
returns (uint256 amount[In/Out])
```

When the Vault is handling a swap, it will call `onSwap` to ask the pool what the amounts should be. Pools that use stable math need the all tokens balances to determine price.

### `getAmplificationParameter`

```
function getAmplificationParameter()
returns (uint256 value, bool isUpdating, uint256 precision)
```

Returns the amplification parameter value, a boolean to determine if it's updating, and its precision.

## Permissioned Functions

All of the following functions are only callable by the pool owner.

### `startAmplificationParameterUpdate`

```
function startAmplificationParameterUpdate(
    uint256 rawEndValue,
    uint256 endTime)
```

Begins changing the amplification parameter to `rawEndValue` over time. The value will change linearly until `endTime` is reached, when it will be `rawEndValue`.&#x20;

**NOTE**: Internally, the amplification parameter is represented using higher precision. The values returned by `getAmplificationParameter` have to be corrected to account for this when comparing to `rawEndValue`.

### `stopAmplificationParameterUpdate`

```
function stopAmplificationParameterUpdate() external
```

Stops the amplification parameter change process, keeping the current value.
