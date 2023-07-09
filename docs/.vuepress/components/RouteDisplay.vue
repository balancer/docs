<script setup>
import { computed } from 'vue';
import { ethers } from 'ethers';
import { usePools } from '../providers/pools';
import { useTokens } from '../providers/tokens';

const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
  tokenIn: {
    type: Object,
    required: true,
  },
  tokenOut: {
    type: Object,
    required: true,
  },
});

console.log(props.route);

const { getTokens } = useTokens();
const { pools } = usePools();

// const tokenIn = getToken(props.route.assets[0]);
// const tokenOut = getToken(props.route.assets[props.route.assets.length - 1]);

const routeTokens = getTokens(props.route.assets);

const amountIn = computed(() => {
  return props.route.paths.reduce((acc, path) => {
    return acc + path.inputAmount.amount;
  }, 0n);
});

console.log(amountIn.value);

const amountOut = computed(() => {
  return props.route.paths.reduce((acc, path) => {
    return acc + path.outputAmount.amount;
  }, 0n);
});

const routes = computed(() => {
  const routes = [];

  let route = [];

  if (Array.isArray(props.route.swaps)) {
    for (const swap of props.route.swaps) {
      if (swap.amount !== 0n && route.length > 0) {
        routes.push(route);
        route = [];
      }

      const pool = pools.value.find(p => p.id === swap.poolId);

      route.push({
        ...swap,
        pool: pool,
      });
    }

    routes.push(route);
  } else {
    const pool = pools.value.find(p => p.id === props.route.swaps.poolId);

    route.push({
      ...props.route.swaps,
      assetInIndex: props.route.assets.indexOf(props.route.swaps.assetIn),
      assetOutIndex: props.route.assets.indexOf(props.route.swaps.assetOut),
      pool: pool,
    });

    routes.push(route);
  }

  return routes;
});

console.log(routes.value);
</script>
<template>
  <div>
    <div class="route-display">
      <div class="tokens">
        <div class="token">
          <Avatar
            :address="tokenIn.address"
            :imageURL="tokenIn.logoURI"
            :size="32"
          />
          <div class="token-details">
            <p class="amount">
              {{
                parseFloat(
                  ethers.formatUnits(amountIn, tokenIn.decimals)
                ).toFixed(4)
              }}
            </p>
            <p class="symbol">{{ tokenIn.symbol }}</p>
          </div>
        </div>
        <div class="token token--right">
          <div class="token-details">
            <p class="amount">
              {{
                parseFloat(
                  ethers.formatUnits(amountOut, tokenOut.decimals)
                ).toFixed(4)
              }}
            </p>
            <p class="symbol">{{ tokenOut.symbol }}</p>
          </div>
          <Avatar
            :address="tokenOut.address"
            :imageURL="tokenOut.logoURI"
            :size="32"
          />
        </div>
      </div>
      <div v-if="routes" class="routes">
        <div v-for="(_route, i) in routes" :key="`route-${i}`" class="route">
          <div class="hops">
            <div
              v-for="(hop, j) in _route"
              :key="`hop-${i}-${j}`"
              class="hop-wrapper"
            >
              <div class="hop">
                <div class="hop-tokens">
                  <Avatar
                    :address="routeTokens[hop.assetInIndex].address"
                    :imageURL="routeTokens[hop.assetInIndex].logoURI"
                    :size="24"
                  />
                  <Avatar
                    :address="routeTokens[hop.assetOutIndex].address"
                    :imageURL="routeTokens[hop.assetOutIndex].logoURI"
                    :size="24"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0;
  font-size: 14px;
  line-height: 17px;
}

.tokens {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.token {
  display: flex;
  align-items: center;
  gap: 10px;
}

.token--right {
  text-align: right;
}

.token .symbol {
  font-weight: bold;
}

.token .amount {
  color: #94a3b8;
  font-size: 14px;
  /* font-weight: 500; */
}

.routes {
  padding: 16px;
}

.routes > * + * {
  margin-top: -14px;
}

.route {
  /* background-color: red; */
  border: 1px dashed #cbd5e1;
  border-top: none;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  /* height: 100px; */
  height: 75px;
  position: relative;
}

.hops {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -16px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.hop-wrapper {
  background-color: #fff;
  padding: 0 8px;
}

.hop {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 6px 8px;
  border-radius: 12px;
}

.hop-tokens {
  display: flex;
  align-items: center;
}

.hop-tokens > * + * {
  margin-left: -4px;
}
</style>
