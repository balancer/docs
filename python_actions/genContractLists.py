import requests
import json
import pandas as pd
import os
import re
#from helpers.addresses import get_registry_by_chain_id
from web3 import Web3

GITHUB_MONOREPO_RAW="https://raw.githubusercontent.com/balancer-labs/balancer-v2-monorepo/master"
GITHUB_MONOREPO_NICE="https://github.com/balancer/balancer-v2-monorepo/blob/master"
OUTPUT_PATH = "docs/reference/contracts/deployment-addresses"


SCANNERS_BY_CHAIN = {
    "mainnet": "https://etherscan.io",
    "polygon": "https://polygonscan.com",
    "arbitrum": "https://arbiscan.io",
    "optimism": "https://optimistic.etherscan.io",
    "gnosis": "https://gnosisscan.io",
    "goerli": "https://goerli.etherscan.io/"
}


CONTRACTS_BY_HEADING = {
    "Core": ["Vault", "BalancerRelayer", "BatchRelayerLibrary", "BalancerQueries", "ProtocolFeePercentagesProvider"],
    "Authorization": ["Authorizer", "AuthorizerAdaptor", "AuthorizerAdaptorEntrypoint", "AuthorizerWithAdaptorValidation",  "TimelockAuthorizer"],
    "Gauges and Governance": ["BALTokenHolderFactory", "BalancerTokenAdmin","BalancerMinter", "GaugeAdder", "VeBoost",
                              "VotingEscrow","GaugeController", "DistributionScheduler", "FeeDistributor", "RewardsOnlyGauge", "SingleRecipientGaugeFactory",
                              "LiquidityGaugeFactory", "ChildChainGaugeFactory", "ChildChainStreamer", "ChildChainLiquidityGaugeFactory", "L2GaugeCheckpointer", "SmartWalletChecker",
                              "ChildChainGaugeRewardHelper", "ChildChainGaugeTokenAdder", "L2LayerZeroBridgeForwarder","ChildChainGauge","VotingEscrowDelegation", "VotingEscrowDelegationProxy", "VeBoostV2", "ProtocolFeesCollector", "ProtocolFeesWithdrawer"]
}



def main():
    r = address_directory()

def address_directory(addressbook="python_actions/addressbook.json"):
   with open(addressbook, "r") as f:
       return json.load(f)

#def getContractUrl(deployment, contract):


def genFullTable(r, chain):
    result = pd.DataFrame(columns=["Contract", "Address", "Deployment"])
    r = r[chain]  # go to chain
    for deployment, contracts in r.items():
        for contract in contracts.keys():
            ### Check if versioned
            t = deployment.split("-")
            t = t[len(t) - 1]
            if bool(re.search(r'^v\d', t)):
                contractText = f"{contract} ({t})"
            else:
                contractText = contract
            ###

            dl = f'{GITHUB_MONOREPO_NICE}/pkg/deployments/tasks/{deployment}'
            al = f"{SCANNERS_BY_CHAIN[chain]}/address/{contracts[contract]}#code"
            addressText = f'[{contracts[contract]}]({al})'
            ## TODO find github code links
            result.loc[len(result)] = [contractText, addressText, f"[{deployment}]({dl})"]
    return result


def genPoolFactories(r, chain):
    result = pd.DataFrame(columns=["Contract", "Address", "Deployment"])
    print(f"Generating pools for {chain}")
    r = r[chain] # go to chain
    for deployment, contracts in r.items():
        if "-pool-" not in deployment:
            continue
        for contract, address in contracts.items():
            if "PoolFactory" in contract:
                ### Check if versioned
                t = deployment.split("-")
                t = t[len(t)-1]
                if bool(re.search(r'^v\d', t)):
                    contractText = f"{contract} ({t})"
                else:
                    contractText = contract
                ###

                dl = f"{GITHUB_MONOREPO_NICE}/pkg/deployments/tasks/{deployment}"
                al = f"{SCANNERS_BY_CHAIN[chain]}/address/{contracts[contract]}#code"
                result.loc[len(result)] = [contractText, f"[{contracts[contract]}]({al})", f"[{deployment}]({dl})"]
    return result

