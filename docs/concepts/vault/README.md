---
title: Vault
order: 10
---
# Vault

## Overview

The Vault is the core of Balancer; it is a smart contract that holds and manages all tokens in each Balancer pool. It is also the portal through which most Balancer operations (swaps/joins/exits) take place.

## Separating Token Accounting and Pool Logic

The Vault architecture separates the token accounting and management from the pool logic. This separation simplifies pool contracts, since they no longer need to actively manage their assets; pools only need to calculate amounts for swaps, joins, and exits.

This architecture brings different pool designs under the same umbrella; the Vault is agnostic to pool math and can accommodate any system that satisfies a few requirements. Anyone who comes up with a novel idea for a trading system can make a custom pool plugged directly into Balancer's existing liquidity instead of needing to build their own Decentralized Exchange.

![](/images/vault.png)

## Gas Efficient Batch Swaps

In other Decentralized Exchanges where token accounting is paired with pool logic, multi-hop trading (A->B->C) can become costly since ERC20 tokens must be transferred at each hop. Balancer's advantage here is that all the tokens are stored in the same contract, The Vault. This powerful difference allows for far greater swap efficiency. Instead of transferring tokens on each step of a multi-hop trade, The Vault simply keeps internal records of which pool is holding what, transferring tokens only at the input and output step. This reduction in token transfers ultimately saves a considerable amount of gas.

![](/images/gascomparisonbatchswap.png)

#### Internal Balances

Taking the concept of minimizing token transfers one step further, it's actually possible to execute swaps with no token transfers whatsoever. Similar to how the Vault maintains token balances for pools, it can also maintain balances for arbitrary Ethereum addresses. Users can hold **Internal Balances** in the Vault and execute trades to/from these balances.&#x20;

## Security

It's crucial to note that the Vault is designed to keep pool balances strictly independent. This is critical for a permissionless system in which anyone can create their own tokens and pools. Maintaining this independence protects from malicious or negligently designed tokens or custom pools from draining funds from any other pools. As such, even though the Vault may hold consolidated liquidity of a certain token from multiple pools, the depth of that combined liquidity does not change price impact in the individual pools.

## Flash Loans

While the consolidated liquidity in the Vault does not change price impact on a per-pool basis, it does enable Balancer Protocol to leverage that combined liquidity by offering Flash Loans. Flash Loans are uncollateralized loans that must be repaid (with interest) in the same transaction as it is borrowed. Since everything must be completed in a single transaction, there are codified guarantees that make it impossible for borrowers to run away with the tokens.

Further, anyone who identifies a price discrepancy in two Balancer Pools can execute a **Flash Swap**. **** An arbitrageur who makes a flash swap does not need to hold any of the input tokens that one would normally need to make a trade. Instead, the trader identifies the imbalance, tells the Vault to make the swap, and is rewarded with the profit.
