<script setup>
import { watchEffect, ref } from 'vue';
import { BalancerSDK } from '@balancer-labs/sdk';
import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

const props = defineProps({
  network: {
    type: Object,
    required: true,
  },
});

const tokens = ref([]);
const tokenIn = ref(null);

async function fetchAllTokens(network) {
  const _tokens = {};

  const config = {
    network: network.id,
    rpcUrl: network.rpcUrl,
  };

  const { swaps } = new BalancerSDK(config);

  await swaps.fetchPools();

  const pools = swaps.getPools();

  for (const pool of pools) {
    for (const token of pool.tokens) {
      _tokens[token.address] = token;
    }
  }

  const tokensArr = Object.values(_tokens);
  tokenIn.value = tokensArr[0];
  tokens.value = tokensArr;

  console.log('done');
}

watchEffect(() => {
  fetchAllTokens(props.network);
});

// const allTokens = computed(async () => {
//   const config = {
//     network: props.network.id,
//     rpcUrl: props.network.rpcUrl,
//   };

//   const { sor, swaps, ...rest } = new BalancerSDK(config);

//   await swaps.fetchPools();

//   return [];
// });

async function handleSubmit() {
  const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
  const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

  const config = {
    network: props.network.id,
    rpcUrl: props.network.rpcUrl,
  };

  const { sor, swaps, ...rest } = new BalancerSDK(config);

  console.log('loading pools...');

  await swaps.fetchPools();

  console.log('pools loaded!');

  console.log('fetching route...');

  const response = await swaps.findRouteGivenIn({
    tokenIn: DAI,
    tokenOut: WETH,
    amount: ethers.parseEther('100'),
    gasPrice: BigNumber.from('20000000000'),
    maxPools: 4,
  });

  console.log(response);
}
// const balancer = new BalancerSDK.
</script>
<template>
  <div>
    <p>SOR</p>
    <button @click="handleSubmit">Click Me</button>
    <div v-if="tokens.length > 0">
      <AssetSelect
        :selectedToken="tokenIn"
        :tokens="tokens"
        :onChange="$token => (tokenIn = $token)"
      />
    </div>
  </div>
</template>
