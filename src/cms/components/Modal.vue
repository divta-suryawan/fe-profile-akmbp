<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  title: String,
  open: Boolean,
})
const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-40 flex items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <div class="fixed inset-0 bg-black/50" />
        <div class="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-navy">{{ title }}</h3>
            <button
              @click="emit('close')"
              class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X class="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div class="p-6">
            <slot />
          </div>
          <div
            v-if="$slots.footer"
            class="flex items-center justify-end gap-3 p-6 border-t border-gray-100"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active { transition: all 0.2s ease-out; }
.modal-leave-active { transition: all 0.15s ease-in; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-active > div:last-child { transition: transform 0.2s ease-out; }
.modal-leave-active > div:last-child { transition: transform 0.15s ease-in; }
.modal-enter-from > div:last-child { transform: scale(0.95); }
.modal-leave-to > div:last-child { transform: scale(0.95); }
</style>
