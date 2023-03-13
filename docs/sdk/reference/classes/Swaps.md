# Class: Swaps

Exposes complete functionality for token swapping. Module is intergrated with the SOR library designed to optimize order routing across Balancer pools for the best possible price execution.

Swaps instance can be created directly:
```js
import { Swaps } from '@balancer-labs/sdk';

const swaps = new Swaps({
  network: 1,
  rpcUrl: 'https://rpc.ankr.com/eth',
});
```
or accessed from [BalancerSDK](BalancerSDK.md) instance.
```js
import { BalancerSDK } from '@balancer-labs/sdk';

const balancer = new BalancerSDK({
  network: 1,
  rpcUrl: 'https://rpc.ankr.com/eth',
});
const { swaps } = balancer;
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

## Constructors

### constructor

• **new Swaps**(`configOrSor`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configOrSor` | [`BalancerSdkConfig`](../modules.md#balancersdkconfig) \| [`Sor`](Sor.md) |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:161](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L161)

## Methods

### buildSwap

▸ **buildSwap**(`BuildTransactionParameters`): `SwapAttributes`

Builds a transaction for a route found with findRouteGivenIn or findRouteGivenOut

#### Parameters

| Name | Type |
| :------ | :------ |
| `BuildTransactionParameters` | `BuildTransactionParameters` |

#### Returns

`SwapAttributes`

transaction request ready to send with signer.sendTransaction

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:289](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L289)

___

### fetchPools

▸ **fetchPools**(): `Promise`<`boolean`\>

fetchPools saves updated pools data to SOR internal onChainBalanceCache.

#### Returns

`Promise`<`boolean`\>

Boolean indicating whether pools data was fetched correctly (true) or not (false).

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:393](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L393)

___

### findRouteGivenIn

▸ **findRouteGivenIn**(`FindRouteParameters`): `Promise`<`SwapInfo`\>

Uses SOR to find optimal route for a trading pair and amount.

```js
// Uses SOR to find optimal route for a trading pair and amount
const route = swaps.findRouteGivenIn({
  tokenIn,
  tokenOut,
  amount,
  gasPrice,
  maxPools,
});

// Prepares transaction attributes based on the route
const transactionAttributes = swaps.buildSwap({
  userAddress,
  swapInfo: route,
  kind: 0, // 0 - givenIn, 1 - givenOut
  deadline,
  maxSlippage,
});

// Extract parameters required for sendTransaction
const { to, data, value } = transactionAttributes;

// Execution with ethers.js
const transactionResponse = await signer.sendTransaction({ to, data, value });
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `FindRouteParameters` | [`FindRouteParameters`](../modules.md#findrouteparameters) |

#### Returns

`Promise`<`SwapInfo`\>

Best trade route information

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:235](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L235)

___

### findRouteGivenOut

▸ **findRouteGivenOut**(`FindRouteParameters`): `Promise`<`SwapInfo`\>

Uses SOR to find optimal route for a trading pair and amount

#### Parameters

| Name | Type |
| :------ | :------ |
| `FindRouteParameters` | [`FindRouteParameters`](../modules.md#findrouteparameters) |

#### Returns

`Promise`<`SwapInfo`\>

Best trade route information

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:259](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L259)

___

### getPools

▸ **getPools**(): `SubgraphPoolBase`[]

#### Returns

`SubgraphPoolBase`[]

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:397](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L397)

___

### getSorSwap

▸ **getSorSwap**(`swapInput`): `Promise`<`SwapInfo`\>

Use SOR to get swapInfo for tokenIn<>tokenOut.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `swapInput` | `SwapInput` | Swap information used for querying using SOR. |

#### Returns

`Promise`<`SwapInfo`\>

SOR swap info.

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:517](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L517)

___

### queryBatchSwap

▸ **queryBatchSwap**(`batchSwap`): `Promise`<`string`[]\>

queryBatchSwap simulates a call to `batchSwap`, returning an array of Vault asset deltas.

The Balancer Vault provides a [method to simulate a call to batchSwap](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/interfaces/IVault.sol#L644).
This function performs no checks on the sender or recipient or token balances or approvals. Note that this function is not 'view' (due to implementation details): the client code must explicitly execute `eth_call` instead of `eth_sendTransaction`.

```js
const route = swaps.findRouteGivenIn({
  tokenIn,
  tokenOut,
  amount,
  gasPrice,
  maxPools,
});

