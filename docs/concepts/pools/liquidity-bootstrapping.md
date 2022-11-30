# Liquidity Bootstrapping Pools (LBPs)

## Overview

Liquidity Bootstrapping Pools (LBPs) are pools that can dynamically change token weighting (e.g 1/99 to 99/1 for TokenA/TokenB). LBPs use [Weighted Math ](../../concepts/math/weighted-math.md)with time-dependent weights. The starting and end weights and times are selected by the pool owner, who also has the power to pause swaps.&#x20;

### Mental Model

You can think of the starting price of your LBP as the ceiling you would want to set for the token sale. This may seem counterintuitive, but since LBPs work differently than other token sales, your starting price should be set much higher than what you believe is the fair price.

This does not mean you are trying to sell the token above what it is worth. Setting a high starting price allows the changing pool weights of your LBP to make their full impact, lowering the price progressively until market equilibrium is reached. Unlike older token sale models, such as bonding curves, users are disincentivized to buy early and instead benefit from waiting for the price to decrease until it reaches a level they believe is fair.&#x20;

## Advantages

### Sell Pressure

During a weight shift, the token price of one token experiences sell pressure while the other experiences buy pressure. When this is mixed with modest trading volume, the price approaches the generally agreed-upon market price.&#x20;

### Fair Market

LBPs often start with intentionally high prices. This strongly disincentivizes whales and bots from snatching up much of the pool liquidity at the get-go. When LBPs are used for early-stage tokens, this can help increase how widespread the token distribution is.

### Starting Capital Can Be Small

Teams who use LBPs to kickstart the liquidity of a token that has not been well distributed yet can do so with minimal starting capital. For a team running an LBP with their TOKEN and DAI, starting with 10% or 20% DAI, as opposed to 50% DAI __ like they might need on another platform, significantly reduces their starting capital requirements. Shifting from 80/20 TOKEN/DAI __ to 20/80 would look like this:

![](https://lh3.googleusercontent.com/jJSoUvPnPwQFAEemsJlKZctFspEJrRQhRIncmoaaq5a6\_CzyXssVwokti4HQQyIBqVcv5GG9bMKDplrAaDIC3MkdFoVJAprLHu\_NhTSWW4GEoMRe3mUhFnB0lG3kVqIGvjK7aGJD=s0)

and would ultimately result in the team holding far more DAI __ at the end of their LBP while reducing the (sometimes extreme) price volatility that teams experience when just launching a 50/50 pool.

## Use Cases

### Fjord Foundry Fair Launch Auctions

[Fjord Foundry](https://fjordfoundry.com/pools) is a platform for Fair Launch Auctions (FLAs) — a simple crowdfunding mechanism that enables projects and ideas from across the world to raise money from individuals without barriers to entry. Fjord makes it easy to create and use LBPs through their intuitive and easy-to-use website. The main concept allows distribution of Tokens and NFTs with transparent, open and fair price discovery mechanism. Fjords long-standing reputation led to a recent [exclusive collaboration agreement](https://snapshot.org/#/balancer.eth/proposal/0xcc065f373e15a264e1647bc794a4a83039fc4d377a69875ec828eb0148faa4ba) between the Balancer DAO and Fjord Foundry.

### Gitcoin's AKITA/ETH LBP

[Gitcoin's LBP](https://copperlaunch.com/pools/0xC065798F227b49C150bCDC6CDc43149A12c4d757) is composed of AKITA and WETH, and is meant to slowly transfer the Akita held by Gitcoin (as donated by Vitalik) back to the community. Using an LBP here is useful in performing a gradual sale with continuous pressure. Gitcoin is running a few of these in succession to validate the process, raise more ETH for the next LBPs, and also help fund public goods. Some of the ETH generated will be split with the Akita Development fund and a Dog Rescue charity.
