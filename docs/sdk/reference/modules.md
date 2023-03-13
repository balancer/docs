# @balancer-labs/sdk

## Namespaces

- [balEmissions](modules/balEmissions.md)

## Enumerations

- [BalancerErrorCode](enums/BalancerErrorCode.md)
- [ComposableStablePoolExitKind](enums/ComposableStablePoolExitKind.md)
- [ComposableStablePoolJoinKind](enums/ComposableStablePoolJoinKind.md)
- [GaugeShareAttributes](enums/GaugeShareAttributes.md)
- [Network](enums/Network.md)
- [PoolBalanceOpKind](enums/PoolBalanceOpKind.md)
- [PoolFilter](enums/PoolFilter.md)
- [PoolGaugesAttributes](enums/PoolGaugesAttributes.md)
- [PoolJoinExitAttributes](enums/PoolJoinExitAttributes.md)
- [PoolShareAttributes](enums/PoolShareAttributes.md)
- [PoolSpecialization](enums/PoolSpecialization.md)
- [PoolType](enums/PoolType.md)
- [RelayerAction](enums/RelayerAction.md)
- [SimulationType](enums/SimulationType.md)
- [StablePhantomPoolJoinKind](enums/StablePhantomPoolJoinKind.md)
- [StablePoolExitKind](enums/StablePoolExitKind.md)
- [StablePoolJoinKind](enums/StablePoolJoinKind.md)
- [SwapType](enums/SwapType.md)
- [SwapTypes](enums/SwapTypes.md)
- [UserBalanceOpKind](enums/UserBalanceOpKind.md)
- [WeightedPoolExitKind](enums/WeightedPoolExitKind.md)
- [WeightedPoolJoinKind](enums/WeightedPoolJoinKind.md)

## Data Classes

- [Data](classes/Data.md)
- [Subgraph](classes/Subgraph.md)

## Other Classes

- [BalancerSDK](classes/BalancerSDK.md)
- [Pools](classes/Pools.md)
- [Relayer](classes/Relayer.md)

## Swaps Classes

- [Sor](classes/Sor.md)
- [Swaps](classes/Swaps.md)

## Interfaces

- [Pool](interfaces/Pool.md)
- [PoolWithMethods](interfaces/PoolWithMethods.md)

## Helpers Functions

