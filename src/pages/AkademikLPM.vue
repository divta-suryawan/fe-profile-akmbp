<script setup>
import { Shield, CheckCircle, FileCheck, BookOpen, Target, Award } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
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
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">LPM</h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">Lembaga Penjaminan Mutu Akademi Kebidanan Mega Buana Palu</p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>
      <div class="relative mx-auto max-w-5xl px-5 lg:px-8">
        <div data-aos="fade-up" class="mx-auto max-w-3xl text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-100">
            <Shield class="h-10 w-10 text-emerald-600" />
          </div>
          <h2 class="mt-6 font-display text-2xl font-bold text-navy sm:text-3xl">Tentang LPM</h2>
          <PulseLine :width="80" class="mx-auto mt-4" />
          <p class="mt-4 text-sm leading-relaxed text-ink/70">
            Lembaga Penjaminan Mutu (LPM) bertugas merencanakan, melaksanakan, mengendalikan,
            dan mengembangkan sistem penjaminan mutu internal untuk memastikan mutu pendidikan
            yang berkelanjutan di lingkungan Akademi Kebidanan Mega Buana Palu.
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div data-aos="fade-right" class="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-navy/5">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <Target class="h-7 w-7" />
            </div>
            <h3 class="mt-6 font-display text-xl font-bold text-navy">Visi</h3>
            <p class="mt-4 text-sm leading-relaxed text-ink/70">
              Menjadi lembaga penjaminan mutu yang handal dalam mewujudkan budaya mutu di
              Akademi Kebidanan Mega Buana Palu menuju institusi pendidikan yang unggul dan berdaya saing.
            </p>
          </div>
          <div data-aos="fade-left" class="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-navy/5">
            <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-medblue/10 text-medblue">
              <BookOpen class="h-7 w-7" />
            </div>
            <h3 class="mt-6 font-display text-xl font-bold text-navy">Misi</h3>
            <ul class="mt-4 space-y-3 text-sm leading-relaxed text-ink/70">
              <li class="flex items-start gap-3"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-medblue"></span>Mengembangkan dan menerapkan SPMI secara konsisten.</li>
              <li class="flex items-start gap-3"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-medblue"></span>Melakukan audit mutu internal secara periodik.</li>
              <li class="flex items-start gap-3"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-medblue"></span>Meningkatkan kesadaran dan budaya mutu sivitas akademika.</li>
              <li class="flex items-start gap-3"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-medblue"></span>Melakukan benchmarking mutu dengan institusi lain.</li>
            </ul>
          </div>
        </div>

        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div v-for="(item, i) in [
            { label: 'Audit Internal', desc: 'Audit mutu internal setiap semester untuk semua unit kerja', icon: FileCheck, color: 'text-blue-600 bg-blue-100' },
            { label: 'Standar Mutu', desc: 'Penerapan 9 standar SPMI dan 24 standar SN-Dikti', icon: CheckCircle, color: 'text-gold bg-gold/10' },
            { label: 'Akreditasi', desc: 'Koordinasi persiapan akreditasi program studi dan institusi', icon: Award, color: 'text-purple-600 bg-purple-100' },
          ]" :key="i" data-aos="fade-up" :data-aos-delay="i * 80" class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-navy/5">
            <div :class="[item.color]" class="flex h-12 w-12 items-center justify-center rounded-xl">
              <component :is="item.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-4 font-display text-base font-bold text-navy">{{ item.label }}</h3>
            <p class="mt-2 text-sm text-ink/60">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
