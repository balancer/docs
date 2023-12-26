<script setup lang="ts">
import { ethers } from 'ethers';
import { useVeSystem } from '../../providers/veSystem';
import TokenCard from './TokenCard.vue';
import { onBeforeMount } from 'vue';
const { data: veSystems, fetch } = useVeSystem();

onBeforeMount(() => {
  fetch();
});
</script>

<template>
  <section class="section-container">
    <div class="card-container">
      <TokenCard
        v-for="token in veSystems"
        :key="token.id"
        :name="token.id"
        :vestedToken="token.bptTokenName"
        :totalValueVested="ethers.formatEther(token.votingEscrow.lockedAmount)"
        :availableTokensForRewards="token.rewardDistributor.rewardNames || []"
      />
    </div>
  </section>
</template>

<style scoped>
.section-container {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
</style>
