<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';

export type ItemType = [string, string]; // id - name

type SelectorPropsType = {
  prompt: string;
  selected: string; // id
  items: ItemType[];
  onChange: (value: string) => void;
};

const selectedName = computed<string>(() => {
  const item = props.items.find(item => item[0] === props.selected);
  if (item === undefined) return '';

  return item[1];
});

const props = defineProps<SelectorPropsType>();

const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};
</script>

<template>
  <div class="current-week" @click="toggle">
    <div class="selected-token">
      <p v-if="props.selected === ''" class="value">{{ props.prompt }}</p>
      <p v-else class="value">{{ selectedName }}</p>
      <svg
        width="14"
        height="14"
        :class="{
          icon: true,
          open: open,
        }"
      >
        <use href="/images/caret-down-fill.svg#icon"></use>
      </svg>
    </div>
    <div v-if="open" class="token-list">
      <p
        v-for="[id, name] in props.items"
        :key="id"
        class="value"
        @click="onChange(id)"
      >
        {{ name }}
      </p>
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

.item-row .current-week {
  height: 100%;
  width: calc(100% - 150px);
  position: relative;
}

.item-row .current-week .selected-token {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-inline: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
}

.item-row .current-week .selected-token .value {
  font-size: 14px;
  margin: 0;
}

.item-row .current-week .selected-token .icon {
  position: absolute;
  right: 20px;
  fill: #cccccc;
  transition: all 0.3s;
}

.item-row .current-week .selected-token .icon.open {
  transform: rotate(180deg);
}

.item-row .current-week .token-list {
  position: absolute;
  top: 115%;
  left: 0;
  width: 100%;
  background-color: #eaf0f6;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.token-list .value {
  padding: 5px 20px;
  margin: 0;
  cursor: pointer;
}

.token-list .value:hover {
  background-color: rgba(56, 74, 255, 0.2);
}

.dark .item-row .current-week .token-list {
  background-color: #1e293b;
  border: 1px solid #3e4c5a;
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

.dark .item-row .current-week .selected-token,
.dark .item-row .item-action .input-amount {
  border: 1px solid #3e4c5a;
}

.dark .item-row .item-action .input-amount:focus {
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
