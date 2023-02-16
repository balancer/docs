<template>
  <svg
    class="social-icon"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      clip-path="url(#clip0_4_51)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path
        d="M10.666 16a1.333 1.333 0 1 0 2.667 0 1.333 1.333 0 0 0-2.667 0ZM18.666 16a1.333 1.333 0 1 0 2.667 0 1.333 1.333 0 0 0-2.666 0ZM10 10c4.667-1.333 7.333-1.333 12 0M9.334 22C14 23.333 18 23.333 22.666 22"
      />
      <path
        d="M20.666 22.667c0 1.333 2 4 2.667 4 2 0 3.777-2.223 4.667-4 .89-2.223.666-7.778-2-15.334-1.943-1.353-4-1.786-6-2l-1.334 3.334M11.334 22.667c0 1.333-1.809 4-2.443 4-1.906 0-3.598-2.223-4.444-4-.847-2.223-.635-7.778 1.904-15.334 1.85-1.353 3.71-1.786 5.65-2l1.333 3.334"
      />
    </g>
    <defs>
      <clipPath id="clip0_4_51">
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
