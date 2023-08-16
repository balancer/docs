<template>
  <a
    :href="link"
    :target="isExternalLink(link) ? '_blank' : '_self'"
    rel="noopener noreferrer"
    class="card-link"
  >
    <div :class="['docs-card']">
      <div :class="['card-container']">
        <div v-if="icon" class="card-icon-row">
          <img :src="icon" />
        </div>
        <div :class="['header']">
          <h4>{{ title }}</h4>
        </div>
        <div class="details">
          {{ details }}
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  icon: String,
  link: String,
  details: String,
});

// Function to check if a link is external
function isExternalLink(link) {
  return link.startsWith('http://') || link.startsWith('https://');
}
</script>

<style scoped>
.card-link {
  border: 1px solid var(--c-docs-card-border);
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
  box-shadow: var(--box-shadow-large);
}

@media (hover: hover) {
  .card-link[href]:hover {
    box-shadow: var(--c-docs-card-shadow);
    text-decoration: none;
  }
}

.card-link img {
  height: 3.75rem;
  width: 3.75rem;
  top: 0px;
  right: 0px;
  border-top-right-radius: 12px;
}

.card-link :deep(h4) {
  font-weight: 800;
}

.docs-card .header {
  color: var(--c-text);
}

.card-container {
  padding: 1.5rem;
}
.details {
  color: var(--c-text-light);
  font-size: 0.875rem;
}
.docs-card {
  @apply flex flex-col;
}
</style>
