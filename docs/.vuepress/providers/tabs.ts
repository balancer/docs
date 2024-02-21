import { InjectionKey, provide, ref, watch } from 'vue';
import { safeInject } from './inject';

export enum Tab {
  LAUNCHPAD,
  ADMIN_POOLS,
  VE_SYSTEM_CONFIG,
  REWARDS_DISTRIBUTION,
  OVERVIEW,
  POOL_DETAILS,
}

export const tabsProvider = (defaultTab: Tab) => {
  const tab = ref<Tab>(defaultTab);

  watch(tab, value => console.log('Selected Tab: ', value));

  const select = async (id: Tab) => {
    tab.value = id;
  };

  return {
    tab,
    select,
  };
};

export type TabsProviderType = ReturnType<typeof tabsProvider>;

export const TabsProviderSymbol: InjectionKey<TabsProviderType> =
  Symbol('providers.tabs');

export function provideTabs(defaultTab: Tab): TabsProviderType {
  const data = tabsProvider(defaultTab);
  provide(TabsProviderSymbol, data);
  return data;
}

export function useTabs(): TabsProviderType {
  return safeInject(TabsProviderSymbol);
}
