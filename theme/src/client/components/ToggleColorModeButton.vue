<script setup lang="ts">
import { useDarkMode, useThemeLocaleData } from '../composables/index.js';

const themeLocale = useThemeLocaleData();
const isDarkMode = useDarkMode();

const toggleColorMode = (): void => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<template>
  <button
    class="toggle-color-mode-button"
    :title="themeLocale.toggleColorMode"
    @click="toggleColorMode"
  >
    <svg
      v-show="!isDarkMode"
      class="icon"
      focusable="false"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0)">
        <path
          d="M12.9767 17C15.7381 17 17.9767 14.7614 17.9767 12C17.9767 9.23858 15.7381 7 12.9767 7C10.2153 7 7.97668 9.23858 7.97668 12C7.97668 14.7614 10.2153 17 12.9767 17Z"
          fill="url(#sun-gradient-0)"
        />
        <path
          d="M12.9767 1V3"
          stroke="url(#sun-gradient-1)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12.9767 21V23"
          stroke="url(#sun-gradient-2)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.19669 4.22L6.61669 5.64"
          stroke="url(#sun-gradient-3)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.3367 18.36L20.7567 19.78"
          stroke="url(#sun-gradient-4)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1.97668 12H3.97668"
          stroke="url(#sun-gradient-5)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21.9767 12H23.9767"
          stroke="url(#sun-gradient-6)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.19669 19.78L6.61669 18.36"
          stroke="url(#sun-gradient-7)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.3367 5.64L20.7567 4.22"
          stroke="url(#sun-gradient-8)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="sun-gradient-0"
          x1="12.9767"
          y1="7"
          x2="12.9767"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#EF7744" />
          <stop offset="1" stop-color="#FFB800" />
        </linearGradient>
        <linearGradient
          id="sun-gradient-1"
          x1="13.4767"
          y1="1"
          x2="13.4767"
          y2="3"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F09744" />
          <stop offset="1" stop-color="#FBBE25" />
        </linearGradient>
        <linearGradient
          id="sun-gradient-2"
          x1="13.4767"
          y1="21"
          x2="13.4767"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F09744" />
          <stop offset="1" stop-color="#FBBE25" />
        </linearGradient>
        <linearGradient
          id="sun-gradient-3"
          x1="5.90669"
          y1="4.22"
          x2="5.90669"
          y2="5.64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F09744" />
          <stop offset="1" stop-color="#FBBE25" />
        </linearGradient>
        <linearGradient
          id="sun-gradient-4"
          x1="20.0467"
          y1="18.36"
          x2="20.0467"
          y2="19.78"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F09744" />
          <stop offset="1" stop-color="#FBBE25" />
        </linearGradient>
        <linearGradient
          id="sun-gradient-5"
          x1="2.97668"
          y1="12"
          x2="2.97668"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F09744" />
          <stop offset="1" stop-color="#FBBE25" />
        </linearGradient>
        <linearGradient
          id="sun-gradient-6"
          x1="22.9767"
          y1="12"
          x2="22.9767"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F09744" />
          <stop offset="1" stop-color="#FBBE25" />
        </linearGradient>
        <linearGradient
          id="sun-gradient-7"
          x1="5.90669"
          y1="18.36"
          x2="5.90669"
          y2="19.78"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F09744" />
          <stop offset="1" stop-color="#FBBE25" />
        </linearGradient>
        <linearGradient
          id="sun-gradient-8"
          x1="20.0467"
          y1="4.22"
          x2="20.0467"
          y2="5.64"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F09744" />
          <stop offset="1" stop-color="#FBBE25" />
        </linearGradient>
        <clipPath id="clip0">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.976685)"
          />
        </clipPath>
      </defs>
    </svg>

    <svg
      v-show="isDarkMode"
      class="icon"
      focusable="false"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.9767 12.79C21.8194 14.4922 21.1805 16.1144 20.1349 17.4668C19.0893 18.8192 17.6802 19.8458 16.0724 20.4265C14.4646 21.0073 12.7247 21.1181 11.0562 20.7461C9.3877 20.3741 7.85967 19.5345 6.6509 18.3258C5.44213 17.117 4.60262 15.589 4.23058 13.9205C3.85855 12.252 3.96939 10.5121 4.55014 8.9043C5.13088 7.29651 6.15751 5.88737 7.50989 4.84175C8.86227 3.79614 10.4845 3.15731 12.1867 3C11.1901 4.34827 10.7105 6.00945 10.8352 7.68141C10.9599 9.35338 11.6805 10.9251 12.8661 12.1106C14.0516 13.2961 15.6233 14.0168 17.2953 14.1415C18.9672 14.2662 20.6284 13.7866 21.9767 12.79Z"
        fill="url(#moon-gradient)"
      />
      <defs>
        <linearGradient
          id="moon-gradient"
          x1="13.9768"
          y1="8.5"
          x2="6.47678"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFFDEB" />
          <stop offset="1" stop-color="#FFB800" />
        </linearGradient>
      </defs>
    </svg>
  </button>
</template>
