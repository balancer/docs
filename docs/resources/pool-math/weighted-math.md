# Weighted Math

## Overview

Weighted Math is designed to allow for swaps between any assets whether or not they have any price correlation. Prices are determined by the pool balances, pool weights, and amounts of the tokens that are being swapped.

Balancer's Weighted Math equation is a generalization of the $$x*y=k$$ constant product formula, accounting for cases with $$n \geq2$$ tokens as well as weightings that are not an even 50/50 split.&#x20;

For more formulas and derivations of the below formulas, please refer to the [Balancer Whitepaper](https://balancer.fi/whitepaper.pdf).

## Implementations

### TypeScript

Developers can use the TypeScript math implementations used by the Smart Order router

* [weightedMath.ts](https://github.com/balancer-labs/balancer-sor/blob/john/v2-package-linear/src/pools/weightedPool/weightedMath.ts)

### Python

There are also Python implementations in progress

* [weightedMath.py](https://github.com/officialnico/balancerv2cad/blob/main/src/balancerv2cad/WeightedMath.py)

## Invariant

The value function $$V$$is defined as:

$$
V= \prod_t B_t^{W_t}
$$

Where

* $$t$$ ranges over the tokens in the pool
* $$B_t$$ is the balance of the token in the pool
* $$W_t$$​is the normalized weight of the tokens, such that the sum of all normalized weights is 1.

## Spot Price

Each pair of tokens in a pool has a spot price defined entirely by the weights and balances of just that pair of tokens. The spot price between any two tokens,$$SpotPrice^o_i$$, or in short $$SP^o_i$$, is the the ratio of the token balances normalized by their weights:

$$
SP^o_i = \frac{\frac{B_i}{W_i}}{\frac{B_o}{W_o}}
$$

* $$B_i$$ is the balance of token $$i$$, the token being sold by the trader which is going into the pool
* $$B_o$$ is the balance of token $$o$$, the token being bought by the trader which is going out of the pool
* $$W_i$$ is the weight of token $$i$$&#x20;
* $$W_o$$ is the weight of token $$o$$

### Spot Price with Swap Fees

When we consider swap fees, we do exactly the same calculations as without fees, but using $$A_i \cdot (1-swapFee)$$ instead of $$A_i$$ since fees are taken out of the input amount. The equation then becomes:

$$
SP^o_i = \frac{\frac{B_i}{W_i}}{\frac{B_o}{W_o}} \cdot \frac{1}{1-swapFee}
$$

## Trade Equations

### outGivenIn

When a user sends tokens $$i$$ to get tokens $$o$$, all other token balances remain the same. Therefore, if we define $$A_i$$ and $$A_o$$ as the amount of tokens $$i$$ and $$o$$ exchanged, and since the value function $$V$$ must be constant before and after the trade, we can calculate the amount $$A_o$$ a users gets when sending $$A_i$$.&#x20;

$$
A_o = B_o \cdot \left(1-\left(\frac{B_i}{B_i + A_i}\right)^{\frac{W_i}{W_o}}\right)
$$

{% hint style="info" %}
If you're computing this value yourself, remember that the pool collects swap fees as a percentage of the **input token**. In the equation above,$$A_i$$ is the amount that the pool actually swaps into the output token, not the amount sent by a trader, $$A_{sent}$$. To calculate through, we must compute:$$A_i = A_{sent} * (1-swapFee)$$
{% endhint %}

### inGivenOut

It is also very useful for traders to know how much they need to send of the input token $$A_i$$ to get a desired amount of output token $$A_o$$:&#x20;

$$
A_i = B_i \cdot \left(\left(\frac{B_o}{B_o - A_o}\right)^{\frac{W_o}{W_i}}-1\right)
$$
