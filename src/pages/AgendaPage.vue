<script setup>
import { ref, computed } from 'vue'
import { Calendar, MapPin, Clock, Search } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import { agendaData } from '../data/agenda.js'

const activeTag = ref('Semua')
const searchQuery = ref('')

const tags = computed(() => {
  return ['Semua', ...new Set(agendaData.map((a) => a.tag))]
})

const filteredAgenda = computed(() => {
  let result = agendaData

  if (activeTag.value !== 'Semua') {
    result = result.filter((a) => a.tag === activeTag.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((a) => a.title.toLowerCase().includes(q))
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
          Agenda
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Jadwal kegiatan dan acara Akademi Kebidanan Mega Buana Palu
        </p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>

      <div class="relative mx-auto max-w-5xl px-5 lg:px-8">
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

          <div class="relative w-full sm:w-64">
            <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari agenda..."
              class="w-full rounded-full bg-white py-2.5 pl-11 pr-5 text-sm text-ink outline-none ring-1 ring-navy/10 transition-all focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div v-if="filteredAgenda.length > 0" class="mt-12 space-y-6">
          <div
            v-for="(item, i) in filteredAgenda"
            :key="item.id"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 80"
            class="group relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="flex flex-col gap-0 sm:flex-row">
              <!-- Date box -->
              <div class="flex shrink-0 items-center justify-center bg-gradient-to-br from-navy to-navy-light px-6 py-5 sm:w-32 sm:flex-col">
                <Calendar class="h-5 w-5 text-gold sm:mb-1" />
                <span class="ml-2 text-center text-xs font-semibold text-white/70 sm:ml-0">{{ item.date }}</span>
              </div>

              <!-- Info -->
              <div class="flex flex-1 flex-col justify-center p-5 sm:p-6">
                <span class="mb-2 inline-flex w-fit rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
                  :class="{
                    'bg-blue-500': item.tag === 'Akademik',
                    'bg-amber-500': item.tag === 'Workshop',
                    'bg-emerald-500': item.tag === 'Seminar',
                    'bg-purple-500': item.tag === 'Acara',
                  }"
                >
                  {{ item.tag }}
                </span>
                <h3 class="font-display text-base font-bold text-navy sm:text-lg">{{ item.title }}</h3>
                <p class="mt-1 text-sm text-ink/65">{{ item.desc }}</p>
                <div class="mt-3 flex flex-wrap gap-4 text-xs text-ink/50">
                  <span class="flex items-center gap-1.5">
                    <Clock class="h-3.5 w-3.5" />
                    {{ item.time }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <MapPin class="h-3.5 w-3.5" />
                    {{ item.location }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="mt-20 text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/10">
            <Calendar class="h-8 w-8 text-gold" />
          </div>
          <h3 class="mt-6 font-display text-xl font-bold text-navy">Agenda Tidak Ditemukan</h3>
          <p class="mt-2 text-sm text-ink/60">Tidak ada agenda yang sesuai dengan filter Anda.</p>
        </div>
      </div>
    </section>
  </div>
</template>
