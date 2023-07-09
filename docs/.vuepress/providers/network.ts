import { ref, provide, InjectionKey } from 'vue';
import { NETWORKS, NetworkConfig } from '../config/config';
import { safeInject } from './inject';

// interface SubgraphToken {
//   address: string;
//   balance: string;
//   decimals: number;
//   priceRate: string;
//   weight: string | null;
// }

export const networkProvider = () => {
  const selectedNetwork = ref(NETWORKS[1]);

  // const sdk = ref<BalancerSDK | null>(null);
  // const pools = ref<SubgraphPoolBase[]>([]);
  // const tokens = ref<SubgraphToken[]>([]);

  function selectNetwork(network: NetworkConfig) {
    selectedNetwork.value = network;
  }

  // async function loadNetwork(network: any) {
  //   const config = {
  //     network: network.id,
  //     rpcUrl: network.rpcUrl,
  //   };

  //   const _sdk = new BalancerSDK(config);

  //   await _sdk.swaps.fetchPools();

  //   sdk.value = _sdk;
  //   pools.value = _sdk.swaps.getPools();

  //   const _tokens = {};

  //   for (const pool of pools.value) {
  //     for (const token of pool.tokens) {
  //       _tokens[token.address] = token;
  //     }
  //   }

  //   const tokensArr: SubgraphToken[] = Object.values(_tokens);

  //   tokens.value = tokensArr;
  // }

  // loadNetwork(selectedNetwork.value);

  // watch(selectedNetwork, network => {
  //   loadNetwork(network);
  // });

  // return {
  //   selectedNetwork,
  //   selectNetwork,
  //   sdk,
  //   pools,
  //   tokens,
  // };

  return {
    network: selectedNetwork,
    selectNetwork,
  };
};

export type NetworkResponse = ReturnType<typeof networkProvider>;

export const NetworkProviderSymbol: InjectionKey<NetworkResponse> =
  Symbol('providers.network');

export function provideNetwork(): NetworkResponse {
  const networkResponse = networkProvider();
  provide(NetworkProviderSymbol, networkResponse);
  return networkResponse;
}

export function useNetwork(): NetworkResponse {
  return safeInject(NetworkProviderSymbol);
}
