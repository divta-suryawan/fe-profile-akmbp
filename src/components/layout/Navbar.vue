<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Phone, Mail, ChevronDown, Menu, X, Megaphone } from 'lucide-vue-next'
import { pengumumanData } from '../../data/pengumuman.js'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const openDropdown = ref(null)

const topLinks = [
  { icon: Phone, label: '0811-4800-0073', href: 'tel:081148000073' },
  { icon: Mail, label: 'akbidpalu@umegabuana.ac.id', href: 'mailto:akbidpalu@umegabuana.ac.id' },
]

const infoMarquee = pengumumanData.map((p) => p.title).join(' &bull; ')

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const navItems = [
  {
    label: 'Beranda',
    to: '/',
    children: [],
  },
  {
    label: 'Profil',
    to: '#',
    children: [
      { label: 'Sambutan Direktur', to: '/sambutan-direktur' },
      { label: 'Sejarah', to: '/sejarah' },
      { label: 'Visi dan Misi', to: '/visi-misi' },
      { label: 'Dosen', to: '/dosen' },
    ],
  },
  {
    label: 'Informasi',
    to: '#',
    children: [
      { label: 'Berita', to: '/berita' },
      { label: 'Agenda', to: '/agenda' },
      { label: 'Download', to: '/download' },
      { label: 'Pengumuman', to: '/pengumuman' },
      { label: 'Galeri', to: '/galeri' },
    ],
  },
  {
    label: 'Fasilitas',
    to: '/fasilitas',
    children: [],
  },
  {
    label: 'Akademik',
    to: '#',
    children: [
      { label: 'Program Studi', to: '/program-studi' },
      { label: 'Tracer Study', to: '/tracer-study' },
      { label: 'Penelitian', to: '/penelitian' },
      { label: 'Pengabdian', to: '/pengabdian' },
      { label: 'LPM', to: '/lpm' },
      { label: 'LPPM', to: '/lppm' },
      { label: 'Kemahasiswaan', to: '/kemahasiswaan' },
    ],
  },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 24
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function toggleDropdown(label) {
  openDropdown.value = openDropdown.value === label ? null : label
}

function closeMenu() {
  isMenuOpen.value = false
  openDropdown.value = null
}

function onNavEnter(label) {
  openDropdown.value = label
}

function onNavLeave() {
  openDropdown.value = null
}
</script>

<template>
  <!-- Top bar -->
  <div class="relative z-[60] overflow-hidden bg-navy-light">
    <div class="mx-auto flex h-10 max-w-7xl items-center px-5 lg:px-8">
      <div class="flex shrink-0 items-center gap-4 pr-6">
        <a
          v-for="link in topLinks"
          :key="link.label"
          :href="link.href"
          class="flex items-center gap-1.5 text-[11px] font-medium text-white/70 transition-colors hover:text-gold sm:text-xs"
        >
          <component :is="link.icon" class="h-3 w-3" />
          <span class="hidden sm:inline">{{ link.label }}</span>
        </a>
      </div>
      <div class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden border-l border-white/10 pl-6">
        <Megaphone class="hidden h-3.5 w-3.5 shrink-0 text-gold sm:block" />
        <div class="marquee-track overflow-hidden">
          <div class="marquee-content whitespace-nowrap text-[11px] font-medium text-white/60 sm:text-xs">
            {{ infoMarquee }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main navbar -->
  <header
    class="sticky inset-x-0 top-0 z-50 bg-navy transition-all duration-300"
    :class="isScrolled ? 'shadow-card' : ''"
  >
    <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-lg font-extrabold text-navy">
          MB
        </div>
        <div class="leading-tight">
          <p class="font-display text-sm font-bold text-white sm:text-base">Akbid Mega Buana</p>
          <p class="text-[10px] uppercase tracking-widest text-gold sm:text-xs">Palu</p>
        </div>
      </router-link>

      <!-- Desktop menu -->
      <ul class="hidden items-center gap-1 lg:flex">
        <li
          v-for="item in navItems"
          :key="item.label"
          class="relative"
          @mouseenter="onNavEnter(item.label)"
          @mouseleave="onNavLeave"
        >
          <router-link
            v-if="item.children.length === 0"
            :to="item.hash ? { path: item.to, hash: item.hash } : item.to"
            class="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-gold"
          >
            {{ item.label }}
          </router-link>
          <button
            v-else
            class="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-gold"
            @click="toggleDropdown(item.label)"
          >
            {{ item.label }}
            <ChevronDown
              class="h-3.5 w-3.5 transition-transform duration-200"
              :class="openDropdown === item.label ? 'rotate-180' : ''"
            />
          </button>
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="openDropdown === item.label && item.children.length > 0"
              class="absolute left-0 top-full mt-1 w-56 rounded-2xl bg-navy-light p-2 shadow-card ring-1 ring-white/10"
            >
              <router-link
                v-for="child in item.children"
                :key="child.label"
                :to="child.to"
                class="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold"
                @click="closeMenu"
              >
                {{ child.label }}
              </router-link>
            </div>
          </transition>
        </li>
      </ul>

      <router-link
        to="/pmb"
        class="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-gold-light hover:-translate-y-0.5 lg:inline-flex"
      >
        Daftar PMB
      </router-link>

      <!-- Hamburger -->
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
        aria-label="Buka menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Menu v-if="!isMenuOpen" class="h-6 w-6" />
        <X v-else class="h-6 w-6" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="mx-5 mt-0 max-h-[70vh] overflow-y-auto rounded-2xl bg-navy-light p-5 shadow-card ring-1 ring-white/10 lg:hidden">
        <ul class="flex flex-col gap-1">
          <li v-for="item in navItems" :key="item.label">
            <button
              v-if="item.children.length > 0"
              class="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10"
              @click="toggleDropdown(item.label)"
            >
              {{ item.label }}
              <ChevronDown
                class="h-4 w-4 transition-transform duration-200"
                :class="openDropdown === item.label ? 'rotate-180' : ''"
              />
            </button>
            <router-link
              v-else
              :to="item.hash ? { path: item.to, hash: item.hash } : item.to"
              class="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10"
              @click="closeMenu"
            >
              {{ item.label }}
            </router-link>
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-96 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="max-h-96 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-if="openDropdown === item.label && item.children.length > 0" class="ml-4 mt-1 overflow-hidden">
                <router-link
                  v-for="child in item.children"
                  :key="child.label"
                  :to="child.to"
                  class="block rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-gold"
                  @click="closeMenu"
                >
                  {{ child.label }}
                </router-link>
              </div>
            </transition>
          </li>
        </ul>
        <router-link
          to="/pmb"
          class="mt-5 block rounded-full bg-gold px-5 py-2.5 text-center text-sm font-semibold text-navy"
          @click="closeMenu"
        >
          Daftar PMB
        </router-link>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.marquee-track {
  mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
}

.marquee-content {
  display: inline-block;
  animation: marquee-scroll 30s linear infinite;
}

@keyframes marquee-scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
</style>
