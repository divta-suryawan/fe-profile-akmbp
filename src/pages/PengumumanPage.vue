<script setup>
import { ref } from 'vue'
import { Calendar, Search, ArrowRight } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import { pengumumanData } from '../data/pengumuman.js'

const searchQuery = ref('')
const expandedId = ref(null)

const filteredPengumuman = ref([...pengumumanData].reverse())

function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? null : id
}

const tagColors = {
  'PMB': 'bg-emerald-500',
  'Akademik': 'bg-blue-500',
  'Libur': 'bg-amber-500',
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
          Pengumuman
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Informasi dan pengumuman resmi dari Akademi Kebidanan Mega Buana Palu
        </p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>

      <div class="relative mx-auto max-w-4xl px-5 lg:px-8">
        <div class="flex justify-end">
          <div class="relative w-full sm:w-64">
            <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari pengumuman..."
              class="w-full rounded-full bg-white py-2.5 pl-11 pr-5 text-sm text-ink outline-none ring-1 ring-navy/10 transition-all focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div class="mt-12 space-y-6">
          <div
            v-for="(item, i) in filteredPengumuman"
            :key="item.id"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 80"
            class="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-300 hover:shadow-xl"
            @click="toggleExpand(item.id)"
          >
            <div class="p-6 sm:p-8">
              <div class="flex flex-wrap items-center gap-3 text-xs">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold uppercase tracking-wider text-white"
                  :class="tagColors[item.tag] || 'bg-navy'"
                >
                  {{ item.tag }}
                </span>
                <span class="flex items-center gap-1.5 text-ink/50">
                  <Calendar class="h-3.5 w-3.5" />
                  {{ item.date }}
                </span>
              </div>

              <h3 class="mt-3 font-display text-lg font-bold text-navy transition-colors group-hover:text-medblue">
                {{ item.title }}
              </h3>

              <p class="mt-2 text-sm leading-relaxed text-ink/65">
                {{ item.excerpt }}
              </p>

              <transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-[600px] opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="max-h-[600px] opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-if="expandedId === item.id" class="mt-4 border-t border-navy/10 pt-4">
                  <div class="prose prose-sm max-w-none text-sm leading-relaxed text-ink/70" v-html="item.content"></div>
                </div>
              </transition>

              <div class="mt-3 flex items-center gap-1.5 text-sm font-semibold text-medblue transition-colors group-hover:text-gold">
                <span>{{ expandedId === item.id ? 'Tutup' : 'Selengkapnya' }}</span>
                <ArrowRight class="h-4 w-4 transition-transform" :class="expandedId === item.id ? 'rotate-90' : ''" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
