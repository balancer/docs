<script setup>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { computed, ref } from 'vue';
import { ListboxOptions, ListboxOption } from '@headlessui/vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import SelectSearch from './SelectSearch.vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  optionKey: {
    type: String,
    required: true,
  },
  searchKeys: {
    type: Array,
    default: () => [],
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
  <ListboxOptions class="menu">
    <SelectSearch
      v-if="searchFilter"
      :searchValue="searchValue"
      :onChange="newValue => (searchValue = newValue)"
    />
    <div v-if="searchFilter" class="menu-divider">
      <hr />
    </div>
    <RecycleScroller
      v-slot="{ item }"
      class="scroller"
      :items="filteredOptions"
      :itemSize="44"
      :keyField="optionKey"
    >
      <ListboxOption :value="item" class="menu-item">
        <slot v-bind="item"></slot>
      </ListboxOption>
    </RecycleScroller>
  </ListboxOptions>
</template>
<style scoped>
ul {
  list-style: none;
}

.menu {
  border: 1px solid #e2e8f0;
  position: absolute;
  left: 0;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 99;
  background-color: #fff;
  min-width: 200px;
}

.menu .scroller {
  max-height: 200px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.menu .scroller::-webkit-scrollbar {
  display: none;
}

.menu-item {
  align-items: center;
  display: flex;
  padding: 12px 8px;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  cursor: pointer;
  gap: 8px;
}

.menu-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.menu-item:hover {
  background-color: #f8fafc;
}

.menu-divider {
  background-color: #fff;
  padding: 0px 8px;
  width: 100%;
}

.menu-divider hr {
  margin: 0;
}
</style>
