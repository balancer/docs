# Smart Order Router

## Summary

{% hint style="info" %}
This section goes over SOR v2. For information on SOR v1, please refer to the [old documentation](https://docs.balancer.fi/v/v1/smart-contracts/sor/).
{% endhint %}

SOR v2 finds optimal trading routes across different and arbitrary types of pools. This generality enables Balancer to be the most flexible AMM protocol that exists. By abstracting the complexity of various pool types from traders, users can issue swaps within the aggregated liquidity in the Vault and not need to worry about the different pool math involved.

The only prerequisite for SOR v2 to work with a pool is that it has first and second differentiable (either numerically or analytically)`spotPriceAfterSwap` functions.

The final objective of SOR is to find a trade that maximizes the return for the user. One requirement for this to be true is that after the swap is done, each of the paths/routes used ends up having the same spot price. This means that there is no arbitrage possible after the trade (at least with the pools used) and therefore no money left on the table.

## Glossary

* `tokenIn`: the address of the token being sold by user
* `tokenOut`: the address of the token being bought by user
* `swapType` < `'swapExactIn'` , `'swapExactOut'`>: the type of swap being done. The user can select the amount they want to sell (in `tokenIn`) or the amount they want to buy (in `tokenOut`)
* `targetAmountSwap`: the amount the user wants to buy OR sell, depending on `swapType`. If `swapType` is `'swapExactIn'` , then `targetAmountSwap` is the amount the user wants to sell. Conversely, if `swapType` is `'swapExactOut'` , then `targetAmountSwap` is the amount the user wants to buy.
* `pools`: is a dictionary that is loaded from subgraph with all the pools available on Balancer
* `paths`: a path is a sequence of pools that enable the trade `tokenIn` to `tokenOut` to happen. Paths can contain one hop (direct trades) or two hops. For example a trade of DAI for BAL could have direct trades with pools that contain both DAI and BAL and also multihop paths, for example DAI→WETH→BAL or DAI→USDC→BAL.
* `pairType` < `'token->token'` , `'token->BPT'` ,`'BPT->token'` >: This is something new to SOR v2. Join/Exit pools with a single token are considered by SOR as a swap just like a swap between two underlying tokens in a pool. This allows for cool use cases like swapping DAI for GUSD in two hops if there is a big stable pool (say pool A) with \<DAI, USDT, USDC> and another stable pool with \<BPTA, GUSD>, BPTA being the BPT of pool A. So if a hop involves joining a pool, i.e. DAI for BPTA, this `pairType` would be `'token->BPT'`
* `maxPools`: is the maximum number of swaps the final solution of SOR can have. A multihop has two swaps, for example.
* `returnToken`: is the token whose amount is unknown for the swap and SOR is calculating. Simply put, if `swapType` is `'swapExactIn'` the user is inputting how much they want to **sell** (`targetAmountSwap` is in `tokenIn`) and will get from SOR a `returnAmount` which is how much they will get back in `tokenOut`. Conversely, if `swapType` is `'swapExactOut'`, then the user is inputting how much they want to **buy** (`targetAmountSwap` is in `tokenOut`) and will get from SOR a `returnAmount` which is how much they have to pay in `tokenIn`.
* `costReturnToken`: is how much an additional swap would add in gas costs in terms of `returnToken`. For example, for a `'swapExactIn'` swap of DAI for BAL, `costReturnToken` could be 0.1 BAL (BAL is the `returnToken`). This is simply calculated by:

$$
costReturnToken = \frac{gasPrice \cdot gasAddSwap}{priceReturnTokenInETH}
$$

## Basic algorithm

The basic flow of SOR v2 is as follows

1. Check how many pools (`initialNumPaths`) of the most liquid pools we need to be able to trade the `targetAmountSwap`. Usually `targetAmountSwap` is much lower than the liquidity available in the largest pools so this is usually 1. Start with next step with `b = initialNumPaths` where b is the number of paths being considered.
2. Find out the best `b` paths and the best distribution of `targetAmountSwap` which is a list called `swapAmounts` with `b` amounts to be swapped in each of the `b` paths. The sum of all amounts in `swapAmounts` is always `targetAmountSwap`. This step also calculates the `returnAmount` the suggested swaps return.
3. Compare `returnAmount` of previous step with `bestReturnAmount` (which is the best return amount so far) considering the additional costs of adding an extra path (`costReturnToken * nSwapsInPath`). If the `returnAmount` is better than `bestReturnAmount` then increment `b` and return to step 2). If not the algorithm has found the final solution. IMPORTANT: notice that if `swapType` is `'swapExactIn'` having a better `returnAmount` means that it is higher than `bestReturnAmount`, i.e. the user is getting more `tokenOut` . Conversely, if `swapType` is `'swapExactOut'` having a better `returnAmount` means that it is lower than `bestReturnAmount`, i.e. the user is paying less `tokenIn` for the desired amount (`targetAmountSwap`) of `tokenOut` they want to buy.

## Deep dive into step 2)

The most challenging part of the algorithm is to find out what is the best combination of paths and swapAmounts for a swap given how many paths we want to include (variable `b`mentioned above).

Step 2) can be broken down into the following sub-steps:

2.1. Start `swapAmounts` list based on the previous `bestSwapAmounts` by adding another element to the list which is defined as `targetAmountSwap/b` and scale down all the elements of `bestSwapAmounts` by `1-1/b` so that the sum still is equal to `targetAmountSwap`. For example, if the previous `bestSwapAmounts` for `b=2` were `[150, 30]` then the new initial `swapAmounts` for `b=3` will be `[100, 20, 60]`

