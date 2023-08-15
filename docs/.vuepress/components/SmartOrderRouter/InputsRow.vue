<script setup>
import { useTokens } from '../../providers/tokens';
import { Select, SelectTrigger, SelectOptions } from '../Select';

const { tokens, searchTokens } = useTokens();

defineProps({
  amountIn: {
    type: String,
    required: true,
  },
  amountOut: {
    type: String,
    required: true,
  },
  onAmountInChange: {
    type: Function,
    required: true,
  },
  onAmountOutChange: {
    type: Function,
    required: true,
  },
  tokenIn: {
    type: Object,
    required: true,
  },
  tokenOut: {
    type: Object,
    required: true,
  },
  onTokenInChange: {
    type: Function,
    required: true,
  },
  onTokenOutChange: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <div class="inputs">
    <div>
      <InputLabel>Token In</InputLabel>
      <div class="input-with-select">
        <Input
          placeholder="0.0"
          :modelValue="amountIn"
          @input="onAmountInChange"
        />
        <div class="select">
          <Select :onChange="onTokenInChange" :value="tokenIn">
            <SelectTrigger :value="tokenIn.address" placeholder="Select Token">
              <Avatar
                :address="tokenIn.address"
                :imageURL="tokenIn.logoURI"
                :size="20"
              />
              <span>{{ tokenIn.symbol }}</span>
            </SelectTrigger>
            <SelectOptions
              v-slot="token"
              :options="tokens"
              optionKey="address"
              :searchFn="searchTokens"
            >
              <Avatar
                :address="token.address"
                :imageURL="token.logoURI"
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
          <Select :onChange="onTokenOutChange" :value="tokenOut">
            <SelectTrigger :value="tokenOut.address" placeholder="Select Token">
              <Avatar
                :address="tokenOut.address"
                :imageURL="tokenOut.logoURI"
                :size="20"
              />
              <span>{{ tokenOut.symbol }}</span>
            </SelectTrigger>
            <SelectOptions
              v-slot="token"
              :options="tokens"
              optionKey="address"
              :searchFn="searchTokens"
            >
              <Avatar
                :address="token.address"
                :imageURL="token.logoURI"
                :size="20"
              />
              <span>{{ token.symbol }}</span>
            </SelectOptions>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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

.inputs {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 24px;
}
</style>
