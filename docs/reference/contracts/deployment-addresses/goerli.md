---
title: Goerli
order: 6
---

# Goerli Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer-labs/balancer-v2-monorepo/tree/master/pkg/deployments/tasks) section of the monorepo.
:::

## Core

| Contract                                                                                                                                                              | Address                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vault](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/Vault.sol)                                                              | <span class="address-link">[0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://goerli.etherscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8)</span> |
| [BalancerRelayer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/BalancerRelayer.sol) (v4)                  | <span class="address-link">[0x00e695aA8000df01B8DC8401B4C34Fba5D56BBb2](https://goerli.etherscan.io/address/0x00e695aA8000df01B8DC8401B4C34Fba5D56BBb2)</span> |
| [BatchRelayerLibrary](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BatchRelayerLibrary.sol) (v4)                  | <span class="address-link">[0xeb151668006CD04DAdD098AFd0a82e78F77076c3](https://goerli.etherscan.io/address/0xeb151668006CD04DAdD098AFd0a82e78F77076c3)</span> |
| [BalancerQueries](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BalancerQueries.sol)                               | <span class="address-link">[0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5](https://goerli.etherscan.io/address/0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5)</span> |
| [ProtocolFeePercentagesProvider](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/ProtocolFeePercentagesProvider.sol) | <span class="address-link">[0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e](https://goerli.etherscan.io/address/0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e)</span> |

## Authorization

| Contract                                                                                                                                                              | Address                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorizer                                                                                                                                                            | <span class="address-link">[0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6](https://goerli.etherscan.io/address/0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6)</span> |
| [AuthorizerAdaptor](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptor.sol)                     | <span class="address-link">[0x5D90225De345eE24d1d2B6F45DE90B056F5265A1](https://goerli.etherscan.io/address/0x5D90225De345eE24d1d2B6F45DE90B056F5265A1)</span> |
| [AuthorizerAdaptorEntrypoint](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptorEntrypoint.sol) | <span class="address-link">[0xacAaC3e6D6Df918Bf3c809DFC7d42de0e4a72d4C](https://goerli.etherscan.io/address/0xacAaC3e6D6Df918Bf3c809DFC7d42de0e4a72d4C)</span> |
| [TimelockAuthorizer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/authorizer/TimelockAuthorizer.sol)                         | <span class="address-link">[0x5D21A65b6Ec0687f471891257F1DA25ab8be6153](https://goerli.etherscan.io/address/0x5D21A65b6Ec0687f471891257F1DA25ab8be6153)</span> |

## Pool Factories

| Contract                                                                                                                                                                     | Address                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [WeightedPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/WeightedPoolFactory.sol) (v3)                            | <span class="address-link">[0x26575A44755E0aaa969FDda1E4291Df22C5624Ea](https://goerli.etherscan.io/address/0x26575A44755E0aaa969FDda1E4291Df22C5624Ea)</span> |
| [ComposableStablePoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-stable/contracts/ComposableStablePoolFactory.sol) (v3)              | <span class="address-link">[0xbfD9769b061E57e478690299011A028194D66e3C](https://goerli.etherscan.io/address/0xbfD9769b061E57e478690299011A028194D66e3C)</span> |
| [LiquidityBootstrappingPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/lbp/LiquidityBootstrappingPoolFactory.sol) | <span class="address-link">[0xB0C726778C3AE4B3454D85557A48e8fa502bDD6A](https://goerli.etherscan.io/address/0xB0C726778C3AE4B3454D85557A48e8fa502bDD6A)</span> |
| [ERC4626LinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/erc4626-linear-pool/ERC4626LinearPoolFactory.sol) (v3)  | <span class="address-link">[0xBa240C856498e2d7a70AF4911AaFae0D6b565a5B](https://goerli.etherscan.io/address/0xBa240C856498e2d7a70AF4911AaFae0D6b565a5B)</span> |
| [AaveLinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/aave-v2-linear-pool/AaveLinearPoolFactory.sol) (v4)        | <span class="address-link">[0x76578ecf9a141296Ec657847fb45B0585bCDa3a6](https://goerli.etherscan.io/address/0x76578ecf9a141296Ec657847fb45B0585bCDa3a6)</span> |
| [EulerLinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/euler-linear-pool/EulerLinearPoolFactory.sol) (v4)        | <span class="address-link">[0x813EE7a840CE909E7Fea2117A44a90b8063bd4fd](https://goerli.etherscan.io/address/0x813EE7a840CE909E7Fea2117A44a90b8063bd4fd)</span> |

## BAL / veBAL / Liquidity Mining

| Contract                                                                                                                                                                        | Address                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BAL Governance Token                                                                                                                                                            | <span class="address-link">[0xfA8449189744799aD2AcE7e0EBAC8BB7575eff47](https://goerli.etherscan.io/address/0xfA8449189744799aD2AcE7e0EBAC8BB7575eff47)</span> |
| [BALTokenHolderFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BALTokenHolderFactory.sol)                             | <span class="address-link">[0x45E617B07021B97407367624648d1A0A358a751A](https://goerli.etherscan.io/address/0x45E617B07021B97407367624648d1A0A358a751A)</span> |
| [BalancerTokenAdmin](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/BalancerTokenAdmin.sol)                                   | <span class="address-link">[0x0F32D7D830E20809Bcb9071581A696135dD472B7](https://goerli.etherscan.io/address/0x0F32D7D830E20809Bcb9071581A696135dD472B7)</span> |
| [BalancerMinter](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/BalancerMinter.sol)                                           | <span class="address-link">[0xdf0399539A72E2689B8B2DD53C3C2A0883879fDd](https://goerli.etherscan.io/address/0xdf0399539A72E2689B8B2DD53C3C2A0883879fDd)</span> |
| [GaugeAdder](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/GaugeAdder.sol) (v2)                                        | <span class="address-link">[0x42bAF6db21250fa76d015621D2F6DF172858A5cb](https://goerli.etherscan.io/address/0x42bAF6db21250fa76d015621D2F6DF172858A5cb)</span> |
| [VeBoost](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/VeBoostV2.vy) (v2)                                                   | <span class="address-link">[0xd13AFc362F619b840C8f4AaC1D957cE219eF37Ca](https://goerli.etherscan.io/address/0xd13AFc362F619b840C8f4AaC1D957cE219eF37Ca)</span> |
| [VotingEscrow](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/VotingEscrow.vy)                                                | <span class="address-link">[0x33A99Dcc4C85C014cf12626959111D5898bbCAbF](https://goerli.etherscan.io/address/0x33A99Dcc4C85C014cf12626959111D5898bbCAbF)</span> |
| [GaugeController](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/GaugeController.vy)                                          | <span class="address-link">[0xBB1CE49b16d55A1f2c6e88102f32144C7334B116](https://goerli.etherscan.io/address/0xBB1CE49b16d55A1f2c6e88102f32144C7334B116)</span> |
| [DistributionScheduler](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/DistributionScheduler.sol)                       | <span class="address-link">[0x05a0BF0540F346b6Dac25550738343BEb51C0f65](https://goerli.etherscan.io/address/0x05a0BF0540F346b6Dac25550738343BEb51C0f65)</span> |
| [FeeDistributor](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/fee-distribution/FeeDistributor.sol) (v2)                     | <span class="address-link">[0x42B67611B208E2e9b4CC975F6D74c87b865aE066](https://goerli.etherscan.io/address/0x42B67611B208E2e9b4CC975F6D74c87b865aE066)</span> |
| [SingleRecipientGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ethereum/SingleRecipientGaugeFactory.sol) | <span class="address-link">[0xd14FFA46C211eac64338c27549c3312380f850Fa](https://goerli.etherscan.io/address/0xd14FFA46C211eac64338c27549c3312380f850Fa)</span> |
| [LiquidityGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ethereum/LiquidityGaugeFactory.sol) (v2)        | <span class="address-link">[0x3b8cA519122CdD8efb272b0D3085453404B25bD0](https://goerli.etherscan.io/address/0x3b8cA519122CdD8efb272b0D3085453404B25bD0)</span> |
| [L2GaugeCheckpointer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/L2GaugeCheckpointer.sol)                          | <span class="address-link">[0xf23b4DB826DbA14c0e857029dfF076b1c0264843](https://goerli.etherscan.io/address/0xf23b4DB826DbA14c0e857029dfF076b1c0264843)</span> |
| [SmartWalletChecker](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/SmartWalletChecker.sol)                                   | <span class="address-link">[0x1b6DF1fF5db99F8a8A04D38f7478BAB056Fa35A7](https://goerli.etherscan.io/address/0x1b6DF1fF5db99F8a8A04D38f7478BAB056Fa35A7)</span> |

## Deprecated

::: details

| Contract | Address |
| -------- | ------- |

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
