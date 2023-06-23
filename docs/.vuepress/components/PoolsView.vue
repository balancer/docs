<script setup>
import { watchEffect, ref } from 'vue';
import { SubgraphPoolProvider } from '@balancer/sdk';
import { ethers } from 'ethers';
import Avatar from './Avatar.vue';

const props = defineProps({
  network: {
    type: Object,
    required: true,
  },
});

async function handleSubmit(value) {
  loading.value = true;
  const subgraphProvider = new SubgraphPoolProvider(props.network.id);
  const { pools } = await subgraphProvider.getPools({
    timestamp: BigInt(new Date().getDate()),
  });

  const _pool = pools.find(p => p.address === value || p.id === value);
  if (_pool) {
    pool.value = _pool;
  }

  loading.value = false;
}

function toWei(value, decimals) {
  return ethers.parseUnits(value, decimals).toString();
}

const loading = ref(false);
const activeTab = ref('swap');

const pool = ref(undefined);

watchEffect(async () => {
  loading.value = true;
  const subgraphProvider = new SubgraphPoolProvider(props.network.id);
  const { pools } = await subgraphProvider.getPools({
    timestamp: BigInt(new Date().getDate()),
  });

  if (props.network.id === 1) {
    pool.value = pools.find(
      p =>
        p.id ===
        '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014'
    );
  } else {
    pool.value = pools[0];
  }

  loading.value = false;
});
</script>
<template>
  <div class="PoolsView">
    <PoolSearchForm :onSubmit="handleSubmit" />
    <PoolsViewLoading v-if="loading" />
    <div v-if="!loading && pool">
      <div class="layout">
        <div class="header">
          <p class="pool__name">{{ pool.name }}</p>
          <p class="pool__id">
            <strong>ID:</strong>
            {{ pool.id }}
          </p>
        </div>
        <div class="tokens">
          <p class="detail__heading">Pool Tokens</p>
          <div class="asset-list">
            <div
              v-for="token in pool.tokens"
              :key="token.address"
              class="asset"
            >
              <div class="asset__header">
                <Avatar
                  :address="token.address"
                  :imageURL="`https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/${token.address}.png`"
                  :size="36"
                />
                <div class="flex-1">
                  <p class="asset__symbol">{{ token.symbol }}</p>
                  <p class="asset__name">{{ token.name }}</p>
                </div>
                <p class="asset__balance">
                  {{
                    new Intl.NumberFormat('en-US', {}).format(
                      parseFloat(token.balance)
                    )
                  }}
                </p>
              </div>
              <div class="asset__details">
                <div class="stats">
                  <div class="stat">
                    <p class="stat__label">Address</p>
                    <p class="stat__value">
                      <a
                        class="external-link"
                        :href="`${network.explorer}/address/${token.address}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        >{{ token.address.slice(0, 6) }}...{{
                          token.address.slice(-4)
                        }}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
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
                    </p>
                  </div>
                  <div class="stat">
                    <p class="stat__label">Balance (wei)</p>
                    <div class="stat__value">
                      {{ toWei(token.balance, token.decimals) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="queries">
          <div class="queries-card">
            <div class="tabs">
              <button
                :class="`tab ${activeTab === 'swap' ? 'tab--active' : ''}`"
                @click="activeTab = 'swap'"
              >
                Swap
              </button>
              <button
                :class="`tab ${activeTab === 'join' ? 'tab--active' : ''}`"
                @click="activeTab = 'join'"
              >
                Join
              </button>
              <button
                :class="`tab ${activeTab === 'exit' ? 'tab--active' : ''}`"
                @click="activeTab = 'exit'"
              >
                Exit
              </button>
            </div>
            <div class="queries-card__content">
              <QuerySwapForm
                v-if="activeTab === 'swap'"
                :pool="pool"
                :network="network"
              />
              <QueryJoinForm
                v-if="activeTab === 'join'"
                :pool="pool"
                :network="network"
              />
              <QueryExitForm
                v-if="activeTab === 'exit'"
                :pool="pool"
                :network="network"
              />
            </div>
          </div>
        </div>
        <div class="details">
          <div class="pool-details">
            <p class="pool-details__heading">Pool Details</p>
            <div class="testing">
              <p><strong>Pool Type</strong></p>
              <p>{{ pool.poolType }}</p>
            </div>
            <div class="testing">
              <p><strong>Swap Fee</strong></p>
              <p>{{ parseFloat(pool.swapFee) * 100 }}%</p>
            </div>
            <div class="testing">
              <p><strong>Contract Address</strong></p>
              <p>
                <a
                  class="external-link"
                  :href="`${network.explorer}/address/${pool.address}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ pool.address.slice(0, 6) }}...{{ pool.address.slice(-4) }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
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
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 
      -->
    </div>
  </div>
</template>
<style scoped>
p {
  margin: 0;
}

.flex-1 {
  flex: 1;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: 'header' 'tokens' 'queries' 'details';
  gap: 36px;
  width: 100%;
}

.header {
  grid-area: header;
}

.tokens {
  grid-area: tokens;
}

.queries {
  grid-area: queries;
}

.details {
  grid-area: details;
}

.header {
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.dark .header {
  border-color: #475569;
}

.pool__name {
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.pool__id {
  color: #64748b;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.columns {
  /* display: grid; */
  /* grid-template-columns: repeat(2, 1fr); */
  /* grid-template-columns: repeat(1, 1fr); */
  /* gap: 36px; */
  /* padding: 24px 0 0; */
}

.right-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail__heading {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* divide-y-2 > * + * */
.asset-list > * + * {
  border-top: 1px solid #e2e8f0;
}

.dark .asset-list > * + * {
  border-color: #475569;
}

.asset {
  font-size: 14px;
  padding: 24px 0;
}

.asset:first-child {
  padding-top: 0;
}

.asset:last-child {
  padding-bottom: 0;
}

.asset__header {
  align-items: center;
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
}

.asset__symbol {
  font-weight: bold;
  line-height: 1.2;
}

.asset__name {
  color: #64748b;
}

.asset__balance {
  font-weight: bold;
  font-size: 16px;
}

.asset__logo {
  height: 36px;
  width: 36px;
  border-radius: 99px;
  overflow: hidden;
  position: relative;
}

.asset__logo svg {
  height: 100%;
  width: 100%;
  display: block;
}

.asset__logo img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.asset__details {
  /* padding-left: 52px; */
}

.queries-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  padding-top: 8px;
}

.dark .queries-card {
  border-color: #475569;
}

.queries-card__content {
  padding: 16px 0 0px;
  /* padding-bottom: 16px; */
}

.tabs {
  display: flex;
}

.tab {
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid #e2e8f0;
  color: #94a3b8;
  font-size: 14px;
  font-weight: bold;
  flex: 1;
  padding: 16px 0;
  cursor: pointer;
}

.dark .tab {
  border-color: #475569;
}

.tab:not(.tab--active):hover {
  border-bottom-color: #94a3b8;
}

.dark .tab:not(.tab--active):hover {
  border-bottom-color: #94a3b8;
}

.tab--active {
  color: #384aff;
  border-bottom-color: #5668ff;
}

.dark .tab--active {
  color: #60a5fa;
  border-bottom-color: #60a5fa;
}

.pool-details {
  background-color: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
}

.dark .pool-details {
  background-color: #162031;
}

.pool-details__heading {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.testing {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.external-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.external-link svg {
  width: 18px;
  height: 18px;
  display: inline;
}

.stats > * + * {
  margin-top: 8px;
}

.stat {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.stat__label {
  font-weight: bold;
}

@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'header header' 'tokens queries' 'details queries' '. queries';
  }
}
</style>
