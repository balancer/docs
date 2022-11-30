# Verification

## Overview

{% hint style="info" %}
This page will go over how to verify a pool on Etherscan. The process works for other networks' block explorer websites like Polygonscan, but for the sake of simplicity, the article will refer to these sites only as "Etherscan". Be aware that **other block explorers will require their own API Key**.
{% endhint %}

The pool verification process has two main parts:

1. Getting a pool's constructor arguments
2. Sending data to Etherscan

## 1. Getting Constructor Arguments

There are two techniques for getting the constructor arguments; you can generate them with **balpy**, or you can grab them from [**Tenderly**](verification.md#grabbing-from-tenderly).&#x20;

* **balpy** is generally faster but requires changing a few parameters and running a Python script from a terminal
* **Tenderly** is a bit slower but may be a bit friendlier if you're not as comfortable in a command line environment

### Generating With balpy

The [poolVerification.py](https://github.com/balancer-labs/balpy/blob/main/samples/poolVerification/poolVerification.py) script generates the encoded constructor arguments as well as the rest of the command you'll need to execute in Step 2 below. To use this script for your pool, **you'll need to set arguments in the script**: `network`, `poolId`, and `creationHash`.&#x20;

* Set the **`network`** to the network your pool is deployed on. This could be `mainnet` for Ethereum mainnet, `kovan`, `rinkeby`, `goerli`, or `polygon`. At the time of writing, arbiscan __ does not yet support contract verification.&#x20;
* Each pool has a unique **`poolId`**. If you don't know where to find a `poolId`, check out [this note about `poolId`s](../pool-interfacing/#poolids).&#x20;
* The pool's **`creationHash`** is **optional** for most networks, but currently **mandatory for `polygon`**. (The polygonscan API does not currently support the necessary `txlistinternal` query to fetch this hash.)

#### Mainnet Example Inputs

```
network = "mainnet"
poolId = "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014"
creationHash = None;
```

#### Polygon Example Inputs

```
network = "polygon"
poolId = "0x0d34e5dd4d8f043557145598e4e2dc286b35fd4f000000000000000000000068"
creationHash = "0x18c7e1c9235c6e93878e55a87ed249f9d0ceb9d12ee584794e92f80f7645686d";
```

#### Kovan Example Output

`yarn hardhat verify-contract --id 20210418-weighted-pool --name WeightedPool --address 0x6dF50E37A6aEfB9024a7284EF1C9e1E8e7c4F7b8 --network kovan --key NOTSHARINGMYETHERSCANAPIKEYSORRY --args 000000000000000000000000ba12222222228d8ba445958a75a0704d566bf2c80000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064d79506f6f6c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c333342414c2d3333574554480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000041286bb1d3e870f3f750eb7e1c25d7e48c8a1ac7000000000000000000000000dfcea9088c8a88a76ff74892c1457c17dfeef9c1000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000006f05b59d3b2000000000000000000000000000000000000000000000000000006f05b59d3b20000`

{% hint style="warning" %}
There have been a few isolated cases where the arguments balpy generated did not successfully verify the pool. If you get a failure when sending to Etherscan, try again, or try getting arguments from Tenderly.

**If you've successfully generated the constructor arguments with balpy, you can continue to** [**Step 2**](verification.md#undefined)**; you do not need to do anything on Tenderly.**
{% endhint %}

### Pulling Data From Tenderly

To start off in Tenderly, you'll need the **`poolId` for your pool**. If you don't know where to find a `poolId`, check out [this note about `poolId`s](../pool-interfacing/#poolids). Once you have your `poolId`, you'll need to extract the pool `address`, which is the first 42 characters of the id.&#x20;

Example:

* `0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014` (**id**)
* `0x5c6ee304399dbdb9c8ef030ab642b10820db8f56` (**address**)

Go to the Etherscan (or similar) page for your pool. In this example, it would be:

* [https://etherscan.io/address/0x5c6ee304399dbdb9c8ef030ab642b10820db8f56](https://etherscan.io/address/0x5c6ee304399dbdb9c8ef030ab642b10820db8f56)

Click on the **Internal Txns** tab:

![](<../../.gitbook/assets/Screen Shot 2021-11-18 at 2.35.27 PM.png>)

The first (and likely only) transaction under **Parent Txn Hash** will be the one that deployed the pool. Click on the transaction -- it will take you to the transaction page. Copy the transaction hash from the page:

![](<../../.gitbook/assets/Screen Shot 2021-11-18 at 2.38.28 PM.png>)

Go to [Tenderly's website](https://dashboard.tenderly.co/explorer) and paste your transaction hash in the search box.

![](<../../.gitbook/assets/Screen Shot 2021-11-18 at 2.43.14 PM.png>)

In the **\[CREATE]** row, click on **View in Debugger**

![](<../../.gitbook/assets/Screen Shot 2021-11-18 at 2.44.44 PM (2).png>)

Scroll to the bottom of the \[INPUT] field&#x20;

![](<../../.gitbook/assets/Screen Shot 2021-11-18 at 2.49.42 PM.png>)

Search for the following string:

`0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000ba12222222228d8ba445958a75a0704d566bf2c8`

![](<../../.gitbook/assets/Screen Shot 2021-11-18 at 2.51.16 PM.png>)

Copy from the beginning of that string to the end of the **\[INPUT]**, excluding the trailing `"`.

![](<../../.gitbook/assets/Screen Shot 2021-11-18 at 2.51.48 PM.png>)

Paste that string in a text editor for now -- we're ready to move onto the next step!

Example string:

`0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000ba12222222228d8ba445958a75a0704d566bf2c8000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000ba100000625a3754423978a60c9317c58a424e3d000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000b1a2bc2ec50000000000000000000000000000000000000000000000000000002c68af0bb1400000000000000000000000000000000000000000000000000000005543df729c000000000000000000000000000000000000000000000000000000000000072aefe0000000000000000000000000000000000000000000000000000000000278d000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b000000000000000000000000000000000000000000000000000000000000001742616c616e6365722038302042414c2032302057455448000000000000000000000000000000000000000000000000000000000000000000000000000000000e422d383042414c2d323057455448000000000000000000000000000000000000`

## 2. Sending Data to Etherscan

#### Requirements:

* A local copy of the [Balancer V2 Monorepo](https://github.com/balancer-labs/balancer-v2-monorepo/)
* An RPC (Infura, Alchemy, local RPC, etc.)
* [Etherscan API Key](https://etherscan.io/myapikey) (free Etherscan account required)
* A private key**\***

{% hint style="danger" %}
**\***This private key **should not** hold any tokens; it is used solely as an identifier. Generate a throwaway account. **Never** put a real key in a file - even for a throwaway account - especially if it might get committed to a public repository!
{% endhint %}

In your local copy of the Balancer V2 Monorepo, go to the `pkg/deployments` directory, and open the `hardhat.config.ts` file:

```
cd pkg/deployments
<your_favorite_editor> hardhat.config.ts
```

At the bottom of the file, you'll see:

```
export default {
  mocha: {
    timeout: 40000,
  },
};
```

Edit the file for your given network, RPC **** url, and private key. **DO NOT PUT YOUR KEY IN THE FILE! Use an environment variable instead!**

```
mocha: {
  timeout: 40000,
},
networks: {
  mainnet: {
    url: https://mainnet.infura.io/v3/${process.env.INFURA_KEY},
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
},
```

{% hint style="info" %}
If you generated your command with balpy, you should be ready to execute that now ([Skip to executing](verification.md#executing-command)). If you pulled data from Tenderly, we just need to construct the rest of the command.
{% endhint %}

The rest of the command that we need to fill in is:

```
yarn hardhat verify-contract
  --id <task-id>
  --name <contract-name>
  --address <pool-address>
  --network <network>
  --key <etherscan-api-key>
  --args <abi-encoded-constructor-arguments>  
```

#### `task-id` and `contract-name`

These depend on the type of pool you're verifying.&#x20;

| Task ID (`--id` argument)             | Contract name(s) (`--name` argument) |
| ------------------------------------- | ------------------------------------ |
| 20210418-weighted-pool                | WeightedPool, WeightedPool2Tokens    |
| 20210624-stable-pool                  | StablePool                           |
| 20210721-liquidity-bootstrapping-pool | LiquidityBootstrappingPool           |
| 20210727-meta-stable-pool             | MetaStablePool                       |
| 20210907-investment-pool              | InvestmentPool                       |

#### `pool-address`

This is the **address of the pool** whose contract you are verifying. It is **not** _your_ address.

#### `network`

This is the network on which you are verifying your pool. If you are attempting to verify a pool on Ethereum, use "`mainnet`" as shown in the sample `hardhat.config.ts` file.

#### `etherscan-api-key`

This is your Etherscan API key, obviously.

#### `abi-encoded-constructor-arguments`

This is the long string of bytecode you saved earlier from Tenderly.

#### Putting It All Together...

For the example pool in the Tenderly example, the command would look like:

```
yarn hardhat verify-contract
  --id 20210418-weighted-pool
  --name WeightedPool2Tokens
  --address 0x5c6ee304399dbdb9c8ef030ab642b10820db8f56
  --network mainnet
  --key NOTSHARINGMYETHERSCANAPIKEYSORRY
  --args 00000000000000000000000000000000000000000000000000000000000000
  20000000000000000000000000ba12222222228d8ba445958a75a0704d566bf2c8000
  000000000000000000000000000000000000000000000000000000000018000000000
  000000000000000000000000000000000000000000000000000001c00000000000000
  00000000000ba100000625a3754423978a60c9317c58a424e3d000000000000000000
  000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000
  00000000000000000000000000b1a2bc2ec5000000000000000000000000000000000
  0000000000000000000002c68af0bb140000000000000000000000000000000000000
  0000000000000000005543df729c00000000000000000000000000000000000000000
  0000000000000000000072aefe0000000000000000000000000000000000000000000
  000000000000000278d00000000000000000000000000000000000000000000000000
  0000000000000001000000000000000000000000ba1ba1ba1ba1ba1ba1ba1ba1ba1ba
  1ba1ba1ba1b0000000000000000000000000000000000000000000000000000000000
  00001742616c616e6365722038302042414c203230205745544800000000000000000
  0000000000000000000000000000000000000000000000000000000000000000e422d
  383042414c2d323057455448000000000000000000000000000000000000  
```

### Executing Command

From the top level of `balancer-v2-monorepo`:

```
cd /path/to/balancer-v2-monorepo

# you should only need to do this part once
yarn
yarn build
yarn install

# go back to deployments
cd pkg/deployments 
```

and finally run:

`yarn hardhat verify-contract --id 20210418-weighted-pool --name WeightedPool2Tokens --address 0x5c6ee304399dbdb9c8ef030ab642b10820db8f56 --network mainnet --key NOTSHARINGMYETHERSCANAPIKEYSORRY --args 0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000ba12222222228d8ba445958a75a0704d566bf2c8000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000ba100000625a3754423978a60c9317c58a424e3d000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000b1a2bc2ec50000000000000000000000000000000000000000000000000000002c68af0bb1400000000000000000000000000000000000000000000000000000005543df729c000000000000000000000000000000000000000000000000000000000000072aefe0000000000000000000000000000000000000000000000000000000000278d000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b000000000000000000000000000000000000000000000000000000000000001742616c616e6365722038302042414c2032302057455448000000000000000000000000000000000000000000000000000000000000000000000000000000000e422d383042414c2d323057455448000000000000000000000000000000000000`