2.2 Given `swapAmounts` from above, find the best paths using `getBestPathIds()` (see detailed information about this function in appendix below).

2.3 Given current `swapAmounts` and `bestPathIds` find new `swapAmounts` that maximize the return for the given `bestPathIds`

2.4 Return to step 2.2) above with new `swapAmounts` and check if function `getBestPathIds()` returns the same `bestPathIds`. If yes, this means that we have converged to the best paths and swapAmounts and step 2) is finalized. If not, then go to step 2.3) again

## Deep dive into step 2.3)

Step 2.3) finds the `swapAmounts` that will maximize the returns given an initial guess of `swapAmounts` and the list of paths that should be used (`bestPathIds`). This is all done in function `iterateSwapAmounts()` which will be described below in its different steps.

2.3.1 Call `iterateSwapAmountsApproximation()` and which does a first iteration in approximating `swapAmounts` to the optimal ones (this function is explained in detail in the appendix below). This function returns `prices` which are the prices after swap for each of the paths considering their respective `amountSwap` in `swapAmounts` as long as that `amountSwap` is NOT at the limit of the path (i.e. equal to `path.limitAmount`) AND is not zero.

2.3.2 Check if `prices` are the same within a given error margin. If this is true, then the objective of not leaving paths in a state that can be arbed has been achieved and the optimal distribution of swap amounts for these paths has been found. If prices are still not close enough to each other go back to step 2.3.1.

## Appendix

### getBestPathIds()

`getBestPathIds()` takes as inputs `swapAmounts` and all available `paths` and is expected to find the paths that give the best return for the given `swapAmounts`. The algorithm to do so is very simple: sort the `swapAmounts` by descending order and starting with the largest `swapAmount`, find the path that has the best return. Select this path and remove it from the list of available paths as we do not want to use the same path twice (as using it the first time would affect its price and slippage). The continue for each subsequent `swapAmount` until we chose a path for each `swapAmount`

### iterateSwapAmountsApproximation()

`iterateSwapAmountsApproximation()` takes as inputs `swapAmounts` and `bestPathIds` and is expected to find new `swapAmounts` that have spot prices after swap as close as possible.

To help illustrate this, let's start with two paths (1 and 2) and initial `swapAmounts` equal to $$A_i$$ and $$A_2$$ . Remember that always the sum of the individual amounts is `targetAmountSwap`.&#x20;

The objective is to find a target spot price (`targetSP`) and $$A'_1$$ and $$A'_2$$ . such that:

$$
SPaA_1(A_1) =SPaA_2(A_2)= targetSP \\
A_1'+A_2' = A_1+A_2 = A_T
$$

To help the visualization, this is what we are looking to achieve:

<img src="../.gitbook/assets/spotpriceaftertrade.png" alt="" data-size="original">

To calculate a candidate for `targetSP` we need to use the derivatives of $$SPaS_1$$ and $$SPaS_2$$ at $$A_1$$ and $$A_2$$ respectively.

Using simple trigonometry we can say that:

$$
SPaS_1(A_1)-targetSP = SPaS_1'(A_1)\cdot(A_1'-A_1)\\
SPaS_2(A_2)-targetSP = SPaS_2'(A_2)\cdot(A_2'-A_2)
$$

The solution for this system of equations is:

$$
targetSP = \frac{\frac{SPaS_1(A_1)}{SPaS_1'(A_1)}+\frac{SPaS_2(A_2)}{SPaS_2'(A_2)}}{\frac{1}{SPaS_1'(A_1)}+\frac{1}{SPaS_1'(A_1)}}
$$

In other words, the target spot price is the average of the spot prices after swap weighted by the inverse of their derivatives. The derivatives of $$SPaS$$ can be seen as the slippage of that path. Generalizing for any number of paths we have:

$$
targetSP = \frac{\sum_i{\frac{SPaS_i(A_i)}{SPaS'_i(A_i)}}} {\sum_i{\frac{1}{SPaS'_i(A_i)}}}
$$

After calculating `targetSP` it's easy to replace it in the equations above to find each $$A'_i$$ :

$$
A'_i = \frac{SPaS_i(Ai) - targetSP}{SPaS'_i(Ai)}+A_i
$$

Notice that the paths have limits in the amounts they can be used to swap. The lower boundary is always zero, since you cannot swap a negative number. The upper boundary is usually defined by 50% of the balance a pool has in the token being swapped. These limits have to be taken into account and respected in the choice of `swapAmounts`. Function `redistributeInputAmounts()` does exactly that. Let's take a look at it into more detail below.

### redistributeInputAmounts()

If after the calculations done in `iterateSwapAmountsApproximation()` above we end up with $$A'_i$$ that is negative or above the limit of path $$i$$ , then we have to set it to 0 or $$A_{limit_i}$$ respectively. The excesses have to be 'redistributed' to the other viable paths (i.e. paths that do not have swap amounts below zero or above the path limit), otherwise the sum of $$A_i$$ for all paths $$i$$ is not going to be equal to `targetAmountSwap` as it should.

Function `redistributeInputAmounts()` might need to be calculated several times in a row because as the excesses are redistributed to paths that are viable, their swap amounts might go below zero or beyond the limit. We call `redistributeInputAmounts()` iteratively until all swap amounts are above or equal to zero **and** below or equal to their path limit amounts.
