# Governable Protocol Fees

## Overview

Governable Protocol Fees are fees collected by the Balancer Protocol, **not** Liquidity Providers. There are a few ways in which the fees can be collected, and far more in which they can be used. Though many Liquidity Providers may also be Balancer Governors, we will discuss them here as distinct groups for clarity. 

## Sources

### Trade Fees

The obvious source of Protocol Fees is from trading. Balancer traders already pay trade fees to Liquidity Providers in exchange for making their swap possible. Fees are denominated in the Input Token when executing a trade. 

The Protocol Fees for trades can be collected as a percentage of the trade fees already being collected (a fraction of a fraction). From the traders' perspective, there will be no price increase. 


As of [BIP-163](https://forum.balancer.fi/t/bip-19-incentivize-core-pools-l2-usage/3329#specification-4)  in January 2023, the protocol takes 50% of the trade fees.
- 100% of all BAL fees collected are emitted as fee sharing to veBAL holders.  See this [Governance Proposal](https://forum.balancer.fi/t/proposal-distribute-protocol-fees-in-bal-where-appropriate/2933)
- All other tokens are sold for USDC, of which 
  - 35% are paid to the DAO 
  - 65% are emitted to BAL holders in either the form of bb-a-USD (a boosted USD balancer pool) or via USDC incentives placed on the hidden hands vote market, which can be earned by veBAL participants for voting on these revenue generating pools. 

### Wrapped Token Yield Fees
Balancer currently applies the protocol fee of 50% not only to swaps but also to any yield earned and recorded by a [rate provider](https://docs.balancer.fi/reference/contracts/rate-providers.html). [BIP-19](https://forum.balancer.fi/t/bip-19-incentivize-core-pools-l2-usage/3329) introduces the idea of core pools which are typically pools that are at least 50% yield bearing. Fees earned from core pools are handled as follows:
- All tokens except BAL are sold for USDC
- 35% of the BAL and USDC are taken as fees for the DAO
- The remaining BAL and USDC are used to place bribes for votes on the pools that generated said fees as described by [BIP-19](https://forum.balancer.fi/t/bip-19-incentivize-core-pools-l2-usage/3329)

### Flash Loan Fees

Another potential source of Protocol Fees is from interest on Flash Loans. They are currently disabled to encourage developers to build on Balancer.

## Uses

The distribution of protocol fees can be adjusted by governance.  Currently:

**35% of all collected Protocol Fees** are paid to the DAO treasury where they are used primarily to fund the operations of the DAO as allocated by regular governance BIPS which allocate funds to Balancer DAOs [Service Providers](https://forum.balancer.fi/c/service-provider/15). 

**65% of all collected Protocol Fees** are paid out to veBAL holders, either in the form of passive fees, or bribes that can be earned on vote markets for directing their votes towards pools which generate revenue for the DAO through fees on their underlying staked assets.  This also provides pools with extra emissions in exchange for revenue contributed to the DAO.


We invite you to join our Discord and Forums to take part in the discussion over how to use these fees.
