import { InjectionKey, provide, ref, watch } from 'vue';
import { safeInject } from './inject';
import { LaunchpadSubgraph, VeSystem } from '../utils/LaunchpadSubgraph';

const SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/maxkmyt/launchpad_test_1';

const graph = new LaunchpadSubgraph(SUBGRAPH_URL);

export const veSystemProvider = () => {
  const data = ref<VeSystem[]>([]);
  const isLoading = ref<boolean>(false);
  const selected = ref<VeSystem | undefined>();

  watch(selected, value => console.log('Selected VeSystem: ', value));

  const fetch = async () => {
    isLoading.value = true;

    data.value = await graph.getVeSystems();

    isLoading.value = false;
  };

  const select = async (id: string) => {
    isLoading.value = true;

    const veSystem = await graph.getVeSystem(id);
    selected.value = veSystem;

    isLoading.value = false;
  };

  const updateByTokenAddress = async (tokenAddress: string) => {
    isLoading.value = true;

    const filteredVeSystems = await graph.getWithFilter({ tokenAddress });

    data.value = filteredVeSystems;

    isLoading.value = false;
  };

  return {
    data,
    selected,
    isLoading,
    fetch,
    select,
    updateByTokenAddress,
  };
};

export type VeSystemProviderType = ReturnType<typeof veSystemProvider>;

export const VeSystemProviderSymbol: InjectionKey<VeSystemProviderType> =
  Symbol('providers.vesystem');

export function provideVeSystem(): VeSystemProviderType {
  const data = veSystemProvider();
  provide(VeSystemProviderSymbol, data);
  return data;
}

export function useVeSystem(): VeSystemProviderType {
  return safeInject(VeSystemProviderSymbol);
}
