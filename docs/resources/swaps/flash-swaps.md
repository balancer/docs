# Flash Swaps

## Overview

{% hint style="info" %}
To understand Flash Swaps, make sure you understand [Batch Swaps](batch-swaps.md) first.
{% endhint %}

Anyone who identifies a price discrepancy in two Balancer Pools can execute a **Flash Swap**. **** An arbitrageur who makes a flash swap **does not need to hold any** of the input **tokens** that one would normally need to make a trade. Instead, the trader identifies the imbalance, tells the Vault to make the swap, and is rewarded with the profit.

## Example

In this sample transaction ([click here for logs](https://kovan.etherscan.io/tx/0x3afd88c42a8bd1ff696c38f4232da3b872a783660d54417db8c3e33f6ab957a4#eventlog) and [click here for execution trace](https://dashboard.tenderly.co/tx/kovan/0x3afd88c42a8bd1ff696c38f4232da3b872a783660d54417db8c3e33f6ab957a4)), the sender identifies a price discrepancy between two pools that contain the same two tokens. They realize that if they were to sell 1,000,000 units of token `0xc256`to pool `0x3a19` and then sell the proceeds to pool `0x32fc` they would come out with more than 1,000,000 units of token `0xc256`. Even though the sender doesn't hold any of the tokens, they make a call to `batchSwap.`

```
"kind": "0", 
  "assets": [ 
    "0xc2569dd7d0fd715b054fbf16e75b001e5c0c1115",
    "0xdfcea9088c8a88a76ff74892c1457c17dfeef9c1"
  ],
  "limits": [ 
    "0",
    "0"
  ],
```

Where:

* `kind`: GIVEN\_IN (= 0) means that the trades are formatted such that the amount represents the amount being sent to the pool
* `assets`: the list of tokens used in the trade
* `limits`: the number of tokens the trader is willing to send to the Vault For a Flash Swap, these are set to zero (or less) since a Flash Swap doesn't require the trader to send any tokens to the Vault)

```
"swaps": [
    {
      "poolId": "0x3a19030ed746bd1c3f2b0f996ff9479af04c5f0a000200000000000000000004",
      "assetInIndex": "0", 
      "assetOutIndex": "1",
      "amount": "1000000"
    },
    {     
      "poolId": "0x32fc95287b14eaef3afa92cccc48c285ee3a280a000100000000000000000005",
      "assetInIndex": "1",
      "assetOutIndex": "0",
      "amount": "0"
    }
  ],
```

Here we see our swap definitions. The first swap, shows an exchange of 1000000 units of `assets[0]` for `assets[1]` in pool `0x3a19`. The next swap shows the opposite swap of `assets[1]` for `assets[0]` in pool `0x32fc`.  You may notice in the second swap that the `amount` field is set to `0`. Sending zero as the amount in a swap step simple means it uses the value output by the previous swap.

```
  "funds": {
    "sender": "0x44c42303d71fc693d553d71309c80461010b8457",
    "fromInternalBalance": false,
    "recipient": "0x44c42303d71fc693d553d71309c80461010b8457",
    "toInternalBalance": false
  },
  "deadline": "999999999999999999"
```

Finally, the `FundManagement` struct and `deadline` are set the same way as any other `batchSwap`. The user defines the `sender` and `recipient` as themselves, and sets both internal balance flags to `false`. The net return after the two swaps is 2285700 units of token `0xc256`, which is sent directly to the `recipient`.
