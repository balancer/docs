<script>
export default {
  props: {
    tokens: {
      type: Array,
      required: true,
    },
  },
};
</script>
<template>
  <div>
    <div v-for="token in tokens" :key="token.address" class="token-list-item">
      <svg x="0" y="0" width="26" height="26">
        <rect
          x="0"
          y="0"
          width="26"
          height="26"
          transform="translate(6.120106820868274 -4.994803801599759) rotate(414.1 13 13)"
          fill="#01888C"
        ></rect>
        <rect
          x="0"
          y="0"
          width="26"
          height="26"
          transform="translate(9.310033276912922 10.288493557597711) rotate(119.0 13 13)"
          fill="#2465E1"
        ></rect>
        <rect
          x="0"
          y="0"
          width="26"
          height="26"
          transform="translate(17.783080661341387 11.72053305957096) rotate(192.9 13 13)"
          fill="#FC7500"
        ></rect>
      </svg>
      <div class="token-list-item__details">
        <div class="token-list-item__symbol">{{ token.symbol }}</div>
        <div class="token-list-item__address">
          {{ token.address }}
        </div>
      </div>
      <div class="token-list-item__balance">
        {{ new Intl.NumberFormat('en-US').format(token.balance) }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.token-list-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  gap: 20px;
}

.token-list-item__details {
  flex: 1;
}

.token-list-item__symbol {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.token-list-item__address {
  font-size: 14px;
}
</style>
