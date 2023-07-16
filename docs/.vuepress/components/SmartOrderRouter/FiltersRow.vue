<script setup>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import { useTokens } from '../../providers/tokens';
import { usePools } from '../../providers/pools';
// import { PoolType } from "@balancer/sdk";
import { PoolType } from '@balancer-labs/sdk';

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

const { tokens } = useTokens();
const { pools } = usePools();
</script>
<template>
  <div class="filters">
    <Popover class="filter">
      <div class="filter__button">
        <PopoverButton class="filter__trigger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z"
            />
          </svg>
          <span>Tokens</span>
        </PopoverButton>
        <div v-if="tokenFilters.length > 0" class="divider" />
        <div v-if="tokenFilters.length > 0" class="enabled-filters">
          <button
            v-for="token in tokenFilters.slice(0, 3)"
            :key="token.address"
            class="enabled-filter"
            @click="() => onRemoveTokenFilter(token)"
          >
            <span>{{ token.symbol }}</span>
            <span class="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <PopoverPanel class="filter__menu">
        <RecycleScroller
          v-slot="{ item }"
          class="scroller"
          itemClass="filter__menu-item-wrapper"
          :items="tokens"
          :itemSize="40"
          keyField="address"
        >
          <button
            :class="`filter__menu-item ${
              tokenFilters.includes(item) ? 'filter__menu-item--selected' : ''
            }`"
            @click="
              () =>
                tokenFilters.includes(item)
                  ? onRemoveTokenFilter(item)
                  : onAddTokenFilter(item)
            "
          >
            <Avatar
              :address="item.address"
              :imageURL="item.logoURI"
              :size="20"
            />
            <span>{{ item.symbol }}</span>
          </button>
        </RecycleScroller>
      </PopoverPanel>
    </Popover>
    <Popover class="filter">
      <div class="filter__button">
        <PopoverButton class="filter__trigger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z"
            />
          </svg>
          <span>Pools</span>
        </PopoverButton>
        <div v-if="poolFilters.length > 0" class="divider" />
        <div v-if="poolFilters.length > 0" class="enabled-filters">
          <button
            v-for="pool in poolFilters.slice(0, 3)"
            :key="pool.address"
            class="enabled-filter"
            @click="() => onRemovePoolFilter(pool)"
          >
            <span>{{ pool.symbol }}</span>
            <span class="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <PopoverPanel class="filter__menu">
        <RecycleScroller
          v-slot="{ item }"
          class="scroller"
          itemClass="filter__menu-item-wrapper"
          :items="pools"
          :itemSize="40"
          keyField="id"
        >
          <button
            :class="`filter__menu-item ${
              poolFilters.includes(item) ? 'filter__menu-item--selected' : ''
            }`"
            @click="
              () =>
                poolFilters.includes(item)
                  ? onRemovePoolFilter(item)
                  : onAddPoolFilter(item)
            "
          >
            <span>{{ item.symbol }}</span>
          </button>
        </RecycleScroller>
      </PopoverPanel>
    </Popover>
    <Popover class="filter">
      <div class="filter__button">
        <PopoverButton class="filter__trigger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z"
            />
          </svg>
          <span>Pool Type</span>
        </PopoverButton>
        <div v-if="poolTypeFilters.length > 0" class="divider" />
        <div v-if="poolTypeFilters.length > 0" class="enabled-filters">
          <button
            v-for="poolType in poolTypeFilters.slice(0, 3)"
            :key="poolType"
            class="enabled-filter"
            @click="() => onRemovePoolTypeFilter(poolType)"
          >
            <span>{{ poolType }}</span>
            <span class="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <PopoverPanel class="filter__menu">
        <div class="scroller">
          <div class="filter__menu-items">
            <div
              v-for="poolType of PoolType"
              :key="poolType"
              class="filter__menu-item-wrapper"
            >
              <button
                :class="`filter__menu-item ${
                  poolTypeFilters.includes(poolType)
                    ? 'filter__menu-item--selected'
                    : ''
                }`"
                @click="
                  () =>
                    poolTypeFilters.includes(poolType)
                      ? onRemovePoolTypeFilter(poolType)
                      : onAddPoolTypeFilter(poolType)
                "
              >
                <span>{{ poolType }}</span>
              </button>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  </div>
</template>
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

.filter__menu-item:not(.filter__menu-item--selected):hover {
  background-color: #f8fafc;
}

.filter__menu-item span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
