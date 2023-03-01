# Class: Relayer

Relayers are (user opt-in, audited) contracts that can make calls to the vault (with the transaction “sender” being any arbitrary address) and use the sender’s ERC20 vault allowance, internal balance or BPTs on their behalf.

Relayer instance can be created directly:
```js
import { Relayer } from '@balancer-labs/sdk';

const relayer = new Relayer({
  network: 1,
  rpcUrl: 'https://rpc.ankr.com/eth'
})
```
or accessed from [BalancerSDK](BalancerSDK.md) instance.
```js
import { BalancerSDK } from '@balancer-labs/sdk';

const balancer = new BalancerSDK({
  network: 1,
  rpcUrl: 'https://rpc.ankr.com/eth',
});
const { relayer } = balancer;
```

## Constructors

### constructor

• **new Relayer**(`swapsOrConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `swapsOrConfig` | [`BalancerSdkConfig`](../modules.md#balancersdkconfig) \| [`Swaps`](Swaps.md) |

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:74](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L74)

## Properties

### CHAINED\_REFERENCE\_READONLY\_PREFIX

▪ `Static` **CHAINED\_REFERENCE\_READONLY\_PREFIX**: `string` = `'ba11'`

Read-only reference: it is not deleted after a read.

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:72](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L72)

___

### CHAINED\_REFERENCE\_TEMP\_PREFIX

▪ `Static` **CHAINED\_REFERENCE\_TEMP\_PREFIX**: `string` = `'ba10'`

Temporary reference: it is deleted after a read.

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:69](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L69)

## Methods

### encodeSwapUnwrap

▸ **encodeSwapUnwrap**(`wrappedTokens`, `swapType`, `swaps`, `assets`, `funds`, `limits`): `string`[]

Creates encoded multicalls using swap outputs as input amounts for token unwrap.

#### Parameters

| Name | Type |
| :------ | :------ |
| `wrappedTokens` | `string`[] |
| `swapType` | [`SwapType`](../enums/SwapType.md) |
| `swaps` | [`BatchSwapStep`](../modules.md#batchswapstep)[] |
| `assets` | `string`[] |
| `funds` | [`FundManagement`](../modules.md#fundmanagement) |
| `limits` | `BigNumberish`[] |

#### Returns

`string`[]

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:619](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L619)

___

### exitPoolAndBatchSwap

▸ **exitPoolAndBatchSwap**(`params`): `Promise`<`TransactionData`\>

exitPoolAndBatchSwap Chains poolExit with batchSwap to final tokens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `ExitAndBatchSwapInput` |

#### Returns

`Promise`<`TransactionData`\>

Transaction data with calldata. Outputs.amountsOut has amounts of finalTokensOut returned.

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:333](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L333)

___

### fetchPools

▸ **fetchPools**(): `Promise`<`boolean`\>

fetchPools saves updated pools data to SOR internal onChainBalanceCache.

#### Returns

`Promise`<`boolean`\>

Boolean indicating whether pools data was fetched correctly (true) or not (false).

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:311](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L311)

___

### getPools

▸ **getPools**(): `SubgraphPoolBase`[]

#### Returns

`SubgraphPoolBase`[]

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:315](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L315)

___

### swapUnwrapAaveStaticExactIn

▸ **swapUnwrapAaveStaticExactIn**(`tokensIn`, `aaveStaticTokens`, `amountsIn`, `rates`, `funds`, `slippage`, `fetchPools?`): `Promise`<`TransactionData`\>

Finds swaps for tokenIn>wrapped Aave static tokens and chains with unwrap to underlying stable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokensIn` | `string`[] | array to token addresses for swapping as tokens in. |
| `aaveStaticTokens` | `string`[] | array contains the addresses of the Aave static tokens that tokenIn will be swapped to. These will be unwrapped. |
| `amountsIn` | `string`[] | amounts to be swapped for each token in. |
| `rates` | `string`[] | The rate used to convert wrappedToken to underlying. |
| `funds` | [`FundManagement`](../modules.md#fundmanagement) | Funding info for swap. Note - recipient should be relayer and sender should be caller. |
| `slippage` | `string` | Slippage to be applied to swap section. i.e. 5%=50000000000000000. |
| `fetchPools` | [`FetchPoolsInput`](../modules.md#fetchpoolsinput) | Set whether SOR will fetch updated pool info. |

#### Returns

`Promise`<`TransactionData`\>

Transaction data with calldata. Outputs.amountsOut has final amounts out of unwrapped tokens.

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:463](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L463)

___

### swapUnwrapAaveStaticExactOut

▸ **swapUnwrapAaveStaticExactOut**(`tokensIn`, `aaveStaticTokens`, `amountsUnwrapped`, `rates`, `funds`, `slippage`, `fetchPools?`): `Promise`<`TransactionData`\>

Finds swaps for tokenIn>wrapped Aave static tokens and chains with unwrap to underlying stable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokensIn` | `string`[] | array to token addresses for swapping as tokens in. |
| `aaveStaticTokens` | `string`[] | array contains the addresses of the Aave static tokens that tokenIn will be swapped to. These will be unwrapped. |
| `amountsUnwrapped` | `string`[] | amounts of unwrapped tokens out. |
| `rates` | `string`[] | The rate used to convert wrappedToken to underlying. |
| `funds` | [`FundManagement`](../modules.md#fundmanagement) | Funding info for swap. Note - recipient should be relayer and sender should be caller. |
| `slippage` | `string` | Slippage to be applied to swap section. i.e. 5%=50000000000000000. |
| `fetchPools` | [`FetchPoolsInput`](../modules.md#fetchpoolsinput) | Set whether SOR will fetch updated pool info. |

#### Returns

`Promise`<`TransactionData`\>

Transaction data with calldata. Outputs.amountsIn has the amounts of tokensIn.

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:543](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L543)

___

### encodeApproveVault

▸ `Static` **encodeApproveVault**(`tokenAddress`, `maxAmount`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenAddress` | `string` |
| `maxAmount` | `string` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:82](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L82)

___

### encodeBatchSwap

▸ `Static` **encodeBatchSwap**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `EncodeBatchSwapInput` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:140](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L140)

