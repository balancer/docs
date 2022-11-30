<script setup lang="ts">
import HomeContent from '@theme/HomeContent.vue';
import HomeFeatures from '@theme/HomeFeatures.vue';
import HomeFooter from '@theme/HomeFooter.vue';
import HomeHero from '@theme/HomeHero.vue';
import HomeSearch from './HomeSearch.vue';
</script>

<template>
  <main class="home">
    <HomeHero />
    <HomeSearch />
    <HomeFeatures />
    <HomeContent />
    <HomeFooter />
  </main>
</template>
