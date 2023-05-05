---
order: 1
---

# BAL Token

## Overview

Balancer Governance Token \(BAL\) is the core token behind the Balancer protocol. Alignment between governance token holders and protocol stakeholders is crucial for successful decentralized governance, and BAL tokens are the vehicle to drive this alignment. [veBAL](./veBAL) is an extension of BAL and is used for voting in decentralized governance.

## Contract Address

| Network  | BAL Token Address                                                                                                                                              |
|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Ethereum | <span class="address-link">[0xba100000625a3754423978a60c9317c58a424e3d](https://etherscan.io/address/0xba100000625a3754423978a60c9317c58a424e3d)</span>        |
| Polygon  | <span class="address-link">[0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3](https://polygonscan.com/address/0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3)</span>     |
| Arbitrum | <span class="address-link">[0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8](https://arbiscan.io/address/0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8)</span>         |
| Goerli   | <span class="address-link">[0xfA8449189744799aD2AcE7e0EBAC8BB7575eff47](https://goerli.etherscan.io/address/0xfA8449189744799aD2AcE7e0EBAC8BB7575eff47)</span> |

## Supply & Inflation Schedule

The maximum total supply of BAL tokens enforced at the smart contract is 100M; however, this does NOT necessarily mean that this cap will ever be reached. BAL token holders have the authority to decide if the distribution should end before hitting the cap.

At the start of BAL token incentives 145,000 BAL is minted every week. In Q1 2022, [veBAL was introduced](https://forum.balancer.fi/t/introducing-vebal-tokenomics/2512) to replace fixed weekly emissions. veBAL includes an annueal reduction in emissions rate such that the program should run until around 2050, leaving a total supply of around 94/100 million tokens upon completion and assuming no other governance is enacted to mint part of the remaining unallocated supply.

TOTAL Tokens to be emitted by veBAL: 47,520,700

The current emissions rate can be understood by looking at the [Balancer Token Admin Contract](https://etherscan.io/address/0xf302f9f50958c5593770fdf4d4812309ff77414f#readContract)

You can see the emission rate (getInflationRate = 0.239 BAL/second = 145k BAL/week)

And the RATE_REDUCTION_COEFFICIENT 1.189 = 2^(1/4)

This is applied to the inflation rate every year so as to achieve the emission scheduled approved by governance

This results in the following emissions schedule:

::: chart BAL Total Supply

```json
{
  "type": "line",
  "data": {
    "labels": [],
    "datasets": [
      {
        "label": "",
        "data": [
          { "x": "2022", "y": 46890000 },
          { "x": "2023", "y": 54450714 },
          { "x": "2024", "y": 60808492 },
          { "x": "2025", "y": 66154724 },
          { "x": "2026", "y": 70650352 },
          { "x": "2027", "y": 74430709 },
          { "x": "2028", "y": 77609598 },
          { "x": "2029", "y": 80282714 },
          { "x": "2030", "y": 82530528 },
          { "x": "2031", "y": 84420706 },
          { "x": "2032", "y": 86010151 },
          { "x": "2033", "y": 87346709 },
          { "x": "2034", "y": 88470616 },
          { "x": "2035", "y": 89415705 },
          { "x": "2036", "y": 90210427 },
          { "x": "2037", "y": 90878706 },
          { "x": "2038", "y": 91440660 },
          { "x": "2039", "y": 91913204 },
          { "x": "2040", "y": 92310565 },
          { "x": "2041", "y": 92644705 },
          { "x": "2042", "y": 92925682 },
          { "x": "2043", "y": 93161954 },
          { "x": "2044", "y": 93360634 },
          { "x": "2045", "y": 93527704 },
          { "x": "2046", "y": 93668193 },
          { "x": "2047", "y": 93786329 },
          { "x": "2048", "y": 93885669 },
          { "x": "2049", "y": 93969204 },
          { "x": "2050", "y": 94039448 }
        ]
      }
    ]
  },
  "options": {
    "scales": {
      "y": {
        "min": 0
      }
    },
    "plugins": {
      "legend": {
        "display": false
      }
    }
  }
}
```

:::

## Distribution

This chart outlines the allocation amounts. More details below.

| BAL Recipient/Fund                                                                                                                                                     | Original Allocation | State as of Feb 2023                          |
|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------|:----------------------------------------------|
| Community                                                                                                                                                              | 65M                 | 6M remain                                     |
| Liquidity Providers(veBAL) - [allocated by community](https://snapshot.org/#/balancer.eth/proposal/0xc93aa02ea7153a53d124189567ba19aa28663c499cdbfa60fe9bf35bf574d2a7) | N/A                 | 47.5M From community fund allocated to veBAL  |
| Founders, Options, Advisors, Investors                                                                                                                                 | 25M                 | No Information Available                      |
| Ecosystem Fund                                                                                                                                                         | 5M                  | Merged into Community Fund                    |
| Fundraising Fund                                                                                                                                                       | 5M                  | Merged into Community Fund                    |

::: chart BAL Token Distribution

```json
{
  "type": "pie",
  "data": {
    "labels": [
      "Community",
      "Founders, Options, Advisors, Investors",
      "Ecosystem",
      "Fundraising"
    ],
    "datasets": [
      {
        "label": "%",
        "data": [65, 25, 5, 5],
        "backgroundColor": [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)"
        ],
        "borderColor": [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        "borderWidth": 1
      }
    ]
  },
  "options": {}
}
```

:::

#### Liquidity Providers

Emissions to liquidty providers are decided by a combination of the emissions schedule described above, and [veBAL](./veBAL) voting to determine the allocations that flow to each authorized pool.

#### Founders, Options, Advisors, Investors

25M tokens were allocated to founders, options, advisors, and investors, all subject to vesting periods.

#### Ecosystem Fund

5M were allocated for the Ecosystem Fund. This fund will be deployed to attract and incentivize strategic partners who will help the Balancer ecosystem grow and thrive. BAL holders will ultimately decide how this fund is used over the coming years.

Note that as part of the veBAL conversion, the entire ecosystem fund was transferred into the [DAO multisig](https://etherscan.io/address/0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f)

There are currently over 5 million BAL in community control. Additionally, at the time of ths writing some additional BAL is staked on Aave on Polygon. All community BAL is held in the DAO Multisig of the chain which they reside.

Original Ecosystem Fund: <span class="address-link">[0xb618F903ad1d00d6F7b92f5b0954DcdC056fC533](https://etherscan.io/address/0xb618F903ad1d00d6F7b92f5b0954DcdC056fC533)</span>

#### Fundraising Fund

5M were allocated for the Fundraising Fund. Balancer Labs raised a pre-seed and seed round. This fund will be used for future fundraising rounds to support Balancer Labs' operations and growth. BAL tokens will never be sold to retail users. As part of the transition to the [Operating Framework Enacted by Governance in Q2 2022](https://forum.balancer.fi/t/bip-1-operating-framework-for-balancer-dao/3237), 1.9M BAL was [transferred](https://etherscan.io/tx/0xaa29cd251cdb024c415b0e13f67a0ca74fe5abc3de9a9fedd1ae26fd39be4025) from the Fundraising Fund back to the DAO Multisig to supplement the community controlled supply.

For full transparency, the [seed series](https://medium.com/balancer-protocol/balancer-labs-raises-3m-to-supercharge-programmable-liquidity-8f1a42323c78) price of one BAL token was $0.60.

Fundrasiing Fund <span class="address-link">[0xB129F73f1AFd3A49C701241F374dB17AE63B20Eb](https://etherscan.io/address/0xB129F73f1AFd3A49C701241F374dB17AE63B20Eb)</span>
