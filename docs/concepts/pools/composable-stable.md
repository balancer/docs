# Composable Stable Pools

## Overview

Composable Stable Pools are designed for assets that are either expected to consistently trade at near parity, or at a known exchange rate. Composable Stable Pools use [Stable Math](../../concepts/math/stable-math.md) (based on StableSwap, popularized by Curve) which allows for trades of significant size before encountering substantial price impact, vastly increasing capital efficiency for like-kind and correlated-kind swaps.&#x20;

### Ideal For

* **Pegged Tokens** - tokens that trade near 1:1, such as two stablecoins of the same currency (eg: DAI, USDC, USDT), or synthetic assets (eg: renBTC, sBTC, WBTC)
* **Correlated Tokens** - tokens that trade near 1:$$R$$ with some slowly changing exchange rate $$R$$, like derivatives (eg: wstETH, wETH)

### Stable Swaps Under the Balancer Umbrella

One of the key advantages to having Composable Stable Pools on Balancer specifically is that they are plugged into the same protocol as all other pools. Swapping between stablecoins is frequently used for arbitrage when one token is paired with two different stablecoins in different pools. By leveraging Batch Swaps on Balancer, these trades can be combined into a single, gas-efficient transaction.

## What Does Composable Mean?

A pool is **composable** when it allows swaps to and from its own LP token. Putting its LP token into other pools (or "nesting") allows easy Batch Swaps from nested pool tokens to tokens in the outer pool.

#### Example

With `ComposableStablePool[DAI, USDC, USDT]`, we can directly pair the LP token, or BPT, against WETH in a `WeightedPool[WETH, CSP-BPT]`. This nesting allows us to consolidate liquidity into some of the most common groupings, which results in deeper liquidity and better prices throughout Balancer. In this example, it also saves you the trouble of making 3 WeightedPools `[WETH, DAI]`, `[WETH, USDC]`, `[WETH, USDT]`.

### Pre-minting

These pools mint an effectively infinite amount of their LP tokens at the time of pool creation. This help reduce gas costs because instead of using the mint/burn mechanism to join a pool, it uses a transfer on a join/exit, which is more efficient.&#x20;

## Predecessors

**Composable Stable Pools** are a **superset of all previous Stable-type pools** (Stable Pools, MetaStable Pools, StablePhantom Pools, and StablePool v2) and therefore obsolete all previous pools.

## Use Cases

### **The Lido wstETH/WETH Liquidity Pool**

[Lido](https://lido.fi/) is a liquid staking solution for ETH 2.0 backed by industry-leading staking providers. Lido lets users stake their ETH - without locking assets or maintaining their own infrastructure. The goal is to solve problems associated with initial ETH 2.0 staking: illiquidity, immovability and accessibility by making staked ETH liquid and allowing for participation with any amount of ETH to improve the security of the Ethereum network.

stETH is a token that represents **Staked Ether**, combining the value of deposited ETH with staking returns. As an ERC20, stETH tokens can be traded as one would swap WETH, allowing the benefits of ETH 2.0 staking rewards while allowing users to continue using their staked Ether on decentralized finance products.

Balancer Composable Stable Pools are ideal for the wstETH-WETH pair as the stETH asset is highly correlated but not pegged 1:1 to ETH as it accrues staking returns.

Note: To make stETH compatible with Balancer's streaming/rebasing tokens, stETH must be wrapped into wstETH. This is done through a relayer contract.

<figure><img src="../../.gitbook/assets/Screenshot 2022-11-10 at 01.48.10.png" alt=""><figcaption></figcaption></figure>
