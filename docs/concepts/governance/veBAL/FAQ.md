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

Yes, gauge votes are on-chain and cost a fee. They can be cast in the [Balancer DAPP](https://app.balancer.fi/#/ethereum/vebal)

Other governance is done by [snapshot](https://snapshot.org/#/balancer.eth) and costs no gas.

If the same pools will be selected each week, no additional vote, transaction, or gas is needed. Users only have to vote
once, unless they want to change their allocation.

### Can I delegate my votes?

veBAL voting can not be delegated, however snapshot voting covering general DAO operations and management of gauges can be delegated [here](https://snapshot.org/#/delegate/balancer.eth). A list of delegates and more information about them and how/why they vote can be found on the [In the Delegate Citadel](https://forum.balancer.fi/c/delegate-citadel/14) on the Balancer Forum.

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

It's normal for vote escrowed (ve) systems to not allow arbitrary contracts to lock as otherwise it's easy to tokenize the ve tokens which defeats can the point if the tokenomics of said derivitive does not require appropriate locking. Users can lock up veBAL from an EOA and delegate it to your gnosis safe to earn boosts. Entities interested in making a large investment in veBAL may appeal to governance to have a multisig whitelisted for veBAL participation.

### Is there a repository for the contract addresses of all the new staking contracts and veBAL contracts?

| Contract                                                                                                        | Purpose                                              |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [veBAL](https://etherscan.io/tx/0xaa29cd251cdb024c415b0e13f67a0ca74fe5abc3de9a9fedd1ae26fd39be4025)             | Locks BPTs and reports veBAL balances                |
| [Gauge Controller](https://etherscan.io/address/0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD)                     | Manages Gauges and emissions                         |
| [Gauge Adder](https://etherscan.io/address/0x2fFB7B215Ae7F088eC2530C7aa8E1B24E398f26a)                          | Adds new gauges approved by governance to the system |
| [Mainnet Uncapped Gauge Factory](https://etherscan.io/address/0x4e7bbd911cf1efa442bc1b2e9ea01ffe785412ec)       | Create gauges with no cap on Mainnet                 |
| [Mainnet Capped Gauge Factory](https://etherscan.io/address/0xf1665e19bc105be4edd3739f88315cc699cc5b65)         | Create gauges with possible cap on Mainnet           |
| [Polygon Capped Gauge Factory](https://etherscan.io/address/0xa98bce70c92ad2ef3288dbcd659bc0d6b62f8f13)         | Create gauges with a possible CAP on Polygon         |
| [Polygon Child Chain Gauge Factory](https://polygonscan.com/address/0x3b8ca519122cdd8efb272b0d3085453404b25bd0) | Create child gauge to hold LP tokens on Polygon      |
| [Arbitrum Capped Gauge Factory](https://etherscan.io/address/0x1c99324edc771c82a0dccb780cc7dda0045e50e7)        | Create gauges with a possible CAP on Arbitrum        |
| [Arbitrum Child Chain Gauge Factory](https://arbiscan.io/address/0xb08e16cfc07c684daa2f93c70323badb2a6cbfd)     | Create child gauge to hold LP tokens on Arbitrum     |
