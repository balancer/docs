<script setup>
import { ref } from 'vue';

defineProps({
  address: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 30,
  },
});

const error = ref(false);
</script>
<template>
  <div class="avatar">
    <img
      v-if="!error"
      :src="imageURL"
      :style="{
        borderRadius: '99px',
        width: `${size}px`,
        height: `${size}px`,
        background: 'white',
        display: 'block',
      }"
      @error="error = true"
    />
    <div v-else :style="{ lineHeight: 0 }">
      <Jazzicon :address="address" :diameter="size" />
    </div>
  </div>
</template>
<style scoped>
.avatar {
  flex-shrink: 0;
}
</style>
