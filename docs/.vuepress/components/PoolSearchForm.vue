<script setup>
import { ref } from 'vue';

const searchValue = ref('');

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
});

function handleSubmit() {
  props.onSubmit(searchValue.value);
}
</script>
<template>
  <div class="pool-search-form">
    <input
      v-model="searchValue"
      class="pool-search-form__input"
      type="text"
      placeholder="Search Pool Contract Address or ID"
    />
    <div class="pool-search-form__button-wrapper">
      <button class="pool-search-form__button" @click="handleSubmit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped>
.pool-search-form {
  position: relative;
}

.pool-search-form__input {
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 16px;
  padding: 16px;
  padding-right: 60px;
  width: 100%;
}

.dark .pool-search-form__input {
  background-color: #334155;
  color: #fff;
  border-color: #475569;
}

.dark .pool-search-form__input::placeholder {
  color: #64748b;
}

.pool-search-form__button-wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 8px;
}

.pool-search-form__button {
  background-color: #21232c;
  border: 0;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.dark .pool-search-form__button {
  background-color: #384aff;
}

.dark .pool-search-form__button:hover {
  background-color: #4254ff;
}

.pool-search-form__button:hover {
  background-color: #353740;
}

.pool-search-form__button svg {
  display: block;
  width: 20px;
  height: 20px;
}
</style>
