# Governable Protocol Fees

## Overview

Governable Protocol Fees are fees collected by the Balancer Protocol, **not** Liquidity Providers. There are a few ways in which the fees can be collected, and far more in which they can be used. Though many Liquidity Providers may also be Balancer Governors, we will discuss them here as distinct groups for clarity.

## Sources

### Trade Fees

The obvious source of Protocol Fees is from trading. Balancer traders already pay trade fees to Liquidity Providers in exchange for making their swap possible. Fees are denominated in the Input Token when executing a trade.

The Protocol Fees for trades can be collected as a percentage of the trade fees already being collected (a fraction of a fraction). From the traders' perspective, there will be no price increase.

As of [BIP-163](https://forum.balancer.fi/t/bip-19-incentivize-core-pools-l2-usage/3329#specification-4) in January 2023, the protocol takes 50% of the trade fees.

- 100% of all BAL fees collected are emitted as fee sharing to veBAL holders. See this [Governance Proposal](https://forum.balancer.fi/t/proposal-distribute-protocol-fees-in-bal-where-appropriate/2933)
- All other tokens are sold for USDC, of which
  - 35% are paid to the DAO
  - 65% are emitted to BAL holders in either the form of bb-a-USD (a boosted USD balancer pool) or via USDC incentives placed on the hidden hands vote market, which can be earned by veBAL participants for voting on these revenue generating pools.

### Wrapped Token Yield Fees

Balancer currently applies the protocol fee of 50% not only to swaps but also to any yield earned and recorded by a [rate provider](https://docs.balancer.fi/reference/contracts/rate-providers.html). [BIP-19](https://forum.balancer.fi/t/bip-19-incentivize-core-pools-l2-usage/3329) introduces the idea of core pools which are typically pools that are at least 50% yield bearing. Fees earned from core pools are redirected to support liquidity in the protocol they are generated from as [described below](#fee-redirection).

### Flash Loan Fees

Another potential source of Protocol Fees is from interest on Flash Loans. They are currently disabled to encourage developers to build on Balancer.

## Uses

The distribution of protocol fees can be adjusted by governance. Currently:

- **35% of all collected Protocol Fees** are paid to the DAO Treasury where they are used primarily to fund the operations of the DAO through regular governance proposals which allocate funds to Balancer DAO's [Service Providers](https://forum.balancer.fi/c/service-provider/15).

- **65% of all collected Protocol Fees** are paid out to veBAL holders in the form of direct fee flows or incentives for voting on pools that generate flows through the DAO.

## Fee Redirection

[BIP-19](https://forum.balancer.fi/t/bip-19-incentivize-core-pools-l2-usage/3329) concerns redirecting fees destine for veBAL lockers. It's purpose is 2 fold:

1. Incentive/encourage veBAL voters to vote for pools that are generating revenue for the DAO by requiring them to do so to capture a decent portion of their share of the fees.
2. Create a compelling economic proposition for Liquid Staked Tokens(LSTs), Lending Protocols and other DAOs with interest baring assets by enabling pools that support their own yields with staking and trade fees.

Pools have been designated as Core in the past for the following reasons:

1. At least 50% of the tokens in the pool (at peg) are yield baring with rate providers.
2. The Pool is a ve8020 pool with locked, primary liquidity hosted on Balancer and is not seeking a grant as defined per [BIP-146](https://forum.balancer.fi/t/bip-146-incentivize-8020-bpt-staking-ve8020/4210) and modified by [BIP-225](https://forum.balancer.fi/t/bip-225-amendment-to-bip-146-incentivize-8020-bpt-staking-ve8020/4543).
3. The pool is the primary source of on-chain liquidity and fees are high [BIP-147](https://snapshot.org/#/balancer.eth/proposal/0x58a74223c1ea38048956969ff0cbaea2167f3a9ed69907a95187c6c222201149), [BIP-237](https://forum.balancer.fi/t/bip-237-enable-ush-eth-50-50-gauge-with-10-emission-cap-ethereum/4599), [BIP-267](https://forum.balancer.fi/t/bip-267-enable-ush-unsheth-gauge-on-ethereum/4678)

It is important to note that 100% of fees redirected by this program still flow to veBAL voters. They are just contingent on voting for pools that generate significant flows through the protocol and revenue through the DAO.

Join the Discord and Forums to take part in the discussion over how to use these fees.
