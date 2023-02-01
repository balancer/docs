# Querying

Below are some sample queries you can use to gather information from the Balancer contracts.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

## Get first 5 of voting escrow

```graphql
{
  votingEscrows(first: 5) {
    id
    stakedSupply
    locks {
      id
    }
  }
  votingEscrowLocks(first: 5) {
    id
    user {
      id
    }
    unlockTime
    lockedBalance
  }
}
```
