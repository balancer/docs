---
order: 11
---
# Swaps

TODO

::: chart Swap Gas Cost Comparison

```json
{
  "type": "scatter",
  "data": {
    "datasets": [{
      "label": "BatchSwap",
      "data": [{
        "x": 1,
        "y": 100000
      }, {
        "x": 2,
        "y": 135000
      }, {
        "x": 3,
        "y": 170000
      }, {
        "x": 4,
        "y": 202000
      }, {
        "x": 5,
        "y": 240000
      }],
      "backgroundColor": "rgba(54, 162, 235, 0.5)"
    },{
      "label": "Multiple Single Swaps on Balancer/Uniswap",
      "data": [{
        "x": 1,
        "y": 96000
      }, {
        "x": 2,
        "y": 195000
      }, {
        "x": 3,
        "y": 290000
      }, {
        "x": 4,
        "y": 380000
      }, {
        "x": 5,
        "y": 480000
      }],
      "backgroundColor": "rgba(255, 99, 132, 0.5)"
    }]
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
        }
      }
    }
  }
}
```

:::