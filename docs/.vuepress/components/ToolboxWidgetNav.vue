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
  onNetworkSelect: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <div class="ToolboxWidgetNav">
    <div class="toolbox-pages">
      <button class="toolbox-page toolbox-page--active">Pools</button>
      <button class="toolbox-page">Batch Swap</button>
      <button class="toolbox-page">Smart Order Router (SOR)</button>
    </div>
    <NetworkSelect
      :networks="networks"
      :selectedNetwork="selectedNetwork"
      :onChange="onNetworkSelect"
    />
    <!--
      <div class="ToolboxWidgetNav__tabs">
      <button class="ToolboxWidgetNav__tab ToolboxWidgetNav__tab--active">
        Pools
      </button>
      <button class="ToolboxWidgetNav__tab">Batch Swap</button>
      <button class="ToolboxWidgetNav__tab">Smart Order Router (SOR)</button>
    </div>

   -->
  </div>
</template>
<style scoped>
p {
  margin: 0;
}
.ToolboxWidgetNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background-color: #0f172a;
  color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.dark .ToolboxWidgetNav {
  background-color: #162031;
}

.toolbox-pages {
  align-items: center;
  display: flex;
  gap: 12px;
}

.toolbox-page {
  background-color: transparent;
  color: #fff;
  height: 80px;
  border: 0;
  font-family: var(--font-family);
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  white-space: nowrap;
}

.toolbox-page::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  display: block;
  width: 100%;
  overflow: hidden;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  border-top: 4px solid #9333ea;
  transform: translate3d(0, -101%, 0);
  border-color: #fed533;
}

.toolbox-page:hover {
  color: #fed533;
}

.toolbox-page:hover::before {
  transform: translateZ(0);
}

.toolbox-page--active {
  color: #fed533;
}

.toolbox-page--active::before {
  transform: translateZ(0);
}

@media (min-width: 720px) {
  .toolbox-page {
    font-size: 12px;
  }
}

@media (min-width: 768px) {
  .toolbox-page {
    font-size: 14px;
  }
}
</style>
