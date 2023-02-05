---
order: 1
---

# BAL Token

## Overview

Balancer Governance Token \(BAL\) is the core token behind the Balancer protocol. Alignment between governance token holders and protocol stakeholders is crucial for successful decentralized governance, and BAL tokens are the vehicle to drive this alignment. [veBAL](/concepts/governance/vebal/) is an extension of BAL and is used for voting in decentralized governance.

## Contract Address

| Network  | BAL Token Address                                                                                                                                              |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum | <span class="address-link">[0xba100000625a3754423978a60c9317c58a424e3d](https://etherscan.io/address/0xba100000625a3754423978a60c9317c58a424e3d)</span>        |
| Polygon  | <span class="address-link">[0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3](https://polygonscan.com/address/0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3)</span>     |
| Arbitrum | <span class="address-link">[0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8](https://arbiscan.io/address/0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8)</span>         |
| Goerli   | <span class="address-link">[0xfA8449189744799aD2AcE7e0EBAC8BB7575eff47](https://goerli.etherscan.io/address/0xfA8449189744799aD2AcE7e0EBAC8BB7575eff47)</span> |

## Supply & Inflation Schedule

The maximum total supply of BAL tokens enforced at the smart contract is 100M; however, this does NOT necessarily mean that this cap will ever be reached. BAL token holders have the authority to decide if the distribution should end before hitting the cap.

At the start of BAL token incentives 145,000 BAL is minted every week and this will decrease over time, halving every four years. The chart below outlines the supply schedule.

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

| BAL Recipient/Fund                     | BAL Amounts   |
| :------------------------------------- | :------------ |
| Liquidity Providers                    | \(Up to\) 65M |
| Founders, Options, Advisors, Investors | 25M           |
| Ecosystem Fund                         | 5M            |
| Fundraising Fund                       | 5M            |

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

Every week 145,000 BAL tokens, or approximately 7.5M per year, are distributed to Liquidity Providers. At this rate, it would take a total of 8.666 years to distribute the remaining 65M BAL before reaching the 100M cap.

#### Founders, Options, Advisors, Investors

25M tokens were allocated to founders, stock options, advisors, and investors, all subject to vesting periods.

#### Ecosystem Fund

5M were allocated for the Ecosystem Fund. This fund will be deployed to attract and incentivize strategic partners who will help the Balancer ecosystem grow and thrive. BAL holders will ultimately decide how this fund is used over the coming years.

<span class="address-link">[0xb618F903ad1d00d6F7b92f5b0954DcdC056fC533](https://etherscan.io/address/0xb618F903ad1d00d6F7b92f5b0954DcdC056fC533)</span>

#### Fundraising Fund

5M were allocated for the Fundraising Fund. Balancer Labs raised a pre-seed and seed round. This fund will be used for future fundraising rounds to support Balancer Labs' operations and growth. BAL tokens will never be sold to retail investors.

For full transparency, the [seed series](https://medium.com/balancer-protocol/balancer-labs-raises-3m-to-supercharge-programmable-liquidity-8f1a42323c78) price of one BAL token was $0.60.

<span class="address-link">[0xB129F73f1AFd3A49C701241F374dB17AE63B20Eb](https://etherscan.io/address/0xB129F73f1AFd3A49C701241F374dB17AE63B20Eb)</span>
