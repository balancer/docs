import { defineClientConfig } from '@vuepress/client';
import { h } from 'vue';
import { captureException, init, setTag } from '@sentry/browser';
import {
  Badge,
  CodeGroup,
  CodeGroupItem,
  PillLink,
} from './components/global/index.js';
import {
  setupDarkMode,
  setupSidebarItems,
  useScrollPromise,
} from './composables/index.js';
import Layout from './layouts/Layout.vue';
import NotFound from './layouts/NotFound.vue';

import './styles/index.scss';

export default defineClientConfig({
  enhance({ app, router }) {
    app.component('Badge', Badge);
    app.component('CodeGroup', CodeGroup);
    app.component('PillLink', PillLink);
    app.component('CodeGroupItem', CodeGroupItem);

    // compat with @vuepress/plugin-external-link-icon
    app.component('AutoLinkExternalIcon', () => {
      const ExternalLinkIcon = app.component('ExternalLinkIcon');
      if (ExternalLinkIcon) {
        return h(ExternalLinkIcon);
      }
      return null;
    });

    // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
    app.component('NavbarSearch', () => {
      const SearchComponent =
        app.component('Docsearch') || app.component('SearchBox');
      if (SearchComponent) {
        return h(SearchComponent);
      }
      return null;
    });

    init({
      dsn: 'https://d3b01ec4cb9942bc8f1c8549646d2a3b@o574636.ingest.sentry.io/4504623555870720',
    });

    // handle scrollBehavior with transition
    const scrollBehavior = router.options.scrollBehavior!;
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();
      return scrollBehavior(...args);
    };
  },

  setup() {
    setupDarkMode();
    setupSidebarItems();
  },

  layouts: {
    Layout,
    NotFound,
  },
});
