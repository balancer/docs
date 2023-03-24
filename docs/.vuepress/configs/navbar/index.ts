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
                text: 'Goerli',
                link: '/reference/contracts/deployment-addresses/goerli',
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
    ],
  },
];
