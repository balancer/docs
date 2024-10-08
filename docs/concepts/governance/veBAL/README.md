---
title: Overview
references:
  - details: Querying Gauges
    link: /reference/vebal-and-gauges/gauges.html
  - details: veBAL Boost Calculations
    link: /reference/vebal-and-gauges/boost-calculations.html

---

# veBAL

## Overview

veBAL (vote-escrow BAL) is a vesting system based on [Curve's veCRV mechanism](https://curve.readthedocs.io/dao-vecrv.html) which locks 80/20 BAL/WETH Balancer Pool Tokens for a maximum of 1 year. The veBAL and Gauge system is designed to promote long-term token-holder alignment and facilitate fair protocol fee distribution.

By locking the BAL/WETH 80/20 BPT, holders are given veBAL, entitling them to governance rights and protocol fee collection. A user's veBAL balance is directly proportional to the amount of BAL/WETH 80/20 BPT locked and the duration of time left in the lock period. In short if a user locks 1 BPT for 52 weeks, they will receive the same amount of “vote escrowed” strength as someone who locks 2 BPT for 26 weeks.

Implications:

- veBAL equates to boosted liquidity mining emissions for all gauges. The share of a given staked pool, and the lock multiplier are both factors in the amount a user will be entitled to in liquidity mining emissions.

- As of [BIP-457](https://forum.balancer.fi/t/bip-457-core-pool-incentive-program-automation/5254#specificationconfiguration-10) veBAL holders receive 82.5% of [protocol fees](../protocol-fees.md) including:

  - 82.5% of the [swap fees](../protocol-fees.md#swap-fees) accumulated on Balancer Protocol are collected as protocol fees.
  - 82.5% of the yields fees taken from yield bearing tokens [as part of Core Pools](../protocol-fees.md#core-pool-fee-redirection)

- veBAL is the governance token of Balancer, used in Snapshot voting to authorize changes to the DAO including the management (adding/removing) of gauges and funding of service providers.
  - veBAL does have a gauge to direct emissions to the holders if chosen. This option is capped at 10% of total emissions of BAL at a given time in the inflation schedule. The overflow, if a vote goes over 10%, will go to the DAO treasury, where governance will have ownership of it.
  - As demonstrated by BIP-161 the handling and amount of protocol fees are subject to change based on [Balancer Govnernace Process](../process.md)

This gives veBAL holders the option to choose pools for which they have liquidity positions for increased emissions or a potential for "bribing" battles can ensue. Numerous vote markets including [Hiddenhand](https://hiddenhand.finance/balancer), [Warden](https://app.warden.vote/dashboard/), and [votemarket](https://votemarket.stakedao.org/) allow projects to provide veBAL holders an incentivize to vote in a direction they prefer, hence the term “bribe”.

In the same breath, the emission schedule for BAL has been defined and is set permanently. Before veBAL, 145,000 BAL was being emitted per week, which was unsustainable without a ceiling on emissions. The two key takeaways for the new inflation schedule will be a halving of the inflation rate every 4 years, and a total supply of BAL being capped at 94,000,000.

### How is veBAL different from veCRV?

There are a few modifications that set veBAL apart:

- Instead of locking pure BAL, users obtain veBAL by locking 80/20 BAL/WETH Balancer Pool Tokens (BPTs). This ensures that even if a large portion of BAL tokens are locked, there is deep liquidity.

- veBAL's maximum locking period is 1 year, a decrease from veCRV's 4 year period. The minimum locking period is 1 week. DeFi moves quickly, and in the event governance decides to use a new voting system, this allows for a shorter, but still sufficiently long, waiting period to transition.
