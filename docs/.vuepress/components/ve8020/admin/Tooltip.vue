<script setup>
import { ref } from 'vue';

defineProps({
  text: String,
  width: { type: Number, default: 0 },
  position: { type: String, default: 'bottom' },
  arrow: { type: Boolean, default: true },
  fontSize: { type: Number, default: 16 },
});

const show = ref(false);

const showTooltip = () => {
  show.value = true;
};

const hideTooltip = () => {
  show.value = false;
};
</script>
<template>
  <div
    class="tooltip-container"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot></slot>
    <div v-if="show" class="tooltip" :class="[position]">
      <div class="content" :style="{ width: width + 'px' }">
        <div
          class="text"
          :style="{
            fontSize: fontSize + 'px',
            lineHeight: fontSize * 1.8 + 'px',
          }"
          v-html="text"
        ></div>
        <div v-if="arrow" class="tooltip-arrow" :class="[position]"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.tooltip-container {
  position: relative;
  display: flex;
  align-items: center;
}

.tooltip {
  position: absolute;
  z-index: 60;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0%;
}

.tooltip.bottom {
  bottom: 40px;
}

.tooltip.right-bottom {
  left: calc(100% + 10px);
  transform: translateX(-100%);
  bottom: 35px;
}

.tooltip.left-bottom {
  left: calc(0% - 10px);
  transform: translateX(0%);
  bottom: 35px;
}

.tooltip.left-top {
  bottom: -100%;
  transform: translateY(100%);
  left: -10px;
}

.tooltip.right-top {
  transform: translateY(-100%);
  transform: translateX(-100%);
  left: calc(100% + 10px);
  top: calc(100% + 16px);
}

.content {
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #eaf0f6;
}

.dark .content {
  background-color: #1e293b;
}

.text {
  width: 100%;
  min-width: 30px;
}

.tooltip-arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -10px;
  width: 0;
  height: 0;
  border-top: 12px solid #eaf0f6;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}

.dark .tooltip-arrow {
  border-top: 12px solid #1e293b;
}

.tooltip-arrow.right-bottom {
  left: calc(100% - 10px);
  transform: translateX(-100%);
}
.tooltip-arrow.left-bottom {
  left: calc(0% + 10px);
  transform: translateX(0%);
}
.tooltip-arrow.left-top {
  bottom: calc(100% + 10px);
  transform: translateY(100%);
  left: 10px;
  border-top: transparent;
  border-bottom: 12px solid #eaf0f6;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
.dark .tooltip-arrow.left-top {
  border-bottom: 12px solid #1e293b;
}

.tooltip-arrow.right-top {
  bottom: calc(100%);
  transform: translateY(100%);
  transform: translateX(-100%);
  left: calc(100% - 10px);
  border-top: transparent;
  border-bottom: 12px solid #eaf0f6;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
.dark .tooltip-arrow.right-top {
  border-bottom: 12px solid #1e293b;
}
</style>