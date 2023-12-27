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

.current-week {
  height: 100%;
  width: 100%;
  position: relative;
}

.current-week .selected-token {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-inline: 20px 5px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
}

.current-week .selected-token .value {
  font-size: 14px;
  margin: 0;
}

.current-week .selected-token .icon {
  position: absolute;
  right: 10px;
  fill: #cccccc;
  transition: all 0.3s;
}

.current-week .selected-token .icon.open {
  transform: rotate(180deg);
}

.current-week .token-list {
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

.dark .current-week .token-list {
  background-color: #1e293b;
  border: 1px solid #3e4c5a;
}

.dark .current-week .selected-token {
  border: 1px solid #3e4c5a;
}
</style>
