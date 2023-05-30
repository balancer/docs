---
order: 4
guides:
  - details: Get Spot Price of Pool
    link: /guides/arbitrageurs/get-spot-price.md
---

# Pricing

Spot Price functionality allowing user to query spot price for token pair.

### calcSpotPrice

Find Spot Price for pair in specific pool.

```js
const balancer = new BalancerSDK(sdkConfig);
const pool = await balancer.pools.find(poolId);
const spotPrice = await pool.calcSpotPrice(
  ADDRESSES[network].DAI.address,
  ADDRESSES[network].BAL.address
);
```

### getSpotPrice

Find Spot Price for a token pair - finds most liquid path and uses this as reference SP.

```js
const pricing = new Pricing(sdkConfig);
```



```js
/**
 * @param { string } tokenIn Token in address.
 * @param { string } tokenOut Token out address.
 * @param { SubgraphPoolBase[] } pools Optional - Pool data. Will be fetched via dataProvider if not supplied.
 * @returns { string } Spot price.
**/
async getSpotPrice(
    tokenIn: string,
    tokenOut: string,
    pools: SubgraphPoolBase[] = []
): Promise<string>
```
