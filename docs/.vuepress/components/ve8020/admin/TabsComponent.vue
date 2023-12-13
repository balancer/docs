<script setup>
import Launchpad from '../Launchpad.vue';
import Configuration from '../Configuration.vue';
import Wallet from '../../Navbar/Wallet.vue';
</script>

<template>
  <div class="network-select">
    <Wallet />
  </div>
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
        Admin Pools
      </div>
      <div
        :class="{ tab: true, 'active-tab': activeTab === 3 }"
        @click="showTab(3)"
      >
        veSystem config
      </div>
      <div
        :class="{ tab: true, 'active-tab': activeTab === 4 }"
        @click="showTab(4)"
      >
        Rewards Distribution
      </div>
    </div>

    <div v-show="activeTab === 1" class="body-container">
      <Launchpad />
    </div>

    <div v-show="activeTab === 2" class="body-container">
      <p>Admin Pools</p>
    </div>

    <div v-show="activeTab === 3" class="body-container">
      <Configuration />
    </div>

    <div v-show="activeTab === 4" class="body-container">
      <p>Rewards Distribution</p>
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
</style>
