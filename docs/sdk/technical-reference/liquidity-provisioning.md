---
order: 3
---

# Liquidity Provisioning

## Join Pool

Exposes Join functionality allowing user to join pools.

```js
const balancer = new BalancerSDK(sdkConfig);
const pool = await balancer.pools.find(poolId);
const { to, functionName, attributes, data } = pool.buildJoin(params);
```

### buildJoin

Builds a join transaction.

```js
/**
 * @param { string }   joiner - Address used to exit pool.
 * @param { string[] } tokensIn - Token addresses provided for joining pool (same length and order as amountsIn).
 * @param { string[] } amountsIn - Token amounts provided for joining pool in EVM amounts.
 * @param { string }   slippage - Maximum slippage tolerance in bps i.e. 50 = 0.5%.
 * @returns { Promise<JoinPoolAttributes> } Returns join transaction ready to send with signer.sendTransaction.
*/
buildJoin: (
  joiner: string,
  tokensIn: string[],
  amountsIn: string[],
  slippage: string
) => Promise<JoinPoolAttributes>;
```

## Exit Pool

Exposes Exit functionality allowing user to exit pools.

```js
const balancer = new BalancerSDK(sdkConfig);
const pool = await balancer.pools.find(poolId);
const { to, functionName, attributes, data } = pool.buildExitExactBPTIn(params);
```

### buildExitExactBPTIn

Builds an exit transaction with exact BPT in and minimum token amounts out based on slippage tolerance.

```js
  /**
   * @param {string}  exiter - Account address exiting pool
   * @param {string}  bptIn - BPT provided for exiting pool
   * @param {string}  slippage - Maximum slippage tolerance in percentage. i.e. 0.05 = 5%
   * @param {string}  singleTokenMaxOut - Optional: token address that if provided will exit to given token
   * @returns         transaction request ready to send with signer.sendTransaction
   */
  buildExitExactBPTIn: (
    exiter: string,
    bptIn: string,
    slippage: string,
    singleTokenMaxOut?: string
  ) => Promise<ExitPoolAttributes>;
```

### buildExitExactTokensOut

Builds an exit transaction with exact tokens out and maximum BPT in based on slippage tolerance.

```js
  /**
   * @param {string}    exiter - Account address exiting pool
   * @param {string[]}  tokensOut - Tokens provided for exiting pool
   * @param {string[]}  amountsOut - Amounts provided for exiting pool
   * @param {string}    slippage - Maximum slippage tolerance in percentage. i.e. 0.05 = 5%
   * @returns           transaction request ready to send with signer.sendTransaction
   */
  buildExitExactTokensOut: (
    exiter: string,
    tokensOut: string[],
    amountsOut: string[],
    slippage: string
  ) => Promise<ExitPoolAttributes>;
```

