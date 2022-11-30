---
description: >-
  In this subsection, we explain the needed steps to obtain all relevant data to
  calculate the LM APR for a given gauge
---

# Data Fetching

## 1. **Obtain the current gauge allowlist from the front-end repo**

The easiest way to obtain the current gauge allowlist is by referencing the Balancer labs front-end repo **** [**pools allowlist**](https://github.com/balancer-labs/frontend-v2/blob/develop/src/constants/pools.ts)****

This repository contains the pool addresses that have been allowlisted by our governance process to receive gauge votes. This configuration is currently undergoing weekly changes.

The allowlisted pools are referenced in the Allowlist of the Stakable entry such as

```javascript
Stakable: {
    AllowList: [
      '0x06df3b2bbb68adc8b0e302443692037ed9f91b42000000000000000000000063',
      '0x072f14b85add63488ddad88f855fda4a99d6ac9b000200000000000000000027',
      '0x0b09dea16768f0799065c475be02919503cb2a3500020000000000000000001a',
      '0x186084ff790c65088ba694df11758fae4943ee9e000200000000000000000013',
      '0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112',
      ]
}
```

## **2. Obtain the working supply for a given gauge by reading its Vyper contract fields**

In this first step, we are obtaining the so called “working supply” from the underlying gauge Vyper contracts. We can obtain this value by cross-referencing the poolId from the gauge allowlist with the [Balancer Gauge Subgraph](https://thegraph.com/hosted-service/subgraph/balancer-labs/balancer-gauges).

You can obtain a list of all liquidity gauges by using following query

```graphql
{
  votingEscrows {
    stakedSupply
  }
  liquidityGauges {
    symbol
    poolAddressjav
    poolId
    totalSupply
    id
    shares {
      balance
    }
  }
}
```

**An example response can consist of following entries, here an example of the D2D-gauge:**

```
"symbol": "50N/A-50N/A-gauge",
"poolAddress": "0x8f4205e1604133d1875a3e771ae7e4f2b0865639",
"poolId": "0x8f4205e1604133d1875a3e771ae7e4f2b086563900020000000000000000010e",
"totalSupply": "179736.932086272708683666",
"id": "0xc43d32bc349cea7e0fe829f53e26096c184756fa",
......
```

This data can now be used to cross-reference the `poolId` with the VyperContract ID, which is needed for the next step of obtaining the `working_supply` of the corresponding gauge. For demonstration purposes we show how to read the data on Etherscan. You can use any preferred method such as [ethers](https://docs.ethers.io/v5/) to read the relevant contract data on your front-end.

### Read vyperContract data for gauge

[Etherscan link](https://etherscan.io/address/0xc43d32bc349cea7e0fe829f53e26096c184756fa)

**Javascript example with ethers**

```javascript
import { ethers } from "ethers";
//Load contract ABI -> can be extracted from etherscan
import vyperABI from './vyperABI.json'
//Create a provider instance
const provider = new ethers.providers.InfuraProvider("homestead" ,'YOUR_API_KEY');
//Instantiate vyper contract
 const vyperContract = new ethers.Contract(
    "0xc43d32bc349cea7e0fe829f53e26096c184756fa",
    vyperABI,
    provider
  );
let resp = 0;
let working_supply = 0
resp = await vyperContract.working_supply();
if (resp > 0) {
   working_supply = ethers.utils.formatEther(resp);
}
```

## **3. Obtain the relative weight for each gauge via the gauge controller contract**

This step utilizes the gauge controller contract to obtain the currently active gauge weight for a given gauge

{% hint style="info" %}
**The gauge subgraph does not store historical vote allocations. Only the currently running vote round and the previous votes are stored. It is therefore not possible to infer historical metrics from the balancer-gauges subgraph endpoint. Alternative methods like Dune queries can be used to obtain historical gauge data. More details about historical votes can be found** [**here**](https://dune.com/balancerlabs/veBAL-Analysis)
{% endhint %}

The following list shows the gauge controller contracts for each chain:

| Chain    | Gauge Controller Contract ID                   |
| -------- | ---------------------------------------------- |
| Mainnet  | **0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD** |
| Polygon  | -                                              |
| Arbitrum | -                                              |
| Optimism | -                                              |

To obtain the currently active relative voting weight, read the `gauge_relative_weight` field. \
You can cross-reference your results with the [**veBAL voting Dune dashboard**](https://app.balancer.fi/#/vebal)

## **4. Infer the price per Balancer Pool Token (BPT) price from the balancer-v2 subgraph**

We will now calculate the price per Balancer Pool Token (BPT) by obtaining the relevant pool data from the balancer-v2-subgraph and cross-referencing it with up-to-date price data

{% hint style="info" %}
**The balancer-v2 subgraph has a field “totalLiquidity” for the corresponding balancer pools. Please do not use this value for APR calculations as it infers price data from internal pricingAssets that are not always up-to-date. Therefore it is crucial to calculate the TVL and corresponding price per BPT via external pricing providers such as CoinGecko**
{% endhint %}

**Query Balancer pool data from the** [**balancer-v2 subgraph endpoint**](https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2/graphql)****

```graphql
{
  balancers(first: 500) {
    id
    pools(first: 500) {
      name
      totalLiquidity
      totalShares
      poolType
      tokens {
        symbol
        id
        balance
        weight
      }
      id
    }
    totalLiquidity
  }
}
```

The response should contain a list of all pools. Alternatively you can apply a filter on the query instead of “first 500” based on the gauge allowlist to only obtain the relevant pool-set.

You need following data to infer the price per BPT

* totalShares
* tokens
* an external pricing service provider like Coingecko

To calculate the price per BPT, do the following

$$
pricePerBPT = \frac{\sum(token_i * priceOfToken_i)}{totalShares}
$$

## 5. Fetch the current BAL price

Fetch the current price of BAL with your favourite pricing service provider. The easiest and free method is through the CoinGecko API such as

```javascript
const bal_mainnet_token_id = '0xba100000625a3754423978a60c9317c58a424e3d' 
fetch('https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + bal_mainnet_token_id + '%2C&vs_currencies=usd');
```

