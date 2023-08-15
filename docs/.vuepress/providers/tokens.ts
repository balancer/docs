import { ref, provide, onBeforeMount, InjectionKey, computed } from 'vue';
import axios from 'axios';
import { safeInject } from './inject';
import { useNetwork } from './network';
import { ethers } from 'ethers';
import { ERC20ABI } from '../abis/ERC20';
import { filterToken } from '../utils';

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

  async function getTokenFromChain(address) {
    const provider = new ethers.JsonRpcProvider(selectedNetwork.value.rpcUrl);

    const tokenContract = new ethers.Contract(address, ERC20ABI, provider);

    try {
      const name = await tokenContract.name();
      const symbol = await tokenContract.symbol();
      const decimals: bigint = await tokenContract.decimals();

      const token = {
        chainId: selectedNetwork.value.id,
        address,
        name,
        decimals: Number(decimals),
        symbol,
      };

      return token;
    } catch {
      return null;
    }
  }

  async function searchTokens(value) {
    const results = tokens.value.filter(token => {
      return filterToken(value, token);
    });

    if (results.length > 0) {
      return results;
    }

    if (ethers.isAddress(value)) {
      const token = await getTokenFromChain(value);

      if (token) {
        if (!allTokens.value.find(t => t.address === token.address)) {
          allTokens.value.push(token);
        }

        return [token];
      }
    }

    return [];
  }

  function getTokens(addresses: string[]) {
    return addresses.map(address => getToken(address)).filter(Boolean);
  }

  return {
    tokens,
    getToken,
    getTokens,
    getTokenFromChain,
    searchTokens,
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
