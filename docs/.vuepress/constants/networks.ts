import { Network } from '@balancer-labs/sdk';

export interface NetworkConfig {
  id: Network | 1101 | 43114 | 8453 | 100 | 11155111;
  name: string;
  logo: string;
  explorer: string;
  rpcUrl: string;
}

export const NETWORKS: NetworkConfig[] = [
  {
    id: Network.MAINNET,
    name: 'Ethereum',
    logo: '/images/chains/ethereum-logo.svg',
    explorer: 'https://etherscan.io',
    rpcUrl: 'https://eth.llamarpc.com',
  },
  {
    id: 137,
    name: 'Polygon PoS',
    logo: '/images/chains/polygon-pos-logo.svg',
    explorer: 'https://polygonscan.com',
    rpcUrl: 'https://polygon-rpc.com',
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
    logo: '/images/chains/arbitrum-logo.svg',
    explorer: 'https://arbiscan.io',
    rpcUrl: 'https://rpc.ankr.com/arbitrum',
  },
  {
    id: Network.OPTIMISM,
    name: 'Optimism',
    logo: '',
    explorer: 'https://optimistic.etherscan.io/',
    rpcUrl: 'https://rpc.tornadoeth.cash/optimism',
  },
  {
    id: 43114,
    name: 'Avalanche',
    logo: '',
    explorer: 'https://snowtrace.io/',
    rpcUrl: 'https://rpc.tornadoeth.cash/avax',
  },
  {
    id: 8453,
    name: 'Base',
    logo: '',
    explorer: 'https://basescan.org/',
    rpcUrl: 'https://base-pokt.nodies.app',
  },
  {
    id: 100,
    name: 'Gnosis',
    logo: '',
    explorer: 'https://gnosisscan.io/',
    rpcUrl: 'https://gnosis-pokt.nodies.app',
  },
  {
    id: 11155111,
    name: 'Sepolia',
    logo: '',
    explorer: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://eth-sepolia-public.unifra.io',
  },
];
