---
title: Intro
heroImage: /images/backgrounds/purple.png
---

# Balancer SDK

The Balancer SDK is a Typescript/Javascript library for interfacing with the Balancer protocol. This includes common contract interactions, calculations, the Smart Order Router, and more.

[![npm version](https://img.shields.io/npm/v/@balancer-labs/sdk/latest.svg)](https://www.npmjs.com/package/@balancer-labs/sdk/v/latest)


## Setup

Install the package with

::: code-tabs#shell

@tab yarn

```bash
yarn install @balancer-labs/sdk
```

@tab npm

```bash
npm install @balancer-labs/sdk
```
:::

The SDK uses the below environment variables as part of the configuration. Set these in an `.env` file or your preferred way of loading `ENV` variables

```bash
# .env
INFURA=
```

Initialize the SDK in your code using

```typescript
import { BalancerSDK, BalancerSdkConfig, Network } from '@balancer-labs/sdk';

const config: BalancerSdkConfig = {
  network: Network.MAINNET,
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA}`,
};
const balancer = new BalancerSDK(config);
```