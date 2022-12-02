import type { NavbarConfig } from '@vuepress/theme-default';

export const navbar: NavbarConfig = [
  {
    text: 'Concepts',
    link: '/',
  },
  {
    text: 'SDK',
    link: '/sdk/',
  },
  {
    text: 'Developer Tutorials',
    link: '/tutorials',
  },
  {
    text: 'Reference',
    children: [
      {
        text: 'Contracts',
        children: ['/reference/contracts/addresses/'],
      },
      {
        text: 'Bundlers',
        link: '/reference/error-codes',
      },
    ],
  },
];
