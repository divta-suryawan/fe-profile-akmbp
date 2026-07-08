<script setup>
import { AlertTriangle } from 'lucide-vue-next'

defineProps({
  open: Boolean,
  title: { type: String, default: 'Konfirmasi' },
  message: { type: String, default: 'Apakah Anda yakin?' },
  confirmText: { type: String, default: 'Ya, Hapus' },
  cancelText: { type: String, default: 'Batal' },
  loading: Boolean,
})
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <Transition name="confirm">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="emit('cancel')"
      >
        <div class="fixed inset-0 bg-black/50" />
        <div class="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-center">
          <div class="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle class="w-6 h-6 text-red-600" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>
          <p class="text-sm text-gray-500 mb-6">{{ message }}</p>
          <div class="flex items-center justify-center gap-3">
            <button
              @click="emit('cancel')"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              {{ cancelText }}
            </button>
            <button
              @click="emit('confirm')"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {{ loading ? 'Memproses...' : confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.confirm-enter-active { transition: all 0.2s ease-out; }
.confirm-leave-active { transition: all 0.15s ease-in; }
.confirm-enter-from,
.confirm-leave-to { opacity: 0; }
.confirm-enter-active > div:last-child { transition: transform 0.2s ease-out; }
.confirm-leave-active > div:last-child { transition: transform 0.15s ease-in; }
.confirm-enter-from > div:last-child { transform: scale(0.95); }
.confirm-leave-to > div:last-child { transform: scale(0.95); }
</style>
