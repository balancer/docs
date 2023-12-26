<script setup>
import { createProviderComponent } from '../providers/createProviderComponent';
import { provideVeSystem } from '../providers/veSystem';
import { provideNetwork } from '../providers/network';
import TabsComponent from './ve8020/TabsComponent.vue';

const NetworkProvider = createProviderComponent(() => provideNetwork());
const VeSystemProvider = createProviderComponent(() => provideVeSystem());
</script>

<template>
  <NetworkProvider>
    <VeSystemProvider>
      <TabsComponent />
    </VeSystemProvider>
  </NetworkProvider>
</template>