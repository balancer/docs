---
title: "Smart Wallet Whitelist"
order: 6
---

# SmartWalletWhitelist contract

Using the `SmartWalletWhitelist` smart contract, you can independently establish a list of allowed smart contracts that can lock tokens in the `VotingEscrow` contract.
To deploy `SmartWalletWhitelist`, execute the following command:  
```sh
npx hardhat run ./scripts/utils/deploySmartAllowList.ts --network networkName
```  

Don't forget to specify desired networkName (full list of network names can be found [hardhat.config.ts](../../hardhat.config.ts))
  

After deploying the `SmartWalletWhitelist` smart contract, you need to add its address to the VotingEscrow contract. To do this, in the VotingEscrow contract, sequentially call the functions:  

```sh
function commit_smart_wallet_checker(address newSmartWalletWhitelistAddress);  
function apply_smart_wallet_checker();  
```  
where `newSmartWalletWhitelistAddress` is the address of your `SmartWalletWhitelist` contract.

## Whitelist access  
You can specify one particular allowed contract address (or list of addresses) by using following functions:
```sh
function approveWallet(address _wallet) external;

function approveWalletList(address[] calldata _wallets) external;
```
where `_wallet` (or `_wallets`) - The address of a contract to be approved.  


## Access for All Smart Contracts  
If you want to allow access to `VotingEscrow` for all smart contracts, you need to set such allowance in the `SmartWalletWhitelist` contract:  
```sh
function setAllowAll(bool _isAllowAll) external;
```
where `_isAllowAll` - The boolean parameter to set if it allowed for all contract or not.  


## Complex configuration  
If you want to configure access to `VotingEscrow` for smart contracts in more complex way, you can implement desired logic in the separate contract. You can use `SmartChecker` contract as a template. When your implementation is ready you can deploy it:  

```sh
npx hardhat run ./scripts/utils/deploySmartChecker.ts --network networkName
```

Then, in the SmartWalletWhitelist contract, call the function:
```sh
function setChecker(address SmartCheckerAddress) external;
```
where `SmartCheckerAddress` is the address of your `SmartChecker` contract.


