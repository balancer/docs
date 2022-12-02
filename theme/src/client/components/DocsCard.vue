<script setuplang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DocsCard',
  props: {
    title: { type: String, default: '' },
    titleTag: { type: String, default: 'h4' },
    icon: { type: String, default: '' },
    link: { type: String, default: '' },
    details: { type: String, default: '' },
  },
});
</script>

<template>
  <RouterLink :to="link" class="card-link">
    <div :class="['docs-card']">
      <div :class="['card-container']">
        <div v-if="icon" class="card-icon-row">
          <img :src="icon" />
        </div>
        <div v-if="!!title || $slots.header" :class="['header']">
          <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -- Not sure if this is fine -->
          <component :is="titleTag" v-if="!!title" v-text="title" />
        </div>
        <div :class="['content']">
          {{ details }}
        </div>
      </div>
    </div>
  </RouterLink>
</template>



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
}

.card-link img {
  height: 6em;
  width: 6em;
  position: absolute;
  top: 0px;
  right: 0px;
  border-top-right-radius: 12px;
}

.docs-card .header {
  color: var(--c-text);
}

.card-container {
  padding: 1.5rem;
}
.docs-card {
  @apply flex flex-col;
}
</style>
