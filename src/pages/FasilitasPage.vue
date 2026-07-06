<script setup>
import { Stethoscope, Monitor, BookOpen, LayoutTemplate, Languages, Trophy } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import { fasilitasData } from '../data/fasilitas.js'

const iconMap = {
  Stethoscope, Monitor, BookOpen, LayoutTemplate, Languages, Trophy,
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
          Layanan
        </span>
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">
          Fasilitas
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Sarana dan prasarana pendukung kegiatan belajar mengajar yang modern dan representatif
        </p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, i) in fasilitasData"
            :key="item.id"
            :data-aos="'fade-up'"
            :data-aos-delay="(i % 3) * 100"
            class="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            <div class="relative aspect-[16/10] overflow-hidden">
              <img
                :src="item.image"
                :alt="item.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"></div>
            </div>

            <div class="p-6">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <component :is="iconMap[item.icon]" class="h-5 w-5" />
                </div>
                <h3 class="font-display text-lg font-bold text-navy">{{ item.title }}</h3>
              </div>
              <p class="mt-3 text-sm leading-relaxed text-ink/65">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
