<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue';
import DropdownTransition from '@theme/DropdownTransition.vue';
import FeatherIcon from './icons/FeatherIcon.vue';
import { useToggle } from '@vueuse/core';
import { computed, nextTick, onBeforeUnmount, toRefs } from 'vue';
import type { PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { PageHeader } from '@vuepress/client';
import { isActiveRightAnchorItem } from '../utils/index.js';

const props = defineProps({
  item: {
    type: Object as PropType<PageHeader>,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
});

const { item, depth } = toRefs(props);
const route = useRoute();
const router = useRouter();

const isActive = computed(() => isActiveRightAnchorItem(item.value, route));
const itemClass = computed(() => ({
  'right-anchor-item': true,
  'right-anchor-heading': depth.value === 0,
  active: isActive.value,
}));
</script>

<template>
  <li>
    <a v-if="item.link" :class="itemClass" :href="item.link" v-bind="$attrs">
      {{ item.title }}
    </a>
    <a v-else tabindex="0" :class="itemClass">
      <span class="sidebar-link-text">{{ item.title }}</span>
    </a>

    <DropdownTransition v-if="item.children?.length">
      <ul class="right-anchor-children">
        <RightAnchorItem
          v-for="child in item.children"
          :key="`${depth}${child.title}${child.link}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </DropdownTransition>
  </li>
</template>
