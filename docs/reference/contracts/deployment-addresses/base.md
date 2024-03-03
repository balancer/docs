

# Base Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer/balancer-deployments/tree/master/tasks).
:::

## Pool Factories

| Contract                         | Address                                                                                                                     | Deployment                                                                                                                                  |
|:---------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| AaveLinearPoolFactory (v5)       | [0x687b8C9b41E01Be8B591725fac5d5f52D0564d79](https://basescan.org//address/0x687b8C9b41E01Be8B591725fac5d5f52D0564d79#code) | [20230410-aave-linear-pool-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230410-aave-linear-pool-v5)             |
| ComposableStablePoolFactory (v6) | [0x956CCab09898C0AF2aCa5e6C229c3aD4E93d9288](https://basescan.org//address/0x956CCab09898C0AF2aCa5e6C229c3aD4E93d9288#code) | [20240223-composable-stable-pool-v6](https://github.com/balancer/balancer-deployments/blob/master/tasks/20240223-composable-stable-pool-v6) |
| ERC4626LinearPoolFactory (v4)    | [0x161f4014C27773840ccb4EC1957113e6DD028846](https://basescan.org//address/0x161f4014C27773840ccb4EC1957113e6DD028846#code) | [20230409-erc4626-linear-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230409-erc4626-linear-pool-v4)       |
| GearboxLinearPoolFactory (v2)    | [0x9Dd32684176638D977883448A4c914311c07bd62](https://basescan.org//address/0x9Dd32684176638D977883448A4c914311c07bd62#code) | [20230409-gearbox-linear-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230409-gearbox-linear-pool-v2)       |
| ManagedPoolFactory (v2)          | [0x9a62C91626d39D0216b3959112f9D4678E20134d](https://basescan.org//address/0x9a62C91626d39D0216b3959112f9D4678E20134d#code) | [20230411-managed-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230411-managed-pool-v2)                     |
| WeightedPoolFactory (v4)         | [0x4C32a8a8fDa4E24139B51b456B42290f51d6A1c4](https://basescan.org//address/0x4C32a8a8fDa4E24139B51b456B42290f51d6A1c4#code) | [20230320-weighted-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230320-weighted-pool-v4)                   |
| YearnLinearPoolFactory (v2)      | [0x44d33798dddCdAbc93Fe6a40C80588033Dc502d3](https://basescan.org//address/0x44d33798dddCdAbc93Fe6a40C80588033Dc502d3#code) | [20230409-yearn-linear-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230409-yearn-linear-pool-v2)           |

## Core

| Contract                       | Address                                                                                                                     | Deployment                                                                                                                                                  |
|:-------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BalancerQueries                | [0x300Ab2038EAc391f26D9F895dc61F8F66a548833](https://basescan.org//address/0x300Ab2038EAc391f26D9F895dc61F8F66a548833#code) | [20220721-balancer-queries](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220721-balancer-queries)                                   |
| BalancerRelayer                | [0x7B25d5712fB49627534012327E46455b3fF7b26C](https://basescan.org//address/0x7B25d5712fB49627534012327E46455b3fF7b26C#code) | [20230712-child-chain-gauge-checkpointer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230712-child-chain-gauge-checkpointer)       |
| BalancerRelayer (v6)           | [0x7C3C773C878d2238a9b64d8CEE02377BF07ED06a](https://basescan.org//address/0x7C3C773C878d2238a9b64d8CEE02377BF07ED06a#code) | [20231031-batch-relayer-v6](https://github.com/balancer/balancer-deployments/blob/master/tasks/20231031-batch-relayer-v6)                                   |
| BatchRelayerLibrary            | [0xaf779e58dafb4307b998C7b3C9D3f788DFc80632](https://basescan.org//address/0xaf779e58dafb4307b998C7b3C9D3f788DFc80632#code) | [20230712-child-chain-gauge-checkpointer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230712-child-chain-gauge-checkpointer)       |
| BatchRelayerLibrary (v6)       | [0x82416Ce6eA7dD4923d4A3ED70a79B4A432a382C4](https://basescan.org//address/0x82416Ce6eA7dD4923d4A3ED70a79B4A432a382C4#code) | [20231031-batch-relayer-v6](https://github.com/balancer/balancer-deployments/blob/master/tasks/20231031-batch-relayer-v6)                                   |
| ProtocolFeePercentagesProvider | [0xDEd7Fef7D8eCdcB74F22f0169e1A9EC696e6695d](https://basescan.org//address/0xDEd7Fef7D8eCdcB74F22f0169e1A9EC696e6695d#code) | [20220725-protocol-fee-percentages-provider](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220725-protocol-fee-percentages-provider) |
| Vault                          | [0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://basescan.org//address/0xBA12222222228d8Ba445958a75a0704d566BF2C8#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                                         |

## Authorization

| Contract                        | Address                                                                                                                     | Deployment                                                                                                                                          |
|:--------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| Authorizer                      | [0x809B79b53F18E9bc08A961ED4678B901aC93213a](https://basescan.org//address/0x809B79b53F18E9bc08A961ED4678B901aC93213a#code) | [20210418-authorizer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-authorizer)                                       |
| AuthorizerAdaptor               | [0x6CaD2ea22BFA7F4C14Aae92E47F510Cd5C509bc7](https://basescan.org//address/0x6CaD2ea22BFA7F4C14Aae92E47F510Cd5C509bc7#code) | [20220325-authorizer-adaptor](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220325-authorizer-adaptor)                       |
| AuthorizerAdaptorEntrypoint     | [0x9129E834e15eA19b6069e8f08a8EcFc13686B8dC](https://basescan.org//address/0x9129E834e15eA19b6069e8f08a8EcFc13686B8dC#code) | [20221124-authorizer-adaptor-entrypoint](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221124-authorizer-adaptor-entrypoint) |
| AuthorizerWithAdaptorValidation | [0xA69E0Ccf150a29369D8Bbc0B3f510849dB7E8EEE](https://basescan.org//address/0xA69E0Ccf150a29369D8Bbc0B3f510849dB7E8EEE#code) | [20230414-authorizer-wrapper](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230414-authorizer-wrapper)                       |

## Gauges and Governance

| Contract                    | Address                                                                                                                     | Deployment                                                                                                                                        |
|:----------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------|
| ChildChainGauge (v2)        | [0x9f7E65887413a8497b87bA2058cE6E4Ef4B37013](https://basescan.org//address/0x9f7E65887413a8497b87bA2058cE6E4Ef4B37013#code) | [20230316-child-chain-gauge-factory-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-child-chain-gauge-factory-v2) |
| ChildChainGaugeFactory (v2) | [0xb1a4FE1C6d25a0DDAb47431A92A723dd71d9021f](https://basescan.org//address/0xb1a4FE1C6d25a0DDAb47431A92A723dd71d9021f#code) | [20230316-child-chain-gauge-factory-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-child-chain-gauge-factory-v2) |
| L2LayerZeroBridgeForwarder  | [0x8eA89804145c007e7D226001A96955ad53836087](https://basescan.org//address/0x8eA89804145c007e7D226001A96955ad53836087#code) | [20230404-l2-layer0-bridge-forwarder](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230404-l2-layer0-bridge-forwarder)     |
| ProtocolFeesCollector       | [0xce88686553686DA562CE7Cea497CE749DA109f9F](https://basescan.org//address/0xce88686553686DA562CE7Cea497CE749DA109f9F#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                               |
| ProtocolFeesWithdrawer      | [0xAcf05BE5134d64d150d153818F8C67EE36996650](https://basescan.org//address/0xAcf05BE5134d64d150d153818F8C67EE36996650#code) | [20220517-protocol-fee-withdrawer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220517-protocol-fee-withdrawer)           |
| VeBoostV2 (v2)              | [0xE42FFA682A26EF8F25891db4882932711D42e467](https://basescan.org//address/0xE42FFA682A26EF8F25891db4882932711D42e467#code) | [20230525-l2-veboost-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230525-l2-veboost-v2)                               |
| VotingEscrowDelegationProxy | [0xD87F44Df0159DC78029AB9CA7D7e57E7249F5ACD](https://basescan.org//address/0xD87F44Df0159DC78029AB9CA7D7e57E7249F5ACD#code) | [20230316-l2-ve-delegation-proxy](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-ve-delegation-proxy)             |

## Ungrouped Active/Current Contracts
    
    
| Contract                                       | Address                                                                                                                     | Deployment                                                                                                                                              |
|:-----------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| BalancerHelpers                                | [0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9](https://basescan.org//address/0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                                     |
| BatchRelayerQueryLibrary (v6)                  | [0x41f59C2B8a4d16dBbd900162450FB2B3Bf35cDa6](https://basescan.org//address/0x41f59C2B8a4d16dBbd900162450FB2B3Bf35cDa6#code) | [20231031-batch-relayer-v6](https://github.com/balancer/balancer-deployments/blob/master/tasks/20231031-batch-relayer-v6)                               |
| ChainlinkRateProviderFactory                   | [0x0A973B6DB16C2ded41dC91691Cc347BEb0e2442B](https://basescan.org//address/0x0A973B6DB16C2ded41dC91691Cc347BEb0e2442B#code) | [20230717-chainlink-rate-provider-factory](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230717-chainlink-rate-provider-factory) |
| GaugeWorkingBalanceHelper                      | [0xa7d524046ef89de9F8e4f2d7B029f66cCB738d48](https://basescan.org//address/0xa7d524046ef89de9F8e4f2d7B029f66cCB738d48#code) | [20230526-gauge-working-balance-helper](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230526-gauge-working-balance-helper)       |
| L2BalancerPseudoMinter                         | [0x0c5538098EBe88175078972F514C9e101D325D4F](https://basescan.org//address/0x0c5538098EBe88175078972F514C9e101D325D4F#code) | [20230316-l2-balancer-pseudo-minter](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-balancer-pseudo-minter)             |
| MockLiquidityBootstrappingPool                 | [0x71528afe250438e184b2deAF7947f0f45931DF3b](https://basescan.org//address/0x71528afe250438e184b2deAF7947f0f45931DF3b#code) | [20211202-no-protocol-fee-lbp](https://github.com/balancer/balancer-deployments/blob/master/tasks/20211202-no-protocol-fee-lbp)                         |
| NoProtocolFeeLiquidityBootstrappingPoolFactory | [0x0c6052254551EAe3ECac77B01DFcf1025418828f](https://basescan.org//address/0x0c6052254551EAe3ECac77B01DFcf1025418828f#code) | [20211202-no-protocol-fee-lbp](https://github.com/balancer/balancer-deployments/blob/master/tasks/20211202-no-protocol-fee-lbp)                         |
| NullVotingEscrow                               | [0x475D18169BE8a89357A9ee3Ab00ca386d20fA229](https://basescan.org//address/0x475D18169BE8a89357A9ee3Ab00ca386d20fA229#code) | [20230316-l2-ve-delegation-proxy](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-ve-delegation-proxy)                   |
| ProtocolIdRegistry                             | [0x682f0dDBFd41D1272982f64a499Fb62d80e27589](https://basescan.org//address/0x682f0dDBFd41D1272982f64a499Fb62d80e27589#code) | [20230223-protocol-id-registry](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230223-protocol-id-registry)                       |
| TestBalancerToken                              | [0xA1Fa945425eD2e08Acb932E000bCc2f21B21588A](https://basescan.org//address/0xA1Fa945425eD2e08Acb932E000bCc2f21B21588A#code) | [20220325-test-balancer-token](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220325-test-balancer-token)                         |
    
    
# Deprecated Contracts

These deployments were in use at some point, and may still be in active operation, for example in the case of pools created with old factories.  In general it's better to interact with newer versions when possible.

#### If you can only find the contract you are looking for in the deprecated section and it is not an old pool, try checking the deployments tasks to find it or ask in the Discord before using a deprecated contract.

    
| Contract                         | Address                                                                                                                     | Deployment                                                                                                                                  |
|:---------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| BalancerRelayer (v5)             | [0x76f7204B62f554b79d444588EDac9dfA7032c71a](https://basescan.org//address/0x76f7204B62f554b79d444588EDac9dfA7032c71a#code) | [20230314-batch-relayer-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230314-batch-relayer-v5)                   |
| BatchRelayerLibrary (v5)         | [0xDF9B5B00Ef9bca66e9902Bd813dB14e4343Be025](https://basescan.org//address/0xDF9B5B00Ef9bca66e9902Bd813dB14e4343Be025#code) | [20230314-batch-relayer-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230314-batch-relayer-v5)                   |
| ComposableStablePoolFactory (v5) | [0x8df317a729fcaA260306d7de28888932cb579b88](https://basescan.org//address/0x8df317a729fcaA260306d7de28888932cb579b88#code) | [20230711-composable-stable-pool-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230711-composable-stable-pool-v5) |
| MockComposableStablePool (v5)    | [0x7F6E9d6a4093Af9d09bAE92d24bfE42Fc5369aE6](https://basescan.org//address/0x7F6E9d6a4093Af9d09bAE92d24bfE42Fc5369aE6#code) | [20230711-composable-stable-pool-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230711-composable-stable-pool-v5) |
    
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

