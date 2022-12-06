<script setup lang="ts">
import AutoLink from '@theme/AutoLink.vue';
import NavbarDropdown from '@theme/NavbarDropdown.vue';
import { useRouteLocale, useSiteLocaleData } from '@vuepress/client';
import { isLinkHttp, isString } from '@vuepress/shared';
import { computed, onMounted, ref } from 'vue';
import type { ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import type {
  NavbarGroup,
  NavbarItem,
  ResolvedNavbarItem,
} from '../../shared/index.js';
import { useNavLink, useThemeLocaleData } from '../composables/index.js';
import { resolveRepoType } from '../utils/index.js';

/**
 * Get navbar config of select language dropdown
 */
const useNavbarSelectLanguage = (): ComputedRef<ResolvedNavbarItem[]> => {
  const router = useRouter();
  const routeLocale = useRouteLocale();
  const siteLocale = useSiteLocaleData();
  const themeLocale = useThemeLocaleData();

  return computed<ResolvedNavbarItem[]>(() => {
    const localePaths = Object.keys(siteLocale.value.locales);
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return [];
    }
    const currentPath = router.currentRoute.value.path;
    const currentFullPath = router.currentRoute.value.fullPath;
    const currentHash = router.currentRoute.value.hash;

    const languageDropdown: ResolvedNavbarItem = {
      text: themeLocale.value.selectLanguageText ?? 'unknown language',
      ariaLabel:
        themeLocale.value.selectLanguageAriaLabel ??
        themeLocale.value.selectLanguageText ??
        'unknown language',
      children: localePaths.map(targetLocalePath => {
        // target locale config of this language link
        const targetSiteLocale =
          siteLocale.value.locales?.[targetLocalePath] ?? {};
        const targetThemeLocale =
          themeLocale.value.locales?.[targetLocalePath] ?? {};
        const targetLang = `${targetSiteLocale.lang}`;

        const text = targetThemeLocale.selectLanguageName ?? targetLang;
        let link;

        if (targetLang === siteLocale.value.lang) {
          // if the target language is current language
          // stay at current link
          link = currentFullPath;
        } else {
          // if the target language is not current language
          // try to link to the corresponding page of current page
          // or fallback to homepage
          const targetLocalePage = currentPath.replace(
            routeLocale.value,
            targetLocalePath
          );
          if (router.getRoutes().some(item => item.path === targetLocalePage)) {
            // try to keep current hash across languages
            link = `${targetLocalePage}${currentHash}`;
          } else {
            link = targetThemeLocale.home ?? targetLocalePath;
          }
        }

        return {
          text,
          link,
        };
      }),
    };

    return [languageDropdown];
  });
};

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) {
    return useNavLink(item);
  }
  if ((item as NavbarGroup).children) {
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    };
  }
  return item as ResolvedNavbarItem;
};

const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocale = useThemeLocaleData();
  return computed(() =>
    (themeLocale.value.navbar || []).map(resolveNavbarItem)
  );
};

const isMobile = ref(false);
const navbarConfig = useNavbarConfig();
const navbarSelectLanguage = useNavbarSelectLanguage();
const navbarLinks = computed(() => [
  ...navbarConfig.value,
  ...navbarSelectLanguage.value,
]);

// avoid overlapping of long title and long navbar links
onMounted(() => {
  const MOBILE_DESKTOP_BREAKPOINT = 719;

  const handleMobile = (): void => {
    if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
      isMobile.value = true;
    } else {
      isMobile.value = false;
    }
  };
  handleMobile();
  window.addEventListener('resize', handleMobile, false);
  window.addEventListener('orientationchange', handleMobile, false);
});
</script>

<template>
  <nav v-if="navbarLinks.length" class="navbar-items">
    <div v-for="item in navbarLinks" :key="item.text" class="navbar-item">
      <NavbarDropdown
        v-if="item.children"
        :item="item"
        :class="isMobile ? 'mobile' : ''"
      />
      <AutoLink v-else :item="item" />
    </div>
  </nav>
</template>
