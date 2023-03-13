# Interface: PoolWithMethods

Pool use-cases / controller layer

## Hierarchy

- [`Pool`](Pool.md)

- `ParamsBuilder`

  ↳ **`PoolWithMethods`**

## Properties

### address

• **address**: `string`

#### Inherited from

[Pool](Pool.md).[address](Pool.md#address)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:308](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L308)

___

### amp

• `Optional` **amp**: `string`

#### Inherited from

[Pool](Pool.md).[amp](Pool.md#amp)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:335](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L335)

___

### apr

• `Optional` **apr**: `AprBreakdown`

#### Inherited from

[Pool](Pool.md).[apr](Pool.md#apr)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:338](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L338)

___

### boost

• `Optional` **boost**: `string`

#### Inherited from

[Pool](Pool.md).[boost](Pool.md#boost)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:332](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L332)

___

### bptIndex

• **bptIndex**: `number`

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:387](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L387)

___

### chainId

• **chainId**: `number`

#### Inherited from

[Pool](Pool.md).[chainId](Pool.md#chainid)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:309](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L309)

___

### createTime

• `Optional` **createTime**: `number`

#### Inherited from

[Pool](Pool.md).[createTime](Pool.md#createtime)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:325](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L325)

___

### factory

• `Optional` **factory**: `string`

#### Inherited from

[Pool](Pool.md).[factory](Pool.md#factory)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:316](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L316)

___

### feesSnapshot

• `Optional` **feesSnapshot**: `string`

#### Inherited from

[Pool](Pool.md).[feesSnapshot](Pool.md#feessnapshot)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:331](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L331)

___

### id

• **id**: `string`

Pool ID

#### Inherited from

[Pool](Pool.md).[id](Pool.md#id)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:305](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L305)

___

### isNew

• `Optional` **isNew**: `boolean`

#### Inherited from

[Pool](Pool.md).[isNew](Pool.md#isnew)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:329](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L329)

___

### liquidity

• `Optional` **liquidity**: `string`

#### Inherited from

[Pool](Pool.md).[liquidity](Pool.md#liquidity)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:339](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L339)

___

### lowerTarget

• **lowerTarget**: `string`

#### Inherited from

[Pool](Pool.md).[lowerTarget](Pool.md#lowertarget)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:341](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L341)

___

### mainIndex

• `Optional` **mainIndex**: `number`

#### Inherited from

[Pool](Pool.md).[mainIndex](Pool.md#mainindex)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:337](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L337)

___

### mainTokens

• `Optional` **mainTokens**: `string`[]

#### Inherited from

[Pool](Pool.md).[mainTokens](Pool.md#maintokens)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:326](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L326)

___

### name

• **name**: `string`

Pool Name

#### Inherited from

[Pool](Pool.md).[name](Pool.md#name)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:307](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L307)

___

### onchain

• `Optional` **onchain**: `OnchainPoolData`

#### Inherited from

[Pool](Pool.md).[onchain](Pool.md#onchain)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:324](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L324)

___

### owner

• `Optional` **owner**: `string`

#### Inherited from

[Pool](Pool.md).[owner](Pool.md#owner)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:315](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L315)

___

### poolType

• **poolType**: [`PoolType`](../enums/PoolType.md)

#### Inherited from

[Pool](Pool.md).[poolType](Pool.md#pooltype)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:310](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L310)

___

### poolTypeVersion

• **poolTypeVersion**: `number`

#### Inherited from

[Pool](Pool.md).[poolTypeVersion](Pool.md#pooltypeversion)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:311](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L311)

___

### priceRateProviders

• `Optional` **priceRateProviders**: `PriceRateProvider`[]

#### Inherited from

[Pool](Pool.md).[priceRateProviders](Pool.md#pricerateproviders)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:343](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L343)

___

### protocolSwapFeeCache

• **protocolSwapFeeCache**: `string`

#### Inherited from

[Pool](Pool.md).[protocolSwapFeeCache](Pool.md#protocolswapfeecache)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:314](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L314)

___

### protocolYieldFeeCache

• **protocolYieldFeeCache**: `string`

#### Inherited from

[Pool](Pool.md).[protocolYieldFeeCache](Pool.md#protocolyieldfeecache)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:313](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L313)

___

### swapEnabled

• **swapEnabled**: `boolean`

#### Inherited from

[Pool](Pool.md).[swapEnabled](Pool.md#swapenabled)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:334](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L334)

___

### swapFee

• **swapFee**: `string`

#### Inherited from

[Pool](Pool.md).[swapFee](Pool.md#swapfee)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:312](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L312)

___

### symbol

• `Optional` **symbol**: `string`

#### Inherited from

[Pool](Pool.md).[symbol](Pool.md#symbol)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:333](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L333)

___

### tokenAddresses

• `Optional` **tokenAddresses**: `string`[]

#### Inherited from

[Pool](Pool.md).[tokenAddresses](Pool.md#tokenaddresses)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:319](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L319)

___

### tokens

• **tokens**: `PoolToken`[]

#### Inherited from

[Pool](Pool.md).[tokens](Pool.md#tokens)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:317](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L317)

___

### tokensList

• **tokensList**: `string`[]

#### Inherited from

[Pool](Pool.md).[tokensList](Pool.md#tokenslist)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:318](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L318)

___

### totalLiquidity

• **totalLiquidity**: `string`

#### Inherited from

[Pool](Pool.md).[totalLiquidity](Pool.md#totalliquidity)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:320](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L320)

___

### totalShares

• **totalShares**: `string`

#### Inherited from

[Pool](Pool.md).[totalShares](Pool.md#totalshares)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:321](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L321)

___

### totalSwapFee

• `Optional` **totalSwapFee**: `string`

#### Inherited from

[Pool](Pool.md).[totalSwapFee](Pool.md#totalswapfee)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:322](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L322)

___

### totalSwapVolume

• `Optional` **totalSwapVolume**: `string`

#### Inherited from

[Pool](Pool.md).[totalSwapVolume](Pool.md#totalswapvolume)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:323](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L323)

___

### totalWeight

• **totalWeight**: `string`

#### Inherited from

[Pool](Pool.md).[totalWeight](Pool.md#totalweight)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:340](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L340)

___

### unwrappedTokens

• `Optional` **unwrappedTokens**: `string`[]

#### Inherited from

[Pool](Pool.md).[unwrappedTokens](Pool.md#unwrappedtokens)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:328](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L328)

___

### upperTarget

• **upperTarget**: `string`

#### Inherited from

[Pool](Pool.md).[upperTarget](Pool.md#uppertarget)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:342](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L342)

___

### volumeSnapshot

• `Optional` **volumeSnapshot**: `string`

#### Inherited from

[Pool](Pool.md).[volumeSnapshot](Pool.md#volumesnapshot)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:330](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L330)

___

### wrappedIndex

• `Optional` **wrappedIndex**: `number`

#### Inherited from

[Pool](Pool.md).[wrappedIndex](Pool.md#wrappedindex)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:336](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L336)

___

### wrappedTokens

• `Optional` **wrappedTokens**: `string`[]

#### Inherited from

[Pool](Pool.md).[wrappedTokens](Pool.md#wrappedtokens)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:327](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L327)

## Methods

### buildExitExactBPTIn

▸ **buildExitExactBPTIn**(`exiter`, `bptIn`, `slippage`, `shouldUnwrapNativeAsset?`, `singleTokenMaxOut?`): [`ExitExactBPTInAttributes`](../modules.md#exitexactbptinattributes)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exiter` | `string` | Address of the account exiting the pool |
| `bptIn` | `string` | Amount of BPT exiting the pool as a wad string |
| `slippage` | `string` | Maximum slippage tolerance in percentage. i.e. 0.05 = 5% |
| `shouldUnwrapNativeAsset?` | `boolean` | When true wETH is unwrapped in the same transaction, default false |
| `singleTokenMaxOut?` | `string` | Token address, When provided will exit all liquidity to this single token |

#### Returns

[`ExitExactBPTInAttributes`](../modules.md#exitexactbptinattributes)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:368](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L368)

___

### buildExitExactTokensOut

▸ **buildExitExactTokensOut**(`exiter`, `tokensOut`, `amountsOut`, `slippage`): [`ExitExactTokensOutAttributes`](../modules.md#exitexacttokensoutattributes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `exiter` | `string` |
| `tokensOut` | `string`[] |
| `amountsOut` | `string`[] |
| `slippage` | `string` |

#### Returns

[`ExitExactTokensOutAttributes`](../modules.md#exitexacttokensoutattributes)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:380](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L380)

___

### buildJoin

▸ **buildJoin**(`joiner`, `tokensIn`, `amountsIn`, `slippage`): [`JoinPoolAttributes`](../modules.md#joinpoolattributes)

#### Parameters

| Name | Type |
| :------ | :------ |
| `joiner` | `string` |
| `tokensIn` | `string`[] |
| `amountsIn` | `string`[] |
| `slippage` | `string` |

#### Returns

[`JoinPoolAttributes`](../modules.md#joinpoolattributes)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:357](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L357)

___

### buildQueryExitExactOut

▸ **buildQueryExitExactOut**(`params`): `queryExitParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `ExitExactOutParams` |

#### Returns

`queryExitParams`

#### Inherited from

Queries.ParamsBuilder.buildQueryExitExactOut

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/queries/types.ts:31](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/queries/types.ts#L31)

___

### buildQueryExitProportionally

▸ **buildQueryExitProportionally**(`params`): `queryExitParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `ExitProportionallyParams` |

#### Returns

`queryExitParams`

#### Inherited from

Queries.ParamsBuilder.buildQueryExitProportionally

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/queries/types.ts:28](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/queries/types.ts#L28)

___

### buildQueryExitToSingleToken

▸ **buildQueryExitToSingleToken**(`params`): `queryExitParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `ExitToSingleTokenParams` |

#### Returns

`queryExitParams`

#### Inherited from

Queries.ParamsBuilder.buildQueryExitToSingleToken

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/queries/types.ts:27](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/queries/types.ts#L27)

___

### buildQueryJoinExactIn

▸ **buildQueryJoinExactIn**(`params`): `queryJoinParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `JoinExactInParams` |

#### Returns

`queryJoinParams`

#### Inherited from

Queries.ParamsBuilder.buildQueryJoinExactIn

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/queries/types.ts:25](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/queries/types.ts#L25)

___

### buildQueryJoinExactOut

▸ **buildQueryJoinExactOut**(`params`): `queryJoinParams`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `JoinExactOutParams` |

#### Returns

`queryJoinParams`

#### Inherited from

Queries.ParamsBuilder.buildQueryJoinExactOut

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/queries/types.ts:26](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/queries/types.ts#L26)

___

### calcPriceImpact

▸ **calcPriceImpact**(`amountsIn`, `minBPTOut`, `isJoin`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amountsIn` | `string`[] |
| `minBPTOut` | `string` |
| `isJoin` | `boolean` |

#### Returns

`Promise`<`string`\>

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:363](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L363)

___

### calcSpotPrice

▸ **calcSpotPrice**(`tokenIn`, `tokenOut`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenIn` | `string` |
| `tokenOut` | `string` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:386](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L386)
