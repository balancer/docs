---
title: Arbitrum
order: 2
---

# Arbitrum Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer-labs/balancer-v2-monorepo/tree/master/pkg/deployments/tasks) section of the monorepo.
:::

## Core

| Contract                                                                                                                                                              | Address                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Vault](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/Vault.sol)                                                              | <span class="address-link">[0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://arbiscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8)</span> |
| [BalancerRelayer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/BalancerRelayer.sol) (v4)                  | <span class="address-link">[0x5bf3B7c14b10f16939d63Bd679264A1Aa951B4D5](https://arbiscan.io/address/0x5bf3B7c14b10f16939d63Bd679264A1Aa951B4D5)</span> |
| [BatchRelayerLibrary](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BatchRelayerLibrary.sol) (v4)                  | <span class="address-link">[0x967F7AdD4Fd5AF0553B7A45F225ec26EDD699E61](https://arbiscan.io/address/0x967F7AdD4Fd5AF0553B7A45F225ec26EDD699E61)</span> |
| [BalancerQueries](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BalancerQueries.sol)                               | <span class="address-link">[0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5](https://arbiscan.io/address/0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5)</span> |
| [ProtocolFeePercentagesProvider](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/ProtocolFeePercentagesProvider.sol) | <span class="address-link">[0x5ef4c5352882b10893b70DbcaA0C000965bd23c5](https://arbiscan.io/address/0x5ef4c5352882b10893b70DbcaA0C000965bd23c5)</span> |

## Authorization

| Contract                                                                                                                                                              | Address                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorizer                                                                                                                                                            | <span class="address-link">[0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6](https://arbiscan.io/address/0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6)</span> |
| [AuthorizerAdaptor](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptor.sol)                     | <span class="address-link">[0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e](https://arbiscan.io/address/0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e)</span> |
| [AuthorizerAdaptorEntrypoint](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptorEntrypoint.sol) | <span class="address-link">[0x97207B095e4D5C9a6e4cfbfcd2C3358E03B90c4A](https://arbiscan.io/address/0x97207B095e4D5C9a6e4cfbfcd2C3358E03B90c4A)</span> |

## Pool Factories

| Contract                                                                                                                                                                     | Address                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [WeightedPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/WeightedPoolFactory.sol) (v3)                            | <span class="address-link">[0xf1665E19bc105BE4EDD3739F88315cC699cc5b65](https://arbiscan.io/address/0xf1665E19bc105BE4EDD3739F88315cC699cc5b65)</span> |
| [ComposableStablePoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-stable/contracts/ComposableStablePoolFactory.sol) (v3)              | <span class="address-link">[0x1c99324EDC771c82A0DCCB780CC7DDA0045E50e7](https://arbiscan.io/address/0x1c99324EDC771c82A0DCCB780CC7DDA0045E50e7)</span> |
| [LiquidityBootstrappingPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/lbp/LiquidityBootstrappingPoolFactory.sol) | <span class="address-link">[0x1802953277FD955f9a254B80Aa0582f193cF1d77](https://arbiscan.io/address/0x1802953277FD955f9a254B80Aa0582f193cF1d77)</span> |
| [ERC4626LinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/pkg/linear-pools/contracts/erc4626-linear-pool/ERC4626LinearPoolFactory.sol)            | <span class="address-link">[0xa3B9515A9c557455BC53F7a535A85219b59e8B2E](https://arbiscan.io/address/0xa3B9515A9c557455BC53F7a535A85219b59e8B2E)</span> |
| [AaveLinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/pkg/linear-pools/contracts/aave-v2-linear-pool/AaveLinearPoolFactory.sol) (v4)             | <span class="address-link">[0xf23b4DB826DbA14c0e857029dfF076b1c0264843](https://arbiscan.io/address/0xf23b4DB826DbA14c0e857029dfF076b1c0264843)</span> |

## BAL / veBAL / Liquidity Mining

| Contract                                                                                                                                                                       | Address                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| BAL Governance Token                                                                                                                                                           | <span class="address-link">[0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8](https://arbiscan.io/address/0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8)</span> |
| [ChildChainStreamer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ChildChainStreamer.vy)                            | <span class="address-link">[0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8](https://arbiscan.io/address/0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8)</span> |
| [ChildChainLiquidityGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ChildChainLiquidityGaugeFactory.sol) | <span class="address-link">[0xb08E16cFc07C684dAA2f93C70323BAdb2A6CBFd2](https://arbiscan.io/address/0xb08E16cFc07C684dAA2f93C70323BAdb2A6CBFd2)</span> |

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
