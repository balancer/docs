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
  <div class="theme-default-content">
    <div class="row">
      <div class="home-content-col">
        <Content />
      </div>
      <div class="home-content-image">
        <img class="home-image" :src="homeImage" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-content-col {
  width: 60%;
}

.home-content-image {
  width: 40%;
}

.home-image {
  padding: 2rem;
  width: calc(100% - 2rem);
}
</style>