<script setup>
import { Listbox } from '@headlessui/vue';

const props = defineProps({
  value: {
    type: Object,
  },
  onChange: {
    type: Function,
  },
});

function onChange(value) {
  props.onChange(value);
}
</script>
<template>
  <Listbox :defaultValue="value" @update:model-value="onChange">
    <div class="select">
      <slot></slot>
    </div>
  </Listbox>
</template>
<style scoped>
.select {
  position: relative;
}
</style>
