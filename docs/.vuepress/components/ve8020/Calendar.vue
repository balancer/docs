<script setup>
import { ref, computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  date: Date,
});
const emits = defineEmits(['update:date', 'close-calendar']);

const currentDate = ref(new Date());
const selectedDate = ref(null);
const customMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const currentMonth = computed(() => customMonths[currentDate.value.getMonth()]);
const currentYear = computed(() => currentDate.value.getFullYear());

const daysInMonth = computed(() =>
  getDaysInMonth(currentDate.value.getFullYear(), currentDate.value.getMonth())
);
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function handleSelectedDate(dayInfo) {
  let selectedDate;
  if (dayInfo[0] === -1) {
    selectedDate = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      dayInfo[1]
    );
  } else if (dayInfo[0] === 0) {
    selectedDate = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      dayInfo[1]
    );
  } else {
    selectedDate = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      dayInfo[1]
    );
  }

  selectedDate.value = selectedDate;
  emits('update:date', selectedDate);
  emits('close-calendar');
}

function isThursday(dayInfo) {
  let selectedDate;
  if (dayInfo[0] === -1) {
    selectedDate = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      dayInfo[1]
    );
  } else if (dayInfo[0] === 0) {
    selectedDate = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth(),
      dayInfo[1]
    );
  } else {
    selectedDate = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      dayInfo[1]
    );
  }
  return selectedDate.getDay() === 4;
}

function getDaysInMonth(year, month) {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const days = Array.from(
    { length: 7 * Math.ceil((firstDayIndex + lastDay) / 7) },
    (_, i) => {
      if (i < firstDayIndex) {
        const lastMonth = month === 0 ? 11 : month - 1;
        const lastMonthDays = new Date(year, lastMonth + 1, 0).getDate();
        return [-1, lastMonthDays - (firstDayIndex - i) + 1];
      }
      if (i - firstDayIndex < lastDay) {
        return [0, i - firstDayIndex + 1];
      }
      return [1, i - (firstDayIndex + lastDay) + 1];
    }
  );
  return days;
}

function prevMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
}

function nextMonth() {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
}

function resetSelectedDate() {
  selectedDate.value = null;
  emits('update:date', null);
  emits('close-calendar');
}
</script>
<template>
  <div v-if="props.isOpen" class="calendar">
    <div class="header">
      <h2 class="title">{{ currentMonth }} {{ currentYear }}</h2>
      <div class="btnActions">
        <div v-if="props.date" class="selected-date" @click="resetSelectedDate">
          Clear
        </div>

        <div class="btnPrev" @click="prevMonth">
          <svg width="14" height="14" class="icon">
            <use href="/images/chevron-left.svg#icon"></use>
          </svg>
        </div>
        <div class="btnNext" @click="nextMonth">
          <svg width="14" height="14" class="icon">
            <use href="/images/chevron-right.svg#icon"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="days-header">
      <div v-for="day in daysOfWeek" :key="day" class="day-header">
        {{ day }}
      </div>
    </div>
    <div class="days">
      <div
        v-for="(dayInfo, index) in daysInMonth"
        :key="`day-${index}`"
        :class="{
          valid: isThursday(dayInfo),
          outMonth: dayInfo[0] !== 0,
        }"
        class="day"
        @click="isThursday(dayInfo) && handleSelectedDate(dayInfo)"
      >
        {{ dayInfo[1] }}
      </div>
    </div>
  </div>
</template>
<style>
.calendar {
  max-width: 226px;
  margin: auto;
  padding: 14px 8px;
  background-color: #f8fafc;
  border-radius: 8px;
  position: absolute;
  right: 0px;
  top: 55px;
  z-index: 2;
}
.dark .calendar {
  background-color: #1e293b;
}
.calendar .header {
  text-align: center;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
}
.calendar .header .title {
  font-size: 14px;
  margin: 0;
  border: none;
  padding: 0;
}
.calendar .header .btnActions {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-inline: 8px;
  height: 100%;
}
.btnActions .selected-date {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding-inline: 5px;
  height: 100%;
  background-color: #eaf0f6;
  color: #384aff;
  border-radius: 6px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.dark .btnActions .selected-date {
  background-color: #384aff;
  color: #ffffff;
}

.btnActions .btnPrev,
.btnActions .btnNext {
  fill: #2c3e50;
  cursor: pointer;
}

.dark .btnActions .btnPrev,
.dark .btnActions .btnNext {
  fill: #ffffff;
}

.calendar .days-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
.calendar .day-header {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}
.calendar .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
.calendar .days .day {
  font-size: 12px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
}
.dark .calendar .days .day {
  border: 1px solid #3e4c5a;
}
.calendar .days .day.valid {
  cursor: pointer;
  background-color: #eaf0f6;
}
.calendar .days .outMonth {
  opacity: 0.2;
}
.dark .calendar .days .day.valid {
  background-color: rgba(56, 74, 255, 0.2);
}
</style>
