# Class: Data

Data sources

## Implements

- `BalancerDataRepositories`

## Constructors

### constructor

• **new Data**(`networkConfig`, `provider`, `subgraphQuery?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkConfig` | [`BalancerNetworkConfig`](../modules.md#balancernetworkconfig) |
| `provider` | `Provider` |
| `subgraphQuery?` | `GraphQLQuery` |

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:93](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L93)

## Properties

### blockNumbers

• **blockNumbers**: `undefined` \| `BlockNumberRepository`

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:90](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L90)

___

### feeCollector

• **feeCollector**: `FeeCollectorRepository`

#### Implementation of

BalancerDataRepositories.feeCollector

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:84](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L84)

___

### feeDistributor

• **feeDistributor**: `undefined` \| `FeeDistributorRepository`

#### Implementation of

BalancerDataRepositories.feeDistributor

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:83](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L83)

___

### gaugeShares

• **gaugeShares**: `undefined` \| `GaugeSharesRepository`

#### Implementation of

BalancerDataRepositories.gaugeShares

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:69](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L69)

___

### liquidityGauges

• **liquidityGauges**: `undefined` \| `LiquidityGaugeSubgraphRPCProvider`

Getting liquidity gauge state via RPC multicall and subgraph

#### Implementation of

BalancerDataRepositories.liquidityGauges

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:82](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L82)

___

### poolGauges

• **poolGauges**: `undefined` \| `PoolGaugesRepository`

#### Implementation of

BalancerDataRepositories.poolGauges

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:68](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L68)

___

### poolJoinExits

• **poolJoinExits**: `PoolJoinExitRepository`

#### Implementation of

BalancerDataRepositories.poolJoinExits

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:91](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L91)

___

### poolShares

• **poolShares**: `PoolSharesRepository`

#### Implementation of

BalancerDataRepositories.poolShares

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:67](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L67)

___

### pools

• **pools**: `PoolsSubgraphRepository`

The fallback provider takes multiple PoolRepository's in an array and uses them in order
falling back to the next one if a request times out.

This is useful for using the Balancer API while being able to fall back to the graph if it is down
to ensure Balancer is maximally decentralized.

#### Implementation of

BalancerDataRepositories.pools

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:63](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L63)

___

### poolsForSor

• **poolsForSor**: `SubgraphPoolDataService`

#### Implementation of

BalancerDataRepositories.poolsForSor

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:64](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L64)

___

### poolsOnChain

• **poolsOnChain**: `PoolsSubgraphOnChainRepository`

#### Implementation of

BalancerDataRepositories.poolsOnChain

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:65](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L65)

___

### protocolFees

• **protocolFees**: `undefined` \| `ProtocolFeesProvider`

#### Implementation of

BalancerDataRepositories.protocolFees

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:85](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L85)

___

### tokenHistoricalPrices

• **tokenHistoricalPrices**: `HistoricalPriceProvider`

Coingecko price source

#### Implementation of

BalancerDataRepositories.tokenHistoricalPrices

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:77](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L77)

___

### tokenMeta

• **tokenMeta**: `StaticTokenProvider`

#### Implementation of

BalancerDataRepositories.tokenMeta

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:78](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L78)

___

### tokenPrices

• **tokenPrices**: `TokenPriceProvider`

Price provider that combines the coingecko price with the aave rates and fallbacks to the subgraph if coingecko fails

#### Implementation of

BalancerDataRepositories.tokenPrices

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:73](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L73)

___

### tokenYields

• **tokenYields**: `TokenYieldsRepository`

Fetching token yields from external sources

#### Implementation of

BalancerDataRepositories.tokenYields

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:89](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L89)

___

### yesterdaysPools

• **yesterdaysPools**: `undefined` \| `PoolsSubgraphRepository`

#### Implementation of

BalancerDataRepositories.yesterdaysPools

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/index.ts:66](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/index.ts#L66)
