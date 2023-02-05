# Multisig

## Multisig Addresses

The Protocol controls one DAO Multisig on each chain:

| Network  | Address                                                                                                                                                 |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ethereum | <span class="address-link">[0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f](https://etherscan.io/address/0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f)</span> |
| Polygon  | <span class="address-link">[0xd2bD536ADB0198f74D5f4f2Bd4Fe68Bae1e1Ba80](https://etherscan.io/address/0xd2bD536ADB0198f74D5f4f2Bd4Fe68Bae1e1Ba80)</span> |
| Arbitrum | <span class="address-link">[0x6207ed574152496c9B072C24FD87cE9cd9E17320](https://etherscan.io/address/0x6207ed574152496c9B072C24FD87cE9cd9E17320)</span> |

The bulk of this page refers to the Ethereum Multisig. The Polygon and Arbitrum deployments are 3 of 5 Multisigs with signers from the community.

Over time, various functions have been delegated to different Multisigs. The Balancer Maxis working group is responsible for ensuring the application of governance on chain. The [Balancer Multisig Ops Repo](https://github.com/BalancerMaxis/Multisig-ops) describes all Multisigs and operations as well as the external touch-points available.

## Context

Since its inception, the long term vision for the Balancer Protocol is to be fully governed by BAL token holders, while token ownership is aimed to be widely spread across the Balancer community.

But getting to that ideal, long-term vision of a truly decentralized and effective governance is no easy task. Protocol governance is a highly complex and rapidly evolving topic. The whole crypto ecosystem is still in the very early days of trying to figure out:

- which mechanisms and processes work best
- the necessary infrastructure, tooling, and user interfaces
- the risks and concerns associated with each approach

Experimentation happening in all directions:

- vote delegation
- minimum quorum
- specialized committees
- continuous voting
- augmented voting power via token lock
- off-chain voting for signaling / polling
- on-chain actions from off-chain voting by way of oracles
- upgradeable smart contracts
- time delays on sensitive actions
- emergency actions via Multisig \(e.g. pause, shutdown\)
- legal entities \(e.g. foundation\) providing support for the DAO
- tools for DAO treasury management
- token issuance to cover protocol expenses
- incentivized voting
- incentivized off-chain engagement \(e.g. forum participation\)
- and so on…

While also actively experimenting with governance-related initiatives, the Balancer community has leaned towards the more cautious and thoughtful approach of not trying to rush the path to full decentralization, so each step towards a mature on-chain governance will be taken with due care, having learned from others’ experiences.

Balancer V2 contracts allow for some tweaking of core protocol parameters, for instance, in turning on protocol fees. As a placeholder for a future on-chain DAO, such limited admin powers has been initially
granted to a Multisig.

Balancer strives to continue to automate operations and governance execution. While the eventual goal is still to move the entire governance and execution on-chain, the current Multisigs have proven themselves as reliable executors of the wishes of veBAL voters. In the long run, BAL holders are expected to retire the Multisig in favor of a full-fledged Balancer DAO.

## The Multisigs

Balancer Governance has grown to into a system managed by a collection of Multisigs, which are activated by 2 different signer sets. First of all, a very important point: the Multisigs do NOT have decision making power, as their role is to simply enact and operate on-chain the decisions BAL holders make via off-chain voting and.

Further, fee collection and processing requires tokens to be swept from the vault and traded for dollars. This is an example of an operational pratice, defined by governance, that requires regular onchain intevention. The Balancer Maxis currently operate these processes through Multisigs.

All Balancer Multisigs are deployed using [Gnosis Safe](https://gnosis-safe.io/), the most battle-tested Multisig contract on Ethereum. The DAO and Treasury Multisigs with the ability to change protocol operations or access to treasury funds are require 6-of-11 singers to process transactions. The signer structure of the Multisigs may change if voted on through the governance process.

Here is a list of the currently active Balancer Multisigs as of February 2023:

| Name                          | Purpose                                                                                                                                 | Chain                                                                                                                                                                                                                                                                           | Address                                    | Signer Set  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| Protocol Fees Multisig        | Collect fees, and set A-Factors and Fees on pools (default pool-owner, except on mainnet where a separate Multisig is used to set fees. | [MAINNET](https://gnosis-safe.io/app/eth:0x7c68c42De679ffB0f16216154C996C354cF1161B/home), [ARBI](https://gnosis-safe.io/app/arb1:0x7c68c42De679ffB0f16216154C996C354cF1161B/home), [POLYGON](https://gnosis-safe.io/app/matic:0x7c68c42De679ffB0f16216154C996C354cF1161B/home) | 0x7c68c42De679ffB0f16216154C996C354cF1161B | Bal Maxis   |
| Mainnet Fee Setter            | Default pool owner for Mainnet that can set A-Factors and protocol fees.                                                                | [MAINNET](https://gnosis-safe.io/app/eth:0xf4A80929163C5179Ca042E1B292F5EFBBE3D89e6/home)                                                                                                                                                                                       | 0xf4A80929163C5179Ca042E1B292F5EFBBE3D89e6 | Bal Maxis   |
| DAO Multlsig                  | Funding BIPs, killing of gauges, veBAL whitelisting                                                                                     | [MAINNET](https://gnosis-safe.io/app/eth:0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f/home)                                                                                                                                                                                       | 0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f | DAO Signers |
| Gauge Controller(LM Multisig) | Used to manage gauges and Reward Tokens and manage liquidity supplied to multichain (bridge). New Gauge requests go here.               | [MAINNET](https://gnosis-safe.io/app/eth:0xc38c5f97B34E175FFd35407fc91a937300E33860/home), [ARBI](https://gnosis-safe.io/app/arb1:0xc38c5f97B34E175FFd35407fc91a937300E33860/home), [POLYGON](https://gnosis-safe.io/app/matic:0xc38c5f97B34E175FFd35407fc91a937300E33860/home) | 0xc38c5f97B34E175FFd35407fc91a937300E33860 | Bal Maxis   |
| Linear Pool Control           | Manage limits on Mainnet Linear Pools                                                                                                   | [MAINNET](https://gnosis-safe.io/app/eth:0x75a52c0e32397A3FC0c052E2CeB3479802713Cf4/home)                                                                                                                                                                                       | 0x75a52c0e32397A3FC0c052E2CeB3479802713Cf4 | Bal Maxis   |
| Maxi Operational Payments     | Holds the Maxi Budget and is used to pay people and expenses.                                                                           | [MAINNET](https://gnosis-safe.io/app/eth:0x166f54F44F271407f24AA1BE415a730035637325/home)                                                                                                                                                                                       | 0x166f54F44F271407f24AA1BE415a730035637325 | Bal Maxis   |
| Managed Treasury              | Holds treasury funds managed by Karpatkey as per [BIP-162](https://forum.balancer.fi/t/bip-162-karpatkey-investment-strategy)           | [MAINNET](https://app.safe.global/eth:0x0EFcCBb9E2C09Ea29551879bd9Da32362b32fc89/home)                                                                                                                                                                                          | 0x0EFcCBb9E2C09Ea29551879bd9Da32362b32fc89 | DAO Signers |
| Arbitrum DAO Multisig         | Treasury + Admin functions on Arbitrum                                                                                                  | [ARBI](https://app.safe.global/arb1:0xaF23DC5983230E9eEAf93280e312e57539D098D0/home)                                                                                                                                                                                            | 0xaF23DC5983230E9eEAf93280e312e57539D098D0 | DAO Signers |
| Polygon DAO Multisig          | Treasury + Admin functions on Polygon                                                                                                   | [POLYGON](https://app.safe.global/matic:0xeE071f4B516F69a1603dA393CdE8e76C40E5Be85/home)                                                                                                                                                                                        | 0xeE071f4B516F69a1603dA393CdE8e76C40E5Be85 | DAO Signers |

## The Signers

Balancer’s Multisig signers are a diverse set of widely respected community members. These are the current signers as of February 2023:

**Note that the list below was last updated in February 2023. The Maxi's keep an up-to-date list of their signers and
Multisigs [here](https://github.com/BalancerMaxis/Multisig-ops)**

### DAO Multisig Signer Set

The DAO Multisig Signer Set and associated Multisigs is reserved for major changes to protcool operations, and management
of treasury funds.

| Signer                                             | Association              | Address                                    |
| -------------------------------------------------- | ------------------------ | ------------------------------------------ |
| [Alexander Lange](https://twitter.com/AlexLangeVC) | \(Inflection\)           | 0x3ABDc84Dd15b0058B281D7e26CCc3932cfb268aA |
| [0xMaki](https://twitter.com/0xMaki)               | \(LayerZero, AURA, DCV\) | 0x285b7EEa81a5B66B62e7276a24c1e0F83F7409c1 |
| [Solarcurve](https://twitter.com/0xSolarcurve)     | \(Balancer Maxis\)       | 0x512fce9B07Ce64590849115EE6B32fd40eC0f5F3 |
| [Evan](https://twitter.com/0xSausageDoge)          | \(Fjord\)                | 0x59693BA1A5764e087CE166ac0E0085Fc071B9ea7 |
| [Ernesto](https://twitter.com/eboadom)             | \(BGD\)                  | 0xA39a62304d8d43B35114ad7bd1258B0E50e139b3 |
| [Mounir](https://twitter.com/mounibec)             | \(Paraswap\)             | 0x0951FF0835302929d6c0162b3d2495A85e38ec3A |
| [Trent McConaghy](https://twitter.com/trentmc0)    | \(Ocean Protocol\)       | 0x478eC43c6867c2884f87B21c164f1fD1308bD9a3 |
| [Stefan](https://twitter.com/StefanDGeorge)        | \(Gnosis\)               | 0x9F7dfAb2222A473284205cdDF08a677726d786A0 |
| [bonustrack87](https://twitter.com/bonustrack87)   | \(Snapshot\)             | 0x9BE6ff2A1D5139Eda96339E2644dC1F05d803600 |
| [nanexcool](https://twitter.com/nanexcool)         | \(Ethereum OG\)          | 0x823DF0278e4998cD0D06FB857fBD51e85b18A250 |
| [David Gerai](https://twitter.com/davgarai)        | \(Nostra Finance\)       | 0xAc1aA53108712d7f38093A67d380aD54B562a650 |

**DAO Multisigs always require 6/11 signers to execute a transaction.**

Beyond those current signers, [BIP-16](https://forum.balancer.fi/t/bip-16-update-dao-Multisig-replacement-list/3361) laid out a group of backup signers who could replace current signers without further governance. Note that since BIP-16, Moniur has become an active member of the DAO Multisig.

### Operational Multisigs Signer Set (Balancer Maxis)

The Balancer Maxis operate a number of Multisigs with a reduced signer requirement, which are used for the regular operation of the protocol, as well as adding gauges to veBAL.

| Signer     | Discord Handle  | Address                                    |
| ---------- | --------------- | ------------------------------------------ |
| Solarcurve | solarcurve#5075 | 0x512fce9B07Ce64590849115EE6B32fd40eC0f5F3 |
| Zen Dragon | Zen Dragon#2923 | 0x7c2eA10D3e5922ba3bBBafa39Dc0677353D2AF17 |
| Zekraken   | zekraken#0645   | 0xafFC70b81D54F229A5F50ec07e2c76D2AAAD07Ae |
| Mike B     | d_w_b_w_d#0685  | 0xc4591c41e01a7a654B5427f39Bbd1dEe5bD45D1D |
| Xeonus     | Xeonus#4620     | 0x7019Be4E4eB74cA5F61224FeAf687d2b43998516 |
| Danko      | 0xDanko#3565    | 0x200550cAD164E8e0Cb544A9c7Dc5c833122C1438 |
| Tritium    | Trtiium#0069    | 0xcf4fF1e03830D692F52EB094c52A5A6A2181Ab3F |

**The Balancer Maxi Multisig set requires 2 or 3 out of 7 signers to execute, depending on the security level of the Multisig.**

The Balancer Maxi's are ratified by a BIP each quarter. [BIP-145](https://forum.balancer.fi/t/bip-145-fund-the-balancer-maxis-for-q1-2023/) is a recent example of such governance.

## Signer Duties

All signers are expected to sign an Ethereum transaction ratifying each decision made by BAL holders through snapshot votes. This signature is expected to be done within the two weeks after the snapshot vote was concluded. Signers are encouraged to sign open requests even if they have already reached a quorum in order to signal their liveliness.

A signer shall lose his/her role \(by action of the remaining Multisig signers excluding him/her\) in case he/she:

- acts against BAL token holders’ off-chain voting;
- goes through 3 months or 2 votes \(whichever takes longer\) without performing any of their signer duties.

## Multisig Powers

V2 smart contracts can grant some specific powers to an “admin” address, which will initially point to the Multisig’s address.

These powers are:

- set a share of swap fees to be diverted to the protocol \(hard capped at 50% of the swap fee\)
- set a flash loan fee
- extract from the vault collected protocol fees and/or excess balances \(e.g. airdrops\), to any destination
- set the address of the oracle implementation
- set relayer addresses: relayers are \(user opt-in, audited\) contracts that can make calls to the vault
  (with the transaction “sender” being any arbitrary address\) and use the sender’s ERC20 vault allowance,
  internal balance or BPTs on their behalf
- set dynamic-fee controllers: addresses \(initially assigned to Gauntlet\) that may change the swap fee for pools
  created by the dynamic-fee pool factory that will be deployed by Balancer Labs
- Add and removal of veBAL gauges

## Access to User Deposits

It’s worth highlighting that the Multisig does **not** have custody of, nor control over, funds from liquidity providers that lie inside Balancer Protocol contracts. Balancer V2 was designed so that even if the Multisig goes rogue, all the liquidity is safe and can be withdrawn by their rightful owners.
