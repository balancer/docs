<script setup>
import { ref, watch } from 'vue';
import Menu from './Menu.vue';
import EditPathForm from './EditPathForm.vue';
import Output from './Output.vue';
import { useNetwork } from '../../providers/network';

const { network } = useNetwork();

const selectedPath = ref(0);
const swapKind = ref(0);
const sender = ref('');
const senderInternalBalance = ref(false);
const recipient = ref('');
const recipientInternalBalance = ref(false);
const deadline = ref('');

const paths = ref([
  {
    amount: '',
    tokenIn: null,
    hops: [
      {
        pool: null,
        tokenOut: null,
      },
    ],
  },
  {
    amount: '',
    tokenIn: null,
    hops: [
      {
        pool: null,
        tokenOut: null,
      },
    ],
  },
]);

watch(network, () => {
  selectedPath.value = 0;
  swapKind.value = 0;
  sender.value = '';
  senderInternalBalance.value = false;
  recipient.value = '';
  recipientInternalBalance.value = false;
  deadline.value = '';

  paths.value = [
    {
      amount: '',
      tokenIn: null,
      hops: [
        {
          pool: null,
          tokenOut: null,
        },
      ],
    },
    {
      amount: '',
      tokenIn: null,
      hops: [
        {
          pool: null,
          tokenOut: null,
        },
      ],
    },
  ];
});

function addPath() {
  paths.value.push({
    amount: '',
    tokenIn: null,
    hops: [
      {
        pool: null,
        tokenOut: null,
      },
    ],
  });

  selectedPath.value = paths.value.length - 1;
}

function removePath(index) {
  paths.value = paths.value.filter((_, i) => i !== index);

  if (selectedPath.value >= paths.value.length) {
    selectedPath.value = 0;
  }
}

function onTokenInChange(value) {
  paths.value[selectedPath.value].hops = [
    {
      pool: null,
      tokenOut: null,
    },
  ];
  paths.value[selectedPath.value].tokenIn = value;
}

function addHop() {
  paths.value[selectedPath.value].hops.push({
    pool: null,
    tokenOut: null,
  });
}

function deleteHop(index) {
  const nextHops = paths.value[selectedPath.value].hops.slice(0, index);

  if (nextHops.length === 0) {
    nextHops.push({
      pool: null,
      tokenOut: null,
    });
  }

  paths.value[selectedPath.value].hops = nextHops;
}

function onPoolChange(pool, index) {
  paths.value[selectedPath.value].hops = paths.value[
    selectedPath.value
  ].hops.slice(0, index + 1);
  paths.value[selectedPath.value].hops[index].tokenOut = null;
  paths.value[selectedPath.value].hops[index].pool = pool;
}

function onTokenOutChange(token, index) {
  paths.value[selectedPath.value].hops = paths.value[
    selectedPath.value
  ].hops.slice(0, index + 1);
  paths.value[selectedPath.value].hops[index].tokenOut = token;
}
</script>
<template>
  <div class="batch-swap-view">
    <div class="batch-swap-view__side-nav">
      <Menu
        :selectedIndex="selectedPath"
        :paths="paths"
        :onPathSelect="index => (selectedPath = index)"
        :onAddPath="addPath"
        :onDeletePath="removePath"
      />
    </div>
    <div class="batch-swap-view__edit-path">
      <EditPathForm
        :path="paths[selectedPath]"
        :swapKind="swapKind"
        :onAmountChange="amount => (paths[selectedPath].amount = amount)"
        :onTokenInChange="onTokenInChange"
        :onPoolChange="onPoolChange"
        :onTokenOutChange="onTokenOutChange"
        :onAddHop="addHop"
        :onDeleteHop="deleteHop"
      />
    </div>
    <div class="batch-swap-view__output">
      <Output
        :paths="paths"
        :swapKind="swapKind"
        :onSwapKindChange="kind => (swapKind = kind)"
        :sender="sender"
        :onSenderChange="value => (sender = value)"
        :recipient="recipient"
        :onRecipientChange="value => (recipient = value)"
        :senderInternalBalance="senderInternalBalance"
        :onSenderInternalBalanceChange="
          value => (senderInternalBalance = value)
        "
        :recipientInternalBalance="recipientInternalBalance"
        :onRecipientInternalBalanceChange="
          value => (recipientInternalBalance = value)
        "
        :deadline="deadline"
        :onDeadlineChange="value => (deadline = value)"
      />
    </div>
  </div>
</template>
<style scoped>
.batch-swap-view {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  height: 100%;
}

.dark .batch-swap-view {
  border-color: #3e4c5a;
}

.batch-swap-view__side-nav {
  width: 175px;
  flex-shrink: 0;
}

.batch-swap-view__edit-path {
  border-right: 1px solid #e2e8f0;
  overflow-y: auto;
  padding: 24px 12px;
  width: 300px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  flex-shrink: 0;
}

.dark .batch-swap-view__edit-path {
  border-color: #3e4c5a;
}

.batch-swap-view__edit-path::-webkit-scrollbar {
  display: none;
}

.batch-swap-view__output {
  flex: 1;
  /* overflow-x: auto; */
  overflow-y: auto;
}
</style>
