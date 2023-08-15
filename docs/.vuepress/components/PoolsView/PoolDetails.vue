<script setup>
import { useNetwork } from '../../providers/network';

defineProps({
  pool: {
    type: Object,
    required: true,
  },
});

const { network } = useNetwork();
</script>
<template>
  <div class="details">
    <p class="heading">Pool Details</p>
    <div class="list">
      <div class="item">
        <p class="label">Contract Address</p>
        <p class="value">
          <a
            class="link-external"
            :href="`${network.explorer}/address/${pool.address}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              >{{ pool.address.slice(0, 6) }}...{{
                pool.address.slice(-4)
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
        </p>
      </div>
      <div class="item">
        <p class="label">Pool Type</p>
        <p class="value">{{ pool.poolType }}</p>
      </div>
      <div class="item">
        <p class="label">Swap Fee</p>
        <p class="value">
          {{
            new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 3,
              roundingMode: 'floor',
            }).format(parseFloat(pool.swapFee) * 100)
          }}%
        </p>
      </div>
      <div v-if="pool.amp" class="item">
        <p class="label">Amp Factor</p>
        <p class="value">{{ pool.amp }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.link-external {
  align-items: center;
  display: flex;
  gap: 3px;
}

.link-external svg {
  height: 16px;
  width: 16px;
}
.details {
  background-color: #f8fafc;
  padding: 16px 24px;
  border-radius: 8px;
}

.dark .details {
  background-color: #162031;
}

.heading {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 16px;
}

.list > * + * {
  margin-top: 12px;
}

.item {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.label {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.value {
  font-size: 14px;
  line-height: 20px;
}

.dark .value {
  color: #cbd5e1;
}
</style>
