---
order: 1
---
# Smart Order Router

The Smart Order Router (SOR) is a library for order routing optimzation across Balancer pools for best price execution. It is a component of the SDK but also exists as a standalone package for integrators who only need swap routing logic. The example code and reference shown in the docs will use the SDK, but it should be straightforward to infer the changes required for the standalone SOR package.

[![npm version](https://img.shields.io/npm/v/@balancer-labs/sor/latest.svg)](https://www.npmjs.com/package/@balancer-labs/sor/v/latest)

::: details Preconfig
The below docs assume the SDK is installed and initialized. See [Intro](../overview/README.md) for instructions
:::

## SOR Basics

TODO: explain the general flow of a SOR request, including pool data fetching, route proposal, route optimization, return data format, and what's required to convert that to a tx. And details around the decision points a developer needs to make for things like `useBpts`, if the relayer is required, etc.

```typescript

```