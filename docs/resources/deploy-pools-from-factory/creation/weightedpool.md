# WeightedPool

## Common Arguments

In addition to the arguments listed below, you should also consider the [common arguments](./#common-arguments) when creating a pool.&#x20;

## Pool Creation Arguments

### Weights

The weights for each token represent the percentage of the pool value that is denominated in that token (assuming an efficient market).&#x20;

For example a 50/50 WETH/WBTC pool will have 50% of its value is WETH and the other 50% in WBTC. Similarly, an 80/20 BAL/WETH pool will hold 80% of its value in BAL and 20% in WETH.

Weight arguments use 18 decimals and must add up to 1.

### oracleEnabled (WeightedPool2Tokens only)

If you're deploying a pool of type WeightedPool2Tokens, you're given the option of turning the oracle functionality on/off. This is passed as a boolean.
