# Introduction - Balancer Pools API

**Alpha Release, use with caution, there may be breaking changes**

A service that acts as a caching layer for Balancer Pools information. This service runs using AWS Lambda, DynamoDB, API Gateway and AppSync.
This was built to speed up frontend queries, and for services such as Gnosis to use to route orders through Balancer pools.

This package consists of CDK scripts that setup all the required infrastructure, and code for all the lambdas and services involved.

It has the following components:

- A DynamoDB database that hold Balancer pool information with tokens and current balances.
- A Lambda that fetches the latest data from the graph / infura and updates the database.
- An API Gateway server and set of lambdas that handle user requests.
- An AppSync GraphQL endpoint for loading decorated pools.
  ![](/images/pools-api-diagram.png)

## Disclaimers

This software is in Alpha and may have breaking changes at any time. There is little security implemented on the Lambda
functions or GraphQL interface so anyone can call them.

# Sections

#### [Development and installation of the API](./setup.md)

#### [Using the API](./usage.md)

# Code

The Source Code for the API can be found [on Github](https://github.com/balancer/balancer-api)
