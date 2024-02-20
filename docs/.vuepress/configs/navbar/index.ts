import type { NavbarConfig } from '@vuepress/theme-default';

export const navbar: NavbarConfig = [
  {
    text: 'Concepts',
    link: '/',
  },
  {
    text: 'SDK',
    link: '/sdk/overview',
  },
  {
    text: 'Developer Guides',
    link: '/guides',
  },
  {
    text: 'Reference',
    children: [
      {
        text: 'Contracts',
        link: '/reference/contracts',
        children: [
          {
            text: 'Deployment Addresses',
            link: '/reference/contracts/deployment-addresses/mainnet',
            children: [
              {
                text: 'Mainnet',
                link: '/reference/contracts/deployment-addresses/mainnet',
              },
              {
                text: 'Arbitrum',
                link: '/reference/contracts/deployment-addresses/arbitrum',
              },
              {
                text: 'Optimism',
                link: '/reference/contracts/deployment-addresses/optimism',
              },
              {
                text: 'Polygon',
                link: '/reference/contracts/deployment-addresses/polygon',
              },
              {
                text: 'Gnosis',
                link: '/reference/contracts/deployment-addresses/gnosis',
              },
              {
                text: 'Polygon zkEVM',
                link: '/reference/contracts/deployment-addresses/zkevm',
              },
              {
                text: 'Avalanche',
                link: '/reference/contracts/deployment-addresses/avalanche',
              },
              {
                text: 'Goerli(testnet)',
                link: '/reference/contracts/deployment-addresses/goerli',
              },
              {
                text: 'Sepolia(testnet)',
                link: '/reference/contracts/deployment-addresses/sepolia',
              },
            ],
          },
          {
            text: 'Authorizer Permissions',
            link: '/reference/authorizer',
            children: [
              {
                text: 'Mainnet',
                link: '/reference/authorizer/mainnet',
              },
              {
                text: 'Arbitrum',
                link: '/reference/authorizer/arbitrum',
              },
              {
                text: 'Optimism',
                link: '/reference/authorizer/optimism',
              },
              {
                text: 'Polygon',
                link: '/reference/authorizer/polygon',
              },
              {
                text: 'Gnosis',
                link: '/reference/authorizer/gnosis',
              },
              {
                text: 'Polygon zkEVM',
                link: '/reference/authorizer/zkevm'
              },
              {
                text: 'Avalanche',
                link: '/reference/authorizer/avalanche'
              },
              {
                text: 'Goerli(testnet)',
                link: '/reference/authorizer/goerli',
              },
              {
                text: 'Sepolia(testnet)',
                link: '/reference/authorizer/sepolia',
              },
            ],
          },
          {
            text: 'APIs',
            link: '/reference/contracts/apis/vault',
          },
          '/reference/contracts/security',
          '/reference/contracts/error-codes',
          '/reference/contracts/query-functions',
        ],
      },
      {
        text: 'Subgraph',
        children: [
          {
            text: 'Overview',
            link: '/reference/subgraph/',
            children: [
              {
                text: 'Core',
                link: '/reference/subgraph/core/entities',
              },
              {
                text: 'Gauges',
                link: '/reference/subgraph/gauges/entities',
              },
            ],
          },
        ],
      },
      {
        text: 'Dune',
        children: [
          {
            text: 'Overview',
            link: '/reference/dune/',
          },
        ],
      },      
      {
        text: 'Swaps / Joins / Exits',
        children: [
          '/reference/swaps/batch-swaps',
          '/reference/swaps/flash-swaps',
          '/reference/swaps/single-swap',
          '/reference/joins-and-exits/pool-joins',
          '/reference/joins-and-exits/pool-exits',
        ],
      },
      {
        text: 'Math',
        children: [
          '/reference/math/weighted-math',
          '/reference/math/stable-math',
          '/reference/math/linear-math',
        ],
      },
      {
        text: 'veBAL & Gauges',
        children: [
          '/reference/vebal-and-gauges/apr-calculation',
          '/reference/vebal-and-gauges/gauges',
          '/reference/vebal-and-gauges/vebal',
        ],
      },
      {
        text: 'Vote Escrow Launchpad',
        children: [
          '/reference/vote-escrow-launchpad/1_launchpad',
          '/reference/vote-escrow-launchpad/2_VotingEscrow',
          '/reference/vote-escrow-launchpad/3_RewardDistributor',
          '/reference/vote-escrow-launchpad/4_RewardFaucet',
          '/reference/vote-escrow-launchpad/5_Troubleshooting',
          '/reference/vote-escrow-launchpad/6_LensReward',
          '/reference/vote-escrow-launchpad/7_SmartWalletWhitelist',
        ],
      },
    ],
  },
  {
    text: 'Tools',
    link: '/tools',
  },
];
