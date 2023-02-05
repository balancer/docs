---
order: 0
title: Overview
---

# Governance

Various components of Balancer Governance are described in breif below. Click the link for each section for more details.

## [veBAL](./veBAL)

[veBAL](https://app.balancer.fi/#/ethereum/vebal) is a time-locked, non transferable derivative of the [80/20 BAL/ETH BPT on Mainnet](https://app.balancer.fi/#/ethereum/pool/0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014). veBAL holders, also called Balancer Governors, vote on proposals relevant to the protocol. These proposals are wide, ranging from which pools to enable BAL incentivize for to how treasury funds are allocated and managed.

## [BAL Token](./bal-token)

The BAL token is the primary component of veBAL. Due to the fact that veBAL allows for trading between BAL and ETH, BAL liquidty scales with Governance. Due to the fact that veBAL liquidty is locked, the market can easily understandhow BAL liquidty depth will scale over time by analyizing the unlock schedule of veBAL.

## [Governable Protocol Fees](./protocol-fees)

Balancer Governors have the power to enable and modify Governable Protocol Fees. These can be collected from trading fees and flash loan fees and stored in the Vault. The Governors themselves also get to decide what becomes of these fees, and how to best spend them to support the health and progress of the protocol.

## [Snapshot](./snapshot)

Snapshot, a spinoff of Balancer, is an off-chain gasless multi-governance client with easy to verify and hard to contest results. Balancer Governance Votes take place on Snapshot.

## [Multisig](./multisig)

To enact the off-chain votes on Snapshot, Balancer Protocol uses a Multisig to solidify these changes on-chain. Balancer’s Multisig signers are a diverse set of widely respected community members. The multisig does NOT have decision making power, as its role is to simply enact on-chain the decisions BAL holders make via off-chain voting.
