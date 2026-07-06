<script setup>
import { CheckCircle2, GraduationCap, Users, Building2 } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import PulseLine from '../ui/PulseLine.vue'

const features = [
  'Kurikulum berbasis kompetensi terkini',
  'Dosen berpengalaman & tersertifikasi',
  'Laboratorium dan lahan praktik klinik lengkap',
]

const highlights = [
  { icon: GraduationCap, value: '15+ Tahun', label: 'Pengalaman Pendidikan' },
  { icon: Users, value: '1.200+', label: 'Alumni Tersebar' },
  { icon: Building2, value: 'A', label: 'Akreditasi' },
]
</script>

<template>
  <section id="welcome" class="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
    <!-- Decorative elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -left-20 top-1/3 h-64 w-64 rounded-full border border-medblue/10"></div>
      <div class="absolute -right-20 bottom-1/4 h-48 w-48 rounded-full border border-gold/10"></div>
      <div class="absolute left-1/2 top-0 h-px w-32 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
    </div>

    <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <!-- Left: text -->
      <div data-aos="fade-up">
        <span class="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-medblue">
          <span class="h-1.5 w-1.5 rounded-full bg-gold"></span>
          Profil Akademi
        </span>
        <h2 class="font-display text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
          Selamat Datang di <span class="text-medblue">Akademi Kebidanan</span><br />
          Mega Buana Palu
        </h2>
        <PulseLine :width="110" class="mt-4" />
        <p class="mt-6 text-base leading-relaxed text-ink/70">
          Akademi Kebidanan Mega Buana Palu berkomitmen mencetak tenaga bidan yang kompeten,
          profesional, dan berintegritas. Dengan kurikulum berbasis kompetensi, dosen berpengalaman,
          serta fasilitas laboratorium dan lahan praktik klinik yang memadai, kami mempersiapkan
          mahasiswa menghadapi dunia kerja di bidang kesehatan dengan percaya diri.
        </p>

        <ul class="mt-7 space-y-3">
          <li v-for="feature in features" :key="feature" class="flex items-start gap-3 text-sm text-ink/80">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/10">
              <CheckCircle2 class="h-4 w-4 text-gold" :stroke-width="2.5" />
            </span>
            {{ feature }}
          </li>
        </ul>

        <div class="mt-9">
          <Button tag="router-link" to="/prodi" variant="primary">Lihat Program Studi</Button>
        </div>
      </div>

      <!-- Right: image -->
      <div data-aos="fade-up" data-aos-delay="150" class="relative">
        <div class="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/20 via-medblue/5 to-gold/10 blur-3xl"></div>

        <!-- Main image -->
        <div class="relative overflow-hidden rounded-3xl shadow-2xl shadow-navy/20 ring-1 ring-navy/5">
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&auto=format&fit=crop"
            alt="Mahasiswa kebidanan sedang praktik"
            class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <!-- Overlay gradient -->
          <div class="absolute inset-0 bg-gradient-to-tr from-navy/20 via-transparent to-transparent"></div>
        </div>

        <!-- Floating accreditation card -->
        <div class="absolute -bottom-6 -left-4 flex items-center gap-4 rounded-2xl bg-white/95 px-5 py-4 shadow-xl shadow-navy/15 backdrop-blur-md ring-1 ring-black/5 sm:-left-6 sm:px-6 sm:py-5">
          <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-yellow-600 shadow-lg">
            <span class="font-display text-2xl font-extrabold text-white">A</span>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-ink/50">Akreditasi</p>
            <p class="font-display text-base font-bold text-navy">BAN-PT</p>
          </div>
        </div>

        <!-- Floating stats row -->
        <div class="absolute -right-4 top-6 hidden gap-3 sm:flex">
          <div v-for="h in highlights" :key="h.label" class="rounded-xl bg-white/90 px-4 py-3 shadow-lg shadow-navy/10 backdrop-blur-md ring-1 ring-black/5">
            <component :is="h.icon" class="h-4 w-4 text-medblue" :stroke-width="2" />
            <p class="mt-1 font-display text-sm font-bold text-navy">{{ h.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
