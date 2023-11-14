<script setup>
import { createProviderComponent } from '../providers/createProviderComponent';
import { provideNetwork } from '../providers/network';
import TabsComponent from './ve8020/TabsComponent.vue';

const NetworkProvider = createProviderComponent(() => provideNetwork());
</script>

<template>
  <NetworkProvider>
    <TabsComponent />
  </NetworkProvider>
</template>