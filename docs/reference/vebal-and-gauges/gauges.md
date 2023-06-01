# Gauges

## Query Gauge by Mainnet Pool

The easiest way is to query `getPoolGauge(poolAddress)` on the [`LiquidityGaugeFactory`](https://etherscan.io/address/0x4E7bBd911cf1EFa442BC1b2e9Ea01ffE785412EC#code).

## Query Gauge by L2/Sidechain Pool

To get a gauge, query `getPoolGauge(poolAddress)` on the given network's `ChildChainLiquidityGaugeFactory`**.**

| Network  | ChildChainLiquidityGaugeFactory                                                                                                                                   |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Polygon  | <span class="address-link">[`0x3b8cA519122CdD8efb272b0D3085453404B25bD0`](https://polygonscan.com/address/0x3b8cA519122CdD8efb272b0D3085453404B25bD0#code)</span> |
| Arbitrum | <span class="address-link">[`0xb08E16cFc07C684dAA2f93C70323BAdb2A6CBFd2`](https://arbiscan.io/address/0xb08E16cFc07C684dAA2f93C70323BAdb2A6CBFd2#code)</span>     |

## Query Pending Tokens for a Given Pool

The process differs slightly depending on if we're on Ethereum mainnet or an alternate network (ie Polygon, Arbitrum). No matter the network though, we need to first start at the relevant subgraph:

- [Ethereum Gauges Subgraph](https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges)
- [Polygon Gauges Subgraph](https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges-polygon)
- [Arbitrum Gauges Subgraph](https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges-arbitrum)

### Example

Let's start with the [bb-a-USD pool](https://app.balancer.fi/#/pool/0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe) on Ethereum

`0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe`

#### Query the Gauges Subgraph:

```graphql
{
  liquidityGauges(
    where: {
      poolId: "0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe"
    }
  ) {
    id
  }
}
```

#### Result:

```json
{
  "data": {
    "liquidityGauges": [
      {
        "id": "0x68d019f64a7aa97e2d4e7363aee42251d08124fb"
      }
    ]
  }
}
```

Now that we have our Gauge contract address, we can query what the pending tokens are with the following pseudocode:

```
gaugeAddress="0x68d019f64a7aa97e2d4e7363aee42251d08124fb";
userAddress=<yourAddress>;
gaugeAbi=<loadTheGaugeAbi>;
gauge=contract(gaugeAddress, gaugeAbi)

// How to get pending BAL **ONLY ON MAINNET**
pendingBAL = gauge.claimable_tokens(userAddress).call();

// How to get pending tokens
tokenAddress=<someTokenAddress>;
pendingToken = gauge.claimable_rewards(userAddress, tokenAddress).call();
```

::: warning L2 Gauges
On Polygon and Arbitrum, the Gauges treat BAL the same as any other liquidity mining token, therefore instead of calling `claimable_tokens` __ on those networks, you will use `claimable_rewards` __ and pass in that network's BAL address.
:::

## Claim Pending Tokens for a Pool

### Mainnet Ethereum

Use the [`claim_rewards()`](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ethereum/LiquidityGaugeV5.vy#L440-L450) function on the pool's gauge contract.

### Child Chains (L2, Sidechains, etc)

Use the [`get_rewards()`](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ChildChainStreamer.vy#L139-L148) function on the pool's streamer contract.

## Query Tokens for a Gauge

### Sample Query

```
{
liquidityGauges(where:{
    poolId: "0x32296969ef14eb0c6d29669c550d4a0449130230000200000000000000000080"
  })
  {
    id
    tokens {
      id
      symbol
      decimals
      totalDeposited
    }
  }
}
```

### Sample Response

```
{
  "data": {
    "liquidityGauges": [
      {
        "id": "0xcd4722b7c24c29e0413bdcd9e51404b4539d14ae",
        "tokens": [
          {
            "id": "0x5a98fcbea516cf06857215779fd812ca3bef1b32-0xcd4722b7c24c29e0413bdcd9e51404b4539d14ae",
            "symbol": "LDO",
            "decimals": 18,
            "totalDeposited": "150000"
          }
        ]
      }
    ]
  }
}
```

::: warning
Be aware that if there are no tokens other than BAL for a given Gauge, the tokens array will come back empty.
:::
