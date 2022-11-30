# Stable Math

## Overview

Stable Math is designed to allow for swaps between any assets that have the same price, or are "pegged" to the same asset. The most common examples are stablecoins that track US Dollars (DAI, USDT, USDC), and assets that track the price of Bitcoin (WBTC, renBTC, sBTC). Prices are determined by the pool balances, the _amplification parameter_, and amounts of the tokens that are being swapped.

## Implementations

### TypeScript

Developers can use the TypeScript math implementations used by the Smart Order router

* [stableMath.ts](https://github.com/balancer-labs/balancer-sor/blob/john/v2-package-linear/src/pools/stablePool/stableMath.ts)
* [metaStableMath.ts](https://github.com/balancer-labs/balancer-sor/blob/john/v2-package-linear/src/pools/metaStablePool/metaStableMath.ts)

### Python

There are also Python implementations in progress

* ~~~~[~~stableMath.py~~](https://github.com/officialnico/balancerv2cad/blob/main/src/balancerv2cad/StableMath.py) There are known bugs in this implementation. This warning will be removed when they are fixed.

## Invariant

Since the Stable Math equation is quite complex, determining the invariant, $$D$$, is typically done iteratively. For an example of how to do this, please refer to [this function](https://github.com/georgeroman/balancer-v2-pools/blob/main/src/pools/stable/math.ts#L16).

$$
A \cdot n^n \cdot \sum{x_i} +D = A \cdot D \cdot n^n + { \frac{D^{n+1}}{{n}^{n}\cdot \prod{x_i} } }
$$

Where:

* $$n$$ is the number of tokens
* $$x_i$$ is is balance of token $$i$$
* $$A$$ is the amplification parameter

## Trade Equations

Similar to determining the invariant, determining (out/in) amount given (in/out) amounts is also done iteratively. Both [outGivenIn](https://github.com/georgeroman/balancer-v2-pools/blob/db415173277bfa86d9aa6b0c1fbd15481c7a2398/src/pools/stable/math.ts#L88) and [inGivenOut](https://github.com/georgeroman/balancer-v2-pools/blob/db415173277bfa86d9aa6b0c1fbd15481c7a2398/src/pools/stable/math.ts#L138) use the same function, [getTokenBalanceGivenInvariantAndAllOtherBalances](https://github.com/georgeroman/balancer-v2-pools/blob/db415173277bfa86d9aa6b0c1fbd15481c7a2398/src/pools/stable/math.ts#L502).

### outGivenIn

$$
y^2 + (\frac{D}{An^n} + \sum_{j \neq out}{x'_j} - D)y        -\frac{D^{n+1}}{An^{2n} \prod_{j \neq out}{x'_j}}= 0
$$

$$
a_{out} = x_{out} - x'_{out} = x_{out} - y
$$

Where:

* $$x'_i$$ is the **ending** amount of each token
* $$a_{out}$$is the amount out
* $$x_{out}$$is the **starting** amount of the output token
* $$y = x'_{out}$$is the **ending** amount of the output token
* $$D$$ is the pool invariant
* $$A$$ is the amplification parameter
* $$n$$ is the number of tokens

### inGivenOut

$$
y^2 + (\frac{D}{An^n} + \sum_{j \neq in}{x'_j} - D)y        -\frac{D^{n+1}}{An^{2n} \prod_{j \neq in}{x'_j}}= 0
$$

$$
a_{in} = x'_{in} - x_{in}  = y-x_{in}
$$

Where:

* $$x'_i$$ is the **ending** amount of each token
* $$a_{in}$$is the amount in
* $$x_{in}$$is the **starting** amount of the input token
* $$y = x'_{in}$$is the **ending** amount of the input token
* $$D$$ is the pool invariant
* $$A$$ is the amplification parameter
* $$n$$ is the number of tokens
