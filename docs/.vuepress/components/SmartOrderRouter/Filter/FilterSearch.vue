<script setup>
import { onUnmounted } from 'vue';

const props = defineProps({
  searchValue: {
    type: String,
    default: '',
  },
  onChange: {
    type: Function,
    required: true,
  },
});

onUnmounted(() => {
  props.onChange('');
});
</script>
<template>
  <div class="filter-search__wrapper">
    <input
      class="filter-search"
      type="text"
      placeholder="Search"
      :modelValue="searchValue"
      @input="event => onChange(event.target.value)"
    />
  </div>
</template>
<style scoped>
.filter-search__wrapper {
  padding: 12px 8px;
}

.filter-search {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  width: 100%;
}

.dark .filter-search {
  background-color: #0f172a;
  border-color: #3e4c5a;
}
</style>
