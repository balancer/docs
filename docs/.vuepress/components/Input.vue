<script setup>
defineProps({
  modelValue: {
    type: String,
    // required: true,
  },
});
defineEmits(['update:modelValue']);
</script>
<template>
  <input
    class="input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
<style scoped>
.input {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 12px;
  width: 100%;
}

.dark .input {
  border-color: #3e4c5a;
}
</style>