___

### encodeExitPool

▸ `Static` **encodeExitPool**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `EncodeExitPoolInput` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:153](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L153)

___

### encodeGaugeDeposit

▸ `Static` **encodeGaugeDeposit**(`gaugeAddress`, `sender`, `recipient`, `amount`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `gaugeAddress` | `string` |
| `sender` | `string` |
| `recipient` | `string` |
| `amount` | `string` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:115](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L115)

___

### encodeGaugeWithdraw

▸ `Static` **encodeGaugeWithdraw**(`gaugeAddress`, `sender`, `recipient`, `amount`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `gaugeAddress` | `string` |
| `sender` | `string` |
| `recipient` | `string` |
| `amount` | `string` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:101](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L101)

___

### encodeJoinPool

▸ `Static` **encodeJoinPool**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `EncodeJoinPoolInput` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:164](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L164)

___

### encodePeekChainedReferenceValue

▸ `Static` **encodePeekChainedReferenceValue**(`reference`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reference` | `BigNumberish` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:202](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L202)

___

### encodeSetRelayerApproval

▸ `Static` **encodeSetRelayerApproval**(`relayerAdress`, `approved`, `authorisation`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `relayerAdress` | `string` |
| `approved` | `boolean` |
| `authorisation` | `string` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:89](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L89)

___

### encodeSwap

▸ `Static` **encodeSwap**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`Swap`](../modules.md#swap) |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:129](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L129)

___

### encodeUnwrapAaveStaticToken

▸ `Static` **encodeUnwrapAaveStaticToken**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `EncodeUnwrapAaveStaticTokenInput` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:189](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L189)

___

### encodeWrapAaveDynamicToken

▸ `Static` **encodeWrapAaveDynamicToken**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `EncodeWrapAaveDynamicTokenInput` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:176](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L176)

___

### formatExitPoolInput

▸ `Static` **formatExitPoolInput**(`params`): `EncodeExitPoolInput`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ExitPoolData`](../modules.md#exitpooldata) |

#### Returns

`EncodeExitPoolInput`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:240](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L240)

___

### formatJoinPoolInput

▸ `Static` **formatJoinPoolInput**(`params`): `EncodeJoinPoolInput`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`JoinPoolData`](../modules.md#joinpooldata) |

#### Returns

`EncodeJoinPoolInput`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:271](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L271)

___

### fromChainedReference

▸ `Static` **fromChainedReference**(`ref`, `isTemporary?`): `BigNumber`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ref` | `string` | `undefined` |
| `isTemporary` | `boolean` | `true` |

#### Returns

`BigNumber`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:217](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L217)

___

### isChainedReference

▸ `Static` **isChainedReference**(`amount`): `boolean`

Returns true if `amount` is not actually an amount, but rather a chained reference.

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` |

#### Returns

`boolean`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:229](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L229)

___

### signRelayerApproval

▸ `Static` **signRelayerApproval**(`relayerAddress`, `signerAddress`, `signer`, `vault`): `Promise`<`string`\>

Creates a signature for a relayer approval.

#### Parameters

| Name | Type |
| :------ | :------ |
| `relayerAddress` | `string` |
| `signerAddress` | `string` |
| `signer` | `JsonRpcSigner` |
| `vault` | `Vault` |

#### Returns

`Promise`<`string`\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:676](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L676)

___

### toChainedReference

▸ `Static` **toChainedReference**(`key`, `isTemporary?`): `BigNumber`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `key` | `BigNumberish` | `undefined` |
| `isTemporary` | `boolean` | `true` |

#### Returns

`BigNumber`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/relayer.module.ts:208](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/relayer.module.ts#L208)