def genNotInContractList(r, chain, contractList):
    result = pd.DataFrame(columns=["Contract", "Address", "Deployment"])
    r = r[chain] # go to chain
    for deployment, contracts in r.items():
        for contract, address in contracts.items():
            if contract in contractList:
                continue
            if "-pool-"  in deployment:
                continue

            ### Check if versioned
            t = deployment.split("-")
            t = t[len(t) - 1]
            if bool(re.search(r'^v\d', t)):
                contractText = f"{contract} ({t})"
            else:
                contractText = contract
            ###

            dl = f'{GITHUB_MONOREPO_NICE}/pkg/deployments/tasks/{deployment}'
            al = f"{SCANNERS_BY_CHAIN[chain]}/address/{contracts[contract]}#code"
            addressText = f'[{contracts[contract]}]({al})'
            ## TODO find github code links
            result.loc[len(result)] = [contractText, addressText, f"[{deployment}]({dl})"]
    return result



def genFromContractList(r, chain, contractList):
    result = pd.DataFrame(columns=["Contract", "Address", "Deployment"])
    r = r[chain] # go to chain
    for deployment, contracts in r.items():
        m = set(contracts.keys()) & set(contractList)
        for contract in m:
            ### Check if versioned
            t = deployment.split("-")
            t = t[len(t) - 1]
            if bool(re.search(r'^v\d', t)):
                contractText = f"{contract} ({t})"
            else:
                contractText = contract
            ###

            dl = f'{GITHUB_MONOREPO_NICE}/pkg/deployments/tasks/{deployment}'
            al = f"{SCANNERS_BY_CHAIN[chain]}/address/{contracts[contract]}#code"
            addressText = f'[{contracts[contract]}]({al})'
            ## TODO find github code links
            result.loc[len(result)] = [contract, addressText, f"[{deployment}]({dl})"]
    return result

def genChainMd(chain):
    groupedContracts = []
    for contracts in CONTRACTS_BY_HEADING.values():
        groupedContracts += contracts
    output = f"""

# {chain.capitalize()} Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer/balancer-v2-monorepo/tree/master/pkg/deployments/tasks) section of the monorepo.
:::

## Pool Factories

"""
    r = address_directory()["active"]
    output += genPoolFactories(r, chain).to_markdown(index=False)

    for heading, contracts in CONTRACTS_BY_HEADING.items():
        output += f"\n\n## {heading}\n\n"
        output += genFromContractList(r, chain, contracts).to_markdown(index=False)
    output += """

## Ungrouped Active/Current Contracts
    
    
"""
    output += genNotInContractList(r, chain, groupedContracts).to_markdown(index=False)
    output += """
    
    
# Deprecated Contracts

These deployments were in use at some point, and may still be in active operation, for example in the case of pools created with old factories.  In general it's better to interact with newer versions when possible.

#### If you can only find the contract you are looking for in the deprecated section and it is not an old pool, try checking the deployments tasks to find it or ask in the Discord before using a deprecated contract.

    
"""
    r = address_directory()["old"]
    output += genFullTable(r, chain).to_markdown(index=False)
    output += """
    
<style scoped>
table {
    display: table;
    width: 100%;
}
table th:first-of-type, td:first-of-type {
    width: 30%;
}
table th:nth-of-type(2) {
    width: 40%;
}
td {
    max-width: 0;
    overflow: hidden;
}
</style>

"""
    return output


def main():
    r = address_directory()["active"]
    for chain in SCANNERS_BY_CHAIN.keys():
        output=genChainMd(chain)
        with open(f"{OUTPUT_PATH}/{chain}.md", "w") as f:
            f.write(output)

if __name__ == "__main__":
   main()
