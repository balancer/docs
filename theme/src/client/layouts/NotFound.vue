<script setup lang="ts">
import DocsCard from '@theme/DocsCard.vue';
import Navbar from '@theme/Navbar.vue';
import Sidebar from '@theme/Sidebar.vue';
import { usePageData, usePageFrontmatter } from '@vuepress/client';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { DefaultThemeHomePageFrontmatter } from '../../shared/index.js';
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from '../composables/index.js';
import { captureException } from '@sentry/browser';

captureException(new Error('404'));

const page = usePageData();
const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>();
const themeLocale = useThemeLocaleData();

const features = computed(() => {
  return [
    {
      title: 'Basics',
      details: 'Learn how Balancer works under the hood',
      link: '/concepts/overview/basics',
    },
    {
      title: 'Integrate',
      details: 'Jump into the SDK, APIs, and ways to integrate Balancer',
      link: '/sdk/overview',
    },
    {
      title: 'Smart Contracts',
      details: 'Deployment addresses, ABIs, helpful walthroughs, and more',
      link: '/reference/contracts/deployment-addresses/mainnet.html',
    },
    {
      title: 'Dev Guides',
      details: 'Follow along helpful guides with example code',
      link: '/guides',
    },
  ];
});

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
);

// sidebar
const sidebarItems = useSidebarItems();
const isSidebarOpen = ref(false);
const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value;
};
const touchStart = { x: 0, y: 0 };
const onTouchStart = (e): void => {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
};
const onTouchEnd = (e): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  }
};

// classes
const containerClass = computed(() => [
  {
    'no-navbar': !shouldShowNavbar.value,
    'no-sidebar': !sidebarItems.value.length,
    'sidebar-open': isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
]);

// close sidebar after navigation
let unregisterRouterHook;
onMounted(() => {
  const router = useRouter();
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false);
  });
});
onUnmounted(() => {
  unregisterRouterHook();
});

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise();
const onBeforeEnter = scrollPromise.resolve;
const onBeforeLeave = scrollPromise.pending;
</script>

<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="navbar">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <slot name="sidebar">
      <Sidebar>
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>
    </slot>
    <main class="home">
      <div class="theme-default-content">
        <header class="not-found-hero">
          <h1 id="main-title">404 Not Found</h1>
          <p>
            Our docs have recently migrated. Use the search in the top nav or
            links below to find the page you were looking for
          </p>
        </header>
        <slot name="404">
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
        </slot>
      </div>
    </main>
  </div>
</template>

<style scoped>

.not-found-hero {
  padding-top: 100px;
  text-align: center;
  margin-bottom: 2em;
  color: var(--c-text);
}
.docs-cards {
  grid-gap: 1.35rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding-bottom: 2em;
}
</style>