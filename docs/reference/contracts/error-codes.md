---
order: 10
---

# Error Codes

All error codes for the Balancer V2 core contracts are defined in the [`BalancerErrors.sol`](https://github.com/balancer/balancer-v2-monorepo/blob/master/pkg/interfaces/contracts/solidity-utils/helpers/BalancerErrors.sol) contract. Comments and context for the specific errors can be found in the tables below.

## Math

| Code | Error                 | Comment                                                         |
| ---- | --------------------- | --------------------------------------------------------------- |
| 000  | ADD_OVERFLOW          |                                                                 |
| 001  | SUB_OVERFLOW          |                                                                 |
| 002  | SUB_UNDERFLOW         |                                                                 |
| 003  | MUL_OVERFLOW          |                                                                 |
| 004  | ZERO_DIVISION         |                                                                 |
| 005  | DIV_INTERNAL          | Multiplication overflow during FixedPoint Division              |
| 006  | X_OUT_OF_BOUNDS       | Invalid x in ExpMath.pow(x, y)                                  |
| 007  | Y_OUT_OF_BOUNDS       | Invalid y in ExpMath.pow(x, y)                                  |
| 008  | PRODUCT_OUT_OF_BOUNDS | In LogExpMath.pow(x, y), error computing x^y as exp(y \* ln(x)) |
| 009  | INVALID_EXPONENT      | In LogExpMath.exp(x) = e^x; x out of bounds                     |

## Input

| Code | Error                 | Comment                                                                  |
| ---- | --------------------- | ------------------------------------------------------------------------ |
| 100  | OUT_OF_BOUNDS         |                                                                          |
| 101  | UNSORTED_ARRAY        | See UNSORTED_TOKENS                                                      |
| 102  | UNSORTED_TOKENS       | Tokens must be sorted in address order on pool registration              |
| 103  | INPUT_LENGTH_MISMATCH | Used to ensure array inputs intended to be parallel have the same length |
| 104  | ZERO_TOKEN            | Address to be interpreted as a token cannot be 0                         |
| 105  | INSUFFICIENT_DATA     | Used to ensure minimum bytes length                                      |

## Shared pools

| Code | Error                   | Comment                                                                                                                                                             |
| ---- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | MIN_TOKENS              | All pools must contain at least two tokens                                                                                                                          |
| 201  | MAX_TOKENS              | Token count exceeds the maximum for a given pool type                                                                                                               |
| 202  | MAX_SWAP_FEE_PERCENTAGE |                                                                                                                                                                     |
| 203  | MIN_SWAP_FEE_PERCENTAGE |                                                                                                                                                                     |
| 204  | MINIMUM_BPT             | On pool initialization, a small amount of BPT is minted to the zero address (keeps math well behaved). If initial balances are too small, initialization can fail   |
| 205  | CALLER_NOT_VAULT        | Certain pool callbacks need to be external, but could be exploited if called by anyone but the Vault                                                                |
| 206  | UNINITIALIZED           | Pools must be initialized with a special "Init" join, before they can be joined by LPs                                                                              |
| 207  | BPT_IN_MAX_AMOUNT       | Slippage/front-running protection check failed on a pool exit                                                                                                       |
| 208  | BPT_OUT_MIN_AMOUNT      | Slippage/front-running protection check failed on a pool join                                                                                                       |
| 209  | EXPIRED_PERMIT          |                                                                                                                                                                     |
| 210  | NOT_TWO_TOKENS          | Pools with oracles are limited to two tokens (e.g., WeightedPool2Tokens and MetastablePools). A pool with the TWO_TOKEN specialization must have exactly two tokens |
| 211  | DISABLED                | Pool factories can be disabled to prevent new pools being created                                                                                                   |

## Pools

| Code | Error                                       | Comment                                                                                                            |
| ---- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 300  | MIN_AMP                                     | Amplification factor out of range (Stable/Metastable pools)                                                        |
| 301  | MAX_AMP                                     |                                                                                                                    |
| 302  | MIN_WEIGHT                                  | Weighted Pool minimum weight                                                                                       |
| 303  | MAX_STABLE_TOKENS                           |                                                                                                                    |
| 304  | MAX_IN_RATIO                                | Token in unbalanced the pool too much on a swap                                                                    |
| 305  | MAX_OUT_RATIO                               | Token out unbalanced the pool too much on a swap                                                                   |
| 306  | MIN_BPT_IN_FOR_TOKEN_OUT                    | Disproportionate exit unbalanced the pool too much                                                                 |
| 307  | MAX_OUT_BPT_FOR_TOKEN_IN                    | Disproportionate join unbalanced the pool too much                                                                 |
| 308  | NORMALIZED_WEIGHT_INVARIANT                 | Weighted Pool normalized weights must add to 1.0                                                                   |
| 309  | INVALID_TOKEN                               |                                                                                                                    |
| 310  | UNHANDLED_JOIN_KIND                         | Some joins are pool type-specific                                                                                  |
| 311  | ZERO_INVARIANT                              | Pool balances must be > 0                                                                                          |
| 312  | ORACLE_INVALID_SECONDS_QUERY                | The "ago" timestamp when querying the oracle must be in the past                                                   |
| 313  | ORACLE_NOT_INITIALIZED                      | Cannot query an oracle with no data                                                                                |
| 314  | ORACLE_QUERY_TOO_OLD                        | Cannot query before the oracle's earliest data sample                                                              |
| 315  | ORACLE_INVALID_INDEX                        | Cannot query a sample outside the buffer (1024)                                                                    |
| 316  | ORACLE_BAD_SECS                             | Oracle query window must have non-zero duration                                                                    |
| 317  | AMP_END_TIME_TOO_CLOSE                      | Amplification parameter change has less than the minimum duration                                                  |
| 318  | AMP_ONGOING_UPDATE                          | Cannot start an amplification parameter update if one is already ongoing                                           |
| 319  | AMP_RATE_TOO_HIGH                           | The requested amplification parameter change is too fast (cannot halve or double over less than a day)             |
| 320  | AMP_NO_ONGOING_UPDATE                       | Cannot cancel an update if there isn't one                                                                         |
| 321  | STABLE_INVARIANT_DIDNT_CONVERGE             |                                                                                                                    |
| 322  | STABLE_GET_BALANCE_DIDNT_CONVERGE           |                                                                                                                    |
| 323  | RELAYER_NOT_CONTRACT                        |                                                                                                                    |
| 324  | BASE_POOL_RELAYER_NOT_CALLED                |                                                                                                                    |
| 325  | REBALANCING_RELAYER_REENTERED               |                                                                                                                    |
| 326  | GRADUAL_UPDATE_TIME_TRAVEL                  | start > end time in a gradual weights update                                                                       |
| 327  | SWAPS_DISABLED                              |                                                                                                                    |
| 328  | CALLER_IS_NOT_LBP_OWNER                     |                                                                                                                    |
| 329  | PRICE_RATE_OVERFLOW                         | Rate returned from a rateProvider must fit in 128 bits                                                             |
| 330  | INVALID_JOIN_EXIT_KIND_WHILE_SWAPS_DISABLED | Investment pools only allow proportional joins and exits when swaps are disabled (to prevent unbalancing the pool) |
| 331  | WEIGHT_CHANGE_TOO_FAST                      | Gradual weight update duration too short (minimum 1 day)                                                           |
| 332  | LOWER_GREATER_THAN_UPPER_TARGET             | Invalid Linear Pool operating range                                                                                |
| 333  | UPPER_TARGET_TOO_HIGH                       | Linear Pool max balance must fit in 112 bits                                                                       |
| 334  | UNHANDLED_BY_LINEAR_POOL                    | Some joins/exits are pool type-specific                                                                            |
| 335  | OUT_OF_TARGET_RANGE                         | Cannot reset Linear Pool targets if pool is unbalanced                                                             |
| 336  | UNHANDLED_EXIT_KIND                         | Some exits are pool type-specific                                                                                  |
| 337  | UNAUTHORIZED_EXIT                           | Management fees can only be collected by the pool owner                                                            |
| 338  | MAX_MANAGEMENT_SWAP_FEE_PERCENTAGE          |                                                                                                                    |
| 339  | UNHANDLED_BY_MANAGED_POOL                   | Some joins/exits are pool type-specific                                                                            |
| 340  | UNHANDLED_BY_PHANTOM_POOL                   | Some joins/exits are pool type-specific                                                                            |
| 341  | TOKEN_DOES_NOT_HAVE_RATE_PROVIDER           |                                                                                                                    |
| 342  | INVALID_INITIALIZATION                      |                                                                                                                    |
| 343  | OUT_OF_NEW_TARGET_RANGE                     |                                                                                                                    |
| 344  | FEATURE_DISABLED                            |                                                                                                                    |
| 345  | UNINITIALIZED_POOL_CONTROLLER               |                                                                                                                    |
| 346  | SET_SWAP_FEE_DURING_FEE_CHANGE              |                                                                                                                    |
| 347  | SET_SWAP_FEE_PENDING_FEE_CHANGE             |                                                                                                                    |
| 348  | CHANGE_TOKENS_DURING_WEIGHT_CHANGE          |                                                                                                                    |
| 349  | CHANGE_TOKENS_PENDING_WEIGHT_CHANGE         |                                                                                                                    |
| 350  | MAX_WEIGHT                                  |                                                                                                                    |
| 351  | UNAUTHORIZED_JOIN                           |                                                                                                                    |
| 352  | MAX_MANAGEMENT_AUM_FEE_PERCENTAGE           |                                                                                                                    |
| 353  | FRACTIONAL_TARGET                           |                                                                                                                    |
| 354  | ADD_OR_REMOVE_BPT                           |                                                                                                                    |
| 355  | INVALID_CIRCUIT_BREAKER_BOUNDS              |                                                                                                                    |
| 356  | CIRCUIT_BREAKER_TRIPPED                     |                                                                                                                    |
| 357  | MALICIOUS_QUERY_REVERT                      |                                                                                                                    |
| 358  | JOINS_EXITS_DISABLED                        |                                                                                                                    |

## Lib

| Code | Error                                | Comment                                                                |
| ---- | ------------------------------------ | ---------------------------------------------------------------------- |
| 400  | REENTRANCY                           |                                                                        |
| 401  | SENDER_NOT_ALLOWED                   |                                                                        |
| 402  | PAUSED                               |                                                                        |
| 403  | PAUSE_WINDOW_EXPIRED                 |                                                                        |
| 404  | MAX_PAUSE_WINDOW_DURATION            |                                                                        |
| 405  | MAX_BUFFER_PERIOD_DURATION           |                                                                        |
| 406  | INSUFFICIENT_BALANCE                 |                                                                        |
| 407  | INSUFFICIENT_ALLOWANCE               |                                                                        |
| 408  | ERC20_TRANSFER_FROM_ZERO_ADDRESS     |                                                                        |
| 409  | ERC20_TRANSFER_TO_ZERO_ADDRESS       |                                                                        |
| 410  | ERC20_MINT_TO_ZERO_ADDRESS           |                                                                        |
| 411  | ERC20_BURN_FROM_ZERO_ADDRESS         |                                                                        |
| 412  | ERC20_APPROVE_FROM_ZERO_ADDRESS      |                                                                        |
| 413  | ERC20_APPROVE_TO_ZERO_ADDRESS        |                                                                        |
| 414  | ERC20_TRANSFER_EXCEEDS_ALLOWANCE     |                                                                        |
| 415  | ERC20_DECREASED_ALLOWANCE_BELOW_ZERO |                                                                        |
| 416  | ERC20_TRANSFER_EXCEEDS_BALANCE       |                                                                        |
| 417  | ERC20_BURN_EXCEEDS_ALLOWANCE         |                                                                        |
| 418  | SAFE_ERC20_CALL_FAILED               |                                                                        |
| 419  | ADDRESS_INSUFFICIENT_BALANCE         |                                                                        |
| 420  | ADDRESS_CANNOT_SEND_VALUE            |                                                                        |
| 421  | SAFE_CAST_VALUE_CANT_FIT_INT256      |                                                                        |
| 422  | GRANT_SENDER_NOT_ADMIN               | In AccessControl, the caller of `grantRole` must be an admin           |
| 423  | REVOKE_SENDER_NOT_ADMIN              | In AccessControl, the caller of `revokeRole` must be an admin          |
| 424  | RENOUNCE_SENDER_NOT_ALLOWED          | In AccessControl, callers can only`renounceRole` for their own account |
| 425  | BUFFER_PERIOD_EXPIRED                |                                                                        |
| 426  | CALLER_IS_NOT_OWNER                  |                                                                        |
| 427  | NEW_OWNER_IS_ZERO                    |                                                                        |
| 428  | CODE_DEPLOYMENT_FAILED               |                                                                        |
| 429  | CALL_TO_NON_CONTRACT                 |                                                                        |
| 430  | LOW_LEVEL_CALL_FAILED                |                                                                        |
| 431  | NOT_PAUSED                           |                                                                        |
| 432  | ADDRESS_ALREADY_ALLOWLISTED          |                                                                        |
| 433  | ADDRESS_NOT_ALLOWLISTED              |                                                                        |
| 434  | ERC20_BURN_EXCEEDS_BALANCE           |                                                                        |
| 435  | INVALID_OPERATION                    |                                                                        |
| 436  | CODEC_OVERFLOW                       |                                                                        |
| 437  | IN_RECOVERY_MODE                     |                                                                        |
| 438  | NOT_IN_RECOVERY_MODE                 |                                                                        |
| 439  | INDUCED_FAILURE                      |                                                                        |
| 440  | EXPIRED_SIGNATURE                    |                                                                        |
| 441  | MALFORMED_SIGNATURE                  |                                                                        |
| 442  | SAFE_CAST_VALUE_CANT_FIT_UINT64      |                                                                        |
| 443  | UNHANDLED_FEE_TYPE                   |                                                                        |
| 444  | BURN_FROM_ZERO                       |                                                                        |

## Vault

| Code | Error                           | Comment                                                                 |
| ---- | ------------------------------- | ----------------------------------------------------------------------- |
| 500  | INVALID_POOL_ID                 |                                                                         |
| 501  | CALLER_NOT_POOL                 | Some Vault hooks can only be called by the pool (e.g., register tokens) |
| 502  | SENDER_NOT_ASSET_MANAGER        |                                                                         |
| 503  | USER_DOESNT_ALLOW_RELAYER       | Relayers must be allowed by both governance and the user account        |
| 504  | INVALID_SIGNATURE               |                                                                         |
| 505  | EXIT_BELOW_MIN                  | Exit would yield fewer than the user-supplied minimum tokens out        |
| 506  | JOIN_ABOVE_MAX                  | Join would cost more than the user-supplied maximum tokens in           |
| 507  | SWAP_LIMIT                      | Swap violates user-supplied limits (min out or max in)                  |
| 508  | SWAP_DEADLINE                   | Swap transaction not mined within the specified deadline                |
| 509  | CANNOT_SWAP_SAME_TOKEN          |                                                                         |
| 510  | UNKNOWN_AMOUNT_IN_FIRST_SWAP    | A batch swap must start with a non-zero amount in                       |
| 511  | MALCONSTRUCTED_MULTIHOP_SWAP    |                                                                         |
| 512  | INTERNAL_BALANCE_OVERFLOW       | Unused in current code                                                  |
| 513  | INSUFFICIENT_INTERNAL_BALANCE   |                                                                         |
| 514  | INVALID_ETH_INTERNAL_BALANCE    | Cannot transfer native ETH to/from internal balance                     |
| 515  | INVALID_POST_LOAN_BALANCE       | Flashloan transactions must repay the loan in the same transaction      |
| 516  | INSUFFICIENT_ETH                |                                                                         |
| 517  | UNALLOCATED_ETH                 | Unused in current code                                                  |
| 518  | ETH_TRANSFER                    | Relayers cannot receive ETH directly (only through the Vault)           |
| 519  | CANNOT_USE_ETH_SENTINEL         | Internal Balance transfers cannot use ETH                               |
| 520  | TOKENS_MISMATCH                 |                                                                         |
| 521  | TOKEN_NOT_REGISTERED            |                                                                         |
| 522  | TOKEN_ALREADY_REGISTERED        |                                                                         |
| 523  | TOKENS_ALREADY_SET              |                                                                         |
| 524  | TOKENS_LENGTH_MUST_BE_2         |                                                                         |
| 525  | NONZERO_TOKEN_BALANCE           |                                                                         |
| 526  | BALANCE_TOTAL_OVERFLOW          |                                                                         |
| 527  | POOL_NO_TOKENS                  |                                                                         |
| 528  | INSUFFICIENT_FLASH_LOAN_BALANCE |                                                                         |

## Fees

| Code | Error                              | Comment |
| ---- | ---------------------------------- | ------- |
| 600  | SWAP_FEE_PERCENTAGE_TOO_HIGH       |         |
| 601  | FLASH_LOAN_FEE_PERCENTAGE_TOO_HIGH |         |
| 602  | INSUFFICIENT_FLASH_LOAN_FEE_AMOUNT |         |

## FeeSplitter

| Code | Error                            | Comment |
| ---- | -------------------------------- | ------- |
| 700  | SPLITTER_FEE_PERCENTAGE_TOO_HIGH |         |

## Misc

| Code | Error             | Comment |
| ---- | ----------------- | ------- |
| 998  | UNIMPLEMENTED     |         |
| 999  | SHOULD_NOT_HAPPEN |         |

<style scoped>
table {
    display: table;
    width: 100%;
}
</style>
