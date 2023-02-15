# Protocol Pools

Unlike any of the other pool categories where the pool can be thought of as an indvidual entity, Protocol pools represent entire defi protocols built on top of Balancer infrastructure. Balancer provides the infrastructure for custom AMM’s by separating the pool logic from the accounting logic. Any AMM logic can be implemented as a custom pool on top of the Balancer vault and as a result, the design space of Balancer pools is infinite. In simpler terms: **programmable liquidity**.

::: tip Case Study: Gyroscope

Gyroscope is a stablecoin defi project built on top of Balancer using concentrated liquidity pools. [Learn More](https://docs.gyro.finance/gyroscope-protocol/concentrated-liquidity-pools#description)

:::

## The case to build on top of Balancer

Over the last few years there have been hundreds of experiments in AMM & Dex design. One of the biggest hurdles new AMMs have faced is underestimating the importance of having each of the actors neccessary to create a healthy trading ecosystem. These actors are: retail traders, dex aggregators, arbitrauegers, and liquidity providers. If a single one of those actors is missing on an AMM it breaks the liquidity flywheel and leads to dimishing trade volume and poor returns.

Even with strong technical teams and innovative iterations on Uniswap's concentrated liquidity (meaning TVL is less important), there have been notable AMMs launched in the last 6 months that have already failed.

### Aggregators

Dex aggregators have limited resources and limitless sources of liquidity so it can be difficult asking for an integration. 1inch, 0x, Paraswap, and Gnosis solvers all represent very meaningful sources of volume. Balancer has full integration with each aggregator and strong connections to the teams. Through the [Smart Order Router](/concepts/advanced/smart-order-router.md) or custom implementation logic, new pool types and logic can be accessed by aggregator volume in a matter of days after going live.

A great real world example of an AMM built on Balancer seeing success after a quick aggregator integration: [Gyroscope volumes surge after 1inch integration on Polygon.](https://twitter.com/GyroStable/status/1605538356221251586)

### Arbitrageurs

Although there is some nuance around arbitrage volume and types of order flow that will be glossed over in this overview, arbitrageurs still represent a necessary piece to creating a sucessful dex. Like aggregators, arbitrageurs carefully select which protocols to dedicate resources to. And even exact forks of existing AMMs require new logic and monitoring to be built. SCP, Wintermute, and other top trading firms are all trading with Balancer liquidity.

### Liquidity

Once deployed, protocol pools are immediately hooked into one of the deepest and diverse sources of liquidity in Defi. This means that the assets in the new pool are now easily added to swap routes with stablecoins and other base assets like ETH, wstETH, and wBTC. Unlike other AMMs and dexes, the additional hops within a swap route do not incur additional token transfers and associated gas. This unlocks all sorts of interesting swap combinations and routes between the various pool types in the Balancer ecosystem.

Other features of the Vault a new protocol pool can take advantage of include [flash swaps](/reference/swaps/flash-swaps.md), [batch swaps](/reference/swaps/batch-swaps.md), [flash loans](/reference/contracts/flash-loans.md) of pool assets, and [internal balances](/reference/contracts/internal-user-balances.md).

### Security

Another important consideration when deciding between building a standalone AMM vs building on top of Balancer is smart contract security. Very few non-forked dex designs have survived the last cycle due to exploits. Even assuming secure code, it can takes months if not years for a smart contract to be "lindy" enough for larger sources of capital to consider entering. Balancer v2 has been live for almost 2 years and has one of the biggest [bug bounties](https://immunefi.com/bounty/balancer/) in the DeFi space. The codebase has been [extensively audited](/reference/contracts/security.md) by top names in the smart contract auditing space, such as Trail of Bits and Certora. The Balancer Vault keeps pool balances independent from one another while inheriting the benefits of a single contract vault model. Balancer governance has no control over any pool parameters unless explicitly authorized and is fully non custodial.

### Ecosystem & Tooling

Balancer has integrations across the DeFi space that a protocol built on top can easily tap into. This includes: money markets supporting Balancer Pool Tokens as collateral, wallets with BPT pricing, block explorers showing swap actions, etc.

Balancer will support innovative pool types with the grants program and can collaborate on marketing efforts. It’s very common for projects to secure grants to either support custom pool development or cover audit costs. Opportunities may arise for new pool types to be integrated into veBAL incentive systems and have their pool incentivized with BAL tokens. Balancer is proud to have a close relationship with Certora in the form of the [Balancer Certora Security Accelerator](/reference/contracts/security.md#balancer-x-certora-accelerator) program. This allows project building integrations with Balancer to get professional code review from some of the people most intimately familiar with Balancer's codebase.
