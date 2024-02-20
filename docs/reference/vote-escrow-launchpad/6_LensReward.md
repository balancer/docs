---
title: "Lens Reward"
order: 5
---

## LensReward
The `LensReward` contract is very simple yet very convenient for calculating accumulated rewards. It can be used to determine the size of accumulated rewards for both single and multiple tokens within the RewardDistributor contract.  

Note! You should use the [callStatic](https://docs.ethers.org/v5/api/contract/contract/#contract-callStatic) function to call LensReward contract functions in order to avoid gas fees.


### Deployment  
This contract is not mandatory for use and deployment, but having it will enhance your system's capabilities.  
To deploy `LensReward` contract run following command:  
```sh
npx hardhat run ./scripts/deployLens.ts --network networkName
```

### Interaction  
The information about pending rewards is provided with ClaimableRewards structure:  
```sh
struct ClaimableRewards {
  address token;
  uint256 claimableAmount;
}
```

There two ways to get information about pending rewards. 

1) For single reward token:  
```sh
LensReward.getUserClaimableReward(
  address rewardDistributor,
  address user,
  address rewardToken
) external view returns (ClaimableRewards memory)
```
Parameters:  
`rewardDistributor` - The address of the RewardDistributor contract  
`user` - The user's address to check pending rewards on  
`rewardToken` - The reward token address to check rewards  


2) For multiple reward tokens:  
```sh
LensReward.getUserClaimableRewardsAll(
  address rewardDistributor,
  address user,
  address[] calldata allowedRewardTokenList
) external view returns (ClaimableRewards[] memory)
```
Parameters:  
`rewardDistributor` - The address of the RewardDistributor contract  
`user` - The user's address to check pending rewards on  
`allowedRewardTokenList` - The array of available reward tokens to check rewards  

