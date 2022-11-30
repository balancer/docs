# Creation

## Overview

{% hint style="warning" %}
Before creating a new pool, make sure there isn't already a similar pool; there's no advantage to fragmenting liquidity!
{% endhint %}

Anyone can create a pool on Balancer. WeightedPools can be deployed using the [Pool Creator Interface](https://app.balancer.fi/#/pool/create) ([Polygon link](https://polygon.balancer.fi/#/pool/create)) ([Arbitrum link](https://arbitrum.balancer.fi/#/pool/create)), but users can deploy any pools programmatically. It's **highly recommended** that you deploy a pool on a **testnet** before doing so on a production network.

You can deploy most if not all pools with balpy's `poolCreation` script -- [more info](./#deploying-a-pool-with-balpy).

## What kind of pool should I deploy?

That totally depends on your use-case. You should read through the [descriptions of different Balancer PoolTypes](https://docs.balancer.fi/products/balancer-pools) to decide what you want to deploy.

## Deployment Process Summary

### Step 1: Deploy the Pool From Factory

Each `poolType` has a factory from which users can deploy new pools. To deploy a pool, you must call that factory's `create()` function with the arguments that correspond to that specific pool. The below section goes over common arguments, and the subpages in this section go further into detail for the pool-specific arguments.

### Step 2: Add liquidity with the `INIT` join

The `INIT` join can be done only once when the pool have a BPT `totalSupply` of 0. Almost all pools require you to use a `JoinKind` of type `INIT` before you can use the pool.

{% hint style="info" %}
Linear Pools are an exception to this rule; you can swap into the pool right away to receive BPT out.&#x20;
{% endhint %}

{% hint style="warning" %}
While StablePhantom Pools do use `INIT` joins, they require that in addition to the "normal" tokens, you must also pass the pools own BPT in a quantity of `2**112-1`.
{% endhint %}

## Common Arguments

`name` - The name of the pool corresponding Balancer Pool Token (BPT)

`symbol` - The short symbol for the BPT

`tokens` - A numerically sorted array of all tokens in the pool

`swapFeePercentage` - How much of a swap fee the pool collects ([more below](./#fees))

`owner` - The "owner" of the pool: account that has some limited control over pool parameters ([more below](./#owner-rights))

## Fees and Owners

Two factors your should consider before deploying your pool are how fees and owners should be set. Pools can have static fees or dynamic fees, read [more about them in the main docs](https://docs.balancer.fi/concepts/fees#static-and-dynamic-fees).

### Fees

#### Static Fees

If you want static fees, you should set the fee you want the pool to have forever, and set the `owner` to the zero address `0x0000000000000000000000000000000000000000`.

#### Dynamic Fees

If you want dynamic fees, you should set the fee to an initial value, and set the `owner` either as the address that you want to control the pool fee, or to the delegate address. An address that is set as the owner has permission to set the fee to anything between 0.0001% and 10% whenever they want.

If the pool owner is set to the delegate address (`0xBA1BA1ba1BA1bA1bA1Ba1BA1ba1BA1bA1ba1ba1B`) then Governance-approved fee-setters have permission to change the fee. Currently [Gauntlet has this authority](https://medium.com/gauntlet-networks/balancer-v2-pools-trading-fee-methodology-7a65df671b8c).&#x20;

### Owner Rights

Aside from setting swap fees, pool owners have other right on some pools that may play a role when deciding on an owner.&#x20;

* [Stable Pools](../../../references/valuing-balancer-lp-tokens/pools/stablepools.md#permissioned-functions)
  * Changing `ampParameter`
* [MetaStable Pools](../../../references/valuing-balancer-lp-tokens/pools/metastablepools.md#permissioned-functions)
  * Changing `ampParameter`
  * Changing `cacheDuration`
* [Liquidity Bootstrapping Pools](../../../references/valuing-balancer-lp-tokens/pools/liquiditybootstrappingpool.md#permissioned-functions)
  * Changing `swapEnable`
  * Changing weights
* [Investment Pools](../../../references/valuing-balancer-lp-tokens/pools/investmentpools.md#permissioned-functions)
  * Changing `swapEnable`
  * Changing weights
  * Collecting management fees

## Deploying a pool with balpy

The Balancer Python library [balpy](https://pypi.org/project/balpy/) supports deploying pools. Using the [samples in the balpy GitHub repository](https://github.com/balancer-labs/balpy/tree/main/samples/poolCreation), you can deploy pools from config files. There are sample config files for many pools including:

* Weighted Pools
* Oracle Pools (WeightedPool2Tokens)
* Stable Pools
* Liquidity Bootstrapping Pools
* MetaStable Pools
* Investment Pools
* AaveLinear Pools
* StablePhantom Pools

More pools configs will be added as new factories are deployed.&#x20;

Once you have set up the necessary [environment variables](https://github.com/balancer-labs/balpy#environment-variables) and created your [virtual environment](https://github.com/balancer-labs/balpy#install), you can run the sample script with the command below. The script will ensure that you have sufficient token balances and **will execute token allowance approvals** if you do not have sufficient allowances.&#x20;

```
python3 poolCreationSample.py <yourModifiedPoolFile.json>
```

## Deploying a pool with TypeScript

{% hint style="info" %}
This tutorial will illustrate deploying an **Ethereum** mainnet **WeightedPool** using **hardhat** and **ethers.** It also assumes that you have your artifacts built.&#x20;

Modify accordingly if you wish to deploy a different PoolType, use a different network, or use JS/Buidler/Truffle/etc.
{% endhint %}

### Defining Addresses

```
// Contracts
const VAULT = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
const WEIGHTED_POOL_FACTORY = '0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';    

// Tokens -- MUST be sorted numerically
const MKR = '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2';
const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const tokens = [MKR, WETH, USDT];
```

{% hint style="danger" %}
Your `tokens` array **must be sorted numerically**. All other corresponding arrays (ex. `weights`, defined below) should reflect this ordering
{% endhint %}

### Pool Arguments

We now define the name, symbol, swap fee, and token weights. In this example, we want the weights to be 70/15/15 corresponding to MKR/WETH/USDT. Weights must add up to 1 represented with 18 decimals. Swap fee must be between 0.0001% and 10%, where 100% is 1 represented with 18 decimals.&#x20;

```
const NAME = 'Three-token Test Pool';
const SYMBOL = '70MKR-15WETH-15USDT';
const swapFeePercentage = 0.005e18; // 0.5%
const weights = [0.7e18, 0.15e18, 0.15e18];
```

### Creating the Pool in the Factory

In this block, we call the `create` function on the `WeightedPoolFactory` to deploy a new `WeightedPool`. We then get the `poolId` from the newly deployed pool.

```
const factory = await ethers.getContractAt('WeightedPoolFactory',
                                           WEIGHTED_POOL_FACTORY);

// If you're creating a different type of pool, look up the create 
// function for your corresponding pool in that pool factory's ABI
const tx = await factory.create(NAME, SYMBOL, tokens, weights,
                                swapFeePercentage, ZERO_ADDRESS);
const receipt = await tx.wait();

// We need to get the new pool address out of the PoolCreated event
const events = receipt.events.filter((e) => e.event === 'PoolCreated');
const poolAddress = events[0].args.pool;

// We're going to need the PoolId later, so ask the contract for it
const pool = await ethers.getContractAt('WeightedPool', poolAddress);
const poolId = await pool.getPoolId();
```

### Adding Tokens to Your New Pool

Before we send tokens to the Vault, we must approve appropriate allowances so that it can move our tokens. We can send infinite approvals (`2e256 - 1`) or enough to satisfy the amounts we wish to move.

```
const vault = await ethers.getContractAt('Vault', VAULT);

// Tokens must be in the same order
// Values must be decimal-normalized! (USDT has 6 decimals)
const initialBalances = [16.667e18, 3.5714e18, 7500e6];

// Need to approve the Vault to transfer the tokens!
// Can do through Etherscan, or programmatically
for (var i in tokens) {
  const tokenContract = await ethers.getContractAt('ERC20', tokens[i]);
  await tokenContract.approve(VAULT, initialBalances[i]);
}
```

Now we must join the pool using a `JoinKind` of type `INIT` ([more info on the different types of `JoinKind`](../../joins-and-exits/pool-joins.md)). This requires a list of `initialBalances`, which must be in the **same order as the sorted token addresses**. We must [encode the userData](../../../helpers/encoding.md) for our join. We then call `joinPool` on the `Vault`, since that is where all tokens are held.

```
// Construct userData
const JOIN_KIND_INIT = 0;
const initUserData =
    ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'], 
                                        [JOIN_KIND_INIT, initialBalances]);

const joinPoolRequest = {
  assets: tokens,
  maxAmountsIn: initialBalances,
  userData: initUserData,
  fromInternalBalance: false
} 

// define caller as the address you're calling from
caller = '0x...YOUR_ADDRESS_HERE...';

// joins are done on the Vault
const tx = await vault.joinPool(poolId, caller, caller, joinPoolRequest);

// You can wait for it like this, or just print the tx hash and monitor
const receipt = await tx.wait();
```

At this point you should have a funded `WeightedPool`, visible on the Balancer UI. In this mainnet example, you would be able to reach this page at: https://app.balancer.fi/#/pool/`<yourPoolId>`
