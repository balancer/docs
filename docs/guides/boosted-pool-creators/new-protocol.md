# Integrate a New Yield Protocol

## Is a New Factory Necessary?
The first consideration when integrating a new yield protocol into Boosted Pools is whether a new factory is even necessary. The `ERC4626LinearPool` is designed to be compatible with any ERC-4626 compliant token vault, so they can be used directly (but don't forget to register a new [`protocolId`](./new-pool.md#protocol-ids)!)

If the token in question is not ERC-4626 compliant, there are two options:
* Use an ERC-4626 compliant token wrapper and the `ERC4626LinearPool`.
* Create a new Linear Pool type.

## ERC-4626 functions used by Boosted Pools
This document refers to ERC-4626 functions used by Boosted Pools. The ERC-4626 token is described fully in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626), and a shorter explanation of the interface is found in the docs for [ERC-4626](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/).

::: warning IMPORTANT
`convertToAssets` and `previewMint` must give the exact same result as `deposit`/`redeem`. Check Token Compatibility section for unsupported tokens.
:::

### `convertToAssets`
```function convertToAssets(uint256 shares) public view returns (uint256 assets)```

This function returns the amount of assets (`mainToken`) that would be exchanged by the vault for the amount of shares (`wrappedToken`) provided.

### `deposit`
```function deposit(uint256 assets, address receiver) public returns (uint256 shares)```

This function deposits assets of underlying tokens (`mainToken`) into the vault and grants ownership of shares (`wrappedToken`) to the receiver.

### `previewMint`
```function previewMint(uint256 shares) public view returns (uint256)```

This function allows users to simulate the effects of their mint at the current block.


### `redeem`
```function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)```

This function redeems a specific number of shares (`wrappedToken`) from the owner and sends assets of the underlying token (`mainToken`) from the vault to the receiver.

# Create Custom Linear Pool Factory

::: warning Wait!
Before devoting time to create a custom Linear Pool, please make sure you can't use one of the already developed factories that are compatible with ERC-4626 vaults and Aave V2 forks.
:::

## Getting Started
* Fork the [linear pool repo](https://github.com/orbcollective/linear-pools).
* In `pkg/linear-pools/contracts/`, copy the `erc4626-linear-pool` folder to your new folder. The naming standard for the folder is `[protocol-name]-linear-pool`. Notice that letters are lowercase and separated by a dash.
* Make sure to rename all files, classes, etc, to your yield-bearing vault protocol.

## Functions to Change
### `LinearPool`
`_getWrappedTokenRate`
This function will be used to calculate conversions between wrapped and unwrapped tokens. It must be rewritten to be compliant with your protocol.

### `LinearPoolRebalancer`
`_wrapTokens`
This is equivalent to the `deposit` function and will be used by the Rebalancer to insert tokens in the yield-bearing vault.

`_unwrapTokens`
This is equivalent to the `redeem` function and will be used by the Rebalancer to remove tokens from yield-bearing vault.

`_getRequiredTokensToWrap`
This function is used by the Rebalancer to calculate the amount of unwrapped tokens that is needed to obtain a certain amount of wrapped tokens. Be aware that the number returned by this function needs to be compliant with the rate returned by `_getWrappedTokenRate`.

## Token Interface
When changing the functions above, there will be a need to create an interface for the yield-bearing vault token (or even another contract from the protocol, see Aave code for example). Create this interface in the folder `./interfaces/`. Notice that interface files and classes start with letter "I".

## Unit Tests
To create unit tests for your pool:
* In `pkg/linear-pools/contracts/test/`, create a Mock for each interface from the previous step. Use `MockERC4626Token.sol` as an example.
* To run tests, open `pkg/linear-pools/` and run `yarn test`. Make sure it's passing before moving to the next step.

## Fork Tests
Fork tests ensure that your code will run against the real token and pool implementations, on a real network. While unit tests use your mocked tokens and test only your pool code, fork tests are good to detect failures of the integration between the pool and the token.
Fork tests are inside `pkg/fork-tests/tests/`. Create a folder with the format `YYYYMMDD-[linear-pool-folder-name]`, then create the following folders inside it:
* `build-info`
* `test`

Copy files `index.ts` , `input.ts` and `readme.md` from `20230103-erc4626-rebalanced-linear-pool/` into your newly created task folder. Make sure to change `index.ts` and `input.ts` variables to adjust to your pool names. Also, copy the test file inside the test folder.

`build-info` should have the compiled code of linear pools. To get that, open the folder `pkg/linear-pools/` and run `yarn hardhat compile`. After compilation, open the folder `pkg/linear-pools/artifacts/build-info/` and copy the JSON file to the task's `build-info` folder.

Adapt the test file to the protocol name, and change the block number of the test and the network, if it applies. Make sure hardhat is configured locally so that the test will be able to fork the desired chain.

If all goes well, you should only need to change the fields highlighted above.

## Subgraph
Adding new integrations to the subgraph is important for tracking Linear Pool creations. The subgraph is maintained in the [Balancer Subgraph Repository](https://github.com/balancer/balancer-subgraph-v2). 

In the `abi` folder, add two JSON files: one for the new Linear Pool ABI and one for the corresponding factory ABI. 

In `networks.yaml`, add an entry for each network that the new Linear Pool is deployed on. This includes information on the `network`, factory name, `address` of the deployed contract, and `startBlock`. Maintain the current naming conventions by naming the factory, `<protocol>LinearPool<version>Factory`. 

Add the Linear Pool to the `PoolType` namespaces within `src/mappings/helpers/pool.ts`. In the `pool.ts` file, update `hasVirtualSupply` and `isLinearPool` to include the new `PoolType`. 

In `manifest.template.yaml`, copy and paste the `ERC4626LinearPoolV4Factory` entry and change to fit the new Linear Pool's protocol and version. Verify the events match the source code. 

Add event handler mappings for the factory in `poolFactory.ts`. Copy and paste `handleNewERC4626LinearPoolV4` and make necessary changes for the new Linear Pool's protocol and version. The function name must match the name provided in the factory's handler from `manifest.template.yaml`.

## Need More Help?
Feel free to come by the [Balancer Discord](https://discord.balancer.fi/) with any questions.
