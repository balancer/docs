<script setup>
defineProps({
  imageURL: {
    type: String,
  },
  textA: {
    type: String,
    required: true,
  },
  textB: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <img
    v-if="imageURL"
    class="filter-option__image"
    :src="imageURL"
    :alt="textA"
  />
  <div class="filter-option__info">
    <p class="filter-option__symbol">{{ textA }}</p>
    <p class="filter-option__name">{{ textB }}</p>
  </div>
</template>
<style>
.filter-option__image {
  height: 24px;
  width: 24px;
  border-radius: 999px;
}

.filter-option__info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.filter-option__symbol {
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.filter-option__name {
  font-size: 12px;
  line-height: 18px;
  color: #64748b;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
