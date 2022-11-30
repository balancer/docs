---
description: >-
  Vault exceptions will revert with "BAL#" instead of text; see below for the
  interpretation of the number.
---

# Error Codes

All error codes for the Balancer V2 core contracts are defined in the [`BalancerErrors.sol`](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/solidity-utils/contracts/helpers/BalancerErrors.sol) contract.

## Math

| Code | Error                    | Comment                                                         |
| ---- | ------------------------ | --------------------------------------------------------------- |
| 000  | ADD\_OVERFLOW            |                                                                 |
| 001  | SUB\_OVERFLOW            |                                                                 |
| 002  | SUB\_UNDERFLOW           |                                                                 |
| 003  | MUL\_OVERFLOW            |                                                                 |
| 004  | ZERO\_DIVISION           |                                                                 |
| 005  | DIV\_INTERNAL            | Multiplication overflow during FixedPoint Division              |
| 006  | X\_OUT\_OF\_BOUNDS       | Invalid x in ExpMath.pow(x, y)                                  |
| 007  | Y\_OUT\_OF\_BOUNDS       | Invalid y in ExpMath.pow(x, y)                                  |
| 008  | PRODUCT\_OUT\_OF\_BOUNDS | In LogExpMath.pow(x, y), error computing x^y as exp(y \* ln(x)) |
| 009  | INVALID\_EXPONENT        | In LogExpMath.exp(x) = e^x; x out of bounds                     |

## Input

| Code | Error                   | Comment                                                                  |
| ---- | ----------------------- | ------------------------------------------------------------------------ |
| 100  | OUT\_OF\_BOUNDS         |                                                                          |
| 101  | UNSORTED\_ARRAY         | See UNSORTED\_TOKENS                                                     |
| 102  | UNSORTED\_TOKENS        | Tokens must be sorted in address order on pool registration              |
| 103  | INPUT\_LENGTH\_MISMATCH | Used to ensure array inputs intended to be parallel have the same length |
| 104  | ZERO\_TOKEN             | Address to be interpreted as a token cannot be 0                         |

## Shared pools

| Code | Error                      | Comment                                                                                                                                                              |
| ---- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200  | MIN\_TOKENS                | All pools must contain at least two tokens                                                                                                                           |
| 201  | MAX\_TOKENS                | Token count exceeds the maximum for a given pool type                                                                                                                |
| 202  | MAX\_SWAP\_FEE\_PERCENTAGE |                                                                                                                                                                      |
| 203  | MIN\_SWAP\_FEE\_PERCENTAGE |                                                                                                                                                                      |
| 204  | MINIMUM\_BPT               | On pool initialization, a small amount of BPT is minted to the zero address (keeps math well behaved). If initial balances are too small, initialization can fail    |
| 205  | CALLER\_NOT\_VAULT         | Certain pool callbacks need to be external, but could be exploited if called by anyone but the Vault                                                                 |
| 206  | UNINITIALIZED              | Pools must be initialized with a special "Init" join, before they can be joined by LPs                                                                               |
| 207  | BPT\_IN\_MAX\_AMOUNT       | Slippage/front-running protection check failed on a pool exit                                                                                                        |
| 208  | BPT\_OUT\_MIN\_AMOUNT      | Slippage/front-running protection check failed on a pool join                                                                                                        |
| 209  | EXPIRED\_PERMIT            |                                                                                                                                                                      |
| 210  | NOT\_TWO\_TOKENS           | Pools with oracles are limited to two tokens (e.g., WeightedPool2Tokens and MetastablePools). A pool with the TWO\_TOKEN specialization must have exactly two tokens |

## Pools

