<script>
export default {
  props: {
    name: String,
    vestedToken: String,
    totalValueVested: String,
    availableTokensForRewards: Array,
  },
};
</script>

<template>
  <div class="card-group">
    <h2 class="name">{{ name }}</h2>
    <div class="card">
      <article class="item-row">
        <p class="item-name">Vested Token</p>
        <p class="item-value">{{ vestedToken }}</p>
      </article>
      <article class="item-row">
        <p class="item-name">Total Value Vested</p>
        <p class="item-value">{{ totalValueVested }}</p>
      </article>
      <article class="item-row">
        <p class="item-name">Available Tokens for Rewards</p>
        <p class="item-value">{{ availableTokensForRewards.join(', ') }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.card-group {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90%;
  max-width: 560px;
  gap: 10px;
}

.name {
  font-size: 14px;
  align-self: flex-start;
  width: 100%;
  border: none;
  padding: 0;
  margin: 0 !important;
}

.card {
  background-color: #eaf0f6;
  border: 1px solid #384aff;
  border-radius: 16px;
  padding: 16px 20px;
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
}

.dark .card {
  background-color: #0d1834;
}

.card .item-row {
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
}

.card .item-row .item-name,
.card .item-row .item-value {
  width: 50%;
  font-size: 14px;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;
}

.card .item-row .item-name {
  font-weight: 500;
}

.card .item-row .item-value {
  background-color: #384aff33;
  border: 1px solid #384aff;
  border-radius: 6px;
  padding-left: 16px;
}
</style>
