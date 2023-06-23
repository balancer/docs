<script setup>
import { ref, watch, computed } from 'vue';
import { ethers } from 'ethers';
import { BalancerSDK } from '@balancer-labs/sdk';

const props = defineProps({
  pool: {
    type: Object,
    required: true,
  },
  network: {
    type: Object,
    required: true,
  },
});

const amountIn = ref('');
const amountOut = ref('');
const tokenIn = ref(props.pool.tokens[0]);
const tokenOut = ref(props.pool.tokens[1]);

watch(tokenIn, () => {
  amountIn.value = '';
  amountOut.value = '';

  if (tokenIn.value.address === tokenOut.value.address) {
    tokenOut.value = props.pool.tokens.find(
      token => token.address !== tokenIn.value.address
    );
  }
});

watch(tokenOut, () => {
  amountIn.value = '';
  amountOut.value = '';

  if (tokenOut.value.address === tokenIn.value.address) {
    tokenIn.value = props.pool.tokens.find(
      token => token.address !== tokenOut.value.address
    );
  }
});

const isButtonDisabled = computed(() => {
  if (isNaN(parseFloat(amountIn.value)) && isNaN(parseFloat(amountOut.value))) {
    return true;
  }

  return false;
});

async function handleSubmit() {
  let kind = 0;
  let amount;
  if (amountIn.value !== '') {
    amount = ethers.parseUnits(amountIn.value, tokenIn.value.decimals);
  } else {
    amount = ethers.parseUnits(amountOut.value, tokenOut.value.decimals);
    kind = 1;
  }

  const config = {
    network: props.network.id,
    rpcUrl: props.network.rpcUrl,
  };

  console.log(config);

  const balancer = new BalancerSDK(config);

  const response = await balancer.swaps.queryBatchSwap({
    kind,
    assets: [tokenIn.value.address, tokenOut.value.address],
    swaps: [
      {
        poolId: props.pool.id,
        assetInIndex: 0,
        assetOutIndex: 1,
        amount: amount.toString(),
        userData: '0x',
      },
    ],
  });

  if (kind === 0) {
    amountOut.value = Math.abs(
      parseFloat(ethers.formatUnits(response[1], tokenOut.value.decimals))
    ).toFixed(tokenOut.value.decimals);
  } else {
    amountIn.value = Math.abs(
      parseFloat(ethers.formatUnits(response[0], tokenIn.value.decimals))
    ).toFixed(tokenIn.value.decimals);
  }
}
</script>
<template>
  <div class="swap-form">
    <InputWithEmbed
      v-model="amountIn"
      placeholder="0.0"
      @input="amountOut = ''"
    >
      <AssetSelect
        :selectedToken="tokenIn"
        :tokens="pool.tokens"
        :onChange="$token => (tokenIn = $token)"
      />
    </InputWithEmbed>
    <InputWithEmbed
      v-model="amountOut"
      placeholder="0.0"
      @input="amountIn = ''"
    >
      <AssetSelect
        :selectedToken="tokenOut"
        :tokens="pool.tokens"
        :onChange="$token => (tokenOut = $token)"
      />
    </InputWithEmbed>
    <div>
      <Button :disabled="isButtonDisabled" class="btn" @click="handleSubmit">
        Query Swap
      </Button>
    </div>
  </div>
</template>
<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.swap-form > * + * {
  margin-top: 16px;
}
</style>
