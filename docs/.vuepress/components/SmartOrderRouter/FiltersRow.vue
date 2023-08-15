<script setup>
import { computed } from 'vue';
import { useTokens } from '../../providers/tokens';
import { usePools } from '../../providers/pools';
import { PoolType } from '@balancer-labs/sdk';
import { filterPool } from '../../utils';
import Filter from './Filter/Filter.vue';
import FilterMenu from './Filter/FilterMenu.vue';
import FilterTrigger from './Filter/FilterTrigger.vue';
import NetworkSelect from '../Navbar/NetworkSelect.vue';

defineProps({
  tokenFilters: {
    type: Array,
    required: true,
  },
  onAddTokenFilter: {
    type: Function,
    required: true,
  },
  onRemoveTokenFilter: {
    type: Function,
    required: true,
  },
  poolFilters: {
    type: Array,
    required: true,
  },
  onAddPoolFilter: {
    type: Function,
    required: true,
  },
  onRemovePoolFilter: {
    type: Function,
    required: true,
  },
  poolTypeFilters: {
    type: Array,
    required: true,
  },
  onAddPoolTypeFilter: {
    type: Function,
    required: true,
  },
  onRemovePoolTypeFilter: {
    type: Function,
    required: true,
  },
});

const { tokens, searchTokens } = useTokens();
const { pools } = usePools();

const poolTypes = computed(() => {
  return Object.values(PoolType).map(poolType => {
    return {
      id: poolType,
      value: poolType,
    };
  });
});
</script>
<template>
  <div class="row">
    <div class="filters">
      <Filter>
        <FilterTrigger
          v-slot="item"
          label="Tokens"
          :enabled="tokenFilters"
          :onRemove="item => onRemoveTokenFilter(item)"
        >
          <span>{{ item.symbol }}</span>
        </FilterTrigger>
        <FilterMenu
          v-slot="item"
          :options="tokens"
          optionKey="address"
          :onSelect="
            item =>
              tokenFilters.includes(item)
                ? onRemoveTokenFilter(item)
                : onAddTokenFilter(item)
          "
          :enabled="tokenFilters"
          :searchFn="searchTokens"
        >
          <Avatar :address="item.address" :imageURL="item.logoURI" :size="20" />
          <span>{{ item.symbol }}</span>
        </FilterMenu>
      </Filter>
      <Filter>
        <FilterTrigger
          v-slot="item"
          label="Pools"
          :enabled="poolFilters"
          :onRemove="item => onRemovePoolFilter(item)"
        >
          <span>{{ item.symbol }}</span>
        </FilterTrigger>
        <FilterMenu
          v-slot="item"
          :options="pools"
          optionKey="id"
          :onSelect="
            item =>
              poolFilters.includes(item)
                ? onRemovePoolFilter(item)
                : onAddPoolFilter(item)
          "
          :enabled="poolFilters"
          :searchFn="
            searchValue => pools.filter(pool => filterPool(searchValue, pool))
          "
        >
          <span>{{ item.symbol }}</span>
        </FilterMenu>
      </Filter>
      <Filter>
        <FilterTrigger
          v-slot="item"
          label="Pool Type"
          :enabled="poolTypeFilters"
          :onRemove="item => onRemovePoolTypeFilter(item)"
        >
          <span>{{ item.value }}</span>
        </FilterTrigger>
        <FilterMenu
          v-slot="item"
          :options="poolTypes"
          optionKey="id"
          :onSelect="
            item =>
              poolTypeFilters.includes(item)
                ? onRemovePoolTypeFilter(item)
                : onAddPoolTypeFilter(item)
          "
          :enabled="poolTypeFilters"
        >
          <span>{{ item.value }}</span>
        </FilterMenu>
      </Filter>
    </div>
    <div>
      <NetworkSelect />
    </div>
  </div>
</template>
<style scoped>
.row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
<style>
.filters {
  align-items: center;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.filter {
  position: relative;
}

.filter__button {
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  display: inline-flex;
  height: 38px;
}

.dark .filter__button {
  border-color: #3e4c5a;
}

.filter__trigger {
  align-items: center;
  background-color: transparent;
  border: 0;
  color: #1e293b;
  display: flex;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  padding: 0px;
  padding-left: 8px;
  padding-right: 8px;
}

.dark .filter__trigger {
  color: #fff;
}

.filter__trigger svg {
  color: #94a3b8;
  height: 20px;
  width: 20px;
}

.filter__trigger:focus {
  outline: none;
}

.divider {
  height: 20px;
  width: 1px;
  background-color: #e2e8f0;
}

.dark .divider {
  background-color: #3e4c5a;
}

.enabled-filters {
  align-items: center;
  display: flex;
  gap: 4px;
  padding-left: 8px;
  padding-right: 8px;
}

.enabled-filter {
  background-color: #e2e8f0;
  border: 0;
  border-radius: 6px;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  height: 18px;
  position: relative;
  overflow: hidden;
}

.enabled-filter .close {
  background-color: #e2e8f0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  display: none;
  justify-content: center;
}

.enabled-filter .close svg {
  height: 12px;
  width: 12px;
}

.enabled-filter:hover .close {
  display: flex;
}

.dark .enabled-filter,
.dark .enabled-filter .close {
  background-color: #475569;
}

.filter__menu {
  position: absolute;
  width: 200px;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: 99;
  background-color: #fff;
  padding: 4px;
}

.dark .filter__menu {
  background-color: #1e293b;
}

.filter__menu .scroller {
  max-height: 264px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.filter__menu .scroller::-webkit-scrollbar {
  display: none;
}

/* .filter__menu .scroller > .filter__menu-item + .filter__menu-item {
  margin-top: 4px;
} */

.filter__menu-item-wrapper {
  padding-bottom: 4px;
}

.filter__menu-item {
  background-color: transparent;
  border: 0;
  border-radius: 4px;
  align-items: center;
  display: flex;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  padding: 8px 8px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  /* margin-top: 4px; */
}

.filter__menu-item--selected {
  background-color: #eff6ff;
  color: #3b82f6;
}

.dark .filter__menu-item--selected {
  background-color: #1d4ed8;
  color: #fff;
}

.filter__menu-item:not(.filter__menu-item--selected):hover {
  background-color: #f8fafc;
}

.dark .filter__menu-item:not(.filter__menu-item--selected):hover {
  background-color: #334155;
}

.filter__menu-item span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
