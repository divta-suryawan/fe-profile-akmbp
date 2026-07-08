<script setup>
import Sidebar from './Sidebar.vue'
import Toast from './Toast.vue'
import { useRoute } from 'vue-router'
import { Bell } from 'lucide-vue-next'

const route = useRoute()

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/berita': 'Kelola Berita',
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <div class="flex-1 ml-64">
      <header class="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <h2 class="text-xl font-semibold text-navy font-display">
          {{ pageTitles[route.path] || 'Admin' }}
        </h2>
        <div class="flex items-center gap-4">
          <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell class="w-5 h-5 text-gray-600" />
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div class="flex items-center gap-2 pl-4 border-l border-gray-200">
            <div class="w-8 h-8 rounded-full bg-medblue text-white flex items-center justify-center text-sm font-semibold">
              A
            </div>
            <span class="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </header>

      <main class="p-6">
        <RouterView />
      </main>
    </div>

    <Toast />
  </div>
</template>
