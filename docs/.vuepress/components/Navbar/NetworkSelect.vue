<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { NETWORKS } from '../../constants/networks';

import { useNetwork } from '../../providers/network';

const { network: selectedNetwork, selectNetwork } = useNetwork();
</script>
<template>
  <Listbox
    :defaultValue="selectedNetwork"
    class="network-select"
    @update:model-value="selectNetwork"
  >
    <div>
      <ListboxButton class="network-select__trigger">
        <img
          :alt="selectedNetwork.name + ' logo'"
          :src="selectedNetwork.logo"
        />
        <span>{{ selectedNetwork.name }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </ListboxButton>
      <ListboxOptions class="network-select__menu">
        <ListboxOption
          v-for="network in NETWORKS"
          :key="network.id"
          :class="`network-select__item ${
            network.id === selectedNetwork.id
              ? 'network-select__item--active'
              : ''
          }`"
          :value="network"
        >
          <img alt="{{ network.name }} }}" :src="network.logo" />
          <span>{{ network.name }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            />
          </svg>
        </ListboxOption>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
<style scoped>
ul {
  margin: 0;
  padding: 0;
}
.network-select {
  position: relative;
}

.network-select__trigger {
  align-items: center;
  background-color: #334155;
  border: 0;
  border-radius: 6px;
  color: #fff;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  line-height: 20px;
  padding: 8px;
  text-align: left;
  width: 180px;
}

.network-select__trigger img {
  height: 32px;
  width: 32px;
}

.network-select__trigger svg {
  height: 20px;
  width: 20px;
}

.network-select__trigger span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.network-select__menu {
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin-top: 10px;
  overflow: hidden;
  position: absolute;
  right: 0;
  width: 180px;
  z-index: 99;
}

.network-select__item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  padding-right: 12px;
  border: 0;
  background-color: #1e293b;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  gap: 10px;
  cursor: pointer;
}

.network-select__item:hover {
  background-color: #334155;
}

.network-select__item svg {
  height: 16px;
  width: 16px;
  opacity: 0;
}

.network-select__item--active svg {
  opacity: 1;
}

.network-select__item span {
  flex: 1;
}

.network-select__item img {
  height: 32px;
  width: 32px;
}
</style>
