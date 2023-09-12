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

async function copyToClipboard(value) {
  await navigator.clipboard.writeText(value);
}
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
              :imageURL="getToken(token.address)?.logoURI ?? ''"
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
            <button
              class="copy-btn"
              @click="copyToClipboard(parseFloat(token.balance))"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"
                />
                <path
                  d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"
                />
              </svg>
            </button>
          </div>
          <div class="stat">
            <p class="label">Balance (wei)</p>
            <p class="value">
              {{ ethers.parseUnits(token.balance, token.decimals) }}
            </p>
            <button
              class="copy-btn"
              @click="
                copyToClipboard(
                  ethers.parseUnits(token.balance, token.decimals)
                )
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z"
                />
                <path
                  d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z"
                />
              </svg>
            </button>
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
  gap: 8px;
}

.label {
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  flex: 1;
}

.value {
  font-size: 14px;
  line-height: 16px;
}

.dark .value {
  color: #cbd5e1;
}

.copy-btn {
  background-color: #f8fafc;
  border: 0;
  color: #94a3b8;
  padding: 0;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out color 0.2s ease-in-out;
}

.dark .copy-btn {
  background-color: #334155;
  color: #94a3b8;
}

.copy-btn:hover {
  background-color: #eaf0f6;
  color: #5668ff;
}

.dark .copy-btn:hover {
  background-color: #1e293b;
}

.copy-btn svg {
  height: 14px;
  width: 14px;
}
</style>
