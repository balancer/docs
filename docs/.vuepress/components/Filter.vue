<script setup>
import { ref, defineProps } from 'vue';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { RecycleScroller } from 'vue-virtual-scroller';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

defineProps({
  label: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  enabled: {
    type: Array,
    required: true,
  },
  onEnable: {
    type: Function,
    required: true,
  },
  onDisable: {
    type: Function,
    required: true,
  },
  enabledKey: {
    type: String,
    required: true,
  },
  enabledLabel: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <Popover class="filter">
    <div class="filter-button">
      <PopoverButton class="filter-button__trigger">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z"
          />
        </svg>
        <span>
          {{ label }}
        </span>
      </PopoverButton>
      <div v-if="enabled.length > 0" class="filter-button__divider" />
      <div v-if="enabled.length > 0" class="enabled-filters">
        <slot name="enabled"></slot>
        <button
          v-for="item in enabled"
          :key="item[enabledKey]"
          class="enabled-filter"
          @click="onDisable(item)"
        >
          {{ item[enabledLabel] }}
        </button>
      </div>
    </div>
    <PopoverPanel class="filter-menu">
      <div class="filter__search">
        <input type="text" placeholder="Search" />
      </div>
      <div class="filter-options">
        <RecycleScroller
          v-slot="{ item }"
          class="scroller"
          :items="items"
          :itemSize="48"
          keyField="address"
        >
          <button class="filter-option" @click="onEnable(item)">
            <slot v-bind="item"></slot>
          </button>
        </RecycleScroller>
      </div>
    </PopoverPanel>
  </Popover>
</template>
<style>
p {
  margin: 0;
}

.filter {
  position: relative;
}
.filter-button {
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: inline-flex;
}

.filter-button__trigger {
  background-color: transparent;
  border: 0;
  color: #1e293b;
  cursor: pointer;
  gap: 10px;
  font-family: var(--font-family);
  display: flex;
  font-weight: bold;
  font-size: 12px;
  text-align: left;
  padding: 8px;
}

.filter-button__divider {
  background-color: #cbd5e1;
  height: 22px;
  width: 1px;
}

.filter-button svg {
  color: #cbd5e1;
  height: 16px;
  width: 16px;
}

.filter-menu {
  position: absolute;
  left: 0;
  overflow: hidden;
  width: 200px;
  margin-top: 10px;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 99;
  background-color: #fff;
}

.filter-options {
  padding: 12px 8px;
}

.filter-options .scroller {
  max-height: 264px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.filter-options .scroller::-webkit-scrollbar {
  display: none;
}

.filter-option {
  align-items: center;
  background-color: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  font-family: var(--font-family);
  gap: 12px;
  text-align: left;
  width: 100%;
  padding: 6px;
}

.filter-option:hover {
  background-color: #eff6ff;
  color: #3b82f6;
}

.filter-option:hover .filter-option__name {
  color: #3b82f6;
}

.enabled-filters {
  display: flex;
  gap: 8px;
  padding: 0 8px;
}

.enabled-filter {
  background-color: #eaf0f6;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 12px;
  line-height: 14px;
  font-weight: 600;
  padding: 4px 12px;
}

.filter__search {
  padding: 10px 6px;
}

.filter__search input {
  background-color: #f8fafc;
  border: 1px solid #eaf0f6;
  border-radius: 4px;
  font-family: var(--font-family);
  padding: 6px;
  width: 100%;
}
</style>
