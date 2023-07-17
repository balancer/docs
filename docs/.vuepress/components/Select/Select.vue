<script setup>
import { Listbox } from '@headlessui/vue';

defineProps({
  value: {
    type: Object,
  },
  onChange: {
    type: Function,
  },
});
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
