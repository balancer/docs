<script setup>
import { ref, watch } from 'vue';
import { usePools } from '../../providers/pools';
import PoolDetails from './PoolDetails.vue';
import ActionsCard from './ActionsCard.vue';
import Search from './Search.vue';
import TokenList from './TokenList.vue';
import NetworkSelect from '../Navbar/NetworkSelect.vue';
import { useNetwork } from '../../providers/network';

const { network } = useNetwork();
const { pools, isLoading } = usePools();

const pool = ref(pools.value.length > 0 ? pools.value[0] : null);

watch(pools, () => {
  if (pools.value.length > 0) {
    pool.value = pools.value[0];
  }
});

watch(network, () => {
  pool.value = null;
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
    <div class="search-row">
      <div style="flex: 1">
        <Search :onSearch="handleSearch" />
      </div>
      <div>
        <NetworkSelect />
      </div>
    </div>
    <template v-if="pool && !isLoading">
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
  margin-bottom: 0;
}

.pools-view {
  aspect-ratio: 1.5;
}

.pools-view > * + * {
  margin-top: 24px;
}

.search-row {
  align-items: center;
  display: flex;
  gap: 16px;
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
