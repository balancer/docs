<script setup lang="ts">
import { ref, computed } from 'vue';
import { useWeb3ModalProvider } from '@web3modal/ethers/vue';
import { useNetwork } from '../../../providers/network';
import { useController } from '../../../utils/RewardsDistributionController';
import { useVeSystem } from '../../../providers/veSystem';

const { walletProvider } = useWeb3ModalProvider();
const { selected: veSystem, select } = useVeSystem();
const { network } = useNetwork();
const { addAllowedRewardTokens } = useController({
  walletProvider,
  network,
  veSystem,
});

const tokens = ref<string[]>(['']);
const isLoading = ref<boolean>(false);

const isEmpty = computed(() => tokens.value.some(token => token === ''));

const submit = async () => {
  const tokensToSubmit = tokens.value.filter(token => token !== '');

  console.log('tokensToSubmit', tokensToSubmit);

  if (tokensToSubmit.length === 0) return;

  await addAllowedRewardTokens.value?.(tokensToSubmit, {
    onPrompt: () => {
      console.log('prompt');
      isLoading.value = true;
    },
    onSubmitted: ({ tx }) => {
      console.log('submitted', tx);
    },
    onSuccess: async ({ receipt }) => {
      console.log('success', receipt);
      if (veSystem.value) await select(veSystem.value.id);
      isLoading.value = false;
      tokens.value = [''];
    },
    onError: err => {
      console.log('err', err);
      isLoading.value = false;
    },
  });
};

const addToken = () => {
  tokens.value.push('');
};

const removeToken = (index: number) => {
  tokens.value.splice(index, 1);
};
</script>

<template>
  <div class="item-row">
    <p class="item-name">Set Available Rewards</p>
    <div class="group-tokens">
      <div v-for="(_, index) in tokens" :key="`token-${index}`" class="tokens">
        <div class="item-action">
          <div class="input-group">
            <input
              v-model="tokens[index]"
              placeholder="0xa0b...6eb48"
              type="text"
              class="input"
            />
          </div>
          <button
            v-if="index === 0"
            class="add-button"
            :disabled="isEmpty"
            @click="addToken"
          >
            +
          </button>
          <button v-else class="remove-button" @click="removeToken(index)">
            -
          </button>
        </div>
      </div>
    </div>

    <button
      class="submit-button"
      :disabled="isEmpty || isLoading"
      @click="submit()"
    >
      {{ isLoading ? 'Setting...' : 'Set' }}
    </button>
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
  max-width: 700px;
  height: auto;
  gap: 10px;
}

.item-row .group-tokens {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: calc(60% - 70px);
}

.item-row .group-tokens .tokens {
  height: 45px;
  width: 100%;
}

.item-row .item-name {
  width: 40%;
  max-width: 350px;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  height: 45px;
  display: flex;
  align-items: center;
}

.group-tokens .item-action {
  display: flex;
  width: 100%;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.group-tokens .input-group {
  height: 100%;
  width: 100%;
}

.group-tokens .input-group .input {
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

.dark .group-tokens .input-group .input {
  border: 1px solid #3e4c5a;
}

.group-tokens .input-group .input:focus {
  border: 1px solid #384aff;
}

.item-action .add-button,
.item-action .remove-button {
  background-color: #eaf0f6;
  min-width: 45px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: none;
  border: none;
}

.dark .item-action .add-button,
.dark .item-action .remove-button {
  background-color: #384aff;
}

.submit-button {
  min-width: 75px;
  height: 45px;
  background-color: #eaf0f6;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  box-shadow: none;
  border: none;
}

.dark .submit-button {
  background-color: #384aff;
}

.add-button:disabled,
.remove-button:disabled,
.submit-button:disabled {
  background-color: rgba(56, 74, 255, 0.2);
  cursor: not-allowed;
}
</style>