const deltas = swaps.queryBatchSwap({
  kind: SwapType.SwapExactIn,
  swaps: route.swaps,
  assets: route.assets,
});
```

[Example](https://github.com/balancer-labs/balancer-sdk/blob/master/balancer-js/examples/queryBatchSwap.ts)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `batchSwap` | `Pick`<[`BatchSwap`](../modules.md#batchswap), ``"assets"`` \| ``"kind"`` \| ``"swaps"``\> | BatchSwap information used for query. |

#### Returns

`Promise`<`string`[]\>

Returns an array with the net Vault asset balance deltas. Positive amounts represent tokens (or ETH) sent to the
Vault, and negative amounts represent tokens (or ETH) sent by the Vault. Each delta corresponds to the asset at
the same index in the `assets` array.

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:433](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L433)

___

### queryBatchSwapWithSor

▸ **queryBatchSwapWithSor**(`queryWithSor`): `Promise`<[`QueryWithSorOutput`](../modules.md#querywithsoroutput)\>

Uses SOR to create and query a batchSwap for multiple tokens in > multiple tokensOut.

```js
swaps.queryBatchSwapWithSor(QueryWithSorInput: {
  tokensIn: string[],
  tokensOut: string[],
  swapType: SwapType,
  amounts: string[],
  fetchPools: FetchPoolsInput
}): Promise<QueryWithSorOutput: {
  returnAmounts: string[],
  swaps: BatchSwapStep[],
  assets: string[],
  deltas: string[]
}>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryWithSor` | [`QueryWithSorInput`](../modules.md#querywithsorinput) | Swap information used for querying using SOR. |

#### Returns

`Promise`<[`QueryWithSorOutput`](../modules.md#querywithsoroutput)\>

Returns amount of tokens swaps along with swap and asset info that can be submitted to a batchSwap call.

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:470](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L470)

___

### querySimpleFlashSwap

▸ **querySimpleFlashSwap**(`params`): `Promise`<[`QuerySimpleFlashSwapResponse`](../modules.md#querysimpleflashswapresponse)\>

Simple interface to test if a simple flash swap is valid and see potential profits.

A "simple" flash swap is an arbitrage executed with only two tokens and two pools,
swapping in the first pool and then back in the second pool for a profit. For more
complex flash swaps, you will have to use the batch swap method.

Learn more: A [Flash Swap](https://dev.balancer.fi/resources/swaps/flash-swaps).

_NB: This method doesn't execute a flashSwap

[Example](https://github.com/balancer-labs/balancer-sdk/blob/master/balancer-js/examples/querySimpleFlashSwap.ts)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Omit`<[`QuerySimpleFlashSwapParameters`](../modules.md#querysimpleflashswapparameters), ``"vaultContract"``\> | BatchSwap information used for query. |

#### Returns

`Promise`<[`QuerySimpleFlashSwapResponse`](../modules.md#querysimpleflashswapresponse)\>

Returns an ethersjs transaction response

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:499](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L499)

___

### encodeBatchSwap

▸ `Static` **encodeBatchSwap**(`batchSwap`): `string`

Encode batchSwap in an ABI byte string

::: info
This method doesn't execute a batchSwap -- it returns an [ABI byte string](https://docs.soliditylang.org/en/latest/abi-spec.html)
containing the data of the function call on a contract, which can then be sent to the network to be executed.
(ex. [sendTransaction](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction)).
:::

[Example](https://github.com/balancer-labs/balancer-sdk/blob/master/balancer-js/examples/batchSwap.ts)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `batchSwap` | [`BatchSwap`](../modules.md#batchswap) | BatchSwap information used for query. |

#### Returns

`string`

encodedBatchSwapData - Returns an ABI byte string containing the data of the function call on a contract

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:337](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L337)

___

### encodeSimpleFlashSwap

▸ `Static` **encodeSimpleFlashSwap**(`params`): `string`

Encode simple flash swap into a ABI byte string.

A [Flash Swap](https://dev.balancer.fi/resources/swaps/flash-swaps) is a special type of [batch swap](https://dev.balancer.fi/resources/swaps/batch-swaps)
where the caller doesn't need to own or provide any of the input tokens
-- the caller is essentially taking a "flash loan" (an uncollateralized loan)
from the Balancer Vault. The full amount of the input token must be returned
to the Vault by the end of the batch (plus any swap fees), however any excess of
an output tokens can be sent to any address.

IMPORTANT: A "simple" flash swap is an arbitrage executed with only two tokens and two pools,
swapping in the first pool and then back in the second pool for a profit. For more
complex flash swaps, you will have to use batch swap directly.

Gotchas:

- Both pools must have both assets (tokens) for swaps to work
- No pool token balances can be zero
- If the flash swap isn't profitable, the internal flash loan will fail.

Learn more: A [Flash Swap](https://dev.balancer.fi/resources/swaps/flash-swaps).

[Example](https://github.com/balancer-labs/balancer-sdk/blob/master/balancer-js/examples/simpleFlashSwap.ts)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`SimpleFlashSwapParameters`](../modules.md#simpleflashswapparameters) | BatchSwap information used for query. |

#### Returns

`string`

encodedBatchSwapData - Returns an ABI byte string containing the data of the function call on a contract

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:381](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L381)

___

### getLimitsForSlippage

▸ `Static` **getLimitsForSlippage**(`tokensIn`, `tokensOut`, `swapType`, `deltas`, `assets`, `slippage`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokensIn` | `string`[] |
| `tokensOut` | `string`[] |
| `swapType` | [`SwapType`](../enums/SwapType.md) |
| `deltas` | `string`[] |
| `assets` | `string`[] |
| `slippage` | `string` |

#### Returns

`string`[]

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/swaps.module.ts:177](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/swaps.module.ts#L177)
