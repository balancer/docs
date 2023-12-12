<script setup>
import { ethers } from 'ethers';
import { useLaunchpad } from '../../providers/launchpad';
import TokenCard from './TokenCard.vue';
const { data: veSystems } = useLaunchpad();
</script>

<template>
  <section class="section-container">
    <div class="card-container">
      <TokenCard
        v-for="(token, index) in veSystems"
        :key="index"
        :name="token.id"
        :vestedToken="token.bptTokenName"
        :totalValueVested="ethers.formatEther(token.votingEscrow.lockedAmount)"
        :availableTokensForRewards="token.rewardDistributor.rewardTokens"
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
