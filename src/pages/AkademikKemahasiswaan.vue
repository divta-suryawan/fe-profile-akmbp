<script setup>
import { Users, Award, Heart, Calendar, BookOpen, Trophy, UserPlus, HandHeart } from 'lucide-vue-next'
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
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">Kemahasiswaan</h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">Layanan dan kegiatan kemahasiswaan Akademi Kebidanan Mega Buana Palu</p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>
      <div class="relative mx-auto max-w-5xl px-5 lg:px-8">
        <div data-aos="fade-up" class="mx-auto max-w-3xl text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100">
            <Users class="h-10 w-10 text-blue-600" />
          </div>
          <h2 class="mt-6 font-display text-2xl font-bold text-navy sm:text-3xl">Pembinaan Mahasiswa</h2>
          <PulseLine :width="80" class="mx-auto mt-4" />
          <p class="mt-4 text-sm leading-relaxed text-ink/70">
            Bidang Kemahasiswaan bertanggung jawab dalam pengembangan minat, bakat, dan kesejahteraan
            mahasiswa melalui berbagai program pembinaan, layanan, dan kegiatan ekstrakurikuler.
          </p>
        </div>

        <div class="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(item, i) in [
            { icon: UserPlus, label: 'Penerimaan Mahasiswa Baru', desc: 'Informasi pendaftaran, jadwal seleksi, dan persyaratan PMB', color: 'text-blue-600 bg-blue-100' },
            { icon: Award, label: 'Beasiswa', desc: 'Beasiswa BBPK, Bidikmisi, PPA, dan beasiswa dari institusi mitra', color: 'text-gold bg-gold/10' },
            { icon: Trophy, label: 'UKM & Prestasi', desc: 'Unit kegiatan mahasiswa: olahraga, seni, paduan suara, dan lainnya', color: 'text-purple-600 bg-purple-100' },
            { icon: Calendar, label: 'Kalender Akademik', desc: 'Jadwal perkuliahan, ujian, libur akademik dan kegiatan kampus', color: 'text-emerald-600 bg-emerald-100' },
            { icon: Heart, label: 'Bimbingan Konseling', desc: 'Layanan konseling pribadi, akademik, dan karir bagi mahasiswa', color: 'text-rose-600 bg-rose-100' },
            { icon: HandHeart, label: 'Alumni', desc: 'Pendataan alumni, tracer study dan pengembangan jejaring alumni', color: 'text-cyan-600 bg-cyan-100' },
          ]" :key="i" data-aos="fade-up" :data-aos-delay="i * 60" class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div :class="[item.color]" class="flex h-12 w-12 items-center justify-center rounded-xl">
              <component :is="item.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-4 font-display text-base font-bold text-navy">{{ item.label }}</h3>
            <p class="mt-2 text-sm text-ink/60">{{ item.desc }}</p>
          </div>
        </div>

        <!-- Layanan -->
        <div data-aos="fade-up" class="mt-20 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-navy/5 sm:p-12">
          <div class="flex flex-col items-center gap-8 lg:flex-row">
            <div class="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-yellow-600 text-white shadow-lg">
              <BookOpen class="h-12 w-12" />
            </div>
            <div>
              <h3 class="font-display text-xl font-bold text-navy">Layanan Kemahasiswaan</h3>
              <p class="mt-3 text-sm leading-relaxed text-ink/70">
                Bidang Kemahasiswaan memberikan layanan administrasi akademik, surat keterangan
                mahasiswa aktif, pendampingan organisasi, pengembangan karir, serta konsultasi
                masalah akademik dan non-akademik bagi seluruh mahasiswa.
              </p>
              <p class="mt-3 text-sm leading-relaxed text-ink/70">
                Jam layanan: Senin - Jumat, pukul 08.00 - 16.00 WITA di Gedung Akademik lantai 1.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
