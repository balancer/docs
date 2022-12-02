<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { usePageFrontmatter } from '@vuepress/client';
import { isArray } from '@vuepress/shared';

const frontmatter = usePageFrontmatter();
const tutorials = computed(() => {
  if (isArray(frontmatter.value.tutorials)) {
    return frontmatter.value.tutorials;
  }
  return [];
});
</script>

<template>
  <div v-if="tutorials.length" :class="['guides-card']">
    <div :class="['card-container']">
      <div :class="['card-header']">Guides</div>
      <div :class="['content']">
        <ul>
          <li v-for="ref in tutorials" :key="ref.details">
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
.guides-card {
  border: 2px solid rgba(254, 213, 51, 0.8);
  border-radius: 12px;
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
  font-size: 0.7rem;
  font-weight: 600;
}

.guides-card ul {
  list-style-type: circle;
  margin-top: 0.25em;
  padding-left: 1.5em;
}

.content {
  padding: 0.5em 0;
}

.card-container {
  padding: 1.5em;
}
</style>
