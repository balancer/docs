# Flash Swaps

## Flash Swap Overview

Anyone who identifies a price discrepancy in two Balancer Pools can execute a **Flash Swap**. An arbitrageur who makes a flash swap does not need to hold any of the input tokens that one would normally need to make a trade. Instead, the trader identifies the imbalance, tells the Vault to make the swap, and is rewarded with the profit.

## Example

In [this transaction](https://dashboard.tenderly.co/tx/kovan/0x3afd88c42a8bd1ff696c38f4232da3b872a783660d54417db8c3e33f6ab957a4), the sender identifies a price discrepancy between two pools that contain the same two tokens. They realize that if they were to sell 1,000,000 units of token `0xc256`to pool `0x3a19` and then sell the proceeds to pool `0x32fc` they would come out with more than 1,000,000 units of token `0xc256`. The sender doesn't hold any of the tokens. They make a call to `batchSwap` with the following inputs:

```json
{
  "kind": "0", // kind GIVEN_IN, ie amounts refer to tokens being sold to the pool
  "assets": [ // the list of tokens used in the trade
    "0xc2569dd7d0fd715b054fbf16e75b001e5c0c1115",
    "0xdfcea9088c8a88a76ff74892c1457c17dfeef9c1"
  ],
  "limits": [ // the number of tokens the trader is willing to send to the vault
    "0",
    "0"
  ],
  "swaps": [
    {
      // first, exchange 1000000 units of assets[0] for assets[1] in pool 0x3a19
      "poolId": "0x3a19030ed746bd1c3f2b0f996ff9479af04c5f0a000200000000000000000004",
       "assetInIndex": "0",  
      "assetOutIndex": "1",
      "amount": "1000000"
    },
    {
      // second, exchange the output of the previous swap for assets[0] in pool 0x32fc
      "poolId": "0x32fc95287b14eaef3afa92cccc48c285ee3a280a000100000000000000000005",
      "assetInIndex": "1",
      "assetOutIndex": "0",
      "amount": "0" // when amount=0, it uses the value output by the previous swap
    }
  ],
  "funds": {
    "sender": "0x44c42303d71fc693d553d71309c80461010b8457",
    "recipient": "0x44c42303d71fc693d553d71309c80461010b8457"
  },
  "deadline": "999999999999999999"
}
```

The net return after the two swaps is 2285700 units of token `0xc256`, which is sent directly to the `recipient`.
