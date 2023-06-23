<script setup>
import { ref } from 'vue';
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
const bptIn = ref('');
const queryResult = ref(undefined);

async function submit() {
  isLoading.value = true;
  const config = {
    network: props.network.id,
    rpcUrl: props.network.rpcUrl,
  };

  const balancer = new BalancerSDK(config);

  const pool = await balancer.pools.find(props.pool.id);

  const { attributes } = pool.buildExitExactBPTIn(
    ethers.ZeroAddress,
    ethers.parseEther(bptIn.value).toString(),
    '50',
    false
  );

  const queries = new ethers.Contract(
    '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5',
    BalancerQueriesAbi,
    new ethers.JsonRpcProvider(props.network.rpcUrl)
  );

  const response = await queries
    .getFunction('queryExit')
    .staticCall(
      attributes.poolId,
      attributes.sender,
      attributes.recipient,
      attributes.exitPoolRequest
    );

  queryResult.value = response;

  isLoading.value = false;
}
</script>
<template>
  <div class="join-form">
    <InputWithEmbed v-model="bptIn" placeholder="0.0">
      <AssetSelect :selectedToken="pool" />
    </InputWithEmbed>
    <Button :disabled="isLoading || bptIn === ''" @click="submit">
      <span v-if="!isLoading">Query Exit</span>
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
      <p class="heading">Exit Pool Preview</p>
      <p class="subheading">You provide:</p>
      <div class="asset">
        <div>
          <p class="amount">
            {{
              parseFloat(
                ethers.formatUnits(queryResult.bptIn, pool.decimals)
              ).toFixed(4)
            }}
            <span>{{ pool.symbol }}</span>
          </p>
        </div>
        <div>
          <Avatar :address="pool.address" :size="32" />
        </div>
      </div>
      <hr />
      <p class="subheading">You receive:</p>
      <div class="asset-list">
        <div v-for="token in pool.tokens" :key="token.address" class="asset">
          <div>
            <p class="amount">
              {{
                parseFloat(
                  ethers.formatUnits(
                    queryResult.amountsOut[token.index],
                    token.decimals
                  )
                ).toFixed(4)
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
      <!--


    --></div>
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
