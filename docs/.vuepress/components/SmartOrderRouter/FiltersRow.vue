<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useTokens } from '../../providers/tokens';
import { usePools } from '../../providers/pools';

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
            v-for="token in tokenFilters"
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
        <button
          v-for="token in tokens.slice(0, 10)"
          :key="token.address"
          class="filter__menu-item"
          @click="() => onAddTokenFilter(token)"
        >
          <Avatar
            :address="token.address"
            :imageURL="token.logoURI"
            :size="20"
          />
          <span>{{ token.symbol }}</span>
        </button>
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
            v-for="pool in poolFilters"
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
        <button
          v-for="pool in pools.slice(0, 10)"
          :key="pool.address"
          class="filter__menu-item"
          @click="() => onAddPoolFilter(pool)"
        >
          <!-- <Avatar
            :address="token.address"
            :imageURL="token.logoURI"
            :size="20"
          /> -->
          <span>{{ pool.symbol }}</span>
        </button>
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
}

.filter__menu-item {
  background-color: transparent;
  border: 0;
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
}

.filter__menu-item:hover {
  background-color: #f8fafc;
}

.filter__menu-item span {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
