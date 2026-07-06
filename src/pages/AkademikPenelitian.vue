<script setup>
import { Microscope, FileText, Users, BookOpen } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'

const penelitianList = [
  {
    tahun: '2024',
    judul: 'Efektivitas Pijat Oksitosin Terhadap Produksi ASI Pada Ibu Post Partum',
    ketua: 'Bd. Sriwahyuni, S.ST., M.Kes',
    sumber: 'Hibah Internal',
  },
  {
    tahun: '2024',
    judul: 'Hubungan Pengetahuan Ibu Hamil Tentang Gizi Dengan Kejadian Anemia',
    ketua: 'Bd. Andi Nurul, S.ST., M.Keb',
    sumber: 'Mandiri',
  },
  {
    tahun: '2023',
    judul: 'Pengaruh Senam Hamil Terhadap Kesiapan Persalinan Primigravida',
    ketua: 'Bd. Nurhidayah, S.ST., M.Kes',
    sumber: 'Hibah Internal',
  },
  {
    tahun: '2023',
    judul: 'Analisis Faktor Risiko Kejadian Stunting Pada Balita',
    ketua: 'Bd. Rahmawati, S.ST., M.Keb',
    sumber: 'DRTPM',
  },
  {
    tahun: '2023',
    judul: 'Pengembangan Media Edukasi Berbasis Android Untuk Ibu Hamil',
    ketua: 'Bd. Fitriani, S.ST., M.Kes',
    sumber: 'Hibah Internal',
  },
  {
    tahun: '2022',
    judul: 'Pola Asuh Ibu Dan Status Gizi Terhadap Perkembangan Motorik Anak',
    ketua: 'Bd. Andi Nurul, S.ST., M.Keb',
    sumber: 'Mandiri',
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
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">Penelitian</h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">Kegiatan penelitian dosen di bidang kebidanan dan kesehatan</p>
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
            <Microscope class="h-10 w-10 text-medblue" />
          </div>
          <h2 class="mt-6 font-display text-2xl font-bold text-navy sm:text-3xl">Riset &amp; Inovasi</h2>
          <PulseLine :width="80" class="mx-auto mt-4" />
          <p class="mt-4 text-sm leading-relaxed text-ink/70">
            Penelitian yang dilakukan oleh dosen Akademi Kebidanan Mega Buana Palu berfokus pada
            pengembangan ilmu kebidanan, kesehatan ibu dan anak, serta inovasi pelayanan kesehatan
            yang berbasis bukti.
          </p>
        </div>

        <div class="mt-16 space-y-4">
          <div
            v-for="(item, i) in penelitianList"
            :key="i"
            :data-aos="'fade-up'"
            :data-aos-delay="(i % 4) * 60"
            class="group rounded-2xl bg-white p-6 shadow-lg ring-1 ring-navy/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:p-8"
          >
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <span class="rounded-lg bg-gold/10 px-3 py-1 text-xs font-bold text-gold">{{ item.tahun }}</span>
                  <span class="rounded-full bg-medblue/10 px-3 py-1 text-xs font-medium text-medblue">{{ item.sumber }}</span>
                </div>
                <h3 class="mt-3 font-display text-base font-bold text-navy sm:text-lg">{{ item.judul }}</h3>
                <p class="mt-2 flex items-center gap-2 text-sm text-ink/50">
                  <Users class="h-3.5 w-3.5" />
                  {{ item.ketua }}
                </p>
              </div>
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/5 text-gold transition-colors group-hover:bg-gold/10">
                <FileText class="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
