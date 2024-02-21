<script setup lang="ts">
import { defineProps, ref, watch, computed } from 'vue';

type ClaimableTokenType = {
  token: string;
  claimableAmount: string;
  address: string;
};

type ModalPropsType = {
  open: boolean;
  onClose: () => void;
  onSubmit: (tokens: string[]) => void;
  tokens: ClaimableTokenType[];
};

type ItemType = ClaimableTokenType & {
  checked: boolean;
};

const items = ref<ItemType[]>();
const props = defineProps<ModalPropsType>();

watch(
  () => props.tokens,
  value => {
    items.value = value.map(x => ({ ...x, checked: false }));
  }
);

const toggleSelect = (i: number) => {
  if (!items.value) return;

  items.value[i].checked = !items.value[i].checked;
};

const allSelected = computed(() => items.value?.every(item => item.checked));

const toggleSelectAll = () => {
  if (!items.value) return;

  const newValue = !allSelected.value;

  items.value.map(token => (token.checked = newValue));
};

const selectedTokens = computed<string[]>(() =>
  items.value
    ? items.value.filter(item => item.checked).map(item => item.address)
    : []
);
</script>

<template>
  <div v-if="props.open" class="modal-container">
    <div class="modal-popup claim">
      <div class="head">
        <div class="item-row">
          <div class="item-check"></div>
          <p class="item-name">Token</p>
          <p class="item-value">Claimable Amount</p>
        </div>
      </div>
      <div class="body">
        <div v-for="(item, i) in items" :key="item.token" class="item-row">
          <div class="item-check" @click="toggleSelect(i)">
            <svg v-if="item.checked" width="16" height="16" class="icon">
              <use href="/images/check2-square.svg#icon"></use>
            </svg>
            <svg v-else width="14" height="14" class="icon">
              <use href="/images/square.svg#icon"></use>
            </svg>
          </div>

          <p class="item-name">{{ item.token }}</p>
          <p class="item-value">{{ item.claimableAmount }}</p>
        </div>
      </div>
      <div class="footerModal">
        <div class="row-check">
          <div class="item-check" @click="toggleSelectAll">
            <svg v-if="allSelected" width="16" height="16" class="icon">
              <use href="/images/check2-square.svg#icon"></use>
            </svg>
            <svg v-else width="14" height="14" class="icon">
              <use href="/images/square.svg#icon"></use>
            </svg>
          </div>
          <p class="title-check">Claim All My Tokens</p>
        </div>

        <div class="btn-group">
          <button class="btn close" @click="props.onClose">Close</button>
          <button
            class="btn submit"
            :disabled="selectedTokens.length === 0"
            @click="onSubmit(selectedTokens)"
          >
            Submit
          </button>
        </div>
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

/* MODAL CLAIM */

.modal-container .modal-popup.claim {
  display: flex;
  flex-direction: column;
  padding: 16px;
  top: 300px;
}

@media (max-width: 1520px) {
  .modal-popup.claim {
    left: calc(50% - 160px);
  }
}

@media (max-width: 1200px) {
  .modal-popup.claim {
    left: 35%;
  }
}

@media (max-width: 1000px) {
  .modal-popup.claim {
    max-width: 500px;
  }
}

@media (max-width: 850px) {
  .modal-popup.claim {
    left: calc(50% - 250px);
  }
}

@media (max-width: 555px) {
  .modal-popup.claim {
    left: 5%;
    top: 250px;
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
.modal-popup.claim .item-row .item-value {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.modal-popup.claim .item-row .item-check {
  min-width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .item-check .icon {
  fill: #ffffff;
}
.modal-popup.claim .body {
  margin-bottom: 20px;
}
.modal-popup.claim .item-row:nth-child(even) {
  background-color: rgba(56, 74, 255, 0.2);
}

.modal-popup .footerModal {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footerModal .row-check {
  display: flex;
  align-items: center;
  gap: 5px;
}

.row-check .title-check {
  margin: 0;
}

.modal-popup.claim .footerModal .item-check {
  min-width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

@media (max-width: 550px) {
  .modal-popup .footerModal {
    flex-direction: column;
    align-items: flex-start;
  }
  .modal-popup .btn-group {
    width: 100%;
  }
}

.modal-popup .btn-group .btn:disabled {
  cursor: not-allowed;
  background-color: rgba(56, 74, 255, 0.2);
  color: grey;
}
</style>