- [getPoolAddress](modules.md#getpooladdress)
- [getPoolNonce](modules.md#getpoolnonce)
- [getPoolSpecialization](modules.md#getpoolspecialization)
- [splitPoolId](modules.md#splitpoolid)

## Other Functions

- [POOLS](modules.md#pools)
- [accountToAddress](modules.md#accounttoaddress)
- [addressMapIn](modules.md#addressmapin)
- [bn](modules.md#bn)
- [buildRelayerCalls](modules.md#buildrelayercalls)
- [canUseJoinExit](modules.md#canusejoinexit)
- [formatFixed](modules.md#formatfixed)
- [formatFromBigInt18](modules.md#formatfrombigint18)
- [formatSequence](modules.md#formatsequence)
- [getEthValue](modules.md#getethvalue)
- [getLimitsForSlippage](modules.md#getlimitsforslippage)
- [getTokenAddressesForSwap](modules.md#gettokenaddressesforswap)
- [insert](modules.md#insert)
- [isLinearish](modules.md#islinearish)
- [isNormalizedWeights](modules.md#isnormalizedweights)
- [isSameAddress](modules.md#issameaddress)
- [parseFixed](modules.md#parsefixed)
- [parsePoolInfo](modules.md#parsepoolinfo)
- [parseToBigInt18](modules.md#parsetobigint18)
- [parseToPoolsDict](modules.md#parsetopoolsdict)
- [phantomStableBPTForTokensZeroPriceImpact](modules.md#phantomstablebptfortokenszeropriceimpact)
- [queryBatchSwapTokensIn](modules.md#querybatchswaptokensin)
- [queryBatchSwapTokensOut](modules.md#querybatchswaptokensout)
- [removeItem](modules.md#removeitem)
- [reorderArrays](modules.md#reorderarrays)
- [replace](modules.md#replace)
- [signPermit](modules.md#signpermit)
- [someJoinExit](modules.md#somejoinexit)
- [stableBPTForTokensZeroPriceImpact](modules.md#stablebptfortokenszeropriceimpact)
- [toNormalizedWeights](modules.md#tonormalizedweights)
- [tokenAddressForPricing](modules.md#tokenaddressforpricing)
- [tokensToTokenPrices](modules.md#tokenstotokenprices)
- [truncateAddresses](modules.md#truncateaddresses)
- [unwrapToken](modules.md#unwraptoken)
- [weightedBPTForTokensZeroPriceImpact](modules.md#weightedbptfortokenszeropriceimpact)

## Type Aliases

### Account

Ƭ **Account**: `string` \| `Signer` \| `Contract`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/signatures.ts:7](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/signatures.ts#L7)

___

### Address

Ƭ **Address**: `string`

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:33](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L33)

___

### BalancerNetworkConfig

Ƭ **BalancerNetworkConfig**: `Object`

A Balancer network configuration

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `addresses` | { `contracts`: [`ContractAddresses`](modules.md#contractaddresses) ; `tokens`: { `bal?`: `string` ; `bbaUsd?`: `string` ; `lbpRaisingTokens?`: `string`[] ; `stETH?`: `string` ; `veBal?`: `string` ; `wrappedNativeAsset`: `string` ; `wstETH?`: `string`  }  } | - |
| `addresses.contracts` | [`ContractAddresses`](modules.md#contractaddresses) | - |
| `addresses.tokens` | { `bal?`: `string` ; `bbaUsd?`: `string` ; `lbpRaisingTokens?`: `string`[] ; `stETH?`: `string` ; `veBal?`: `string` ; `wrappedNativeAsset`: `string` ; `wstETH?`: `string`  } | - |
| `addresses.tokens.bal?` | `string` | - |
| `addresses.tokens.bbaUsd?` | `string` | - |
| `addresses.tokens.lbpRaisingTokens?` | `string`[] | - |
| `addresses.tokens.stETH?` | `string` | - |
| `addresses.tokens.veBal?` | `string` | - |
| `addresses.tokens.wrappedNativeAsset` | `string` | - |
| `addresses.tokens.wstETH?` | `string` | - |
| `chainId` | [`Network`](enums/Network.md) | The chain ID of the network |
| `pools` | { `wETHwstETH?`: [`PoolReference`](modules.md#poolreference)  } | - |
| `pools.wETHwstETH?` | [`PoolReference`](modules.md#poolreference) | - |
| `poolsToIgnore?` | `string`[] | - |
| `sorConnectingTokens?` | { `address`: `string` ; `symbol`: `string`  }[] | - |
| `tenderly?` | `BalancerTenderlyConfig` | - |
| `urls` | { `blockNumberSubgraph?`: `string` ; `gaugesSubgraph?`: `string` ; `subgraph`: `string`  } | - |
| `urls.blockNumberSubgraph?` | `string` | - |
| `urls.gaugesSubgraph?` | `string` | - |
| `urls.subgraph` | `string` | - |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:98](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L98)

___

### BalancerSDKRoot

Ƭ **BalancerSDKRoot**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `claimService?` | `IClaimService` |
| `config` | [`BalancerSdkConfig`](modules.md#balancersdkconfig) |
| `data` | [`Data`](classes/Data.md) |
| `networkConfig` | [`BalancerNetworkConfig`](modules.md#balancernetworkconfig) |
| `pools` | [`Pools`](classes/Pools.md) |
| `relayer` | [`Relayer`](classes/Relayer.md) |
| `rpcProvider` | `Provider` |
| `sor` | [`Sor`](classes/Sor.md) |
| `subgraph` | [`Subgraph`](classes/Subgraph.md) |
| `swaps` | [`Swaps`](classes/Swaps.md) |

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:16](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L16)

___

### BalancerSdkConfig

Ƭ **BalancerSdkConfig**: `Object`

Main configuration object for the Balancer SDK

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `customSubgraphUrl?` | `string` | overwrite the subgraph url if you don't want to use the balancer labs maintained version |
| `network` | [`Network`](enums/Network.md) \| [`BalancerNetworkConfig`](modules.md#balancernetworkconfig) | use a known network or provide an entirely custom config |
| `rpcUrl` | `string` | - |
| `sor?` | `Partial`<`BalancerSdkSorConfig`\> | optionally overwrite parts of the standard SOR config |
| `subgraphQuery?` | `GraphQLQuery` | ??? |
| `tenderly?` | `BalancerTenderlyConfig` | optionally overwrite parts of the standard Tenderly config |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:38](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L38)

___

### BatchSwap

Ƭ **BatchSwap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assets` | `string`[] |
| `deadline` | `BigNumberish` |
| `funds` | [`FundManagement`](modules.md#fundmanagement) |
| `kind` | [`SwapType`](enums/SwapType.md) |
| `limits` | `BigNumberish`[] |
| `outputReferences?` | { `index`: `BigNumberish` ; `key`: `BigNumberish`  }[] |
| `swaps` | [`BatchSwapStep`](modules.md#batchswapstep)[] |
| `value?` | `BigNumberish` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:43](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L43)

___

### BatchSwapStep

Ƭ **BatchSwapStep**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `assetInIndex` | `number` |
| `assetOutIndex` | `number` |
| `poolId` | `string` |
| `userData` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:35](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L35)

___

### ContractAddresses

Ƭ **ContractAddresses**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balancerHelpers` | `string` |
| `balancerMinterAddress?` | `string` |
| `composableStablePoolFactory?` | `string` |
| `feeDistributor?` | `string` |
| `gaugeClaimHelper?` | `string` |
| `gaugeController?` | `string` |
| `lidoRelayer?` | `string` |
| `multicall` | `string` |
| `protocolFeePercentagesProvider?` | `string` |
| `relayerV3?` | `string` |
| `relayerV4?` | `string` |
| `vault` | `string` |
| `veBal?` | `string` |
| `veBalProxy?` | `string` |
| `weightedPoolFactory?` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:77](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L77)

___

### Currency

Ƭ **Currency**: ``"eth"`` \| ``"usd"``

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:214](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L214)

___

### ExitConcern

Ƭ **ExitConcern**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buildExitExactBPTIn?` | (`{
    exiter,
    pool,
    bptIn,
    slippage,
    shouldUnwrapNativeAsset,
    wrappedNativeAsset,
    singleTokenMaxOut,
  }`: [`ExitExactBPTInParameters`](modules.md#exitexactbptinparameters)) => [`ExitExactBPTInAttributes`](modules.md#exitexactbptinattributes) |
| `buildExitExactTokensOut` | (`{
    exiter,
    pool,
    tokensOut,
    amountsOut,
    slippage,
    wrappedNativeAsset,
  }`: [`ExitExactTokensOutParameters`](modules.md#exitexacttokensoutparameters)) => [`ExitExactTokensOutAttributes`](modules.md#exitexacttokensoutattributes) |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:34](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L34)

___

### ExitExactBPTInAttributes

Ƭ **ExitExactBPTInAttributes**: [`ExitPoolAttributes`](modules.md#exitpoolattributes) & { `expectedAmountsOut`: `string`[] ; `minAmountsOut`: `string`[]  }

Exit exact BPT in transaction parameters

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:119](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L119)

___

### ExitExactBPTInParameters

Ƭ **ExitExactBPTInParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bptIn` | `string` |
| `exiter` | `string` |
| `pool` | [`Pool`](interfaces/Pool.md) |
| `shouldUnwrapNativeAsset` | `boolean` |
| `singleTokenMaxOut?` | `string` |
| `slippage` | `string` |
| `wrappedNativeAsset` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:139](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L139)

___

### ExitExactBPTInSingleTokenOutParameters

Ƭ **ExitExactBPTInSingleTokenOutParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bptIn` | `string` |
| `exiter` | `string` |
| `pool` | [`Pool`](interfaces/Pool.md) |
| `shouldUnwrapNativeAsset` | `boolean` |
| `singleTokenMaxOut` | `string` |
| `slippage` | `string` |
| `wrappedNativeAsset` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:149](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L149)

___

### ExitExactTokensOutAttributes

Ƭ **ExitExactTokensOutAttributes**: [`ExitPoolAttributes`](modules.md#exitpoolattributes) & { `expectedBPTIn`: `string` ; `maxBPTIn`: `string`  }

Exit exact tokens out transaction parameters

**`Param`**

Address that will execute the transaction (vault address)

**`Param`**

Function name to be called (exitPool)

**`Param`**

Transaction attributes ready to be encoded

**`Param`**

Encoded transaction data

**`Param`**

Expected BPT into exit transaction

**`Param`**

Max BPT into exit transaction considering slippage tolerance

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:134](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L134)

___

### ExitExactTokensOutParameters

Ƭ **ExitExactTokensOutParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amountsOut` | `string`[] |
| `exiter` | `string` |
| `pool` | [`Pool`](interfaces/Pool.md) |
| `slippage` | `string` |
| `tokensOut` | `string`[] |
| `wrappedNativeAsset` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:159](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L159)

___

### ExitPool

Ƭ **ExitPool**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `exitPoolRequest` | [`ExitPoolRequest`](modules.md#exitpoolrequest) |
| `poolId` | `string` |
| `recipient` | `string` |
| `sender` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:102](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L102)

___

### ExitPoolAttributes

Ƭ **ExitPoolAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | [`ExitPool`](modules.md#exitpool) |
| `data` | `string` |
| `functionName` | `string` |
| `to` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:109](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L109)

___

### ExitPoolData

Ƭ **ExitPoolData**: [`ExitPoolRequest`](modules.md#exitpoolrequest) & `EncodeExitPoolInput`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/types.ts:76](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/types.ts#L76)

___

### ExitPoolRequest

Ƭ **ExitPoolRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assets` | `string`[] |
| `minAmountsOut` | `string`[] |
| `toInternalBalance` | `boolean` |
| `userData` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:167](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L167)

___

### FetchPoolsInput

Ƭ **FetchPoolsInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fetchOnChain` | `boolean` |
| `fetchPools` | `boolean` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:54](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L54)

___

### FindRouteParameters

Ƭ **FindRouteParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `gasPrice` | `BigNumber` |
| `maxPools` | `number` |
| `tokenIn` | `string` |
| `tokenOut` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:100](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L100)

___

### FundManagement

Ƭ **FundManagement**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fromInternalBalance` | `boolean` |
| `recipient` | `string` |
| `sender` | `string` |
| `toInternalBalance` | `boolean` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:10](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L10)

___

### GraphQLFilter

Ƭ **GraphQLFilter**: { [operator in GraphQLFilterOperator]?: any }

#### Defined in

[balancer-sdk/balancer-js/src/lib/graphql/types.ts:9](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/graphql/types.ts#L9)

___

### GraphQLFilterOperator

Ƭ **GraphQLFilterOperator**: ``"gt"`` \| ``"lt"`` \| ``"eq"`` \| ``"in"`` \| ``"not_in"`` \| ``"contains"``

#### Defined in

[balancer-sdk/balancer-js/src/lib/graphql/types.ts:1](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/graphql/types.ts#L1)

___

### HistoricalPrices

Ƭ **HistoricalPrices**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `market_caps` | [[`number`, `number`]] |
| `prices` | [[`number`, `number`]] |
| `total_volumes` | [[`number`, `number`]] |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:218](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L218)

___

### JoinConcern

Ƭ **JoinConcern**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `buildJoin` | (`{
    joiner,
    pool,
    tokensIn,
    amountsIn,
    slippage,
    wrappedNativeAsset,
  }`: [`JoinPoolParameters`](modules.md#joinpoolparameters)) => [`JoinPoolAttributes`](modules.md#joinpoolattributes) |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:23](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L23)

___

### JoinPool

Ƭ **JoinPool**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `joinPoolRequest` | [`JoinPoolRequest`](modules.md#joinpoolrequest) |
| `poolId` | `string` |
| `recipient` | `string` |
| `sender` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:76](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L76)

___

### JoinPoolAttributes

Ƭ **JoinPoolAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | [`JoinPool`](modules.md#joinpool) |
| `data` | `string` |
| `expectedBPTOut` | `string` |
| `functionName` | `string` |
| `minBPTOut` | `string` |
| `to` | `string` |
| `value?` | `BigNumber` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:83](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L83)

___

### JoinPoolData

Ƭ **JoinPoolData**: [`JoinPoolRequest`](modules.md#joinpoolrequest) & `EncodeJoinPoolInput`

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/types.ts:77](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/types.ts#L77)

___

### JoinPoolParameters

Ƭ **JoinPoolParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amountsIn` | `string`[] |
| `joiner` | `string` |
| `pool` | [`Pool`](interfaces/Pool.md) |
| `slippage` | `string` |
| `tokensIn` | `string`[] |
| `wrappedNativeAsset` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:93](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L93)

___

### JoinPoolRequest

Ƭ **JoinPoolRequest**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assets` | `string`[] |
| `fromInternalBalance` | `boolean` |
| `maxAmountsIn` | `BigNumberish`[] |
| `userData` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:158](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L158)

___

### LiquidityConcern

Ƭ **LiquidityConcern**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `calcTotal` | (...`args`: `any`[]) => `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:5](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L5)

___

### NamedPools

Ƭ **NamedPools**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bbAaveUSD` | { `v1`: `string` ; `v2`: `string`  } |
| `bbAaveUSD.v1` | `string` |
| `bbAaveUSD.v2` | `string` |
| `mai4` | { `mai4`: `string` ; `maiBbaUsd`: `string`  } |
| `mai4.mai4` | `string` |
| `mai4.maiBbaUsd` | `string` |
| `stMatic` | { `v1`: `string` ; `v2`: `string`  } |
| `stMatic.v1` | `string` |
| `stMatic.v2` | `string` |
| `staBAL` | `string` |
| `veBAL` | `string` |
| `xMatic` | { `v1`: `string` ; `v2`: `string`  } |
| `xMatic.v1` | `string` |
| `xMatic.v2` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/lib/constants/pools.ts:30](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/constants/pools.ts#L30)

___

### OutputReference

Ƭ **OutputReference**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `key` | `BigNumber` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/relayer/types.ts:11](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/relayer/types.ts#L11)

___

### PoolAttribute

Ƭ **PoolAttribute**: ``"id"`` \| ``"address"``

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/pool/types.ts:1](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/pool/types.ts#L1)

___

### PoolBalanceOp

Ƭ **PoolBalanceOp**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumberish` |
| `kind` | [`PoolBalanceOpKind`](enums/PoolBalanceOpKind.md) |
| `poolId` | `string` |
| `token` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:197](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L197)

___

### PoolReference

Ƭ **PoolReference**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `id` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:145](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L145)

___

### Price

Ƭ **Price**: { [currency in Currency]?: string }

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:216](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L216)

___

### PriceImpactConcern

Ƭ **PriceImpactConcern**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bptZeroPriceImpact` | (`pool`: [`Pool`](interfaces/Pool.md), `tokenAmounts`: `bigint`[]) => `bigint` |
| `calcPriceImpact` | (`pool`: [`Pool`](interfaces/Pool.md), `tokenAmounts`: `string`[], `bptAmount`: `string`, `isJoin`: `boolean`) => `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:13](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L13)

___

### QuerySimpleFlashSwapParameters

Ƭ **QuerySimpleFlashSwapParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assets` | [`BatchSwap`](modules.md#batchswap)[``"assets"``] |
| `flashLoanAmount` | `string` |
| `poolIds` | `string`[] |
| `vaultContract` | `Vault` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:81](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L81)

___

### QuerySimpleFlashSwapResponse

Ƭ **QuerySimpleFlashSwapResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isProfitable` | `boolean` |
| `profits` | `Record`<`string`, `string`\> |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:95](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L95)

___

### QueryWithSorInput

Ƭ **QueryWithSorInput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amounts` | `string`[] |
| `fetchPools` | [`FetchPoolsInput`](modules.md#fetchpoolsinput) |
| `swapType` | [`SwapType`](enums/SwapType.md) |
| `tokensIn` | `string`[] |
| `tokensOut` | `string`[] |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:59](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L59)

___

### QueryWithSorOutput

Ƭ **QueryWithSorOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assets` | `string`[] |
| `deltas` | `string`[] |
| `returnAmounts` | `string`[] |
| `swaps` | [`BatchSwapStep`](modules.md#batchswapstep)[] |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:74](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L74)

___

### SimpleFlashSwapParameters

Ƭ **SimpleFlashSwapParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assets` | [`BatchSwap`](modules.md#batchswap)[``"assets"``] |
| `flashLoanAmount` | `string` |
| `poolIds` | `string`[] |
| `walletAddress` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:88](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L88)

___

### SingleSwap

Ƭ **SingleSwap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumberish` |
| `assetIn` | `string` |
| `assetOut` | `string` |
| `kind` | [`SwapType`](enums/SwapType.md) |
| `poolId` | `string` |
| `userData` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:17](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L17)

___

### SpotPriceConcern

Ƭ **SpotPriceConcern**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `calcPoolSpotPrice` | (`tokenIn`: `string`, `tokenOut`: `string`, `pool`: [`Pool`](interfaces/Pool.md)) => `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/pools/pool-types/concerns/types.ts:9](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/pools/pool-types/concerns/types.ts#L9)

___

### Swap

Ƭ **Swap**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `deadline` | `BigNumberish` |
| `funds` | [`FundManagement`](modules.md#fundmanagement) |
| `limit` | `BigNumberish` |
| `outputReference?` | `BigNumberish` |
| `request` | [`SingleSwap`](modules.md#singleswap) |
| `value?` | `BigNumberish` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/types.ts:26](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/types.ts#L26)

___

### TokenAttribute

Ƭ **TokenAttribute**: ``"address"`` \| ``"symbol"``

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/token/types.ts:3](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/token/types.ts#L3)

___

### TokenPrices

Ƭ **TokenPrices**: `Object`

#### Index signature

▪ [address: `string`]: [`Price`](modules.md#price)

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:217](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L217)

___

### UserBalanceOp

Ƭ **UserBalanceOp**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumberish` |
| `asset` | `string` |
| `kind` | [`UserBalanceOpKind`](enums/UserBalanceOpKind.md) |
| `recipient` | `string` |
| `sender` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/types.ts:183](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/types.ts#L183)

## Variables

### SHALLOW\_COMPOSABLE\_STABLE\_BUFFER

• `Const` **SHALLOW\_COMPOSABLE\_STABLE\_BUFFER**: ``1000000``

For proportional exits from ComposableStable pools the ExactBPTInForTokensOut
exit type was removed. Therefore we have to use BPTInForExactTokensOut which
makes proportional exits using a user's total BPT balance impossible. In
order to 'fix' this we need to subtract a little bit from the bptIn value
when calculating the ExactTokensOut. The variable below is that "little bit".

#### Defined in

[balancer-sdk/balancer-js/src/lib/constants/pools.ts:14](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/constants/pools.ts#L14)

## Helpers Functions

### getPoolAddress

▸ **getPoolAddress**(`poolId`): `string`

Extracts a pool's address from its poolId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `poolId` | `string` | a bytes32 string of the pool's ID |

#### Returns

`string`

the pool's address

#### Defined in

[balancer-sdk/balancer-js/src/pool-utils/poolId.ts:31](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/pool-utils/poolId.ts#L31)

___

### getPoolNonce

▸ **getPoolNonce**(`poolId`): `BigNumber`

Extracts a pool's nonce from its poolId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `poolId` | `string` | a bytes32 string of the pool's ID |

#### Returns

`BigNumber`

the pool's nonce

#### Defined in

[balancer-sdk/balancer-js/src/pool-utils/poolId.ts:58](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/pool-utils/poolId.ts#L58)

___

### getPoolSpecialization

▸ **getPoolSpecialization**(`poolId`): [`PoolSpecialization`](enums/PoolSpecialization.md)

Extracts a pool's specialization from its poolId

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `poolId` | `string` | a bytes32 string of the pool's ID |

#### Returns

[`PoolSpecialization`](enums/PoolSpecialization.md)

the pool's specialization

#### Defined in

[balancer-sdk/balancer-js/src/pool-utils/poolId.ts:42](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/pool-utils/poolId.ts#L42)

___

### splitPoolId

▸ **splitPoolId**(`poolId`): `Object`

Splits a poolId into its components, i.e. pool address, pool specialization and its nonce

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `poolId` | `string` | a bytes32 string of the pool's ID |

#### Returns

`Object`

an object with the decomposed poolId

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `nonce` | `BigNumber` |
| `specialization` | [`PoolSpecialization`](enums/PoolSpecialization.md) |

#### Defined in

[balancer-sdk/balancer-js/src/pool-utils/poolId.ts:11](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/pool-utils/poolId.ts#L11)

___

## Other Functions

### POOLS

▸ **POOLS**(`networkId`): `Pools`

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkId` | [`Network`](enums/Network.md) |

#### Returns

`Pools`

#### Defined in

[balancer-sdk/balancer-js/src/lib/constants/pools.ts:688](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/constants/pools.ts#L688)

___

### accountToAddress

▸ **accountToAddress**(`account`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | [`Account`](modules.md#account) |

#### Returns

`Promise`<`string`\>

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/signatures.ts:9](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/signatures.ts#L9)

___

### addressMapIn

▸ **addressMapIn**(`address`, `chainId`): `string`

Maps testnet tokens, eg: on Göreli to a mainnet one.
Used to get the pricing information on networks not supported by a price feed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | Address on a testnet network |
| `chainId` | [`Network`](enums/Network.md) | - |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/tokens.ts:35](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/tokens.ts#L35)

___

### bn

▸ **bn**(`value`): `BigNumber`

Like parseEther but for numbers. Converts floating point to BigNumber using 18 decimals

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`BigNumber`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/math.ts:35](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/math.ts#L35)

___

### buildRelayerCalls

▸ **buildRelayerCalls**(`swapInfo`, `pools`, `user`, `relayerAddress`, `wrappedNativeAsset`, `slippage`, `authorisation`): `Object`

Given swapInfo from the SOR construct the Relayer multicall to execture swaps/joins/exits.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `swapInfo` | `SwapInfo` | Returned from SOR |
| `pools` | `SubgraphPoolBase`[] | Pool info from SOR |
| `user` | `string` | Address of user |
| `relayerAddress` | `string` | Address of Relayer (>=V4) |
| `wrappedNativeAsset` | `string` | Address of Native asset |
| `slippage` | `string` | [bps], eg: 1 === 0.01%, 100 === 1% |
| `authorisation` | `undefined` \| `string` | Encoded authorisation call. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `inputs` | (`EncodeBatchSwapInput` \| [`ExitPoolData`](modules.md#exitpooldata) \| `EncodeJoinPoolInput`)[] |
| `rawCalls` | `string`[] |
| `to` | `string` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/joinAndExit.ts:972](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/joinAndExit.ts#L972)

___

### canUseJoinExit

▸ **canUseJoinExit**(`swapType`, `tokenIn`, `tokenOut`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `swapType` | [`SwapTypes`](enums/SwapTypes.md) |
| `tokenIn` | `string` |
| `tokenOut` | `string` |

#### Returns

`boolean`

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/joinAndExit.ts:129](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/joinAndExit.ts#L129)

___

### formatFixed

▸ **formatFixed**(`value`, `decimals`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `BigNumber` |
| `decimals` | `BigNumberish` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/math.ts:19](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/math.ts#L19)

___

### formatFromBigInt18

▸ **formatFromBigInt18**(`value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `bigint` |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/math.ts:28](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/math.ts#L28)

___

### formatSequence

▸ **formatSequence**(`swapKind`, `sequence`, `tokenAddresses`): `SwapV2`[]

Formats a sequence of swaps to the format expected by the Balance Vault.

**`Dev`**

Intermediate swaps' amounts are replaced with the sentinel value of zero
     and exact output sequences are reversed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `swapKind` | [`SwapTypes`](enums/SwapTypes.md) | a SwapTypes enum for whether the swap has an exact input or exact output |
| `sequence` | `Swap`[] | a sequence of swaps which form a path from the input token to the output token |
| `tokenAddresses` | `string`[] | an array of all the token address which are involved in the batchSwap |

#### Returns

`SwapV2`[]

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:364

___

### getEthValue

▸ **getEthValue**(`tokens`, `amounts`): `undefined` \| `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | `string`[] |
| `amounts` | `string`[] |

#### Returns

`undefined` \| `BigNumber`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/tokens.ts:72](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/tokens.ts#L72)

___

### getLimitsForSlippage

▸ **getLimitsForSlippage**(`tokensIn`, `tokensOut`, `swapType`, `deltas`, `assets`, `slippage`): `BigNumberish`[]

Helper to create limits using a defined slippage amount.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tokensIn` | `string`[] | Array of token in addresses. |
| `tokensOut` | `string`[] | Array of token out addresses. |
| `swapType` | [`SwapType`](enums/SwapType.md) | Type of swap - SwapExactIn or SwapExactOut |
| `deltas` | `BigNumberish`[] | An array with the net Vault asset balance deltas. Positive amounts represent tokens (or ETH) sent to the Vault, and negative amounts represent tokens (or ETH) sent by the Vault. Each delta corresponds to the asset at the same index in the `assets` array. |
| `assets` | `string`[] | array contains the addresses of all assets involved in the swaps. |
| `slippage` | `BigNumberish` | Slippage to be applied. i.e. 5%=50000000000000000. |

#### Returns

`BigNumberish`[]

Returns an array (same length as assets) with limits applied for each asset.

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/helpers.ts:17](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/helpers.ts#L17)

___

### getTokenAddressesForSwap

▸ **getTokenAddressesForSwap**(`swaps`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `swaps` | `Swap`[] |

#### Returns

`string`[]

an array of deduplicated token addresses used in the provided swaps

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:354

___

### insert

▸ **insert**<`T`\>(`arr`, `index`, `newItem`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `index` | `number` |
| `newItem` | `T` |

#### Returns

`T`[]

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/index.ts:17](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/index.ts#L17)

___

### isLinearish

▸ **isLinearish**(`poolType`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `poolType` | `string` |

#### Returns

`boolean`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/index.ts:95](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/index.ts#L95)

___

### isNormalizedWeights

▸ **isNormalizedWeights**(`weights`): `boolean`

Check whether a set of weights are normalized

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `weights` | `BigNumberish`[] | an array of potentially unnormalized weights |

#### Returns

`boolean`

a boolean of whether the weights are normalized

#### Defined in

[balancer-sdk/balancer-js/src/pool-weighted/normalizedWeights.ts:42](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/pool-weighted/normalizedWeights.ts#L42)

___

### isSameAddress

▸ **isSameAddress**(`address1`, `address2`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address1` | `string` |
| `address2` | `string` |

#### Returns

`boolean`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/index.ts:14](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/index.ts#L14)

___

### parseFixed

▸ **parseFixed**(`value`, `decimals?`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `decimals?` | `BigNumberish` |

#### Returns

`BigNumber`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/math.ts:8](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/math.ts#L8)

___

### parsePoolInfo

▸ **parsePoolInfo**(`pool`, `wrappedNativeAsset?`, `unwrapNativeAsset?`): `ParsedPoolInfo`

Parse pool info into EVM amounts. Sorts by token order if wrappedNativeAsset param passed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pool` | [`Pool`](interfaces/Pool.md) |  |
| `wrappedNativeAsset?` | `string` |  |
| `unwrapNativeAsset?` | `boolean` | if true, changes wETH address to ETH address |

#### Returns

`ParsedPoolInfo`

parsed pool info

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/poolHelper.ts:40](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/poolHelper.ts#L40)

___

### parseToBigInt18

▸ **parseToBigInt18**(`value`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`bigint`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/math.ts:24](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/math.ts#L24)

___

### parseToPoolsDict

▸ **parseToPoolsDict**(`pools`, `timestamp`): `PoolDictionary`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pools` | `SubgraphPoolBase`[] |
| `timestamp` | `number` |

#### Returns

`PoolDictionary`

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:366

___

### phantomStableBPTForTokensZeroPriceImpact

▸ **phantomStableBPTForTokensZeroPriceImpact**(`allBalances`, `decimals`, `amounts`, `virtualBptSupply`, `amp`, `fee`, `rates`): `BigNumber$1`

#### Parameters

| Name | Type |
| :------ | :------ |
| `allBalances` | `BigNumberish`[] |
| `decimals` | `number`[] |
| `amounts` | `BigNumberish`[] |
| `virtualBptSupply` | `BigNumberish` |
| `amp` | `BigNumberish` |
| `fee` | `BigNumberish` |
| `rates` | `BigNumberish`[] |

#### Returns

`BigNumber$1`

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:335

___

### queryBatchSwapTokensIn

▸ **queryBatchSwapTokensIn**(`sor`, `vaultContract`, `tokensIn`, `amountsIn`, `tokenOut`): `Promise`<{ `amountTokenOut`: `string` ; `assets`: `string`[] ; `swaps`: `SwapV2`[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sor` | `SOR` |
| `vaultContract` | `Contract` |
| `tokensIn` | `string`[] |
| `amountsIn` | `BigNumberish`[] |
| `tokenOut` | `string` |

#### Returns

`Promise`<{ `amountTokenOut`: `string` ; `assets`: `string`[] ; `swaps`: `SwapV2`[]  }\>

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:340

___

### queryBatchSwapTokensOut

▸ **queryBatchSwapTokensOut**(`sor`, `vaultContract`, `tokenIn`, `amountsIn`, `tokensOut`): `Promise`<{ `amountTokensOut`: `string`[] ; `assets`: `string`[] ; `swaps`: `SwapV2`[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sor` | `SOR` |
| `vaultContract` | `Contract` |
| `tokenIn` | `string` |
| `amountsIn` | `BigNumberish`[] |
| `tokensOut` | `string`[] |

#### Returns

`Promise`<{ `amountTokensOut`: `string`[] ; `assets`: `string`[] ; `swaps`: `SwapV2`[]  }\>

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:345

___

### removeItem

▸ **removeItem**<`T`\>(`arr`, `index`): `T`[]

Removes item from array at specified index and returns new array. (Does not mutate original)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `T`[] | Original array |
| `index` | `number` | Index of item to be removed |

#### Returns

`T`[]

New array with item at index removed

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/index.ts:51](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/index.ts#L51)

___

### reorderArrays

▸ **reorderArrays**<`T`\>(`reference`, `original`, `...others`): `unknown`[][]

REORDER ARRAYS USING A REFERENCE AND ORIGINAL ARRAY,
Example:
Input -> reference: [c,b,a], original: [a,b,c], others: [[1,2,3], [4,5,6]]
Sorts like -> [[c,b,a],[3,2,1],[6,5,4]]
Returns -> [6,5,4]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `reference` | `T`[] |
| `original` | `T`[] |
| `...others` | `unknown`[][] |

#### Returns

`unknown`[][]

Sorted others

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/index.ts:68](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/index.ts#L68)

___

### replace

▸ **replace**<`T`\>(`arr`, `index`, `newItem`): `T`[]

Replace the item on the specified index with newItem

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `T`[] |
| `index` | `number` |
| `newItem` | `T` |

#### Returns

`T`[]

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/index.ts:34](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/index.ts#L34)

___

### signPermit

▸ **signPermit**(`token`, `owner`, `spender`, `amount`, `deadline?`, `nonce?`): `Promise`<{ `deadline`: `BigNumber` ; `nonce`: `BigNumber` ; `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `token` | `Contract` | `undefined` |
| `owner` | `Signer` & `TypedDataSigner` | `undefined` |
| `spender` | [`Account`](modules.md#account) | `undefined` |
| `amount` | `BigNumberish` | `undefined` |
| `deadline` | `BigNumberish` | `MAX_DEADLINE` |
| `nonce?` | `BigNumberish` | `undefined` |

#### Returns

`Promise`<{ `deadline`: `BigNumber` ; `nonce`: `BigNumber` ; `r`: `string` ; `s`: `string` ; `v`: `number`  }\>

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/permit.ts:8](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/permit.ts#L8)

___

### someJoinExit

▸ **someJoinExit**(`pools`, `swaps`, `assets`): `boolean`

Find if any of the swaps are join/exits. If yes these swaps should be routed via Relayer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pools` | `SubgraphPoolBase`[] |
| `swaps` | `SwapV2`[] |
| `assets` | `string`[] |

#### Returns

`boolean`

#### Defined in

[balancer-sdk/balancer-js/src/modules/swaps/joinAndExit.ts:208](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/swaps/joinAndExit.ts#L208)

___

### stableBPTForTokensZeroPriceImpact

▸ **stableBPTForTokensZeroPriceImpact**(`allBalances`, `decimals`, `amounts`, `bptTotalSupply`, `amp`): `BigNumber$1`

#### Parameters

| Name | Type |
| :------ | :------ |
| `allBalances` | `BigNumberish`[] |
| `decimals` | `number`[] |
| `amounts` | `BigNumberish`[] |
| `bptTotalSupply` | `BigNumberish` |
| `amp` | `BigNumberish` |

#### Returns

`BigNumber$1`

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:332

___

### toNormalizedWeights

▸ **toNormalizedWeights**(`weights`): `BigNumber`[]

Normalize an array of token weights to ensure they sum to `1e18`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `weights` | `BigNumber`[] | an array of token weights to be normalized |

#### Returns

`BigNumber`[]

an equivalent set of normalized weights

#### Defined in

[balancer-sdk/balancer-js/src/pool-weighted/normalizedWeights.ts:13](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/pool-weighted/normalizedWeights.ts#L13)

___

### tokenAddressForPricing

▸ **tokenAddressForPricing**(`address`, `chainId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chainId` | [`Network`](enums/Network.md) |

#### Returns

`string`

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/tokens.ts:18](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/tokens.ts#L18)

___

### tokensToTokenPrices

▸ **tokensToTokenPrices**(`tokens`): [`TokenPrices`](modules.md#tokenprices)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokens` | `Token`[] |

#### Returns

[`TokenPrices`](modules.md#tokenprices)

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/tokens.ts:7](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/tokens.ts#L7)

___

### truncateAddresses

▸ **truncateAddresses**(`addresses`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `addresses` | `string`[] |

#### Returns

`string`[]

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/index.ts:102](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/index.ts#L102)

___

### unwrapToken

▸ **unwrapToken**(`wrappedAddress`, `chainId`): `string`

Finds an underlying token address for a wrapped one

#### Parameters

| Name | Type |
| :------ | :------ |
| `wrappedAddress` | `string` |
| `chainId` | [`Network`](enums/Network.md) |

#### Returns

`string`

underlying token address

#### Defined in

[balancer-sdk/balancer-js/src/lib/utils/tokens.ts:47](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/lib/utils/tokens.ts#L47)

___

### weightedBPTForTokensZeroPriceImpact

▸ **weightedBPTForTokensZeroPriceImpact**(`balances`, `decimals`, `normalizedWeights`, `amounts`, `bptTotalSupply`): `BigNumber$1`

#### Parameters

| Name | Type |
| :------ | :------ |
| `balances` | `BigNumberish`[] |
| `decimals` | `number`[] |
| `normalizedWeights` | `BigNumberish`[] |
| `amounts` | `BigNumberish`[] |
| `bptTotalSupply` | `BigNumberish` |

#### Returns

`BigNumber$1`

#### Defined in

balancer-sdk/balancer-js/node_modules/@balancer-labs/sor/dist/index.d.ts:330
