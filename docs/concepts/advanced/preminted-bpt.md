# Preminted BPT

## Overview

Preminted BPT is a relatively new concept in the evolution of Balancer pool design. As [pool composability](/concepts/pools/#pool-composability) became more commonplace with nested pools, the need to go from an asset in a pool to the BPT (normally referred to as a `join`) grew. This not only makes it difficult to include as part of a complex multihop `batchSwap` but also introduced additional gas costs since a `join` will mint new BPT.

Preminted BPT means that the pool mints the max `2**(111)` BPT upon creation and the BPT is included as one of the tokens in the pool itself. The pool's arithmetic behaves as if it didn't exist, and the BPT total supply is not a useful value. Instead a `virtual supply` (how much BPT is actually owned outside the Vault) is used.

Pools with Preminted BPTs like [Composable Stable Pools](/concepts/pools/composable-stable.md) can then allow an user to `swap` from a token in the pool to the BPT of the pool, while previously this was only possible with a `join` operation.
