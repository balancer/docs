<script setup>
import { createProviderComponent } from '../providers/createProviderComponent';
import { provideLaunchpad } from '../providers/launchpad';
import { provideNetwork } from '../providers/network';
import TabsComponent from './ve8020/admin/TabsComponent.vue';

const NetworkProvider = createProviderComponent(() => provideNetwork());
const LaunchpadProvider = createProviderComponent(() => provideLaunchpad());
</script>

<template>
  <NetworkProvider>
    <LaunchpadProvider>
      <TabsComponent />
    </LaunchpadProvider>
  </NetworkProvider>
</template>