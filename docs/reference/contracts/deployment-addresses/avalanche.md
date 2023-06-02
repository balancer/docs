

# Avalanche Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer/balancer-deployments/tree/master/tasks).
:::

## Pool Factories

| Contract                         | Address                                                                                                                     | Deployment                                                                                                                                  |
|:---------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| AaveLinearPoolFactory (v5)       | [0x6caf662b573F577DE01165d2d38D1910bba41F8A](https://snowtrace.io//address/0x6caf662b573F577DE01165d2d38D1910bba41F8A#code) | [20230410-aave-linear-pool-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230410-aave-linear-pool-v5)             |
| ComposableStablePoolFactory (v4) | [0x3B1eb8EB7b43882b385aB30533D9A2BeF9052a98](https://snowtrace.io//address/0x3B1eb8EB7b43882b385aB30533D9A2BeF9052a98#code) | [20230320-composable-stable-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230320-composable-stable-pool-v4) |
| ERC4626LinearPoolFactory (v4)    | [0x4507d91Cd2C0D51D9B4F30Bf0B93AFC938A70BA5](https://snowtrace.io//address/0x4507d91Cd2C0D51D9B4F30Bf0B93AFC938A70BA5#code) | [20230409-erc4626-linear-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230409-erc4626-linear-pool-v4)       |
| ManagedPoolFactory (v2)          | [0x03F3Fb107e74F2EAC9358862E91ad3c692712054](https://snowtrace.io//address/0x03F3Fb107e74F2EAC9358862E91ad3c692712054#code) | [20230411-managed-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230411-managed-pool-v2)                     |
| WeightedPoolFactory (v4)         | [0x230a59F4d9ADc147480f03B0D3fFfeCd56c3289a](https://snowtrace.io//address/0x230a59F4d9ADc147480f03B0D3fFfeCd56c3289a#code) | [20230320-weighted-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230320-weighted-pool-v4)                   |

## Core

| Contract                       | Address                                                                                                                     | Deployment                                                                                                                                                  |
|:-------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BalancerQueries                | [0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD](https://snowtrace.io//address/0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD#code) | [20220721-balancer-queries](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220721-balancer-queries)                                   |
| BalancerRelayer                | [0x03F1ab8b19bcE21EB06C364aEc9e40322572a1e9](https://snowtrace.io//address/0x03F1ab8b19bcE21EB06C364aEc9e40322572a1e9#code) | [20230314-batch-relayer-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230314-batch-relayer-v5)                                   |
| BatchRelayerLibrary            | [0x45fFd460cC6642B8D8Fb12373DFd77Ceb0f4932B](https://snowtrace.io//address/0x45fFd460cC6642B8D8Fb12373DFd77Ceb0f4932B#code) | [20230314-batch-relayer-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230314-batch-relayer-v5)                                   |
| ProtocolFeePercentagesProvider | [0x239e55F427D44C3cc793f49bFB507ebe76638a2b](https://snowtrace.io//address/0x239e55F427D44C3cc793f49bFB507ebe76638a2b#code) | [20220725-protocol-fee-percentages-provider](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220725-protocol-fee-percentages-provider) |
| Vault                          | [0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://snowtrace.io//address/0xBA12222222228d8Ba445958a75a0704d566BF2C8#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                                         |

## Authorization

| Contract                        | Address                                                                                                                     | Deployment                                                                                                                                          |
|:--------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| Authorizer                      | [0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6](https://snowtrace.io//address/0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6#code) | [20210418-authorizer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-authorizer)                                       |
| AuthorizerAdaptor               | [0xdAE7e32ADc5d490a43cCba1f0c736033F2b4eFca](https://snowtrace.io//address/0xdAE7e32ADc5d490a43cCba1f0c736033F2b4eFca#code) | [20220325-authorizer-adaptor](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220325-authorizer-adaptor)                       |
| AuthorizerAdaptorEntrypoint     | [0x4E7bBd911cf1EFa442BC1b2e9Ea01ffE785412EC](https://snowtrace.io//address/0x4E7bBd911cf1EFa442BC1b2e9Ea01ffE785412EC#code) | [20221124-authorizer-adaptor-entrypoint](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221124-authorizer-adaptor-entrypoint) |
| AuthorizerWithAdaptorValidation | [0x8df317a729fcaA260306d7de28888932cb579b88](https://snowtrace.io//address/0x8df317a729fcaA260306d7de28888932cb579b88#code) | [20230414-authorizer-wrapper](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230414-authorizer-wrapper)                       |

## Gauges and Governance

| Contract                        | Address                                                                                                                     | Deployment                                                                                                                                          |
|:--------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| ChildChainGauge                 | [0x4b7b369989e613ff2C65768B7Cf930cC927F901E](https://snowtrace.io//address/0x4b7b369989e613ff2C65768B7Cf930cC927F901E#code) | [20230316-child-chain-gauge-factory-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-child-chain-gauge-factory-v2)   |
| ChildChainGaugeFactory          | [0x161f4014C27773840ccb4EC1957113e6DD028846](https://snowtrace.io//address/0x161f4014C27773840ccb4EC1957113e6DD028846#code) | [20230316-child-chain-gauge-factory-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-child-chain-gauge-factory-v2)   |
| ChildChainGaugeRewardHelper     | [0x2E96068b3D5B5BAE3D7515da4A1D2E52d08A2647](https://snowtrace.io//address/0x2E96068b3D5B5BAE3D7515da4A1D2E52d08A2647#code) | [20220812-child-chain-reward-helper](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220812-child-chain-reward-helper)         |
| ChildChainGaugeTokenAdder       | [0xf302f9F50958c5593770FDf4d4812309fF77414f](https://snowtrace.io//address/0xf302f9F50958c5593770FDf4d4812309fF77414f#code) | [20220527-child-chain-gauge-token-adder](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220527-child-chain-gauge-token-adder) |
| ChildChainLiquidityGaugeFactory | [0xb08E16cFc07C684dAA2f93C70323BAdb2A6CBFd2](https://snowtrace.io//address/0xb08E16cFc07C684dAA2f93C70323BAdb2A6CBFd2#code) | [20220413-child-chain-gauge-factory](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220413-child-chain-gauge-factory)         |
| ChildChainStreamer              | [0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8](https://snowtrace.io//address/0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8#code) | [20220413-child-chain-gauge-factory](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220413-child-chain-gauge-factory)         |
| DistributionScheduler           | [0xC128a9954e6c874eA3d62ce62B468bA073093F25](https://snowtrace.io//address/0xC128a9954e6c874eA3d62ce62B468bA073093F25#code) | [20220707-distribution-scheduler](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220707-distribution-scheduler)               |
| L2LayerZeroBridgeForwarder      | [0x4638ab64022927C9bD5947607459D13f57f1551C](https://snowtrace.io//address/0x4638ab64022927C9bD5947607459D13f57f1551C#code) | [20230404-l2-layer0-bridge-forwarder](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230404-l2-layer0-bridge-forwarder)       |
| ProtocolFeesCollector           | [0xce88686553686DA562CE7Cea497CE749DA109f9F](https://snowtrace.io//address/0xce88686553686DA562CE7Cea497CE749DA109f9F#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                                 |
| ProtocolFeesWithdrawer          | [0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75](https://snowtrace.io//address/0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75#code) | [20220517-protocol-fee-withdrawer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220517-protocol-fee-withdrawer)             |
| RewardsOnlyGauge                | [0x41B953164995c11C81DA73D212ED8Af25741b7Ac](https://snowtrace.io//address/0x41B953164995c11C81DA73D212ED8Af25741b7Ac#code) | [20220413-child-chain-gauge-factory](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220413-child-chain-gauge-factory)         |
| VotingEscrowDelegationProxy     | [0x0c6052254551EAe3ECac77B01DFcf1025418828f](https://snowtrace.io//address/0x0c6052254551EAe3ECac77B01DFcf1025418828f#code) | [20230316-l2-ve-delegation-proxy](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-ve-delegation-proxy)               |

## Ungrouped Active/Current Contracts
    
    
| Contract                                       | Address                                                                                                                     | Deployment                                                                                                                                  |
|:-----------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| BAL                                            | [0x8239a6b877804206c7799028232a7188da487cec](https://snowtrace.io//address/0x8239a6b877804206c7799028232a7188da487cec#code) | [00000000-tokens](https://github.com/balancer/balancer-deployments/blob/master/tasks/00000000-tokens)                                       |
| BalancerHelpers                                | [0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9](https://snowtrace.io//address/0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                         |
| L2BalancerPseudoMinter                         | [0xEa924b45a3fcDAAdf4E5cFB1665823B8F8F2039B](https://snowtrace.io//address/0xEa924b45a3fcDAAdf4E5cFB1665823B8F8F2039B#code) | [20230316-l2-balancer-pseudo-minter](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-balancer-pseudo-minter) |
| NoProtocolFeeLiquidityBootstrappingPoolFactory | [0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e](https://snowtrace.io//address/0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e#code) | [20211202-no-protocol-fee-lbp](https://github.com/balancer/balancer-deployments/blob/master/tasks/20211202-no-protocol-fee-lbp)             |
| NullVotingEscrow                               | [0x6B1Da720Be2D11d95177ccFc40A917c2688f396c](https://snowtrace.io//address/0x6B1Da720Be2D11d95177ccFc40A917c2688f396c#code) | [20230316-l2-ve-delegation-proxy](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-ve-delegation-proxy)       |
| WETH                                           | [0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7](https://snowtrace.io//address/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7#code) | [00000000-tokens](https://github.com/balancer/balancer-deployments/blob/master/tasks/00000000-tokens)                                       |
    
    
# Deprecated Contracts

These deployments were in use at some point, and may still be in active operation, for example in the case of pools created with old factories.  In general it's better to interact with newer versions when possible.

#### If you can only find the contract you are looking for in the deprecated section and it is not an old pool, try checking the deployments tasks to find it or ask in the Discord before using a deprecated contract.

    
| Contract                 | Address                                                                                                                     | Deployment                                                                                                                |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------|
| BalancerRelayer (v4)     | [0x9A7b723101ba5A4672960A3b65840AB3b7805048](https://snowtrace.io//address/0x9A7b723101ba5A4672960A3b65840AB3b7805048#code) | [20220916-batch-relayer-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220916-batch-relayer-v4) |
| BatchRelayerLibrary (v4) | [0x6f5a2eE11E7a772AeB5114A20d0D7c0ff61EB8A0](https://snowtrace.io//address/0x6f5a2eE11E7a772AeB5114A20d0D7c0ff61EB8A0#code) | [20220916-batch-relayer-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220916-batch-relayer-v4) |
| MockWeightedPool (v3)    | [0xE867AD0a48e8f815DC0cda2CDb275e0F163A480b](https://snowtrace.io//address/0xE867AD0a48e8f815DC0cda2CDb275e0F163A480b#code) | [20230206-weighted-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-weighted-pool-v3) |
| WeightedPoolFactory (v3) | [0x94f68b54191F62f781Fe8298A8A5Fa3ed772d227](https://snowtrace.io//address/0x94f68b54191F62f781Fe8298A8A5Fa3ed772d227#code) | [20230206-weighted-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-weighted-pool-v3) |
    
<style scoped>
table {
    display: table;
    width: 100%;
}
table th:first-of-type, td:first-of-type {
    width: 30%;
}
table th:nth-of-type(2) {
    width: 40%;
}
td {
    max-width: 0;
    overflow: hidden;
}
</style>

