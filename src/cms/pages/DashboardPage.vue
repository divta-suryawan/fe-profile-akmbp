<script setup>
import { computed } from 'vue'
import { FileText, Calendar, Download, Image, BookOpen, TrendingUp, Clock, ArrowUpRight } from 'lucide-vue-next'
import { dashboardStats } from '../data/dummyData'

const stats = computed(() => [
  { label: 'Total Berita', value: dashboardStats.totalBerita, icon: FileText, color: 'bg-blue-500', trend: '+12%' },
  { label: 'Total Agenda', value: dashboardStats.totalAgenda, icon: Calendar, color: 'bg-green-500', trend: '+8%' },
  { label: 'Total Fasilitas', value: dashboardStats.totalFasilitas, icon: Download, color: 'bg-purple-500', trend: '+5%' },
  { label: 'Total Galeri', value: dashboardStats.totalGaleri, icon: Image, color: 'bg-amber-500', trend: '+20%' },
  { label: 'Program Studi', value: dashboardStats.totalProgramStudi, icon: BookOpen, color: 'bg-indigo-500', trend: '+0%' },
])
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-navy font-display">Dashboard</h1>
      <p class="text-gray-500 text-sm mt-1">Selamat datang di panel administrasi AKBID Mega Buana Palu</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between mb-3">
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', stat.color]">
            <component :is="stat.icon" class="w-5 h-5 text-white" />
          </div>
          <span class="flex items-center gap-0.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            <ArrowUpRight class="w-3 h-3" />
            {{ stat.trend }}
          </span>
        </div>
        <p class="text-2xl font-bold text-navy">{{ stat.value }}</p>
        <p class="text-sm text-gray-500 mt-0.5">{{ stat.label }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-navy mb-4 flex items-center gap-2">
          <Clock class="w-4 h-4" />
          Aktivitas Terbaru
        </h3>
        <div class="space-y-4">
          <div
            v-for="(activity, i) in dashboardStats.recentActivities"
            :key="i"
            class="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div class="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
            <div class="flex-1">
              <p class="text-sm text-gray-700">
                <span class="font-medium">{{ activity.action }}</span>
                <span class="text-gray-400"> &mdash; </span>
                <span class="text-gray-500">{{ activity.item }}</span>
              </p>
              <p class="text-xs text-gray-400 mt-0.5">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-navy mb-4 flex items-center gap-2">
          <TrendingUp class="w-4 h-4" />
          Akses Cepat
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <router-link
            to="/admin/berita"
            class="p-4 rounded-lg border border-gray-200 hover:border-gold/50 hover:bg-gold/5 transition-all text-center"
          >
            <FileText class="w-6 h-6 text-medblue mx-auto mb-2" />
            <p class="text-sm font-medium text-gray-700">Kelola Berita</p>
          </router-link>
          <router-link
            to="/admin/agenda"
            class="p-4 rounded-lg border border-gray-200 hover:border-gold/50 hover:bg-gold/5 transition-all text-center"
          >
            <Calendar class="w-6 h-6 text-medblue mx-auto mb-2" />
            <p class="text-sm font-medium text-gray-700">Kelola Agenda</p>
          </router-link>
          <router-link
            to="/admin/download"
            class="p-4 rounded-lg border border-gray-200 hover:border-gold/50 hover:bg-gold/5 transition-all text-center"
          >
            <Download class="w-6 h-6 text-medblue mx-auto mb-2" />
            <p class="text-sm font-medium text-gray-700">Kelola Download</p>
          </router-link>
          <router-link
            to="/admin/galeri"
            class="p-4 rounded-lg border border-gray-200 hover:border-gold/50 hover:bg-gold/5 transition-all text-center"
          >
            <Image class="w-6 h-6 text-medblue mx-auto mb-2" />
            <p class="text-sm font-medium text-gray-700">Kelola Galeri</p>
          </router-link>
          <router-link
            to="/admin/program-studi"
            class="p-4 rounded-lg border border-gray-200 hover:border-gold/50 hover:bg-gold/5 transition-all text-center"
          >
            <BookOpen class="w-6 h-6 text-medblue mx-auto mb-2" />
            <p class="text-sm font-medium text-gray-700">Program Studi</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
