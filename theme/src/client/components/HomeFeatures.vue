<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { isArray } from '@vuepress/shared';
import { computed } from 'vue';
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js';
import DocsCard from '@theme/DocsCard.vue';

const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();
const features = computed(() => {
  if (isArray(frontmatter.value.features)) {
    return frontmatter.value.features;
  }
  return [];
});
</script>

<template>
  <div v-if="features.length" class="docs-cards">
    <DocsCard
      v-for="card in features"
      :key="card.title"
      :title="card.title"
      :link="card.link"
      :details="card.details"
      :icon="card.icon"
    />
  </div>
</template>

<style scoped>
.docs-cards {
  grid-gap: 1.35rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  padding-bottom: 2em;
}
</style>
