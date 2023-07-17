<script setup>
import { ref } from 'vue';
import SwapForm from './SwapForm.vue';
import JoinForm from './JoinForm.vue';
import ExitForm from './ExitForm.vue';

defineProps({
  pool: {
    type: Object,
    required: true,
  },
});

const activeTab = ref('swap');
</script>
<template>
  <div class="card">
    <div class="tabs">
      <button
        :class="`tab ${activeTab === 'swap' ? 'tab--active' : null}`"
        @click="activeTab = 'swap'"
      >
        Swap
      </button>
      <button
        :class="`tab ${activeTab === 'join' ? 'tab--active' : null}`"
        @click="activeTab = 'join'"
      >
        Join
      </button>
      <button
        :class="`tab ${activeTab === 'exit' ? 'tab--active' : null}`"
        @click="activeTab = 'exit'"
      >
        Exit
      </button>
    </div>
    <div style="padding: 16px 0">
      <SwapForm v-if="activeTab === 'swap'" :pool="pool" />
      <JoinForm v-if="activeTab === 'join'" :pool="pool" />
      <ExitForm v-if="activeTab === 'exit'" :pool="pool" />
    </div>
  </div>
</template>
<style scoped>
.card {
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #fff;
  padding: 0 16px;
}

.tabs {
  align-items: center;
  display: flex;
}

.tab {
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #e2e8f0;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  padding: 16px 0;
  width: 100%;
}

.tab:not(.tab--active):hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
}

.tab--active {
  color: #384aff;
  border-color: #384aff;
}
</style>
