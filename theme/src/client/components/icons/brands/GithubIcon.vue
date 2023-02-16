<template>
  <svg
    class="social-icon"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_4_48)">
      <path
        d="M12 25.333c-5.733 1.867-5.733-3.333-8-4M20 28v-4.667c0-1.333.133-1.866-.667-2.666 3.734-.4 7.334-1.867 7.334-8A6.134 6.134 0 0 0 24.933 8.4a5.6 5.6 0 0 0-.133-4.267s-1.467-.4-4.667 1.734a16.4 16.4 0 0 0-8.266 0C8.667 3.733 7.2 4.133 7.2 4.133A5.6 5.6 0 0 0 7.067 8.4a6.133 6.133 0 0 0-1.734 4.267c0 6.133 3.6 7.6 7.334 8-.8.8-.8 1.6-.667 2.666V28"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4_48">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {};
</script>

<style scoped>
.social-icon {
  stroke: #000;
}

.social-icon:hover {
  stroke: var(--c-brand);
}
.dark .social-icon {
  stroke: #fff;
}
.dark .social-icon:hover {
  stroke: yellow;
}
</style>