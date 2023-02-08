# Use the Smart Order Router

The Smart Order Router (SOR) is a library for order routing optimzation across Balancer pools for best price execution. It is a component of the SDK but also exists as a standalone package for integrators who only need swap routing logic. The example code and reference shown in the docs will use the SDK, but it should be straightforward to infer the changes required for the standalone SOR package.

[![npm version](https://img.shields.io/npm/v/@balancer-labs/sor/latest.svg)](https://www.npmjs.com/package/@balancer-labs/sor/v/latest)

The below docs assume the SDK is installed and initialized:

```javascript
import { BalancerSDK } from '@balancer-labs/sdk'

const balancer = new BalancerSDK({
  network: 1, // Mainnet
  rpcUrl: 'https://rpc.ankr.com/eth' // rpc endpoint
})

const { sor } = balancer // SOR module
```

The general flow for finding a trade route using SOR (Smart Order Router) includes the following steps:

### Step 1. Pool data fetching
The SOR requires information about the available pools and their current status, including the prices of tokens and the liquidity of the pools. It is essential to use the SOR based on up-to-date information, as outdated information can lead to incorrect slippage predictions and potentially result in failed swaps.
```javascript
await sor.fetchPools()
```

### Step 2. Route proposal
The SOR determines the optimal trade route based on the available pool data and the desired trade, taking into account factors such as trade size, gas costs, and slippage. When searching for swaps, developers have to choose between two types of swaps:

* `SwapTypes.SwapExactIn` where the amount of tokens in (sent to the Pool) is known or
* `SwapTypes.SwapExactOut` where the amount of tokens out (received from the Pool) is known.


```typescript
sor.getSwaps(
  tokenIn: string,     // address of tokenIn
  tokenOut: string,    // address of tokenOut
  swapType: SwapTypes, // SwapExactIn or SwapExactOut - see above
  swapAmount: string,  // amountIn or amountOut depending on the `swapType`; number as a string with 18 decimals
  swapOptions: {
    gasPrice: string   // current gas price; number as a string with 18 decimals
    swapGas: string
    timestamp: number
    maxPools: number   // number of pool included in path, above 4 is usually a high gas price
    poolTypeFilter: PoolFilter
    forceRefresh: boolean
  },
  useBpts: boolean     // include join / exits in the path. transaction needs to be sent via Relayer contract
): Promise<SwapInfo>;
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

TODO: describe useBpts case

### Step 4. Broadcast transaction
```javascript
const signer = balancer.provider.getSigner()
await signer.sendTransaction({
  to: tx.to,
  data: tx.data,
  value: tx.value
})
```
