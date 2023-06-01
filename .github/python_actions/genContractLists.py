import requests
import pandas as pd
import re
from bal_addresses import AddrBook
from dotmap import DotMap

OUTPUT_PATH = "docs/reference/contracts/deployment-addresses"
ADDRESSBOOK_URL = "https://raw.githubusercontent.com/BalancerMaxis/bal_addresses/main/outputs/deployments.json"


CONTRACTS_BY_HEADING = {
    "Core": ["Vault", "BalancerRelayer", "BatchRelayerLibrary", "BalancerQueries", "ProtocolFeePercentagesProvider"],
    "Authorization": ["Authorizer", "AuthorizerAdaptor", "AuthorizerAdaptorEntrypoint", "AuthorizerWithAdaptorValidation",  "TimelockAuthorizer"],
    "Gauges and Governance": ["BALTokenHolderFactory", "BalancerTokenAdmin","BalancerMinter", "GaugeAdder", "VeBoost",
                              "VotingEscrow","GaugeController", "DistributionScheduler", "FeeDistributor", "RewardsOnlyGauge", "SingleRecipientGaugeFactory", "OptimismRootGauge", "OptimismRootGaugeFactory", "PolygonRootGauge", "PolygonRootGaugeFactory", "GnosisRootGauge", "GnosisRootGaugeFactory", "ArbitrumRootGauge", "ArbitrumRootGaugeFactory"
                              "LiquidityGaugeFactory", "ChildChainGaugeFactory", "ChildChainStreamer", "ChildChainLiquidityGaugeFactory", "L2GaugeCheckpointer", "SingleRecipientGauge", "SmartWalletChecker",
                              "ChildChainGaugeRewardHelper", "ChildChainGaugeTokenAdder", "L2LayerZeroBridgeForwarder","ChildChainGauge","VotingEscrowDelegation", "VotingEscrowDelegationProxy", "VeBoostV2", "ProtocolFeesCollector", "ProtocolFeesWithdrawer"]
}



def address_directory(chain, status=None):
    r = requests.get(f"https://raw.githubusercontent.com/balancer/balancer-deployments/master/addresses/{chain}.json")
    r=r.json()
    if isinstance(status, str):
        filtered = {}
        for deployment, depdata in r.items():
            if depdata["status"] == status:
                filtered[deployment] = depdata
        return filtered
    else:
        return r



def genFullTable(r, chain):
    result = pd.DataFrame(columns=["Contract", "Address", "Deployment"])
    for deployment, depdata in r.items():
        for contract in depdata["contracts"]:
            ### Check if versioned
            t = deployment.split("-")
            t = t[len(t) - 1]
            if bool(re.search(r'^v\d', t)):
                contractText = f"{contract['name']} ({t})"
            else:
                contractText = contract['name']
            ###

            dl = f"{AddrBook.GITHUB_DEPLOYMENTS_NICE}/tasks/{deployment}"
            al = f"{AddrBook.SCANNERS_BY_CHAIN[chain]}/address/{contract['address']}#code"
            addressText = f"[{contract['address']}]({al})"
            ## TODO find github code links
            result.loc[len(result)] = [contractText, addressText, f"[{deployment}]({dl})"]
    result.sort_values(by=["Contract","Deployment"], inplace=True)
    return result


def genPoolFactories(r, chain):
    result = pd.DataFrame(columns=["Contract", "Address", "Deployment"])
    print(f"Generating pools for {chain}")
    for deployment, depdata in r.items():
        if "-pool" not in deployment:
            continue
        for contract in depdata["contracts"]:
            if "Factory" in contract['name']:
                ### Check if versioned
                t = deployment.split("-")
                t = t[len(t)-1]
                if bool(re.search(r'^v\d', t)):
                    contractText = f"{contract['name']} ({t})"
                else:
                    contractText = contract['name']
                ###

                dl = f"{AddrBook.GITHUB_DEPLOYMENTS_NICE}/tasks/{deployment}"
                al = f"{AddrBook.SCANNERS_BY_CHAIN[chain]}/address/{contract['address']}#code"
                result.loc[len(result)] = [contractText, f"[{contract['address']}]({al})", f"[{deployment}]({dl})"]
    result.sort_values(by=["Contract","Deployment"], inplace=True)
    return result

def genNotInContractList(r, chain, contractList):
    result = pd.DataFrame(columns=["Contract", "Address", "Deployment"])
    for deployment, depdata in r.items():
        for contract in depdata["contracts"]:
            if contract['name'] in contractList:
                continue
            if "-pool" in deployment:
                continue

            ### Check if versioned
            t = deployment.split("-")
            t = t[len(t) - 1]
            if bool(re.search(r'^v\d', t)):
                contractText = f"{contract['name']} ({t})"
            else:
                contractText = contract['name']
            ###

            dl = f'{AddrBook.GITHUB_DEPLOYMENTS_NICE}/tasks/{deployment}'
            al = f"{AddrBook.SCANNERS_BY_CHAIN[chain]}/address/{contract['address']}#code"
            addressText = f"[{contract['address']}]({al})"
            ## TODO find github code links
            result.loc[len(result)] = [contractText, addressText, f"[{deployment}]({dl})"]
    result.sort_values(by=["Contract","Deployment"], inplace=True)
    return result



def genFromContractList(r, chain, contractList):
    result = pd.DataFrame(columns=["Contract", "Address", "Deployment"])
    for deployment, depdata in r.items():
        for contract in depdata["contracts"]:
            ### Check if in list
            if contract["name"] not in contractList:
                continue
            ### Check if versioned
            t = deployment.split("-")
            t = t[len(t) - 1]
            if bool(re.search(r'^v\d', t)):
                contractText = f"{contract['name']} ({t})"
            else:
                contractText = contract['name']

            ###

            dl = f"{AddrBook.GITHUB_DEPLOYMENTS_NICE}/tasks/{deployment}"
            al = f"{AddrBook.SCANNERS_BY_CHAIN[chain]}/address/{contract['address']}#code"
            addressText = f"[{contract['address']}]({al})"
            ## TODO find github code links
            result.loc[len(result)] = [contractText, addressText, f"[{deployment}]({dl})"]
    result.sort_values(by=["Contract","Deployment"], inplace=True)
    return result

def genChainMd(chain):
    groupedContracts = []
    for contracts in CONTRACTS_BY_HEADING.values():
        groupedContracts += contracts
    output = f"""

# {chain.capitalize()} Deployment Addresses

::: info More Details
For more information on specific deployments as well as changelogs for different contract versions, please see the [deployment tasks](https://github.com/balancer/balancer-deployments/tree/master/tasks).
:::

## Pool Factories

"""
    r = address_directory(chain, status="ACTIVE")
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
    try:
        r = address_directory(chain, status="DEPRECATED")
        output += genFullTable(r, chain).to_markdown(index=False)
    except:
        output += "No deprecated contracts found\n"
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
    for chain in AddrBook.SCANNERS_BY_CHAIN.keys():
        output=genChainMd(chain)
        with open(f"{OUTPUT_PATH}/{chain}.md", "w") as f:
            f.write(output)

if __name__ == "__main__":
   main()
