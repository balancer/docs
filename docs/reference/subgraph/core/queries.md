# Querying

Below are some sample queries you can use to gather information from the Balancer contracts.

For an in-depth explanation of how to query the Subgraph, check out the [Balancer Subgraph](../guides/data/balancer-subgraph.md) article in Guides.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

## Pools with >$100k liquidity

```graphql
{
  pools(first: 1000, where: { totalLiquidity_gt: 100000 }) {
    address
    tokensList
    totalLiquidity
  }
}
```

## Historical liquidity of a pool

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

## Fetch a Liquidity Provider's shares

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

## Fetch historical metrics for a given pool

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
