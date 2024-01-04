<script setup lang="ts">
import { defineProps, ref, computed, watch } from 'vue';
import { dateToSeconds } from '../../utils';

type ModalPropsType = {
  open: boolean;
  allowance: number;
  isLoadingApprove: boolean;
  onClose: () => void;
  onSubmit: (amount: number, releaseTime: number) => void;
  onApprove: (amount: number) => void;
};

const props = defineProps<ModalPropsType>();

const amountInput = ref<string>('');
const releaseTimeInput = ref<string>('');

watch(
  () => props.open,
  () => {
    amountInput.value = '';
    releaseTimeInput.value = '';
});

const amount = computed<number>(() =>
  amountInput.value === '' ? 0 : parseFloat(amountInput.value)
);

const releaseTime = computed<number>(() => {
  if (releaseTimeInput.value === '') return 0;

  const d = new Date(releaseTimeInput.value);

  return dateToSeconds(d);
});
</script>

<template>
  <div v-if="props.open" class="modal-container">
    <div class="modal-popup early-penalty">
      <h3 class="modal-title">Lock Token</h3>
      <div class="body">
        <div class="item-row">
          <p class="item-name">Underlying 8020 BPT Amount</p>
          <div class="input-group">
            <input
              v-model="amountInput"
              type="number"
              class="input"
              placeholder="12000"
            />
          </div>
        </div>
        <div class="item-row">
          <p class="item-name">Release time</p>
          <div class="input-group">
            <input
              v-model="releaseTimeInput"
              type="datetime-local"
              class="input"
            />
          </div>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn close" @click="props.onClose">Close</button>
        <button
          v-show="allowance >= amount"
          class="btn submit"
          :disabled="amountInput === '' || releaseTimeInput === ''"
          @click="onSubmit(amount, releaseTime)"
        >
          Submit
        </button>
        <button
          v-show="allowance < amount"
          class="btn submit approve"
          :disabled="props.isLoadingApprove"
          @click="onApprove(amount)"
        >
          {{ isLoadingApprove ? 'Approving' : 'Approve' }}
        </button>
      </div>
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
.modal-container {
  position: fixed;
  height: 100%;
  z-index: 100;
  width: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.2);
}

.modal-popup {
  position: sticky;
  border-radius: 16px;
  background-color: #eaf0f6;
  border-radius: 16px;
  border: 1px solid #384aff;
  box-shadow: 0px 4px 20px 0px rgba(51, 65, 85, 0.5);
  width: 90%;
  max-width: 560px;
  left: calc(50% - 280px);
  padding: 16px 24px;
}

@media (max-width: 1520px) {
  .modal-popup {
    left: calc(50% - 160px);
  }
}

@media (max-width: 1200px) {
  .modal-popup {
    left: 40%;
  }
}

@media (max-width: 1000px) {
  .modal-popup {
    max-width: 400px;
  }
}

@media (max-width: 720px) {
  .modal-popup {
    left: calc(50% - 200px);
  }
}

@media (max-width: 460px) {
  .modal-popup {
    left: 5%;
  }
}

.dark .modal-popup {
  background-color: #0d1834;
}

.modal-popup.early-penalty {
  top: 350px;
  display: flex;
  flex-direction: column;
}

.modal-popup .modal-title {
  padding: 0;
  margin: 0;
}

.modal-popup .body {
  margin-block: 20px 32px;
}
.modal-popup .body .text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.modal-popup .body .item-row {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 16px;
  gap: 10px;
}

.item-row .item-name {
  margin: 0;
  min-width: 90px;
}

.item-row .input-group {
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 270px;
  justify-content: flex-end;
}

.item-row .input-group .input {
  border-radius: 6px;
  height: 100%;
  width: 100%;
  padding-inline: 20px;
  font-size: 14px;
  outline: none;
  border: 1px solid #384aff;
  background-color: rgba(56, 74, 255, 0.2);
}

.modal-popup .btn-group {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
}

.modal-popup .btn-group .btn:disabled {
  cursor: not-allowed;
  background-color: rgba(56, 74, 255, 0.2);
  color: grey;
}

.modal-popup .btn-group .btn {
  width: 125px;
  height: 40px;
  background-color: #384aff;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-weight: 600;
}

.modal-popup .btn-group .btn.submit {
  color: #ffffff;
}

.modal-popup .btn-group .btn.approve {
  background-color: #1dcc37;
}

.modal-popup .btn-group .btn.close {
  border: 1px solid #384aff;
  background-color: rgba(56, 74, 255, 0.2);
}
</style>
