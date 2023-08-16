<script setup>
import { computed, ref } from 'vue';
import { ethers } from 'ethers';
import { DEFAULT_USERDATA } from '@balancer/sdk';
import { useTokens } from '../../providers/tokens';
import { VaultAbi } from '../../abis/VaultAbi';
import { Select, SelectTrigger, SelectOptions } from '../Select';

const props = defineProps({
  paths: {
    type: Array,
    required: true,
  },
  swapKind: {
    type: Number,
    required: true,
  },
  onSwapKindChange: {
    type: Function,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  onSenderChange: {
    type: Function,
    required: true,
  },
  onRecipientChange: {
    type: Function,
    required: true,
  },
  senderInternalBalance: {
    type: Boolean,
    required: true,
  },
  recipientInternalBalance: {
    type: Boolean,
    required: true,
  },
  onSenderInternalBalanceChange: {
    type: Function,
    required: true,
  },
  onRecipientInternalBalanceChange: {
    type: Function,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  onDeadlineChange: {
    type: Function,
    required: true,
  },
});

const activeTab = ref('json');

const vaultContract = new ethers.Contract(ethers.ZeroAddress, VaultAbi);

const swapKinds = [
  {
    kind: 0,
    label: 'Given In',
  },
  {
    kind: 1,
    label: 'Given Out',
  },
];

const { getToken } = useTokens();

function getAssetsFromPaths(paths) {
  const assets = {};

  for (const path of paths) {
    if (path.tokenIn) {
      assets[path.tokenIn] = true;
    }

    for (const hop of path.hops) {
      if (hop.tokenOut) {
        assets[hop.tokenOut] = true;
      }
    }
  }

  return Object.keys(assets);
}

const batchSwapInput = computed(() => {
  const swaps = [];

  const assets = getAssetsFromPaths(props.paths);

  for (const path of props.paths) {
    path.hops.forEach((hop, hopIndex) => {
      if (!hop.pool) {
        return;
      }

      const tokenIn =
        hopIndex === 0 ? path.tokenIn : path.hops[hopIndex - 1].tokenOut;

      let amount = 0n;
      if (hopIndex === 0 && path.amount !== '') {
        try {
          amount = ethers.parseUnits(path.amount, getToken(tokenIn).decimals);
        } catch {
          amount = 0n;
        }
      }

      swaps.push({
        amount: amount.toString(),
        poolId: hop.pool ?? ethers.ZeroHash,
        assetInIndex: tokenIn ? assets.indexOf(tokenIn) : 0,
        assetOutIndex: hop.tokenOut ? assets.indexOf(hop.tokenOut) : 0,
        userData: DEFAULT_USERDATA,
      });
    });
  }

  let deadline = ethers.MaxUint256;
  if (props.deadline !== '' || props.deadline !== '0') {
    try {
      deadline = ethers.getBigInt(props.deadline);
    } catch {
      deadline = ethers.MaxUint256;
    }
  }

  return {
    kind: props.swapKind,
    swaps,
    assets,
    funds: {
      sender: ethers.isAddress(props.sender)
        ? props.sender
        : ethers.ZeroAddress,
      fromInternalBalance: props.senderInternalBalance,
      recipient: ethers.isAddress(props.recipient)
        ? props.recipient
        : ethers.ZeroAddress,
      toInternalBalance: props.recipientInternalBalance,
    },
    limits: [],
    deadline,
  };
});

const hexValue = computed(() => {
  const result = vaultContract.interface.encodeFunctionData('batchSwap', [
    batchSwapInput.value.kind,
    batchSwapInput.value.swaps,
    batchSwapInput.value.assets,
    batchSwapInput.value.funds,
    batchSwapInput.value.limits,
    batchSwapInput.value.deadline,
  ]);

  return result;
});
</script>
<template>
  <div class="output">
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
      <pre>{{ JSON.stringify(batchSwapInput, null, 2) }}</pre>
    </div>
    <div v-if="activeTab === 'hex'" class="code">
      <pre class="wrap">{{ hexValue }}</pre>
    </div>
    <div v-if="activeTab === 'settings'" class="settings">
      <div>
        <InputLabel>Swap Kind</InputLabel>
        <Select
          :onChange="newValue => onSwapKindChange(newValue.kind)"
          :value="swapKinds[swapKind]"
        >
          <SelectTrigger :value="swapKinds[swapKind].label">
            <span>{{ swapKinds[swapKind].label }}</span>
          </SelectTrigger>
          <SelectOptions v-slot="item" :options="swapKinds" optionKey="kind">
            <span>{{ item.label }}</span>
          </SelectOptions>
        </Select>
      </div>
      <div>
        <div class="address-input-label">
          <InputLabel style="margin-bottom: 0">Sender</InputLabel>
          <div class="checkbox">
            <label for="senderInternalBalance">From Internal Balance</label>
            <input
              id="senderInternalBalance"
              type="checkbox"
              :checked="senderInternalBalance"
              @input="
                event => onSenderInternalBalanceChange(event.target.checked)
              "
            />
          </div>
        </div>
        <Input
          type="text"
          :modelValue="sender"
          @input="event => onSenderChange(event.target.value)"
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
                event => onRecipientInternalBalanceChange(event.target.checked)
              "
            />
          </div>
        </div>
        <Input
          type="text"
          :modelValue="recipient"
          @input="event => onRecipientChange(event.target.value)"
        />
      </div>
      <div>
        <InputLabel>Deadline</InputLabel>
        <Input
          type="text"
          :modelValue="deadline"
          @input="event => onDeadlineChange(event.target.value)"
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

.output {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px 24px;
}

.output > * + * {
  margin-top: 16px;
}

.code {
  flex: 1;
  overflow-y: auto;
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
