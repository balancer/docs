<script setup>
import { ref } from 'vue';
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

const bptIn = ref('');
const tokensOut = ref([]);

async function onSubmit() {
  errorMessage.value = null;
  loading.value = true;

  try {
    const balancer = new BalancerSDK({
      network: network.value.id,
      rpcUrl: network.value.rpcUrl,
    });

    const pool = await balancer.pools.find(props.pool.id);

    const { attributes } = pool.buildExitExactBPTIn(
      ethers.ZeroAddress,
      ethers.parseUnits(bptIn.value, 18).toString(),
      '50'
    );

    const queries = new ethers.Contract(
      '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5',
      BalancerQueriesAbi,
      new ethers.JsonRpcProvider(network.value.rpcUrl)
    );

    const response = await queries
      .getFunction('queryExit')
      .staticCall(
        attributes.poolId,
        attributes.sender,
        attributes.recipient,
        attributes.exitPoolRequest
      );

    tokensOut.value = response[1];
  } catch (e) {
    tokensOut.value = [];
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
  <div class="exit-form">
    <div>
      <InputLabel>BPT In</InputLabel>
      <div class="input-with-select">
        <Input
          placeholder="0.0"
          :modelValue="bptIn"
          @input="event => (bptIn = event.target.value)"
        />
        <div class="select">
          <div class="select__button">
            <span class="truncate">{{ pool.symbol }}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button class="submit-button" @click="onSubmit">
        <span v-if="!loading">Query Exit</span>
        <Spinner v-else />
      </button>
    </div>
    <div v-if="errorMessage" class="error-message">
      <p>Error: {{ errorMessage }}</p>
    </div>
    <div class="output">
      <p class="result-heading">Expected Tokens Out:</p>
      <div class="output-amounts">
        <div
          v-for="(token, tokenIndex) in pool.tokens"
          :key="tokenIndex"
          class="bpt-out"
        >
          <Avatar
            :address="token.address"
            :imageURL="getToken(token.address)?.logoURI ?? ''"
            :size="32"
          />
          <div class="bpt-out__metadata">
            <p class="bpt-out__pool-symbol">
              {{ token.symbol }}
            </p>
            <p class="bpt-out__pool-name">{{ token.name }}</p>
          </div>
          <p class="bpt-out__value">
            {{
              tokensOut.length === 0
                ? '0'
                : new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 4,
                    roundingMode: 'floor',
                  }).format(
                    parseFloat(
                      ethers.formatUnits(tokensOut[tokenIndex], token.decimals)
                    )
                  )
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.exit-form > * + * {
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
  margin-bottom: 12px;
}

.output {
  background-color: #f8fafc;
  padding: 12px;
  border-radius: 8px;
}

.dark .output {
  background-color: #162031;
}

.output-amounts > * + * {
  margin-top: 16px;
}

.bpt-out {
  align-items: center;
  display: flex;
  gap: 12px;
}

.bpt-out__metadata {
  flex: 1;
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
