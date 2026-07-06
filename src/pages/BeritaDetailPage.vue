<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, ArrowLeft, ArrowRight, Share2 } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import Button from '../components/ui/Button.vue'
import { newsData, getNewsBySlug } from '../data/news.js'

const route = useRoute()
const router = useRouter()

const news = computed(() => getNewsBySlug(route.params.slug))

const relatedNews = computed(() => {
  if (!news.value) return []
  return newsData
    .filter((n) => n.slug !== news.value.slug && n.tag === news.value.tag)
    .slice(0, 3)
})

const tagColors = {
  'PMB': 'bg-emerald-500',
  'Akademik': 'bg-blue-500',
  'Workshop': 'bg-amber-500',
  'Kerja Sama': 'bg-purple-500',
  'Seminar': 'bg-rose-500',
  'Wisuda': 'bg-cyan-500',
}

function goBack() {
  router.push('/berita')
}

function goToDetail(slug) {
  router.push(`/berita/${slug}`)
}
</script>

<template>
  <div v-if="news">
    <!-- Hero header -->
    <section class="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, rgba(212,175,55,0.5) 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-transparent"></div>
      <div class="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-gold/20"></div>
      <div class="pointer-events-none absolute -left-20 bottom-10 h-48 w-48 rounded-full border border-white/5"></div>

      <div class="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <button
          @click="goBack"
          class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-gold"
        >
          <ArrowLeft class="h-4 w-4" />
          Kembali ke Berita
        </button>

        <span
          class="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-lg"
          :class="tagColors[news.tag] || 'bg-navy'"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-white/60"></span>
          {{ news.tag }}
        </span>

        <h1 class="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {{ news.title }}
        </h1>

        <div class="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
          <Calendar class="h-4 w-4" />
          {{ news.date }}
        </div>

        <PulseLine :width="110" class="mx-auto mt-6" />
      </div>
    </section>

    <!-- Content -->
    <section class="relative bg-surface py-16 lg:py-24">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>

      <div class="relative mx-auto max-w-4xl px-5 lg:px-8">
        <!-- Featured image -->
        <div data-aos="fade-up" class="overflow-hidden rounded-3xl shadow-2xl shadow-navy/20 ring-1 ring-navy/5">
          <img
            :src="news.image"
            :alt="news.title"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Article content -->
        <article data-aos="fade-up" class="prose prose-lg prose-navy mx-auto mt-12 max-w-none">
          <div v-html="news.content" class="space-y-4 text-base leading-relaxed text-ink/75 sm:text-lg"></div>
        </article>

        <!-- Share & back -->
        <div class="mx-auto mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy/10 pt-8 sm:flex-row">
          <button
            @click="goBack"
            class="inline-flex items-center gap-2 text-sm font-medium text-medblue transition-colors hover:text-gold"
          >
            <ArrowLeft class="h-4 w-4" />
            Kembali ke Berita
          </button>
          <button class="inline-flex items-center gap-2 text-sm font-medium text-ink/50 transition-colors hover:text-medblue">
            <Share2 class="h-4 w-4" />
            Bagikan Berita
          </button>
        </div>
      </div>
    </section>

    <!-- Related news -->
    <section v-if="relatedNews.length > 0" class="bg-white py-20 lg:py-24">
      <div class="mx-auto max-w-7xl px-5 lg:px-8">
        <div class="text-center">
          <h2 class="font-display text-2xl font-extrabold text-navy sm:text-3xl">Berita Terkait</h2>
          <PulseLine :width="90" class="mx-auto mt-4" />
        </div>

        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(item, i) in relatedNews"
            :key="item.slug"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 100"
            class="group relative cursor-pointer overflow-hidden rounded-2xl bg-surface shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
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
                :class="tagColors[item.tag] || 'bg-navy'"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-white/60"></span>
                {{ item.tag }}
              </span>
            </div>
            <div class="p-6">
              <h3 class="font-display text-base font-bold leading-snug text-navy transition-colors group-hover:text-medblue">
                {{ item.title }}
              </h3>
              <div class="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-medblue transition-colors group-hover:text-gold">
                Baca Selengkapnya
                <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>

  <!-- Not found -->
  <div v-else class="flex min-h-[50vh] items-center justify-center">
    <div class="text-center">
      <h2 class="font-display text-2xl font-bold text-navy">Berita Tidak Ditemukan</h2>
      <p class="mt-2 text-sm text-ink/60">Halaman yang Anda cari tidak tersedia.</p>
      <div class="mt-6">
        <Button tag="router-link" to="/berita" variant="primary">Lihat Semua Berita</Button>
      </div>
    </div>
  </div>
</template>
