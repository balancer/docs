<script setup lang="ts">
import SetAvailableRewardsForm from './SetAvailableRewardsForm.vue';
import AddRewardsCurrentWeek from './AddRewardsCurrentWeek.vue';
import AddRewardsNWeeks from './AddRewardsNWeeks.vue';
import AddRewardsExactWeek from './AddRewardsExactWeek.vue';
import { ref, computed } from 'vue';
import AvailableRewardsModal from './AvailableRewardsModal.vue';
import { useVeSystem } from '../../../providers/veSystem';
import { ethers } from 'ethers';

const { selected: veSystem } = useVeSystem();

const isModalOpen = ref<boolean>(false);

const handleCloseAvailableRewardsModal = () => {
  isModalOpen.value = false;
};

const handleOpenAvailableRewardsModal = () => {
  isModalOpen.value = true;
};

const availableRewards = computed(() => {
  if (!veSystem.value) return [];

  return veSystem.value.rewardDistributor.rewardTokens.map(rt => ({
    token: rt.name,
    amount: ethers.formatUnits(rt.availableRewardAmount || '0', rt.decimals),
  }));
});
</script>

<template>
  <div class="section-container">
    <SetAvailableRewardsForm />
    <AddRewardsCurrentWeek />
    <AddRewardsNWeeks />
    <AddRewardsExactWeek />
  </div>
  <div class="btn-group">
    <button class="available-button" @click="handleOpenAvailableRewardsModal">
      Available Rewards
    </button>
  </div>
  <AvailableRewardsModal
    :open="isModalOpen"
    :onClose="handleCloseAvailableRewardsModal"
    :rewards="availableRewards"
  >
  </AvailableRewardsModal>
</template>

<style scoped>
.section-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
  margin-top: 16px;
}
.btn-group {
  margin-top: 30px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  max-width: 700px;
  height: 45px;
}
.available-button {
  width: 60px;
  height: 45px;
  background-color: #eaf0f6;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;
  font-weight: 600;
  font-size: 14px;
  box-shadow: none;
  border: none;
  width: 180px;
}
.dark .available-button {
  background-color: #384aff;
}
.available-button:disabled {
  background-color: rgba(56, 74, 255, 0.2);
  cursor: not-allowed;
}
</style>
