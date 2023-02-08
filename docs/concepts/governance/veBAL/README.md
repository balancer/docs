---
title: Overview
---

# veBAL Overview

By locking the BAL WETH 80/20 BPT holders are given veBAL in exchange for governance and implied financial purposes and benefits. The longer the length of the time lock a user agrees to the higher their multiplier got governance. In short if I lock 1 BPT for 52 weeks I will receive the same amount of “vote escrowed” strength as someone who locks 2 BPT for 26 weeks. Quite simply voting strength is a function of the amount of pool tokens locked multiplied by the length of locking time.

Financial implications:

- veBAL equates to boosted liquidity mining incentives for all incentivized pools. The share of a given staked pool, and the lock multiplier, or boost, are both factors in a user’s liquidity BAL rewards “APR”.

- As of [BIP-161](https://snapshot.org/#/balancer.eth/proposal/0x12bce443c7bd212b3fdd18468433fc959740610888300d5a30eb35de94662790) Lockers receive 65% of [protocol fees](../protocol-fees.md) including: 
  - 50% of the [swap fees](../protocol-fees.md#trade-fees) accumulated on Balancer Protocol are collected as protocol fees. 
  - 50% of the yields on yield bearing tokens in [Core Pools](../protocol-fees.md#core-pool-fees)

- veBAL is the governance token of Balancer, used for a governance gauge voting mechanism to decide which pools receive BAL liquidity mining incentives. Users can direct liquidity mining incentives to the pools of their choice. veBAL is also used in snapshot voting to authorize changes to the DAO including the management (adding/removing) of gauges and funding of service providers.
  - veBAL does have a gauge to direct rewards to the holders if chosen. This option is capped at 10% of total emissions of BAL at a given time in the inflation schedule. The overflow, if a vote goes over 10%, will go to the DAO treasury, where governance will have ownership of it.
  - As demonstrated by BIP-161 the handling and amount of protocol fees are subject to change based on [Balancer Govnernace Process](../process.md)

This gives veBAL holders the option to choose pools they have liquidity positions in for increased incentives or a potential for bribing battles can ensue.  Numerous vote markets including [Hiddenhand](https://hiddenhand.finance/balancer), [Wareden](https://app.warden.vote/dashboard/), and [votemarket](https://votemarket.stakedao.org/) allow projects to provide veBAL holders a compensation or incentivize to vote in a direction they prefer, hence the term “bribe”. 

In the same breath, the emission schedule for BAL has been defined and will be set permanently. Before veBAL, 145,000 BAL was being emitted per week, which was unsustainable without a ceiling on emissions. The two key takeaways for the new inflation schedule will be a halving of the inflation rate every 4 years, and a total supply of BAL being capped at 94,000,000.