| Code | Error                                             | Comment                                                                                                            |
| ---- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 300  | MIN\_AMP                                          | Amplification factor out of range (Stable/Metastable pools)                                                        |
| 301  | MAX\_AMP                                          |                                                                                                                    |
| 302  | MIN\_WEIGHT                                       | Weighted Pool minimum weight                                                                                       |
| 303  | MAX\_STABLE\_TOKENS                               |                                                                                                                    |
| 304  | MAX\_IN\_RATIO                                    | Token in unbalanced the pool too much on a swap                                                                    |
| 305  | MAX\_OUT\_RATIO                                   | Token out unbalanced the pool too much on a swap                                                                   |
| 306  | MIN\_BPT\_IN\_FOR\_TOKEN\_OUT                     | Disproportionate exit unbalanced the pool too much                                                                 |
| 307  | MAX\_OUT\_BPT\_FOR\_TOKEN\_IN                     | Disproportionate join unbalanced the pool too much                                                                 |
| 308  | NORMALIZED\_WEIGHT\_INVARIANT                     | Weighted Pool normalized weights must add to 1.0                                                                   |
| 309  | INVALID\_TOKEN                                    |                                                                                                                    |
| 310  | UNHANDLED\_JOIN\_KIND                             | Some joins are pool type-specific                                                                                  |
| 311  | ZERO\_INVARIANT                                   | Pool balances must be > 0                                                                                          |
| 312  | ORACLE\_INVALID\_SECONDS\_QUERY                   | The "ago" timestamp when querying the oracle must be in the past                                                   |
| 313  | ORACLE\_NOT\_INITIALIZED                          | Cannot query an oracle with no data                                                                                |
| 314  | ORACLE\_QUERY\_TOO\_OLD                           | Cannot query before the oracle's earliest data sample                                                              |
| 315  | ORACLE\_INVALID\_INDEX                            | Cannot query a sample outside the buffer (1024)                                                                    |
| 316  | ORACLE\_BAD\_SECS                                 | Oracle query window must have non-zero duration                                                                    |
| 317  | AMP\_END\_TIME\_TOO\_CLOSE                        | Amplification parameter change has less than the minimum duration                                                  |
| 318  | AMP\_ONGOING\_UPDATE                              | Cannot start an amplification parameter update if one is already ongoing                                           |
| 319  | AMP\_RATE\_TOO\_HIGH                              | The requested amplification parameter change is too fast (cannot halve or double over less than a day)             |
| 320  | AMP\_NO\_ONGOING\_UPDATE                          | Cannot cancel an update if there isn't one                                                                         |
| 321  | STABLE\_INVARIANT\_DIDNT\_CONVERGE                |                                                                                                                    |
| 322  | STABLE\_GET\_BALANCE\_DIDNT\_CONVERGE             |                                                                                                                    |
| 323  | RELAYER\_NOT\_CONTRACT                            |                                                                                                                    |
| 324  | BASE\_POOL\_RELAYER\_NOT\_CALLED                  |                                                                                                                    |
| 325  | REBALANCING\_RELAYER\_REENTERED                   |                                                                                                                    |
| 326  | GRADUAL\_UPDATE\_TIME\_TRAVEL                     | start > end time in a gradual weights update                                                                       |
| 327  | SWAPS\_DISABLED                                   |                                                                                                                    |
| 328  | CALLER\_IS\_NOT\_LBP\_OWNER                       |                                                                                                                    |
| 329  | PRICE\_RATE\_OVERFLOW                             | Rate returned from a rateProvider must fit in 128 bits                                                             |
| 330  | INVALID\_JOIN\_EXIT\_KIND\_WHILE\_SWAPS\_DISABLED | Investment pools only allow proportional joins and exits when swaps are disabled (to prevent unbalancing the pool) |
| 331  | WEIGHT\_CHANGE\_TOO\_FAST                         | Gradual weight update duration too short (minimum 1 day)                                                           |
| 332  | LOWER\_GREATER\_THAN\_UPPER\_TARGET               | Invalid Linear Pool operating range                                                                                |
| 333  | UPPER\_TARGET\_TOO\_HIGH                          | Linear Pool max balance must fit in 112 bits                                                                       |
| 334  | UNHANDLED\_BY\_LINEAR\_POOL                       | Some joins/exits are pool type-specific                                                                            |
| 335  | OUT\_OF\_TARGET\_RANGE                            | Cannot reset Linear Pool targets if pool is unbalanced                                                             |
| 336  | UNHANDLED\_EXIT\_KIND                             | Some exits are pool type-specific                                                                                  |
| 337  | UNAUTHORIZED\_EXIT                                | Management fees can only be collected by the pool owner                                                            |
| 338  | MAX\_MANAGEMENT\_SWAP\_FEE\_PERCENTAGE            |                                                                                                                    |
| 339  | UNHANDLED\_BY\_INVESTMENT\_POOL                   | Some joins/exits are pool type-specific                                                                            |

## Lib

