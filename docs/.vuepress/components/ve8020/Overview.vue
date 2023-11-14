<script setup>
import TokenCard from './TokenCard.vue';
const tokenInfo = [
  {
    name: 'veGNO80-WTEH20',
    vestedToken: 'B-GNO80-WTEH20',
    totalValueVested: '756325',
    availableTokensForRewards: ['0x1a2b...', '0xa1b2..'],
  },
  {
    name: 'veALC80-WTEH20',
    vestedToken: 'B-ALC80-WETHH20',
    totalValueVested: '456874',
    availableTokensForRewards: ['0x1a2b...', '0xa1b2..'],
  },
  {
    name: 'veCER80-WTEH20',
    vestedToken: 'BCER80-WTEH20',
    totalValueVested: '256325',
    availableTokensForRewards: ['0x1a2b...', '0xa1b2..'],
  },
];
</script>

<template>
  <section class="section-container">
    <div class="card-container">
      <TokenCard
        v-for="(token, index) in tokenInfo"
        :key="index"
        :name="token.name"
        :vestedToken="token.vestedToken"
        :totalValueVested="token.totalValueVested"
        :availableTokensForRewards="token.availableTokensForRewards"
      />
    </div>
  </section>
</template>

<style scoped>
.section-container {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}
</style>
