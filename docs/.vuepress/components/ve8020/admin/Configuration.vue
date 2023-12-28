<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useVeSystem } from '../../../providers/veSystem';
import { CONTRACT_ADDRESS } from '../../../utils/LaunchpadController';
import { secondsToDate } from '../../../utils';
import UnlockAllModal from './UnlockAllModal.vue';
import EarlyUnlockModal from './EarlyUnlockModal.vue';
import { useWeb3ModalProvider } from '@web3modal/ethers/vue';
import { useNetwork } from '../../../providers/network';
import { useController } from '../../../utils/VotingEscrowController';

const { walletProvider } = useWeb3ModalProvider();
const { network } = useNetwork();
const { selected: veSystem } = useVeSystem();
const { allUnlock, setAllUnlock, earlyUnlock, setEarlyUnlock } = useController({
  walletProvider,
  network,
  veSystem,
});

const allUnlockStatus = ref<boolean>(false);
const earlyUnlockStatus = ref<boolean>(false);

const isLoading = ref<boolean>(false);
const isUnlockAllModalOpen = ref<boolean>(false);
const isEarlyUnlockModalOpen = ref<boolean>(false);
const isLoadingEarlyUnlock = ref<boolean>(false);

watch(veSystem, async () => {
  await fetchUnlockStatus();
  await fetchEarlyUnlockStatus();
});

const fetchUnlockStatus = async () => {
  const allUnlockResult = await allUnlock.value?.();

  allUnlockStatus.value = allUnlockResult ?? false;
};

const fetchEarlyUnlockStatus = async () => {
  const result = await earlyUnlock.value?.();

  earlyUnlockStatus.value = result ?? false;
};

const handleUnlockModalClose = () => {
  isUnlockAllModalOpen.value = false;
};

const handleUnlockModalOpen = () => {
  isUnlockAllModalOpen.value = true;
};

const handleEarlyUnlockModalClose = () => {
  isEarlyUnlockModalOpen.value = false;
};

const handleEarlyUnlockModalOpen = () => {
  isEarlyUnlockModalOpen.value = true;
};

const handleEarlyUnlock = async () => {
  await setEarlyUnlock.value?.(!earlyUnlockStatus.value, {
    onPrompt: () => {
      console.log('onPrompt');
      isEarlyUnlockModalOpen.value = false;
    },
    onSubmitted: ({ tx }) => {
      console.log('onSubmitted', tx);
      isLoadingEarlyUnlock.value = true;
    },
    onSuccess: async ({ receipt }) => {
      console.log('onSuccess', receipt);
      isLoadingEarlyUnlock.value = false;
      fetchEarlyUnlockStatus();
    },
    onError: err => {
      console.log('err', err);
      isLoadingEarlyUnlock.value = false;
    },
  });
};

const handleUnlock = async () => {
  await setAllUnlock.value?.({
    onPrompt: () => {
      console.log('onPrompt');
    },
    onSubmitted: ({ tx }) => {
      console.log('onSubmitted', tx);
      isUnlockAllModalOpen.value = false;
      isLoading.value = true;
    },
    onSuccess: async ({ receipt }) => {
      console.log('onSuccess', receipt);
      isLoading.value = false;
      fetchUnlockStatus();
    },
    onError: err => {
      console.log('err', err);
      isLoading.value = false;
    },
  });
};

const formFields = computed(() => {
  const startTime = veSystem.value
    ? secondsToDate(
        parseInt(veSystem.value.rewardDistributor.rewardStartTime.toString())
      ).toLocaleDateString()
    : '';

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
      label: 'Launchpad Address',
      placeholder: '0x67c3...9a65c',
      name: 'factoryUsed',
      value: CONTRACT_ADDRESS,
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
      value: startTime,
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
        <div>
          <UnlockAllModal
            :open="isUnlockAllModalOpen"
            :onClose="handleUnlockModalClose"
            :onUnlock="handleUnlock"
          />
          <p>Status: {{ allUnlockStatus }}</p>
          <button
            class="btn"
            :disabled="allUnlockStatus || isLoading"
            @click="handleUnlockModalOpen"
          >
            {{ isLoading ? 'Unlocking...' : 'Unlock All' }}
          </button>
        </div>
        <div>
          <EarlyUnlockModal
            :open="isEarlyUnlockModalOpen"
            :onClose="handleEarlyUnlockModalClose"
            :onUnlock="handleEarlyUnlock"
            :earlyUnlock="earlyUnlockStatus"
          />
          <p>Status: {{ earlyUnlockStatus }}</p>
          <button
            class="btn"
            :disabled="isLoadingEarlyUnlock"
            @click="handleEarlyUnlockModalOpen"
          >
            {{ isLoadingEarlyUnlock ? 'Processing...' : 'Early Unlock' }}
          </button>
        </div>
        <div>
          <p>Early Penalty: 30</p>
          <button class="btn">Set Early Penalty</button>
        </div>
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

.btn:disabled {
  cursor: not-allowed;
  background-color: rgba(56, 74, 255, 0.2);
  color: grey;
}
</style>
