---
title: Components
order: 20
---
# Components

## Overview
Balancer is an umbrella term that represents a diverse ecosystem of independent components, tools, and contributors.

**Balancer Protocol** is the set of smart contracts that lives on the blockchain and facilitates all of the interactions of swapping, liquidity provisioning, pool creation, and more.

**Balancer Dapp** is an open source frontend application that users can use to easily interact with the underlying smart contracts.

The core tenets of Balancer V2 are security, flexibility, capital efficiency and gas efficiency.

- **Secure** - Extreme care was taken in guaranteeing the vault architecture keeps internal balances isolated among pools.
- **Simple** — All interactions with Balancer V2 will be done through one single access point: the Vault. Only one token approval will be necessary for users to trade or invest liquidity in any Balancer pool.
- **Gas efficient** — Trading against both standard and stable pools will cost a little over 100k gas, which is on par with Uniswap V2. Trades will cost even less if internal balances are used. Trading with many pools at the same time only marginally increases the gas costs.
- **Capital efficient** — Pools can enable Asset Managers, which have full control over the underlying pool tokens they add to the vault. This opens up vast design space to improve capital efficiency and for other use cases like using underlying tokens to vote.
- **Flexible** — Balancer welcomes other teams to innovate on top of V2, creating a thriving ecosystem and network effect. Grants and bounties will be given to contributors who create new successful pools.