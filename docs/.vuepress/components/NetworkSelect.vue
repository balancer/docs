<script setup>
import { defineProps } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

defineProps({
  networks: {
    type: Array,
    required: true,
  },
  selectedNetwork: {
    type: Object,
    required: true,
  },
  onChange: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <Listbox
    :defaultValue="selectedNetwork"
    class="NetworkSelect"
    @update:model-value="$value => onChange($value)"
  >
    <div>
      <ListboxButton class="NetworkSelect__button">
        <img
          :alt="selectedNetwork.name + ' logo'"
          :src="selectedNetwork.logo"
        />
        <span>{{ selectedNetwork.name }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="NetworkSelect__button-arrow"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </ListboxButton>
      <ListboxOptions class="NetworkSelect__menu">
        <ListboxOption
          v-for="network in networks"
          :key="network.id"
          :class="`NetworkSelect__item ${
            network.id === selectedNetwork.id
              ? 'NetworkSelect__item--active'
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
            class="NetworkSelect__item-check"
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
p {
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
}

.NetworkSelect {
  position: relative;
}

.NetworkSelect__button {
  display: inline-flex;
  align-items: center;
  padding: 10px;
  border: 0;
  background-color: #334155;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  gap: 10px;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border-radius: 99px;
  cursor: pointer;
}

.NetworkSelect__button span {
  display: none;
  flex: 1;
}

.NetworkSelect__button:hover {
  background-color: #334155;
}

.NetworkSelect__button img {
  width: 32px;
  height: 32px;
}

.NetworkSelect__button-arrow {
  display: none;
  width: 20px;
  height: 20px;
  opacity: 0.75;
}

.NetworkSelect__button:hover .NetworkSelect__button-arrow {
  opacity: 1;
}

.NetworkSelect__menu {
  position: absolute;
  right: 0;
  overflow: hidden;
  width: 200px;
  margin-top: 10px;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 99;
}

.NetworkSelect__item {
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

.NetworkSelect__item:hover {
  background-color: #0f172a;
}

.NetworkSelect__item img {
  width: 32px;
  height: 32px;
}

.NetworkSelect__item span {
  flex: 1;
}

.NetworkSelect__item-check {
  width: 16px;
  height: 16px;
  opacity: 0;
}

.NetworkSelect__item--active .NetworkSelect__item-check {
  opacity: 1;
}

@media (min-width: 1024px) {
  .NetworkSelect__button {
    width: 200px;
    border-radius: 6px;
  }
  .NetworkSelect__button span {
    display: block;
  }

  .NetworkSelect__button-arrow {
    display: block;
  }
}
</style>
