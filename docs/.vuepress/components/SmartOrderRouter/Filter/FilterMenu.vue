<script setup>
import { watch, ref } from 'vue';
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
  searchFn: {
    type: Function,
  },
});

const searchValue = ref('');
const filteredOptions = ref(props.options ?? []);

watch(
  () => props.options,
  () => {
    filteredOptions.value = props.options;
  }
);

async function updateSearch() {
  if (!props.searchFn) {
    return;
  }

  let result = props.searchFn(searchValue.value);
  if (result instanceof Promise) {
    result = await result;
  }

  filteredOptions.value = result;
}

watch(searchValue, () => {
  updateSearch();
});
</script>
<template>
  <PopoverPanel class="filter__menu">
    <FilterSearch
      v-if="searchFn"
      :searchValue="searchValue"
      :onChange="newValue => (searchValue = newValue)"
    />
    <div v-if="searchFn" class="filter-menu__divider-wrapper">
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
