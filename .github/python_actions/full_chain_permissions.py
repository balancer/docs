import requests
import json
import pandas as pd
import os
from bal_addresses import read_addressbook, read_reversebook, read_fx_descriptions, SCANNERS_BY_CHAIN, GITHUB_MONOREPO_NICE, GITHUB_MONOREPO_RAW
from web3 import Web3
import datetime

INFURA_KEY = os.getenv('WEB3_INFURA_PROJECT_ID')
BASE_PATH = "./docs/reference/authorizer"

today = datetime.date.today()
w3_by_chain = {
    "mainnet": Web3(Web3.HTTPProvider(f"https://mainnet.infura.io/v3/{INFURA_KEY}")),
    "arbitrum": Web3(Web3.HTTPProvider(f"https://arbitrum-mainnet.infura.io/v3/{INFURA_KEY}")),
    "optimism": Web3(Web3.HTTPProvider(f"https://optimism-mainnet.infura.io/v3/{INFURA_KEY}")),
    "polygon": Web3(Web3.HTTPProvider(f"https://polygon-mainnet.infura.io/v3/{INFURA_KEY}")),
    "gnosis": Web3(Web3.HTTPProvider(f"https://rpc.gnosischain.com/")),
    "goerli": Web3(Web3.HTTPProvider(f"https://goerli.infura.io/v3/{INFURA_KEY}"))
}




def monorepo_names_by_address(chain_name):
    return read_reversebook(chain_name)


def build_chain_permissions_list(chain_name):
    r = read_addressbook(chain_name)
    results = []
    address_names = monorepo_names_by_address(chain_name)
    action_ids_list = f"{GITHUB_MONOREPO_RAW}/pkg/deployments/action-ids/{chain_name}/action-ids.json"
    w3 = w3_by_chain[chain_name]
    authorizer = w3.eth.contract(address=r["20210418-authorizer/Authorizer"], abi=json.load(open("python_actions/abis/Authorizer.json")))
    try:
        result = requests.get(action_ids_list)
    except requests.exceptions.HTTPError as err:
        print(f"URL: {requests.request.url} returned error {err}")
    input = result.json()
    for deployment, contracts in input.items():
        print(f"Processing {deployment}")
        for contract, data in contracts.items():
            for fx, actionId in data["actionIds"].items():
                numMembers = authorizer.functions.getRoleMemberCount(actionId).call()
                if numMembers > 0:
                    memberAddressList = []
                    memberNameList = []
                    for i in range(0, numMembers, 1):
                        caller = (str(authorizer.functions.getRoleMember(actionId, i).call()))
                        memberAddressList.append(caller)
                        if isinstance(address_names[caller], str):
                            memberNameList.append(address_names[caller])
                        else:
                            memberNameList.append("undef")

                        d = {
                            "Fx": fx,
                            "Contract": contract,
                            "Deployment": deployment,
                            "Authorized_Caller_Addresses": memberAddressList,
                            "Authorized_Caller_Names": memberNameList
                        }
                        results.append(d)
    return results


def generate_deployment_deduped_map(permission_data, chain):
    results = {}
    for permission in permission_data:
        contract = permission["Contract"]
        fx = permission["Fx"]
        if contract.endswith("Pool"):
            contract = "Pool"
        if contract.endswith("PoolFactory"):
            contract = "PoolFactory"
        if contract.endswith("RootGauge"):
            contract = "RootGauge"
        if contract.endswith("GaugeFactory"):
            contract = "GaugeFactory"
        if contract not in results.keys():
            results[contract] = {}
        if fx not in results[contract].keys():
            results[contract][fx] = {
                "callerNames": [],
                "callerAddresses": [],
                "deployments": []
            }
        callerNames = list(permission["Authorized_Caller_Names"])
        callerAddresses = list(permission["Authorized_Caller_Addresses"])
        deployments = [permission["Deployment"]]

        results[contract][fx]["callerNames"] = list(set(callerNames + list(results[contract][fx]["callerNames"])))
        linkedAddresses = []
        linkedDeployments = []
        for address in callerAddresses:
            linkedAddresses.append(f"[{address}]({SCANNERS_BY_CHAIN[chain]}/address/{address})")
        for deployment in deployments:
            linkedDeployments.append(f"[{deployment}]({GITHUB_MONOREPO_NICE}/pkg/deployments/tasks/{deployment})")

        results[contract][fx]["callerNames"] = list(set(callerNames + list(results[contract][fx]["callerNames"])))
        results[contract][fx]["callerAddresses"] = list(set(linkedAddresses + list(results[contract][fx]["callerAddresses"])))
        results[contract][fx]["deployments"] = list(set(linkedDeployments + list(results[contract][fx]["deployments"])))

    return dict(results)


def deployment_deduped_map_to_list(deployment_map):
    result = []
    need_description = []
    description_by_function = read_fx_descriptions()
    for contract, fxdata in deployment_map.items():
        for fx, callers in fxdata.items():
            try:
                description = description_by_function[fx]
            except:
                description = "Not Found"
                need_description.append(fx)
            result.append({
                "function": fx.split("(")[0],
                "contract": contract,
                "callerNames": callers["callerNames"],
                "callerAddresses": callers["callerAddresses"],
                "deployments": callers["deployments"],
                "description": description
            })
    return result



def output_list(permission_data, output_name, chain):

    df = pd.DataFrame(permission_data)
    df = df.sort_values(by=["Fx", "Contract", "Deployment"])
    with open(f"data_files/permissions/{output_name}.csv", "w") as f:
        df.to_csv(f, index=False)
    dedup = pd.DataFrame(deployment_deduped_map_to_list(generate_deployment_deduped_map(permission_data, chain)))
    dedup = dedup.sort_values(by=["function", "contract"])
    with open(f"{BASE_PATH}/{output_name}.md", "w") as f:
        f.write(f"# {chain.capitalize()} Authorizer Permissions\n\n### Last generated on {today}\n\n")
        dedup.to_markdown(buf=f, index=False)


def generate_chain_files(chain):
    permissions = build_chain_permissions_list(chain)
    with open(f"data_files/permissions/{chain}.json", "w") as f:
        json.dump(permissions, f, indent=3)
    with open(f"data_files/permissions/{chain}.json", "r") as f:
        permissions = json.load(f)
    output_list(permissions, f"{chain}", chain)

def main():
    for chain in SCANNERS_BY_CHAIN.keys():
        print(f"\n\n\nWriting docs for {chain.capitalize()}\n\n\n")
        generate_chain_files(chain)


if __name__ == "__main__":
    main()
