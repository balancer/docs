<script setup lang="ts">
import { defineProps } from 'vue';

type ModalPropsType = {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
};

const props = defineProps<ModalPropsType>();
</script>

<template>
  <div v-if="props.open" class="modal-container">
    <div class="modal-popup unlock">
      <h3 class="modal-title">Unlock All</h3>
      <div class="body">
        <p class="text">
          "Unclock All" can be called only once. After it contract becomes 90%
          useless
        </p>
      </div>
      <div class="btn-group">
        <button class="btn close" @click="props.onClose">Close</button>
        <button class="btn submit" @click="props.onUnlock">Unlock</button>
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
  max-width: 320px;
  left: calc(50% - 160px);
  padding: 16px 24px;
}

@media (max-width: 1520px) {
  .modal-popup {
    left: calc(50%);
  }
}

@media (max-width: 720px) {
  .modal-popup {
    left: calc(50% - 160px);
  }
}

@media (max-width: 360px) {
  .modal-popup {
    left: 5%;
  }
}

.dark .modal-popup {
  background-color: #0d1834;
}

.modal-popup.unlock {
  top: 380px;
  display: flex;
  flex-direction: column;
}

.modal-popup .modal-title {
  padding: 0;
  margin: 0;
}

.modal-popup .body {
  margin-block: 20px 32px;
}

.modal-popup .body .text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.modal-popup .btn-group {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
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
</style>
