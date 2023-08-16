<script setup>
import { createProviderComponent } from '../providers/createProviderComponent';
import { provideNetwork } from '../providers/network';
import { providePools } from '../providers/pools';
import { provideTokens } from '../providers/tokens';
import PoolsView from './PoolsView/PoolsView.vue';

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
        <div class="ToolboxWidget__content">
          <PoolsView />
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
  display: flex;
  flex-direction: column;
}

.dark .ToolboxWidget {
  color: #fff;
}

.ToolboxWidget__content {
  flex: 1;
}
</style>
