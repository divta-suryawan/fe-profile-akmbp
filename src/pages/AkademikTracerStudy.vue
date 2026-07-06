<script setup>
import { Search, ClipboardCheck, BarChart3, Users } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'

const tracerData = [
  { year: '2023', total: 95, bekerja: 78, melanjutkan: 10, waktuTunggu: '< 3 bulan', bidangSesuai: '82%' },
  { year: '2024', total: 102, bekerja: 85, melanjutkan: 8, waktuTunggu: '< 4 bulan', bidangSesuai: '85%' },
]
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
          <span class="h-1.5 w-1.5 rounded-full bg-gold"></span> Akademik
        </span>
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">Tracer Study</h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">Pelacakan lulusan Akademi Kebidanan Mega Buana Palu</p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>
      <div class="relative mx-auto max-w-5xl px-5 lg:px-8">
        <div data-aos="fade-up" class="mx-auto max-w-3xl text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-medblue/10">
            <ClipboardCheck class="h-10 w-10 text-medblue" />
          </div>
          <h2 class="mt-6 font-display text-2xl font-bold text-navy sm:text-3xl">Apa Itu Tracer Study?</h2>
          <PulseLine :width="80" class="mx-auto mt-4" />
          <p class="mt-4 text-sm leading-relaxed text-ink/70">
            Tracer Study adalah studi pelacakan lulusan yang dilakukan secara berkala untuk memperoleh
            informasi tentang transisi lulusan dari dunia pendidikan ke dunia kerja, relevansi kompetensi,
            serta penilaian stakeholder terhadap kualitas lulusan.
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div v-for="(stat, i) in [
            { label: 'Lulusan Terlacak', value: '197', icon: Users, color: 'text-blue-600 bg-blue-100' },
            { label: 'Bekerja di Bidang Kesehatan', value: '83%', icon: BarChart3, color: 'text-gold bg-gold/10' },
            { label: 'Masa Tunggu Kerja Rata-rata', value: '< 4 Bulan', icon: Search, color: 'text-emerald-600 bg-emerald-100' },
          ]" :key="i" data-aos="fade-up" :data-aos-delay="i * 80" class="rounded-xl bg-white p-6 text-center shadow-lg ring-1 ring-navy/5">
            <div :class="[stat.color]" class="mx-auto flex h-14 w-14 items-center justify-center rounded-xl">
              <component :is="stat.icon" class="h-7 w-7" />
            </div>
            <p class="mt-4 font-display text-3xl font-extrabold text-navy">{{ stat.value }}</p>
            <p class="mt-1 text-sm text-ink/60">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Data Table -->
        <div data-aos="fade-up" class="mt-20 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-navy/5">
          <div class="border-b border-navy/10 bg-navy p-6">
            <h3 class="font-display text-lg font-bold text-white">Rekapitulasi Tracer Study</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-navy/5 bg-surface">
                  <th class="px-6 py-4 font-semibold text-navy">Tahun</th>
                  <th class="px-6 py-4 font-semibold text-navy">Total Lulusan</th>
                  <th class="px-6 py-4 font-semibold text-navy">Bekerja</th>
                  <th class="px-6 py-4 font-semibold text-navy">Melanjutkan Studi</th>
                  <th class="px-6 py-4 font-semibold text-navy">Waktu Tunggu</th>
                  <th class="px-6 py-4 font-semibold text-navy">Kesesuaian Bidang</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in tracerData" :key="i" class="border-b border-navy/5 transition hover:bg-surface/50">
                  <td class="px-6 py-4 font-bold text-navy">{{ row.year }}</td>
                  <td class="px-6 py-4 text-ink/70">{{ row.total }}</td>
                  <td class="px-6 py-4 text-ink/70">{{ row.bekerja }}</td>
                  <td class="px-6 py-4 text-ink/70">{{ row.melanjutkan }}</td>
                  <td class="px-6 py-4 text-ink/70">{{ row.waktuTunggu }}</td>
                  <td class="px-6 py-4"><span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{{ row.bidangSesuai }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
