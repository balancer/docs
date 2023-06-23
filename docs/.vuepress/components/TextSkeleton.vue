<script setup>
defineProps({
  fontSize: {
    type: Number,
    default: 16,
  },
  lineHeight: {
    type: Number,
    default: 1.7,
  },
  width: {
    type: Number,
    default: 100,
  },
});
</script>
<template>
  <div
    :style="`padding:${
      (fontSize * lineHeight - fontSize) / 2
    }px 0; width: ${width}px`"
  >
    <div class="text" :style="`height:${fontSize}px`"></div>
  </div>
</template>
<style scoped>
.text {
  background-color: #e2e8f0;
  border-radius: 4px;
  width: 100%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
