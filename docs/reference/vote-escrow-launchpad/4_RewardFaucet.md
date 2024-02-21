---
title: "Reward Faucet"
order: 3
---

# RewardFaucet
The contract allows for scheduling reward distributions at specific time intervals. However, the contract only assists in the distribution, and in some cases, rewards may be deferred, for instance, due to infrequent interactions with the core contract - RewardDistributor.


## Code  
[RewardFaucet.sol](../contracts/RewardFaucet.sol)


## View functions
### totalTokenRewards
```sh
function totalTokenRewards(address token) external view returns (uint256)
```
Parameters:  
`tokens` - The address of the distributed token.  
Returns the total amount of tokens planned for future distribution.  


### getTokenWeekAmounts
```sh
function getTokenWeekAmounts(address token, uint256 pointOfWeek) external view returns (uint256)
```
Parameters:  
`token` - The address of the reward token to be distributed  
`pointOfWeek` - The timestamp representing a specific week (can by any point of the week)  
Returns the reward amount for a specified week (represented by a point within the week)  
Note! Week begins on each Thursday 00:00.  


### getUpcomingRewardsForNWeeks
```sh
function getUpcomingRewardsForNWeeks(address token, uint256 weeksCount) external view returns (uint256[] memory)
```
Parameters:  
`token` - The address of the reward token to be distributed  
`weeksCount` - The number of weeks to check rewards for  
Returns rewards for a specified number of weeks starting from the current week.



## Creating Scheduled Distribution  
### depositEqualWeeksPeriod
```sh
function depositEqualWeeksPeriod(
  address token,
  uint256 amount,
  uint256 weeksCount
) external;
```
Deposit rewards evenly across a specified period starting from the current week. The current week amount will be immediately transferred into RewardDistributor contract.  
Parameters:  
`token` - The address of the token to be deposited as a reward  
`amount` - The total amount of `token` to be deposited as a reward over the entire period  
`weeksCount` - The number of weeks, including the current one, over which the rewards will be distributed  


### depositExactWeek
```sh
function depositToken(
  address token,
  uint256 amount,
  uint256 weekTimeStamp
) external;
```
Deposits rewards into a specific week (starting from current)
Parameters:  
`token` - The address of the token to be deposited as a reward  
`amount` - The amount of `token` to be deposited as a reward  
`weekTimeStamp` - The timestamp of the week for which rewards are being distributed  

Note! If a week is separated from previous reward weeks, or rewards were not claimed in previous weeks in the RewardDistributor contract, users may need to manually call the `distributePastRewards()` function to ensure that the rewards are added to the RewardDistributor contract.


### distributePastRewards
```sh
function distributePastRewards(address token) external;
```
Collects all rewards for 10 past weeks and sends them to RewardDistributor
Parameters:  
`token` - the token address to collect rewards  


### movePastRewards
```sh
function movePastRewards(address user, uint256 pastWeekTimestamp) external;
```
Manually moves unclaimed past rewards to the next week to enable distribution
Parameters:  
`token` - The reward token address to be moved
`pastWeekTimestamp` - The timestamp representing a point in the past week (must be at least 10 weeks ago)

