---
order: 3
references:
  - details: Weighted Math
    link: /reference/math/weighted-math
---

# Weighted Pools

## Overview

Weighted Pools are an extension of the classical $x * y = k$ AMM pools popularized by Uniswap v1. Weighted Pools use [Weighted Math](/reference/math/weighted-math.md), which makes them great for general cases, including tokens that don't necessarily have any price correlation (ex. DAI/WETH). Unlike pools in other AMMs that only provide 50/50 weightings, Balancer Weighted Pools enable users to build pools with more than two tokens and custom weightings, such as pools with 80/20 or 60/20/20 weightings.

::: chart Weighted Pool

```json
{
  "type": "pie",
  "data": {
    "labels": ["WETH", "BAL", "DAI"],
    "datasets": [
      {
        "label": "%",
        "data": [33, 33, 33],
        "backgroundColor": [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)"
        ],
        "borderColor": [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        "borderWidth": 1
      }
    ]
  },
  "options": {}
}
```

:::

## Advantages

### Exposure Control

Weighted Pools allow users to choose their levels of exposure to certain assets while still maintaining the ability to provide liquidity. The higher a token's weight in a pool, the less impermanent loss it will experience in the event of a price surge.

For example if a user wants to provide liquidity for WBTC and WETH, they can choose the weight that most aligns with their strategy. A pool more heavily favoring WBTC implies they expect bigger gains for WBTC, while a pool more heavily favoring WETH implies bigger gains for WETH. An evenly balanced pool is a good choice for assets that are expected to remain proportional in value in the long run.

### Impermanent Loss

[Impermanent Loss](/concepts/advanced/impermanent-loss.md) is the difference in value between holding a set of assets and providing liquidity for those same assets.

For pools that heavily weight one token over another, there is far less impermanent loss, but this doesn't come for free; very asymmetric pools do have higher slippage when making swaps due to the fact that one side has much less liquidity. 80/20 pools have emerged as a happy medium when balancing liquidity an Impermanent Loss mitigation.
