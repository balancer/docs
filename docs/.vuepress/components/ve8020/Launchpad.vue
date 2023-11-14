<script setup>
import { ref } from 'vue';
const formFields = [
  {
    label: '8020 BPT address',
    placeholder: 'B-GNO80-WETH20',
    name: 'bptAddress',
  },
  {
    label: 'veToken Name',
    placeholder: 'Voting Escrow Balancer 80 GNO',
    name: 'veTokenName',
  },
  {
    label: 'veToken Symbol',
    placeholder: 'veGNO80-WETH20',
    name: 'veTokenSymbol',
  },
  {
    label: 'Reward Distribition Start-time',
    type: 'date',
    name: 'startTime',
  },
  {
    label: 'Max Lock-time',
    type: 'date',
    name: 'lockTime',
  },
];

const isFormValid = ref(false);

function validateForm() {
  isFormValid.value = formFields.every(field => {
    const inputElement = document.querySelector(`[name="${field.name}"]`);
    return inputElement && inputElement.value;
  });
}

function handleSubmit(e) {
  const formData = new FormData(e.target);
  for (let [name, value] of formData.entries()) {
    console.log(`${name}: ${value}`);
  }
}
</script>

<template>
  <form class="section-container" @submit.prevent="handleSubmit">
    <div v-for="field in formFields" :key="field.label" class="item-row">
      <p class="item-name">{{ field.label }}</p>
      <div class="input-group">
        <input
          v-model="field.value"
          :placeholder="field.placeholder"
          :type="field.type || 'text'"
          :name="field.name"
          class="input"
          @input="validateForm"
        />
      </div>
    </div>
    <button type="submit" class="submit-button" :disabled="!isFormValid">
      Deploy veSystem
    </button>
  </form>
</template>

<style scoped>
.section-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
  margin-top: 16px;
}
.item-row {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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

.submit-button {
  width: 180px;
  height: 40px;
  background-color: #384aff;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;
  font-weight: 600;
  font-size: 14px;
  box-shadow: none;
  border: none;
}
.submit-button:disabled {
  background-color: rgba(56, 74, 255, 0.2);
  cursor: no-drop;
}
</style>