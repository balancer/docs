---
title: "Reward Distributor"
order: 2
---

# RewardDistributor
Distributes any allowed reward tokens transferred to the contract among VotingEscrow holders proportionally based on a snapshot of the week at which the tokens are sent to the RewardDistributor contract.  
You can manually supply rewards to the RewardDistributor contract. Alternatively, you can use third-party contracts that will regularly supply rewards to the RewardDistributor contract.

### Hint
The RewardDistributor contract distributes rewards on a weekly basis, requiring regular deposits to facilitate its operations. For more convenient reward distribution, consider utilizing the RewardFaucet contract, enabling the seamless transfer of rewards to the RewardDistributor for subsequent distribution.  


## Code  
[RewardDistributor.sol](../contracts/RewardDistributor.sol)


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


## Creating Distribution
### depositToken
```sh
function depositToken(address token, uint256 amount) external;
```
Deposits tokens to be distributed in the current week.  
Parameters:  
`token` - The ERC20 token address to distribute.  
`amount` - The amount of tokens to deposit.  

### depositTokens
```sh
function depositToken(
  address[] calldata tokens,
  uint256[] calldata amounts
) external;
```
Deposits multiple tokens to be distributed in the current week.  
Parameters:  
`tokens` - An array of ERC20 token addresses to distribute.  
`amounts` - An array of token amounts to deposit.  


### claimToken
```sh
function claimToken(address user, address token) external returns (uint256);
```
Claims all pending distributions of the provided token for a user.  
Parameters:  
`user` - The user on behalf of which to claim  
`token` - The ERC20 token address to be claimed.
Returns:
The amount of `token` sent to `user` as a result of claiming.  

### claimTokens
```sh
function claimTokens(
  address user,
  address[] calldata token
) external returns(uint256[] memory);
```
Claims a number of tokens on behalf of a user.  
Parameters:  
`user` - The user on behalf of which to claim  
`tokens` - An array of ERC20 token addresses to be claimed..  
Returns:
An array of the amounts of each token in `tokens` sent to `user` as a result of claiming.  


## Admin's functions

### addAllowedRewardTokens
```sh
function addAllowedRewardTokens(address[] calldata tokens) external;
```  
Adds allowed tokens for the distribution.  
Parameters:  
`tokens` - An array of ERC20 token addresses to be added for the further reward distribution.

### transferAdmin
```sh
function transferAdmin(address newAdmin) external;
```  
Transfers admin rights to new address.  
Parameters:  
`newAdmin` - The new admin address to set.  


