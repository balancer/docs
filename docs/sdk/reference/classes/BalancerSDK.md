# Class: BalancerSDK

Balancer SDK - services for interacting with Balancer Protocol V2.

```ts
import { BalancerSDK, Network } from '@balancer-labs/sdk'

const balancer = new BalancerSDK({
  network: Network.MAINNET,
  rpcUrl: 'https://ethereum-node:8454/...',
})
```

## Implements

- [`BalancerSDKRoot`](../modules.md#balancersdkroot)

## Constructors

### constructor

• **new BalancerSDK**(`config`, `sor?`, `subgraph?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`BalancerSdkConfig`](../modules.md#balancersdkconfig) |
| `sor` | [`Sor`](Sor.md) |
| `subgraph` | [`Subgraph`](Subgraph.md) |

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:88](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L88)

## Properties

### balancerContracts

• `Readonly` **balancerContracts**: `Contracts`

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:65](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L65)

___

### claimService

• `Optional` `Readonly` **claimService**: `IClaimService`

#### Implementation of

BalancerSDKRoot.claimService

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:80](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L80)

___

### config

• **config**: [`BalancerSdkConfig`](../modules.md#balancersdkconfig)

#### Implementation of

BalancerSDKRoot.config

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:89](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L89)

___

### data

• `Readonly` **data**: [`Data`](Data.md)

#### Implementation of

BalancerSDKRoot.data

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:64](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L64)

___

### networkConfig

• `Readonly` **networkConfig**: [`BalancerNetworkConfig`](../modules.md#balancernetworkconfig)

#### Implementation of

BalancerSDKRoot.networkConfig

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:75](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L75)

___

### pools

• `Readonly` **pools**: [`Pools`](Pools.md)

#### Implementation of

BalancerSDKRoot.pools

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:60](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L60)

___

### pricing

• `Readonly` **pricing**: `Pricing`

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:56](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L56)

___

### provider

• `Readonly` **provider**: `Provider`

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:79](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L79)

___

### relayer

• `Readonly` **relayer**: [`Relayer`](Relayer.md)

#### Implementation of

BalancerSDKRoot.relayer

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:52](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L52)

___

### sor

• **sor**: [`Sor`](Sor.md)

#### Implementation of

BalancerSDKRoot.sor

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:90](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L90)

___

### subgraph

• **subgraph**: [`Subgraph`](Subgraph.md)

#### Implementation of

BalancerSDKRoot.subgraph

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:91](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L91)

___

### swaps

• `Readonly` **swaps**: [`Swaps`](Swaps.md)

Token swapping functions.

#### Implementation of

BalancerSDKRoot.swaps

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:47](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L47)

___

### vaultModel

• `Readonly` **vaultModel**: `VaultModel`

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:70](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L70)

___

### zaps

• `Readonly` **zaps**: `Zaps`

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:69](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L69)

## Accessors

### contracts

• `get` **contracts**(): `ContractInstances`

Instantiated Balancer typechain contracts, e.g. Vault, LidoRelayer.

#### Returns

`ContractInstances`

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:135](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L135)

___

### rpcProvider

• `get` **rpcProvider**(): `Provider`

#### Returns

`Provider`

#### Implementation of

BalancerSDKRoot.rpcProvider

#### Defined in

[balancer-sdk/balancer-js/src/modules/sdk.module.ts:127](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/sdk.module.ts#L127)
