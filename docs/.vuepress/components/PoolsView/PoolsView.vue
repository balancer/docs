<script setup>
import { ref, watch } from 'vue';
import { usePools } from '../../providers/pools';
import PoolDetails from './PoolDetails.vue';
import ActionsCard from './ActionsCard.vue';
import Search from './Search.vue';
import TokenList from './TokenList.vue';

const { pools } = usePools();

const pool = ref(pools.value.length > 0 ? pools.value[0] : null);

watch(pools, () => {
  if (pools.value.length > 0) {
    pool.value = pools.value[0];
  }
});

function handleSearch(query) {
  const result = pools.value.find(p => {
    return p.id === query || p.address === query;
  });

  if (!result) {
    return;
  }

  pool.value = result;
}
</script>
<template>
  <div class="pools-view">
    <Search :onSearch="handleSearch" />
    <template v-if="pool">
      <div class="pool-header">
        <p class="pool-name">{{ pool.name }}</p>
        <p class="pool-id"><strong>ID:</strong> {{ pool.id }}</p>
      </div>
      <hr />
      <div class="pool-details">
        <div class="pool-details__col">
          <TokenList :pool="pool" />
          <PoolDetails :pool="pool" />
        </div>
        <div class="pool-details__col">
          <ActionsCard :pool="pool" />
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped>
hr {
  border-color: #e2e8f0;
  margin-bottom: 0;
}

.pools-view {
  padding: 24px;
}

.pools-view > * + * {
  margin-top: 24px;
}

.pool-name {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.pool-id {
  font-size: 14px;
  line-height: 20px;
}

.pool-details {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 36px;
}

.pool-details__col > * + * {
  margin-top: 36px;
}
</style>
