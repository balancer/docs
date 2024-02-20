---
title: "Voting Escrow System"
order: 1
---

# VotingEscrow
The contract allows locking tokens for a selected period of time and receiving rewards from the RewardsDistribution contract in return. It utilizes the VotingEscrow contract from Curve as its implementation.

## Code  
[VotingEscrow.vy](../contracts/VotingEscrow.vy)  


## MaxLock Time and Lock Durations
The creator of the VE-System must choose the maximum lock duration (`MAXTIME`), which should be more than 1 week.  
The voting power of each user's lock is calculated based on `MAXTIME`. You can find a calculation example at the [provided link](https://docs.curve.fi/curve_dao/voting-escrow/voting-escrow/).  
When selecting `MAXTIME`, the VE-System creator should consider the planned reward distribution period in the RewardDistributor contract (and, if applicable, RewardFaucet contract).  


### Interactions with other smart contracts (Smart-Wallets)
By default, the VotingEscrow contract restricts locking for other smart contracts. If you want to configure access for other smart contracts, you need to use the functionality of the third-party `SmartWalletWhitelist` smart contract. With `SmartWalletWhitelist`, you can grant access to all possible smart contracts or only a specific list. [Refer to the instructions](./misc_docs/SmartWalletWhitelist.md) for deploying and configuring access for smart contracts to VotingEscrow.


## View functions
### token
```sh
function token() external view returns (address)
```
Returns the address of the token that can be deposited into VotingEscrow.  

### name
```sh
function name() external view returns (string memory)
```
Returns name of the current VotingEscrow contract.  


## Locking
### create_lock
```sh
function create_lock(uint256 _value, uint256 _unlock_time) external;
```
Deposit `_value` tokens for `msg.sender` and lock until `_unlock_time`.  
Parameters:  
`_value` - amount to deposit. VotingEscrow should have already given an allowance of at least `_value` on the deposited token.  
`_unlock_time` - epoch time when tokens unlock, rounded down to whole weeks.  

### increase_amount
```sh
function increase_amount(uint256 _value) external;
```
Deposit `_value` additional tokens for `msg.sender` without modifying the unlock time.  
Parameters:  
`_value` - amount to deposit. VotingEscrow should have already given an allowance of at least `_value` on the deposited token.  

### increase_unlock_time
```sh
function increase_unlock_time(uint256 _unlock_time) external;
```
Extend the unlock time for `msg.sender` to `_unlock_time`  
Parameters:  
`_unlock_time` - new epoch time for unlocking

### withdraw
```sh
function withdraw() external;
```
Withdraw all tokens for `msg.sender` when lock has expired.


## Early Unlock
By default, the option for early unlocking is disabled in the contract.
There are two types of unlocks that can be enabled by the contract administrator.

### Unlock with penalty (soft unlock)
Allows users to withdraw their funds before the lockup period ends. Users are penalized proportionally to the time remaining until the end of the lockup. The administrator can also configure the penalty rate (speed) using `set_early_unlock_penalty_speed()` function. See formula below:  
```
  L - lock amount
  k - penalty coefficient [0: 5], defined by admin (default 1)
  Tleft - left time to unlock
  Tmax - MAXLOCK time
  Penalty amount = L * k * (Tlast / Tmax)
```  
To prevent front-run attack (from VotingEscrow admin) the delay of 60 seconds is used, before new penalty speed is enabled.  

To enable unlock with penalties the function `set_early_unlock(true)` must be called:
```sh
function set_early_unlock(bool _early_unlock) external;
```
Parameters:  
`_early_unlock` - A boolean indicating whether early unlock is allowed or not.
Sets the availability for users to unlock their locks before lock-end with penalty  


To set penalty rate (speed) for early unlocking:
```sh
function set_early_unlock_penalty_speed(uint256 _penalty_k) external;
```  
Parameters:  
`_penalty_k` - Coefficient indicating the penalty speed for early unlock. Must be between 0 and 50, inclusive. Default 10.  
This function provides a dynamic way for the admin to control how quickly penalties increase for early unlocking. The `_penalty_k` coefficient determines the rate at which penalties accumulate based on the remaining time until the lock-end. Since the `PENALTY_DENOMINATOR = 10` values below 10 will decrease penalty rate, and values above 10 will increase penalty rate. In case when `_penalty_k = 10` the `k` value of the formula above is equal 1.  
To prevent front-run attack (from VotingEscrow admin) the delay of 60 seconds is used, before new penalty speed is set.  


To withdraw early with penalty:  
```sh
function withdraw_early()
```
Withdraws locked tokens for `msg.sender` before lock-end with penalty.


### Unlock All Locks (hard unlock)
Allows all users to withdraw their funds ahead of schedule. Attention! In case this option is activated, the contract effectively terminates (there is no turning back!). New locks cannot be created. Consider this fact when distributing rewards in RewardFaucet and RewardDistributor contracts.  

To enable unlock for all locks the function `set_all_unlock()` must be called:
```sh
function set_all_unlock() external;
```
Deactivates VotingEscrow and allows users to unlock their locks before lock-end. New deposits will no longer be accepted.


## External Rewards (BAL Claim)  
### Claim External Rewards  
The contract provides functionality for claiming rewards that can be accrued by holders of gauge tokens. By default, rewards are distributed to the RewardDistributor contract. The function `claimExternalRewards()` is used to claim additional rewards.  
```sh
function claimExternalRewards() external;
```  

### Reward Receiver Update
Additionally, the contract administrator can change the address eligible to receive additional rewards (`rewardReceiver`). Changing such an address is only possible if an address was not set as zero-address (`address(0)`) as the rewardReceiver when creating the ve-system. To change the address of the recipient of additional rewards (rewardReceiver), use the function `changeRewardReceiver(address newReceiver)`:
```sh
function changeRewardReceiver(address newReceiver) external;
```  
Parameters:  
`newReceiver` - New address to set as the reward (BAL) receiver  


## Admin functions

### Ownership transfer
```sh
function commit_transfer_ownership(address newAdmin) external;
```
Parameters:  
`newAdmin` - Address to have ownership transferred to
Transfers ownership of VotingEscrow contract to `newAdmin`  

```sh
functions apply_transfer_ownership() external();
```
Applies ownership transfer  
  

### [Adding smart wallet checker](./misc_docs/SmartWalletWhitelist.md)  
```sh
function commit_smart_wallet_checker(address smartChecker) external;
```
Sets an external contract to check for approved smart contract wallets  
Parameters:  
`smartChecker` - Address of Smart contract checker


```sh
function apply_smart_wallet_checker() external;
```
Applies setting external contract to check approved smart contract wallets


### Additional information
Additional info can also be found [here](https://docs.curve.fi/curve_dao/voting-escrow/voting-escrow/)  
