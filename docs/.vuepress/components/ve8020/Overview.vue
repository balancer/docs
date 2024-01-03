<script setup lang="ts">
import { ethers } from 'ethers';
import { useVeSystem } from '../../providers/veSystem';
import TokenCard from './TokenCard.vue';
import { onBeforeMount, ref } from 'vue';
const {
  data: veSystems,
  fetch,
  updateByTokenAddress,
  isLoading,
} = useVeSystem();

const searchTerm = ref<string>('');

onBeforeMount(() => {
  fetch();
});

const handleSearch = async () => {
  if (searchTerm.value !== '') {
    await updateByTokenAddress(searchTerm.value);
  } else {
    await fetch();
  }
};
</script>

<template>
  <section class="section-container">
    <section class="section-head">
      <div class="address-group">
        <div class="input-group">
          <svg width="16" height="16" class="icon">
            <use href="/images/search.svg#icon"></use>
          </svg>
          <input
            v-model="searchTerm"
            class="input"
            placeholder="Search by vested token address "
          />
        </div>
      </div>
      <button
        class="search-btn btn"
        :disabled="isLoading"
        @click="handleSearch"
      >
        Search
      </button>
    </section>
    <section class="section-body">
      <TokenCard
        v-for="token in veSystems"
        :key="token.id"
        :name="token.id"
        :vestedToken="token.bptTokenName"
        :totalValueVested="ethers.formatEther(token.votingEscrow.lockedAmount)"
        :availableTokensForRewards="token.rewardDistributor.rewardNames || []"
      />
    </section>
  </section>
</template>

<style scoped>
.section-container {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.section-head {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}
.dark .section-head {
  border-bottom: 1px solid #3e4c5a;
}

.section-head .address-group {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 30px;
  width: 100%;
  justify-content: flex-end;
}

.section-head .address-group .icon {
  position: absolute;
  top: 7px;
  left: 10px;
  fill: #eaf0f6;
}

.dark .section-head .address-group .icon {
  fill: #3e4c5a;
}

.section-head .address-group .input-group {
  height: 100%;
  position: relative;
  max-width: 250px;
  width: 100%;
}

.section-head .address-group .input {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  padding-left: 35px;
  font-size: 14px;
  outline: none;
}

.dark .section-head .address-group .input {
  border: 1px solid #3e4c5a;
}

.section-head .btn {
  height: 30px;
  min-width: 100px;
  background-color: #384aff;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}

.section-head .btn:disabled {
  background-color: rgba(56, 74, 255, 0.2);
  cursor: not-allowed;
  color: #e2e8f0;
}

.dark .section-head .btn:disabled {
  color: #3e4c5a;
}

.section-body {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 800px;
  overflow: auto;
}
</style>
