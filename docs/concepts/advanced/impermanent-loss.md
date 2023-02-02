# Impermanent Loss

Impermanent Loss is an extremely hot topic within decentralized finance and rightfully so. Often liquidity providers are supplying funds to a pool with a surface level understanding of how impermanent loss can affect their position. While commonly discussed as potentially wipe out the value of an entire pool or slowly chip away at their potential gains the tradeoff of volatility harvesting is not often emphasized.

The reality of impermanent loss is that it is a dynamic and reversible occurrence which is only realized when a position is removed from a liquidity pool, at this point is becomes a permanent loss. The liquidity provided is an investment on either volatility or that both assets will show extremely similar price action while accumulating trading fees. The fees are a tax paid by traders and in some cases traders are called “arbitragers”. These fees are awarded to the liquidity provider and the market making platform (in most cases) in order to incentivize the holder of a liquidity position to continue to give them a trading source.

Impermanent loss occurs when the prices of two assets experience a divergence in price action. For example if two assets increase by 20% no impermanent loss is noticed. However if one asset increases in value by 20% then a divergence has taken place and some form of impermanent loss would be noticed in the position. This can be reversed by the other token in the pool also increasing 20% or both tokens converging on the same price movement relative to the original investment. A basic example of impermanent loss followed by reversal scenario are is outlined on the following page.&#x20;

$
IL ={\frac {PoolValue}{HodlValue}}-1
$

![Impermanent Loss - Relationship shown based on a two token pool with one asset and one stable coin. ](/images/impermanent-loss.png)

::: tabs

@tab 50/50 Pools

# 50/50 Pools

We will start with a simple 50/50 pool featuring COMP/WETH. We take a time when WETH is worth $2,000 USD and we have 2.5 WETH ($5,000.00). At the same time COMP is worth $250.00 therefore we are investing 20 COMP tokens. Our liquidity position is deposited and we receive pool tokens for this $10,000 investment.

We check back out our position after a period of time and COMP has doubled, 100% gains straight to $500.00 USD. WETH has only made it up to $2300.00 at this point, gains of just 15%. We know at this point we will face some impermanent loss. We still have strictly gains but due to our liquidity position we are missing out on some of our investment in theory.

_Here we calculate the invariant from the value function:_

Here we can consider the USD values to be the same in the numerator and denominator therefore not needed to determine the ratio between the two.

For the new token balances we consider the invariant ratio compared to the price action of the individual asset. This proportion will yield the new balance of each token in relation to the initial investment.

_**Please note these calculations can take place over any time frame. These occurred in roughly 12 days between June 25 and July 07 of 2021. This same price action can take place over the course of 1 year and with 4% or more in swap fees or liquidity mining accumulating the LP position would become the more rewarding option.**_

These calculations are depicted by the following tables.

**Initial Investment: $10,000.00**

**HODL Total: $15750.00**

**LP Total $15165.75; with 4% Annual yield $15,772.38**

In our prior example COMP and WETH went through divergent price changes. When this happens, we saw the potential loss of value that can be created by the nature of impermanent loss. Now if our prices continue to change, we will look at an example where WETH goes up to a price of $3000.00 and COMP decreases down to $375.00. While these are diverging prices changes this will bring us to a 50% gain for both assets in relation to our original investment.

$$
V=20^{0.5}*2.5^{0.5}=7.071068 \\\ \\ V_2= (20*1.5)^{0.5}*(2.5*1.5)^{0.5}=10.6066017 \\\ \\ Invariant\ Ratio= {\frac {V_2}{V}}={\frac {10.6066017}{7.071068}}=1.5
$$

Therefore, because our invariant ratio matches our price action ratio, we have an indicator that there will be no impermanent loss.

This calculation will be done from the point where impermanent loss was experienced to the current state to prove the “loss” is indeed reversible under the proper conditions.

**Initially:**

**After Price Change:**

New Token Balances can be calculated as follows:

$$
New\ Token\ Balances:B_{t'}*{\frac {Ratio_{LP}}{Price\ Action_t}} \\\ \\WETH:3.2969*{\frac {0.9890703}{1.30435}}=2.5 \\\ \\COMP: 15.16575*{\frac {0.9890703}{0.75}}=20
$$

These balances match our initial investment meaning overall we lost nothing impermanent loss. The price action is still in our favor by 50% for both assets as we hold the same initial number of each. Also, we would have likely earned swap fees for this from traders making our gains slightly larger.

Through the price action regardless of how dramatic impermanent loss can be reversed as seen above. This can occur countless times as prices of assets in a pool fluctuate in price. The importance of this is understanding the assets you are holding and how comfortable you are with volatility. In theory great volatility will be coupled with large volumes of trading making the swap fees and gains for liquidity providers increase. Weighing the risk of impermanent loss with the reward of accumulating swap fees or “volatility farming” is the game of a liquidity provider long term.

:::
