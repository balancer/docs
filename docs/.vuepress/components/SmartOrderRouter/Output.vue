<script setup>
import { computed, ref } from 'vue';
import { ethers } from 'ethers';
import { VaultAbi } from '../../abis/VaultAbi';

const vaultContract = new ethers.Contract(ethers.ZeroAddress, VaultAbi);

// PROPS
const props = defineProps({
  route: {
    type: Object,
  },
});

// STATE
const activeTab = ref('json');

const senderInternalBalance = ref(false);
const sender = ref(ethers.ZeroAddress);

const recipientInternalBalance = ref(false);
const recipient = ref(ethers.ZeroAddress);

const deadline = ref(ethers.MaxUint256.toString());

// COMPOSABLES

// COMPUTED
const jsonValue = computed(() => {
  const funds = {
    sender: sender.value,
    fromInternalBalance: senderInternalBalance.value,
    recipient: recipient.value,
    toInternalBalance: recipientInternalBalance.value,
  };

  let deadlineBigInt = ethers.MaxUint256;
  if (deadline.value !== '' || deadline.value !== '0') {
    try {
      deadlineBigInt = ethers.getBigInt(deadline.value);
    } catch {
      deadlineBigInt = ethers.MaxUint256;
    }
  }

  if (!props.route) {
    return {
      kind: 0,
      swaps: [],
      assets: [],
      funds,
      limits: [],
      deadline: deadlineBigInt,
    };
  }

  if (props.route.isBatchSwap) {
    return {
      kind: props.route.swapKind,
      swaps: props.route.swaps,
      assets: props.route.assets,
      funds,
      limits: [],
      deadline: deadlineBigInt,
    };
  }

  return {
    singleSwap: {
      poolId: props.route.swaps.poolId,
      kind: props.route.swaps.kind,
      assetIn: props.route.swaps.assetIn,
      assetOut: props.route.swaps.assetOut,
      amount: props.route.swaps.amount,
      userData: props.route.swaps.userData,
    },
    funds,
    limit: '0',
    deadline: deadlineBigInt,
  };
});

const hexValue = computed(() => {
  if (!props.route) {
    return ethers.zeroPadBytes(ethers.ZeroHash, 384);
  }

  if (props.route.isBatchSwap) {
    return vaultContract.interface.encodeFunctionData('batchSwap', [
      jsonValue.value.kind,
      jsonValue.value.swaps,
      jsonValue.value.assets,
      jsonValue.value.funds,
      jsonValue.value.limits,
      jsonValue.value.deadline,
    ]);
  }

  return vaultContract.interface.encodeFunctionData('swap', [
    jsonValue.value.singleSwap,
    jsonValue.value.funds,
    jsonValue.value.limit,
    jsonValue.value.deadline,
  ]);
});

// METHODS

// WATCHERS
</script>
<template>
  <div>
    <div class="controls">
      <div class="tabs">
        <button
          :class="`tab ${activeTab === 'json' ? 'tab--active' : null}`"
          @click="activeTab = 'json'"
        >
          JSON
        </button>
        <button
          :class="`tab ${activeTab === 'hex' ? 'tab--active' : null}`"
          @click="activeTab = 'hex'"
        >
          Hex
        </button>
      </div>
      <button
        :class="`tab ${activeTab === 'settings' ? 'tab--active' : null}`"
        @click="
          activeTab === 'settings'
            ? (activeTab = 'json')
            : (activeTab = 'settings')
        "
      >
        Settings
      </button>
    </div>
    <div v-if="activeTab === 'json'" class="code">
      <pre>{{ JSON.stringify(jsonValue, null, 2) }}</pre>
    </div>
    <div v-if="activeTab === 'hex'" class="code">
      <pre class="wrap">{{ hexValue }}</pre>
    </div>
    <div v-if="activeTab === 'settings'" class="settings">
      <div>
        <div class="address-input-label">
          <InputLabel style="margin-bottom: 0">Sender</InputLabel>
          <div class="checkbox">
            <label for="senderInternalBalance">From Internal Balance</label>
            <input
              id="senderInternalBalance"
              type="checkbox"
              :checked="senderInternalBalance"
              @input="event => (senderInternalBalance = event.target.checked)"
            />
          </div>
        </div>
        <Input
          type="text"
          :modelValue="sender"
          @input="event => (sender = event.target.value)"
        />
      </div>
      <div>
        <div class="address-input-label">
          <InputLabel style="margin-bottom: 0">Recipient</InputLabel>
          <div class="checkbox">
            <label for="recipientInternalBalance">From Internal Balance</label>
            <input
              id="recipientInternalBalance"
              type="checkbox"
              :checked="recipientInternalBalance"
              @input="
                event => (recipientInternalBalance = event.target.checked)
              "
            />
          </div>
        </div>
        <Input
          type="text"
          :modelValue="recipient"
          @input="event => (recipient = event.target.value)"
        />
      </div>
      <div>
        <InputLabel>Deadline</InputLabel>
        <Input
          type="text"
          :modelValue="deadline"
          @input="event => (deadline = event.target.value)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
pre {
  margin: 0;
}

.wrap {
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}

.code {
  flex: 1;
  overflow-y: auto;
  height: 400px;
}

.code pre::-webkit-scrollbar {
  display: none;
}

.code pre {
  background: #0f172a;
  color: #f8fafc;
  border-radius: 12px;
  font-size: 14px;
  line-height: 20px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.dark .code pre {
  background: #1e293b;
}

.controls {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
}

.tabs {
  align-items: center;
  display: flex;
  gap: 6px;
}

.tab {
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #475569;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  padding: 8px 12px;
}

.dark .tab {
  background-color: transparent;
  border-color: #3e4c5a;
  color: #fff;
}

.tab:not(.tab--active):hover {
  border-color: #cbd5e1;
}

.dark .tab:not(.tab--active):hover {
  border-color: #64748b;
}

.tab--active {
  background-color: #eff6ff;
  border-color: transparent;
  color: #2563eb;
}

.dark .tab--active {
  background-color: #384aff;
  border-color: transparent;
  color: #fff;
}

.settings > * + * {
  margin-top: 16px;
}

.address-input-label {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
}

.checkbox {
  align-items: center;
  display: flex;
  gap: 3px;
}

.checkbox label {
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  user-select: none;
}
</style>
