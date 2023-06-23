<script setup>
import { ref, computed } from 'vue';
import { ethers } from 'ethers';
import { BalancerSDK } from '@balancer-labs/sdk';
import { BalancerQueriesAbi } from '../abis/BalancerQueries';

const props = defineProps({
  pool: {
    type: Object,
    required: true,
  },
  network: {
    type: Object,
    required: true,
  },
});

const isLoading = ref(false);
const amounts = ref({});
const queryResult = ref(undefined);
const enrichedPool = ref(undefined);

const isButtonDisabled = computed(() => {
  if (isLoading.value) {
    return true;
  }

  const values = Object.values(amounts.value);

  if (values.length === 0) {
    return true;
  }

  let hasValue = false;

  for (const value of values) {
    if (value !== '') {
      hasValue = true;
    }
  }

  return !hasValue;
});

async function submit() {
  isLoading.value = true;

  const assets = props.pool.tokens.map(token => token.address);
  const amountsArr = props.pool.tokens.map(token => {
    const amount = amounts.value[token.address] ?? '0';
    if (amount === '') {
      return BigInt(0);
    }
    return ethers.parseUnits(amount, token.decimals);
  });

  const config = {
    network: props.network.id,
    rpcUrl: props.network.rpcUrl,
  };

  const balancer = new BalancerSDK(config);

  const queries = new ethers.Contract(
    '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5',
    BalancerQueriesAbi,
    new ethers.JsonRpcProvider(props.network.rpcUrl)
  );

  const pool = await balancer.pools.find(props.pool.id);
  enrichedPool.value = pool;

  const { attributes } = pool.buildJoin(
    ethers.ZeroAddress,
    assets,
    amountsArr,
    '50'
  );

  const response = await queries
    .getFunction('queryJoin')
    .staticCall(
      props.pool.id,
      ethers.ZeroAddress,
      ethers.ZeroAddress,
      attributes.joinPoolRequest
    );

  queryResult.value = response;

  isLoading.value = false;
}
</script>
<template>
  <div class="join-form">
    <InputWithEmbed
      v-for="token in pool.tokens"
      :key="token.address"
      v-model="amounts[token.address]"
      placeholder="0.0"
    >
      <AssetSelect :selectedToken="token" />
    </InputWithEmbed>
    <Button :disabled="isButtonDisabled" @click="submit">
      <span v-if="!isLoading">Query Join</span>
      <div
        v-else
        :style="{
          display: 'flex',
          justifyContent: 'center',
        }"
      >
        <Spinner />
      </div>
    </Button>
    <div v-if="queryResult" class="join-preview">
      <p class="heading">Join Pool Preview</p>
      <p class="subheading">You provide:</p>
      <div class="asset-list">
        <div v-for="token in pool.tokens" :key="token.address" class="asset">
          <div>
            <p class="amount">
              {{
                ethers.formatUnits(
                  queryResult.amountsIn[token.index],
                  token.decimals
                )
              }}
              <span>{{ token.symbol }}</span>
            </p>
          </div>
          <div>
            <Avatar
              :address="pool.address"
              :size="32"
              :imageURL="`https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/${token.address}.png`"
            />
          </div>
        </div>
      </div>
      <hr />
      <p class="subheading">You receive:</p>
      <div class="asset">
        <div>
          <p class="amount">
            {{
              parseFloat(
                ethers.formatUnits(queryResult.bptOut, pool.decimals)
              ).toFixed(4)
            }}
            <span>{{ enrichedPool.symbol }}</span>
          </p>
        </div>
        <div>
          <Avatar :address="pool.address" :size="32" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0;
}

hr {
  border-color: #cbd5e1;
  margin: 24px 0 16px;
}

.dark hr {
  border-color: #475569;
}

.join-form > * + * {
  margin-top: 16px;
}

.join-preview {
  background-color: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.dark .join-preview {
  background-color: #162031;
  border-color: transparent;
}

.join-preview .heading {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}

.join-preview .subheading {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.join-preview .asset {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.join-preview .asset img {
  height: 32px;
  width: 32px;
}

.join-preview .asset .amount {
  font-size: 14px;
  font-weight: bold;
}

.join-preview .asset .amount span {
  color: #64748b;
  font-weight: 400;
}

.dark .join-preview .asset .amount span {
  color: #94a3b8;
}

.asset-list > * + * {
  margin-top: 8px;
}
</style>
