# Fee Discount for 1inch and CoW

## Introduction

Balancer has implemented a swap fee discount program that allows approved aggregators and solvers to benefit from reduced swap fees when interacting with Balancer V2 pools. This program was established through a series of governance proposals:

- [BIP-295](https://forum.balancer.fi/t/bip-295-fee-discount-for-cowswap-solvers/4785): Initial approval for CoW Protocol solvers
- [BIP-334](https://forum.balancer.fi/t/bip-334-fee-discount-for-1inch-labs-solver/4871): Extension to 1inch Labs solver
- [BIP-369](https://forum.balancer.fi/t/bip-369-grant-cspv5-swap-fee-permissions-to-cowswap-1inch-labs-solver/5003): Addition of Composable Stable Pool v5 support

This program is available to:

- 1inch Labs Fusion resolver
- CoW Protocol solvers

The program aims to increase non-toxic flow through the protocol by enabling these approved entities to execute trades with an 80% discount on swap fees. With Balancer V3 now launched, there are no plans to expand this V2-specific program to additional integrators.

## How It Works

The mechanism relies on granting specific smart contracts the ability to dynamically adjust swap fees. This is implemented by:

1. Granting the `setSwapFeePercentage` role to the solver's contract
2. The solver then:
   - Lowers the swap fee on the pool before execution
   - Executes the swap
   - Returns the swap fee to its original value after execution

## Supported Pools

The following pool factory types are supported across networks:

### Ethereum, Polygon, and Arbitrum

- WeightedPool (v1-v4)
- WeightedPool2Tokens
- StablePool (v1-v2)
- ComposableStablePool (v1-v4)
- MetaStablePool (where applicable)

## Approved Contracts

The following contracts have been granted the swap fee discount permissions:

### 1inch Labs Fusion Resolver

- Ethereum: `0xad3b67bca8935cb510c8d18bd45f0b94f54a968f`
- Arbitrum: `0xad3b67bca8935cb510c8d18bd45f0b94f54a968f`
- Polygon: `0xad3b67bca8935cb510c8d18bd45f0b94f54a968f`

### CoW Protocol Settlement (Ethereum Only)

- Ethereum: `0x9008D19f58AAbD9eD0D60971565AA8510560ab41`

## Implementation Details

Each approved integrator must implement the following pattern for every interaction with Balancer V2 pools:

1. First Interaction: Set Reduced Swap Fee
```solidity
// Call on the target pool
function setSwapFeePercentage(uint256 reducedSwapFeePercentage)
```

2. Execute the swap(s)

3. Last Interaction: Reset Original Swap Fee
```solidity
// Call on the target pool
function setSwapFeePercentage(uint256 originalSwapFeePercentage)
```

Example simulation of such interaction can be found here: [Tenderly Simulation](https://dashboard.tenderly.co/gp-v2/staging/simulator/e2abd440-d0f9-4ad5-9e4e-b9c690f3a5cc)

## Disclaimer

Balancer actively monitors the proper setting and resetting of swap fees by approved participants. The team should be contacted immediately if any clarification is needed. Balancer DAO governance reserves the right to revoke these privileges if misused and can do so at any time through a future BIP.
