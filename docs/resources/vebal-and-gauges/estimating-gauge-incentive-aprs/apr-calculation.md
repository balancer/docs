---
description: Formula to calculate the annual percentage rate (APR) of gauge incentives
---

# APR Calculation

Congratulations, you now obtained all relevant data to calculate the gauge APR. Please note that for mainnet liquidity mining APRs are boostable, therefore a range of 1x to 2.5x of the calculated APR is possible.

$$
minAPR(1x) = \frac{\frac{0.4}{ (workingSupply + 0.4) }* gaugeRelWeight * weeklyBALemission * 52 * priceOfBAL}{ pricePerBPT} * 100
$$

where

* `workingSupply` = value obtained from the gauge vyper contract in step 2
* `gaugeRelWeight` = relative voting weight obtained from the gauge controller contract from step 3
* `weeklyBALemissions` = **** currently active weekly emissions, fixed at 145’000 BAL
* `priceOfBAL` = price of BAL in $ as obtained from an external pricing provider
* `pricePerBPT` = price per balancer pool token as inferred from step 4
