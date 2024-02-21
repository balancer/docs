---
title: "Launchpad"
order: 0
---

## Launchpad System Details

The Launchpad system is a set of smart contracts used to lock BPT tokens (representing liquidity providers positions on Balancer) in a vote escrow system in order to gain voting power on a given project, and also being able to vote on rewards distribution to those who are locking their liquidity, incentivising governance and long term participation.  
In addition to the BPT token lock, almost any token of any project can be used for locking. This way, users can independently create their own vote escrow systems, with their own reward tokens (incentives).

Main parts of the system:  
Launchpad - a contract factory for creating new VotingEscrow and RewardsDistribution contracts.  
VotingEscrow - a contract for locking liquidity tokens for a specific period.  
RewardsDistribution - a contract for distributing rewards to users.  
Some smart contracts are written in Vyper (including to utilize time-tested and user-proven solutions, as well as to avoid redundant audits), but for the sake of simplicity, we will stick to Solidity syntax in this documentation.  


## Launchpad
The Launchpad contract uses the minimal-proxy pattern for deploying new VotingEscrow and RewardsDistribution contracts. This significantly reduces the deployment cost, making this process accessible to all users. Deployment can be done through the UI, blockchain explorer interface, or through direct interaction with the Launchpad smart contract.


### Code  
[Launchpad.vy](../contracts/Launchpad.vy)

### Deploying new ve-system
```sh
function deploy(
    address tokenBptAddr,
    string memory name,
    string memory symbol,
    uint256 maxLockTime,
    uint256 rewardDistributorStartTime
    address admin_unlock_all,
    address admin_early_unlock,
    address rewardReceiver 
) external returns (address, address);
```

The function creates a new pair of VotingEscrow and RewardsDistribution contracts and emits an event with such new addresses. **The caller will be assigned the admin role of these new contracts.**  
Parameters:  
`tokenBptAddr` - the address of the token to be used for locking in the VotingEscrow contract.  
`name` - the name for the new VotingEscrow contract. It can be any name chosen by the creator.  
`symbol` - the symbol for the new VotingEscrow contract. It can be any symbol chosen by the creator.  
`maxLockTime` - a constraint for the maximum lock time in the new VotingEscrow contract. It should be at least 1 week.  
`rewardDistributorStartTime` - the start time for reward distribution in the new RewardsDistribution contract. Unix time in seconds, should be no earlier than a week from contract creation.  
`admin_unlock_all` - Admin address to enable unlock-all feature in VotingEscrow (zero-address to disable forever).  
`admin_early_unlock` - Admin address to enable early-unlock feature in VotingEscrow (zero-address to disable forever).  
`rewardReceiver` - The receiver address of claimed BAL-token rewards  


#### Contract Overview  
The `deploy()` function utilizes the built-in Vyper function `create_minimal_proxy_to(address)`, which deploys a copy of the contract using the [minimal-proxy pattern](https://eips.ethereum.org/EIPS/eip-1167). Upon completion, an event is emitted with the new votingEscrow and rewardDistributor contracts.  

```sh
def deploy(
    tokenBptAddr: address,
    name: String[64],
    symbol: String[32],
    maxLockTime: uint256,
    rewardDistributorStartTime: uint256,
    admin_unlock_all: address,
    admin_early_unlock: address,
    rewardReceiver: address
) -> (address, address):
    """
    @notice Deploys new VotingEscrow, RewardDistributor and RewardFaucet contracts
    @param tokenBptAddr The address of the token to be used for locking
    @param name The name for the new VotingEscrow contract
    @param symbol The symbol for the new VotingEscrow contract
    @param maxLockTime A constraint for the maximum lock time in the new VotingEscrow contract
    @param rewardDistributorStartTime The start time for reward distribution
    @param admin_unlock_all Admin address to enable unlock-all feature in VotingEscrow (zero-address to disable forever)
    @param admin_early_unlock Admin address to enable early-unlock feature in VotingEscrow (zero-address to disable forever)
    @param rewardReceiver The receiver address of claimed BAL-token rewards
    """
    assert(balToken != tokenBptAddr), '!bal'
    newVotingEscrow: address = create_minimal_proxy_to(votingEscrow)
    newRewardDistributor: address = create_minimal_proxy_to(rewardDistributor)
    

    rewardReceiverChangeable: bool = True
    rewardReceiver_: address = rewardReceiver
    if rewardReceiver == empty(address):
        rewardReceiver_ = newRewardDistributor
        rewardReceiverChangeable = False

    IVotingEscrow(newVotingEscrow).initialize(
        tokenBptAddr,
        name,
        symbol,
        msg.sender,
        admin_unlock_all,
        admin_early_unlock,
        maxLockTime,
        balToken,
        balMinter,
        rewardReceiver_,
        rewardReceiverChangeable,
        newRewardDistributor
    )

    newRewardFaucet: address = create_minimal_proxy_to(rewardFaucet)
    
    IRewardDistributor(newRewardDistributor).initialize(
        newVotingEscrow,
        newRewardFaucet,
        rewardDistributorStartTime,
        msg.sender
    )

    IRewardFaucet(newRewardFaucet).initialize(
        newRewardDistributor
    )

    log VESystemCreated(
        tokenBptAddr,
        newVotingEscrow,
        newRewardDistributor,
        newRewardFaucet,
        msg.sender
    )

    return (newVotingEscrow, newRewardDistributor, newRewardFaucet)
```

