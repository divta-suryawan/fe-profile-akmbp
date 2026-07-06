<script setup>
import { ref, computed } from 'vue'
import { Calendar, Search, ArrowRight } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import { newsData } from '../data/news.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTag = ref('Semua')
const searchQuery = ref('')

const tags = computed(() => {
  const all = ['Semua', ...new Set(newsData.map((n) => n.tag))]
  return all
})

const filteredNews = computed(() => {
  let result = newsData

  if (activeTag.value !== 'Semua') {
    result = result.filter((n) => n.tag === activeTag.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q)
    )
  }

  return result
})

function goToDetail(slug) {
  router.push(`/berita/${slug}`)
}
</script>

<template>
  <div>
    <!-- Hero header -->
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
          Berita & Kegiatan
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Informasi terbaru seputar kegiatan akademik, pengumuman, dan prestasi Akademi Kebidanan Mega Buana Palu
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-5 lg:px-8">
        <!-- Filter & Search -->
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in tags"
              :key="tag"
              @click="activeTag = tag"
              class="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
              :class="activeTag === tag ? 'bg-navy text-white shadow-lg' : 'bg-white text-ink/70 hover:bg-navy/5 ring-1 ring-navy/10'"
            >
              {{ tag }}
            </button>
          </div>

          <div class="relative w-full sm:w-72">
            <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berita..."
              class="w-full rounded-full bg-white py-2.5 pl-11 pr-5 text-sm text-ink outline-none ring-1 ring-navy/10 transition-all focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <!-- News grid -->
        <div v-if="filteredNews.length > 0" class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(item, i) in filteredNews"
            :key="item.slug"
            :data-aos="'fade-up'"
            :data-aos-delay="(i % 3) * 100"
            class="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10"
            @click="goToDetail(item.slug)"
          >
            <div class="relative aspect-[4/3] overflow-hidden">
              <img
                :src="item.image"
                :alt="item.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"></div>

              <span
                class="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm"
                :class="{
                  'bg-emerald-500': item.tag === 'PMB',
                  'bg-blue-500': item.tag === 'Akademik',
                  'bg-amber-500': item.tag === 'Workshop',
                  'bg-purple-500': item.tag === 'Kerja Sama',
                  'bg-rose-500': item.tag === 'Seminar',
                  'bg-cyan-500': item.tag === 'Wisuda',
                }"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-white/60"></span>
                {{ item.tag }}
              </span>

              <div class="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                <Calendar class="h-3 w-3" />
                {{ item.date }}
              </div>
            </div>

            <div class="flex flex-col p-6">
              <h3 class="font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-medblue">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm leading-relaxed text-ink/65">
                {{ item.excerpt }}
              </p>
              <div class="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-medblue transition-colors group-hover:text-gold">
                Baca Selengkapnya
                <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        </div>

        <!-- Empty state -->
        <div v-else class="mt-20 text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/10">
            <Search class="h-8 w-8 text-gold" />
          </div>
          <h3 class="mt-6 font-display text-xl font-bold text-navy">Berita Tidak Ditemukan</h3>
          <p class="mt-2 text-sm text-ink/60">Tidak ada berita yang sesuai dengan filter atau pencarian Anda.</p>
        </div>
      </div>
    </section>
  </div>
</template>
