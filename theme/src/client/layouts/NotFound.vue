<script setup lang="ts">
import { useRouteLocale } from '@vuepress/client';
import { useThemeLocaleData } from '../composables/index.js';

const routeLocale = useRouteLocale();
const themeLocale = useThemeLocaleData();

const messages = themeLocale.value.notFound ?? ['Not Found'];
const getMsg = (): string =>
  messages[Math.floor(Math.random() * messages.length)];
const homeLink = themeLocale.value.home ?? routeLocale.value;
const homeText = themeLocale.value.backToHome ?? 'Back to home';
</script>

<template>
  <div class="theme-container">
    <main class="page">
      <div class="theme-default-content">
        <h1>404 test</h1>

        <blockquote>{{ getMsg() }}</blockquote>

        <RouterLink :to="homeLink">{{ homeText }}</RouterLink>
      </div>
    </main>
  </div>
</template>