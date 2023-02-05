---
order: 11
references:
  - details: BatchSwaps
    link: /reference/swaps/batch-swaps
  - details: SingleSwap
    link: /reference/swaps/single-swap
---

# Swaps

The Vault's design was heavily optimized for swaps with two key points in mind:

1. **Extremely low gas costs**
2. **Flexibility** (i.e. complex paths, joins as part of swap, etc.)

The chart below highlights the results of these design decisions.

::: chart Swap Gas Cost Comparison

```json
{
  "type": "scatter",
  "data": {
    "datasets": [
      {
        "label": "Balancer BatchSwap",
        "data": [
          {
            "x": 1,
            "y": 100000
          },
          {
            "x": 2,
            "y": 135000
          },
          {
            "x": 3,
            "y": 170000
          },
          {
            "x": 4,
            "y": 202000
          },
          {
            "x": 5,
            "y": 240000
          }
        ],
        "backgroundColor": "rgba(54, 162, 235, 0.5)"
      },
      {
        "label": "Uniswap Autorouter",
        "data": [
          {
            "x": 1,
            "y": 150000
          },
          {
            "x": 2,
            "y": 230000
          },
          {
            "x": 3,
            "y": 310000
          },
          {
            "x": 4,
            "y": 390000
          },
          {
            "x": 5,
            "y": 470000
          }
        ],
        "backgroundColor": "rgba(255, 99, 132, 0.5)"
      }
    ]
  },
  "options": {
    "elements": {
      "point": {
        "radius": 8
      }
    },
    "scales": {
      "x": {
        "title": {
          "display": true,
          "text": "Number of Swaps in Path"
        },
        "grid": {
          "display": false
        },
        "ticks": {
          "maxTicksLimit": 5
        },
        "type": "linear",
        "position": "bottom"
      },
      "y": {
        "title": {
          "display": true,
          "text": "Gas Cost"
        },
        "min": 0
      }
    }
  }
}
```

:::

## Swap Types

The Vault has two core types of swaps: Single Swaps and Batch Swaps. As the names imply, Single Swap is used when only trading 2 tokens against a single pool. And Batch Swap, the more commonly used one, allows for multiple hops, paths, and pools. This differentiation allows for the Single Swap to be even more gas optimized and can be as low as 95k for a swap.

::: tip Developer Reference

Developers can check out the [BatchSwap](/reference/swaps/batch-swaps) and [SingleSwap](/reference/swaps/single-swap) reference pages to learn more.

:::
