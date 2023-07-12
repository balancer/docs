---
references:
  - details: Linear Math
    link: /reference/math/linear-math
---

# Linear Pools

## Overview

Linear Pools are Balancer pools that facilitate the exchange of an asset and its wrapped, yield bearing counterpart at a known (calculated or queried) exchange rate. For example, `DAI` and wrapped `aDAI` from Aave. Linear Pools have target ranges to incentivize how much of the native token should be kept available for swaps vs the yield bearing counterpart. They use a fee/reward mechanism to incentivize arbitrageurs to maintain a desired ratio between the two tokens (pay fees for leaving the target range, receive reward for returning to range). One additional critical feature of Linear Pools is that they allow users to trade directly to BPT; no joins or exits are needed. The pools use [Linear Math](/reference/math/linear-math.md) and are usually used as a component in a [Boosted Pool](./boosted.md).

## Subtypes

Since there are lots of ways to generate yield in DeFi there are different interfaces for yield bearing tokens. [ERC-4626](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/) is a standard to unify the API for tokenized yield-bearing vaults and is the primary Linear Pool type.

A few sample Linear Pools (see all pools [in the repo](https://github.com/orbcollective/linear-pools/tree/master/pkg/linear-pools/contracts)):
- [ERC4626 Linear Pool](https://github.com/orbcollective/linear-pools/blob/master/pkg/linear-pools/contracts/erc4626-linear-pool/ERC4626LinearPool.sol)
- [Aave V2 Linear Pool](https://github.com/orbcollective/linear-pools/blob/master/pkg/linear-pools/contracts/aave-v2-linear-pool/AaveLinearPool.sol)
- [Euler Linear Pool](https://github.com/orbcollective/linear-pools/blob/master/pkg/linear-pools/contracts/euler-linear-pool/EulerLinearPool.sol)
- [Yearn Linear Pool](https://github.com/orbcollective/linear-pools/blob/master/pkg/linear-pools/contracts/yearn-linear-pool/YearnLinearPool.sol)
- [Gearbox Linear Pool](https://github.com/orbcollective/linear-pools/blob/master/pkg/linear-pools/contracts/gearbox-linear-pool/GearboxLinearPool.sol)

## Protocol Id
During the creation of a LinearPool a `protocolId` parameter needs to be passed.  One and the same LinearPoolFactory can however be used to create Linear Pools for multiple different protocols, if they are for example forks. Since the creation of a LinearPool is permissionless a [process to register protocols](https://forum.balancer.fi/t/rfc-grant-balancer-maxis-the-authorisation-to-register-protocolids-for-linearpools/4435) is required to allow data-consumers to distinguish which pool belongs to which protocol, even if the pool has been created from the same factory.
