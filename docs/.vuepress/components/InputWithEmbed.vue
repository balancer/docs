<script setup>
defineProps({
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});

defineEmits(['update:modelValue']);
</script>
<template>
  <div class="input-wrapper">
    <div class="input-wrapper__content">
      <slot></slot>
    </div>
    <input
      :value="modelValue"
      type="text"
      class="input"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<style scoped>
.input-wrapper {
  position: relative;
}

.input-wrapper__content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.input {
  background-color: #f8fafc;
  border: 1px solid #eaf0f6;
  display: flex;
  width: 100%;
  padding: 24px 16px;
  padding-left: 157px;
  border-radius: 6px;
  text-align: right;
  font-size: 16px;
}

.dark .input {
  background-color: #334155;
  color: #fff;
  border-color: #475569;
}

.input::placeholder {
  color: #94a3b8;
}

.dark .input::placeholder {
  color: #64748b;
}
</style>
