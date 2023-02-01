# Entities

## Entities

- [`VotingEscrow`](#votingescrow)
- [`VotingEscroLock`](#votingescrowlock)
- [`GaugeFactory`](#gaugefactory)
- [`LiquidityGauge`](#liquiditygauge)
- [`RootGauge`](#rootgauge)
- [`Gauge`](#gauge)
- [`Pool`](#pool)
- [`RewardToken`](#rewardtoken)
- [`GaugeShare`](#gaugeshare)
- [`GaugeType`](#gaugetype)
- [`GaugeVote`](#gaugevote)
- [`User`](#user)

## VotingEscrow

Description: Details of voting escrow

| Field        | Type                                    | Description                         |
| ------------ | --------------------------------------- | ----------------------------------- |
| id           | ID!                                     | VotingEscrow contract address       |
| stakedSupply | BigDecimal!                             | Amount of B-80BAL-20WETH BPT locked |
| locks        | [`VotingEscroLock!`](#votingescrowlock) | List of veBAL locks created         |

## VotingEscrowLock

Description: Details of voting escrow lock

| Field          | Type          | Description                                                             |
| -------------- | ------------- | ----------------------------------------------------------------------- |
| id             | ID!           | Equal to: `<userAdress>-<votingEscrow>`                                 |
| user           | User!         | Reference to User entity                                                |
| unlockTime     | BigInt        | Timestamp at which B-80BAL-20WETH BPT can be unlocked by user [seconds] |
| lockedBalance  | BigDecimal!   | Amount of B-80BAL-20WETH BPT the user has locked                        |
| votingEscrowID | VotingEscrow! | Reference to VotingEscrow entity                                        |
| updatedAt      | Int!          |                                                                         |

## GaugeFactory

Description: Details of gauge factory

| Field     | Type                                 | Description                                  |
| --------- | ------------------------------------ | -------------------------------------------- |
| id        | ID!                                  | Factory contract address                     |
| numGauges | Int!                                 | Number of gauges created through the factory |
| gauges    | [`LiquidityGauge!`](#liquiditygauge) | List of gauges created through the factory   |

## LiquidityGauge

Description: Details of the liquidity gauge

| Field               | Type                           | Description                                                                                     |
| ------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| id                  | ID!                            | LiquidityGauge contract address                                                                 |
| symbol              | String!                        | ERC20 token symbol                                                                              |
| gauge               | Gauge                          | Reference to Gauge entity - created when LiquidityGauge is added to GaugeController             |
| pool                | Pool                           | Reference to Pool entity                                                                        |
| poolAddress         | Bytes!                         | Address of the pool (lp_token of the gauge)                                                     |
| poolId              | Bytes                          | Pool ID if lp_token is a Balancer pool; null otherwise                                          |
| isKilled            | Boolean!                       | Whether Balancer DAO killed the gauge                                                           |
| isPreferentialGauge | Boolean!                       | Whether the LiquidityGauge is the most recent added to GaugeController                          |
| relativeWeightCap   | BigDecimal                     | Relative weight cap of the gauge (0.01 = 1%) - V2 factories only                                |
| streamer            | Bytes                          | Address of the contract that streams reward tokens to the gauge - ChildChainLiquidityGauge only |
| factory             | GaugeFactory!                  | Factory contract address                                                                        |
| totalSupply         | BigDecimal!                    | Total of BPTs users have staked in the LiquidityGauge                                           |
| shares              | [`GaugeShare!`](#gaugeshare)   | List of user shares                                                                             |
| tokens              | [`RewardToken!`](#rewardtoken) | List of reward tokens depositted in the gauge                                                   |

## RootGauge

Description: Details of the liquidity gauge

| Field             | Type          | Description                                                                         |
| ----------------- | ------------- | ----------------------------------------------------------------------------------- |
| id                | ID!           | RootGauge contract address                                                          |
| chain             | Chain!        | Chain where emissions by this gauge will be bridged to                              |
| recipient         | Bytes!        | Address where emissions by this gauge will be bridged to                            |
| gauge             | Gauge         | Reference to Gauge entity - created when LiquidityGauge is added to GaugeController |
| isKilled          | Boolean!      | Whether Balancer DAO killed the gauge                                               |
| relativeWeightCap | BigDecimal    | Relative weight cap of the gauge (0.01 = 1%) - V2 factories only                    |
| factory           | GaugeFactory! | Factory contract address                                                            |

## Gauge

Description: Details of the gauge

| Field          | Type           | Description                                                                  |
| -------------- | -------------- | ---------------------------------------------------------------------------- |
| id             | ID!            | Equal to `<gaugeAddress>-<typeID>`                                           |
| address        | Bytes!         | Address of the gauge                                                         |
| type           | GaugeType!     | Type of the gauge                                                            |
| addedTimestamp | Int!           | Timestamp at which Balancer DAO added the gauge to GaugeController [seconds] |
| liquidityGauge | LiquidityGauge | Reference to LiquidityGauge                                                  |
| rootGauge      | RootGauge      | Reference to RootGauge                                                       |

## Pool

Description: Details of the pool

| Field             | Type                                 | Description                                            |
| ----------------- | ------------------------------------ | ------------------------------------------------------ |
| id                | ID!                                  | Address of the pool (lp_token of the gauge)            |
| poolId            | Bytes                                | Pool ID if lp_token is a Balancer pool; null otherwise |
| address           | Bytes!                               | Address of the pool (lp_token of the gauge)            |
| preferentialGauge | LiquidityGauge                       | Most recent, unkilled gauge in the GaugeController     |
| gaugesList        | [Bytes!]!                            | List of the pool's gauges addresses                    |
| gauges            | [`LiquidityGauge!`](#liquiditygauge) | List of gauges created for the pool                    |

## RewardToken

Description: Details of the reward token

| Field          | Type            | Description                                                    |
| -------------- | --------------- | -------------------------------------------------------------- |
| id             | ID!             | Equal to `<tokenAddress>-<gaugeAddress>`                       |
| symbol         | String!         | ERC20 token symbol - empty string if call to symbol() reverts  |
| decimals       | Int!            | ERC20 token decimals - zero if call to decimals() reverts      |
| gauge          | LiquidityGauge! | Reference to LiquidityGauge entity                             |
| rate           | BigDecimal      | Rate of reward tokens streamed per second                      |
| periodFinish   | BigInt          | Timestamp at which finishes the period of rewards              |
| totalDeposited | BigDecimal!     | Amount of reward tokens that has been deposited into the gauge |

## GaugeShare

Description: Details of the gauge share

| Field   | Type            | Description                             |
| ------- | --------------- | --------------------------------------- |
| id      | ID!             | Equal to `<userAddress>-<gaugeAddress>` |
| user    | User!           | Reference to User entity                |
| gauge   | LiquidityGauge! | Reference to LiquidityGauge entity      |
| balance | BigDecimal!     | User's balance of gauge deposit tokens  |

## GaugeType

Description: Details of the gauge type

| Field | Type    | Description                                       |
| ----- | ------- | ------------------------------------------------- |
| id    | ID!     | Type Id                                           |
| name  | String! | Name of the type - empty string if call reverts } |

## GaugeVote

Description: Details of the gauge vote

| Field     | Type       | Description                                 |
| --------- | ---------- | ------------------------------------------- |
| id        | ID!        | Equal to `<userAddress>-<gaugeAddress>`     |
| user      | User!      | Reference to User entity                    |
| gauge     | Gauge!     | Reference to Gauge entity                   |
| weight    | BigDecimal | Weight of veBAL power user has used to vote |
| timestamp | BigInt     | Timestamp at which user voted [seconds]     |

## User

Description: Details of the user

| Field       | Type                                    | Description                       |
| ----------- | --------------------------------------- | --------------------------------- |
| id          | ID!                                     | User address                      |
| gaugeVotes  | [`GaugeVote!`](#gaugevote)              | List of votes on gauges           |
| gaugeShares | [`GaugeShare!`](#gaugeshare)            | List of gauge the user has shares |
| votingLocks | [`VotingEscroLock!`](#votingescrowlock) | List of locks the user created    |

}
