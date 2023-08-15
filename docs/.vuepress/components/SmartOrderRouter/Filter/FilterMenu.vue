<script setup>
import { computed, ref } from 'vue';
import { PopoverPanel } from '@headlessui/vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import FilterSearch from './FilterSearch.vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  optionKey: {
    type: String,
  },
  enabled: {
    type: Array,
    required: true,
  },
  onSelect: {
    type: Function,
    required: true,
  },
  searchFilter: {
    type: Function,
  },
});

const searchValue = ref('');

const filteredOptions = computed(() => {
  if (!searchValue.value || !props.searchFilter) {
    return props.options;
  }

  return props.options.filter(token => {
    return props.searchFilter(searchValue.value, token);
  });
});
</script>
<template>
  <PopoverPanel class="filter__menu">
    <FilterSearch
      v-if="searchFilter"
      :searchValue="searchValue"
      :onChange="newValue => (searchValue = newValue)"
    />
    <div v-if="searchFilter" class="filter-menu__divider-wrapper">
      <hr class="filter-menu__divider" />
    </div>
    <RecycleScroller
      v-slot="{ item }"
      class="scroller"
      itemClass="filter__menu-item-wrapper"
      :items="filteredOptions"
      :itemSize="40"
      :keyField="optionKey ?? item"
    >
      <button
        :class="`filter__menu-item ${
          enabled.includes(item) ? 'filter__menu-item--selected' : ''
        }`"
        @click="onSelect(item)"
      >
        <slot v-bind="item"></slot>
      </button>
    </RecycleScroller>
  </PopoverPanel>
</template>
<style scoped>
.filter-menu__divider-wrapper {
  padding: 0 8px;
  padding-bottom: 8px;
}

.filter-menu__divider {
  margin: 0;
}
</style>
