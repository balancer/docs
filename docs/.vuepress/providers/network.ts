import { ref, provide, InjectionKey } from 'vue';
import { NETWORKS, NetworkConfig } from '../constants/networks';
import { safeInject } from './inject';

export const networkProvider = () => {
  const selectedNetwork = ref(NETWORKS[0]);

  function selectNetwork(network: NetworkConfig) {
    selectedNetwork.value = network;
  }

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
