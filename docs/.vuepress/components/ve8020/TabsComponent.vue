<script setup>
import Launchpad from './Launchpad.vue';
</script>

<template>
  <div class="main-container">
    <div class="head-container">
      <div
        :class="{ tab: true, 'active-tab': activeTab === 1 }"
        @click="showTab(1)"
      >
        Launchpad
      </div>
      <div
        :class="{ tab: true, 'active-tab': activeTab === 2 }"
        @click="showTab(2)"
      >
        veSystem Overview
      </div>
      <div
        :class="{ tab: true, 'active-tab': activeTab === 3 }"
        @click="showTab(3)"
      >
        veSystem config
      </div>
    </div>

    <div v-show="activeTab === 1">
      <Launchpad />
    </div>

    <div v-show="activeTab === 2">
      <template2 />
    </div>

    <div v-show="activeTab === 3">
      <template3 />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 1,
    };
  },
  methods: {
    showTab(tabNumber) {
      this.activeTab = tabNumber;
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 100%;
  margin-top: 16px;
  border: 1px solid #3e4c5a;
  border-radius: 6px;
}

.head-container {
  height: 48px;
  width: 100%;
  background-color: #1e293b;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  background-color: #384aff;
  border-radius: 6px;
}
</style>
