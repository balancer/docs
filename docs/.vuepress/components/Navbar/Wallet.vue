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
  <w3m-button />
  <w3m-network-button />
</template>