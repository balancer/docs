<script setup>
import { ref, watch, computed } from 'vue';
import Calendar from './Calendar.vue';
const selectedDate = ref(null);
const openCalendar = ref(false);
const lockTime = ref(0);
const handleClickDate = date => {
  selectedDate.value = date;
};
const handleClickContainer = () => {
  openCalendar.value = !openCalendar.value;
};
const closeCalendar = () => {
  openCalendar.value = false;
};

const weeksToSeconds = weeks => weeks * 7 * 24 * 60 * 60;

const date = new Date();
const formatedDate = date => {
  const formattedDate = date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'GMT',
  });
  return formattedDate;
};
const formFields = [
  {
    label: '8020 BPT address',
    placeholder: '0xa0b...6eb48',
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
];

const selectedWeeksValue = ref('');
const selectedMonthsValue = ref('');
const selectedYearsValue = ref('');

const computedLockTime = computed(() => {
  let weeks = parseInt(selectedWeeksValue.value) || 0;
  weeks += parseInt(selectedMonthsValue.value) * 4 || 0;
  weeks += parseInt(selectedYearsValue.value) * 52 || 0;

  return weeksToSeconds(weeks);
});

const isFormValid = ref(false);

function validateForm() {
  const currentDate = new Date();
  isFormValid.value = formFields.every(field => {
    const inputElement = document.querySelector(`[name="${field.name}"]`);
    return inputElement && inputElement.value;
  });
  if (selectedDate.value === null) {
    isFormValid.value = false;
  } else if (selectedDate.value.getTime() < currentDate.getTime()) {
    isFormValid.value = false;
  }
  if (lockTime.value < 1) {
    isFormValid.value = false;
  }
}

function handleSubmit(e) {
  const formData = new FormData(e.target);
  for (let [name, value] of formData.entries()) {
    console.log(`${name}: ${value}`);
  }
}
watch([selectedDate, computedLockTime], () => {
  lockTime.value = computedLockTime.value;
  validateForm();
});
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
    <div class="item-row">
      <p class="item-name">Reward Distribition Start-time</p>
      <div class="input-group">
        <div class="input">
          <p
            :class="{ disabled: !selectedDate }"
            class="text"
            @click="handleClickContainer"
          >
            {{ selectedDate ? formatedDate(selectedDate) : formatedDate(date) }}
          </p>
          <svg
            width="16"
            height="16"
            class="icon"
            @click="handleClickContainer"
          >
            <use href="/images/calendar.svg#icon"></use>
          </svg>
          <Calendar
            :isOpen="openCalendar"
            :date="selectedDate"
            @update:date="handleClickDate"
            @close-calendar="closeCalendar"
          />
          <input v-model="selectedDate" type="hidden" name="reward-start" />
        </div>
      </div>
    </div>
    <div class="item-row">
      <p class="item-name">Max Lock-time</p>
      <div class="lock-group">
        <div class="time-group">
          <p class="text">Weeks</p>
          <input
            v-model="selectedWeeksValue"
            type="number"
            class="input"
            placeholder="10"
            @input="countLockedWeeks"
          />
        </div>
        <div class="time-group">
          <p class="text">Months</p>
          <input
            v-model="selectedMonthsValue"
            type="number"
            class="input"
            placeholder="3"
            @input="countLockedWeeks"
          />
        </div>
        <div class="time-group">
          <p class="text">Years</p>
          <input
            v-model="selectedYearsValue"
            type="number"
            class="input"
            placeholder="1"
            @input="countLockedWeeks"
          />
        </div>
      </div>
      <input v-model="lockTime" type="hidden" name="lock-time" />
    </div>
    <button type="submit" class="submit-button" :disabled="!isFormValid">
      Deploy veSystem
    </button>
  </form>
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
  justify-content: space-between;
  max-width: 700px;
}

.item-row .item-name {
  width: 50%;
  max-width: 350px;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.item-row .input-group,
.item-row .lock-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 45px;
  width: 50%;
}

.item-row .input-group .input,
.item-row .lock-group .input {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  position: relative;
  border-radius: 6px;
  height: 100%;
  width: 100%;
  max-width: 340px;
  padding-inline: 20px;
  font-size: 14px;
  outline: none;
  display: flex;
  align-items: center;
}

.dark .item-row .input-group .input,
.dark .item-row .lock-group .input {
  border: 1px solid #3e4c5a;
}

.item-row .input-group .input:focus,
.item-row .lock-group .input:focus {
  border: 1px solid #384aff;
}

.item-row .input-group .input .icon {
  fill: #2c3e50;
  cursor: pointer;
}
.dark .item-row .input-group .input .icon {
  fill: #ffffff;
}
.item-row .input-group .input .text {
  font-size: 14px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0;
}
.item-row .input-group .input .text.disabled {
  color: #999;
}

.dark .item-row .input-group .input .text.disabled {
  color: #666;
}

.item-row .lock-group {
  gap: 8px;
  max-width: 340px;
  width: 50%;
}

.item-row .lock-group .time-group {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 75px;
  width: 33%;
  position: relative;
}

.item-row .lock-group .time-group .input {
  width: 100%;
  padding: 0;
  padding-left: 12px;
  padding-top: 14px;
}
.time-group .text {
  margin: 0;
  font-size: 12px;
  position: absolute;
  top: 2px;
  left: 10px;
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
