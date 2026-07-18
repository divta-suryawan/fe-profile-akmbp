<script setup>
import { useRoute } from 'vue-router'
import { LayoutDashboard, FileText, Calendar, Download, Image, BookOpen, User, Users, LogOut } from 'lucide-vue-next'

const route = useRoute()

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Berita', icon: FileText, path: '/admin/berita' },
  { label: 'Program Studi', icon: BookOpen, path: '/admin/program-studi' },
  { label: 'Pegawai', icon: Users, path: '/admin/pegawai' },
  { label: 'Profil', icon: User, path: '/admin/profil' },
  { label: 'Agenda', icon: Calendar, path: '/admin/agenda' },
  { label: 'Download', icon: Download, path: '/admin/download' },
  { label: 'Galeri', icon: Image, path: '/admin/galeri' },
]
</script>

<template>
  <aside class="fixed left-0 top-0 h-full w-64 bg-navy text-white flex flex-col z-30">
    <div class="p-5 border-b border-white/10">
      <h1 class="text-lg font-bold font-display">AKBID CMS</h1>
      <p class="text-xs text-white/50 mt-0.5">Mega Buana Palu</p>
    </div>

    <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
          route.path === item.path
            ? 'bg-gold/20 text-gold'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5 shrink-0" />
        {{ item.label }}
      </router-link>
    </nav>

    <div class="p-3 border-t border-white/10">
      <button class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 w-full transition-colors">
        <LogOut class="w-5 h-5 shrink-0" />
        Keluar
      </button>
    </div>
  </aside>
</template>
