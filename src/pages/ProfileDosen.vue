<script setup>
import { GraduationCap, BookOpen, Award } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'

const dosen = [
  {
    name: 'Bd. Sriwahyuni, S.ST., M.Kes',
    role: 'Direktur',
    bidang: 'Kebidanan',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop',
  },
  {
    name: 'Ns. Andi Tenri, S.Kep., M.Kes',
    role: 'Ketua Program Studi',
    bidang: 'Keperawatan',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop',
  },
  {
    name: 'Bd. Nurul Hidayah, S.ST., M.Keb',
    role: 'Dosen Tetap',
    bidang: 'Kebidanan',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop',
  },
  {
    name: 'Bd. Rahmawati, S.ST., M.Kes',
    role: 'Dosen Tetap',
    bidang: 'Kebidanan',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop',
  },
  {
    name: 'dr. Ahmad Fauzan, Sp.OG',
    role: 'Dosen Praktisi',
    bidang: 'Obstetri Ginekologi',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop',
  },
  {
    name: 'Bd. Fitriani, S.ST., M.Keb',
    role: 'Dosen Tetap',
    bidang: 'Kebidanan',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop',
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
          Dosen
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Tenaga pengajar profesional dan berpengalaman di bidang kebidanan dan kesehatan
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-40 top-1/3 h-64 w-64 rounded-full border border-medblue/10"></div>
        <div class="absolute -right-40 bottom-1/4 h-48 w-48 rounded-full border border-gold/10"></div>
      </div>

      <div class="relative mx-auto max-w-7xl px-5 lg:px-8">
        <!-- Stats -->
        <div class="mx-auto max-w-4xl">
          <div class="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10 shadow-lg shadow-navy/10 ring-1 ring-black/5">
            <div class="bg-white px-4 py-6 text-center sm:px-6 sm:py-8">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <GraduationCap class="h-6 w-6" />
              </div>
              <p class="mt-3 font-display text-2xl font-extrabold text-navy">6+</p>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">Dosen Tetap</p>
            </div>
            <div class="bg-white px-4 py-6 text-center sm:px-6 sm:py-8">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-medblue/10 text-medblue">
                <BookOpen class="h-6 w-6" />
              </div>
              <p class="mt-3 font-display text-2xl font-extrabold text-navy">3+</p>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">Dosen Praktisi</p>
            </div>
            <div class="bg-white px-4 py-6 text-center sm:px-6 sm:py-8">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Award class="h-6 w-6" />
              </div>
              <p class="mt-3 font-display text-2xl font-extrabold text-navy">S2+</p>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">Pendidikan Magister</p>
            </div>
          </div>
        </div>

        <!-- Grid -->
        <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(d, i) in dosen"
            :key="d.name"
            :data-aos="'fade-up'"
            :data-aos-delay="(i % 3) * 100"
            class="group rounded-2xl bg-white p-6 shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl sm:p-8"
          >
            <div class="relative mx-auto h-28 w-28 overflow-hidden rounded-2xl ring-2 ring-gold/20 transition-all duration-500 group-hover:ring-gold/60">
              <img
                :src="d.image"
                :alt="d.name"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="mt-5 text-center">
              <h3 class="font-display text-base font-bold text-navy">{{ d.name }}</h3>
              <p class="mt-1 text-sm font-medium text-medblue">{{ d.role }}</p>
              <p class="mt-0.5 text-xs text-ink/50">Bidang: {{ d.bidang }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
