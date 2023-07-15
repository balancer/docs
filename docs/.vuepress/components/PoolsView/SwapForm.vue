<script setup>
import { ref, computed, watch } from 'vue';
import {
  SwapKind,
  Token,
  TokenAmount,
  sorGetSwapsWithPools,
  sorParseRawPools,
} from '@balancer/sdk';
import { useNetwork } from '../../providers/network';
import { useTokens } from '../../providers/tokens';
import { Select, SelectTrigger, SelectOptions } from '../Select';

const props = defineProps({
  pool: {
    type: Object,
    required: true,
  },
});

const { network } = useNetwork();
const { getToken } = useTokens();

const tokens = computed(() =>
  props.pool.tokens.filter(t => t.address !== props.pool.address)
);

const amountIn = ref('');
const amountOut = ref('');
const swapKind = ref(SwapKind.GivenIn);

const tokenIn = ref(tokens.value[0]);
const tokenOut = ref(tokens.value[1]);

watch([() => props.pool], () => {
  tokenIn.value = tokens.value[0];
  tokenOut.value = tokens.value[1];
  amountIn.value = '';
  amountOut.value = '';
  swapKind.value = SwapKind.GivenIn;
});

watch(
  () => [tokenIn.value, tokenOut.value],
  () => {
    amountIn.value = '';
    amountOut.value = '';
  }
);

function onAmountInChange(event) {
  amountIn.value = event.target.value;
  amountOut.value = '';
  swapKind.value = SwapKind.GivenIn;
}

function onAmountOutChange(event) {
  amountOut.value = event.target.value;
  amountIn.value = '';
  swapKind.value = SwapKind.GivenOut;
}

async function onSubmit() {
  const parsedPools = sorParseRawPools(network.value.id, [props.pool]);

  const tIn = new Token(
    network.value.id,
    tokenIn.value.address,
    tokenIn.value.decimals,
    tokenIn.value.symbol,
    tokenIn.value.name
  );

  const tOut = new Token(
    network.value.id,
    tokenOut.value.address,
    tokenOut.value.decimals,
    tokenOut.value.symbol,
    tokenOut.value.name
  );

  const amount =
    swapKind.value === SwapKind.GivenIn
      ? TokenAmount.fromHumanAmount(tIn, amountIn.value)
      : TokenAmount.fromHumanAmount(tOut, amountOut.value);

  const response = await sorGetSwapsWithPools(
    tIn,
    tOut,
    swapKind.value,
    amount,
    parsedPools
  );

  if (!response) {
    return;
  }

  if (swapKind.value === SwapKind.GivenIn) {
    amountOut.value =
      response.paths[response.paths.length - 1].outputAmount.toSignificant();
  }

  if (swapKind.value === SwapKind.GivenOut) {
    amountIn.value = response.paths[0].inputAmount.toSignificant();
  }
}
</script>
<template>
  <div class="swap-form">
    <div>
      <InputLabel>Token In</InputLabel>
      <div class="input-with-select">
        <Input
          placeholder="0.0"
          :modelValue="amountIn"
          @input="onAmountInChange"
        />
        <div class="select">
          <Select :onChange="newValue => (tokenIn = newValue)" :value="tokenIn">
            <SelectTrigger :value="tokenIn.address" placeholder="Select Token">
              <Avatar
                :address="tokenIn.address"
                :imageURL="getToken(tokenIn.address).logoURI"
                :size="20"
              />
              <span class="truncate">{{ tokenIn.symbol }}</span>
            </SelectTrigger>
            <SelectOptions v-slot="token" :options="tokens" optionKey="address">
              <Avatar
                :address="token.address"
                :imageURL="getToken(token.address).logoURI"
                :size="20"
              />
              <span>{{ token.symbol }}</span>
            </SelectOptions>
          </Select>
        </div>
      </div>
    </div>
    <div>
      <InputLabel>Token Out</InputLabel>
      <div class="input-with-select">
        <Input
          placeholder="0.0"
          :modelValue="amountOut"
          @input="onAmountOutChange"
        />
        <div class="select">
          <Select
            :onChange="newValue => (tokenOut = newValue)"
            :value="tokenOut"
          >
            <SelectTrigger :value="tokenOut.address" placeholder="Select Token">
              <Avatar
                :address="tokenOut.address"
                :imageURL="getToken(tokenOut.address).logoURI"
                :size="20"
              />
              <span class="truncate">{{ tokenOut.symbol }}</span>
            </SelectTrigger>
            <SelectOptions v-slot="token" :options="tokens" optionKey="address">
              <Avatar
                :address="token.address"
                :imageURL="getToken(token.address).logoURI"
                :size="20"
              />
              <span>{{ token.symbol }}</span>
            </SelectOptions>
          </Select>
        </div>
      </div>
    </div>
    <div>
      <button class="submit-button" @click="onSubmit">Query Swap</button>
    </div>
  </div>
</template>
<style scoped>
.swap-form > * + * {
  margin-top: 16px;
}
.input-with-select {
  position: relative;
}

.input-with-select input {
  height: 68px;
  padding-left: 150px;
}

.select {
  position: absolute;
  align-items: center;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0 12px;
}

.select .select-trigger {
  width: 125px;
}

.submit-button {
  background-color: #384aff;
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  width: 100%;
  padding: 14px 16px;
}

.submit-button:hover {
  background-color: #2e40f5;
}
</style>
