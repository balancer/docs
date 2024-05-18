import json
import pandas as pd
import os
from bal_addresses import AddrBook, BalPermissions, GITHUB_DEPLOYMENTS_NICE
import datetime

INFURA_KEY = os.getenv('WEB3_INFURA_PROJECT_ID')
BASE_PATH = "./docs/reference/authorizer"

today = datetime.date.today()

ENABLE_WIDE_TABLES = '''---
pageClass: wide-content
---

'''
SCANNERS_BY_CHAIN = AddrBook.chains["SCANNERS_BY_CHAIN"]




def build_chain_permissions_list(chain_name):
    results = []
    addrs = AddrBook(chain_name)
    try:
        perms = BalPermissions(chain_name)
    except Exception as e:
        print(f"WARNING: No permissions found for chain {chain_name}: {e}")
        return []
    for action_id, callers in perms.active_permissions_by_action_id.items():
        fx_paths = perms.paths_by_action_id[action_id]
        for fx_path in fx_paths:
            (deployment, contract, fx) = fx_path.split("/")
            caller_names = []
            for caller in callers:
                caller_names.append(addrs.reversebook.get(caller, "UNDEF"))
            d = {
                "Fx": fx,
                "Contract": contract,
                "Deployment": deployment,
                "Authorized_Caller_Addresses": callers,
                "Authorized_Caller_Names": caller_names
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
            linkedDeployments.append(f"[{deployment}]({GITHUB_DEPLOYMENTS_NICE}/tasks/{deployment})")

        results[contract][fx]["callerNames"] = list(set(callerNames + list(results[contract][fx]["callerNames"])))
        results[contract][fx]["callerAddresses"] = list(set(linkedAddresses + list(results[contract][fx]["callerAddresses"])))
        results[contract][fx]["deployments"] = list(set(linkedDeployments + list(results[contract][fx]["deployments"])))

    return dict(results)


def deployment_deduped_map_to_list(deployment_map):
    result = []
    need_description = []
    description_by_function = AddrBook.fx_description_by_name
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
        f.write(ENABLE_WIDE_TABLES)
        f.write(f"# {chain.capitalize()} Authorizer Permissions\n\n### Last generated on {today}\n\n")
        dedup.to_markdown(buf=f, index=False)


def generate_chain_files(chain):
    permissions = build_chain_permissions_list(chain)
    with open(f"data_files/permissions/{chain}.json", "w") as f:
        json.dump(permissions, f, indent=3)
    with open(f"data_files/permissions/{chain}.json", "r") as f:
        permissions = json.load(f)
    if len(permissions) > 0:
        output_list(permissions, f"{chain}", chain)
    else:
        print(f"WARNING: No permissions found for chain {chain}")


def main():
    for chain in AddrBook.chain_ids_by_name.keys():
        print(f"\n\n\nWriting docs for {chain.capitalize()}\n\n\n")
        generate_chain_files(chain)


if __name__ == "__main__":
    main()
