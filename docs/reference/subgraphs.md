# Subgraphs

The Balancer Subgraph indexes data on the Balancer smart contracts with a GraphQL interface.  It updates data in response to function calls and contract events to maintain data on the `Vault`, `Pools`,  `AssetManagers` etc, to power front-end apps and integrations.

{% hint style="warning" %}
Note that Balancer has not yet migrated to the new Subgraph Studio mainnet. Any Balancer subgraphs appearing there should not be considered "official" deployments. Use at your own risk!
{% endhint %}

| Network          | Subgraph URL                                                                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum Mainnet | [https://thegraph.com/legacy-explorer/subgraph/balancer-labs/balancer-v2](https://thegraph.com/legacy-explorer/subgraph/balancer-labs/balancer-v2)                   |
| Polygon          | [https://thegraph.com/legacy-explorer/subgraph/balancer-labs/balancer-polygon-v2](https://thegraph.com/legacy-explorer/subgraph/balancer-labs/balancer-polygon-v2)   |
| Arbitrum         | [https://thegraph.com/legacy-explorer/subgraph/balancer-labs/balancer-arbitrum-v2](https://thegraph.com/legacy-explorer/subgraph/balancer-labs/balancer-arbitrum-v2) |
| Goerli           | [https://thegraph.com/legacy-explorer/subgraph/balancer-labs/balancer-goerli-v2](https://thegraph.com/legacy-explorer/subgraph/balancer-labs/balancer-goerli-v2)     |

### GraphQL Schema

The schema of GraphQL elements available is defined in [`/schema.graphql` ](https://github.com/balancer-labs/balancer-subgraph-v2/blob/master/schema.graphql)

The data included in this subgraph data layer is the data that is most applicable to the front-end. It aims at the very least to keep track of all the resources in the  `Vault` contract, and keep track of basic pool data.

### Querying

{% hint style="info" %}
For an in-depth explanation of how to query the Subgraph, check out the [Balancer Subgraph](../guides/data/balancer-subgraph.md) article in Guides.
{% endhint %}

#### Examples

Pools with > $100k liquidity

```graphql
{
  pools(first: 1000, where: {totalLiquidity_gt: 100000}) {
    address,
    tokensList,
    totalLiquidity
  }
}
```

Historical liquidity of a pool

```graphql
{
  poolHistoricalLiquidities (where: {poolId: "0x09253c3554fb7242608ff67ce048918ccf7f9a96000200000000000000000009"}) {
    block,
    poolLiquidity
  }
 }
```

Fetch a Liquidity Provider's shares

```graphql
{
  poolShares(first: 1000, where: {userAddress: "0xef8305e140ac520225daf050e2f71d5fbcc543e7", balance_gt: 0}) {
    balance
    poolId {
      tokensList,
      totalShares
    }
  }
}
```

Fetch historical metrics for a given pool

```graphql
{
  poolSnapshots(first:1000, orderBy: timestamp, orderDirection: asc, where: {pool: "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014"}) {
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
