<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useWeb3ModalProvider } from '@web3modal/ethers/vue';
import { useNetwork } from '../../../providers/network';
import { useController } from '../../../utils/RewardsDistributionController';
import { useVeSystem } from '../../../providers/veSystem';
import { ethers, toBigInt } from 'ethers';
import Selector from './Selector.vue';
import { getSelectorTokenItems } from '../../../utils';

const { walletProvider } = useWeb3ModalProvider();
const { selected: veSystem } = useVeSystem();
const { network } = useNetwork();
const { tokenAllowance, approveToken, depositToken } = useController({
  walletProvider,
  network,
  veSystem,
});

const token = ref<string>('');
const decimals = ref<string>('');
const inputAmount = ref<string>('');
const allowance = ref<bigint>(toBigInt(0));
const isLoading = ref<boolean>(false);

const amount = computed<bigint>(() => {
  if (inputAmount.value === '') return toBigInt(0);

  return ethers.parseUnits(inputAmount.value.toString(), decimals.value);
});

const isAllowanceEnough = computed<boolean>(
  () => allowance.value >= amount.value
);

const showApprove = computed<boolean>(
  () =>
    inputAmount.value !== '' && token.value !== '' && !isAllowanceEnough.value
);

const fetchAllowance = async () => {
  const tokenAllowanceResult = await tokenAllowance.value?.(token.value);

  console.log('allowance: ', tokenAllowanceResult);

  allowance.value = tokenAllowanceResult || toBigInt(0);
};

watch(token, async value => {
  if (value === '') return;

  await fetchAllowance();
});

watch(amount, value => console.log('amount: ', value));

// set token address and decimals
const handleSelectToken = (address: string) => {
  if (!veSystem.value) return;

  const rewardToken = veSystem.value.rewardDistributor.rewardTokens.find(
    rt => rt.address === address
  );

  if (!rewardToken) return;

  token.value = address;

  decimals.value = rewardToken.decimals;
};

const handleSubmit = async () => {
  console.log('submit');

  await depositToken.value?.(
    { token: token.value, amount: amount.value },
    {
      onPrompt: () => {
        console.log('prompt');
        isLoading.value = true;
      },
      onSubmitted: ({ tx }) => {
        console.log('submitted', tx);
      },
      onSuccess: ({ receipt }) => {
        console.log('success', receipt);
        isLoading.value = false;
        clearForm();
      },
      onError: err => {
        console.log('err', err);
        isLoading.value = false;
        clearForm();
      },
    }
  );
};

const clearForm = () => {
  inputAmount.value = '';
  token.value = '';
};

const handleApprove = async () => {
  await approveToken.value?.(
    { token: token.value, amount: amount.value },
    {
      onPrompt: () => {
        console.log('prompt');
        isLoading.value = true;
      },
      onSubmitted: ({ tx }) => {
        console.log('submitted', tx);
      },
      onSuccess: async ({ receipt }) => {
        console.log('success', receipt);
        isLoading.value = false;
        await fetchAllowance();
      },
      onError: err => {
        console.log('err', err);
        isLoading.value = false;
      },
    }
  );
};

const tokens = computed<[string, string][]>(() => {
  if (veSystem.value === undefined) return [];

  return getSelectorTokenItems(veSystem.value);
});
</script>

<template>
  <div key="currentWeek" class="item-row">
    <p class="item-name">Add Rewards into Current Week</p>
    <div class="item-action">
      <Selector
        prompt="Select Token"
        :items="tokens"
        :selected="token"
        :onChange="handleSelectToken"
      />
      <input
        v-model="inputAmount"
        placeholder="Amount"
        type="number"
        class="input-amount"
      />
      <button
        v-show="!showApprove"
        class="submit-button"
        :disabled="token === '' || inputAmount === '' || isLoading"
        @click="handleSubmit"
      >
        Add
      </button>
      <button
        v-show="showApprove"
        class="submit-button"
        :disabled="isLoading"
        @click="handleApprove"
      >
        Approve
      </button>
    </div>
  </div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
.item-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 700px;
  height: 45px;
  gap: 10px;
}

.item-row .item-name {
  width: 40%;
  max-width: 350px;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.item-row .item-action {
  display: flex;
  width: 60%;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.item-row .item-action .input-amount {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  position: relative;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  padding-inline: 20px;
  font-size: 14px;
  outline: none;
  display: flex;
  align-items: center;
}

.item-row .item-action .input-amount {
  width: 70px;
  padding-inline: 10px;
}

.dark .item-row .item-action .input-amount {
  border: 1px solid #3e4c5a;
}

.dark .item-row .item-action .input-amount:focus {
  border: 1px solid #384aff;
}

.submit-button {
  min-width: 75px;
  height: 45px;
  background-color: #eaf0f6;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;
  font-weight: 600;
  font-size: 14px;
  box-shadow: none;
  border: none;
}

.dark .submit-button {
  background-color: #384aff;
}
.submit-button:disabled {
  background-color: rgba(56, 74, 255, 0.2);
  cursor: not-allowed;
}
</style>
