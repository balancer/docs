<script setup>
import { Popover } from '@headlessui/vue';
</script>
<template>
  <Popover class="filter">
    <slot></slot>
  </Popover>
</template>
<style scoped></style>
