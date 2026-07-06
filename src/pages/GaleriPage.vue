<script setup>
import { ref, computed } from 'vue'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import { galeriData } from '../data/galeri.js'

const activeCategory = ref('Semua')
const searchQuery = ref('')
const lightboxIndex = ref(null)

const categories = computed(() => {
  return ['Semua', ...new Set(galeriData.map((g) => g.category))]
})

const filteredGaleri = computed(() => {
  let result = galeriData

  if (activeCategory.value !== 'Semua') {
    result = result.filter((g) => g.category === activeCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((g) => g.title.toLowerCase().includes(q))
  }

  return result
})

function openLightbox(index) {
  lightboxIndex.value = index
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxIndex.value = null
  document.body.style.overflow = ''
}

function prevImage() {
  if (lightboxIndex.value !== null && lightboxIndex.value > 0) {
    lightboxIndex.value--
  }
}

function nextImage() {
  if (lightboxIndex.value !== null && lightboxIndex.value < filteredGaleri.value.length - 1) {
    lightboxIndex.value++
  }
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, rgba(212,175,55,0.5) 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent"></div>
      <div class="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-gold/20"></div>
      <div class="pointer-events-none absolute -left-20 bottom-10 h-48 w-48 rounded-full border border-white/5"></div>

      <div class="relative mx-auto max-w-7xl px-5 text-center lg:px-8">
        <span class="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          <span class="h-1.5 w-1.5 rounded-full bg-gold"></span>
          Informasi
        </span>
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">
          Galeri
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Dokumentasi kegiatan dan fasilitas Akademi Kebidanan Mega Buana Palu
        </p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeCategory = cat"
              class="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
              :class="activeCategory === cat ? 'bg-navy text-white shadow-lg' : 'bg-white text-ink/70 hover:bg-navy/5 ring-1 ring-navy/10'"
            >
              {{ cat }}
            </button>
          </div>

          <div class="relative w-full sm:w-64">
            <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari galeri..."
              class="w-full rounded-full bg-white py-2.5 pl-11 pr-5 text-sm text-ink outline-none ring-1 ring-navy/10 transition-all focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div v-if="filteredGaleri.length > 0" class="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          <div
            v-for="(item, i) in filteredGaleri"
            :key="item.id"
            :data-aos="'fade-up'"
            :data-aos-delay="(i % 6) * 60"
            class="group relative mb-6 cursor-pointer overflow-hidden break-inside-avoid rounded-2xl bg-white shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            @click="openLightbox(i)"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p class="font-display text-sm font-bold text-white">{{ item.title }}</p>
              <p class="text-xs text-white/60">{{ item.category }}</p>
            </div>
          </div>
        </div>

        <div v-else class="mt-20 text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/10">
            <Search class="h-8 w-8 text-gold" />
          </div>
          <h3 class="mt-6 font-display text-xl font-bold text-navy">Galeri Tidak Ditemukan</h3>
          <p class="mt-2 text-sm text-ink/60">Tidak ada galeri yang sesuai dengan filter Anda.</p>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxIndex !== null"
          class="fixed inset-0 z-[999] flex items-center justify-center bg-navy/95 backdrop-blur-sm"
          @click.self="closeLightbox"
        >
          <button
            class="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-gold hover:text-navy"
            @click="closeLightbox"
          >
            <X class="h-5 w-5" />
          </button>

          <button
            v-if="lightboxIndex > 0"
            class="absolute left-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-gold hover:text-navy"
            @click="prevImage"
          >
            <ChevronLeft class="h-6 w-6" />
          </button>

          <button
            v-if="lightboxIndex < filteredGaleri.length - 1"
            class="absolute right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-gold hover:text-navy"
            @click="nextImage"
          >
            <ChevronRight class="h-6 w-6" />
          </button>

          <div class="flex max-h-[85vh] max-w-5xl flex-col items-center px-4">
            <img
              :src="filteredGaleri[lightboxIndex].image"
              :alt="filteredGaleri[lightboxIndex].title"
              class="max-h-[75vh] rounded-2xl object-contain shadow-2xl"
            />
            <div class="mt-4 text-center">
              <p class="font-display text-lg font-bold text-white">{{ filteredGaleri[lightboxIndex].title }}</p>
              <p class="text-sm text-white/50">{{ filteredGaleri[lightboxIndex].category }}</p>
            </div>
            <p class="mt-3 text-xs text-white/30">{{ lightboxIndex + 1 }} / {{ filteredGaleri.length }}</p>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
