<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useVeSystem } from '../../../providers/veSystem';
import { useTabs, Tab } from '../../../providers/tabs';
import { ethers } from 'ethers';
import TokenCard from '../TokenCard.vue';

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
  <section class="section-container">
    <div class="card-container">
      <p>{{ isLoading ? 'loading' : '' }}</p>
      <div v-for="veSystem in veSystems" :key="veSystem.id">
        <TokenCard
          :name="veSystem.id"
          :vestedToken="veSystem.bptTokenName"
          :totalValueVested="
            ethers.formatEther(veSystem.votingEscrow.lockedAmount)
          "
          :availableTokensForRewards="
            veSystem.rewardDistributor.rewardTokens.map(rt => rt.name) || []
          "
        />
        <div class="group-buttons">
          <button class="btn-rewards" @click="showRewards(veSystem.id)">
            Rewards Distribution
          </button>
          <button class="btn-config" @click="showConfig(veSystem.id)">
            Pool configuration
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.group-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  max-width: 560px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 90%;
  margin-inline: auto;
}
.group-buttons .btn-rewards,
.group-buttons .btn-config {
  width: 150px;
  height: 40px;
  border-radius: 6px;
  border: none;
  background-color: #eaf0f6;
  font-weight: 600;
  cursor: pointer;
}

.dark .group-buttons .btn-rewards,
.dark .group-buttons .btn-config {
  background-color: #384aff;
}
</style>