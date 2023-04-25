

# Gnosis Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer/balancer-v2-monorepo/tree/master/pkg/deployments/tasks) section of the monorepo.
:::

## Pool Factories

| Contract                         | Address                                                                                                                     | Deployment                                                                                                                                                  |
|:---------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| WeightedPoolFactory (v4)         | [0x6CaD2ea22BFA7F4C14Aae92E47F510Cd5C509bc7](https://gnosisscan.io/address/0x6CaD2ea22BFA7F4C14Aae92E47F510Cd5C509bc7#code) | [20230320-weighted-pool-v4](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230320-weighted-pool-v4)                   |
| ComposableStablePoolFactory (v4) | [0xD87F44Df0159DC78029AB9CA7D7e57E7249F5ACD](https://gnosisscan.io/address/0xD87F44Df0159DC78029AB9CA7D7e57E7249F5ACD#code) | [20230320-composable-stable-pool-v4](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230320-composable-stable-pool-v4) |
| ManagedPoolFactory (v2)          | [0xDF9B5B00Ef9bca66e9902Bd813dB14e4343Be025](https://gnosisscan.io/address/0xDF9B5B00Ef9bca66e9902Bd813dB14e4343Be025#code) | [20230411-managed-pool-v2](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230411-managed-pool-v2)                     |

## Core

| Contract                       | Address                                                                                                                     | Deployment                                                                                                                                                                  |
|:-------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Vault                          | [0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://gnosisscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8#code) | [20210418-vault](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20210418-vault)                                                         |
| ProtocolFeePercentagesProvider | [0x41B953164995c11C81DA73D212ED8Af25741b7Ac](https://gnosisscan.io/address/0x41B953164995c11C81DA73D212ED8Af25741b7Ac#code) | [20220725-protocol-fee-percentages-provider](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220725-protocol-fee-percentages-provider) |
| BatchRelayerLibrary            | [0xb9aD3466cdd42015cc05d4804DC68D562b6a2065](https://gnosisscan.io/address/0xb9aD3466cdd42015cc05d4804DC68D562b6a2065#code) | [20230314-batch-relayer-v5](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230314-batch-relayer-v5)                                   |
| BalancerRelayer                | [0x3536fD480CA495Ac91E698A703248A8915c137a3](https://gnosisscan.io/address/0x3536fD480CA495Ac91E698A703248A8915c137a3#code) | [20230314-batch-relayer-v5](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230314-batch-relayer-v5)                                   |
| BalancerQueries                | [0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e](https://gnosisscan.io/address/0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e#code) | [20220721-balancer-queries](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220721-balancer-queries)                                   |

## Authorization

| Contract                    | Address                                                                                                                     | Deployment                                                                                                                                                          |
|:----------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AuthorizerAdaptor           | [0x5aDDCCa35b7A0D07C74063c48700C8590E87864E](https://gnosisscan.io/address/0x5aDDCCa35b7A0D07C74063c48700C8590E87864E#code) | [20220325-authorizer-adaptor](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220325-authorizer-adaptor)                       |
| AuthorizerAdaptorEntrypoint | [0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75](https://gnosisscan.io/address/0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75#code) | [20221124-authorizer-adaptor-entrypoint](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20221124-authorizer-adaptor-entrypoint) |

## Gauges and Governance

| Contract               | Address                                                                                                                     | Deployment                                                                                                                                                        |
|:-----------------------|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ChildChainGaugeFactory | [0x83E443EF4f9963C77bd860f94500075556668cb8](https://gnosisscan.io/address/0x83E443EF4f9963C77bd860f94500075556668cb8#code) | [20230316-child-chain-gauge-factory-v2](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230316-child-chain-gauge-factory-v2) |
# Deprecated Contracts

These deployments were in use at some point, and may still be in active operation, for example in the case of pools created with old factories.  In general it's better to interact with newer versions when possible.

#### If you can only find the contract you are looking for in the deprecated section and it is not an old pool, try checking the deployments tasks to find it or ask in the Discord before using a deprecated contract.

    
| Contract                      | Address                                                                                                                     | Deployment                                                                                                                                                            |
|:------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ComposableStablePoolFactory   | [0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD](https://gnosisscan.io/address/0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD#code) | [20230206-composable-stable-pool-v3](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230206-composable-stable-pool-v3)           |
| MockComposableStablePool      | [0x07c896050dD6E273c199f06d7516F8A4A369d23A](https://gnosisscan.io/address/0x07c896050dD6E273c199f06d7516F8A4A369d23A#code) | [20230206-composable-stable-pool-v3](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230206-composable-stable-pool-v3)           |
| BatchRelayerLibrary           | [0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8](https://gnosisscan.io/address/0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8#code) | [20220916-batch-relayer-v4](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220916-batch-relayer-v4)                             |
| BalancerRelayer               | [0xeF606F58A4FD0fCcb066c6203d0994694d3eB2D3](https://gnosisscan.io/address/0xeF606F58A4FD0fCcb066c6203d0994694d3eB2D3#code) | [20220916-batch-relayer-v4](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220916-batch-relayer-v4)                             |
| ComposableStablePoolFactory   | [0x76578ecf9a141296Ec657847fb45B0585bCDa3a6](https://gnosisscan.io/address/0x76578ecf9a141296Ec657847fb45B0585bCDa3a6#code) | [20221122-composable-stable-pool-v2](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20221122-composable-stable-pool-v2)           |
| MockComposableStablePool      | [0x707B7d4a1bAe449d546DCAb869256591bbB3d70b](https://gnosisscan.io/address/0x707B7d4a1bAe449d546DCAb869256591bbB3d70b#code) | [20221122-composable-stable-pool-v2](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20221122-composable-stable-pool-v2)           |
| UnbuttonAaveLinearPoolFactory | [0x4fb47126Fa83A8734991E41B942Ac29A3266C968](https://gnosisscan.io/address/0x4fb47126Fa83A8734991E41B942Ac29A3266C968#code) | [20220425-unbutton-aave-linear-pool](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220425-unbutton-aave-linear-pool)           |
| WeightedPoolFactory           | [0xC128a9954e6c874eA3d62ce62B468bA073093F25](https://gnosisscan.io/address/0xC128a9954e6c874eA3d62ce62B468bA073093F25#code) | [20230206-weighted-pool-v3](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230206-weighted-pool-v3)                             |
| MockWeightedPool              | [0xE051605A83dEAe38d26a7346B100EF1AC2ef8a0b](https://gnosisscan.io/address/0xE051605A83dEAe38d26a7346B100EF1AC2ef8a0b#code) | [20230206-weighted-pool-v3](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230206-weighted-pool-v3)                             |
| WeightedPoolFactory           | [0xf302f9F50958c5593770FDf4d4812309fF77414f](https://gnosisscan.io/address/0xf302f9F50958c5593770FDf4d4812309fF77414f#code) | [20220908-weighted-pool-v2](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220908-weighted-pool-v2)                             |
| AaveLinearPoolFactory         | [0x9dA18982a33FD0c7051B19F0d7C76F2d5E7e017c](https://gnosisscan.io/address/0x9dA18982a33FD0c7051B19F0d7C76F2d5E7e017c#code) | [20230206-aave-rebalanced-linear-pool-v4](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230206-aave-rebalanced-linear-pool-v4) |
| MockAaveLendingPool           | [0x81cFAE226343B24BA12EC6521Db2C79E7aeeb310](https://gnosisscan.io/address/0x81cFAE226343B24BA12EC6521Db2C79E7aeeb310#code) | [20230206-aave-rebalanced-linear-pool-v4](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230206-aave-rebalanced-linear-pool-v4) |
| MockStaticAToken              | [0xa523f47A933D5020b23629dDf689695AA94612Dc](https://gnosisscan.io/address/0xa523f47A933D5020b23629dDf689695AA94612Dc#code) | [20230206-aave-rebalanced-linear-pool-v4](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230206-aave-rebalanced-linear-pool-v4) |
| MockAaveLinearPool            | [0x225E0047671939A8d78e08EBd692788Abe63f15c](https://gnosisscan.io/address/0x225E0047671939A8d78e08EBd692788Abe63f15c#code) | [20230206-aave-rebalanced-linear-pool-v4](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20230206-aave-rebalanced-linear-pool-v4) |
| ERC4626LinearPoolFactory      | [0x4132f7AcC9dB7A6cF7BE2Dd3A9DC8b30C7E6E6c8](https://gnosisscan.io/address/0x4132f7AcC9dB7A6cF7BE2Dd3A9DC8b30C7E6E6c8#code) | [20220404-erc4626-linear-pool-v2](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220404-erc4626-linear-pool-v2)                 |
| StablePoolFactory             | [0xf23b4DB826DbA14c0e857029dfF076b1c0264843](https://gnosisscan.io/address/0xf23b4DB826DbA14c0e857029dfF076b1c0264843#code) | [20220609-stable-pool-v2](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20220609-stable-pool-v2)                                 |
| AaveLinearPoolFactory         | [0x9dd5Db2d38b50bEF682cE532bCca5DfD203915E1](https://gnosisscan.io/address/0x9dd5Db2d38b50bEF682cE532bCca5DfD203915E1#code) | [20221207-aave-rebalanced-linear-pool-v3](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20221207-aave-rebalanced-linear-pool-v3) |
| MockAaveLendingPool           | [0x9805dcfD25e6De36bad8fe9D3Fe2c9b44B764102](https://gnosisscan.io/address/0x9805dcfD25e6De36bad8fe9D3Fe2c9b44B764102#code) | [20221207-aave-rebalanced-linear-pool-v3](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20221207-aave-rebalanced-linear-pool-v3) |
| MockStaticAToken              | [0x5cF4928a3205728bd12830E1840F7DB85c62a4B9](https://gnosisscan.io/address/0x5cF4928a3205728bd12830E1840F7DB85c62a4B9#code) | [20221207-aave-rebalanced-linear-pool-v3](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20221207-aave-rebalanced-linear-pool-v3) |
| MockAaveLinearPool            | [0x581Ec1f5e7CeD12B186deaE32256AdB53BDd5B08](https://gnosisscan.io/address/0x581Ec1f5e7CeD12B186deaE32256AdB53BDd5B08#code) | [20221207-aave-rebalanced-linear-pool-v3](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/deployments/tasks/20221207-aave-rebalanced-linear-pool-v3) |
<style scoped>
table {
    display: table;
    width: 100%;
}
table th:first-of-type, td:first-of-type {
    width: 25%;
}
table th:nth-of-type(2) {
    width: 40%;
}
td {
    max-width: 0;
    overflow: hidden;
}
</style>

