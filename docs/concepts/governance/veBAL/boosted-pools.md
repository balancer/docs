
# Boosted Pools  - This may be replaced by more robust documentation
[BIP-19](https://forum.balancer.fi/t/bip-19-incentivize-core-pools-l2-usage) introduced Boosted Pools, which involve 
a special kind of handling for derivitive tokens, such as aUSDC or wstETH, that increase in price 
per share against an underlying token and have a clear/stable rate provider that describes the current exchange rate.  
When a rate-provider is specified, the increasing value of underlying assets is handled as follows:

_Last updates as of [BIP-161](https://snapshot.org/#/balancer.eth/proposal/0x12bce443c7bd212b3fdd18468433fc959740610888300d5a30eb35de94662790) in February 2023._
 - 50% of the fees will be left for the LPs in an increase in the underlying value of the component tokens per pool token.
 - 50% of the increase in value is paid taken as revenue into the DAO.
   - 35% of which is paid onward to the DAO treasury
   - The rest of which is used to place bribes on [Hidden Hands](https://hiddenhand.finance/balancer) on the pools that generated the rewards, 
     thereby increasing the staking ROI through more votes and BAL emissions. 
     - Note that handling for Mainnet and other chains is a bit differnet as to how the fees are distributed, 
       see [BIP-19](https://forum.balancer.fi/t/bip-19-incentivize-core-pools-l2-usage/3329#specification-4) for details.
 
### Defining Boosted Pool
A boosted pool is any pool that makes use of a [rate provider](/docs/reference/contracts/rate-providers.md), or an 
approved Boosted [Linear Pool](../../pools/linear.md) for more than 50% of it's assets.


