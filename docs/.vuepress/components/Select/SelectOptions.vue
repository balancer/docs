<script setup>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { ListboxOptions, ListboxOption } from '@headlessui/vue';
import { RecycleScroller } from 'vue-virtual-scroller';

defineProps({
  options: {
    type: Array,
    required: true,
  },
  optionKey: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <ListboxOptions class="menu">
    <RecycleScroller
      v-slot="{ item }"
      class="scroller"
      :items="options"
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
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 99;
  background-color: #fff;
}

.menu .scroller {
  max-height: 264px;
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
</style>
