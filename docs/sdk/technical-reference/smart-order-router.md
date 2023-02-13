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
