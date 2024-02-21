<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  label: String,
});
</script>

<template>
  <p class="label" :title="props.label">{{ props.label }}</p>
</template>

<style scoped>
.label {
  font-size: 12px;
  margin: 0;
  padding: 2px 6px;
  background: #384aff33;
  border-radius: 5px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
