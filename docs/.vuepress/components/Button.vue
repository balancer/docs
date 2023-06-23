<template>
  <button>
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  background-image: linear-gradient(
    to right top,
    rgb(37, 99, 235),
    rgb(232, 17, 236)
  );
  color: #fff;
  border: 0;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 0 16px;
  border-radius: 6px;
  cursor: pointer;
  height: 48px;
}

button:hover {
  background-image: linear-gradient(to right top, #1d4ed8, #de07e2);
}

button:disabled {
  background-image: none;
  background-color: #eaf0f6;
  color: #94a3b8;
  cursor: not-allowed;
}

.dark button:disabled {
  background-color: #334155;
  color: #64748b;
}
</style>
