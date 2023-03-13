# Namespace: balEmissions

## Variables

### INITIAL\_RATE

• `Const` **INITIAL\_RATE**: ``145000``

Weekly Bal emissions are fixed / year according to:
https://docs.google.com/spreadsheets/d/1FY0gi596YWBOTeu_mrxhWcdF74SwKMNhmu0qJVgs0KI/edit#gid=0

Using regular numbers for simplicity assuming frontend use only.

Calculation source
https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/BalancerTokenAdmin.sol

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/bal/emissions.ts:11](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/bal/emissions.ts#L11)

## Functions

### between

▸ **between**(`start`, `end`): `number`

Total BAL emitted between two timestamps

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | starting timestamp |
| `end` | `number` | ending timestamp |

#### Returns

`number`

BAL emitted in period

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/bal/emissions.ts:54](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/bal/emissions.ts#L54)

___

### total

▸ **total**(`epoch`): `number`

Total BAL emitted in epoch (1 year)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `epoch` | `number` | starting from 0 for the first year of emissions |

#### Returns

`number`

BAL emitted in epoch

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/bal/emissions.ts:40](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/bal/emissions.ts#L40)

___

### weekly

▸ **weekly**(`currentTimestamp?`): `number`

Weekly BAL emissions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `currentTimestamp` | `number` | used to get the epoch |

#### Returns

`number`

BAL emitted in a week

#### Defined in

[balancer-sdk/balancer-js/src/modules/data/bal/emissions.ts:22](https://github.com/balancer/balancer-sdk/blob/master/balancer-js/src/modules/data/bal/emissions.ts#L22)
