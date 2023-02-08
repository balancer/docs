---
references:
  - details: Linear Math
    link: /reference/math/linear-math
---

# Linear Pools

## Overview

Linear pools are designed to facilitate swaps between assets and their yield bearing, wrapped counterparts. For example, DAI and aDAI from Aave. The pools use [Linear Math](/reference/math/linear-math.md) and are usually used as a component in a [Boosted Pool](./boosted.md). Linear pools have set ranges to decide how much of the native token should be kept available for swaps vs the yield bearing counterpart. They use a positive/negative fee mechanism to incentivize arbitrageurs to maintain a desired ratio between the two tokens.

## Subtypes

Since there are lots of ways to generate yield in Defi there are different interfaces for yield bearing tokens. [ERC-4626](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/) is a standard to unify the API for tokenized yield-bearing vaults and is the primary Linear pool type. A complete list with links to the codebase:

- [ERC4626 Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/erc4626-linear-pool/ERC4626LinearPool.sol)
- [Aave V2 Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/aave-v2-linear-pool/AaveLinearPool.sol)
- [Euler Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/euler-linear-pool/EulerLinearPool.sol)
- [Yearn Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/yearn-linear-pool/YearnLinearPool.sol)
- [Beefy Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/beefy-linear-pool/BeefyLinearPool.sol)
- [Gearbox Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/gearbox-linear-pool/GearboxLinearPool.sol)
- [Silo Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/silo-linear-pool/SiloLinearPool.sol)
- [Reaper Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/reaper-linear-pool/ReaperLinearPool.sol)
- [Tetu Linear Pools](https://github.com/orbcollective/linear-pools/blob/master/packages/linear-pools/contracts/tetu-lineat-pool/TetuLinearPool.sol)
