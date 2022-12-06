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
                link: '/reference/general/addresses/#arbitrum',
              },
            ],
          },
          '/reference/general/error-codes',
        ],
      },
    ],
  },
];
