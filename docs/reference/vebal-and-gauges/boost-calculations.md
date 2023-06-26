# veBAL Boost Calculation

::: info
A range of 1x to 2.5x of the calculated APR is possible. A user may be interested in the minimum amount of veBAL for max boost, how their boost is calculated, and the maximum boost they can receive in cases where 2.5x is not attainable.
:::

For these calculations consider the following:

<!-- prettier-ignore-start -->
* `l` = the liquidity a user will provide and stake in a gauge
* `L` = the total liquidity which is staked in a pool before a user stakes their own
* `L'` = The total liquidity staked in the gauge after a user stakes 
$$ L' = L + l $$ 
* `workingSupply` = Working supply is related to the amount of veBAL corresponding to the individual stakers and total pool liquidity staked. This will be denominated in terms of the user and the pool.
$$ workingSupply = \min \left(0.4 * l + 0.6 * L' * \frac{veBAL \ Held}{Total\ veBAL} \ , \ l \right) $$
* `min_veBAL` = Minimum veBAL needed for maximum boost (2.5x)

Minimum veBAL for Maximum Boost
The minimum veBAL a liquidity provider will require in order to receive maximum incentives boost on their staked amount is calculated as follows:
$$ Min \ veBAL_{max \ boost} = Total \ veBAL * \frac{ l } { L' } $$

# Calculating Your Boost
For a user to calculate their incentives boost they must go through the following steps:

1. Calculate the users' working supply
$$ workingSupply_{user} = min \left(0.4 \ * \ l + 0.6 \ * \ L' * \frac{veBAL / held}{Total \ veBAL}, \ l \ \right) $$

2. Calculate the users' non-boosted, or minimum working supply
$$ Non-boosted \ working \ supply_{user} = 0.4 \ * \ l $$

3. Calculate the user's boost multiplier using:
$$ Boost = \frac{\frac { working \ supply_{user} } { working \ supply_{user} \ + \ total \ working \ supply_{pool} } } { \frac { Non-boosted \ working \ supply_{user} } { Non-boosted \ working \ supply_{user} \ + \ total \ working \ supply_{pool} } } 
$$

In the case a user already has liquidity staked in the pool and is adding additional liquidity the current working supply must be subtracted from the considerations.

$$ Boost = \frac{\frac { working \ supply_{user} } { working \ supply_{user} \ + \ total \ working \ supply_{pool} \ - \ current \ working \ supply_{user} } } { \frac { Non-boosted \ working \ supply_{user} } { Non-boosted \ working \ supply_{user} \ + \ total \ working \ supply_{pool} \ - \ current \ working \ supply_{user} } } 
$$

# Calculating Maximum Boost
The maximum boost a user can receive in a pool will not always be 2.5x. Due to other holders in the pool, depending on their veBAL holdings, there is a point where one cannot own enough veBAL to dilute the rest of users to receive max boost. 

$$ max boost = 2.5 \ * \ \frac{ Non-boosted \ working \ supply_{user} \ + \ total \ working \ supply_{pool} } {max \ working \ supply_{user} \ + \ total \ working \ supply_{pool}} $$

Similar to the user's boost above, if a user is adding more to their current position their current working supply must be subtracted to arrive at the correct result.

$$ max boost = 2.5 \ * \ \frac { Non-boosted \ working \ supply_{user} + total working \ supply_{pool} \ - \ current \ working \ supply_{user} } { max \ working \ supply_{user} \ + \ total \ working \ supply_{pool}\  - \ current \ working \ supply_{user}} $$
<!-- prettier-ignore-end -->
