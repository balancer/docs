<script setup lang="ts">
import Overview from './Overview.vue';
import Configuration from './Configuration.vue';
import Wallet from '../Navbar/Wallet.vue';
import { useTabs, Tab } from '../../providers/tabs';
import { useVeSystem } from '../../providers/veSystem';

const { tab, select } = useTabs();
const { selected: veSystem } = useVeSystem();
</script>

<template>
  <div class="network-select">
    <Wallet />
  </div>
  <div class="main-container">
    <div class="head-container">
      <div
        :class="{ tab: true, 'active-tab': tab === Tab.OVERVIEW }"
        @click="select(Tab.OVERVIEW)"
      >
        veSystem Overview
      </div>
      <div
        :class="{
          tab: true,
          'active-tab': tab === Tab.POOL_DETAILS,
          disabled: !veSystem,
        }"
        @click="veSystem && select(Tab.POOL_DETAILS)"
      >
        Pool Details
      </div>
    </div>

    <div v-show="tab === Tab.OVERVIEW" class="body-container">
      <Overview />
    </div>

    <div v-show="tab === Tab.POOL_DETAILS" class="body-container">
      <Configuration />
    </div>
  </div>
</template>

<style scoped>
.network-select {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.main-container {
  width: 100%;
  margin-top: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.dark .main-container {
  border: 1px solid #3e4c5a;
}

.head-container {
  height: 48px;
  width: 100%;
  background-color: #f8fafc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.dark .head-container {
  background-color: #1e293b;
}

.tab {
  font-size: 14px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  cursor: pointer;
  font-weight: bold;
}

.tab.active-tab {
  background-color: #eaf0f6;
  border-radius: 6px;
  color: #384aff;
}

.dark .tab.active-tab {
  background-color: #384aff;
  color: #ffffff;
}
.body-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.tab.disabled {
  cursor: not-allowed;
}
</style>
