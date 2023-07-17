<script setup>
import NetworkSelect from './NetworkSelect.vue';

defineProps({
  selectedPage: {
    type: String,
    required: true,
  },
  onPageSelect: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <nav>
    <div class="nav__links">
      <button
        :class="`nav__link ${
          selectedPage === 'pools' ? 'nav__link--active' : null
        }`"
        @click="onPageSelect('pools')"
      >
        Pools
      </button>
      <button
        :class="`nav__link ${
          selectedPage === 'batch_swap' ? 'nav__link--active' : null
        }`"
        @click="onPageSelect('batch_swap')"
      >
        Batch Swap
      </button>
      <button
        :class="`nav__link ${
          selectedPage === 'sor' ? 'nav__link--active' : null
        }`"
        @click="onPageSelect('sor')"
      >
        Smart Order Router (SOR)
      </button>
    </div>
    <NetworkSelect />
  </nav>
</template>
<style scoped>
nav {
  align-items: center;
  background-color: #0f172a;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
}

.nav__links {
  align-items: center;
  display: flex;
  gap: 12px;
}

.nav__link {
  background-color: transparent;
  border: 0;
  color: #fff;
  /* cursor: pointer; */
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: 600;
  height: 80px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}

.nav__link::before {
  border-top: 4px solid #9333ea;
  border-color: #fed533;
  content: '';
  display: block;
  left: 0px;
  overflow: hidden;
  position: absolute;
  top: 0px;
  transform: translate3d(0, -101%, 0);
  transition-duration: 0.15s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}

.nav__link:hover {
  color: #fed533;
}

.nav__link:hover::before {
  transform: translateZ(0);
}

.nav__link--active {
  color: #fed533;
}

.nav__link--active::before {
  transform: translateZ(0);
}
</style>
