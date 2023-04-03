# Pool Creation

## Overview

**Note: Before creating a new pool, make sure there isn't already a similar pool. There is no advantage to fragmenting liquidity.**

Anyone can create a pool on Balancer. WeightedPools can be deployed using the Pool creator Interface that can be accessed on [Mainnet](https://app.balancer.fi/#/ethereum), [Polygon](https://app.balancer.fi/#/polygon), [Arbitrum](https://app.balancer.fi/#/arbitrum), and [Gnosis Chain](https://app.balancer.fi/#/gnosis-chain). It's highly recommended that you deploy a pool on a testnet before deploying on a production network.

## What Type of Pool Should I Deploy?

The type of pool you deploy depends on your use case. After reading througt the descriptions of different Balancer pool types, decide which type fits best your use case.

## Deployment Process Summary

### Step1: Deploy the Pool from Factory

Each _poolType_ has a factory from which users can deploy new pools. To deploy a pool, you must call that factory's _create()_ function with the arguments that correspond to that specific pool. Please check the "Common Arguments" section below for frequently used arguments.

### Step 2: Add liquidity with the INIT join

The INIT join can be done only once when the pool have a BPT totalSupply of 0. Almost all pools require you to use a JoinKind of type INIT before you can use the pool.

## Common Arguments

- name - The name of the pool corresponding Balancer Pool Token (BPT)
- symbol - The short symbol for the BPT
- tokens - A numerically sorted array of all tokens in the pool
- swapFeePercentage - How much of a swap fee the pool collects
- owner - The "owner" of the pool: account that has some limited control over pool parameters

## Fees

### Static Fees

If you want your pool to have static fees, you should set the fee you want the pool to have (you cannot change it at a later time), and set the owner to the zero address 0x0000000000000000000000000000000000000000.

### Dynamic Fees

If you want dynamic fees, you should set the fee to an initial value, and set the owner either as the address that you want to control the pool fee, or to the delegate address. An address that is set as the owner has permission to set the fee to anything between 0.0001% and 10% whenever they want.
