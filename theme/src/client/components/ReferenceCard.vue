<script setup lang="ts">
import { computed } from 'vue';
import { usePageFrontmatter } from '@vuepress/client';
import { isArray } from '@vuepress/shared';

const frontmatter = usePageFrontmatter();
const references = computed(() => {
  if (isArray(frontmatter.value.references)) {
    return frontmatter.value.references;
  }
  return [];
});
</script>

<template>
  <div v-if="references.length" :class="['reference-card']">
    <div :class="['card-container']">
      <div :class="['card-header']">Reference</div>
      <div :class="['content']">
        <ul>
          <li v-for="ref in references" :key="ref.details">
            <RouterLink :to="ref.link" class="card-link">{{
              ref.details
            }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<style scoped>
.reference-card {
  border: 1px solid var(--c-brand-light);
  border-radius: 8px;
  display: flex;
  font-size: 0.75rem;
  font-weight: 400;
  height: 100%;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  transition: box-shadow 0.15s ease-out, transform 0.15s ease-out,
    opacity 0.15s ease-out;
  width: 100%;
  margin-bottom: 2em;
}

.card-header {
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 0.7rem;
  font-weight: 600;
}

.reference-card ul {
  list-style-type: circle;
  margin-top: 0.25em;
  margin-bottom: 0;
  padding-left: 1.5em;
}

.content {
  padding: 0.5em 0;
}

.card-container {
  padding: 1em 1em 0.5em;
}
</style>
