<script setup lang="ts">
import { onMounted, computed, watch } from 'vue';
import type { ComputedRef } from 'vue';
import { useRoute } from 'vue-router';
import { usePageData, usePageFrontmatter } from '@vuepress/client';
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
  NavLink,
} from '../../shared/index.js';
import AutoLink from '@theme/AutoLink.vue';
import RightAnchorItem from '@theme/RightAnchorItem.vue';
import ReferenceCard from '@theme/ReferenceCard.vue';
import GuideCard from '@theme/GuideCard.vue';
import { useThemeLocaleData } from '../composables/index.js';
import { resolveEditLink } from '../utils/index.js';

const useEditNavLink = (): ComputedRef<null | NavLink> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<DefaultThemePageData>();
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>();

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true;
    if (!showEditLink) {
      return null;
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value;

    if (!docsRepo) return null;

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern:
        frontmatter.value.editLinkPattern ?? themeLocale.value.editLinkPattern,
    });

    if (!editLink) return null;

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    };
  });
};

const route = useRoute();
const page = usePageData();
const editNavLink = useEditNavLink();

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
    <ReferenceCard />
    <GuideCard />
    <div v-if="page.headers.length" class="right-anchor-container">
      <span class="right-anchor-content">Page contents</span>
      <ul class="right-anchor-items">
        <RightAnchorItem
          v-for="item in page.headers"
          :key="`${item.title}${item.link}`"
          :item="item"
          class="right-anchor-subgroup"
        />
      </ul>
      <div v-if="editNavLink" class="meta-item edit-link">
        <AutoLink class="meta-item-label" :item="editNavLink" />
      </div>
    </div>
  </aside>
</template>