| Code | Error                                    | Comment                                                                |
| ---- | ---------------------------------------- | ---------------------------------------------------------------------- |
| 400  | REENTRANCY                               |                                                                        |
| 401  | SENDER\_NOT\_ALLOWED                     |                                                                        |
| 402  | PAUSED                                   |                                                                        |
| 403  | PAUSE\_WINDOW\_EXPIRED                   |                                                                        |
| 404  | MAX\_PAUSE\_WINDOW\_DURATION             |                                                                        |
| 405  | MAX\_BUFFER\_PERIOD\_DURATION            |                                                                        |
| 406  | INSUFFICIENT\_BALANCE                    |                                                                        |
| 407  | INSUFFICIENT\_ALLOWANCE                  |                                                                        |
| 408  | ERC20\_TRANSFER\_FROM\_ZERO\_ADDRESS     |                                                                        |
| 409  | ERC20\_TRANSFER\_TO\_ZERO\_ADDRESS       |                                                                        |
| 410  | ERC20\_MINT\_TO\_ZERO\_ADDRESS           |                                                                        |
| 411  | ERC20\_BURN\_FROM\_ZERO\_ADDRESS         |                                                                        |
| 412  | ERC20\_APPROVE\_FROM\_ZERO\_ADDRESS      |                                                                        |
| 413  | ERC20\_APPROVE\_TO\_ZERO\_ADDRESS        |                                                                        |
| 414  | ERC20\_TRANSFER\_EXCEEDS\_ALLOWANCE      |                                                                        |
| 415  | ERC20\_DECREASED\_ALLOWANCE\_BELOW\_ZERO |                                                                        |
| 416  | ERC20\_TRANSFER\_EXCEEDS\_BALANCE        |                                                                        |
| 417  | ERC20\_BURN\_EXCEEDS\_ALLOWANCE          |                                                                        |
| 418  | SAFE\_ERC20\_CALL\_FAILED                |                                                                        |
| 419  | ADDRESS\_INSUFFICIENT\_BALANCE           |                                                                        |
| 420  | ADDRESS\_CANNOT\_SEND\_VALUE             |                                                                        |
| 421  | SAFE\_CAST\_VALUE\_CANT\_FIT\_INT256     |                                                                        |
| 422  | GRANT\_SENDER\_NOT\_ADMIN                | In AccessControl, the caller of `grantRole` must be an admin           |
| 423  | REVOKE\_SENDER\_NOT\_ADMIN               | In AccessControl, the caller of `revokeRole` must be an admin          |
| 424  | RENOUNCE\_SENDER\_NOT\_ALLOWED           | In AccessControl, callers can only`renounceRole` for their own account |
| 425  | BUFFER\_PERIOD\_EXPIRED                  |                                                                        |
| 426  | CALLER\_IS\_NOT\_OWNER                   |                                                                        |
| 427  | NEW\_OWNER\_IS\_ZERO                     |                                                                        |
| 428  | CODE\_DEPLOYMENT\_FAILED                 |                                                                        |
| 429  | CALL\_TO\_NON\_CONTRACT                  |                                                                        |
| 430  | LOW\_LEVEL\_CALL\_FAILED                 |                                                                        |

## Vault

| Code | Error                              | Comment                                                                 |
| ---- | ---------------------------------- | ----------------------------------------------------------------------- |
| 500  | INVALID\_POOL\_ID                  |                                                                         |
| 501  | CALLER\_NOT\_POOL                  | Some Vault hooks can only be called by the pool (e.g., register tokens) |
| 502  | SENDER\_NOT\_ASSET\_MANAGER        |                                                                         |
| 503  | USER\_DOESNT\_ALLOW\_RELAYER       | Relayers must be allowed by both governance and the user account        |
| 504  | INVALID\_SIGNATURE                 |                                                                         |
| 505  | EXIT\_BELOW\_MIN                   | Exit would yield fewer than the user-supplied minimum tokens out        |
| 506  | JOIN\_ABOVE\_MAX                   | Join would cost more than the user-supplied maximum tokens in           |
| 507  | SWAP\_LIMIT                        | Swap violates user-supplied limits (min out or max in)                  |
| 508  | SWAP\_DEADLINE                     | Swap transaction not mined within the specified deadline                |
| 509  | CANNOT\_SWAP\_SAME\_TOKEN          |                                                                         |
| 510  | UNKNOWN\_AMOUNT\_IN\_FIRST\_SWAP   | A batch swap must start with a non-zero amount in                       |
| 511  | MALCONSTRUCTED\_MULTIHOP\_SWAP     |                                                                         |
| 512  | INTERNAL\_BALANCE\_OVERFLOW        | Unused in current code                                                  |
| 513  | INSUFFICIENT\_INTERNAL\_BALANCE    |                                                                         |
| 514  | INVALID\_ETH\_INTERNAL\_BALANCE    | Cannot transfer native ETH to/from internal balance                     |
| 515  | INVALID\_POST\_LOAN\_BALANCE       | Flashloan transactions must repay the loan in the same transaction      |
| 516  | INSUFFICIENT\_ETH                  |                                                                         |
| 517  | UNALLOCATED\_ETH                   | Unused in current code                                                  |
| 518  | ETH\_TRANSFER                      | Relayers cannot receive ETH directly (only through the Vault)           |
| 519  | CANNOT\_USE\_ETH\_SENTINEL         | Internal Balance transfers cannot use ETH                               |
| 520  | TOKENS\_MISMATCH                   |                                                                         |
| 521  | TOKEN\_NOT\_REGISTERED             |                                                                         |
| 522  | TOKEN\_ALREADY\_REGISTERED         |                                                                         |
| 523  | TOKENS\_ALREADY\_SET               |                                                                         |
| 524  | TOKENS\_LENGTH\_MUST\_BE\_2        |                                                                         |
| 525  | NONZERO\_TOKEN\_BALANCE            |                                                                         |
| 526  | BALANCE\_TOTAL\_OVERFLOW           |                                                                         |
| 527  | POOL\_NO\_TOKENS                   |                                                                         |
| 528  | INSUFFICIENT\_FLASH\_LOAN\_BALANCE |                                                                         |

## Fees

| Code | Error                                   | Comment |
| ---- | --------------------------------------- | ------- |
| 600  | SWAP\_FEE\_PERCENTAGE\_TOO\_HIGH        |         |
| 601  | FLASH\_LOAN\_FEE\_PERCENTAGE\_TOO\_HIGH |         |
| 602  | INSUFFICIENT\_FLASH\_LOAN\_FEE\_AMOUNT  |         |
