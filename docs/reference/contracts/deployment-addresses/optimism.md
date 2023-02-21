---
title: Optimism
order: 3
---

# Optimism Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer-labs/balancer-v2-monorepo/tree/master/pkg/deployments/tasks) section of the monorepo.
:::

::: info Optimism Deployment
The Optimism deployment is a joint venture between Balancer and Beethoven teams. The deployment addresses can be found below, however the frontend is run by Beethoven at [https://op.beets.fi](https://op.beets.fi)
:::

## Core

| Contract                                                                                                                                                              | Address                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Vault](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/Vault.sol)                                                              | <span class="address-link">[0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://optimistic.etherscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8)</span> |
| [BalancerRelayer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/BalancerRelayer.sol) (v4)                  | <span class="address-link">[0x1a58897Ab366082028ced3740900ecBD765Af738](https://optimistic.etherscan.io/address/0x1a58897Ab366082028ced3740900ecBD765Af738)</span> |
| [BatchRelayerLibrary](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BatchRelayerLibrary.sol) (v4)                  | <span class="address-link">[0x8E5698dC4897DC12243c8642e77B4f21349Db97C](https://optimistic.etherscan.io/address/0x8E5698dC4897DC12243c8642e77B4f21349Db97C)</span> |
| [BalancerQueries](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BalancerQueries.sol)                               | <span class="address-link">[0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5](https://optimistic.etherscan.io/address/0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5)</span> |
| [ProtocolFeePercentagesProvider](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/ProtocolFeePercentagesProvider.sol) | <span class="address-link">[0xacAaC3e6D6Df918Bf3c809DFC7d42de0e4a72d4C](https://optimistic.etherscan.io/address/0xacAaC3e6D6Df918Bf3c809DFC7d42de0e4a72d4C)</span> |

## Authorization

| Contract                                                                                                                                                              | Address                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorizer                                                                                                                                                            | <span class="address-link">[0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6](https://optimistic.etherscan.io/address/0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6)</span> |
| [AuthorizerAdaptor](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptor.sol)                     | <span class="address-link">[0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75](https://optimistic.etherscan.io/address/0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75)</span> |
| [AuthorizerAdaptorEntrypoint](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptorEntrypoint.sol) | <span class="address-link">[0xed86ff0c507D3AF5F35d3523B77C17415FCfFaCb](https://optimistic.etherscan.io/address/0xed86ff0c507D3AF5F35d3523B77C17415FCfFaCb)</span> |

## Pool Factories

| Contract                                                                                                                                                                     | Address                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [WeightedPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/WeightedPoolFactory.sol) (v3)                            | <span class="address-link">[0xA0DAbEBAAd1b243BBb243f933013d560819eB66f](https://optimistic.etherscan.io/address/0xA0DAbEBAAd1b243BBb243f933013d560819eB66f)</span> |
| [ComposableStablePoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-stable/contracts/ComposableStablePoolFactory.sol) (v3)              | <span class="address-link">[0xe2E901AB09f37884BA31622dF3Ca7FC19AA443Be](https://optimistic.etherscan.io/address/0xe2E901AB09f37884BA31622dF3Ca7FC19AA443Be)</span> |
| [LiquidityBootstrappingPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/lbp/LiquidityBootstrappingPoolFactory.sol) | <span class="address-link">[0xf302f9F50958c5593770FDf4d4812309fF77414f](https://optimistic.etherscan.io/address/0xf302f9F50958c5593770FDf4d4812309fF77414f)</span> |
| [ERC4626LinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/erc4626-linear-pool/ERC4626LinearPoolFactory.sol) (v3)  | <span class="address-link">[0xa3B9515A9c557455BC53F7a535A85219b59e8B2E](https://optimistic.etherscan.io/address/0xa3B9515A9c557455BC53F7a535A85219b59e8B2E)</span> |
| [AaveLinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/aave-v2-linear-pool/AaveLinearPoolFactory.sol) (v4)        | <span class="address-link">[0xf23b4DB826DbA14c0e857029dfF076b1c0264843](https://optimistic.etherscan.io/address/0xf23b4DB826DbA14c0e857029dfF076b1c0264843)</span> |

## BAL / veBAL / Liquidity Mining

| Contract                                                                                                                                                                       | Address                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [ChildChainStreamer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ChildChainStreamer.vy)                            | <span class="address-link">[0x239e55F427D44C3cc793f49bFB507ebe76638a2b](https://optimistic.etherscan.io/address/0x239e55F427D44C3cc793f49bFB507ebe76638a2b)</span> |
| [ChildChainLiquidityGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ChildChainLiquidityGaugeFactory.sol) | <span class="address-link">[0x2E96068b3D5B5BAE3D7515da4A1D2E52d08A2647](https://optimistic.etherscan.io/address/0x2E96068b3D5B5BAE3D7515da4A1D2E52d08A2647)</span> |

<style scoped>
table {
    display: table;
    width: 100%;
}
table th:first-of-type, td:first-of-type {
    width: 40%;
}
table th:nth-of-type(2) {
    width: 60%;
}
td {
    max-width: 0;
    overflow: hidden;
}
</style>
