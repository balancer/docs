<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchInput from 'vue-search-input';

const router = useRouter();

onMounted(() => {
  Promise.all([
    import(
      /* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.js'
    ),
    import(
      /* webpackChunkName: "docsearch" */ 'docsearch.js/dist/cdn/docsearch.min.css'
    ),
  ]).then(([docsearch]) => {
    docsearch = docsearch.default;
    docsearch({
      appId: 'Q107DW7NMM',
      apiKey: 'c611e593d4e81a8c6efde877c69c9d7f',
      indexName: 'dev_balancer',
      inputSelector: '#algolia-search-input',
      handleSelected: (input, event, suggestion) => {
        const { pathname, hash } = new URL(suggestion.url);
        const _hash = decodeURIComponent(hash);
        router.push(`${pathname}${_hash}`);
      },
    });
  });
});
</script>

<template>
  <form
    id="search-form"
    class="algolia-search-wrapper search-box"
    role="search"
  >
    <SearchInput id="algolia-search-input" placeholder="" />
  </form>
</template>

<style>
@import 'vue-search-input/dist/styles.css';

.search-box {
  width: 600px;
  margin: 20px auto;
}

.search-input-wrapper .search-icon.search {
  z-index: 10;
  left: 15px;
  bottom: 25px;
}

.search-input-wrapper .search-icon.shortcut {
  height: 45px;
  width: 30px;
}

.search-input-wrapper .search-icon.shortcut::after {
  width: 3px;
  height: 30px;
  top: 8px;
  left: 13px;
}

.search-input-wrapper input[data-search-input='true'] {
  font-size: 20px;
  height: 60px;
  padding: 15px 30px 15px 35px;
}

.algolia-autocomplete {
  width: 100%;
}
</style>
