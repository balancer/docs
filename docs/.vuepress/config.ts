import process from 'node:process';
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from '@vuepress/cli';
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance';
import { copyCodePlugin } from 'vuepress-plugin-copy-code2';
import { balancerTheme } from '../../theme/';
import { navbar, sidebar } from './configs/index.js';
import { typedocPlugin } from 'vuepress-plugin-typedoc/next';
import fs from 'fs';

const isProd = process.env.NODE_ENV === 'production';

const useTypedoc = fs.existsSync('../balancer-sdk/balancer-js/src/index.ts');

const typedocConfig = typedocPlugin({
  // TypeDoc options
  entryPoints: ['../balancer-sdk/balancer-js/src/index.ts'],
  tsconfig: '../balancer-sdk/balancer-js/tsconfig.json',
  compilerOptions: {
    strictPropertyInitialization: false
  },
  cleanOutputDir: true,
  excludeNotDocumented: true,
  excludeNotDocumentedKinds: [
    "Module",
    "Namespace",
    // "Enum",
    // "EnumMember", // Not enabled by default
    "Variable",
    "Function",
    "Class",
    "Interface",
    // "Constructor",
    // "Property",
    // "Method",
    // "CallSignature",
    // "IndexSignature",
    // "ConstructorSignature",
    "Accessor",
    // "GetSignature",
    // "SetSignature",
    // "TypeAlias",
    "Reference",
  ],
  excludeInternal: true,
  excludePrivate: true,
  gitRevision: "master",
  // Plugin options
  out: "sdk/reference",
  hideInPageTOC: true,
  sidebar: {
    autoConfiguration: false,
    // fullNames: true,
    parentCategory: "Reference"
  }
});

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
    repo: 'balancer-labs/docs',
    docsDir: 'docs',
    lastUpdated: false,

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
        // sidebar
        sidebar: sidebar,
        sidebarDepth: 0,
        // page meta
        editLinkText: 'Edit page on GitHub',
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
    copyCodePlugin({}),
    useTypedoc ? typedocConfig : null,
    mdEnhancePlugin({
      mathjax: true,
      container: true,
      codetabs: true,
      include: true,
      tabs: true,
      chart: true,
      mermaid: true,
    }),
  ].filter((p) => p !== null),
});
