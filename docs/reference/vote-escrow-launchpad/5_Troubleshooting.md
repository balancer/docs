---
title: "Troubleshooting"
order: 4
---

# Troubleshooting tips and common errors


The implementations of the `VotingEscrow` and `RewardDistributor` contracts must be deployed before the `Launchpad` contract. (Implementations of VotingEscrow and RewardDistributor can be initialized in advance, and this will not affect the functionality of future contracts). Please note that these implementations should be deployed from this repository. You can always compare the code of the deployed contract implementations with the code in this repository to ensure the security of the contracts being used.  
Always exercise caution and conduct your own research.  


## Launchpad Contract  
### Deploying new Launchpad factory  
Errors:  
The `zero address` error indicates that during the deployment of the Launchpad contract, one of the addresses of the implementations was not specified or was specified incorrectly.  

### Deployment of New VotingEscrow and RewardDistributor Contract Systems
When creating new contracts, it is crucial to provide the correct address of the BPT token (or similar token), which should adhere to the ERC20 interface. Otherwise, the transaction will fail.  

- `!maxlock`
The `!maxlock` error means that an excessively short (or long) interval has been set for the maximum token lock duration. Increase the value (for example, specify `2592000` for a maximum lock period of 30 days). Note that the value is set in seconds.  


- `only once` error  
The `only once` error indicates that someone is attempting to initialize the contract again. Re-initialization is prohibited for security reasons and to maintain the correct state of all locks.  



## VotingEscrow Contract  
### Errors
- The VotingEscrow contract must have an allowance to spend tokens from msg.sender. Otherwise, transactions calling functions `deposit_for()`, `create_lock()`, `increase_amount()` will fail.  

- The size of deposited tokens must be greater than zero. Otherwise, transactions calling functions `deposit_for()`, `create_lock()`, `increase_amount()` will fail.  

- `No existing lock found`  
The `deposit_for()` function allows increasing the deposit size of an existing token lock only. Ensure that the address for which you intend to increase the deposit size already has an active lock.  

- `Cannot add to an expired lock. Withdraw`  
This error means that the lock has expired, and you can no longer add to it. The lock owner can withdraw their tokens using the withdraw() function.  

- `Withdraw old tokens first`  
This error means that you cannot create a new lock while an old one is still active. If desired, you can increase the size of your lock by using the `depositFor()` function.  

- `Can only lock until a time in the future`  
This error indicates that when attempting to create a new lock, the lock's end time is in the past. Specify a correct future time. Use Unix time to specify the time.  

- `Voting lock too long`  
This error means that when trying to create a new lock, you have exceeded the maximum possible lock duration. You can find out the maximum lock duration by calling the `MAXTIME()` function.  

- `Lock expired`  
This error indicates that you cannot extend the duration of your lock because it has already expired.  

- `Nothing is locked`  
This error means that you cannot extend the duration of your lock because there is no such lock, or no funds have been deposited into it. Create a new lock using the `create_lock()` function.  

- `The lock didn't expire`  
This error means that you cannot withdraw your funds before the lock period expires. Wait for the expiration date.  


## RewardDistributor Contract  

- `Reward distribution has not started yet`  
This error means that the reward distribution has not yet begun. For a new contract, you can check the start time of the distribution by calling the getTimeCursor() function.

- `!allowed`  
This error means that the token you want to deposit (or claim) for reward distribution is not allowed by the contract administrator (owner) of the contract. The contract administrator must first allow the token for distribution by calling the addAllowedRewardTokens(tokens[]) function.

- `Zero total supply results in lost tokens`  
This error occurs when you want to start reward distribution for the current week, but there have been no locks made in the VotingEscrow contract yet. It is recommended to postpone the start date of the reward distribution to the next week.


### Launchpad Contract Verification 
To verify Launchpad contract use [contract source code](../contracts/Launchpad.vy) and constructor arguments (ABI-encoded) which you will find after Launchpad deployment.
If you missed (or have lost) constructor arguments, you can build it manually by inserting addresses of VotingEscrow and RewardDistributor implementations without '0x' into following string:  
```
000000000000000000000000<VotingEscrow_Impl_Address>0000000000000000000000000<RewardDistributor_Impl_Address>
```
For example it would look like following (do not use it in your real project):  
000000000000000000000000692c6827ee5cd22507dd56e3817abc9327382b600000000000000000000000008e4eeecaa12a7e1e00d192ec7db00fb066100d7b


