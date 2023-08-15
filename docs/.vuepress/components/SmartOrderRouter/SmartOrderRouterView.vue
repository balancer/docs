<script setup>
import { ref, watch, onMounted } from 'vue';
import { ethers } from 'ethers';
import {
  SwapKind,
  Token,
  sorGetSwapsWithPools,
  TokenAmount,
  sorParseRawPools,
  SubgraphPoolProvider,
} from '@balancer/sdk';
import { useNetwork } from '../../providers/network';
import { useTokens } from '../../providers/tokens';
import InputsRow from './InputsRow.vue';
import RouteDisplay from './RouteDisplay.vue';
import FiltersRow from './FiltersRow.vue';
import Output from './Output.vue';

const { network } = useNetwork();
const { tokens } = useTokens();

const tokenFilters = ref([]);
const poolFilters = ref([]);
const poolTypeFilters = ref([]);

const swapKind = ref(SwapKind.GivenIn);

const amountIn = ref('1.0');
const amountOut = ref('');

const tokenIn = ref(tokens.value.length > 0 ? tokens.value[0] : null);
const tokenOut = ref(tokens.value.length > 1 ? tokens.value[1] : null);

const route = ref(null);
const noRouteAvailable = ref(false);

const isLoading = ref(false);

// reset values when network changes
watch(network, () => {
  swapKind.value = SwapKind.GivenIn;

  amountIn.value = '1.0';
  amountOut.value = '';

  tokenIn.value = tokens.value.length > 0 ? tokens.value[0] : null;
  tokenOut.value = tokens.value.length > 1 ? tokens.value[1] : null;

  route.value = null;
  noRouteAvailable.value = false;

  tokenFilters.value = [];
  poolFilters.value = [];
  poolTypeFilters.value = [];
});

function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this; // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, wait);
  };
}

const debouncedUpdateRoute = debounce(updateRoute, 500);

watch(tokens, () => {
  tokenIn.value = tokens.value.length > 0 ? tokens.value[0] : null;
  tokenOut.value = tokens.value.length > 1 ? tokens.value[1] : null;
});

watch(
  [
    tokenIn,
    tokenOut,
    () => tokenFilters.value.length,
    () => poolFilters.value.length,
    () => poolTypeFilters.value.length,
  ],
  () => {
    updateRoute();
  }
);

onMounted(() => {
  if (tokenIn.value && tokenOut.value && amountIn.value !== '') {
    updateRoute();
  }
});

function onAmountInChange(event) {
  amountIn.value = event.target.value;
  amountOut.value = '';
  swapKind.value = SwapKind.GivenIn;

  debouncedUpdateRoute();
}

function onAmountOutChange(event) {
  amountOut.value = event.target.value;
  amountIn.value = '';
  swapKind.value = SwapKind.GivenOut;

  debouncedUpdateRoute();
}

function onTokenInChange(value) {
  tokenIn.value = value;
  amountIn.value = '1.0';

  if (swapKind.value === SwapKind.GivenIn) {
    amountOut.value = '';
  }
}

function onTokenOutChange(value) {
  tokenOut.value = value;
  amountOut.value = '';

  if (swapKind.value === SwapKind.GivenOut) {
    amountIn.value = '';
  }
}

async function updateRoute() {
  isLoading.value = true;
  route.value = null;
  noRouteAvailable.value = false;

  try {
    const tIn = new Token(
      network.value.id,
      tokenIn.value.address,
      tokenIn.value.decimals,
      tokenIn.value.symbol,
      tokenIn.value.name
    );

    const tOut = new Token(
      network.value.id,
      tokenOut.value.address,
      tokenOut.value.decimals,
      tokenOut.value.symbol,
      tokenOut.value.name
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

      if (
        poolTypeFilters.value.length > 0 &&
        !poolTypeFilters.value.map(v => v.id).includes(pool.poolType)
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

    const response = await sorGetSwapsWithPools(
      tIn,
      tOut,
      swapKind.value,
      tokenAmount,
      parsedPools
    );

    if (swapKind.value === SwapKind.GivenIn) {
      const amountBig = response.paths.reduce((acc, path) => {
        return acc + path.outputAmount.amount;
      }, 0n);

      amountOut.value = ethers.formatUnits(
        amountBig.toString(),
        tokenOut.value.decimals
      );
    } else {
      const amountBig = response.paths.reduce((acc, path) => {
        return acc + path.inputAmount.amount;
      }, 0n);

      amountIn.value = ethers.formatUnits(
        amountBig.toString(),
        tokenIn.value.decimals
      );
    }

    route.value = response;
  } catch {
    noRouteAvailable.value = true;
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div v-if="tokenIn && tokenOut" class="sor-view">
    <FiltersRow
      :tokenFilters="tokenFilters"
      :onAddTokenFilter="token => tokenFilters.push(token)"
      :onRemoveTokenFilter="
        token =>
          (tokenFilters = tokenFilters.filter(t => t.address !== token.address))
      "
      :poolFilters="poolFilters"
      :onAddPoolFilter="pool => poolFilters.push(pool)"
      :onRemovePoolFilter="
        pool =>
          (poolFilters = poolFilters.filter(p => p.address !== pool.address))
      "
      :poolTypeFilters="poolTypeFilters"
      :onAddPoolTypeFilter="poolType => poolTypeFilters.push(poolType)"
      :onRemovePoolTypeFilter="
        poolType =>
          (poolTypeFilters = poolTypeFilters.filter(p => p.id !== poolType.id))
      "
    />
    <InputsRow
      :amountIn="amountIn"
      :amountOut="amountOut"
      :onAmountInChange="onAmountInChange"
      :onAmountOutChange="onAmountOutChange"
      :tokenIn="tokenIn"
      :tokenOut="tokenOut"
      :onTokenInChange="onTokenInChange"
      :onTokenOutChange="onTokenOutChange"
    />
    <RouteDisplay
      :amountIn="amountIn"
      :amountOut="amountOut"
      :tokenIn="tokenIn"
      :tokenOut="tokenOut"
      :route="route"
      :isLoading="isLoading"
      :noRouteAvailable="noRouteAvailable"
    />
    <Output :route="route" />
  </div>
</template>
<style scoped>
.sor-view {
  padding: 24px 0;
}

.sor-view > * + * {
  margin-top: 24px;
}
</style>
