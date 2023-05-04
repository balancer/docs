---
title: FAQ
---

# veBAL FAQ

### How do I get veBAL?

When you provide liquidity into a Balancer pool, you take out an ERC-20 token we call a "Balancer Pool Token", or BPT for short. In veBAL, the used BPT is from a B-80BAL-20WETH pool.

You will need to have BAL tokens or WETH to invest in the B-80BAL-20WETH pool. You can deposit a single asset, which will incur some price impact, or you can deposit both assets in the correct weights. You will receive BPT which you can then time lock here to receive veBAL.

The length of time the BPT is locked corresponds to how much veBAL you'll get. veBAL is a function of time and asset. 1 veBAL equals 1 BPT locked for 52 weeks. Where a 1 week lock of 1 BPT will give 1/52 veBAL.

### Can I transfer BPTs or veBAL?

Yes, you can transfer BPTs. Rewards will accrue in the wallet where they are held.

veBAL is a non-standard ERC-20 token and cannot be transferred.


### Do veBAL holders receive a portion of the protocol fees? 

Yes. For more information, see [Protocol Revenue Distribution](../protocol-fees.md#uses).

### How are the protocol fees paid?

veBAL holders receive protocol fees distributed in bb-a-USD (Balancer Boosted Aave V3 USD Composable Stable Pool). The fee token was selected based on community feedback taken in the [Balancer Forum](https://forum.balancer.fi/t/rfc-change-vebal-usd-yield-component/4692#looking-for-input-8) followed by a [Snapshot vote](https://snapshot.org/#/balancer.eth/proposal/0xe9fa0968d93ab117d6ef28d139d19e5d9d728c0ed4c9581e2f7eb8c381e5ff45) in May '23.

### When are incentives paid?

Incentives on mainnet are now accrued each block. Protocol fees are distributed on a weekly basis.

### Is there a way to view how much total veBAL there is?

Yes, that information can be found on the [veBAL Dune Dashboard](https://dune.xyz/balancerlabs/veBAL)

### How much BPT (B-80BAL-20WETH) do I stake to maximize my multiplier? What amount do you need to stake at 1 year to hit the 2.5x boost for liquidity incentives?

The incentives boost is related to your share of the pool and share of veBAL. Range limited from 1x to 2.5x. 

Community contributors have developed a very useful [veBAL Boost Calculator](https://balancer.tools/veBAL) tool and the math is explained [here](/reference/vebal-and-gauges/boost-calculations.html).

### If veBAL is on mainnet, can it boost staking incentives on L2?

Yes, Balancer now supports cross-chain gauges to receive incentive boosts.

The boost depends on what fraction of the gauge staked liquidity you hold and what fraction of the total veBAL you hold. See more on boosting [here](/reference/vebal-and-gauges/boost-calculations.html)

### How do I extend my veBAL lock up?

Just go to the [veBAL site](https://app.balancer.fi/vebal#/ethereum/vebal), see "Lock until" , click "+", choose the time desired, and confirm.

### Will voters vote on how much emissions go to each network or is that preset?

Voters will determine the amount of emissions going to gauge listed pools on Ethereum mainnet and on L2 chains. The voting will happen on Ethereum mainnet.

### Is the veBAL gauge vote on-chain, and does it require gas fees?

Yes, gauge votes are on-chain and will cost a gas fee. They can be cast in the [Balancer dAPP](https://app.balancer.fi/#/ethereum/vebal). Other governance decisions (i.e. approving new gauges) are done by [snapshot](https://snapshot.org/#/balancer.eth) and cost no gas.

There is a weekly vote for veBAL holders which ends at 00:00 UTC on Thursdays. If the same pools will be selected each epoch, no additional vote, transaction, or gas is needed. veBAL holders only have to vote once, unless they want to change their allocation.

### Can I delegate my votes?

veBAL gauge voting can not be delegated, however Snapshot voting covering general governance for DAO operations and management of gauges can be delegated [here](https://snapshot.org/#/delegate/balancer.eth). A list of delegates and more information about them and how/why they vote can be found [in the Delegate Citadel](https://forum.balancer.fi/c/delegate-citadel/14) on the Balancer Forum.

### How do I make a pool eligible for gauge voting?

Need to make a governance proposal. See [Governance Process](../process.md) and [The instructions for a Gauge request on the Forum](https://forum.balancer.fi/t/instructions-overview/2674).

### Does veBAL support Gnosis Safe?

It's normal for vote escrowed (ve) systems to not allow arbitrary contracts to lock as otherwise it's easy to tokenize the ve tokens which defeats the point if the tokenomics of said derivitive does not require appropriate locking. Users can lock up veBAL from an EOA and delegate it to your Gnosis Safe to earn boosts. Entities interested in making a large investment in veBAL may appeal to governance to have a multisig whitelisted for veBAL participation.

### Is there a repository for the contract addresses of all the new staking contracts and veBAL contracts?

| Contract                                                                                                        | Purpose                                              |
|:----------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------|
| [veBAL](https://etherscan.io/tx/0xaa29cd251cdb024c415b0e13f67a0ca74fe5abc3de9a9fedd1ae26fd39be4025)             | Locks BPTs and reports veBAL balances                |
| [Gauge Controller](https://etherscan.io/address/0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD)                     | Manages Gauges and emissions                         |
| [Gauge Adder](https://etherscan.io/address/0x2fFB7B215Ae7F088eC2530C7aa8E1B24E398f26a)                          | Adds new gauges approved by governance to the system |
| [Mainnet Uncapped Gauge Factory](https://etherscan.io/address/0x4e7bbd911cf1efa442bc1b2e9ea01ffe785412ec)       | Create gauges with no cap on Mainnet                 |
| [Mainnet Capped Gauge Factory](https://etherscan.io/address/0xf1665e19bc105be4edd3739f88315cc699cc5b65)         | Create gauges with possible cap on Mainnet           |
| [Polygon Capped Gauge Factory](https://etherscan.io/address/0xa98bce70c92ad2ef3288dbcd659bc0d6b62f8f13)         | Create gauges with a possible CAP on Polygon         |
| [Polygon Child Chain Gauge Factory](https://polygonscan.com/address/0x3b8ca519122cdd8efb272b0d3085453404b25bd0) | Create child gauge to hold LP tokens on Polygon      |
| [Arbitrum Capped Gauge Factory](https://etherscan.io/address/0x1c99324edc771c82a0dccb780cc7dda0045e50e7)        | Create gauges with a possible CAP on Arbitrum        |
| [Arbitrum Child Chain Gauge Factory](https://arbiscan.io/address/0xb08e16cfc07c684daa2f93c70323badb2a6cbfd)     | Create child gauge to hold LP tokens on Arbitrum     |
