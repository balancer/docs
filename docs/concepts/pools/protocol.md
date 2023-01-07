# Protocol Pools

Unlike any of the other pool categories where the pool can be thought of as an indvidual entity, Protocol pools represent entire defi protocols built on top of Balancer infrastructure. Protocol pools can implement any sort of arbitrary logic & design and leave the underlying accounting and security to the Balancer Vault. In simpler terms: **programmable liquidity**.

## The case to build on top of Balancer

Over the last few years there have been hundreds of experiments in AMM & Dex design. One of the biggest hurdles new AMMs have faced is underestimating the importance of having each of the actors neccessary to create healthy trading ecosystem. These actors are: retail traders, dex aggregators, arbitrauegers, and liquidity providers. If a single one of those actors is missing on an AMM it breaks the liquidity flywheel and leads to dimishing trade volume and poor returns.

Even with strong technical teams and innovative iterations on Uniswap's concentrated liquidity (meaning TVL is less important), there have been notable AMMs launched in the last 6 months that have already failed.

### Aggregators

Dex aggregators have limited resources and limitless sources of liquidity so it can be difficult asking for an integration. 1inch, 0x, Paraswap, and Gnosis solvers all represent very meaningful sources of volume. Balancer has full integration with each aggregator and strong connections to the teams. Through the Smart Order Router or custom implementation logic, new pool types and logic can be accessed by aggregator volume in a matter of days after going live.

### Arbitrageurs

Although there is some nuance around arbitrage volume and types of order flow that will be glossed over in this overview, arbitrageurs still represent a necessary piece to creating a sucessful dex. Like aggregators, arbitrageurs carefully select which protocols to dedicate resources to. And even exact forks of existing AMMs require new logic and monitoring to be built. SCP, Wintermute, and other top trading firms are all trading with Balancer liquidity.

### Liquidity

Once deployed, protocol pools are immediately hooked into one of the deepest and diverse sources of liquidity in Defi. This means that the assets in the new pool are now easily added to swap routes with stablecoins and other base assets like ETH, wstETH, and wBTC. Unlike other AMMs and dexes, the additional hops within a swap route do not incur additional token transfers and therefore gas. This unlocks all sorts of interesting swap combinations and routes between the various pool types in the Balancer ecosystem.

### Security

Another important consideration when deciding between building a standalone AMM vs building on top of Balancer is smart contract security. Very few non-forked dex designs have survived the last cycle due to exploits. Even assuming secure code, it can takes months if not years for a smart contract to be "lindy" enough for larger sources of capital to consider entering. By building on Balancer, the underlying security of the Vault and it's token accounting is inherited and the new protocol only needs to worry about the curves and the math behind the implementation. The Balancer Vault secures over a billion dollars in assets and has been audited by many of the top auditing firms.