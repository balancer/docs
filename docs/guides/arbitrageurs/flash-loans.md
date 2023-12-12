# Flash Loans

## Overview

Since the Vault holds all tokens for all pools, the consolidated token balances are available as Flash Loans.

## Example Code

```solidity
pragma solidity ^0.7.0;

/*
* "@balancer-labs/v2-interfaces/contracts" is refering to  "balancer-v2-monorepo/pkg/interfaces/contracts"
*/
import {IVault} from "@balancer-labs/v2-interfaces/contracts/vault/IVault.sol";
import {IFlashLoanRecipient} from "@balancer-labs/v2-interfaces/contracts/vault/IFlashLoanRecipient.sol";
import {IERC20} from "@balancer-labs/v2-interfaces/contracts/solidity-utils/openzeppelin/IERC20.sol";

contract FlashLoanRecipient is IFlashLoanRecipient {
    IVault private constant vault = IVault(0xBA12222222228d8Ba445958a75a0704d566BF2C8);

    function makeFlashLoan(IERC20[] memory tokens, uint256[] memory amounts, bytes memory userData) external {
        vault.flashLoan(this, tokens, amounts, userData);
    }

    function receiveFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts,
        uint256[] memory feeAmounts,
        bytes memory userData
    ) external override {
        require(msg.sender == address(vault));
        // use the flash loan here
    }
}

```
