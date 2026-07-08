<script setup>
import { useToast } from '../composables/useToast'
import { X, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-vue-next'

const { toasts, remove } = useToast()

const icons = { success: CheckCircle, error: AlertCircle, warning: AlertTriangle }
const styles = {
  success: 'bg-green-50 border-green-500 text-green-800',
  error: 'bg-red-50 border-red-500 text-red-800',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg', styles[toast.type]]"
      >
        <component :is="icons[toast.type]" class="w-5 h-5 mt-0.5 shrink-0" />
        <p class="text-sm font-medium flex-1">{{ toast.message }}</p>
        <button @click="remove(toast.id)" class="shrink-0 opacity-60 hover:opacity-100">
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active { transition: all 0.3s ease-out; }
.toast-leave-active { transition: all 0.2s ease-in; }
.toast-enter-from { opacity: 0; transform: translateX(100%); }
.toast-leave-to { opacity: 0; transform: translateX(100%); }
</style>
