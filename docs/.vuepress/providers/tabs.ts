import { InjectionKey, provide, ref, watch } from 'vue';
import { safeInject } from './inject';

export enum Tab {
  LAUNCHPAD,
  ADMIN_POOLS,
  VE_SYSTEM_CONFIG,
  REWARDS_DISTRIBUTION,
}

export const tabsProvider = () => {
  const tab = ref<Tab>(Tab.LAUNCHPAD);

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
  Symbol('providers.vesystem');

export function provideTabs(): TabsProviderType {
  const data = tabsProvider();
  provide(TabsProviderSymbol, data);
  return data;
}

export function useTabs(): TabsProviderType {
  return safeInject(TabsProviderSymbol);
}
