<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import NavbarBrand from '@theme/NavbarBrand.vue';
import NavbarItems from '@theme/NavbarItems.vue';
import ToggleColorModeButton from '@theme/ToggleColorModeButton.vue';
import ToggleSidebarButton from '@theme/ToggleSidebarButton.vue';
import DiscordIcon from './icons/brands/DiscordIcon.vue';
import GithubIcon from './icons/brands/GithubIcon.vue';
import SearchBar from './SearchBar.vue';
import { computed, onMounted, ref } from 'vue';
import { useThemeLocaleData } from '../composables/index.js';

defineEmits(['toggle-sidebar']);

const themeLocale = useThemeLocaleData();
const frontmatter = usePageFrontmatter();

const navbar = ref<HTMLElement | null>(null);
const navbarBrand = ref<HTMLElement | null>(null);

const linksWrapperMaxWidth = ref(0);
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {};
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  };
});

// avoid overlapping of long title and long navbar links
onMounted(() => {
  // TODO: migrate to css var
  // refer to _variables.scss
  const MOBILE_DESKTOP_BREAKPOINT = 719;
  const navbarHorizontalPadding =
    getCssValue(navbar.value, 'paddingLeft') +
    getCssValue(navbar.value, 'paddingRight');
  const handleLinksWrapWidth = (): void => {
    if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
      linksWrapperMaxWidth.value = 0;
    } else {
      linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0);
    }
  };
  handleLinksWrapWidth();
  window.addEventListener('resize', handleLinksWrapWidth, false);
  window.addEventListener('orientationchange', handleLinksWrapWidth, false);
});

function getCssValue(el: HTMLElement | null, property: string): number {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ];
  const num = Number.parseInt(val, 10);
  return Number.isNaN(num) ? 0 : num;
}
</script>

<template>
  <header ref="navbar" class="navbar">
    <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

    <span ref="navbarBrand">
      <NavbarBrand />
    </span>

    <div class="navbar-items-wrapper" :style="linksWrapperStyle">
      <slot name="before" />
      <NavbarItems class="can-hide" />
      <slot name="after" />
    </div>
    <div class="navbar-items-right" :style="linksWrapperStyle">
      <SearchBar v-if="!frontmatter.home" />
      <div class="dark-mode-container">
        <ToggleColorModeButton v-if="themeLocale.colorModeSwitch" />
      </div>
      <a class="social-btn" href="https://discord.balancer.fi/" target="_blank"
        ><DiscordIcon
      /></a>
      <a
        class="social-btn"
        href="https://github.com/balancer/"
        target="_blank"
        ><GithubIcon
      /></a>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.social-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 5px;
  background: var(--c-bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 0.5rem;
  box-shadow: var(--box-shadow-standard);
  transition: var(--t-transition);
  &:hover {
    background: var(--c-bg-lighter);
    box-shadow: none;
  }
}
.social-btn :deep(.social-icon) {
  fill: var(--c-text);
  width: 1.5rem;
  height: 1.5rem;
}
.social-btn:hover :deep(.social-icon) {
  transform-origin: center;
  transform: scale(1.1);
}
</style>
