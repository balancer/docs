<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useVeSystem } from '../../providers/veSystem';
import { VeSystem, secondsToDate } from '../../utils';
import { useWeb3ModalProvider } from '@web3modal/ethers/vue';
import { useNetwork } from '../../providers/network';
import { useController } from '../../utils/VotingEscrowController';
import { useController as useTokenController } from '../../utils/TokenController';
import LockModal from './LockModal.vue';
import { ethers } from 'ethers';

const { walletProvider } = useWeb3ModalProvider();
const { network } = useNetwork();
const { selected: veSystem } = useVeSystem();
const { createLock } = useController({
  walletProvider,
  network,
  veSystem,
});

const { allowance, approve } = useTokenController({
  walletProvider,
  network,
});

const tokenAllowance = ref<number>(0);

const fetchAllowance = async (ve: VeSystem) => {
  const result = await allowance.value?.(ve.bptToken, ve.votingEscrow.address);

  tokenAllowance.value = result ? parseFloat(ethers.formatEther(result)) : 0;
};

watch(veSystem, async ve => {
  if (!ve) return;

  await fetchAllowance(ve);
});

const isLoadingLock = ref<boolean>(false);
const isLoadingApprove = ref<boolean>(false);
const isLockModalOpen = ref<boolean>(false);

const handleLockModalClose = () => {
  isLockModalOpen.value = false;
};

const handleLockModalOpen = () => {
  isLockModalOpen.value = true;
};

const handleApprove = async (amount: number) => {
  if (!veSystem.value) return;

  await approve.value?.(
    {
      token: veSystem.value.bptToken,
      amount: ethers.parseEther(amount.toString()),
      spender: veSystem.value.votingEscrow.address,
    },
    {
      onPrompt: () => {
        console.log('onPrompt');
      },
      onSubmitted: ({ tx }) => {
        console.log('onSubmitted', tx);
        isLoadingApprove.value = true;
      },
      onSuccess: async ({ receipt }) => {
        console.log('onSuccess', receipt);
        veSystem.value && (await fetchAllowance(veSystem.value));
        isLoadingApprove.value = false;
      },
      onError: err => {
        console.log('err', err);
        isLoadingApprove.value = false;
      },
    }
  );
};

const handleLock = async (amount: number, lockTime: number) => {
  console.log('create lock', amount, lockTime);

  await createLock.value?.(
    {
      value: ethers.parseEther(amount.toString()),
      lockTime: ethers.toBigInt(lockTime),
    },
    {
      onPrompt: () => {
        console.log('onPrompt');
        isLockModalOpen.value = false;
      },
      onSubmitted: ({ tx }) => {
        console.log('onSubmitted', tx);
        isLoadingLock.value = true;
      },
      onSuccess: async ({ receipt }) => {
        console.log('onSuccess', receipt);
        isLoadingLock.value = false;
      },
      onError: err => {
        console.log('err', err);
        isLoadingLock.value = false;
      },
    }
  );
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
          <LockModal
            :open="isLockModalOpen"
            :onClose="handleLockModalClose"
            :onSubmit="handleLock"
            :allowance="tokenAllowance"
            :onApprove="handleApprove"
            :isLoadingApprove="isLoadingApprove"
          />
          <button
            class="btn"
            :disabled="isLoadingLock"
            @click="handleLockModalOpen"
          >
            {{ isLoadingLock ? 'Locking...' : 'Lock' }}
          </button>
        </div>
        <div>
          <button class="btn">Withdraw</button>
        </div>
        <div>
          <button class="btn">Claim</button>
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
.item-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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
