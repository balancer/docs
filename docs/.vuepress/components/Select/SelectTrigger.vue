<script setup>
import { ListboxButton } from '@headlessui/vue';

defineProps({
  placeholder: {
    type: String,
  },
  value: {
    type: String,
  },
  disabled: {
    type: Boolean,
  },
});
</script>
<template>
  <ListboxButton
    :class="`select-trigger ${disabled ? 'select-trigger--disabled' : null}`"
    :disabled="disabled"
  >
    <span v-if="!value" class="placeholder">{{ placeholder ?? 'Select' }}</span>
    <slot v-else></slot>
    <div class="icon-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="icon"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </ListboxButton>
</template>
<style scoped>
.select-trigger {
  align-items: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  line-height: 20px;
  padding: 12px;
  text-align: left;
  width: 100%;
}

.dark .select-trigger {
  background-color: transparent;
  border-color: #3e4c5a;
}

.select-trigger--disabled {
  background-color: #f8fafc;
  cursor: not-allowed;
}

.dark .select-trigger--disabled {
  background-color: #1e293b;
}

.icon-wrapper {
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  display: flex;
}

.select-trigger .icon {
  height: 20px;
  width: 20px;
}

.select-trigger .placeholder {
  color: #94a3b8;
  font-weight: 500;
}
</style>
