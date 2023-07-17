import { Network } from '@balancer-labs/sdk';

export interface NetworkConfig {
  id: Network;
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
    rpcUrl: 'https://polygon.llamarpc.com',
  },
  // {
  //   id: 1101,
  //   name: 'Polygon zkEVM',
  //   logo: 'https://app.balancer.fi/assets/zkevm-e64465b0.svg',
  //   explorer: 'https://zkevm.polygonscan.com',
  //   rpcUrl: 'https://rpc.ankr.com/polygon_zkevm',
  // },
  {
    id: 42161,
    name: 'Arbitrum',
    logo: '/images/chains/arbitrum-logo.svg',
    explorer: 'https://arbiscan.io',
    rpcUrl: 'https://rpc.ankr.com/arbitrum',
  },
];
