---
title: FAQ
---

# veBAL FAQ

### Will voters vote on how much emissions go to each network or is that locked?

The voting mechanism is described in "How it works" in Gauge voting documentation.

Voters will determine the amount of emissions going to gauge listed pools on each chain (Mainnet, Polygon, and Arbitrum), the voting will happen on mainnet. This is because the contracts to read your veBAL balance are on mainnet only.

### If you have veBAL on mainnet, does it boost your farming on Arbitrum, Polygon?

No, only gauges on L1 (Ethereum mainnet) receive incentive boosts because the contracts must read your veBAL balance.

The boost depends on what fraction of the gauge staked liquidity you hold and what fraction of the total veBAL you hold. See more on boosting here.

### Is the veBAL vote on-chain, and does it require gas fees?

Yes, gauge votes are on-chain and cost a fee.

If the same pools will be selected each week, no additional vote, transaction, or gas is needed. Users only have to vote once, unless they want to change their allocation.

### In the transitioning to veBAL, will I personally need to do any migration from the current pool I have invested?

On mainnet, yes if your LP pool is eligible for gauge voting, you have to stake your LP for incentives.

On Polygon and Arbitrum, not in the initial launch period, but you will need to stake them in the near future.

The only lock-up necessary is to lock the BAL 80 - ETH 20 LP to receive veBAL.

### Do veBAL holders receive a portion of the trading fees? How are the protocol fees paid?

veBAL holders are receive protocol fees distributed in bbaUSD (Boosted Aave Stable Pool LP Tokens) see Protocol Revenue Distribution.

### Is there a way to view how much total veBAL there is?

Yes that information is in the following link: https://dune.xyz/balancerlabs/veBAL

### How do I make a pool eligible for gauge voting?

Need to make a governance proposal, https://forum.balancer.fi/c/vebal/13

### How much BAL/WETH BPT do I stake to maximize my multiplier? What amount do you need to stake at 1 year to hit the 2.5x boost for liquidity incentives?

The length of time locked corresponds to how much veBAL you'll get for your 80/20 BPT. Voting is 1 veBAL for a 52 week lock of 1 BPT. Where a one week lock of 1 BPT will give 1/52 veBAL.

The LM boost is separate. Related to your share of the pool and share of veBAL. Range limited from 1-2.5x. This can be calculated on our tools site and the math is explained here.

### How do i get veBAL, and can i transfer BPT or veBAL?

You will need to have BAL tokens or WETH to invest in the BAL/WETH 80/20 pool. You can deposit a single asset, which will incur some price impact, or you can deposit both assets in the correct weights. You will receive BPT which you can then time lock here to receive veBAL.

Yes, you can transfer BPTs. Rewards will accrue in the wallet where they are held.

veBAL is a non-standard ERC-20 token and cannot be transferred.

### How do I extend my veBAL lock up?

Just go to the veBAL site, see "Lock until" , click "+", choose the time desired, and confirm.

### Are incentives paid daily?

Incentives on mainnet are now accrued each block. Protocol fees are distributed on a weekly basis.

### Does veBAL support Gnosis Safe?

It's normal for vote escrowed (ve) systems to not allow arbitrary contracts to lock as otherwise it's easy to tokenize the ve tokens which defeats the point. Users can lock up veBAL from an EOA and delegate it to your gnosis safe to earn boosts. Guide link.

### Is there a repository for the contract addresses of all the new staking contracts and veBAL contracts?

Link to the veBAL contracts:
