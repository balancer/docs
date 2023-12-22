<script setup lang="ts">
import { ref } from 'vue';
import { useWeb3ModalProvider } from '@web3modal/ethers/vue';
import { useNetwork } from '../../../providers/network';
import { useController } from '../../../utils/RewardsDistributionController';
import { useVeSystem } from '../../../providers/veSystem';

const { walletProvider } = useWeb3ModalProvider();
const { selected: veSystem } = useVeSystem();
const { network } = useNetwork();
const { addAllowedRewardTokens } = useController({
  walletProvider,
  network,
  veSystem,
});

const token = ref<string>('');
const isLoading = ref<boolean>(false);

const submit = async () => {
  if (token.value === undefined) return;

  await addAllowedRewardTokens.value?.([token.value], {
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
      token.value = '';
    },
    onError: err => {
      console.log('err', err);
      isLoading.value = false;
    },
  });
};
</script>

<template>
  <div key="newReward" class="item-row">
    <p class="item-name">Set Available Rewards</p>
    <div class="item-action">
      <div class="input-group">
        <input
          v-model="token"
          placeholder="0xa0b...6eb48"
          type="text"
          class="input"
        />
      </div>
      <button
        class="submit-button"
        :disabled="token === '' || isLoading"
        @click="submit()"
      >
        {{ isLoading ? 'Setting...' : 'Set' }}
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

.item-row .input-group {
  height: 100%;
  width: calc(100% - 70px);
}

.item-row .input-group .input {
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

.dark .item-row .input-group .input {
  border: 1px solid #3e4c5a;
}

.item-row .input-group .input:focus {
  border: 1px solid #384aff;
}

.submit-button {
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
}

.dark .submit-button {
  background-color: #384aff;
}
.submit-button:disabled {
  background-color: rgba(56, 74, 255, 0.2);
  cursor: not-allowed;
}
</style>