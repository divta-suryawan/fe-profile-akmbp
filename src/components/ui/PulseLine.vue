<script setup>
defineProps({
  color: { type: String, default: '#D4AF37' },
  width: { type: Number, default: 120 },
  align: { type: String, default: 'left' }, // 'left' | 'center'
})
</script>

<template>
  <div
    class="pulse-line"
    :class="align === 'center' ? 'mx-auto' : ''"
    :style="{ width: width + 'px' }"
  >
    <svg viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-full overflow-visible">
      <path
        d="M0 12H28L34 3L42 21L48 12H120"
        :stroke="color"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="pulse-path"
      />
      <circle cx="120" cy="12" r="3" :fill="color" />
    </svg>
  </div>
</template>

<style scoped>
.pulse-path {
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  animation: draw-pulse 1.4s ease-out forwards;
  animation-delay: 0.2s;
}

@keyframes draw-pulse {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse-path {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
