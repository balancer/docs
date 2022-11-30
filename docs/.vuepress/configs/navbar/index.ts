import type { NavbarConfig } from '@vuepress/theme-default';

export const navbar: NavbarConfig = [
  {
    text: 'Concepts',
    link: '/concepts/',
    children: [
      {
        text: 'Basics',
        link: '/concepts/basics',
      },
      {
        text: 'Architecture',
        link: '/concepts/architecture',
      },
      {
        text: 'Vault',
        link: '/concepts/vault',
      },
      {
        text: 'Smart Order Router',
        link: '/concepts/smart-order-router',
      },
      {
        text: 'Pools',
        link: '/concepts/pools',
        children: [
          {
            text: 'Weighted',
            link: '/concepts/pools/weighted',
          },
          {
            text: 'Boosted',
            link: '/concepts/pools/boosted',
          },
        ],
      },
      {
        text: 'Governance',
        link: '/concepts/governance',
        children: [
          {
            text: 'BAL Token',
            link: '/concepts/governance/bal-token',
          },
          {
            text: 'Snapshot',
            link: '/concepts/governance/snapshot',
          },
          {
            text: 'Multisig',
            link: '/concepts/governance/multisig',
          },
        ],
      },
    ],
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
