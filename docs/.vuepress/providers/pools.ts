import { InjectionKey, provide, onBeforeMount, ref, watch } from 'vue';
import { BalancerSDK, SubgraphPoolBase } from '@balancer-labs/sdk';
import { safeInject } from './inject';
import { useNetwork } from './network';

export const poolsProvider = () => {
  const { network } = useNetwork();

  const pools = ref<SubgraphPoolBase[]>([]);
  const isLoading = ref(true);

  watch(network, async () => {
    await initPools();
  });

  async function initPools() {
    isLoading.value = true;

    const config = {
      network: network.value.id,
      rpcUrl: network.value.rpcUrl,
    };

    const balancer = new BalancerSDK(config);

    await balancer.swaps.fetchPools();

    pools.value = balancer.swaps.getPools();

    isLoading.value = false;
  }

  onBeforeMount(async () => {
    await initPools();
  });

  function getPool(id: string) {
    return pools.value.find(pool => pool.id === id);
  }

  return {
    pools,
    getPool,
    isLoading,
  };
};

export type PoolsResponse = ReturnType<typeof poolsProvider>;

export const PoolsProviderSymbol: InjectionKey<PoolsResponse> =
  Symbol('providers.pools');

export function providePools(): PoolsResponse {
  const pools = poolsProvider();
  provide(PoolsProviderSymbol, pools);
  return pools;
}

export function usePools(): PoolsResponse {
  return safeInject(PoolsProviderSymbol);
}
