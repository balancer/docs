# Setting up the API

Here are notes on how to setup the API in a dev environment and deploy it to AWS.

## Requirements

- NodeJS 14.X (others may work, not tested yet)
- An Infura Account (for retrieving pool information, this is free to create)
- Docker + Docker Compose (for local development)
- An AWS Account (for AWS development)

## Usage

This package can be run locally for development, or deployed to an AWS account. AppSync cannot be used locally.

### Initial Setup

```bash
npm install
npm run build
cp .env.example .env
```

Open the `.env` file and set `INFURA_PROJECT_ID` to your personal [Infura](https://infura.io/) project ID.

### Local Development

This runs a local DynamoDB in a docker container, a worker process that polls for new information, and an express server to handle requests.

```sh
# Run a local DynamoDB Database
npm run dynamodb

# Create Tables
npm run init

# NOTE: If the init command hangs, you may need to fix permissions on your dynamodb data folder. You can do this with:
sudo chown -R $(whoami):docker ./docker

# Run Worker
npm run worker

# In another terminal, Run API Server
npm start
```

The API server runs on port 8090, you can run queries against the endpoint `http://localhost:8090/`

### AWS Development

Install AWS SDK

```sh
npm install -g aws-cdk
```

You may also need to install the [AWS CLI](https://aws.amazon.com/cli/) and [configure your credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) if you have not already done so.

#### (Optional) Creating a scoped-down deployer user

If you wish to create an AWS user with the bare minimum permissions required to deploy this stack, see the [deployer permissions json file](https://github.com/balancer/balancer-api/blob/master/src/config/deployer-permissions.json). Copy this into a new policy, then create a new user and attach that policy to them, and use their credentials for deploying.

#### Bootstrapping + Deploying CDK

If you've never used CDK before in your account you need to run the following bootstrap command with your account id and region.

```sh
cdk bootstrap aws://$AWS_ACCOUNT_ID/$AWS_REGION
```

Deploy / Redeploy all AWS Services to your account.

```sh
npm run build # Compile the CDK index.ts to javascript, must be run after changes are made
npm run deploy # Run CDK to create/update your infrastructure
```

After the deployment you will get an API URL that looks similar to `https://gtrabwaex9.execute-api.ap-southeast-2.amazonaws.com/prod/` this is
your API Gateway URL, all endpoints below should be appended to this. Run `export ENDPOINT_URL=<your API url>` to be able to copy and paste the example queries below.

## Tests

### Unit Tests

```
npm run test
```

### E2E Tests

These E2E tests perform SOR requests to the /sor and /order endpoints, then run that swap on-chain using a Hardhat forked environment. They require you to have the
API running somewhere, and a Hardhat network running.

Before Starting set the following variables in your .env file:

- `RPC_URL` - URL to your ETH node or Infura/Alchemy/etc. Will use infura with `INFURA_PROJECT_ID` if set.
- `ENDPOINT_URL` - URL of your API instance - Defaults to `https://api.balancer.fi/`

Then run the following:

```
# This starts the forked hardhat
npm run node

# In another terminal
npm run test:e2e
```

## Infrastructure Overview

Note: Everything inside the AWS container is setup by the CDK scripts in this repository. You'll need to manually configure any external services, such as Alchemy event triggers.

![](/images/pools-api-diagram.png)

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

### Update Pools Lambda

The update lambda is not called automatically, you must call it to initially populate the database. We recommend connecting a webhook to
this endpoint that runs with every new Ethereum block, or whenever a transaction is made to the [Balancer Vault Contract](https://etherscan.io/address/0xba12222222228d8ba445958a75a0704d566bf2c8).

Only one instance of this lambda can run at a time per network. If you attempt to run it twice the second call will return a 500 Internal Server Error.

Update for Ethereum Mainnet

```sh
curl -X POST $ENDPOINT_URL/pools/1/update
```

Update pools for Polygon PoS

```sh
curl -X POST $ENDPOINT_URL/pools/137/update
```

On success this will return a 201 code and no other data.

### Decorate Pools Lambda

This lambda runs on a timer controlled by the environment variable `DECORATE_POOLS_INTERVAL_IN_MINUTES`, defaulting to 5 minutes.
It loads all the latest token and pool data and calculates the following for each pool:

- Total Liquidity
- APR information
- Volume in last 24hrs
- Fees in last 24hrs

It then saves this information back out to the database. This is so that pools can be fetched in one call to the GraphQL API and contain
all necessary data to display them in the Balancer App.

### Get Pools Lambda

Retrieve JSON array of all pools

```sh
curl $ENDPOINT_URL/pools/1
```

### Get Single Pool Lambda

Retrieve JSON object describing a single pool

```sh
curl $ENDPOINT_URL/pools/1/0x5aa90c7362ea46b3cbfbd7f01ea5ca69c98fef1c000200000000000000000020
```

### Update Token Prices Lambda

The lambda is automatically called every 30 seconds.

Example token prices update

```sh
curl -X POST $ENDPOINT_URL/tokens/update/
```

On success this will return a 201 code and no other data.

## Options

### Environment Variables

You can customize your deployment with env variables. See .env.example for all possible variables. They are described below:

#### General Settings

- DEBUG - Used by the [npm debug package](https://www.npmjs.com/package/debug) Can be used for showing debug information.
- PORT - default: 8090 - Port to run the local server on
- INFURA_PROJECT_ID - Your infura project ID. Used for loading data across all networks.
- NETWORKS - default: 1,137,42161 - A comma separated list of networks ID's or names to run the API on.

#### Testing Related

- RPC_URL - Used for E2E tests. This can be a local node or an Infura/Alchemy like service.
- ENDPOINT_URL - Used for E2E tests. Specifies the Balancer API URL you'll be running the tests against.
- HARDHAT_URL - Used for E2E tests. Defaults to 127.0.0.1.

#### Capacity Related

- UPDATE_POOLS_INTERVAL_IN_MINUTES - default: 5 - How frequently to run the update pools lambda.
- DECORATE_POOLS_INTERVAL_IN_MINUTES - default: 5 - How frequently to run the decorate pools lambda.
- DYNAMODB_POOLS_READ_CAPACITY - default: 25 - The read capacity of the `pools` DynamoDB table.
- DYNAMODB_POOLS_WRITE_CAPACITY - default: 25 - The write capacity of the `pools` DynamoDB table.
- DYNAMODB_POOLS_IDX_READ_CAPACITY - default: 10 - The read capacity of the secondary indexes on the `pools` DynamoDB table.
- DYNAMODB_POOLS_WRITE_CAPACITY - default: 10 - The write capacity of the secondary indexes on the `pools` DynamoDB table.
- DYNAMODB_TOKENS_READ_CAPACITY - default: 10 - The read capacity of the `tokens` DynamoDB table.
- DYNAMODB_TOKENS_WRITE_CAPACITY - default: 10 - The write capacity of the `tokens` DynamoDB table.
- DYNAMODB_AUTOSCALE_MAX_MULTIPLIER - default: 1 - Increasing this causes your tables to autoscale their capacity up to CAPACITY \* MULTIPLIER

#### Additional Settings - Rarely used

- DOMAIN_NAME - The domain that API Gateway will run on. If specified a random AWS domain will be created.
- SANCTIONS_API_KEY - TRM API key for running sanction checks.
- TENDERLY_USER - Your Tenderly user id, used by the `/tenderly` endpoints.
- TENDERLY_PROJECT - Your Tenderly project id, used by the `/tenderly` endpoints.
- TENDERLY_ACCESS_KEY - Your tenderly access key, used by the `/tenderly` endpoints.
- SENTRY_DSN - Your Sentry account DSN, if you'd like to send errors to Sentry

## Common Issues

- AWS error `Specified ReservedConcurrentExecutions for function decreases account's UnreservedConcurrentExecution below its minimum value of [10]`
  - By default, this package creates 13 lambdas while new AWS accounts are limited to 10. You can fix this by changing the `NETWORKS` environment variable to just `1` to only deploy lambdas for Mainnet instead of all networks.

## Tips

If you encounter any unexpected issues during deployment, please ensure that:

- you are using NodeJS version 14.X
- the AWS region you are trying to deploy is exactly the same one that was used during the bootstrapping process.
