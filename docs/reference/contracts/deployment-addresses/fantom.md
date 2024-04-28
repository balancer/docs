

# Fantom Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer/balancer-deployments/tree/master/tasks).
:::

## Pool Factories

| Contract   | Address   | Deployment   |
|------------|-----------|--------------|

## Core

| Contract        | Address                                                                                                                    | Deployment                                                                                                                |
|:----------------|:---------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------|
| BalancerQueries | [0x1B0A42663DF1edeA171cD8732d288a81EFfF6d23](https://ftmscan.com//address/0x1B0A42663DF1edeA171cD8732d288a81EFfF6d23#code) | [20220721-balancer-queries](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220721-balancer-queries) |
| Vault           | [0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce](https://ftmscan.com//address/0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                       |

## Authorization

| Contract          | Address                                                                                                                    | Deployment                                                                                                                    |
|:------------------|:---------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------|
| Authorizer        | [0x974D3FF709D84Ba44cde3257C0B5B0b14C081Ce9](https://ftmscan.com//address/0x974D3FF709D84Ba44cde3257C0B5B0b14C081Ce9#code) | [20210418-authorizer](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-authorizer)                 |
| AuthorizerAdaptor | [0xf7D5DcE55E6D47852F054697BAB6A1B48A00ddbd](https://ftmscan.com//address/0xf7D5DcE55E6D47852F054697BAB6A1B48A00ddbd#code) | [20220325-authorizer-adaptor](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220325-authorizer-adaptor) |

## Gauges and Governance

| Contract              | Address                                                                                                                    | Deployment                                                                                          |
|:----------------------|:---------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------|
| ProtocolFeesCollector | [0xC6920d3a369E7c8BD1A22DbE385e11d1F7aF948F](https://ftmscan.com//address/0xC6920d3a369E7c8BD1A22DbE385e11d1F7aF948F#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault) |

## Ungrouped Active/Current Contracts
    
    
| Contract          | Address                                                                                                                    | Deployment                                                                                                                      |
|:------------------|:---------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| BalancerHelpers   | [0x230a59F4d9ADc147480f03B0D3fFfeCd56c3289a](https://ftmscan.com//address/0x230a59F4d9ADc147480f03B0D3fFfeCd56c3289a#code) | [20210418-vault](https://github.com/balancer/balancer-deployments/blob/master/tasks/20210418-vault)                             |
| TestBalancerToken | [0x45fFd460cC6642B8D8Fb12373DFd77Ceb0f4932B](https://ftmscan.com//address/0x45fFd460cC6642B8D8Fb12373DFd77Ceb0f4932B#code) | [20220325-test-balancer-token](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220325-test-balancer-token) |
    
    
# Deprecated Contracts

These deployments were in use at some point, and may still be in active operation, for example in the case of pools created with old factories.  In general it's better to interact with newer versions when possible.

#### If you can only find the contract you are looking for in the deprecated section and it is not an old pool, try checking the deployments tasks to find it or ask in the Discord before using a deprecated contract.

    
No deprecated contracts found

    
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

