<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

defineProps({
  selectedToken: {
    type: Object,
    required: true,
  },
  tokens: {
    type: Array,
    defaultValue: [],
  },
  onChange: {
    type: Function,
  },
});
</script>
<template>
  <Listbox :defaultValue="selectedToken" @update:model-value="onChange">
    <div class="asset-select">
      <ListboxButton
        :class="`asset-select__button ${
          tokens?.length > 0 ? '' : 'asset-select__button--disabled'
        }`"
      >
        <Avatar
          :address="selectedToken.address"
          :imageURL="`https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/${selectedToken.address}.png`"
          :size="20"
        />
        <span>{{ selectedToken.symbol }}</span>
        <svg
          v-if="tokens"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="asset-select__button-arrow"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </ListboxButton>
      <ListboxOptions v-if="tokens" class="asset-select__options">
        <ListboxOption
          v-for="token in tokens"
          :key="token.address"
          :value="token"
          class="asset-select__option"
        >
          <Avatar
            :address="token.address"
            :imageURL="`https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/${token.address}.png`"
            :size="20"
          />
          <span>{{ token.symbol }}</span>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
<style scoped>
ul {
  padding: 0;
  margin: 0;
}

.asset-select__button {
  background-color: #fff;
  border: 1px solid #eaf0f6;
  display: inline-flex;
  padding: 12px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  gap: 8px;
  width: 125px;
  cursor: pointer;
}

.dark .asset-select__button {
  background-color: #475569;
  border-color: transparent;
}

.asset-select__button--disabled {
  cursor: not-allowed;
}

.asset-select__button span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.asset-select {
  position: relative;
}

.asset-select__button img {
  height: 20px;
  width: 20px;
  border-radius: 99px;
  display: block;
}

.asset-select__button span {
  flex: 1;
  text-align: left;
}

.asset-select__button-arrow {
  color: #94a3b8;
  display: block;
  width: 16px;
  height: 16px;
}

.asset-select__options {
  position: absolute;
  left: 0;
  overflow: hidden;
  width: 200px;
  margin-top: 10px;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 99;
  background-color: #fff;
}

.dark .asset-select__options {
  background-color: #475569;
}

.asset-select__option {
  align-items: center;
  display: flex;
  padding: 12px 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  gap: 8px;
}

.asset-select__option:hover {
  background-color: #f8fafc;
}
.dark .asset-select__option:hover {
  background-color: #334155;
}

.asset-select__option span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.asset-select__option img {
  height: 20px;
  width: 20px;
  border-radius: 99px;
  display: block;
}
</style>
