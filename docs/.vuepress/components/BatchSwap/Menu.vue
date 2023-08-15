<script setup>
defineProps({
  selectedIndex: {
    type: Number,
    required: true,
  },
  paths: {
    type: Array,
    required: true,
  },
  onPathSelect: {
    type: Function,
    required: true,
  },
  onAddPath: {
    type: Function,
    required: true,
  },
  onDeletePath: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <div class="menu">
    <div class="menu-items">
      <div
        v-for="(_, pathIndex) in paths"
        :key="pathIndex"
        class="menu-item__wrapper"
      >
        <button
          :class="`menu-item ${
            pathIndex === selectedIndex ? 'menu-item--active' : ''
          }`"
          @click="onPathSelect(pathIndex)"
        >
          <span>Path {{ pathIndex + 1 }}</span>
        </button>
        <div v-if="paths.length > 1" class="delete-path-button__wrapper">
          <button class="delete-path-button" @click="onDeletePath(pathIndex)">
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
      </div>
      <button class="menu-item add-path-button" @click="onAddPath">
        <span>Add Path</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped>
.menu {
  background-color: #f8fafc;
  border-right: 1px solid transparent;
  padding: 24px 8px;
  height: 100%;
  width: 100%;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.dark .menu {
  background-color: #1e293b;
  border-color: #3e4c5a;
}

.menu-items > * + * {
  margin-top: 4px;
}

.menu-item__wrapper {
  position: relative;
}

.menu-item {
  align-items: center;
  background-color: transparent;
  border: 0;
  border-radius: 4px;
  color: #334155;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  line-height: 20px;
  font-weight: 600;
  text-align: left;
  padding: 8px 10px;
  width: 100%;
}

.dark .menu-item {
  color: #e2e8f0;
}

.menu-item--active,
.menu-item__wrapper:hover .menu-item {
  background-color: #eaf0f6;
}

.dark .menu-item--active,
.dark .menu-item__wrapper:hover .menu-item {
  background-color: #334155;
}

.add-path-button {
  background-color: #eff6ff;
  color: #2563eb;
}

.dark .add-path-button {
  background-color: #384aff;
  color: #fff;
}

.dark .add-path-button:hover {
  background-color: #2436eb;
  color: #fff;
}

.add-path-button:hover {
  background-color: #dbeafe;
  color: #2563eb;
}

.add-path-button svg {
  height: 20px;
  width: 20;
}

.delete-path-button__wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0 10px;
  right: 0;
  top: 0;
  bottom: 0;
}

.menu-item__wrapper:hover .delete-path-button {
  display: flex;
}

.delete-path-button {
  background-color: transparent;
  border: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: #94a3b8;
  display: none;
}

.delete-path-button:hover {
  color: #f87171;
}

.delete-path-button svg {
  height: 16px;
  width: 16px;
}
</style>
