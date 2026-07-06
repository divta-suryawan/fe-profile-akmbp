<script setup>
import { Heart, Users, MapPin, Calendar } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'

const pengabdianList = [
  {
    tahun: '2024',
    judul: 'Edukasi Kesehatan Reproduksi Pada Remaja di SMA Negeri 1 Palu',
    lokasi: 'Kota Palu',
    sasaran: '100 Siswa',
  },
  {
    tahun: '2024',
    judul: 'Pemeriksaan Ibu Hamil dan Balita di Posyandu Desa Sigi Biromaru',
    lokasi: 'Kab. Sigi',
    sasaran: '75 Ibu & Balita',
  },
  {
    tahun: '2023',
    judul: 'Pelatihan Kader Dalam Deteksi Dini Stunting',
    lokasi: 'Kota Palu',
    sasaran: '50 Kader',
  },
  {
    tahun: '2023',
    judul: 'Penyuluhan MP-ASI dan Gizi Balita di Wilayah Pesisir',
    lokasi: 'Kab. Donggala',
    sasaran: '60 Ibu',
  },
  {
    tahun: '2023',
    judul: 'Bakti Sosial dan Pemeriksaan Kesehatan Gratis',
    lokasi: 'Kota Palu',
    sasaran: '200 Masyarakat',
  },
  {
    tahun: '2022',
    judul: 'Edukasi Pencegahan Kekerasan Seksual Pada Remaja',
    lokasi: 'Kota Palu',
    sasaran: '80 Siswa',
  },
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
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">Pengabdian Masyarakat</h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">Implementasi Tri Dharma Perguruan Tinggi melalui pengabdian kepada masyarakat</p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>
      <div class="relative mx-auto max-w-5xl px-5 lg:px-8">
        <div data-aos="fade-up" class="mx-auto max-w-3xl text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-100">
            <Heart class="h-10 w-10 text-rose-600" />
          </div>
          <h2 class="mt-6 font-display text-2xl font-bold text-navy sm:text-3xl">Berkontribusi Untuk Masyarakat</h2>
          <PulseLine :width="80" class="mx-auto mt-4" />
          <p class="mt-4 text-sm leading-relaxed text-ink/70">
            Kegiatan pengabdian kepada masyarakat merupakan wujud nyata kontribusi Akademi Kebidanan
            Mega Buana Palu dalam meningkatkan derajat kesehatan masyarakat melalui berbagai program
            edukasi, pelayanan, dan pemberdayaan.
          </p>
        </div>

        <div class="mt-16 space-y-4">
          <div
            v-for="(item, i) in pengabdianList"
            :key="i"
            :data-aos="'fade-up'"
            :data-aos-delay="(i % 4) * 60"
            class="group rounded-2xl bg-white p-6 shadow-lg ring-1 ring-navy/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-8"
          >
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <span class="rounded-lg bg-gold/10 px-3 py-1 text-xs font-bold text-gold">{{ item.tahun }}</span>
                </div>
                <h3 class="mt-3 font-display text-base font-bold text-navy sm:text-lg">{{ item.judul }}</h3>
                <div class="mt-3 flex flex-wrap gap-4 text-xs text-ink/50">
                  <span class="flex items-center gap-1">
                    <MapPin class="h-3.5 w-3.5" /> {{ item.lokasi }}
                  </span>
                  <span class="flex items-center gap-1">
                    <Users class="h-3.5 w-3.5" /> {{ item.sasaran }}
                  </span>
                </div>
              </div>
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition-colors group-hover:bg-rose-100">
                <Calendar class="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
