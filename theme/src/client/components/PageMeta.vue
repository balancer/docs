<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue';
import { usePageData, usePageFrontmatter } from '@vuepress/client';
import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
  NavLink,
} from '../../shared/index.js';
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

const useLastUpdated = (): ComputedRef<null | string> => {
  const themeLocale = useThemeLocaleData();
  const page = usePageData<DefaultThemePageData>();
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>();

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true;

    if (!showLastUpdated) return null;

    if (!page.value.git?.updatedTime) return null;

    const updatedDate = new Date(page.value.git?.updatedTime);

    return updatedDate.toLocaleString();
  });
};

const themeLocale = useThemeLocaleData();
const editNavLink = useEditNavLink();
const lastUpdated = useLastUpdated();
</script>

<template>
  <footer class="page-meta">

    <div v-if="lastUpdated" class="meta-item last-updated">
      <span class="meta-item-label">{{ themeLocale.lastUpdatedText }}: </span>
      <ClientOnly>
        <span class="meta-item-info">{{ lastUpdated }}</span>
      </ClientOnly>
    </div>
  </footer>
</template>
