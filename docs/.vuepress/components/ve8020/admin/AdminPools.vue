<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useVeSystem } from '../../../providers/veSystem';
import { useTabs, Tab } from '../../../providers/tabs';

const { data: veSystems, fetch, select, isLoading } = useVeSystem();
const { select: selectTab } = useTabs();

onBeforeMount(() => {
  fetch();
});

const showConfig = async (id: string) => {
  await select(id);
  selectTab(Tab.VE_SYSTEM_CONFIG);
};

const showRewards = async (id: string) => {
  await select(id);
  selectTab(Tab.REWARDS_DISTRIBUTION);
};
</script>

<template>
  <p>{{ isLoading ? 'loading' : '' }}</p>
  <ul>
    <li
      v-for="veSystem in veSystems"
      :key="veSystem.id"
      @click="select(veSystem.id)"
    >
      {{ veSystem.bptTokenName }}
      |
      <button @click="showConfig(veSystem.id)">Config</button>
      |
      <button @click="showRewards(veSystem.id)">Rewards Distribution</button>
    </li>
  </ul>
</template>