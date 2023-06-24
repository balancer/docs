<script setup>
import { ref } from 'vue';

const NETWORKS = [
  {
    id: 1,
    name: 'Ethereum',
    logo: 'https://app.balancer.fi/assets/ethereum-04abbc11.svg',
    explorer: 'https://etherscan.io',
    rpcUrl: 'https://eth.llamarpc.com',
  },
  {
    id: 100,
    name: 'Gnosis Chain',
    logo: 'https://app.balancer.fi/assets/gnosis-chain-104b3e4f.svg',
    explorer: 'https://gnosisscan.io',
    rpcUrl: 'https://rpc.ankr.com/gnosis',
  },
  {
    id: 137,
    name: 'Polygon PoS',
    logo: 'https://app.balancer.fi/assets/polygon-db738948.svg',
    explorer: 'https://polygonscan.com',
    rpcUrl: 'https://polygon.llamarpc.com',
  },
  {
    id: 1101,
    name: 'Polygon zkEVM',
    logo: 'https://app.balancer.fi/assets/zkevm-e64465b0.svg',
    explorer: 'https://zkevm.polygonscan.com',
    rpcUrl: 'https://rpc.ankr.com/polygon_zkevm',
  },
  {
    id: 42161,
    name: 'Arbitrum',
    logo: 'https://app.balancer.fi/assets/arbitrum-one-14ea26eb.svg',
    explorer: 'https://arbiscan.io',
    rpcUrl: 'https://rpc.ankr.com/arbitrum',
  },
];

const networks = ref(NETWORKS);
const selectedNetwork = ref(NETWORKS[0]);

const selectedPage = ref('sor');

function onNetworkSelect(value) {
  selectedNetwork.value = value;
}

function onPageSelect(value) {
  selectedPage.value = value;
}
</script>
<template>
  <div class="ToolboxWidget">
    <ToolboxWidgetNav
      :networks="networks"
      :selectedNetwork="selectedNetwork"
      :onNetworkSelect="onNetworkSelect"
      :selectedPage="selectedPage"
      :onPageSelect="onPageSelect"
    />
    <div class="ToolboxWidget__content">
      <PoolsView v-if="selectedPage === 'pools'" :network="selectedNetwork" />
      <SmartOrderRouterView
        v-if="selectedPage === 'sor'"
        :network="selectedNetwork"
      />
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0;
}

.ToolboxWidget {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.dark .ToolboxWidget {
  background-color: #1e293b;
}

.ToolboxWidget__content {
  padding: 24px;
}
</style>
