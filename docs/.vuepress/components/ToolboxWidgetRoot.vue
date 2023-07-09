<script setup>
import { provideNetwork } from '../providers/network';
import { provideTokens } from '../providers/tokens';
import { createProviderComponent } from '../providers/createProviderComponent';
import { providePools } from '../providers/pools';

const NetworkProvider = createProviderComponent(() => provideNetwork());
const GlobalProvider = createProviderComponent(() => {
  provideTokens();
  providePools();
});
</script>
<template>
  <NetworkProvider>
    <GlobalProvider>
      <ToolboxWidget />
    </GlobalProvider>
  </NetworkProvider>
</template>
