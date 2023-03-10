<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue';
import DropdownTransition from '@theme/DropdownTransition.vue';
import FeatherIcon from './icons/FeatherIcon.vue';
import { useToggle } from '@vueuse/core';
import { computed, nextTick, onBeforeUnmount, toRefs } from 'vue';
import type { PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ResolvedSidebarItem } from '../../shared/index.js';
import { isActiveSidebarItem } from '../utils/index.js';

const props = defineProps({
  item: {
    type: Object as PropType<ResolvedSidebarItem>,
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

const isActive = computed(() => isActiveSidebarItem(item.value, route));
const itemClass = computed(() => ({
  'sidebar-item': true,
  'sidebar-heading': depth.value === 0,
  active: isActive.value,
  collapsible: item.value.collapsible,
}));

const isOpenDefault = computed(() =>
  depth.value === 0 || isActive.value ? true : false
);
const [isOpen, toggleIsOpen] = useToggle(isOpenDefault.value);
const onClick = (e: Event): void => {
  if (item.value.collapsible) {
    e.preventDefault();
    // toggle open status on click
    toggleIsOpen();
  }
};

// reset open status after navigation
const unregisterRouterHook = router.afterEach(to => {
  nextTick(() => {
    isOpen.value = isOpenDefault.value;
  });
});
onBeforeUnmount(() => {
  unregisterRouterHook();
});
</script>

<template>
  <li>
    <AutoLink v-if="item.link" :class="itemClass" :item="item" />
    <a
      v-else
      tabindex="0"
      :class="itemClass"
      @click="onClick"
      @keydown.enter="onClick"
    >
      <FeatherIcon
        v-if="item.collapsible && isOpen"
        name="chevron-down"
        size="sm"
      />
      <FeatherIcon
        v-if="item.collapsible && !isOpen"
        name="chevron-right"
        size="sm"
      />
      <span class="sidebar-link-text">{{ item.text }}</span>
    </a>

    <DropdownTransition v-if="item.children?.length">
      <ul v-show="isOpen" class="sidebar-item-children">
        <SidebarItem
          v-for="child in item.children"
          :key="`${depth}${child.text}${child.link}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </DropdownTransition>
  </li>
</template>
