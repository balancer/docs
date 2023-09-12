<script setup>
import { PopoverButton } from '@headlessui/vue';

defineProps({
  label: {
    type: String,
    required: true,
  },
  enabled: {
    type: Array,
    required: true,
  },
  onRemove: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <div class="filter__button">
    <PopoverButton class="filter__trigger">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z"
        />
      </svg>
      <span>{{ label }}</span>
    </PopoverButton>
    <div v-if="enabled.length > 0" class="divider" />
    <div
      v-if="enabled.length > 0 && enabled.length < 3"
      class="enabled-filters"
    >
      <button
        v-for="item in enabled"
        :key="item.address"
        class="enabled-filter"
        @click="onRemove(item)"
      >
        <slot v-bind="item"></slot>
        <span class="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </span>
      </button>
    </div>
    <div
      v-if="enabled.length > 0 && enabled.length >= 3"
      class="enabled-filters"
    >
      <button class="enabled-filter">
        <span>{{ enabled.length }} Selected</span>
      </button>
    </div>
  </div>
</template>
