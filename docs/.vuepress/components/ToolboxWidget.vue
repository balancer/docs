<script setup>
import { ref } from 'vue';
import { createProviderComponent } from '../providers/createProviderComponent';
import { provideNetwork } from '../providers/network';
import { providePools } from '../providers/pools';
import { provideTokens } from '../providers/tokens';
import Navbar from './Navbar/Navbar.vue';
import BatchSwapView from './BatchSwap/BatchSwapView.vue';
import PoolsView from './PoolsView/PoolsView.vue';
import SmartOrderRouterView from './SmartOrderRouter/SmartOrderRouterView.vue';

const selectedPage = ref('sor');

const NetworkProvider = createProviderComponent(() => provideNetwork());

const GlobalProvider = createProviderComponent(() => {
  provideTokens();
  providePools();
});
</script>
<template>
  <NetworkProvider>
    <GlobalProvider>
      <div class="ToolboxWidget">
        <div class="ToolboxWidget__nav">
          <Navbar
            :selectedPage="selectedPage"
            :onPageSelect="value => (selectedPage = value)"
          />
        </div>
        <div class="ToolboxWidget__content">
          <PoolsView v-if="selectedPage === 'pools'" />
          <BatchSwapView v-if="selectedPage === 'batch_swap'" />
          <SmartOrderRouterView v-if="selectedPage === 'sor'" />
        </div>
      </div>
    </GlobalProvider>
  </NetworkProvider>
</template>
<style>
.ToolboxWidget {
  color: #0f172a;
}

.ToolboxWidget p {
  font-size: 16px;
  line-height: 24px;
  margin: 0;
}

.ToolboxWidget input {
  font-family: var(--font-family);
}

.ToolboxWidget button {
  font-family: var(--font-family);
  cursor: pointer;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.ToolboxWidget ul,
.ToolboxWidget li {
  margin: 0;
  padding: 0;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style scoped>
.ToolboxWidget {
  aspect-ratio: 4 / 3;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  overflow: hidden;
}

.ToolboxWidget__content {
  overflow-y: auto;
  flex: 1;
}
</style>
