# Using the API

Here are some docs on common use cases for the API, with links 

## API Gateway Endpoints

The `{chainId}` in each endpoint is the chain/network number you wish to request from. 1 for Mainnet, 137 for Polygon, 42161 for Arbitrum etc.

- `/graphql` - GraphQL endpoint for retrieving pools with filters / queries. Forwards requests to Appsync. See 'GraphQL Requests' section for more info.
- `/pools/{chainId}/update` - Runs the worker lambda that fetches the latest pool information from the graph and saves it in the database.
- `/pools/{chainId}` - Returns a JSON array of all Balancer pools of that chain
- `/pools/{chainId}/{id}` - Returns JSON information about a pool of a specific `id`.
- `/sor/{chainId}` - Run a SOR (Smart Order Router) query against the balancer pools and returns [SerializedSwapInfo](https://github.com/balancer/balancer-api/blob/master/src/modules/sor/types.ts).
- `/order/{chainId}` - Run a SOR (Smart Order Router) query against the balancer pools and returns a [SorOrderResponse](https://github.com/balancer/balancer-api/blob/master/src/modules/sor/types.ts).
- `/tokens/{chainId}` - Returns a JSON array of all known tokens of that chain
- `/tokens/update/` - Runs the worker lambda that for every known token, fetches the latest price (in the chains native asset) from coingecko and saves it in the database.

- `/check-wallet` - Used to perform sanctions checks with TRM.
- `/tenderly/contracts/encode-states` - Encodes state information with Tenderly
- `/tenderly/simulate` - Simulate a transaction with Tenderly

### Smart Order Router Queries

The [Smart Order Router](https://github.com/balancer-labs/balancer-sor) is a package created by Balancer that, for any given
input and output token, finds you the best trade path across all Balancer pools. It is used by the Balancer frontend to calculate
trades.

You can POST the following JSON content to the endpoints `/sor` or `/order` to return smart order router information.

```js
{
    sellToken: string<Address>, # The address of the token you wish to sell
    buyToken: string<Address>, # The address of the token you wish to buy
    orderKind: string<buy|sell>, # Either 'buy' or 'sell', described further below
    amount: int, # The amount in sellToken or buyToken that you wish to sell/buy
    gasPrice: int, # The current gas price in wei, this is used to ensure your trade is most efficient considering the gas cost of performing multiple swaps.

    # The following are for /order only
    sender: string<Address>, # The address of the wallet sending sellToken.
    receiver: string<Address>, # The address of the wallet which should receive buyToken.
    slippagePercentage: float (default 0.01), # The total slippage to allow in this order. 0.01 = 1%.
}
```

Order Kind - Set to 'buy' to buy the exact amount of your `buyToken` and sell as little as possible to get that. Set to 'sell' to sell the exact amount of your `sellToken` and buy as much as you can with that.

#### Return Values

##### /sor Endpoint

The `/sor` endpoint returns json according to this interface:

```js
export interface SerializedSwapInfo {
  tokenAddresses: string[];
  swaps: SwapV2[];
  swapAmount: string;
  swapAmountForSwaps?: string;
  returnAmount: string;
  returnAmountFromSwaps?: string;
  returnAmountConsideringFees: string;
  tokenIn: string;
  tokenOut: string;
  marketSp: string;
}
```

which contains all the swaps and order information, but you must assemble the transaction to make this swap yourself.

##### /order Endpoint

The `/order` endpoint returns json like this:
```js
export interface SorOrderResponse {
  // Price information from SOR
  price: PriceResponse;
  // The address the transaction should be sent to
  to: Address; 
  // Transaction data
  data: string;
  // value to send with transaction
  value: BigNumberish;
}
```
which contains transaction data that you can immediately post to chain.

Sometimes the returned order needs to be sent to the Balancer Batch Relayer (the `to` address will be the batch relayer). When this happens you must first approve the relayer with the Balancer vault so that it can make swaps on your behalf. You can do this by calling `setRelayerApproval(walletAddress, relayerAddress, true)` on the Balancer vault, see an example in the [E2E Test Helpers](./tests/lib/helpers.ts) file.

### Smart Order Router Examples

#### Swap BAL for DAI

```sh
curl -X POST -H "Content-Type: application/json" -d '{"sellToken":"0xba100000625a3754423978a60c9317c58a424e3d","buyToken":"0x6b175474e89094c44da98b954eedeac495271d0f","orderKind":"sell", "amount":"1000000000000000000", "gasPrice":"10000000"}' $ENDPOINT_URL/sor/1
```

#### Swap USDC for DAI

```sh
curl -X POST -H "Content-Type: application/json" -d '{"sellToken":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","buyToken":"0x6b175474e89094c44da98b954eedeac495271d0f","orderKind":"sell", "amount":"100000", "gasPrice":"10000000"}' $ENDPOINT_URL/sor/1
```

#### Swap WETH for an exact amount of BAL

```sh
curl -X POST -H "Content-Type: application/json" -d '{"sellToken":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","buyToken":"0xba100000625a3754423978a60c9317c58a424e3d","orderKind":"buy", "amount":"1000000000000000000", "gasPrice":"10000000"}' $ENDPOINT_URL/sor/1
```

#### Swap BAL for DAI on the Polygon network

```sh
curl -X POST -H "Content-Type: application/json" -d '{"sellToken":"0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3","buyToken":"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174","orderKind":"sell", "amount":"1000000000000000000", "gasPrice":"10000000"}' $ENDPOINT_URL/sor/137
```

#### Swap WETH for BAL on the Arbitrum network

```sh
curl -X POST -H "Content-Type: application/json" -d '{"sellToken":"0x82af49447d8a07e3bd95bd0d56f35241523fbab1","buyToken":"0x040d1EdC9569d4Bab2D15287Dc5A4F10F56a56B8","orderKind":"sell", "amount":"1000000000000000000", "gasPrice":"10000000"}' $ENDPOINT_URL/sor/42161
```

#### Swap WXDAI for USDC on the Gnosis Chain network

```sh
curl -X POST -H "Content-Type: application/json" -d '{"sellToken":"0xe91d153e0b41518a2ce8dd3d7944fa863463a97d","buyToken":"0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83","orderKind":"sell", "amount":"1000000000000000000", "gasPrice":"100000"}' $ENDPOINT_URL/sor/100
```

## GraphQL Requests

You can check out https://github.com/balancer/balancer-api/blob/master/scripts/graphql-query.ts  to see example requests fetching pools from the API.

