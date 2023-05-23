# Deploy a New Pool for Integrated Protocol

::: info What protocols are already integrated?
For a full list of protocols that already have linear pools, please check out the [linear pools repository](https://github.com/orbcollective/linear-pools/tree/master/pkg/linear-pools/contracts).
:::

## Protocol Ids

When deploying a Linear Pool, it's important to properly set the `protocolId` argument. This helps explain to prospective LPs what protocol the Linear Pool is using, since some factories can be used for multiple protocols. A list of currently registered protocols can be found [here](https://github.com/balancer/balancer-v2-monorepo/blob/647320a4a375c724276af8e1ae26948de8fa411b/pkg/interfaces/contracts/standalone-utils/IProtocolIdRegistry.sol#L54-L72). If a specific protocol is not on the list, additional protocols can be added by [governance](https://forum.balancer.fi/). **Protocols that are forks of other protocols should register their own `protocolId`!**

## Frequently Used Factories

### ERC-4626 ([deployments](https://github.com/balancer/balancer-deployments/tree/master/tasks/20230206-erc4626-linear-pool-v3/output))

If a user has a token, `TKN`, that has a corresponding ERC-4626 tokenized vault, `xTKN`, then it is immediately possible to create an ERC-4626 Linear Pool from the factory with `TKN` as the main token and Wrapped `aTKN` as the wrapped token.

### Aave V2 ([deployments](https://github.com/balancer/balancer-deployments/tree/master/tasks/20230206-aave-rebalanced-linear-pool-v4/output))

If a user has a token, `TKN`, that has a corresponding Aave aToken, `aTKN`, then it is possible to create an Aave Linear Pool; however, it is important to note that `aTKN` must be wrapped in a Static aToken Wrapper since aTokens are not natively compatible with Balancer V2!

::: info Need to deploy a Static aToken Wrapper?
To create a Static aToken Wrapper for **Aave V2**, follow the instructions in [this repository](https://github.com/rabmarut/protocol-v2/blob/rab/goerli/README.md).

Wrappers are coming soon for **Aave V3**! They will be ERC-4626 compatible.
:::

## MetaPools

To create liquidity for a new token with a market on a compatible protocol, pool creators can create a MetaPool. MetaPools help consolidate liquidity to a few primary pools, and reduce the burned on pool creators for sourcing their own liquidity.

For example, if a creator wanted to build liquidity around a new stablecoin, `USDX`, with aToken `aUSDX`, a pool creator could make an Aave Linear Pool `bb-a-USDX` and pair it with BPT from the existing `bb-a-USD`. This would create trading pairs with `USDC`, `USDT`, `DAI`, `USDX`, and all of their respective wrapped aTokens.
This architecture keeps all of the underlying tokens of `bb-a-USD` in the same pool while still opening simple swap paths to the newly paired tokens.

![](/images/metapools.png)

## Need More Help?

Feel free to come by the [Balancer Discord](https://discord.balancer.fi/) with any questions.
