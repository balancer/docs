<script setup>
import { watch, onMounted } from 'vue';
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
} from '@web3modal/ethers/vue';
import { NETWORKS } from '../../constants/networks';
import { useNetwork } from '../../providers/network';

const { selectNetwork } = useNetwork();

const projectId = 'c6317c5d201b5bf046ce39e781ce0e78';

const chains = NETWORKS.map(n => ({
  chainId: n.id,
  name: n.name,
  explorerUrl: n.explorer,
  rpcUrl: n.rpcUrl,
  currency: 'ETH',
}));

const metadata = {
  name: 'Balancer Docs',
  description: 'Balancer Docs',
  url: 'https://docs.balancer.fi/',
  icons: ['https://avatars.mywebsite.com/'],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains,
  optionalChains: [80001],
  projectId,
  // defaultChain: chains[0],
  themeVariables: {
    '--w3m-accent': '#0EA5E9',
    '--w3m-color-mix': '#000000',
    '--w3m-color-mix-strength': 40,
    '--wui-font-family': 'red',
  },
});

const { chainId } = useWeb3ModalAccount();

watch(chainId, value => {
  selectNetwork(NETWORKS.find(x => x.id === value));
});

onMounted(() => {
  if (!chainId.value) return;
  selectNetwork(NETWORKS.find(x => x.id === chainId.value));
});
</script>

<template>
  <div class="btn-connect">
    <w3m-button />
  </div>
  <div class="network-selector">
    <w3m-network-button />
  </div>
</template>

<style scoped>
.network-selector,
.btn-connect {
  margin-left: 5px;
  background: #eaf0f6;
  border-radius: 20px;
}

.dark .btn-connect,
.dark .network-selector {
  background: #1e293b;
}
</style>