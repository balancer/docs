<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { isArray } from '@vuepress/shared';
import { computed } from 'vue';
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js';
import DocsCard from '@theme/DocsCard.vue';

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();
const homeImage = computed(() => {
  return frontmatter.value.homeImage;
});
</script>

<template>
  <div>
    <div>
      <Content />
    </div>
  </div>
</template>

<style scoped>
.home-image {
  padding: 2rem;
  width: calc(100% - 2rem);
}
</style>