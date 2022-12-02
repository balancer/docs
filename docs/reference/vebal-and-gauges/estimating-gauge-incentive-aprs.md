# Estimating Gauge Incentive APRs

## How can I obtain/calculate the liquidity mining APR for a certain gauge?

Balancer introduced a new tokenomics system for the Balancer Governance Token (BAL) based on Curve's _ve_ model. The system revolves around following concepts:

* A new token “veBAL” is obtained by locking 80:20 BAL:WETH BPTs for a certain duration. This token allows a user to participate in governance, determine where liquidity mining incentives go, and collect a share of protocol fees
* veBAL holders can decide where liquidity mining incentives are directed by allocating their vote to "gauges" that are referencing staking contracts of pre-approved pools in the Balancer ecosystem (Mainnet, Arbitrum, Polygon, and Optimism)
* The overall gauge vote percentage directs the weekly BAL emissions. If the weekly total amount is 145,000 BAL per week, a pool gauge with 1% of the vote will net in 1,450 BAL towards that gauge
* Emissions are set based on the previous weeks voting round which concludes each Thursday 00:00 UTC

To estimate the BAL liquidity mining APR for a certain gauge, various endpoints have to be read. Currently, there is not an API to obtain the APRs as they have to be calculated on the fly.&#x20;

Follow the steps below to calculate the liquidity mining APR for a certain gauge (explained in more detail in [data fetching](data-fetching.md)):

1. Obtain the current gauge whitelist from the front-end repo
2. Obtain the working supply for each gauge by reading gauge vyper contracts
3. Obtain the relative weight for each gauge via the gauge controller contract
4. Infer the price per Balancer Pool Token (BPT) price from the balancer-v2 subgraph
5. Fetch the current BAL price

