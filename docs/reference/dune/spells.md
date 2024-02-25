---
order: 2
---

# Spells

## Introduction

Unlock the power of Balancer data with our meticulously crafted Dune Spells!
Balancer Labs' data team is dedicated to the relentless pursuit of excellence, continuously refining and updating our Dune Spells to deliver the most accurate, insightful, and up-to-date analytics for the Balancer community.


## Explore the Spellbook

Embark on your journey through the world of Balancer's data by exploring our Spellbook. Visit [https://github.com/duneanalytics/spellbook/tree/main/models/balancer](https://github.com/duneanalytics/spellbook/tree/main/models/balancer) to delve into the intricacies of our models, gaining access to the very spells that empower your understanding of Balancer's ecosystem.

**Here are the updated dashboards:**

| Spell                                                                                                 | Description                                                                                                                                | Upstream Spells                                   | Chains                                          |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------ |
| [balancer_trades](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/balancer_trades.sql) | All trades on Balancer, with information on date, tx_hash, tx_from, tx_to, tokens, amounts, version of Balancer in which the trade happened, the pool and its respective swap fee | balancer_v1_ethereum_trades, balancer_v2_[chain]_trades | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_liquidity](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/balancer_liquidity.sql) | Daily liquidity information for balancer pools, by each token contained in a pool. It is also divided in pool_liquidity_[currency], which also includes BPTs (Balancer Pool Tokens) balances and protocol_liquidity_[currency], which excludes BPTs. | balancer_v1_ethereum_liquidity, balancer_v2_[chain]_liquidity | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_pools_fees](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/balancer_pools_fees.sql) | Balancer v2 swap fees stored at the pool level, including information on the transaction where the fee was set.                          | balancer_v2_[chain]_pools_fees                     | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_protocol_fees](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/balancer_protocol_fees.sql) | Daily Protocol Fee collected and Revenue by pool and token.                          | balancer_v2_[chain]_protocol_fees                     | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_bpt_supply](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/balancer_bpt_supply.sql) | Daily BPT supply                                                                                  | balancer_v2_[chain]_bpt_supply                    | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_bpt_prices](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/balancer_bpt_prices.sql) | Balancer Pool Token (BPT) hourly median price by pool.                                                                                    | balancer_v2_[chain]_bpt_prices                    | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_flashloans](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/balancer_flashloans.sql) | All Balancer flashloans                                                                                                                   | balancer_v2_[chain]_flashloans                   | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_transfers_bpt](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/balancer_transfers_bpt.sql) | Balancer Pool Token (BPT) transfer logs on Balancer,                                                                                      | balancer_v2_[chain]_transfers_bpt                | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_[chain]_pools_tokens_weights](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/ethereum/balancer_[chain]_pools_tokens_weights.sql) | Token weights in Balancer’s weighted pools                                                                                                | balancer_v2_[chain]_pools_tokens_weights        | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [balancer_ethereum_balances](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/ethereum/balancer_ethereum_balances.sql) | Daily running cumulative balance for ERC20 tokens on balancer v1 pools                                                                    |                                                 | Ethereum                                         |
| [balancer_ethereum_vebal_slopes](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/ethereum/balancer_ethereum_vebal_slopes.sql) | Slope and bias of veBAL per wallet after each balance update                                                                             |                                                 | Ethereum                                         |
| [balancer_ethereum_vebal_balances_day](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/ethereum/balancer_ethereum_vebal_balances_day.sql) | Daily balances of veBAL per wallet                                                                                                       |                                                 | Ethereum                                         |
| [balancer_ethereum_vebal_votes](https://github.com/duneanalytics/spellbook/blob/main/models/balancer/ethereum/balancer_ethereum_vebal_votes.sql) | Records of votes for Balancer gauges by provider at each voting round                                                                    |                                                 | Ethereum                                         |
| [labels_balancer_v1_pools](https://github.com/duneanalytics/spellbook/blob/main/models/labels/addresses/__single_category_labels__/balancer_v1/labels_balancer_v1_pools.sql) | Names Balancer v1 pools, based on tokens and weights                                                                                      | labels_balancer_v1_pools_ethereum                | Ethereum                                         |
| [labels_balancer_v2_pools](https://github.com/duneanalytics/spellbook/blob/main/models/labels/addresses/__single_category_labels__/balancer_v2/labels_balancer_v2_pools.sql) | Names Balancer v2 pools, based on tokens and weights. Also returns pool type.                                                              | labels_balancer_v2_pools_{{chain}}                | Arbitrum, Avalanche, Base, Ethereum, Gnosis, Optimism, Polygon |
| [labels_balancer_v2_gauges](https://github.com/duneanalytics/spellbook/blob/main/models/labels/addresses/__single_category_labels__/balancer_v2/labels_balancer_v2_gauges.sql) | Names Balancer v2 gauges, based on their respective blockchain and pool                                                                   | labels_balancer_v2_gauges_{{chain}}               |                                                 |


## Contribute to the Magic

We invite you to not only explore but also contribute to the magic. As we strive for excellence, collaboration is at the heart of our mission. Your insights, feedback, and contributions are invaluable in shaping the future of Balancer's data analytics.
To do so, you can create pull requests to Dune's spellbook or reach out to Balancer Labs' data team directly on [Discord](https://discord.balancer.fi/).

**You can leverage our spells with queries such as:**


## 1, 7 and 30 day volume on Balancer

```dunesql
SELECT 
    SUM(amount_usd)/1e6 AS "Volume on Balancer"
    , 1 AS rn 
FROM balancer.trades 
WHERE block_time >= CAST(NOW() AS TIMESTAMP) - INTERVAL '1' DAY 

UNION ALL

SELECT 
    SUM(amount_usd)/1e6 AS "Volume on Balancer"
    , 2 AS rn 
FROM balancer.trades 
WHERE block_time >= CAST(NOW() AS TIMESTAMP) - INTERVAL '7' DAY

UNION ALL

SELECT 
    SUM(amount_usd)/1e6 AS "Volume on Balancer"
    , 3 AS rn 
FROM balancer.trades 
WHERE block_time >= CAST(NOW() AS TIMESTAMP) - INTERVAL '30' DAY
ORDER BY rn ASC
```

## All swaps on the last 24 hours

```dunesql
SELECT 
    block_date
    , tx_hash
    , project_contract_address AS pool_address
    , token_bought_address
    , token_bought_amount
    , token_sold_address
    , token_sold_amount
    , tx_from
    , tx_to
    , amount_usd
    , swap_fee
FROM balancer.trades
WHERE block_time >= now() - interval '24' hour
ORDER BY 1 ASC
```

## Daily TVL by Blockchain

```dunesql
SELECT 
    blockchain
    , CAST(day AS TIMESTAMP) AS day
    , sum(protocol_liquidity_usd) AS chain_tvl_usd
    , sum(protocol_liquidity_eth) AS chain_tvl_eth
FROM balancer.liquidity x
GROUP BY 1, 2
ORDER BY 2 DESC, 3 DESC
```

## Current TVL by pool, from highest to lowest

```dunesql
SELECT 
    blockchain
    , pool_id
    , pool_symbol
    , sum(pool_liquidity_usd) AS pool_tvl
FROM balancer.liquidity x
WHERE day >= current_date
GROUP BY 1, 2, 3
ORDER BY 4 DESC
```

## Daily Liquidity Utilization

```dunesql
WITH 
    swaps AS (
        SELECT
            date_trunc('day', d.block_time) AS day
            , SUM(amount_usd) AS volume
        FROM balancer.trades d
        )
        GROUP BY 1
    ),

    total_tvl AS (
        SELECT 
            CAST(day as timestamp) as day
            , SUM(protocol_liquidity_usd) AS tvl
        FROM balancer.liquidity
        )
        GROUP BY 1
    )
   
SELECT
    CAST(t.day as timestamp) as day,
    (s.volume)/(t.tvl) AS liquidity_utilization,
FROM total_tvl t
LEFT JOIN swaps s ON s.day = t.day
ORDER BY 1
```
