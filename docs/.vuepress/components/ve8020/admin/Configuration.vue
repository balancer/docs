<script setup lang="ts">
import { computed } from 'vue';
import { useVeSystem } from '../../../providers/veSystem';

const { selected: veSystem } = useVeSystem();

const formFields = computed(() => {
  return [
    {
      label: 'Underlying 8020 BPT address',
      placeholder: 'B-GNO80-WETH20',
      name: 'bptAddress',
      value: veSystem.value?.bptToken,
    },
    {
      label: 'veToken Name',
      placeholder: 'Voting Escrow Balancer 80 GNO',
      name: 'veTokenName',
      value: veSystem.value?.votingEscrow.name,
    },
    {
      label: 'veToken Symbol',
      placeholder: 'veGNO80-WETH20',
      name: 'veTokenSymbol',
      value: veSystem.value?.votingEscrow.symbol,
    },
    {
      label: 'Factory used',
      placeholder: '0x67c3...9a65c',
      name: 'factoryUsed',
      value: '',
    },
    {
      label: 'Rewards Distribution Address',
      placeholder: '0x67c3...9a65c',
      name: 'rewardsAddress',
      value: veSystem.value?.rewardDistributorAddress,
    },
    {
      label: 'Distribution Start-time',
      type: 'date',
      name: 'distribution',
      value: veSystem.value?.rewardDistributor.rewardStartTime?.toString(),
    },
    {
      label: 'Supply % vested',
      placeholder: '37%',
      name: 'supplyVested',
      value: '',
    },
    {
      label: 'Rewards Distribution Admin',
      placeholder: '0xb76f3...987b5',
      name: 'rewardsDistribution',
      value: veSystem.value?.admin,
    },
  ];
});
</script>

<template>
  <main class="section-container">
    <section class="section-body">
      <div v-for="field in formFields" :key="field.label" class="item-row">
        <p class="item-name">{{ field.label }}</p>
        <div class="input-group">
          <input
            :value="field.value"
            :placeholder="field.placeholder"
            type="text"
            class="input"
            disabled="true"
          />
        </div>
      </div>
      <article class="group-btn">
        <button class="lock-button btn">Lock</button>
        <button class="claim-button btn">Claim</button>
      </article>
    </section>
  </main>
</template>

<style scoped>
.section-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.section-head {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dark .section-head {
  border-bottom: 1px solid #3e4c5a;
}

.section-head .address-group {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 30px;
}

.section-head .address-group .text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.section-head .address-group .input-group {
  height: 100%;
  position: relative;
}

.section-head .address-group .input {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  max-width: 340px;
  padding-left: 30px;
  font-size: 14px;
  outline: none;
}

.dark .section-head .address-group .input {
  border: 1px solid #3e4c5a;
}
.item-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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

.section-body {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item-row .item-name {
  width: 50%;
  max-width: 350px;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.item-row .input-group {
  display: flex;
  align-items: center;
  height: 45px;
  width: 50%;
}

.item-row .input-group .input {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  max-width: 340px;
  padding-inline: 20px;
  font-size: 14px;
  outline: none;
}

.dark .item-row .input-group .input {
  border: 1px solid #3e4c5a;
}

.item-row .input-group .input:focus {
  border: 1px solid #384aff;
}

.group-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn {
  width: 180px;
  height: 40px;
  background-color: #384aff;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
}
</style>
