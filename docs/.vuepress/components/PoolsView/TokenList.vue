<script setup>
import { ethers } from 'ethers';
import { useNetwork } from '../../providers/network';
import { useTokens } from '../../providers/tokens';

const { network } = useNetwork();
const { getToken } = useTokens();

defineProps({
  pool: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div>
    <p class="heading">Pool Tokens</p>
    <div class="tokens">
      <div
        v-for="token in pool.tokens.filter(t => t.address !== pool.address)"
        :key="token.address"
      >
        <div class="token-summary">
          <div class="logo">
            <Avatar
              v-if="token"
              :address="token.address"
              :imageURL="getToken(token.address).logoURI"
              :size="36"
            />
          </div>
          <div class="truncate" style="flex: 1">
            <p class="truncate symbol">{{ token.symbol }}</p>
            <p class="truncate name">{{ token.name }}</p>
          </div>
          <a
            class="address"
            :href="`${network.explorer}/address/${token.address}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              >{{ token.address.slice(0, 6) }}...{{
                token.address.slice(-4)
              }}</span
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <div class="token-details">
          <div class="stat">
            <p class="label">Balance</p>
            <p class="value">
              {{
                new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 3,
                  roundingMode: 'floor',
                }).format(parseFloat(token.balance))
              }}
            </p>
          </div>
          <div class="stat">
            <p class="label">Balance (wei)</p>
            <p class="value">
              {{ ethers.parseUnits(token.balance, token.decimals) }}
            </p>
          </div>
          <div v-if="token.weight" class="stat">
            <p class="label">Token %</p>
            <p class="value">
              {{
                new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: 3,
                  roundingMode: 'floor',
                }).format(parseFloat(token.weight) * 100)
              }}%
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.heading {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 16px;
}

.name {
  font-size: 12px;
  line-height: 16px;
}

.tokens > * + * {
  margin-top: 32px;
}

.token-summary {
  align-items: center;
  display: flex;
  gap: 12px;
  padding-bottom: 16px;
}

.logo {
  flex-shrink: 0;
}

.symbol {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.address {
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 600;
  gap: 3px;
  line-height: 16px;
  flex-shrink: 0;
}

.address svg {
  height: 16px;
  width: 16px;
}

.token-details {
  padding-left: 48px;
}

.token-details > * + * {
  margin-top: 16px;
}

.stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
}

.value {
  font-size: 14px;
  line-height: 16px;
}
</style>
