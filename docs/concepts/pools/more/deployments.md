---
order: 3
---

# Pool Deployments and Features

## Current versions

| Feature                      | Weighted           | Stable             | Composable Stable  | Liquidity Bootstraping                   | Linear             | Managed            | WeightedPool2Tokens |
|------------------------------|--------------------|--------------------|--------------------|------------------------------------------|--------------------|--------------------|---------------------|
| Date of Release              | 09/08/2022         | 06/09/2022         | 11/22/2022         | 12/02/2021                               | 12/07/2022         | 10/21/2022         |                     |
| Current Version              | V2                 | V2                 | V2                 | V2                                       | V3                 | V1                 |                     |
| Versioning in the pool       | :x:                | :x:                | :heavy_check_mark: | :x:                                      | :heavy_check_mark: | :heavy_check_mark: |                     |
| Protocol Fees Payment        | BPT                | Pool tokens        | BPT                | No fees - shares revenue instead (Fjord) | No fees            | BPT                |                     |
| Pre-minted BPT               | :x:                | :x:                | :heavy_check_mark: |                                          | :heavy_check_mark: | :heavy_check_mark: |                     |
| Recovery mode                | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x:                                      | :heavy_check_mark: | :heavy_check_mark: |                     |
| Circuit Breaker              | :x:                | :x:                | :x:                | :x:                                      | :x:                | :heavy_check_mark: | :x:                 |
| BPT Token at 0 index         |                    |                    | :heavy_check_mark: |                                          | :heavy_check_mark: | :heavy_check_mark: |                     |
| Tokens sorted by address     |                    |                    | :x:                |                                          | :x:                | :x:                |                     |
| Proportional Joins and Exits |                    |                    | :heavy_check_mark: |                                          |                    |                    |                     |
| Join/Exit through batch swap |                    |                    | :heavy_check_mark: |                                          |                    | :heavy_check_mark: |                     |
| Max Tokens                   | 8                  | 5 (without BPT)    | 5 (without BPT)    | 8                                        | 2 (without BPT)    | 50                 |                     |
| Support to Add/Remove tokens | :x:                | :x:                | :x:                | :x:                                      | :x:                | :heavy_check_mark: | :x:                 |

## Deprecated versions

| Feature                      | Weighted V1 | Composable Stable V1 |
|------------------------------|-------------|----------------------|
| Date of Release              |             | 09/06/2022           |
| BPT Token at 0 index         |             | :x:                  |
| Versioning in the pool       |             | :x:                  |
| Protocol Fees Payment        |             | BPT                  |
| Pre-minted BPT               |             | :heavy_check_mark:   |
| Recovery mode                |             | :heavy_check_mark:   |
| BPT Token at 0 index         |             | :x:                  |
| Tokens sorted by address     |             | :heavy_check_mark:   |
| Proportional Joins and Exits |             | :x:                  |