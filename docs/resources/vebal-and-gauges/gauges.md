# Gauges

## How do I get a Gauge for a Given Mainnet Pool?

The easiest way is to query `getPoolGauge(poolAddress)` on the [`LiquidityGaugeFactory`](https://etherscan.io/address/0x4E7bBd911cf1EFa442BC1b2e9Ea01ffE785412EC#code).

![Example query for bb-b-USD](<../../.gitbook/assets/Screen Shot 2022-04-27 at 11.07.35 AM.png>)

## How do I get a Gauge for a Given Pool on an alternate chain?

To get a gauge, query `getPoolGauge(poolAddress)` on the given network's `ChildChainLiquidityGaugeFactory`**.**

| Network  | ChildChainLiquidityGaugeFactory                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Polygon  | ``[`0x3b8cA519122CdD8efb272b0D3085453404B25bD0`](https://polygonscan.com/address/0x3b8cA519122CdD8efb272b0D3085453404B25bD0#code)`` |
| Arbitrum | ``[`0xb08E16cFc07C684dAA2f93C70323BAdb2A6CBFd2`](https://arbiscan.io/address/0xb08E16cFc07C684dAA2f93C70323BAdb2A6CBFd2#code)``     |

![Example Call on Polygon](<../../.gitbook/assets/Screen Shot 2022-04-27 at 11.25.09 AM.png>)

## How to Query Pending Tokens for a Given Pool?

The process differs slightly depending on if we're on Ethereum mainnet or an alternate network (ie Polygon, Arbitrum). No matter the network though, we need to first start at the relevant subgraph:

* [Ethereum Gauges Subgraph](https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges)&#x20;
* [Polygon Gauges Subgraph](https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges-polygon)
* [Arbitrum Gauges Subgraph](https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges-arbitrum)

### Example

Let's start with the [bb-a-USD pool](https://app.balancer.fi/#/pool/0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe) on Ethereum

`0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe`

#### Query the Gauges Subgraph:

```
{
liquidityGauges(where:{
    poolId: "0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe"
  })
  {
    id
  }
}
```

#### Result:

```
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

{% hint style="warning" %}
On Polygon and Arbitrum, the Gauges treat BAL the same as any other "reward" token, therefore instead of calling `claimable_tokens` __ on those networks, you will use `claimable_rewards` __ and pass in that network's BAL address.
{% endhint %}

## How to Claim Pending Tokens for a Given Pool?

### Mainnet Ethereum

Use the [`claim_rewards()`](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ethereum/LiquidityGaugeV5.vy#L440-L450) function on the pool's gauge contract.

```python
def claim_rewards(_addr: address = msg.sender, _receiver: address = ZERO_ADDRESS):
    """
    @notice Claim available reward tokens for `_addr`
    @param _addr Address to claim for
    @param _receiver Address to transfer rewards to - if set to
                     ZERO_ADDRESS, uses the default reward receiver
                     for the caller
    """
    if _receiver != ZERO_ADDRESS:
        assert _addr == msg.sender  # dev: cannot redirect when claiming for another user
    self._checkpoint_rewards(_addr, self.totalSupply, True, _receiver)
```

### Child Chains (L2, Sidechains, etc)

Use the [`get_rewards()`](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/gauges/ChildChainStreamer.vy#L139-L148) function on the pool's streamer contract.

```python
def get_reward():
    """
    @notice Claim pending rewards for `reward_receiver`
    """
    last_update: uint256 = self.last_update_time
    for token in self.reward_tokens:
        if token == ZERO_ADDRESS:
            break
        self._update_reward(token, last_update)
    self.last_update_time = block.timestamp
```

## What Tokens Exist for a Certain Gauge?

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

{% hint style="warning" %}
Be aware that if there are no tokens other than BAL for a given Gauge, the tokens array will come back empty.
{% endhint %}
