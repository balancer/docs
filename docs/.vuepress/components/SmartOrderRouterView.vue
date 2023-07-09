<script setup>
import { ref, watch } from 'vue';
import {
  SwapKind,
  Token,
  sorGetSwapsWithPools,
  TokenAmount,
  sorParseRawPools,
  SubgraphPoolProvider,
} from '@balancer/sdk';
import { useTokens } from '../providers/tokens';
import { useNetwork } from '../providers/network';
import { usePools } from '../providers/pools';
import { ethers } from 'ethers';

const { network } = useNetwork();
const { tokens } = useTokens();
const { pools } = usePools();

const isLoading = ref(true);
const noRouteFound = ref(false);

const swapKind = ref(SwapKind.GivenIn);

const tokenIn = ref(tokens.value[0]);
const tokenOut = ref(tokens.value[1]);

const amountIn = ref('1.0');
const amountOut = ref('');

const tokenFilters = ref([]);
const poolFilters = ref([]);

const route = ref(null);

watch(network, () => {
  tokenIn.value = null;
  tokenOut.value = null;
  amountIn.value = '1.0';
  amountOut.value = '';
  route.value = null;
});

watch(tokens, () => {
  tokenIn.value = tokens.value[0];
  tokenOut.value = tokens.value[1];
});

watch(
  [
    tokenIn,
    tokenOut,
    () => tokenFilters.value.length,
    () => poolFilters.value.length,
  ],
  () => {
    updateRoute();
  }
);

watch(tokenIn, () => {
  if (swapKind.value === SwapKind.GivenIn) {
    amountOut.value = '';
  }
});

watch(tokenOut, () => {
  if (swapKind.value === SwapKind.GivenIn) {
    amountOut.value = '';
  }

  if (swapKind.value === SwapKind.GivenOut) {
    amountIn.value = '';
  }
});

watch(route, () => {
  if (!route.value) {
    return;
  }

  if (swapKind.value === SwapKind.GivenIn) {
    amountOut.value = ethers.formatUnits(
      route.value.paths.reduce((acc, path) => {
        return acc + path.outputAmount.amount;
      }, 0n),
      tokenOut.value.decimals
    );
  }

  if (swapKind.value === SwapKind.GivenOut) {
    amountIn.value = ethers.formatUnits(
      route.value.paths.reduce((acc, path) => {
        return acc + path.inputAmount.amount;
      }, 0n),
      tokenIn.value.decimals
    );
  }
});

async function updateRoute() {
  isLoading.value = true;
  noRouteFound.value = false;
  route.value = null;

  console.log('swapKind', swapKind.value);

  const tIn = new Token(
    network.value.id,
    tokenIn.value.address,
    tokenIn.value.decimals
  );

  const tOut = new Token(
    network.value.id,
    tokenOut.value.address,
    tokenOut.value.decimals
  );

  const tokenAmount = TokenAmount.fromHumanAmount(
    swapKind.value === SwapKind.GivenIn ? tIn : tOut,
    swapKind.value === SwapKind.GivenIn ? amountIn.value : amountOut.value
  );

  const poolProvider = new SubgraphPoolProvider(network.value.id, undefined, {
    gqlAdditionalPoolQueryFields: 'name symbol totalLiquidity',
  });

  const timestamp = BigInt(Math.floor(new Date().getTime() / 1000));

  const { pools } = await poolProvider.getPools({ timestamp });

  const filteredPools = pools.filter(pool => {
    for (const token of pool.tokens) {
      try {
        TokenAmount.fromHumanAmount(token, token.balance);
      } catch (error) {
        return false;
      }
    }

    // filter by tokens
    if (
      tokenFilters.value.length > 0 &&
      pool.tokens.filter(token =>
        tokenFilters.value
          .map(t => t.address.toLowerCase())
          .includes(token.address.toLowerCase())
      ).length === 0
    ) {
      return false;
    }

    // filter by pools
    if (
      poolFilters.value.length > 0 &&
      !poolFilters.value
        .map(p => p.address.toLowerCase())
        .includes(pool.address.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const parsedPools = await sorParseRawPools(
    network.value.id,
    filteredPools,
    []
  );

  try {
    const response = await sorGetSwapsWithPools(
      tIn,
      tOut,
      swapKind.value,
      tokenAmount,
      parsedPools
    );
    route.value = response;
  } catch {
    noRouteFound.value = true;
    return;
  }

  isLoading.value = false;
  isLoading.value = false;
}

function onAmountInChange() {
  swapKind.value = SwapKind.GivenIn;
  amountOut.value = '';
  updateRoute();
}

function onAmountOutChange() {
  swapKind.value = SwapKind.GivenOut;
  amountIn.value = '';
  updateRoute();
}
</script>
<template>
  <div
    v-if="tokens.length > 0 && pools.length > 0"
    style="padding-bottom: 20px"
    class="filters"
  >
    <Filter
      v-slot="item"
      enabledKey="address"
      enabledLabel="symbol"
      :enabled="tokenFilters"
      :onEnable="token => tokenFilters.push(token)"
      :onDisable="
        token => (tokenFilters = tokenFilters.filter(t => t !== token))
      "
      :items="tokens"
      label="Tokens"
    >
      <FilterOption
        :imageURL="item.logoURI"
        :textA="item.symbol"
        :textB="item.name"
      />
    </Filter>
    <Filter
      v-slot="item"
      enabledKey="address"
      enabledLabel="symbol"
      :enabled="poolFilters"
      :onEnable="pool => poolFilters.push(pool)"
      :onDisable="pool => (poolFilters = poolFilters.filter(p => p !== pool))"
      :items="pools"
      label="Pools"
    >
      <FilterOption
        :imageURL="item.logoURI"
        :textA="item.symbol"
        :textB="item.name"
      />
    </Filter>
  </div>
  <div v-if="tokenIn && tokenOut">
    <div class="token-cols">
      <div style="display: flex; flex-direction: column; gap: 24px">
        <div>
          <label>Token In</label>
          <InputWithEmbed
            v-model="amountIn"
            placeholder="0.0"
            @input="onAmountInChange"
          >
            <AssetSelect
              :selectedToken="tokenIn"
              :tokens="tokens"
              :onChange="$token => (tokenIn = $token)"
            />
          </InputWithEmbed>
        </div>
      </div>
      <div>
        <label>Token Out</label>
        <InputWithEmbed
          v-model="amountOut"
          placeholder="0.0"
          @input="onAmountOutChange"
        >
          <AssetSelect
            :selectedToken="tokenOut"
            :tokens="tokens"
            :onChange="$token => (tokenOut = $token)"
          />
        </InputWithEmbed>
      </div>
    </div>
    <div>
      <div
        v-if="isLoading || noRouteFound"
        :class="`route-empty ${isLoading ? 'route-empty--loading' : ''}`"
      >
        <span v-if="noRouteFound">No Route Found</span>
      </div>
      <div v-else class="route">
        <p class="route-heading">Batch Swap Route</p>
        <RouteDisplay :tokenIn="tokenIn" :tokenOut="tokenOut" :route="route" />
      </div>
    </div>
  </div>
</template>
<style scoped>
label {
  color: #475569;
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

p {
  margin: 0;
  padding: 0;
}

.token-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.route-empty {
  aspect-ratio: 36 / 9;
  background-color: #eaf0f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.route-empty--loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.route {
  border: 1px solid #eaf0f6;
  border-radius: 12px;
  padding: 12px;
}

.route-heading {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 16px;
}

.filters {
  align-items: center;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
