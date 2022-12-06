# calcSpotPrice

Find Spot Price for pair in specific pool.

```js
const balancer = new BalancerSDK(sdkConfig);
const pool = await balancer.pools.find(poolId);
const spotPrice = await pool.calcSpotPrice(
  ADDRESSES[network].DAI.address,
  ADDRESSES[network].BAL.address
);
```
