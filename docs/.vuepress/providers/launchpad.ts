import { InjectionKey, provide, onBeforeMount, ref, watch } from 'vue';
import { safeInject } from './inject';
import { useNetwork } from './network';
import { LaunchpadSubgraph, VeSystem } from '../utils/LaunchpadSubgraph';

export const launchpadProvider = () => {
  const { network } = useNetwork();

  const data = ref<VeSystem[]>([]);
  const isLoading = ref(true);

  watch(network, async () => {
    await fetchData();
  });

  async function fetchData() {
    isLoading.value = true;

    // TODO: Fetch data from current network subgraph

    const graph = new LaunchpadSubgraph(
      'https://api.thegraph.com/subgraphs/name/maxkmyt/launchpad_test_1'
    );

    data.value = await graph.getVeSystems();

    isLoading.value = false;
  }

  onBeforeMount(async () => {
    await fetchData();
  });

  return {
    data,
    isLoading,
  };
};

export type LaunchpadResponse = ReturnType<typeof launchpadProvider>;

export const LaunchpadProviderSymbol: InjectionKey<LaunchpadResponse> = Symbol(
  'providers.launchpad'
);

export function provideLaunchpad(): LaunchpadResponse {
  const data = launchpadProvider();
  provide(LaunchpadProviderSymbol, data);
  return data;
}

export function useLaunchpad(): LaunchpadResponse {
  return safeInject(LaunchpadProviderSymbol);
}
