---
pageClass: wide-content
---

# Sepolia Authorizer Permissions

### Last generated on 2023-08-09

| function   | contract           | callerNames   | callerAddresses                                                                                                                    | deployments                                                                                                                           | description                                                                                                                                                                 |
|:-----------|:-------------------|:--------------|:-----------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| activate   | BalancerTokenAdmin | ['UNDEF']     | ['[0x3d64fb8a2fFd08C186e8060aA57c8011D8b999cC](https://sepolia.etherscan.io//address/0x3d64fb8a2fFd08C186e8060aA57c8011D8b999cC)'] | ['[20220325-balancer-token-admin](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220325-balancer-token-admin)'] | A one time command used in the [initial activation of veBAL](https://forum.balancer.fi/t/vebal-activation-proposal/2632).                                                   |
| mint       | BalancerTokenAdmin | ['UNDEF']     | ['[0x9098b50ee2d9E4c3C69928A691DA3b192b4C9673](https://sepolia.etherscan.io//address/0x9098b50ee2d9E4c3C69928A691DA3b192b4C9673)'] | ['[20220325-balancer-token-admin](https://github.com/balancer/balancer-deployments/blob/master/tasks/20220325-balancer-token-admin)'] | Mint BAL tokens up to the current max supply as defined by the [emissions schedule.](https://docs.balancer.fi/concepts/governance/bal-token.html#supply-inflation-schedule) |