---
order: 3
---

# Pool Deployments and Features

## Current versions

| Feature                      | Weighted           | Stable             | Composable Stable  | Liquidity Bootstrapping                  | Linear             | Managed            | WeightedPool2Tokens  |
|------------------------------|--------------------|--------------------|--------------------|------------------------------------------|--------------------|--------------------|----------------------|
| Date of Release              | 03/20/2023         | 06/09/2022         | 03/20/2023         | 12/02/2021                               | 02/08/2023         | 10/21/2022         | 04/18/2021           |
| Current Version              | V4                 | V2                 | V4                 | V2                                       | V3                 | V1                 | V1                   |
| Math Type                    | Weighted           | Stable             | Stable             | Weighted                                 | Linear             | Weighted           | Weighted             |
| Versioning in the pool       | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                                      | :heavy_check_mark: | :heavy_check_mark: | :x:                  |
| Protocol Fees Payment        | BPT                | Pool tokens        | BPT                | No fees - shares revenue instead (Fjord) | No fees            | BPT                | Highest weight token |
| Pre-minted BPT               | :x:                | :x:                | :heavy_check_mark: | :x:                                      | :heavy_check_mark: | :heavy_check_mark: | :x:                  |
| Recovery mode                | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x:                                      | :heavy_check_mark: | :heavy_check_mark: | :x:                  |
| Circuit Breaker              | :x:                | :x:                | :x:                | :x:                                      | :x:                | :heavy_check_mark: | :x:                  |
| BPT Token at 0 index         | :x:                | :x:                | :x:                | :x:                                      | :heavy_check_mark: | :heavy_check_mark: | :x:                  |
| Tokens sorted by address     | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:                       | :x:                | :x:                | :heavy_check_mark:   |
| Proportional Joins and Exits | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark:                       | :x:                | :heavy_check_mark: | :x:                  |
| Join/Exit through batch swap | :x:                | :x:                | :heavy_check_mark: | :x:                                      | :heavy_check_mark: | :heavy_check_mark: | :x:                  |
| Max Tokens                   | 8                  | 5 (without BPT)    | 5 (without BPT)    | 4                                        | 2 (without BPT)    | 50                 | 2                    |
| Support to Add/Remove tokens | :x:                | :x:                | :x:                | :x:                                      | :x:                | :heavy_check_mark: | :x:                  |

## Deployments

For deployments addresses, please take a look [here](/reference/contracts/deployment-addresses/mainnet.html).