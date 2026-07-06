<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' | 'outline' | 'ghost'
  },
  tag: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <component
    :is="tag"
    class="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
    :class="{
      'bg-gold text-navy hover:bg-gold-light hover:-translate-y-0.5 shadow-card': variant === 'primary',
      'border border-white/40 text-white hover:border-gold hover:text-gold': variant === 'outline',
      'text-medblue hover:text-navy underline-offset-4 hover:underline': variant === 'ghost',
    }"
  >
    <slot />
  </component>
</template>
