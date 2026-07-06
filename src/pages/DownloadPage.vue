<script setup>
import { ref, computed } from 'vue'
import { Download, FileText, Search } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import { downloadData } from '../data/download.js'

const activeCategory = ref('Semua')
const searchQuery = ref('')

const categories = computed(() => {
  return ['Semua', ...new Set(downloadData.map((d) => d.category))]
})

const filteredDownloads = computed(() => {
  let result = downloadData

  if (activeCategory.value !== 'Semua') {
    result = result.filter((d) => d.category === activeCategory.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((d) => d.title.toLowerCase().includes(q))
  }

  return result
})
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
          Download
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Dokumen dan formulir yang dapat diunduh oleh mahasiswa dan calon mahasiswa
        </p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>

      <div class="relative mx-auto max-w-4xl px-5 lg:px-8">
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
              placeholder="Cari dokumen..."
              class="w-full rounded-full bg-white py-2.5 pl-11 pr-5 text-sm text-ink outline-none ring-1 ring-navy/10 transition-all focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div v-if="filteredDownloads.length > 0" class="mt-12 space-y-4">
          <div
            v-for="(item, i) in filteredDownloads"
            :key="item.id"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 60"
            class="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-6"
          >
            <div class="flex items-start gap-4">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <FileText class="h-6 w-6" />
              </div>
              <div>
                <h3 class="font-display text-base font-bold text-navy">{{ item.title }}</h3>
                <div class="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink/50">
                  <span class="rounded-full bg-navy/5 px-2.5 py-0.5 font-medium text-navy/60">{{ item.category }}</span>
                  <span>{{ item.type }}</span>
                  <span>{{ item.size }}</span>
                </div>
              </div>
            </div>
            <a
              href="#"
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medblue/10 text-medblue transition-all hover:bg-gold hover:text-navy"
              title="Unduh {{ item.title }}"
            >
              <Download class="h-5 w-5" />
            </a>
          </div>
        </div>

        <div v-else class="mt-20 text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/10">
            <FileText class="h-8 w-8 text-gold" />
          </div>
          <h3 class="mt-6 font-display text-xl font-bold text-navy">Dokumen Tidak Ditemukan</h3>
          <p class="mt-2 text-sm text-ink/60">Tidak ada dokumen yang sesuai dengan filter Anda.</p>
        </div>
      </div>
    </section>
  </div>
</template>
