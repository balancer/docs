<script setup>
import { ref, computed } from 'vue';
import { ethers } from 'ethers';
import { BalancerSDK, BalancerErrors } from '@balancer-labs/sdk';
import { BalancerQueriesAbi } from '../../abis/BalancerQueries';
import { useNetwork } from '../../providers/network';
import { useTokens } from '../../providers/tokens';

const props = defineProps({
  pool: {
    type: Object,
    required: true,
  },
});

const { network } = useNetwork();
const { getToken } = useTokens();

const loading = ref(false);
const errorMessage = ref(null);

const amounts = ref({});
const bptOut = ref('');

const tokens = computed(() =>
  props.pool.tokens.filter(t => t.address !== props.pool.address)
);

async function onSubmit() {
  errorMessage.value = null;
  loading.value = true;

  try {
    const balancer = new BalancerSDK({
      network: network.value.id,
      rpcUrl: network.value.rpcUrl,
    });
    const pool = await balancer.pools.find(props.pool.id);

    const { attributes } = pool.buildJoin(
      ethers.ZeroAddress,
      props.pool.tokens.map(token => token.address),
      props.pool.tokens.map(token => {
        if (amounts.value[token.address]) {
          return ethers.parseUnits(
            amounts.value[token.address],
            token.decimals
          );
        }
        return 0n;
      }),
      '50'
    );

    const queries = new ethers.Contract(
      '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5',
      BalancerQueriesAbi,
      new ethers.JsonRpcProvider(network.value.rpcUrl)
    );

    const response = await queries
      .getFunction('queryJoin')
      .staticCall(
        attributes.poolId,
        attributes.sender,
        attributes.recipient,
        attributes.joinPoolRequest
      );

    bptOut.value = ethers.formatUnits(response[0], 18);
  } catch (e) {
    bptOut.value = '';
    if (ethers.isCallException(e)) {
      if (BalancerErrors.isErrorCode(e.reason)) {
        errorMessage.value = `${e.reason} - ${BalancerErrors.parseErrorCode(
          e.reason
        )}`;
      } else {
        errorMessage.value = e.reason;
      }
    } else {
      errorMessage.value = e.message;
    }
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <div class="join-form">
    <div v-for="(token, tokenIndex) in tokens" :key="token.address">
      <InputLabel v-if="tokenIndex === 0">Tokens In</InputLabel>
      <div class="input-with-select">
        <Input
          placeholder="0.0"
          :modelValue="amounts[token.address]"
          @input="event => (amounts[token.address] = event.target.value)"
        />
        <div class="select">
          <div class="select__button">
            <Avatar
              :address="token.address"
              :imageURL="getToken(token.address).logoURI"
              :size="20"
            />
            <span class="truncate">{{ token.symbol }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="submit-button" @click="onSubmit">
        <span v-if="!loading">Query Join</span>
        <Spinner v-else />
      </button>
    </div>
    <div v-if="errorMessage" class="error-message">
      <p>Error: {{ errorMessage }}</p>
    </div>
    <div class="output">
      <p class="result-heading">Expected BPT Out:</p>
      <div class="bpt-out">
        <div class="bpt-out__metadata">
          <p class="bpt-out__pool-symbol">{{ pool.symbol }}</p>
          <p class="bpt-out__pool-name">{{ pool.name }}</p>
        </div>
        <p class="bpt-out__value">
          {{
            bptOut === ''
              ? '0'
              : new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 4,
                  roundingMode: 'floor',
                }).format(parseFloat(bptOut))
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.join-form > * + * {
  margin-top: 16px;
}

.input-with-select {
  position: relative;
}

.input-with-select input {
  height: 68px;
  padding-left: 150px;
}

.select {
  position: absolute;
  align-items: center;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 0 12px;
}

.select__button {
  align-items: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  line-height: 20px;
  padding: 12px;
  text-align: left;
  width: 125px;
  cursor: not-allowed;
}

.dark .select__button {
  background-color: transparent;
  border-color: #3e4c5a;
}

.submit-button {
  background-color: #384aff;
  border: 0;
  border-radius: 6px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  width: 100%;
  padding: 14px 16px;
  height: 52px;
}

.submit-button:hover {
  background-color: #2e40f5;
}

.result-heading {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin-bottom: 4px;
}

.output {
  background-color: #f8fafc;
  padding: 12px;
  border-radius: 8px;
}

.dark .output {
  background-color: #162031;
}

.bpt-out {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.bpt-out__pool-symbol {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.bpt-out__pool-name {
  font-size: 14px;
  line-height: 20px;
}

.dark .bpt-out__pool-name {
  color: #cbd5e1;
}

.bpt-out__value {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.error-message {
  background-color: #fef2f2;
  border-radius: 6px;
  color: #ef4444;
  padding: 8px 12px;
}

.error-message p {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}
</style>
