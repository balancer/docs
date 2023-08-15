<script setup>
import { computed } from 'vue';
import { usePools } from '../../providers/pools';
import { useTokens } from '../../providers/tokens';

const props = defineProps({
  amountIn: {
    type: String,
    required: true,
  },
  amountOut: {
    type: String,
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
  route: {
    type: Object,
  },
  isLoading: {
    type: Boolean,
  },
  noRouteAvailable: {
    type: Boolean,
  },
});

const { getToken } = useTokens();
const { getPoolByID, isLoading } = usePools();

const paths = computed(() => {
  if (!props.route || isLoading.value) {
    return [];
  }

  const allPaths = [];

  for (const path of props.route.paths) {
    const pathHops = [];

    for (const hop of path.printPath) {
      const symbolIn = hop.input.split(' ')[1];
      const symbolOut = hop.output.split(' ')[1];
      const pool = getPoolByID(hop.pool);

      const tokenIn = pool.tokens.find(token => token.symbol === symbolIn);
      const tokenOut = pool.tokens.find(token => token.symbol === symbolOut);

      pathHops.push({
        tokenIn: tokenIn.address,
        tokenOut: tokenOut.address,
      });
    }

    allPaths.push(pathHops);
  }

  return allPaths;
});
</script>
<template>
  <div class="route-display">
    <p class="heading">Swap Route</p>
    <div>
      <div class="tokens">
        <div class="token">
          <Avatar
            :address="tokenIn.address"
            :imageURL="tokenIn.logoURI"
            :size="40"
          />
          <div>
            <p class="token__amount">{{ amountIn || '0.0' }}</p>
            <p class="token__symbol">{{ tokenIn.symbol }}</p>
          </div>
        </div>
        <div class="token">
          <div style="text-align: right">
            <p class="token__amount">{{ amountOut || '0.0' }}</p>
            <p class="token__symbol">{{ tokenOut.symbol }}</p>
          </div>
          <Avatar
            :address="tokenOut.address"
            :imageURL="tokenOut.logoURI"
            :size="40"
          />
        </div>
      </div>
      <div v-if="noRouteAvailable" class="path">
        <div class="hops">
          <div class="hop">
            <span class="no-route">No Route Found</span>
          </div>
        </div>
      </div>
      <div v-else-if="isLoading || paths.length === 0" class="path">
        <div class="hops">
          <div class="hop">
            <Spinner />
          </div>
        </div>
      </div>
      <template v-else>
        <div v-for="(path, pathIndex) in paths" :key="pathIndex" class="path">
          <div class="hops">
            <div v-for="(hop, hopIndex) in path" :key="hopIndex" class="hop">
              <Avatar
                :address="getToken(hop.tokenIn).address"
                :imageURL="getToken(hop.tokenIn).logoURI"
                :size="20"
              />
              <Avatar
                :address="getToken(hop.tokenOut).address"
                :imageURL="getToken(hop.tokenOut).logoURI"
                :size="20"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.route-display {
  background-color: #f8fafc;
  padding: 24px;
  padding-bottom: 48px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.dark .route-display {
  background-color: #162031;
  border-color: #3e4c5a;
}

.route-display > * + * {
  margin-top: 24px;
}

.heading {
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
}

.tokens {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
}

.token {
  align-items: center;
  display: flex;
  gap: 16px;
}

.token__amount {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.token__symbol {
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
}

.path {
  border: 1px dashed #cbd5e1;
  border-top: 0;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  height: 80px;
  position: relative;
  margin-top: -16px;
  margin-left: 20px;
  margin-right: 20px;
}

.dark .path {
  border-color: #64748b;
}

.hops {
  position: absolute;
  bottom: -17px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.hop {
  align-items: center;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  display: inline-flex;
  padding: 6px 12px;
}

.dark .hop {
  background-color: #1e293b;
  border-color: #475569;
}

.hop > * + * {
  margin-left: -6px;
}

.hop svg {
  color: #3b82f6;
}

.no-route {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: #3b82f6;
}
</style>
