<script setup lang="ts">
import { defineProps } from 'vue';

type RewardDistributionType = {
  token: string;
  amount: string;
};

type ModalPropsType = {
  open: boolean;
  onClose: () => void;
  rewards: RewardDistributionType[];
};

const props = defineProps<ModalPropsType>();
</script>

<template>
  <div v-if="props.open" class="modal-container">
    <div class="modal-popup claim">
      <div class="head">
        <div class="item-row">
          <p class="item-name">Token</p>
          <p class="item-value">Distribution Rewards</p>
        </div>
      </div>
      <div class="body">
        <div v-for="item in rewards" :key="item.token" class="item-row">
          <p class="item-name">{{ item.token }}</p>
          <p class="item-value">{{ item.amount }}</p>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn close" @click="props.onClose">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  position: fixed;
  height: 100%;
  z-index: 100;
  width: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(1px);
  background-color: rgba(0, 0, 0, 0.2);
}
.modal-popup {
  position: sticky;
  border-radius: 16px;
  background-color: #eaf0f6;
  border-radius: 16px;
  border: 1px solid #384aff;
  box-shadow: 0px 4px 20px 0px rgba(51, 65, 85, 0.5);
  width: 90%;
  max-width: 560px;
  left: calc(50% - 280px);
}

.dark .modal-popup {
  background-color: #0d1834;
}

/* MODAL LOCK*/
.modal-popup.lock {
  top: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 36px 20px;
}

.modal-popup.lock .item-row {
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
}

.modal-popup.lock .item-row .item-name,
.modal-popup.lock .item-row .item-value {
  width: 50%;
  font-size: 14px;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0;
  font-weight: 500;
}
.modal-popup.lock .item-row .item-value {
  background-color: rgba(56, 74, 255, 0.2);
  border: 1px solid #384aff;
  border-radius: 6px;
  padding-left: 16px;
}

@media (max-width: 622px) {
  .modal-container .modal-popup {
    left: 5%;
  }
}

@media (max-height: 700px) {
  .modal-container .modal-popup.lock {
    top: 100px;
  }
}

.modal-popup .btn-group {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
}

.modal-popup .btn-group .btn {
  width: 125px;
  height: 40px;
  background-color: #384aff;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  font-weight: 600;
}

.modal-popup .btn-group .btn.submit {
  color: #ffffff;
}

.modal-popup .btn-group .btn.close {
  border: 1px solid #384aff;
  background-color: rgba(56, 74, 255, 0.2);
}

/* MODAL CLAIM */

.modal-container .modal-popup.claim {
  display: flex;
  flex-direction: column;
  padding: 16px;
  top: calc(50% - 300px);
}

@media (max-height: 800px) {
  .modal-container .modal-popup.claim {
    top: 100px;
  }
}

.modal-popup.claim .head .item-row,
.modal-popup.claim .body .item-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 40px;
}
.modal-popup.claim .head {
  border-bottom: 1px solid #384aff;
}
.modal-popup.claim .item-row .item-name,
.modal-popup.claim .item-name .item-value {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.modal-popup.claim .body {
  margin-bottom: 20px;
}
.modal-popup.claim .item-row:nth-child(even) {
  background-color: rgba(56, 74, 255, 0.2);
}
</style>
