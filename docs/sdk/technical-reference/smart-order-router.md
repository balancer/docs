---
order: 1
---
# Smart Order Router
The Smart Order Router (SOR) is a tool designed to optimize order routing across Balancer pools for the best possible price execution. It can be accessed through the SDK, but it is also available as a standalone package for those who only need the swap routing functionality. This example code will utilize the SDK, but it is easy to understand how to make changes for the standalone SOR package.

The below docs assume the SDK is installed and initialized.

```javascript
import { BalancerSDK } from '@balancer-labs/sdk'

const balancer = new BalancerSDK({
  network: 1, // Mainnet
  rpcUrl: 'https://rpc.ankr.com/eth' // rpc endpoint
})

const { swaps } = balancer // Swaps module is abstracting SOR
```

The general flow for finding a trade route using SOR (Smart Order Router) includes the following steps:

### Step 1. Pool data fetching
The SOR requires information about the available pools and their current status, including the prices of tokens and the liquidity of the pools. It is essential to use the SOR based on up-to-date information, as outdated information can lead to incorrect slippage predictions and potentially result in failed swaps.
```javascript
await swaps.fetchPools()
```

### Step 2. Route proposal
The SOR determines the optimal trade route based on the available pool data and the desired trade, taking into account factors such as trade size, gas costs, and slippage. When searching for swaps, developers have to choose between two types of swaps:

* `findRouteGivenIn`, where the amount of tokens being sent to the pool is known, or
* `findRouteGivenOut`, where the amount of tokens received from the pool is known.

```javascript
const swapInfo = await swaps.findRouteGivenIn({
  tokenIn: '0xstring',          // address of tokenIn
  tokenOut: '0xstring',         // address of tokenOut
  amount: parseEther('1'),      // BigNumber with a trade amount
  gasPrice: parseFixed('1', 9), // BigNumber current gas price
  maxPools,                     // number of pool included in path, above 4 is usually a high gas price
});
```
The SOR returns the trade information, including the optimal trade route, the expected slippage and gas cost, and the estimated trade outcome as `swapInfo`.

```js
{
  tokenAddresses: string[]      // tokens used in swaps
  swaps: SwapV2[]               // swaps calldata
  swapAmount: BigNumber
  swapAmountForSwaps: BigNumber // used for wrapped assets, eg: stETH / wstETH
  returnAmount: BigNumber
  returnAmountFromSwaps: BigNumber // used for wrapped assets, eg: stETH/wstETH
  returnAmountConsideringFees: BigNumber
  tokenIn: string
  tokenInForSwaps: string // Used with stETH/wstETH
  tokenOut: string
  tokenOutFromSwaps: string // Used with stETH/wstETH
  marketSp: string
}
```

::: details Example response for ETH to wBTC swap

```js
{
  tokenAddresses: [
    '0x0000000000000000000000000000000000000000',
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
  ],
  swaps: [
    {
      poolId: '0xa6f548df93de924d73be7d25dc02554c6bd66db500020000000000000000000e',
      assetInIndex: 0,
      assetOutIndex: 1,
      amount: '1000000000000000000',
      userData: '0x',
      returnAmount: '7677860'
    }
  ],
  swapAmount: BigNumber { _hex: '0x0de0b6b3a7640000', _isBigNumber: true },
  swapAmountForSwaps: BigNumber { _hex: '0x0de0b6b3a7640000', _isBigNumber: true },
  returnAmount: BigNumber { _hex: '0x7527a4', _isBigNumber: true },
  returnAmountFromSwaps: BigNumber { _hex: '0x7527a4', _isBigNumber: true },
  returnAmountConsideringFees: BigNumber { _hex: '0x752543', _isBigNumber: true },
  tokenIn: '0x0000000000000000000000000000000000000000',
  tokenInForSwaps: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  tokenOut: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  tokenOutFromSwaps: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
  marketSp: '13.022594322651878',
}
```

:::

### Step 3. Transaction encoding
To execute the trade, the returned `swapInfo` must be encoded into a transaction, which requires the following information:
```javascript
const tx = swaps.buildSwap({
  userAddress: '0xstring',    // user address
  swapInfo,                   // result from the previous step
  kind: SwapType.SwapExactIn, // or SwapExactOut
  deadline,                   // BigNumber block timestamp
  maxSlippage,                // [bps], eg: 1 == 0.01%, 100 == 1%
})
```

### Step 4. Broadcast transaction
```javascript
const signer = balancer.provider.getSigner()
await signer.sendTransaction({
  to: tx.to,
  data: tx.data,
  value: tx.value
})
```
