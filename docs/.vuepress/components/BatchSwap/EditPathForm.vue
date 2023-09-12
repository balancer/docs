<script setup>
import { computed } from 'vue';
import { useTokens } from '../../providers/tokens';
import Avatar from '../Avatar.vue';
import InputLabel from '../InputLabel.vue';
import Input from '../Input.vue';
import HopForm from './HopForm.vue';
import { Select, SelectTrigger, SelectOptions } from '../Select';

const props = defineProps({
  path: {
    type: Object,
    required: true,
  },
  swapKind: {
    type: Number,
    required: true,
  },
  onAmountChange: {
    type: Function,
    required: true,
  },
  onTokenInChange: {
    type: Function,
    required: true,
  },
  onPoolChange: {
    type: Function,
    required: true,
  },
  onTokenOutChange: {
    type: Function,
    required: true,
  },
  onAddHop: {
    type: Function,
    required: true,
  },
  onDeleteHop: {
    type: Function,
    required: true,
  },
});

const { tokens, getToken, searchTokens } = useTokens();

const tokenIn = computed(() => {
  if (!props.path.tokenIn) {
    return null;
  }

  return getToken(props.path.tokenIn);
});
</script>
<template>
  <div class="edit-path-form">
    <div>
      <InputLabel>Amount {{ swapKind === 0 ? 'In' : 'Out' }}</InputLabel>
      <Input
        type="text"
        :modelValue="path.amount"
        @input="event => onAmountChange(event.target.value)"
      />
    </div>
    <div>
      <InputLabel>Token In</InputLabel>
      <Select
        :value="path.tokenIn ? getToken(path.tokenIn) : null"
        :onChange="newValue => onTokenInChange(newValue.address)"
      >
        <SelectTrigger :value="path.tokenIn" placeholder="Select Token">
          <Avatar
            v-if="tokenIn"
            :address="tokenIn.address"
            :imageURL="tokenIn.logoURI"
            :size="20"
          />
          <span v-if="tokenIn">{{ tokenIn.symbol }}</span>
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
    <div v-for="(hop, hopIndex) in path.hops" :key="hopIndex">
      <HopForm
        :hop="hop"
        :hopIndex="hopIndex"
        :prevToken="
          hopIndex === 0 ? path.tokenIn : path.hops[hopIndex - 1].tokenOut
        "
        :onPoolChange="onPoolChange"
        :onTokenOutChange="onTokenOutChange"
        :onDeleteHop="onDeleteHop"
      />
    </div>
    <button class="add-hop-button" @click="onAddHop">
      <span>Add Hop</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
        />
      </svg>
    </button>
  </div>
</template>
<style scoped>
.edit-path-form > * + * {
  margin-top: 20px;
}

.add-hop-button {
  align-items: center;
  background-color: #eff6ff;
  border: 0;
  border-radius: 6px;
  font-size: 14px;
  justify-content: space-between;
  line-height: 20px;
  font-weight: 600;
  text-align: left;
  color: #2563eb;
  display: flex;
  padding: 8px 10px;
  width: 100%;
}

.dark .add-hop-button {
  background-color: #384aff;
  color: #fff;
}

.add-hop-button svg {
  height: 20px;
  width: 20px;
}

.add-hop-button:hover {
  background-color: #dbeafe;
  color: #2563eb;
}

.dark .add-hop-button:hover {
  background-color: #2436eb;
  color: #fff;
}
</style>
