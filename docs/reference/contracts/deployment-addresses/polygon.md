---
title: Polygon
order: 4
---

# Polygon Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer-labs/balancer-v2-monorepo/tree/master/pkg/deployments/tasks) section of the monorepo.
:::

## Core

| Contract                                                                                                                                                              | Address                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vault](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/Vault.sol)                                                              | <span class="address-link">[0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://polygonscan.com/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8)</span> |
| [BalancerRelayer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/BalancerRelayer.sol) (v4)                  | <span class="address-link">[0x28A224d9d398a1eBB7BA69BCA515898966Bb1B6b](https://polygonscan.com/address/0x28A224d9d398a1eBB7BA69BCA515898966Bb1B6b)</span> |
| [BatchRelayerLibrary](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BatchRelayerLibrary.sol) (v4)                  | <span class="address-link">[0x156C628135327F41748D8c8802fC043870714E9a](https://polygonscan.com/address/0x156C628135327F41748D8c8802fC043870714E9a)</span> |
| [BalancerQueries](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BalancerQueries.sol)                               | <span class="address-link">[0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5](https://polygonscan.com/address/0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5)</span> |
| [ProtocolFeePercentagesProvider](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/ProtocolFeePercentagesProvider.sol) | <span class="address-link">[0x42AC0e6FA47385D55Aff070d79eF0079868C48a6](https://polygonscan.com/address/0x42AC0e6FA47385D55Aff070d79eF0079868C48a6)</span> |

## Authorization

| Contract                                                                                                                                                              | Address                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorizer                                                                                                                                                            | <span class="address-link">[0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6](https://polygonscan.com/address/0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6)</span> |
| [AuthorizerAdaptor](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptor.sol)                     | <span class="address-link">[0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD](https://polygonscan.com/address/0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD)</span> |
| [AuthorizerAdaptorEntrypoint](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptorEntrypoint.sol) | <span class="address-link">[0xAB093cd16e765b5B23D34030aaFaF026558e0A19](https://polygonscan.com/address/0xAB093cd16e765b5B23D34030aaFaF026558e0A19)</span> |

## Pool Factories

| Contract                                                                                                                                                                     | Address                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [WeightedPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/WeightedPoolFactory.sol) (v3)                            | <span class="address-link">[0x82e4cFaef85b1B6299935340c964C942280327f4](https://polygonscan.com/address/0x82e4cFaef85b1B6299935340c964C942280327f4)</span> |
| [ComposableStablePoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-stable/contracts/ComposableStablePoolFactory.sol) (v3)              | <span class="address-link">[0x7bc6C0E73EDAa66eF3F6E2f27b0EE8661834c6C9](https://polygonscan.com/address/0x7bc6C0E73EDAa66eF3F6E2f27b0EE8661834c6C9)</span> |
| [LiquidityBootstrappingPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/lbp/LiquidityBootstrappingPoolFactory.sol) | <span class="address-link"></span>                                                                                                                         |

## BAL / veBAL / Liquidity Mining

| Contract                                                                                                                                                                       | Address                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BAL Governance Token                                                                                                                                                           | <span class="address-link">[0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3](https://polygonscan.com/address/0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3)</span> |
| [ChildChainStreamer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ChildChainStreamer.vy)                            | <span class="address-link">[0x6f5a2eE11E7a772AeB5114A20d0D7c0ff61EB8A0](https://polygonscan.com/address/0x6f5a2eE11E7a772AeB5114A20d0D7c0ff61EB8A0)</span> |
| [ChildChainLiquidityGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ChildChainLiquidityGaugeFactory.sol) | <span class="address-link">[0x3b8cA519122CdD8efb272b0D3085453404B25bD0](https://polygonscan.com/address/0x3b8cA519122CdD8efb272b0D3085453404B25bD0)</span> |

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
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
