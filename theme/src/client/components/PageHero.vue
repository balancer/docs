<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { computed } from 'vue';
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js';

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();

const heroStyle = computed(() => {
  if (!frontmatter.value.heroImage) {
    return null;
  }
  return `background-image: url(${frontmatter.value.heroImage})`;
});
</script>

<template>
  <div v-if="heroStyle" class="page-hero" :style="heroStyle"></div>
</template>
