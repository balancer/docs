import { InjectionKey, provide, onBeforeMount, ref, watch } from 'vue';
import { RawPool, SubgraphPoolProvider } from '@balancer/sdk';
import { safeInject } from './inject';
import { useNetwork } from './network';

export const poolsProvider = () => {
  const { network } = useNetwork();

  const pools = ref<RawPool[]>([]);
  const isLoading = ref(true);

  watch(network, async () => {
    await initPools();
  });

  async function initPools() {
    isLoading.value = true;

    const poolProvider = new SubgraphPoolProvider(network.value.id, undefined, {
      gqlAdditionalPoolQueryFields: 'name symbol totalLiquidity',
    });

    const timestamp = BigInt(Math.floor(new Date().getTime() / 1000));

    const { pools: _pools } = await poolProvider.getPools({ timestamp });

    pools.value = _pools.sort((a, b) => {
      // @ts-ignore
      return parseFloat(b.totalLiquidity) - parseFloat(a.totalLiquidity);
    });

    isLoading.value = false;
  }

  onBeforeMount(async () => {
    await initPools();
  });

  function getPoolByID(id: string) {
    return pools.value.find(pool => pool.id === id);
  }

  return {
    pools,
    getPoolByID,
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
