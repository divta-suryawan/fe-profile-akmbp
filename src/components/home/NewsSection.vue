<script setup>
import { useRouter } from 'vue-router'
import { ArrowRight, Calendar } from 'lucide-vue-next'
import SectionTitle from '../ui/SectionTitle.vue'
import { newsData } from '../../data/news.js'

const router = useRouter()

function goToDetail(slug) {
  router.push(`/berita/${slug}`)
}

const featured = newsData[0]
const cards = newsData.slice(1)
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

      <!-- Featured - full width hero -->
      <div v-if="featured" class="mt-12">
        <article
          data-aos="fade-up"
          class="group relative cursor-pointer overflow-hidden rounded-2xl bg-navy shadow-2xl shadow-navy/20 ring-1 ring-navy/5"
          @click="goToDetail(featured.slug)"
        >
          <div class="aspect-[16/9] overflow-hidden sm:aspect-[21/9] lg:aspect-[3/1]">
            <img
              :src="featured.image"
              :alt="featured.title"
              class="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10"></div>
          </div>

          <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg">
              <span class="h-1.5 w-1.5 rounded-full bg-white/60"></span>
              {{ featured.tag }}
            </span>
            <h2 class="mt-4 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl lg:max-w-3xl">
              {{ featured.title }}
            </h2>
            <p class="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base lg:line-clamp-2">
              {{ featured.excerpt }}
            </p>
            <div class="mt-4 flex items-center gap-4">
              <span class="flex items-center gap-1.5 text-xs font-medium text-white/50">
                <Calendar class="h-3.5 w-3.5" />
                {{ featured.date }}
              </span>
              <span class="flex items-center gap-2 text-sm font-semibold text-medblue transition-colors group-hover:text-gold">
                Baca Selengkapnya
                <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Remaining cards -->
      <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(item, i) in cards"
          :key="item.slug"
          :data-aos="'fade-up'"
          :data-aos-delay="(i % 3) * 80"
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
