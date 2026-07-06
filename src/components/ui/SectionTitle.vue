<script setup>
import PulseLine from './PulseLine.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  align: { type: String, default: 'left' }, // 'left' | 'center'
})
</script>

<template>
  <div :class="align === 'center' ? 'text-center mx-auto' : 'text-left'" class="max-w-2xl">
    <span
      v-if="eyebrow"
      class="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-medblue"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-gold"></span>
      {{ eyebrow }}
    </span>
    <h2 class="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
      {{ title }}
    </h2>
    <PulseLine :align="align" :width="110" class="mt-4" />
  </div>
</template>
