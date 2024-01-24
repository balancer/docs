---
order: 0
title: Overview
---

# Subgraphs

The Balancer Subgraph indexes data on the Balancer smart contracts with a GraphQL interface. It updates data in response to function calls and contract events to maintain data on the `Vault`, `Pools`, `AssetManagers` etc, to power front-end apps and integrations.

| Network          | Subgraph URL                                                                                                                                                           |
|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Ethereum Mainnet | [https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2](https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2)                                 |
| Polygon          | [https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2](https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2)                 |
| Polygon zkEVM    | [https://api.studio.thegraph.com/query/24660/balancer-polygon-zk-v2/version/latest](https://api.studio.thegraph.com/query/24660/balancer-polygon-zk-v2/version/latest) |
| Arbitrum         | [https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2](https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2)               |
| Optimism         | [https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-optimism-v2](https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-optimism-v2)               |
| Gnosis Chain     | [https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gnosis-chain-v2](https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gnosis-chain-v2)       |
| Avalanche        | [https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-avalanche-v2](https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-avalanche-v2)             |
| Base             | [https://api.studio.thegraph.com/query/24660/balancer-base-v2/version/latest](https://api.studio.thegraph.com/query/24660/balancer-base-v2/version/latest)             |
| Goerli           | [https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-goerli-v2](https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-goerli-v2)                   |
| Sepolia          | [https://api.studio.thegraph.com/query/24660/balancer-sepolia-v2/version/latest](https://api.studio.thegraph.com/query/24660/balancer-sepolia-v2/version/latest)       |

### GraphQL Schema

The schema of GraphQL elements available is defined in [`/schema.graphql` ](https://github.com/balancer/balancer-subgraph-v2/blob/master/schema.graphql)

The data included in this subgraph data layer is the data that is most applicable to the front-end. It aims at the very least to keep track of all the resources in the `Vault` contract, and keep track of basic pool data.

#### Examples

Pools with > $100k liquidity

```graphql
{
  pools(first: 1000, where: { totalLiquidity_gt: 100000 }) {
    address
    tokensList
    totalLiquidity
  }
}
```

Historical liquidity of a pool

```graphql
{
  poolHistoricalLiquidities(
    where: {
      poolId: "0x09253c3554fb7242608ff67ce048918ccf7f9a96000200000000000000000009"
    }
  ) {
    block
    poolLiquidity
  }
}
```

Fetch a Liquidity Provider's shares

```graphql
{
  poolShares(
    first: 1000
    where: {
      userAddress: "0xef8305e140ac520225daf050e2f71d5fbcc543e7"
      balance_gt: 0
    }
  ) {
    balance
    poolId {
      tokensList
      totalShares
    }
  }
}
```

Fetch historical metrics for a given pool

```graphql
{
  poolSnapshots(
    first: 1000
    orderBy: timestamp
    orderDirection: asc
    where: {
      pool: "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014"
    }
  ) {
    amounts
    totalShares
    swapVolume
    swapFees
    liquidity
    pool {
      id
    }
  }
}
```

Find pools that have specific tokens in them (WETH and BAL in this example)

```graphql
{
  pools(
    first: 100
    where: {
      tokensList_contains: [
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        "0xba100000625a3754423978a60c9317c58a424e3D"
      ]
    }
  ) {
    id
    poolType
    poolTypeVersion
  }
}
```
