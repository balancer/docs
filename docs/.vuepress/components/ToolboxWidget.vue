<script setup>
import { ref } from 'vue';

const selectedPage = ref('sor');
</script>
<template>
  <div class="ToolboxWidget">
    <ToolboxWidgetNav
      :selectedPage="selectedPage"
      :onPageSelect="$page => (selectedPage = $page)"
    />
    <div class="ToolboxWidget__content">
      <PoolsView v-if="selectedPage === 'pools'" />
      <SmartOrderRouterView v-if="selectedPage === 'sor'" />
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0;
}

.ToolboxWidget {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.dark .ToolboxWidget {
  background-color: #1e293b;
}

.ToolboxWidget__content {
  padding: 24px;
}
</style>
