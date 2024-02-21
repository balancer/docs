<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import Calendar from './Calendar.vue';
import { useWeb3ModalProvider } from '@web3modal/ethers/vue';
import { useNetwork } from '../../providers/network';
import { locale2utc, useController } from '../../utils';
import Tooltip from './admin/Tooltip.vue';
import { rewardDistributionStartTimeHint } from '../../constants/hints';

const { network } = useNetwork();
const { walletProvider } = useWeb3ModalProvider();

const isLoading = ref(false);

const { deploy } = useController({
  walletProvider,
  network,
});

const bptAddress = ref('');
const veTokenName = ref('');
const veTokenSymbol = ref('');
const enableUnlockAll = ref<boolean>(false);
const enableEarlyUnlock = ref<boolean>(false);

const selectedDate = ref<Date | undefined>(undefined);
const openCalendar = ref(false);
const lockTime = ref(0);
const startTime = computed(() =>
  selectedDate.value ? locale2utc(selectedDate.value) / 1000 : 0
);
const handleClickDate = (date: Date) => {
  selectedDate.value = date;
};
const handleClickContainer = () => {
  openCalendar.value = !openCalendar.value;
};
const closeCalendar = () => {
  openCalendar.value = false;
};

const date = new Date();
const formatedDate = (date: Date) => {
  // const formattedDate = date.toLocaleString('en-US', {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   timeZone: 'UTC',
  // });

  const utcDateInMillis = locale2utc(date);

  const utcDate = new Date(utcDateInMillis);

  return utcDate.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

const selectedWeeksValue = ref('');
const selectedDaysValue = ref('');
const selectedYearsValue = ref('');

const computedLockTime = computed(() => {
  const dayInSeconds = 24 * 60 * 60;
  const weekInSeconds = dayInSeconds * 7;
  const yearInSeconds = 365 * dayInSeconds;

  const daysInSeconds = parseInt(selectedDaysValue.value || '0') * dayInSeconds;
  const weeksInSeconds =
    parseInt(selectedWeeksValue.value || '0') * weekInSeconds;
  const yearsInSeconds =
    parseInt(selectedYearsValue.value || '0') * yearInSeconds;

  const seconds = daysInSeconds + weeksInSeconds + yearsInSeconds;

  return seconds;
});

watch(computedLockTime, value => console.log(value));

const isFormValid = ref(false);

const clearForm = () => {
  bptAddress.value = '';
  veTokenName.value = '';
  veTokenSymbol.value = '';
  selectedDate.value = undefined;
  selectedDaysValue.value = '';
  selectedWeeksValue.value = '';
  selectedYearsValue.value = '';
  enableEarlyUnlock.value = false;
  enableUnlockAll.value = false;
};

function validateForm() {
  const currentDate = new Date();

  isFormValid.value = [bptAddress, veTokenName, veTokenSymbol].every(
    ({ value }) => value.length > 0
  );

  if (selectedDate.value === undefined) {
    isFormValid.value = false;
  } else if (selectedDate.value.getTime() < currentDate.getTime()) {
    isFormValid.value = false;
  }
  if (lockTime.value < 1) {
    isFormValid.value = false;
  }
}

async function handleSubmit() {
  if (!selectedDate.value) return;

  await deploy.value?.(
    {
      tokenBptAddr: bptAddress.value,
      name: veTokenName.value,
      symbol: veTokenSymbol.value,
      maxLockTime: lockTime.value,
      rewardDistributorStartTime: startTime.value,
      enableUnlockAll: enableUnlockAll.value,
      enableEarlyUnlock: enableEarlyUnlock.value,
    },
    {
      onPrompt: () => {
        console.log('OnPrompt');
        isLoading.value = true;
      },
      onSubmitted: ({ tx }) => {
        console.log('OnSubmitted', tx);
      },
      onSuccess: ({ receipt }) => {
        console.log('OnSuccess', receipt);
        isLoading.value = false;
        clearForm();
      },
      onError: err => {
        console.log('OnError', err);
        isLoading.value = false;
      },
    }
  );
}

watch([bptAddress, veTokenName, veTokenSymbol], () => {
  validateForm();
});

watch([selectedDate, computedLockTime], () => {
  lockTime.value = computedLockTime.value;
  validateForm();
});
</script>

<template>
  <form class="section-container" @submit.prevent="handleSubmit">
    <div key="bptAddress" class="item-row">
      <p class="item-name">Locked Token Address</p>
      <div class="input-group">
        <input
          v-model="bptAddress"
          placeholder="0xa0b...6eb48"
          type="text"
          name="bptAddress"
          class="input"
        />
      </div>
    </div>
    <div key="veTokenName" class="item-row">
      <p class="item-name">veSystem Name</p>
      <div class="input-group">
        <input
          v-model="veTokenName"
          placeholder="Voting Escrow Balancer 80 GNO"
          type="text"
          name="veTokenName"
          class="input"
        />
      </div>
    </div>
    <div key="veTokenName" class="item-row">
      <p class="item-name">veSystem Symbol</p>
      <div class="input-group">
        <input
          v-model="veTokenSymbol"
          placeholder="veGNO80-WETH20"
          type="text"
          name="veTokenSymbol"
          class="input"
        />
      </div>
    </div>
    <div class="item-row">
      <p class="item-name">
        Reward Distribition Start-time
        <Tooltip
          :text="rewardDistributionStartTimeHint"
          :width="300"
          position="bottom"
          :fontSize="12"
        >
          <svg width="16" height="16" class="icon">
            <use href="/images/exclamation-circle.svg#icon"></use>
          </svg>
        </Tooltip>
      </p>
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
          <p class="text">Days</p>
          <input
            v-model="selectedDaysValue"
            type="number"
            class="input"
            placeholder="0"
          />
        </div>
        <div class="time-group">
          <p class="text">Weeks</p>
          <input
            v-model="selectedWeeksValue"
            type="number"
            class="input"
            placeholder="0"
          />
        </div>
        <div class="time-group">
          <p class="text">Years</p>
          <input
            v-model="selectedYearsValue"
            type="number"
            class="input"
            placeholder="0"
          />
        </div>
      </div>
      <input v-model="lockTime" type="hidden" name="lock-time" />
    </div>
    <div key="all-tokens" class="item-row">
      <p class="item-name">
        Enable the option for early unlocking of all tokens
      </p>
      <div class="input-group">
        <input v-model="enableUnlockAll" type="checkbox" />
      </div>
    </div>
    <div key="early-unlock" class="item-row">
      <p class="item-name">
        Enable the option for early unlocking of tokens with a penalty for early
        unlock
      </p>
      <div class="input-group">
        <input v-model="enableEarlyUnlock" type="checkbox" />
      </div>
    </div>
    <button
      type="submit"
      class="submit-button"
      :disabled="!isFormValid || isLoading"
    >
      {{ isLoading ? 'Deploying...' : 'Deploy veSystem' }}
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
  display: flex;
  align-items: center;
  gap: 5px;
}

.item-row .item-name .icon {
  fill: #2c3e50;
}

.dark .item-row .item-name .icon {
  fill: #ffffff;
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
  cursor: not-allowed;
}
</style>
