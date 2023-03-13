# Class: Sor

The Smart Order Router (SOR) is a tool designed to optimize order routing across Balancer pools for the best possible price execution. It can be accessed through the SDK, but it is also available as a standalone package for those who only need the swap routing functionality. This example code will utilize the SDK, but it is easy to understand how to make changes for the standalone SOR package.

The below docs assume the SDK is installed and initialized.

```javascript
import { BalancerSDK } from '@balancer-labs/sdk'

const balancer = new BalancerSDK({
  network: 1, // Mainnet
  rpcUrl: 'https://rpc.ankr.com/eth' // rpc endpoint
})

const { sor } = balancer
```

## Hierarchy

- `SOR`

  ↳ **`Sor`**

## Constructors

### constructor

• **new Sor**(`sdkConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sdkConfig` | [`BalancerSdkConfig`](../modules.md#balancersdkconfig) |

#### Overrides

SOR.constructor

#### Defined in

[balancer-sdk/balancer-js/src/modules/sor/sor.module.ts:36](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sor/sor.module.ts#L36)

## Properties

### provider

• **provider**: `Provider`

#### Inherited from

SOR.provider

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:281

___

### routeProposer

• `Readonly` **routeProposer**: `RouteProposer`

#### Inherited from

SOR.routeProposer

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:284

___

### swapCostCalculator

• `Readonly` **swapCostCalculator**: `SwapCostCalculator`

#### Inherited from

SOR.swapCostCalculator

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:285

## Methods

### fetchPools

▸ **fetchPools**(): `Promise`<`boolean`\>

fetchPools Retrieves pools information and saves to internal pools cache.

#### Returns

`Promise`<`boolean`\>

True if pools fetched successfully, False if not.

#### Inherited from

SOR.fetchPools

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:300

___

### getCostOfSwapInToken

▸ **getCostOfSwapInToken**(`outputToken`, `outputTokenDecimals`, `gasPrice`, `swapGas?`): `Promise`<`BigNumber`\>

getCostOfSwapInToken Calculates and saves price of a swap in outputToken denomination. Used to determine if extra swaps are cost effective.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `outputToken` | `string` | Address of outputToken. |
| `outputTokenDecimals` | `number` | Decimals of outputToken. |
| `gasPrice` | `BigNumber` | Gas price used to calculate cost. |
| `swapGas?` | `BigNumber` | Gas cost of a swap. Default=85000. |

#### Returns

`Promise`<`BigNumber`\>

Price of a swap in outputToken denomination.

#### Inherited from

SOR.getCostOfSwapInToken

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:322

___

### getPools

▸ **getPools**(`useBpts?`): `SubgraphPoolBase`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `useBpts?` | `boolean` |

#### Returns

`SubgraphPoolBase`[]

#### Inherited from

SOR.getPools

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:295

___

### getSwaps

▸ **getSwaps**(`tokenIn`, `tokenOut`, `swapType`, `swapAmount`, `swapOptions?`, `useBpts?`): `Promise`<`SwapInfo`\>

/**
 * getSwaps Retrieve information for best swap tokenIn>tokenOut.
 *

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokenIn` | `string` | Address of tokenIn. * |
| `tokenOut` | `string` | Address of tokenOut. * |
| `swapType` | [`SwapTypes`](../enums/SwapTypes.md) | SwapExactIn where the amount of tokens in (sent to the Pool) is known or SwapExactOut where the amount of tokens out (received from the Pool) is known. * |
| `swapAmount` | `BigNumberish` | Either amountIn or amountOut depending on the `swapType` value. * |
| `swapOptions?` | `Partial`<`SwapOptions`\> | * |
| `useBpts?` | `boolean` | Set to true to consider join/exit weighted pool paths (these will need formatted and submitted via Relayer) * |

#### Returns

`Promise`<`SwapInfo`\>

Swap information including return amount and swaps structure to be submitted to Vault.

#### Inherited from

SOR.getSwaps

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:313
