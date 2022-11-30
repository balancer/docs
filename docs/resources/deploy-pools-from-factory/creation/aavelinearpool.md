# AaveLinearPool

## Overview

AaveLinearPools facilitate trades between token/waToken. They can only be deployed for tokens that have Aave aTokens and require you to deploy an Aave aToken Wrapper if one does not already exist. For this page, we will assume we have a new USD stablecoin called `USDX` that already has an Aave aToken, `aUSDX`.&#x20;

### Requirements

* Some quantity of `USDX`
* `aUSDX` must be an existing aToken available on Aave. Having some quantity of this token is **optional** for pool creation.
* An Aave aToken Wrapper for compatibility with Balancer
* Deploy AaveLinearPool

{% hint style="info" %}
Want to arbitrage an AaveLinearPool in order to keep it within the desired balance range? [Here's an example contract](https://etherscan.io/address/0x1ed9c8bd3dccb85f704a5287444b552f9d5e1a26#code) that takes a Flashloan from Uniswap and rebalances the Token/aToken between Aave and the AaveLinearPool.
{% endhint %}

## Aave aToken Wrapper

### Why?

Aave aTokens have streaming balances, which are incompatible with Balancer. For this reason they must be wrapped before they're deposited into a pool.

### How?

* Clone [Aave's protocol-v2 repo](https://github.com/aave/protocol-v2/tree/feat/233-staticATokenLM-support-old-atoken) and switch to the **feat/233-staticATokenLM-support-old-atoken** branch (latest revision is commit `1d80f9a`)
* Create a `.env` file with your secrets

```
cat > .env << EOF
MNEMONIC=<your-12-word-mnemo>
ETHERSCAN_KEY=<optional>
ALCHEMY_KEY=<your-alchemy-token>
EOF
```

* Start docker compose, it will install all dependencies

```
docker-compose up
```

* Get into the container in another terminal/session

```
docker-compose exec contracts-env bash
```

* Compile contracts

```
npm run compile
```

* Run the Static AToken task

```
npx hardhat --network <network> deploy-atoken-wrapper \\
--pool <LendingPoolAddress> \\
--a-token-address <AToken address like aDAI> \\
--proxy-admin <Proxy Admin address that can upgrade the proxy implementation> \\
--verify # --verify flag is to verify the contracts automatically if you have ETHERSCAN_KEY env variable correctly set.
```

#### Sample Command for `waDAI`

```
npx hardhat --network main deploy-atoken-wrapper \\
--pool 0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9 \\
--a-token-address 0x028171bCA77440897B824Ca71D1c56caC55b68A3 \\
--proxy-admin 0xEE56e2B3D491590B5b31738cC34d5232F378a8D5 \\
--verify
```

### Deploy an AaveLinearPool

The simplest way to deploy an AaveLinearPool is with [balpy](https://github.com/balancer-labs/balpy).&#x20;

* Clone balpy repo:

```
git clone https://github.com/balancer-labs/balpy.git
```

* Go to the poolCreation samples

```
cd balpy/samples/poolCreation
```

* Follow the directions in README.md

```
# Make a virtual environment
python3 -m venv ./venv
source ./venv/bin/activate

# Install balpy
python3 -m pip install balpy

# Source your environment (balpy will warn you if you forget this step)

# Copy a pool config for the poolType you want to create
cp sampleAaveLinearPool.json mySuperAwesomePool.json

# Edit your new pool file in your favorite text editor

# Run the Python script
python3 poolCreationSample.py mySuperAwesomePool.json
```

## Common Arguments

In addition to the arguments listed below, you should also consider the [common arguments](./#common-arguments) when creating an AaveLinearPool.

## Pool Creation Arguments

### `upperTarget`

The `upperTarget` argument defines the upper limit of the "no fee zone." The "no fee zone" is the a range for the desired amount of `baseToken` in the pool. In general, LinearPools strive to keep enough `baseToken` liquidity to facilitate trades while attempting to maximize the `wrappedToken` balance to take advantage of the benefits of wrapped tokens (ie wrapped aTokens).
