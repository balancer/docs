<script setup lang="ts">
import PageHero from '@theme/PageHero.vue';
import PageMeta from '@theme/PageMeta.vue';
import PageNav from '@theme/PageNav.vue';
import RightAnchor from '@theme/RightAnchor.vue';
</script>

<template>
  <main class="page">
    <PageHero />
    <slot name="top" />
    <div class="row">
      <div class="theme-default-content col">
        <slot name="content-top" />

        <Content />

        <slot name="content-bottom" />

        <PageMeta />

        <PageNav />
      </div>
      <div class="rightbar col">
        <RightAnchor />
      </div>
    </div>

    <slot name="bottom" />
  </main>
</template>
