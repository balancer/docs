---
order: 0
title: Overview
---

# Subgraphs

The Balancer Subgraphs indexes data on the Balancer smart contracts with a GraphQL interface. It updates data in response to function calls and contract events to power front-end apps and integrations.

## V2 Subgraphs

The V2 Subgraphs contain data from the Balancer Vault, including pool token balances and pool parameters.

The schema of GraphQL elements available is defined in [`/schema.graphql` ](https://github.com/balancer/balancer-subgraph-v2/blob/master/schema.graphql).

| Network      | URL                                                                                                                                                                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum     | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-mainnet-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-mainnet-smol/latest/gn)     |
| Polygon      | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-polygon-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-polygon-smol/latest/gn)     |
| Arbitrum     | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-arbitrum-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-arbitrum-smol/latest/gn)   |
| Optimism     | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-optimism-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-optimism-smol/latest/gn)   |
| Gnosis Chain | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-gnosis-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-gnosis-smol/latest/gn)       |
| Avalanche    | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-avalanche-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-avalanche-smol/latest/gn) |
| Base         | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-base-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-base-smol/latest/gn)           |
| Sepolia      | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-sepolia-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-sepolia-smol/latest/gn)     |
| Mode         | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-mode-smol/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/v2-mode-smol/latest/gn)           |

## Gauges Subgraphs

The Gauges Subgraphs include data from liquidity gauges and veBAL contracts.

The schema of GraphQL elements available is defined in [`/schema.graphql` ](https://github.com/balancer/gauges-subgraph/blob/master/schema.graphql).

| Network      | URL                                                                                                                                                                                                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum     | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-mainnet/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-mainnet/latest/gn)     |
| Polygon      | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-polygon/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-polygon/latest/gn)     |
| Arbitrum     | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-arbitrum/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-arbitrum/latest/gn)   |
| Optimism     | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-optimism/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-optimism/latest/gn)   |
| Gnosis Chain | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-gnosis/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-gnosis/latest/gn)       |
| Avalanche    | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-avalanche/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-avalanche/latest/gn) |
| Base         | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-base/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-base/latest/gn)           |
| Sepolia      | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-sepolia/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-sepolia/latest/gn)     |
| Mode         | [https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-mode/latest/gn](https://api.subgraph.ormilabs.com/api/public/717cf785-de57-4761-94dd-9ac51b019902/subgraphs/balancer-gauges-mode/latest/gn)           |
