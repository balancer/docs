import process from 'node:process';
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance';
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { balancerTheme } from '../../theme/lib/node';
import { navbar, sidebar } from './configs/index.js';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig({
  // set site base to default value
  base: '/',

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Balancer',
      description: 'Learn, integrate, and build on a programmable AMM',
    },
  },

  bundler: viteBundler({
    viteOptions: {
      define: {
        'process.env': process.env,
      },
    },
    vuePluginOptions: {},
  }),

  // configure default theme
  theme: balancerTheme({
    logo: '/images/logo-light.svg',
    logoDark: '/images/logo-dark.svg',
    repo: 'vuepress/vuepress-next',
    docsDir: 'docs',

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        navbar: navbar,
        navbarDepth: 2,
        // sidebar
        sidebar: sidebar,
        sidebarDepth: 0,
        // page meta
        editLinkText: 'Edit this page on GitHub',
      },
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      // use shiki plugin in production mode instead
      prismjs: true,
    },
  }),

  // use plugins
  plugins: [
    mdEnhancePlugin({
      mathjax: true,
      container: true,
      codetabs: true,
      include: true,
      tabs: true,
      chart: true,
    }),
  ],
});
