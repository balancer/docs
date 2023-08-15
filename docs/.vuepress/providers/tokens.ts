import { ref, provide, onBeforeMount, InjectionKey, computed } from 'vue';
import axios from 'axios';
import { safeInject } from './inject';
import { useNetwork } from './network';

export interface TokenList {
  readonly name: string;
  readonly timestamp: string;
  readonly version: Version;
  readonly tokens: TokenInfo[];
  readonly keywords?: string[];
  readonly tags?: Tags;
  readonly logoURI?: string;
}

export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly extensions?: {
    readonly [key: string]: string | number | boolean | null;
  };
}

export interface Version {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
}

export interface Tags {
  readonly [tagId: string]: {
    readonly name: string;
    readonly description: string;
  };
}

export const tokensProvider = () => {
  const { network: selectedNetwork } = useNetwork();

  const allTokens = ref<TokenInfo[]>([]);

  const tokens = computed(() => {
    return allTokens.value.filter(
      token => token.chainId === selectedNetwork.value.id
    );
  });

  onBeforeMount(async () => {
    const response = await axios.get(
      'https://raw.githubusercontent.com/balancer/tokenlists/main/generated/balancer.tokenlist.json'
    );

    const _tokenList = response.data as TokenList;

    allTokens.value = _tokenList.tokens;
  });

  function getToken(address: string) {
    return tokens.value.find(
      token => token.address.toLowerCase() === address.toLowerCase()
    );
  }

  function getTokens(addresses: string[]) {
    return addresses.map(address => getToken(address)).filter(Boolean);
  }

  return {
    tokens,
    getToken,
    getTokens,
  };
};

export type TokensResponse = ReturnType<typeof tokensProvider>;

export const TokensProviderSymbol: InjectionKey<TokensResponse> =
  Symbol('providers.tokens');

export function provideTokens(): TokensResponse {
  const tokens = tokensProvider();
  provide(TokensProviderSymbol, tokens);
  return tokens;
}

export function useTokens(): TokensResponse {
  return safeInject(TokensProviderSymbol);
}
