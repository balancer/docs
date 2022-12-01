<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePageData } from '@vuepress/client';
import RightAnchorItem from '@theme/RightAnchorItem.vue';

const route = useRoute();
const page = usePageData();

onMounted(() => {
  watch(
    () => route.hash,
    hash => {
      // get the sidebar DOM
      const rightAnchor = document.querySelector('.right-anchor');
      if (!rightAnchor) return;

      // get the active sidebar item DOM, whose href equals to the current route
      const activeRightAnchorItem = document.querySelector(
        `.right-anchor a.right-anchor-item[href="${route.path}${hash}"]`
      );
      if (!activeRightAnchorItem) return;

      // get the top and height of the sidebar
      const { top: sidebarTop, height: sidebarHeight } =
        rightAnchor.getBoundingClientRect();
      // get the top and height of the active sidebar item
      const { top: activeSidebarItemTop, height: activeSidebarItemHeight } =
        activeRightAnchorItem.getBoundingClientRect();

      // when the active sidebar item overflows the top edge of sidebar
      if (activeSidebarItemTop < sidebarTop) {
        // scroll to the top edge of sidebar
        activeRightAnchorItem.scrollIntoView(true);
      }
      // when the active sidebar item overflows the bottom edge of sidebar
      else if (
        activeSidebarItemTop + activeSidebarItemHeight >
        sidebarTop + sidebarHeight
      ) {
        // scroll to the bottom edge of sidebar
        activeRightAnchorItem.scrollIntoView(false);
      }
    }
  );
});
</script>

<template>
  <aside class="right-anchor">
    <span class="right-anchor-content">Contents</span>
    <ul v-if="page.headers.length" class="right-anchor-items">
      <RightAnchorItem
        v-for="item in page.headers"
        :key="`${item.title}${item.link}`"
        :item="item"
      />
    </ul>
  </aside>
</template>