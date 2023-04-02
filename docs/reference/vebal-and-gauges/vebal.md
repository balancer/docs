# veBAL

::: info
The `FeeDistributor` address is [`0x26743984e3357efc59f2fd6c1afdc310335a61c9`](https://etherscan.io/address/0x26743984e3357efc59f2fd6c1afdc310335a61c9#code)
:::

## Query Pending Tokens for a veBAL Holder

You can query pending tokens for a given veBAL holder by using `eth_call` to simulate a claim transaction. Below is some simple pseudocode that outlines the process:

```
feeDistributorAddress="0x26743984e3357efc59f2fd6c1afdc310335a61c9";
feeDistributorAbi=<loadFdAbi>;
userAddress=<yourAddress>;
tokenAddress0=<tokenAddress0>;
tokenAddress1=<tokenAddress1>;
tokens = [tokenAddress0, tokenAddress1];

feeDistributorContract = contract(feeDistributorAddress, feeDistributorAbi);
claimableTokens = feeDistributorContract.claimTokens(userAddress,tokens).call();
```

## Claim Pending Tokens for a veBAL Holder

The process is identical to [querying as above](vebal.md#how-to-query-pending-tokens-for-a-vebal-holders), except instead of `eth_call`, you will use `eth_sendTransaction`.

::: warning How do I Know Which Tokens to Query/Claim?

At the time of this writing, there is no subgraph tracking tokens added to the `FeeDistributor`. For now, an easy way you can find the available tokens for claiming is checking what the contract holds on Etherscan
:::
