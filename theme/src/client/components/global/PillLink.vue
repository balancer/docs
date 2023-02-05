<script setuplang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PillLink',
  props: {
    title: { type: String, default: '' },
    icon: { type: String, default: '' },
    link: { type: String, default: '' },
  },
});
</script>

<template>
  <RouterLink :to="link" class="pill-link">
    <div :class="['pill-container']">
      <div v-if="icon" class="card-icon-row">
        <img :src="icon" />
      </div>
      <div :class="['pill-text']">
        {{ title }}
      </div>
    </div>
  </RouterLink>
</template>



<style scoped>
.pill-link {
  border: 1px solid var(--c-docs-card-border);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  color: var(--c-text);
  transition: box-shadow 0.15s ease-out, transform 0.15s ease-out,
    opacity 0.15s ease-out;
}

@media (hover: hover) {
  .pill-link[href]:hover {
    box-shadow: var(--c-docs-card-shadow);
    text-decoration: none;
  }
}

.pill-link img {
  height: 6em;
  width: 6em;
  position: absolute;
  top: 0px;
  right: 0px;
  border-top-right-radius: 12px;
}

.pill-container {
  padding: 1.5rem;
}
</style>
