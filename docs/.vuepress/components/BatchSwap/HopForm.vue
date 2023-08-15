<script setup>
import { computed } from 'vue';
import { usePools } from '../../providers/pools';
import { useTokens } from '../../providers/tokens';
import { Select, SelectTrigger, SelectOptions } from '../Select';

const { getToken, getTokens } = useTokens();
const { pools, getPoolByID } = usePools();

function filterPoolsByToken(pools, token) {
  return pools.filter(pool => {
    return (
      pool.tokens.filter(poolToken => {
        return poolToken.address.toLowerCase() === token.toLowerCase();
      }).length > 0
    );
  });
}

const props = defineProps({
  hop: {
    type: Object,
    required: true,
  },
  hopIndex: {
    type: Number,
    required: true,
  },
  prevToken: {
    type: String,
  },
  onPoolChange: {
    type: Function,
    required: true,
  },
  onTokenOutChange: {
    type: Function,
    required: true,
  },
  onDeleteHop: {
    type: Function,
    required: true,
  },
});

const pool = computed(() => {
  if (!props.hop.pool) {
    return null;
  }

  const _p = getPoolByID(props.hop.pool);

  return _p;
});

const tokenOut = computed(() => {
  if (!props.hop.tokenOut) {
    return null;
  }

  return getToken(props.hop.tokenOut);
});
</script>
<template>
  <div class="hop-form">
    <div class="hop-form__header">
      <p class="hop-form__heading">Hop {{ hopIndex + 1 }}</p>
      <button class="delete-hop" @click="onDeleteHop(hopIndex)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
          />
        </svg>
      </button>
    </div>
    <hr />
    <div>
      <InputLabel>Pool</InputLabel>
      <Select
        :onChange="newValue => onPoolChange(newValue.id, hopIndex)"
        :value="hop.pool ? getPoolByID(hop.pool) : null"
      >
        <SelectTrigger
          :value="hop.pool"
          :disabled="prevToken === null"
          placeholder="Select Pool"
        >
          <span v-if="pool" class="truncate">{{ pool.symbol }}</span>
        </SelectTrigger>
        <SelectOptions
          v-slot="item"
          :options="prevToken ? filterPoolsByToken(pools, prevToken) : []"
          optionKey="id"
        >
          <span class="truncate">{{ item.symbol }}</span>
        </SelectOptions>
      </Select>
    </div>
    <div>
      <InputLabel>Token Out</InputLabel>
      <Select
        :onChange="newValue => onTokenOutChange(newValue.address, hopIndex)"
        :value="tokenOut"
      >
        <SelectTrigger
          :value="hop.tokenOut"
          :disabled="pool === null"
          placeholder="Select Token"
        >
          <Avatar
            :address="tokenOut.address"
            :imageURL="tokenOut.logoURI"
            :size="20"
          />
          <span class="truncate">{{ tokenOut.symbol }}</span>
        </SelectTrigger>
        <SelectOptions
          v-slot="item"
          :options="
            pool
              ? getTokens(
                  pool.tokensList.filter(
                    address => address.toLowerCase() !== prevToken.toLowerCase()
                  )
                )
              : []
          "
          optionKey="address"
        >
          <Avatar :address="item.address" :imageURL="item.logoURI" :size="20" />
          <span class="truncate">{{ item.symbol }}</span>
        </SelectOptions>
      </Select>
    </div>
  </div>
</template>
<style scoped>
.hop-form {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px;
}

.dark .hop-form {
  border-color: #3e4c5a;
}

.hop-form > * + * {
  margin-top: 16px;
}

.hop-form hr {
  margin-bottom: 0;
}

.hop-form__header {
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding-top: 4px;
}

.hop-form__heading {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.delete-hop {
  align-items: center;
  display: none;
  justify-content: center;
  background-color: transparent;
  border: 0;
  color: #94a3b8;
}

.delete-hop:hover {
  color: #1a202c;
}

.delete-hop svg {
  height: 16px;
  width: 16px;
}

.hop-form:hover .delete-hop {
  display: flex;
}
</style>
