---
title: Mainnet
order: 1
---

# Mainnet Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer-labs/balancer-v2-monorepo/tree/master/pkg/deployments/tasks) section of the monorepo.
:::

## Core

| Contract                                                                                                                                                              | Address                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vault](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/Vault.sol)                                                              | <span class="address-link">[0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://etherscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8)</span> |
| [BalancerRelayer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/BalancerRelayer.sol) (v4)                  | <span class="address-link">[0xAc9f49eF3ab0BbC929f7b1bb0A17E1Fca5786251](https://etherscan.io/address/0xAc9f49eF3ab0BbC929f7b1bb0A17E1Fca5786251)</span> |
| [BatchRelayerLibrary](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BatchRelayerLibrary.sol) (v4)                  | <span class="address-link">[0x41B953164995c11C81DA73D212ED8Af25741b7Ac](https://etherscan.io/address/0x41B953164995c11C81DA73D212ED8Af25741b7Ac)</span> |
| [BalancerQueries](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BalancerQueries.sol)                               | <span class="address-link">[0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5](https://etherscan.io/address/0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5)</span> |
| [ProtocolFeePercentagesProvider](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/ProtocolFeePercentagesProvider.sol) | <span class="address-link">[0x97207B095e4D5C9a6e4cfbfcd2C3358E03B90c4A](https://etherscan.io/address/0x97207B095e4D5C9a6e4cfbfcd2C3358E03B90c4A)</span> |

## Authorization

| Contract                                                                                                                                                              | Address                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorizer                                                                                                                                                            | <span class="address-link">[0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6](https://etherscan.io/address/0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6)</span> |
| [AuthorizerAdaptor](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptor.sol)                     | <span class="address-link">[0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75](https://etherscan.io/address/0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75)</span> |
| [AuthorizerAdaptorEntrypoint](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/AuthorizerAdaptorEntrypoint.sol) | <span class="address-link">[0xf5dECDB1f3d1ee384908Fbe16D2F0348AE43a9eA](https://etherscan.io/address/0xf5dECDB1f3d1ee384908Fbe16D2F0348AE43a9eA)</span> |
| [TimelockAuthorizer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/vault/contracts/authorizer/TimelockAuthorizer.sol)                         | <span class="address-link">[0x9E3cD0606Db55ac68845bB60121847823712ae05](https://etherscan.io/address/0x9E3cD0606Db55ac68845bB60121847823712ae05)</span> |

## Pool Factories

| Contract                                                                                                                                                                     | Address                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [WeightedPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/WeightedPoolFactory.sol) (v3)                            | <span class="address-link">[0x5Dd94Da3644DDD055fcf6B3E1aa310Bb7801EB8b](https://etherscan.io/address/0x5Dd94Da3644DDD055fcf6B3E1aa310Bb7801EB8b)</span> |
| [ComposableStablePoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-stable/contracts/ComposableStablePoolFactory.sol) (v3)              | <span class="address-link">[0xdba127fBc23fb20F5929C546af220A991b5C6e01](https://etherscan.io/address/0xdba127fBc23fb20F5929C546af220A991b5C6e01)</span> |
| [LiquidityBootstrappingPoolFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/pool-weighted/contracts/lbp/LiquidityBootstrappingPoolFactory.sol) | <span class="address-link">[0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e](https://etherscan.io/address/0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e)</span> |
| [ERC4626LinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/erc4626-linear-pool/ERC4626LinearPoolFactory.sol) (v3)  | <span class="address-link">[0x67A25ca2350Ebf4a0C475cA74C257C94a373b828](https://etherscan.io/address/0x67A25ca2350Ebf4a0C475cA74C257C94a373b828)</span> |
| [AaveLinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/aave-v2-linear-pool/AaveLinearPoolFactory.sol) (v4)        | <span class="address-link">[0xf23b4DB826DbA14c0e857029dfF076b1c0264843](https://etherscan.io/address/0xf23b4DB826DbA14c0e857029dfF076b1c0264843)</span> |
| [EulerLinearPoolFactory](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/euler-linear-pool/EulerLinearPoolFactory.sol) (v4)        | <span class="address-link">[0x5F43FBa61f63Fa6bFF101a0A0458cEA917f6B347](https://etherscan.io/address/0x5F43FBa61f63Fa6bFF101a0A0458cEA917f6B347)</span> |

## BAL / veBAL / Liquidity Mining

| Contract                                                                                                                                                                        | Address                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BAL Governance Token                                                                                                                                                            | <span class="address-link">[0xba100000625a3754423978a60c9317c58a424e3D](https://etherscan.io/address/0xba100000625a3754423978a60c9317c58a424e3D)</span> |
| [BALTokenHolderFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/BALTokenHolderFactory.sol)                             | <span class="address-link">[0xB848f50141F3D4255b37aC288C25C109104F2158](https://etherscan.io/address/0xB848f50141F3D4255b37aC288C25C109104F2158)</span> |
| [BalancerTokenAdmin](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/BalancerTokenAdmin.sol)                                   | <span class="address-link">[0xf302f9F50958c5593770FDf4d4812309fF77414f](https://etherscan.io/address/0xf302f9F50958c5593770FDf4d4812309fF77414f)</span> |
| [BalancerMinter](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/BalancerMinter.sol)                                           | <span class="address-link">[0x239e55F427D44C3cc793f49bFB507ebe76638a2b](https://etherscan.io/address/0x239e55F427D44C3cc793f49bFB507ebe76638a2b)</span> |
| [GaugeAdder](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/GaugeAdder.sol) (v2)                                        | <span class="address-link">[0x2fFB7B215Ae7F088eC2530C7aa8E1B24E398f26a](https://etherscan.io/address/0x2fFB7B215Ae7F088eC2530C7aa8E1B24E398f26a)</span> |
| [VeBoost](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/VeBoostV2.vy) (v2)                                                   | <span class="address-link">[0x67F8DF125B796B05895a6dc8Ecf944b9556ecb0B](https://etherscan.io/address/0x67F8DF125B796B05895a6dc8Ecf944b9556ecb0B)</span> |
| [VotingEscrow](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/VotingEscrow.vy)                                                | <span class="address-link">[0xC128a9954e6c874eA3d62ce62B468bA073093F25](https://etherscan.io/address/0xC128a9954e6c874eA3d62ce62B468bA073093F25)</span> |
| [GaugeController](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/GaugeController.vy)                                          | <span class="address-link">[0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD](https://etherscan.io/address/0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD)</span> |
| [DistributionScheduler](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/admin/DistributionScheduler.sol)                       | <span class="address-link">[0xBd35248F8325DD1cB2bBf9D01E80A6bb99a792Dd](https://etherscan.io/address/0xBd35248F8325DD1cB2bBf9D01E80A6bb99a792Dd)</span> |
| [FeeDistributor](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/fee-distribution/FeeDistributor.sol) (v2)                     | <span class="address-link">[0xD3cf852898b21fc233251427c2DC93d3d604F3BB](https://etherscan.io/address/0xD3cf852898b21fc233251427c2DC93d3d604F3BB)</span> |
| [SingleRecipientGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ethereum/SingleRecipientGaugeFactory.sol) | <span class="address-link">[0x94f68b54191F62f781Fe8298A8A5Fa3ed772d227](https://etherscan.io/address/0x94f68b54191F62f781Fe8298A8A5Fa3ed772d227)</span> |
| [LiquidityGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ethereum/LiquidityGaugeFactory.sol) (v2)        | <span class="address-link">[0xf1665E19bc105BE4EDD3739F88315cC699cc5b65](https://etherscan.io/address/0xf1665E19bc105BE4EDD3739F88315cC699cc5b65)</span> |
| [ArbitrumRootGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/arbitrum/ArbitrumRootGaugeFactory.sol) (v2)  | <span class="address-link">[0x1c99324EDC771c82A0DCCB780CC7DDA0045E50e7](https://etherscan.io/address/0x1c99324EDC771c82A0DCCB780CC7DDA0045E50e7)</span> |
| [OptimismRootGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/optimism/OptimismRootGaugeFactory.sol) (v2)  | <span class="address-link">[0x866D4B65694c66fbFD15Dd6fa933D0A6b3940A36](https://etherscan.io/address/0x866D4B65694c66fbFD15Dd6fa933D0A6b3940A36)</span> |
| [PolygonRootGaugeFactory](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/polygon/PolygonRootGaugeFactory.sol) (v2)     | <span class="address-link">[0xa98Bce70c92aD2ef3288dbcd659bC0d6b62f8F13](https://etherscan.io/address/0xa98Bce70c92aD2ef3288dbcd659bC0d6b62f8F13)</span> |
| [L2GaugeCheckpointer](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/L2GaugeCheckpointer.sol)                          | <span class="address-link">[0xf23b4DB826DbA14c0e857029dfF076b1c0264843](https://etherscan.io/address/0xf23b4DB826DbA14c0e857029dfF076b1c0264843)</span> |
| [SmartWalletChecker](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/SmartWalletChecker.sol)                                   | <span class="address-link">[0x7869296Efd0a76872fEE62A058C8fBca5c1c826C](https://etherscan.io/address/0x7869296Efd0a76872fEE62A058C8fBca5c1c826C)</span> |

## Misc

| Contract           | Address                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WstETHRateProvider | <span class="address-link">[0x72D07D7DcA67b8A406aD1Ec34ce969c90bFEE768](https://etherscan.io/address/0x72D07D7DcA67b8A406aD1Ec34ce969c90bFEE768)</span> |

## Deprecated

::: details

| Contract                   | Address                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MerkleRedeem               | <span class="address-link">[0x884226c9f7b7205f607922E0431419276a64CF8f](https://etherscan.io/address/0x884226c9f7b7205f607922E0431419276a64CF8f)</span> |
| MerkleOrchard              | <span class="address-link">[0xdAE7e32ADc5d490a43cCba1f0c736033F2b4eFca](https://etherscan.io/address/0xdAE7e32ADc5d490a43cCba1f0c736033F2b4eFca)</span> |
| WeightedPool2TokensFactory | <span class="address-link">[0xA5bf2ddF098bb0Ef6d120C98217dD6B141c74EE0](https://etherscan.io/address/0xA5bf2ddF098bb0Ef6d120C98217dD6B141c74EE0)</span> |
| AuthorizerAdaptor          | <span class="address-link">[0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75](https://etherscan.io/address/0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75)</span> |
| LidoRelayer                | <span class="address-link">[0xdcdbf71A870cc60C6F9B621E28a7D3Ffd6Dd4965](https://etherscan.io/address/0xdcdbf71A870cc60C6F9B621E28a7D3Ffd6Dd4965)</span> |
| AaveLinearPoolFactory      | <span class="address-link">[0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8](https://etherscan.io/address/0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8)</span> |
| ERC4626LinearPoolFactory   | <span class="address-link">[0xE061bF85648e9FA7b59394668CfEef980aEc4c66](https://etherscan.io/address/0xE061bF85648e9FA7b59394668CfEef980aEc4c66)</span> |

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
