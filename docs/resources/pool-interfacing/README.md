# Pool Interfacing

## Overview

Since there are many different pool types, it's important to note the differences between them when interfacing with Balancer. Some pool use different pricing equations, some have dynamic pricing, and some might have swaps disabled periodically.&#x20;

## `poolId`s

If you want to interface with a pool, you'll first need to know its `poolId`. The `poolId` is a unique identifier, the first portion of which is the pool's contract address. For example, the pool with the id `0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014` has a contract address of `0x5c6ee304399dbdb9c8ef030ab642b10820db8f56`.&#x20;

You can get a `poolId` from:

* A pool's URL: [https://app.balancer.fi/#/pool/0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014](https://app.balancer.fi/#/pool/0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014)
* The [Subgraph](https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-v2)
* Calling `getPoolId()` on the contract itself if you already have it

## Getting Common Pool Data

{% hint style="warning" %}
Below are the data fields common to all pools; however, each pool will have data specific to its pool type.
{% endhint %}

### Pool Balances

Since all tokens are held in the Vault, **you must query the Vault when querying on-chain pool balances**. For example, calling

```
vault.getPoolTokens(0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014_
```

returns something resembling:

```
tokens:  [0xba100000625a3754423978a60c9317c58a424e3D,
                0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2]
                
balances:  [5720903090084350251216632,
                7939247003721636150710]
```

### Swap Fee

Swap fees are stored at the pool level. To get a pool's swap fee, call:

```
pool.getSwapFeePercentage()
```

Values are returned with 18 decimals. At the time of writing, calling this on `0x5c6ee304399dbdb9c8ef030ab642b10820db8f56` returns `500000000000000`, which corresponds to a 0.05% swap fee.&#x20;

#### Some Pools have Dynamic Swap Fees!

If you intend to cache pool data to minimize on-chain calls, be aware that some pools have Dynamic Swap Fees and can change at any moment! The convention for setting static fees is to set the pool owner to the zero address (`0x0000000000000000000000000000000000000000`).

You can query pool owner with:

```
pool.getOwner()
```

### Emergency Pause State

{% hint style="info" %}
Pools are not expected to be paused, so this explanation is listed here out of an abundance of caution. If you're executing trades programmatically, you can avoid transaction failures by first verifying if a pool is paused or not.

**NOTE:** The emergency pause is different from the `swapEnabled` feature on Liquidity Bootstrapping and Managed Pools!
{% endhint %}

When pool factories are first launched, they often have an emergency pause period. The pause period is generally **90 days** from the deployment of the **pool factory**, not the pool itself. In the unlikely case that there is an issue with the pools, trades and pool joins can be paused. **Withdrawals are not paused**, so **users can always exit a pool**.

To check if a pool is paused, calling

```
pool.getPausedState()
```

returns something resembling

```
paused :  False
pauseWindowEndTime :  1627668973
bufferPeriodEndTime :  1630260973
```
