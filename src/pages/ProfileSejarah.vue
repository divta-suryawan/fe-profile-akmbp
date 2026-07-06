<script setup>
import { Building2, GraduationCap, ArrowRight } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import Button from '../components/ui/Button.vue'

const milestones = [
  {
    year: '2006',
    title: 'Pendirian Akademi Kebidanan',
    desc: 'Didirikan dengan nama Akademi Kebidanan Madani Sinjai sebagai salah satu institusi pendidikan kebidanan di Sulawesi Selatan.',
  },
  {
    year: '2023',
    title: 'Alih Kelola & Perubahan Nama',
    desc: 'Terjadi alih kelola dari Yayasan Kesehatan Masyarakat ke Yayasan Pendidikan Mega Buana Palopo, berubah nama menjadi Akademi Kebidanan Mega Buana.',
  },
  {
    year: '2025',
    title: 'Ekspansi ke Palu',
    desc: 'Berdasarkan SK Menteri Pendidikan Tinggi, Sains, dan Teknologi, Akbid Mega Buana membuka kampus di Kota Palu, Sulawesi Tengah.',
  },
]
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
          Profil Akademi
        </span>
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">
          Sejarah
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Perjalanan panjang Akademi Kebidanan Mega Buana dalam dunia pendidikan kebidanan
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-40 top-1/3 h-64 w-64 rounded-full border border-medblue/10"></div>
        <div class="absolute -right-40 bottom-1/4 h-48 w-48 rounded-full border border-gold/10"></div>
      </div>

      <div class="relative mx-auto max-w-5xl px-5 lg:px-8">
        <!-- Intro -->
        <div data-aos="fade-up" class="mx-auto max-w-3xl text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-medblue to-blue-700 shadow-lg">
            <Building2 class="h-8 w-8 text-white" />
          </div>
          <h2 class="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Perjalanan Kami</h2>
          <PulseLine :width="90" class="mx-auto mt-4" />
          <p class="mt-6 text-base leading-relaxed text-ink/70">
            Akademi Kebidanan Mega Buana memiliki perjalanan panjang dalam dunia pendidikan kesehatan
            di Indonesia. Berawal dari sebuah akademi kebidanan di Sinjai, kini telah berkembang menjadi
            institusi pendidikan kebidanan yang memiliki kampus di Palu, Sulawesi Tengah.
          </p>
        </div>

        <!-- Timeline -->
        <div class="relative mt-16">
          <!-- Timeline line -->
          <div class="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-gold via-medblue to-gold sm:left-1/2 sm:-translate-x-px"></div>

          <div class="space-y-12">
            <div
              v-for="(milestone, i) in milestones"
              :key="milestone.year"
              :data-aos="i % 2 === 0 ? 'fade-right' : 'fade-left'"
              class="relative flex flex-col sm:flex-row"
              :class="i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
            >
              <!-- Dot -->
              <div class="absolute left-8 top-0 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-1/2">
                <div class="h-4 w-4 rounded-full border-4 border-gold bg-navy"></div>
              </div>

              <!-- Content -->
              <div class="ml-16 sm:ml-0 sm:w-1/2" :class="i % 2 === 0 ? 'sm:pr-16 sm:text-right' : 'sm:pl-16'">
                <div class="rounded-2xl bg-white p-6 shadow-lg shadow-navy/10 ring-1 ring-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <span class="font-display text-3xl font-extrabold text-gold">{{ milestone.year }}</span>
                  <h3 class="mt-2 font-display text-lg font-bold text-navy">{{ milestone.title }}</h3>
                  <p class="mt-2 text-sm leading-relaxed text-ink/65">{{ milestone.desc }}</p>
                </div>
              </div>

              <!-- Spacer for the other side -->
              <div class="hidden sm:block sm:w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Current status -->
        <div data-aos="fade-up" class="mx-auto mt-20 max-w-3xl rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 text-center shadow-xl sm:p-12">
          <GraduationCap class="mx-auto h-10 w-10 text-gold" />
          <h3 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Akademi Kebidanan Mega Buana Palu</h3>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60">
            Terus berkembang dan berkomitmen mencetak tenaga bidan profesional yang siap bersaing
            di era global dengan kurikulum berbasis kompetensi dan fasilitas pendidikan modern.
          </p>
          <div class="mt-8">
            <Button tag="router-link" to="/visi-misi" variant="primary">Visi dan Misi</Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
