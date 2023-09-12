# Native Asset as Address Zero
The Balancer protocol uses the address zero to represent the native asset address of the chain. 

### Joining with native asset
For example, to join the 50/50 WBTC/WETH pool with WBTC and ETH, the address zero needs to be used
instead of the WETH address, like this:

````ts
//...
const AddressZero =  '0x0000000000000000000000000000000000000000';
// 50/50 WBTC/WETH Pool
let pool = await pools.find(
  '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e'
);

const tokensIn = [
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', // WBTC
  AddressZero, // ETH
];
const amountsIn = ['10000000000', '1000000000000000000'];
const slippage = '1'; // 100 bps = 1%
const { to, data, minBPTOut } = sdk.pools.buildJoin({
  pool,
  userAddress: address,
  tokensIn,
  amountsIn,
  slippage,
});
````

## Swap with native asset

The same applies to swaps:
```ts
//...
const AddressZero =  '0x0000000000000000000000000000000000000000';

const tokenIn = AddressZero; // eth
const tokenOut = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'; // wBTC
const amount = String(BigInt(100e18)); // 100 eth

// Building the route payload
const payload = await sdk.swaps.buildRouteExactIn(
  sender, 
  recipient,
  tokenIn, // eth
  tokenOut, // wBTC
  amount,
);
```

## But MATIC is not address zero

It's true, MATIC is the native asset of Polygon chain and has 
it's own address(0x0000000000000000000000000000000000001010). 
However, the Balancer protocol consider it like address zero for efficience purposes, 
avoiding the contracts to manage native assets for other addresses than address zero.
<br/><br/>
So, for example, to join the 50/50 WMATIC/BAL pool with BAL and MATIC, the address zero 
needs to be used, like this:
````ts
//...
const AddressZero =  '0x0000000000000000000000000000000000000000';
// 50/50 WMATIC/BAL Pool
let pool = await pools.find(
  '0x0280d9a1434c4a42014d35987243b9d893e00dcd000200000000000000000803'
);

const tokensIn = [
  '0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3', // BAL
  AddressZero, // ETH
];
const amountsIn = ['10000000000', '1000000000000000000'];
const slippage = '1'; // 100 bps = 1%
const { to, data, minBPTOut } = sdk.pools.buildJoin({
  pool,
  userAddress: address,
  tokensIn,
  amountsIn,
  slippage,
});
````