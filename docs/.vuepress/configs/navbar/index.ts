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
            link: '/reference/general/addresses/',
            children: [
              {
                text: 'Mainnet',
                link: '/reference/general/addresses/',
              },
              {
                text: 'Arbitrum',
                link: '/reference/general/addresses.html#arbitrum',
              },
              {
                text: 'Polygon',
                link: '/reference/general/addresses.html#polygon',
              },
            ],
          },
          '/reference/general/error-codes',
          '/reference/general/query-functions',
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
                link: '/reference/subgraph/core/',
              },
              {
                text: 'Gauges',
                link: '/reference/subgraph/gauges/',
              },
            ],
          },
        ],
      },
      {
        text: 'Swaps',
        children: [
          '/reference/swaps/batch-swaps',
          '/reference/swaps/flash-swaps',
          '/reference/swaps/single-swap',
        ],
      },
      {
        text: 'Math',
        children: [
          '/reference/math/weighted-math',
          '/reference/math/stable-math',
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
