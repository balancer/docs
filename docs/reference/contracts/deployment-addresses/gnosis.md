

# Gnosis Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer/balancer-deployments/tree/master/tasks).
:::

## Pool Factories

| Contract                         | Address                                                                                                                     | Deployment                                                                                                                                  |
|:---------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| AaveLinearPoolFactory (v5)       | [0x62aaB12865d7281048c337D53a4dde9d770321E6](https://gnosisscan.io/address/0x62aaB12865d7281048c337D53a4dde9d770321E6#code) | [20230410-aave-linear-pool-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230410-aave-linear-pool-v5)             |
| ComposableStablePoolFactory (v6) | [0x47B489bf5836f83ABD928C316F8e39bC0587B020](https://gnosisscan.io/address/0x47B489bf5836f83ABD928C316F8e39bC0587B020#code) | [20240223-composable-stable-pool-v6](https://github.com/balancer/balancer-deployments/blob/master/tasks/20240223-composable-stable-pool-v6) |
| ManagedPoolFactory (v2)          | [0xDF9B5B00Ef9bca66e9902Bd813dB14e4343Be025](https://gnosisscan.io/address/0xDF9B5B00Ef9bca66e9902Bd813dB14e4343Be025#code) | [20230411-managed-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230411-managed-pool-v2)                     |
| WeightedPoolFactory (v4)         | [0x6CaD2ea22BFA7F4C14Aae92E47F510Cd5C509bc7](https://gnosisscan.io/address/0x6CaD2ea22BFA7F4C14Aae92E47F510Cd5C509bc7#code) | [20230320-weighted-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230320-weighted-pool-v4)                   |

## Core

| Contract                       | Address                                                                                                                     | Deployment                                                                                                                                                  |
|:-------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BalancerQueries                | [0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e](https://gnosisscan.io/address/0x0F3e0c4218b7b0108a3643cFe9D3ec0d4F57c54e#code) | [20220721-balancer-queries](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220721-balancer-queries)                                   |
| BalancerRelayer                | [0xd488810DaAdD52C5892663FEA4e0bcb71eF744cB](https://gnosisscan.io/address/0xd488810DaAdD52C5892663FEA4e0bcb71eF744cB#code) | [20230712-child-chain-gauge-checkpointer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230712-child-chain-gauge-checkpointer)       |
| BalancerRelayer (v6)           | [0x2163c2FcD0940e84B8a68991bF926eDfB0Cd926C](https://gnosisscan.io/address/0x2163c2FcD0940e84B8a68991bF926eDfB0Cd926C#code) | [20231031-batch-relayer-v6](https://github.com/balancer/balancer-deployments/blob/master/tasks/20231031-batch-relayer-v6)                                   |
| BatchRelayerLibrary            | [0x1702067424096F07A60e62cceE3dE9420068492D](https://gnosisscan.io/address/0x1702067424096F07A60e62cceE3dE9420068492D#code) | [20230712-child-chain-gauge-checkpointer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230712-child-chain-gauge-checkpointer)       |
| BatchRelayerLibrary (v6)       | [0x8eA89804145c007e7D226001A96955ad53836087](https://gnosisscan.io/address/0x8eA89804145c007e7D226001A96955ad53836087#code) | [20231031-batch-relayer-v6](https://github.com/balancer/balancer-deployments/blob/master/tasks/20231031-batch-relayer-v6)                                   |
| ProtocolFeePercentagesProvider | [0x41B953164995c11C81DA73D212ED8Af25741b7Ac](https://gnosisscan.io/address/0x41B953164995c11C81DA73D212ED8Af25741b7Ac#code) | [20220725-protocol-fee-percentages-provider](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220725-protocol-fee-percentages-provider) |
| Vault                          | [0xBA12222222228d8Ba445958a75a0704d566BF2C8](https://gnosisscan.io/address/0xBA12222222228d8Ba445958a75a0704d566BF2C8#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                                         |

## Authorization

| Contract                        | Address                                                                                                                     | Deployment                                                                                                                                          |
|:--------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| Authorizer                      | [0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6](https://gnosisscan.io/address/0xA331D84eC860Bf466b4CdCcFb4aC09a1B43F3aE6#code) | [20210418-authorizer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-authorizer)                                       |
| AuthorizerAdaptor               | [0x5aDDCCa35b7A0D07C74063c48700C8590E87864E](https://gnosisscan.io/address/0x5aDDCCa35b7A0D07C74063c48700C8590E87864E#code) | [20220325-authorizer-adaptor](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220325-authorizer-adaptor)                       |
| AuthorizerAdaptorEntrypoint     | [0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75](https://gnosisscan.io/address/0x8F42aDBbA1B16EaAE3BB5754915E0D06059aDd75#code) | [20221124-authorizer-adaptor-entrypoint](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221124-authorizer-adaptor-entrypoint) |
| AuthorizerWithAdaptorValidation | [0x03F3Fb107e74F2EAC9358862E91ad3c692712054](https://gnosisscan.io/address/0x03F3Fb107e74F2EAC9358862E91ad3c692712054#code) | [20230414-authorizer-wrapper](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230414-authorizer-wrapper)                       |

## Gauges and Governance

| Contract                        | Address                                                                                                                     | Deployment                                                                                                                                          |
|:--------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| ChildChainGauge (v2)            | [0x96484f2aBF5e58b15176dbF1A799627B53F13B6d](https://gnosisscan.io/address/0x96484f2aBF5e58b15176dbF1A799627B53F13B6d#code) | [20230316-child-chain-gauge-factory-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-child-chain-gauge-factory-v2)   |
| ChildChainGaugeFactory (v2)     | [0x83E443EF4f9963C77bd860f94500075556668cb8](https://gnosisscan.io/address/0x83E443EF4f9963C77bd860f94500075556668cb8#code) | [20230316-child-chain-gauge-factory-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-child-chain-gauge-factory-v2)   |
| ChildChainGaugeRewardHelper     | [0xf7D5DcE55E6D47852F054697BAB6A1B48A00ddbd](https://gnosisscan.io/address/0xf7D5DcE55E6D47852F054697BAB6A1B48A00ddbd#code) | [20220812-child-chain-reward-helper](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220812-child-chain-reward-helper)         |
| ChildChainGaugeTokenAdder       | [0x1802953277FD955f9a254B80Aa0582f193cF1d77](https://gnosisscan.io/address/0x1802953277FD955f9a254B80Aa0582f193cF1d77#code) | [20220527-child-chain-gauge-token-adder](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220527-child-chain-gauge-token-adder) |
| ChildChainLiquidityGaugeFactory | [0x809B79b53F18E9bc08A961ED4678B901aC93213a](https://gnosisscan.io/address/0x809B79b53F18E9bc08A961ED4678B901aC93213a#code) | [20220413-child-chain-gauge-factory](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220413-child-chain-gauge-factory)         |
| ChildChainStreamer              | [0x230a59F4d9ADc147480f03B0D3fFfeCd56c3289a](https://gnosisscan.io/address/0x230a59F4d9ADc147480f03B0D3fFfeCd56c3289a#code) | [20220413-child-chain-gauge-factory](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220413-child-chain-gauge-factory)         |
| L2LayerZeroBridgeForwarder      | [0xeb151668006CD04DAdD098AFd0a82e78F77076c3](https://gnosisscan.io/address/0xeb151668006CD04DAdD098AFd0a82e78F77076c3#code) | [20230404-l2-layer0-bridge-forwarder](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230404-l2-layer0-bridge-forwarder)       |
| ProtocolFeesCollector           | [0xce88686553686DA562CE7Cea497CE749DA109f9F](https://gnosisscan.io/address/0xce88686553686DA562CE7Cea497CE749DA109f9F#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                                 |
| ProtocolFeesWithdrawer          | [0xdAE7e32ADc5d490a43cCba1f0c736033F2b4eFca](https://gnosisscan.io/address/0xdAE7e32ADc5d490a43cCba1f0c736033F2b4eFca#code) | [20220517-protocol-fee-withdrawer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220517-protocol-fee-withdrawer)             |
| RewardsOnlyGauge                | [0x45fFd460cC6642B8D8Fb12373DFd77Ceb0f4932B](https://gnosisscan.io/address/0x45fFd460cC6642B8D8Fb12373DFd77Ceb0f4932B#code) | [20220413-child-chain-gauge-factory](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220413-child-chain-gauge-factory)         |
| VeBoostV2 (v2)                  | [0x5DbAd78818D4c8958EfF2d5b95b28385A22113Cd](https://gnosisscan.io/address/0x5DbAd78818D4c8958EfF2d5b95b28385A22113Cd#code) | [20230525-l2-veboost-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230525-l2-veboost-v2)                                 |
| VotingEscrowDelegationProxy     | [0x7A2535f5fB47b8e44c02Ef5D9990588313fe8F05](https://gnosisscan.io/address/0x7A2535f5fB47b8e44c02Ef5D9990588313fe8F05#code) | [20230316-l2-ve-delegation-proxy](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-ve-delegation-proxy)               |

## Ungrouped Active/Current Contracts
    
    
| Contract                                       | Address                                                                                                                     | Deployment                                                                                                                                              |
|:-----------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| BalancerHelpers                                | [0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9](https://gnosisscan.io/address/0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                                                     |
| BatchRelayerQueryLibrary (v6)                  | [0x884976294666ccF6dd61006BBcDafe74ca889504](https://gnosisscan.io/address/0x884976294666ccF6dd61006BBcDafe74ca889504#code) | [20231031-batch-relayer-v6](https://github.com/balancer/balancer-deployments/blob/master/tasks/20231031-batch-relayer-v6)                               |
| ChainlinkRateProviderFactory                   | [0xDB8d758BCb971e482B2C45f7F8a7740283A1bd3A](https://gnosisscan.io/address/0xDB8d758BCb971e482B2C45f7F8a7740283A1bd3A#code) | [20230717-chainlink-rate-provider-factory](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230717-chainlink-rate-provider-factory) |
| GaugeWorkingBalanceHelper                      | [0x682f0dDBFd41D1272982f64a499Fb62d80e27589](https://gnosisscan.io/address/0x682f0dDBFd41D1272982f64a499Fb62d80e27589#code) | [20230526-gauge-working-balance-helper](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230526-gauge-working-balance-helper)       |
| L2BalancerPseudoMinter                         | [0xA8920455934Da4D853faac1f94Fe7bEf72943eF1](https://gnosisscan.io/address/0xA8920455934Da4D853faac1f94Fe7bEf72943eF1#code) | [20230316-l2-balancer-pseudo-minter](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-balancer-pseudo-minter)             |
| NoProtocolFeeLiquidityBootstrappingPoolFactory | [0x85a80afee867aDf27B50BdB7b76DA70f1E853062](https://gnosisscan.io/address/0x85a80afee867aDf27B50BdB7b76DA70f1E853062#code) | [20211202-no-protocol-fee-lbp](https://github.com/balancer/balancer-deployments/blob/master/tasks/20211202-no-protocol-fee-lbp)                         |
| NullVotingEscrow                               | [0x013D4382F291be5688AFBcc741Ee8A24C66B2C92](https://gnosisscan.io/address/0x013D4382F291be5688AFBcc741Ee8A24C66B2C92#code) | [20230316-l2-ve-delegation-proxy](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230316-l2-ve-delegation-proxy)                   |
| ProtocolIdRegistry                             | [0x6B5dA774890Db7B7b96C6f44e6a4b0F657399E2e](https://gnosisscan.io/address/0x6B5dA774890Db7B7b96C6f44e6a4b0F657399E2e#code) | [20230223-protocol-id-registry](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230223-protocol-id-registry)                       |
    
    
# Deprecated Contracts

These deployments were in use at some point, and may still be in active operation, for example in the case of pools created with old factories.  In general it's better to interact with newer versions when possible.

#### If you can only find the contract you are looking for in the deprecated section and it is not an old pool, try checking the deployments tasks to find it or ask in the Discord before using a deprecated contract.

    
| Contract                         | Address                                                                                                                     | Deployment                                                                                                                                            |
|:---------------------------------|:----------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| AaveLinearPoolFactory (v3)       | [0x9dd5Db2d38b50bEF682cE532bCca5DfD203915E1](https://gnosisscan.io/address/0x9dd5Db2d38b50bEF682cE532bCca5DfD203915E1#code) | [20221207-aave-rebalanced-linear-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221207-aave-rebalanced-linear-pool-v3) |
| AaveLinearPoolFactory (v4)       | [0x9dA18982a33FD0c7051B19F0d7C76F2d5E7e017c](https://gnosisscan.io/address/0x9dA18982a33FD0c7051B19F0d7C76F2d5E7e017c#code) | [20230206-aave-rebalanced-linear-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-aave-rebalanced-linear-pool-v4) |
| BalancerRelayer (v4)             | [0xeF606F58A4FD0fCcb066c6203d0994694d3eB2D3](https://gnosisscan.io/address/0xeF606F58A4FD0fCcb066c6203d0994694d3eB2D3#code) | [20220916-batch-relayer-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220916-batch-relayer-v4)                             |
| BalancerRelayer (v5)             | [0x3536fD480CA495Ac91E698A703248A8915c137a3](https://gnosisscan.io/address/0x3536fD480CA495Ac91E698A703248A8915c137a3#code) | [20230314-batch-relayer-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230314-batch-relayer-v5)                             |
| BatchRelayerLibrary (v4)         | [0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8](https://gnosisscan.io/address/0xD7FAD3bd59D6477cbe1BE7f646F7f1BA25b230f8#code) | [20220916-batch-relayer-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220916-batch-relayer-v4)                             |
| BatchRelayerLibrary (v5)         | [0xb9aD3466cdd42015cc05d4804DC68D562b6a2065](https://gnosisscan.io/address/0xb9aD3466cdd42015cc05d4804DC68D562b6a2065#code) | [20230314-batch-relayer-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230314-batch-relayer-v5)                             |
| ComposableStablePoolFactory (v2) | [0x76578ecf9a141296Ec657847fb45B0585bCDa3a6](https://gnosisscan.io/address/0x76578ecf9a141296Ec657847fb45B0585bCDa3a6#code) | [20221122-composable-stable-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221122-composable-stable-pool-v2)           |
| ComposableStablePoolFactory (v3) | [0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD](https://gnosisscan.io/address/0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD#code) | [20230206-composable-stable-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-composable-stable-pool-v3)           |
| ComposableStablePoolFactory (v4) | [0xD87F44Df0159DC78029AB9CA7D7e57E7249F5ACD](https://gnosisscan.io/address/0xD87F44Df0159DC78029AB9CA7D7e57E7249F5ACD#code) | [20230320-composable-stable-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230320-composable-stable-pool-v4)           |
| ComposableStablePoolFactory (v5) | [0x4bdCc2fb18AEb9e2d281b0278D946445070EAda7](https://gnosisscan.io/address/0x4bdCc2fb18AEb9e2d281b0278D946445070EAda7#code) | [20230711-composable-stable-pool-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230711-composable-stable-pool-v5)           |
| ERC4626LinearPoolFactory (v2)    | [0x4132f7AcC9dB7A6cF7BE2Dd3A9DC8b30C7E6E6c8](https://gnosisscan.io/address/0x4132f7AcC9dB7A6cF7BE2Dd3A9DC8b30C7E6E6c8#code) | [20220404-erc4626-linear-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220404-erc4626-linear-pool-v2)                 |
| MockAaveLendingPool (v3)         | [0x9805dcfD25e6De36bad8fe9D3Fe2c9b44B764102](https://gnosisscan.io/address/0x9805dcfD25e6De36bad8fe9D3Fe2c9b44B764102#code) | [20221207-aave-rebalanced-linear-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221207-aave-rebalanced-linear-pool-v3) |
| MockAaveLendingPool (v4)         | [0x81cFAE226343B24BA12EC6521Db2C79E7aeeb310](https://gnosisscan.io/address/0x81cFAE226343B24BA12EC6521Db2C79E7aeeb310#code) | [20230206-aave-rebalanced-linear-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-aave-rebalanced-linear-pool-v4) |
| MockAaveLinearPool (v3)          | [0x581Ec1f5e7CeD12B186deaE32256AdB53BDd5B08](https://gnosisscan.io/address/0x581Ec1f5e7CeD12B186deaE32256AdB53BDd5B08#code) | [20221207-aave-rebalanced-linear-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221207-aave-rebalanced-linear-pool-v3) |
| MockAaveLinearPool (v4)          | [0x225E0047671939A8d78e08EBd692788Abe63f15c](https://gnosisscan.io/address/0x225E0047671939A8d78e08EBd692788Abe63f15c#code) | [20230206-aave-rebalanced-linear-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-aave-rebalanced-linear-pool-v4) |
| MockComposableStablePool (v2)    | [0x707B7d4a1bAe449d546DCAb869256591bbB3d70b](https://gnosisscan.io/address/0x707B7d4a1bAe449d546DCAb869256591bbB3d70b#code) | [20221122-composable-stable-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221122-composable-stable-pool-v2)           |
| MockComposableStablePool (v3)    | [0x07c896050dD6E273c199f06d7516F8A4A369d23A](https://gnosisscan.io/address/0x07c896050dD6E273c199f06d7516F8A4A369d23A#code) | [20230206-composable-stable-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-composable-stable-pool-v3)           |
| MockComposableStablePool (v4)    | [0xf3678A0b54C61ccD88Ce321c2e07f87aC75F08B9](https://gnosisscan.io/address/0xf3678A0b54C61ccD88Ce321c2e07f87aC75F08B9#code) | [20230320-composable-stable-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230320-composable-stable-pool-v4)           |
| MockComposableStablePool (v5)    | [0xa359b6BB0a89ED9f237C83f32fF05c658DA8b3aB](https://gnosisscan.io/address/0xa359b6BB0a89ED9f237C83f32fF05c658DA8b3aB#code) | [20230711-composable-stable-pool-v5](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230711-composable-stable-pool-v5)           |
| MockStaticAToken (v3)            | [0x5cF4928a3205728bd12830E1840F7DB85c62a4B9](https://gnosisscan.io/address/0x5cF4928a3205728bd12830E1840F7DB85c62a4B9#code) | [20221207-aave-rebalanced-linear-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20221207-aave-rebalanced-linear-pool-v3) |
| MockStaticAToken (v4)            | [0xa523f47A933D5020b23629dDf689695AA94612Dc](https://gnosisscan.io/address/0xa523f47A933D5020b23629dDf689695AA94612Dc#code) | [20230206-aave-rebalanced-linear-pool-v4](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-aave-rebalanced-linear-pool-v4) |
| MockWeightedPool (v3)            | [0xE051605A83dEAe38d26a7346B100EF1AC2ef8a0b](https://gnosisscan.io/address/0xE051605A83dEAe38d26a7346B100EF1AC2ef8a0b#code) | [20230206-weighted-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-weighted-pool-v3)                             |
| StablePoolFactory (v2)           | [0xf23b4DB826DbA14c0e857029dfF076b1c0264843](https://gnosisscan.io/address/0xf23b4DB826DbA14c0e857029dfF076b1c0264843#code) | [20220609-stable-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220609-stable-pool-v2)                                 |
| UnbuttonAaveLinearPoolFactory    | [0x4fb47126Fa83A8734991E41B942Ac29A3266C968](https://gnosisscan.io/address/0x4fb47126Fa83A8734991E41B942Ac29A3266C968#code) | [20220425-unbutton-aave-linear-pool](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220425-unbutton-aave-linear-pool)           |
| WeightedPoolFactory (v2)         | [0xf302f9F50958c5593770FDf4d4812309fF77414f](https://gnosisscan.io/address/0xf302f9F50958c5593770FDf4d4812309fF77414f#code) | [20220908-weighted-pool-v2](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220908-weighted-pool-v2)                             |
| WeightedPoolFactory (v3)         | [0xC128a9954e6c874eA3d62ce62B468bA073093F25](https://gnosisscan.io/address/0xC128a9954e6c874eA3d62ce62B468bA073093F25#code) | [20230206-weighted-pool-v3](https://github.com/balancer/balancer-deployments/blob/master/tasks/20230206-weighted-pool-v3)                             |
    
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

