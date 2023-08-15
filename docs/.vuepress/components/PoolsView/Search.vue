<script setup>
import { ref } from 'vue';

defineProps({
  onSearch: {
    type: Function,
    required: true,
  },
});

const searchValue = ref('');
</script>
<template>
  <div class="search">
    <Input v-model="searchValue" placeholder="Search Pool Address or ID" />
    <div class="search-button" @click="onSearch(searchValue)">
      <button>
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
.search {
  position: relative;
}

.search input {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 84px;
}

.search-button {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0 16px;
}

.search-button button {
  background: #162031;
  border: 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 6px;
}

.dark .search-button button {
  background-color: #384aff;
}

.dark .search-button button:hover {
  background-color: #2436eb;
}

.search-button svg {
  height: 20px;
  width: 20px;
}
</style>
