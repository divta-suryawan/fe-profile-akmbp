<script setup>
import { useRouter } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import SectionTitle from '../ui/SectionTitle.vue'
import { newsData } from '../../data/news.js'

const router = useRouter()

function goToDetail(slug) {
  router.push(`/berita/${slug}`)
}
</script>

<template>
  <section id="news" class="relative overflow-hidden bg-gradient-to-b from-surface via-white to-surface py-20 lg:py-28">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
      <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 lg:px-8">
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionTitle eyebrow="Informasi Terkini" title="Berita & Kegiatan Terbaru" />
        <router-link
          to="/berita"
          class="hidden items-center gap-2 text-sm font-semibold text-medblue transition-colors hover:text-gold sm:inline-flex"
        >
          Lihat Semua Berita
          <ArrowRight class="h-4 w-4" />
        </router-link>
      </div>

      <!-- Featured + first 2 -->
      <div v-if="newsData.length > 0" class="mt-12">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="lg:col-span-2">
            <article
              data-aos="fade-up"
              class="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-navy/10 lg:flex lg:flex-row"
              @click="goToDetail(newsData[0].slug)"
            >
              <div class="aspect-[16/9] overflow-hidden lg:w-2/5 lg:shrink-0">
                <img
                  :src="newsData[0].image"
                  :alt="newsData[0].title"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"></div>
                <span class="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                  <span class="h-1.5 w-1.5 rounded-full bg-white/60"></span>
                  {{ newsData[0].tag }}
                </span>
                <div class="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {{ newsData[0].date }}
                </div>
              </div>
              <div class="flex flex-col p-6 lg:p-8 lg:justify-center">
                <h3 class="font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-medblue lg:text-2xl">
                  {{ newsData[0].title }}
                </h3>
                <p class="mt-3 text-sm leading-relaxed text-ink/65 lg:text-base">
                  {{ newsData[0].excerpt }}
                </p>
                <div class="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-medblue transition-colors group-hover:text-gold">
                  Baca Selengkapnya
                  <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          </div>
          <div class="grid grid-cols-1 gap-8">
            <article
              v-for="item in newsData.slice(1, 3)"
              :key="item.slug"
              data-aos="fade-up"
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
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {{ item.date }}
                </div>
              </div>
              <div class="flex flex-col p-6">
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
      </div>

      <!-- Remaining news -->
      <div class="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(item, i) in newsData.slice(3)"
          :key="item.slug"
          :data-aos="'fade-up'"
          :data-aos-delay="(i + 3) * 100"
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
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {{ item.date }}
            </div>
          </div>
          <div class="flex flex-col p-6">
            <h3 class="font-display text-base font-bold leading-snug text-navy transition-colors group-hover:text-medblue">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink/65 line-clamp-2">
              {{ item.excerpt }}
            </p>
            <div class="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-medblue transition-colors group-hover:text-gold">
              Baca Selengkapnya
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </article>
      </div>

      <div class="mt-12 text-center sm:hidden">
        <router-link
          to="/berita"
          class="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-gold-light"
        >
          Lihat Semua Berita
          <ArrowRight class="h-4 w-4" />
        </router-link>
      </div>
    </div>
  </section>
</template>
