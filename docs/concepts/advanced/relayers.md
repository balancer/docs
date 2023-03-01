# Relayers

## Overview

A relayer is a contract that is authorized by the protocol and allows users to make calls to the Vault on behalf of the users. It can use the sender’s ERC20 vault allowance, internal balance, and BPTs on their behalf. Multiple actions (such as exit/join pools, swaps, etc.) can be chained together, improving the UX.

For security reasons, a Relayer has to be authorized by the Balancer DAO before it can be used, and even after authorization, each user would still be required to opt into the relayer by submitting an approval transaction or signing a message.

## How it Works

### Contracts

The Balancer Relayers are composed of two contracts, [BalancerRelayer](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/BalancerRelayer.sol), which is the single point of entry via the multicall function, and a library contract, such as the [VaultActions](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/VaultActions.sol), which defines the allowed behavior of the relayer, for example — [VaultActions](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/VaultActions.sol), [LidoWrapping](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/LidoWrapping.sol), [GaugeActions](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/GaugeActions.sol).

Having the multicall single point of entry prevents reentrancy. The library contract cannot be called directly, but the multicall can repeatedly delegatecall into the library code to perform a chain of actions.

Some pseudocode demonstrating how an authorization, exitPool and swap can be chained and called via the multicall function:

```ts
const approval = buildApproval(signature); // setRelayerApproval call
const exitPoolCallData = buildExitPool(poolId, bptAmt); // exitPool call
const swapCallData = buildSwap(); // batchSwap call

const tx = await relayer.multicall([approval, exitPoolCallData, swapCallData]);
```

### Approval

A user has to approve each Relayer before they can use it. To check if a Relayer is approved the [hasApprovedRelayer](/reference/contracts/apis/vault.md#hasapprovedrelayer) on the Vault can be used.

A Relayer can also be approved by using the `setRelayerApproval` function from the [BaseRelayerLibrary](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/standalone-utils/contracts/relayer/BaseRelayerLibrary.sol) contract. Here a signed authorisation message from the user is passed as an input parameter. This allows the approval to be included at the start of a chain of actions so the user only needs to submit a single transaction creating a better UX.

### Chained References

Output References allow the Relayer to store output values from one action which can then be read and used in another action. This allows us to chain together actions. For example, we could exit a pool, save the exit amounts of each token to a reference and then do a batchSwap using the references as input amounts for each swap:

![Relayer Chained Call](/images/relayer-chained-call.webp)

An [OutputReference](https://github.com/balancer/balancer-v2-monorepo/blob/8ac66717502b00122a3fcdf78e6d555c54528c3c/pkg/standalone-utils/contracts/relayer/VaultActions.sol#L39) consists of an index and a key:

```solidity
struct OutputReference {
  uint256 index;
  uint256 key;
}
```

Where the key is the slot the value will be stored at. The index indicates which output amount should be stored. For example, if exitPool exits to 3 tokens, DAI (index 0), USDC (1), USDT (2), we would want to use index 0 to store DAI, 1 for USDC, etc.

## Example Use Case - Pool Migration

### Intro

Balancer aims for the best capital efficiency for LPs so it made sense to offer the option to migrate from the old “staBal3” pool consisting of DAI, USDC and USDT to a new “boosted” stable pool which is more capital efficient because it uses yield bearing assets.

Migrating between these pools would take multiple steps:

1. Unstake from staBal3 gauge -> staBalBpt
2. `exitPool` from staBal, staBalBpt -> DAI, USDC, USDT
3. join the bb-a-usd pool using `batchSwaps`
   a. DAI -> bbausdBpt
   b. USDC -> bbausdBpt
   c. USDT -> bbausdBpt
4. stake bbausdBpt in gauge

This would be quite an ordeal for a user to do manually but the Relayer can be used to combine all these actions into a single transaction for the user.

A full example of this can be found [here](https://github.com/balancer/balancer-sdk/blob/develop/balancer-js/src/modules/zaps/bbausd2-migrations/stabal3.integration.spec.ts#L120-L183)
