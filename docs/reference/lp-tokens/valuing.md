# Valuing

## Overview

It's common to want to know what a Balancer LP token is worth. This generally comes down to its Net Asset Value (NAV), ie the value of the underlying tokens.

### Directly Calculating NAV

Directly calculating NAV is the simplest way to value an LP token. In short, it is calculated by getting all underlying balances, multiplying those by their market prices, and dividing by the total supply of LP tokens.

This method is quick and easy for informational purposes, but is vulnerable to manipulation if you need to know a Balancer LP token's value on-chain. An added bonus is that this technique works for all pool types because it simply gets the value of all underlying tokens.

#### Equation

$$
Price_{LP token}=\frac{\Sigma_{i}{(Balance_i*Price_i)}}{Supply_{LP Tokens}}
$$

#### Pseudocode

```
(tokens, balances, lastChangeBlock) = vault.getPoolTokens(poolId);
prices = fetchPricesFromPriceProvider(tokens); //ex. CoinGecko
poolValueUsd = sum(balances[i]*price[i]);
bptPriceUsd = poolValueUsd/bpt.totalSupply();
```

{% hint style="warning" %}
#### **Note about pre-minted BPT**

Some pools (like bb-a-USD) have pre-minted BPT. This means all LP tokens are minted at the time of pool creation so that you can use a swap to effectively join/exit the pool. Because of this, when querying the supply, you should **NOT** use `bpt.getSupply()`, but rather use `bpt.getVirtualSupply()`.
{% endhint %}

**And if you want to calculate a pool value for a given address...**

`myBptValueUsd = bpt.balanceOf(myAddress) * bptPriceUsd;`

{% hint style="warning" %}
The above assumes you have your BPT in your wallet. If you have staked your BPT in a gauge, you'll need to calculate your BPT holdings as:\
`myBpt = bpt.balanceOf(yourAddress) + bptGaugeDeposit.balanceOf(yourAddress);`
{% endhint %}

### Estimating Price On-chain

Balancer Labs is working on a contract to facilitate this. Coming Soon$$^{TM}$$

