# Class: Pools

Controller / use-case layer for interacting with pools data.

## Implements

- `Findable`<[`PoolWithMethods`](../interfaces/PoolWithMethods.md)\>

## Constructors

### constructor

• **new Pools**(`networkConfig`, `repositories`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkConfig` | [`BalancerNetworkConfig`](../modules.md#balancernetworkconfig) |
| `repositories` | `BalancerDataRepositories` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:52](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L52)

## Properties

### emissionsService

• **emissionsService**: `undefined` \| `EmissionsService`

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:48](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L48)

___

### poolFactory

• **poolFactory**: `PoolFactory__factory`

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:49](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L49)

___

### proportionalAmounts

• **proportionalAmounts**: (`pool`: { `id`: `string` ; `tokens`: { `address`: `string` ; `balance`: `string` ; `decimals?`: `number`  }[]  }, `token`: `string`, `amount`: `string`) => { `amounts`: `string`[] ; `tokens`: `string`[]  }

#### Type declaration

▸ (`pool`, `token`, `amount`): `Object`

Calculates the proportional amounts of tokens in relation to a given token and amount.
Useful for calculating the amounts of tokens to be sent to a pool when joining or swapping.
When using proportional amounts to join a pool the price impact will be minimal.

```js
const pool = {
  id: '0x0000',
  tokens: [
    { address: '0x1234', balance: '10' },
    { address: '0x5678', balance: '20' }
  ]
}

const { tokens, amounts } = proportionalAmounts(pool, '0x1234', '1000000000000000000')
```

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | `Object` | Pool object |
| `pool.id` | `string` | Pool ID |
| `pool.tokens` | { `address`: `string` ; `balance`: `string` ; `decimals?`: `number`  }[] | List of pool tokens |
| `token` | `string` | Token address in relation to which the amounts are calculated |
| `amount` | `string` | Amount of token |

##### Returns

`Object`

| Name | Type | Description |
| :------ | :------ | :------ |
| `amounts` | `string`[] | list of amounts |
| `tokens` | `string`[] | list of tokens |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:50](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L50)

## Methods

### all

▸ **all**(): `Promise`<[`PoolWithMethods`](../interfaces/PoolWithMethods.md)[]\>

#### Returns

`Promise`<[`PoolWithMethods`](../interfaces/PoolWithMethods.md)[]\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:520](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L520)

___

### apr

▸ **apr**(`pool`): `Promise`<`AprBreakdown`\>

Calculates APR on any pool data

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](../interfaces/Pool.md) |

#### Returns

`Promise`<`AprBreakdown`\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:103](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L103)

___

### buildExitExactBPTIn

▸ **buildExitExactBPTIn**(`pool`, `exiter`, `bptIn`, `slippage`, `shouldUnwrapNativeAsset?`, `singleTokenMaxOut?`): [`ExitExactBPTInAttributes`](../modules.md#exitexactbptinattributes)

Build pool exit transaction data for a given amount of BPT in

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pool` | [`Pool`](../interfaces/Pool.md) | `undefined` | Pool data |
| `exiter` | `string` | `undefined` | Address of a user that will exit the pool |
| `bptIn` | `string` | `undefined` | Amount of BPT to exit with |
| `slippage` | `string` | `undefined` | Tollerable slippage in bps |
| `shouldUnwrapNativeAsset` | `boolean` | `false` | Whether to unwrap native asset |
| `singleTokenMaxOut?` | `string` | `undefined` | Address of a single token to exit the whole liquidity to |

#### Returns

[`ExitExactBPTInAttributes`](../modules.md#exitexactbptinattributes)

Exit transaction data

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:287](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L287)

___

### buildExitExactTokensOut

▸ **buildExitExactTokensOut**(`pool`, `exiter`, `tokensOut`, `amountsOut`, `slippage`): [`ExitExactTokensOutAttributes`](../modules.md#exitexacttokensoutattributes)

Build pool exit transaction data for a known amount of tokens out

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | [`Pool`](../interfaces/Pool.md) | Pool data |
| `exiter` | `string` | Address of a user that will exit the pool |
| `tokensOut` | `string`[] | List of tokens to exit the pool to |
| `amountsOut` | `string`[] | List of amounts to exit the pool to |
| `slippage` | `string` | Tollerable slippage in bps |

#### Returns

[`ExitExactTokensOutAttributes`](../modules.md#exitexacttokensoutattributes)

Exit transaction data

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:324](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L324)

___

### buildJoin

▸ **buildJoin**(`pool`, `joiner`, `tokensIn`, `amountsIn`, `slippage`): [`JoinPoolAttributes`](../modules.md#joinpoolattributes)

Builds join transaction data

```js
const balancer = new BalancerSDK(sdkConfig);
const pool = await balancer.pools.find(poolId);
const { to, functionName, attributes, data } = pool.buildJoin(params);
const tx = await signer.sendTransaction({ to, data });
```

[Example](https://github.com/balancer-labs/balancer-sdk/blob/master/balancer-js/examples/join.ts)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | [`Pool`](../interfaces/Pool.md) | Pool data |
| `joiner` | `string` | Address of a user that will join the pool |
| `tokensIn` | `string`[] | List of tokens to join with |
| `amountsIn` | `string`[] | List of amounts to join with |
| `slippage` | `string` | Tollerable slippage in bps |

#### Returns

[`JoinPoolAttributes`](../modules.md#joinpoolattributes)

transaction data ready to be sent to the network along with min and expected BPT amounts out.

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:247](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L247)

___

### dataSource

▸ **dataSource**(): `Findable`<[`Pool`](../interfaces/Pool.md), [`PoolAttribute`](../modules.md#poolattribute), `any`\> & `Searchable`<[`Pool`](../interfaces/Pool.md)\>

#### Returns

`Findable`<[`Pool`](../interfaces/Pool.md), [`PoolAttribute`](../modules.md#poolattribute), `any`\> & `Searchable`<[`Pool`](../interfaces/Pool.md)\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:92](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L92)

___

### fees

▸ **fees**(`pool`): `Promise`<`number`\>

Calculates total fees for the pool in the last 24 hours

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](../interfaces/Pool.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:214](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L214)

___

### find

▸ **find**(`id`): `Promise`<`undefined` \| [`PoolWithMethods`](../interfaces/PoolWithMethods.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Promise`<`undefined` \| [`PoolWithMethods`](../interfaces/PoolWithMethods.md)\>

#### Implementation of

Findable.find

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:497](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L497)

___

### findBy

▸ **findBy**(`param`, `value`): `Promise`<`undefined` \| [`PoolWithMethods`](../interfaces/PoolWithMethods.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `param` | `string` |
| `value` | `string` |

#### Returns

`Promise`<`undefined` \| [`PoolWithMethods`](../interfaces/PoolWithMethods.md)\>

#### Implementation of

Findable.findBy

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:504](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L504)

___

### generalisedExit

▸ **generalisedExit**(`poolId`, `amount`, `userAddress`, `slippage`, `signer`, `simulationType`, `authorisation?`): `Promise`<{ `encodedCall`: `string` ; `expectedAmountsOut`: `string`[] ; `minAmountsOut`: `string`[] ; `priceImpact`: `string` ; `to`: `string` ; `tokensOut`: `string`[]  }\>

Builds generalised exit transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `poolId` | `string` | Pool id |
| `amount` | `string` | Token amount in EVM scale |
| `userAddress` | `string` | User address |
| `slippage` | `string` | Maximum slippage tolerance in bps i.e. 50 = 0.5%. |
| `signer` | `JsonRpcSigner` | JsonRpcSigner that will sign the staticCall transaction if Static simulation chosen |
| `simulationType` | [`SimulationType`](../enums/SimulationType.md) | Simulation type (VaultModel, Tenderly or Static) |
| `authorisation?` | `string` | Optional auhtorisation call to be added to the chained transaction |

#### Returns

`Promise`<{ `encodedCall`: `string` ; `expectedAmountsOut`: `string`[] ; `minAmountsOut`: `string`[] ; `priceImpact`: `string` ; `to`: `string` ; `tokensOut`: `string`[]  }\>

transaction data ready to be sent to the network along with tokens, min and expected amounts out.

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:181](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L181)

___

### generalisedJoin

▸ **generalisedJoin**(`poolId`, `tokens`, `amounts`, `userAddress`, `slippage`, `signer`, `simulationType`, `authorisation?`): `Promise`<{ `encodedCall`: `string` ; `expectedOut`: `string` ; `minOut`: `string` ; `priceImpact`: `string` ; `to`: `string`  }\>

Builds generalised join transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `poolId` | `string` | Pool id |
| `tokens` | `string`[] | Token addresses |
| `amounts` | `string`[] | Token amounts in EVM scale |
| `userAddress` | `string` | User address |
| `slippage` | `string` | Maximum slippage tolerance in bps i.e. 50 = 0.5%. |
| `signer` | `JsonRpcSigner` | JsonRpcSigner that will sign the staticCall transaction if Static simulation chosen |
| `simulationType` | [`SimulationType`](../enums/SimulationType.md) | Simulation type (VaultModel, Tenderly or Static) |
| `authorisation?` | `string` | Optional auhtorisation call to be added to the chained transaction |

#### Returns

`Promise`<{ `encodedCall`: `string` ; `expectedOut`: `string` ; `minOut`: `string` ; `priceImpact`: `string` ; `to`: `string`  }\>

transaction data ready to be sent to the network along with min and expected BPT amounts out.

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:141](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L141)

___

### impermanentLoss

▸ **impermanentLoss**(`timestamp`, `pool`): `Promise`<`number`\>

Calculates Impermanent Loss on any pool data

#### Parameters

| Name | Type |
| :------ | :------ |
| `timestamp` | `number` |
| `pool` | [`Pool`](../interfaces/Pool.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:114](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L114)

___

### liquidity

▸ **liquidity**(`pool`): `Promise`<`string`\>

Calculates total liquidity of the pool

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](../interfaces/Pool.md) |

#### Returns

`Promise`<`string`\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:124](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L124)

___

### volume

▸ **volume**(`pool`): `Promise`<`number`\>

Calculates total volume of the pool in the last 24 hours

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](../interfaces/Pool.md) |

#### Returns

`Promise`<`number`\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:224](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L224)

___

### where

▸ **where**(`filter`): `Promise`<[`PoolWithMethods`](../interfaces/PoolWithMethods.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`pool`: [`Pool`](../interfaces/Pool.md)) => `boolean` |

#### Returns

`Promise`<[`PoolWithMethods`](../interfaces/PoolWithMethods.md)[]\>

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:529](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L529)

___

### wrap

▸ `Static` **wrap**(`pool`, `networkConfig`): [`PoolWithMethods`](../interfaces/PoolWithMethods.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pool` | [`Pool`](../interfaces/Pool.md) |
| `networkConfig` | [`BalancerNetworkConfig`](../modules.md#balancernetworkconfig) |

#### Returns

[`PoolWithMethods`](../interfaces/PoolWithMethods.md)

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/index.ts:345](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/index.ts#L345)
