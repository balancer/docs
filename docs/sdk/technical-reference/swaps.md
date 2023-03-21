---
order: 2
---

# Swaps

## Methods

### queryBatchSwap

The Balancer Vault provides a [method to simulate a call to batchSwap](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/interfaces/contracts/vault/IVault.sol#L630-L650).
This function performs no checks on the sender or recipient or token balances or approvals. Note that this function is not 'view' (due to implementation details): the client code must explicitly execute eth_call instead of eth_sendTransaction.

```js
/**
 * @param batchSwap - BatchSwap information used for query.
 * @param batchSwap.kind - either exactIn or exactOut.
 * @param batchSwap.swaps - sequence of swaps.
 * @param batchSwap.assets - array contains the addresses of all assets involved in the swaps.
 * @returns Returns an array with the net Vault asset balance deltas. Positive amounts represent tokens (or ETH) sent to the Vault, and negative amounts represent tokens (or ETH) sent by the Vault. Each delta corresponds to the asset at the same index in the `assets` array.
**/
swaps.queryBatchSwap(batchSwap: {
    kind: SwapType,
    swaps: BatchSwapStep[],
    assets: string[]
}): Promise<BigNumberish[]>
```

### queryBatchSwapWithSor

Uses SOR to create and query a batchSwap for multiple tokens in > multiple tokensOut.

```js
/**
 * @param queryWithSor - Swap information used for querying using SOR.
 * @param queryWithSor.tokensIn - Array of addresses of assets in.
 * @param queryWithSor.tokensOut - Array of addresses of assets out.
 * @param queryWithSor.swapType - Type of Swap, ExactIn/Out.
 * @param queryWithSor.amounts - Array of amounts used in swap.
 * @param queryWithSor.fetchPools - Set whether SOR will fetch updated pool info.
 * @returns Returns amount of tokens swaps along with swap and asset info that can be submitted to a batchSwap call.
**/
swaps.queryBatchSwapWithSor(queryWithSor: {
    tokensIn: string[],
    tokensOut: string[],
    swapType: SwapType,
    amounts: BigNumberish[],
    fetchPools: FetchPoolsInput;
}):
Promise<QueryWithSorOutput {
    returnAmounts: string[];
    swaps: BatchSwapStep[];
    assets: string[];
    deltas: string[];
}>
```

### encodeBatchSwap

Static method to encode a [batch swap](/reference/contracts/apis/vault.md#batchswap).

::: info
This method doesn't execute a batchSwap -- it returns an [ABI byte string](https://docs.soliditylang.org/en/latest/abi-spec.html) containing the data of the function call on a contract, which can then be sent to the network (ex. [sendTransaction](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction)). to be executed.
:::

```js
/**
 * @param {BatchSwap}           batchSwap - BatchSwap information used for query.
 * @param {SwapType}            batchSwap.kind - either exactIn or exactOut
 * @param {BatchSwapSteps[]}    batchSwap.swaps - sequence of swaps
 * @param {string[]}            batchSwap.assets - array contains the addresses of all assets involved in the swaps
 * @param {FundManagement}      batchSwap.funds - object containing information about where funds should be taken/sent
 * @param {number[]}            batchSwap.limits - limits for each token involved in the swap, where either the maximum number of tokens to send (by passing a positive value) or the minimum amount of tokens to receive (by passing a negative value) is specified
 * @param {string}              batchSwap.deadline -  time (in Unix timestamp) after which it will no longer attempt to make a trade
 * @returns {string}            encodedBatchSwapData - Returns an ABI byte string containing the data of the function call on a contract
*/
Swaps.encodeBatchSwap(batchSwap: {
    kind: SwapType,
    swaps: BatchSwapStep[],
    assets: string[],
    funds: FundManagement,
    limits: number[],
    deadline: string
}): string
```

### encodeSimpleFlashSwap

Static method to encode a simple flash swap [method for a batchSwap](/reference/swaps/flash-swaps.md).

::: info
This method doesn't execute any swaps -- it returns an [ABI byte string](https://docs.soliditylang.org/en/latest/abi-spec.html) containing the data of the function call on a contract, which can then be sent to the network (ex. [sendTransaction](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction)). to be executed.
:::

```js
/**
 * @param {SimpleFlashSwapParameters}   params - BatchSwap information used for query.
 * @param {string}                      params.flashLoanAmount - initial input amount for the flash loan (first asset)
 * @param {string[]}                    params.poolIds - array of Balancer pool ids
 * @param {string[]}                    params.assets - array of token addresses
 * @param {string}                      params.walletAddress - array of token addresses
 * @returns {string}            encodedBatchSwapData - Returns an ABI byte string containing the data of the function call on a contract
*/
Swaps.encodeSimpleFlashSwap(simpleFlashSwap: {
    flashLoanAmount: string,
    poolIds: string[],
    assets: string[]
    walletAddress: string[]
}): string
```

### querySimpleFlashSwap

Method to test if a simple flash swap is valid and see potential profits.

```js
/**
 * @param {SimpleFlashSwapParameters}   params - BatchSwap information used for query.
 * @param {string}                      params.flashLoanAmount - initial input amount for the flash loan (first asset)
 * @param {string[]}                    params.poolIds - array of Balancer pool ids
 * @param {string[]}                    params.assets - array of token addresses
 * @returns {Promise<{profits: Record<string, string>, isProfitable: boolean}>}       Returns an ethersjs transaction response
*/
swaps.querySimpleFlashSwap(batchSwap: {
    kind: SwapType,
    swaps: BatchSwapStep[],
    assets: string[]
}): string
```
