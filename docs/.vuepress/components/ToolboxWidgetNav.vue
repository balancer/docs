<script setup>
import { defineProps } from 'vue';

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
    <div class="ToolboxWidgetNav__tabs">
      <button class="ToolboxWidgetNav__tab ToolboxWidgetNav__tab--active">
        Pools
      </button>
      <button class="ToolboxWidgetNav__tab">Batch Swap</button>
      <button class="ToolboxWidgetNav__tab">Smart Order Router (SOR)</button>
    </div>
    <NetworkSelect
      :networks="networks"
      :selectedNetwork="selectedNetwork"
      :onChange="onNetworkSelect"
    />
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
  padding: 12px 24px;
  background-color: #0f172a;
  color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.dark .ToolboxWidgetNav {
  background-color: #162031;
}

.ToolboxWidgetNav__tabs {
  align-items: center;
  display: flex;
  gap: 16px;
}

.ToolboxWidgetNav__tab {
  background-color: transparent;
  border: 1.5px solid #475569;
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 600;
  padding: 0;
  border-radius: 16px;
  padding: 8px 24px;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;
}

.ToolboxWidgetNav__tab:not(.ToolboxWidgetNav__tab--active):hover {
  background-color: #1e293b;
  border-color: #1e293b;
  color: #fff;
}

.ToolboxWidgetNav__tab--active {
  background-color: #384aff;
  border-color: #384aff;
  color: #fff;
}
</style>
