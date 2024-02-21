---
title: "Risks"
order: 7
---

# veLaunchpad Risks

When deploying or using a vote escrow system through the Launchpad or via the contracts directly, there are several risks that both deployers (developers) and users (participants) should be aware of. This is autonomous software. See also [Balancer Protocol Risks](https://app.balancer.fi/#/risks).

## Smart Contract Security
While smart contract factories may offer convenience in deploying new instances of vote escrow systems, they also introduce dependencies on the security and reliability of the factory contracts. If the factory contracts contain vulnerabilities or are compromised, it could affect all instances deployed through them.

[The new contracts](https://github.com/protofire/ve8020-launchpad) are based on the [existing veBAL system](https://medium.com/balancer-protocol/vebal-is-live-aeda1ae13e20) / [VotingEscrow.vy](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/liquidity-mining/contracts/VotingEscrow.vy) that Balancer has employed since March 2022 with the addition of factories and updates developed by [Protofire](https://protofire.io/) that include the ability to set early unlock permissions and penalties. Balancer has taken steps to mitigate these risks through reviews by Protofire and conducting an [audit with Certora that can be read here](). Teams can still fork the original VotingEscrow contracts if preferred and the additional features are not required.

## Configuration Risks
Deployers need to configure the parameters of the vote escrow system according to the specific requirements and objectives of their DAO/project/protocol. This includes setting parameters such as lock-up periods, voting eligibility criteria, quorum thresholds, and voting power weights. Misconfigurations can lead to unintended consequences or vulnerabilities in the governance process.

## Integration Risks
Deployers may need to integrate the deployed smart contracts with other components of their infrastructure, such as the front-end interface, wallet integrations, or external services. Integration errors or compatibility issues could disrupt the functioning of the vote escrow system and impact user experience.

## Monitoring and Maintenance
Deployers are responsible for monitoring the performance and health of the deployed smart contracts over time. They should conduct regular audits, security assessments, and upgrades to address any vulnerabilities, bugs, or changes in the operating environment that may affect the integrity or functionality of the vote escrow system.

## Reliability of Front-End
The front-end interface provided on this docs site may be subject to downtime, bugs, or security vulnerabilities. Deployers and owners should assess the reliability and security of the front-end and consider implementing backup interfaces or contingency plans such as interacting directly with the deployed contracts in case of disruptions.
