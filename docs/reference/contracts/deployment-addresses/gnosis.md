---
title: Gnosis
order: 5
---

# Gnosis Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer-labs/balancer-v2-monorepo/tree/master/pkg/deployments/tasks) section of the monorepo.
:::

## Core

| Contract                                                                                                                                                              | Address                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vault](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/Vault.sol)                                                              | <span class="address-link">[0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://gnosisscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8)</span> |
| [BalancerRelayer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/BalancerRelayer.sol) (v4)                  | <span class="address-link">[0xeF606F58A4FD0fCcb066c6203d0994694d3eB2D3](https://gnosisscan.io/address/0xeF606F58A4FD0fCcb066c6203d0994694d3eB2D3)</span> |
| [BatchRelayerLibrary](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BatchRelayerLibrary.sol) (v4)                  | <span class="address-link">[0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8](https://gnosisscan.io/address/0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8)</span> |
| [BalancerQueries](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BalancerQueries.sol)                               | <span class="address-link">[0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e](https://gnosisscan.io/address/0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e)</span> |
| [ProtocolFeePercentagesProvider](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/ProtocolFeePercentagesProvider.sol) | <span class="address-link">[0x41B953164995c11C81DA73D212ED8Af25741b7Ac](https://gnosisscan.io/address/0x41B953164995c11C81DA73D212ED8Af25741b7Ac)</span> |

## Authorization

| Contract                                                                                                                                                              | Address                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorizer                                                                                                                                                            | <span class="address-link">[0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6](https://gnosisscan.io/address/0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6)</span> |
| [AuthorizerAdaptor](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptor.sol)                     | <span class="address-link">[0x5aDDCCa35b7A0D07C74063c48700C8590E87864E](https://gnosisscan.io/address/0x5aDDCCa35b7A0D07C74063c48700C8590E87864E)</span> |
| [AuthorizerAdaptorEntrypoint](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptorEntrypoint.sol) | <span class="address-link">[0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75](https://gnosisscan.io/address/0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75)</span> |

## Pool Factories

| Contract                                                                                                                                                                     | Address                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [WeightedPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/WeightedPoolFactory.sol) (v3)                            | <span class="address-link">[0xC128a9954e6c874eA3d62ce62B468bA073093F25](https://gnosisscan.io/address/0xC128a9954e6c874eA3d62ce62B468bA073093F25)</span> |
| [ComposableStablePoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-stable/contracts/ComposableStablePoolFactory.sol) (v3)              | <span class="address-link">[0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD](https://gnosisscan.io/address/0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD)</span> |
| [LiquidityBootstrappingPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/lbp/LiquidityBootstrappingPoolFactory.sol) | <span class="address-link">[0x85a80afee867aDf27B50BdB7b76DA70f1E853062](https://gnosisscan.io/address/0x85a80afee867aDf27B50BdB7b76DA70f1E853062)</span> |

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
