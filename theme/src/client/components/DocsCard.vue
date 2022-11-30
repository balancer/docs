<script setuplang="ts">
import FeatherIcon from './icons/FeatherIcon.vue';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DocsCard',
  components: {
    FeatherIcon,
  },
  props: {
    title: { type: String, default: '' },
    titleTag: { type: String, default: 'h4' },
    icon: { type: String, default: '' },
    details: { type: String, default: '' },
  },
});
</script>

<template>
  <a class="card-link">
    <div :class="['docs-card']">
      <div :class="['card-container']">
        <div v-if="icon" class="card-icon-row">
          <FeatherIcon name="chevron-down" size="sm" />
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
  </a>
</template>



<style scoped>
.card-link {
  border: 1px solid var(--c-docs-card-border);
  border-radius: 12px;
  display: flex;
  font-size: 0.75rem;
  font-weight: 400;
  height: 100%;
  justify-content: flex-start;
  overflow: hidden;
  transition: box-shadow 0.15s ease-out, transform 0.15s ease-out,
    opacity 0.15s ease-out;
  width: 100%;
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
