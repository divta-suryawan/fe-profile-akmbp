<script setup>
import { Target, Eye, CheckCircle2, ArrowRight } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import Button from '../components/ui/Button.vue'

const visiPoints = [
  'Unggul dalam pelayanan kebidanan komunitas',
  'Berbasis penanggulangan bencana',
  'Menjadi program studi terdepan pada tahun 2030',
]

const misiPoints = [
  {
    title: 'Pendidikan Berkualitas',
    desc: 'Menyelenggarakan Tri Dharma Perguruan Tinggi untuk menghasilkan sumber daya manusia yang unggul dan profesional.',
  },
  {
    title: 'Penelitian & Inovasi',
    desc: 'Melakukan inovasi melalui penelitian, pengkajian, pengembangan dan penyebarluasan ilmu pengetahuan dan teknologi kebidanan.',
  },
  {
    title: 'Pengabdian Masyarakat',
    desc: 'Menerapkan ilmu pengetahuan dan teknologi kebidanan dalam rangka meningkatkan derajat kesehatan masyarakat.',
  },
  {
    title: 'Kerja Sama Institusi',
    desc: 'Menjalin kerja sama dengan berbagai institusi kesehatan baik dalam maupun luar negeri untuk pengembangan mutu pendidikan.',
  },
]

const tujuan = [
  'Menghasilkan lulusan bidan yang kompeten, profesional, dan berakhlak mulia',
  'Menghasilkan penelitian yang bermanfaat bagi pengembangan ilmu kebidanan',
  'Mewujudkan pengabdian masyarakat yang berdampak pada peningkatan derajat kesehatan',
  'Membangun jaringan kerja sama yang luas dan saling menguntungkan',
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
          Visi dan Misi
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Landasan dan arah pengembangan Akademi Kebidanan Mega Buana Palu
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-40 top-1/3 h-64 w-64 rounded-full border border-medblue/10"></div>
        <div class="absolute -right-40 bottom-1/4 h-48 w-48 rounded-full border border-gold/10"></div>
      </div>

      <div class="relative mx-auto max-w-6xl px-5 lg:px-8">
        <!-- Visi -->
        <div data-aos="fade-up" class="mx-auto max-w-4xl">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-yellow-600 shadow-lg">
              <Eye class="h-8 w-8 text-white" />
            </div>
            <h2 class="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Visi</h2>
            <PulseLine :width="90" class="mx-auto mt-4" />
          </div>

          <div class="mt-10 rounded-3xl bg-white p-8 shadow-xl shadow-navy/10 ring-1 ring-navy/5 sm:p-12">
            <p class="text-center text-lg font-semibold leading-relaxed text-navy sm:text-xl">
              "Menjadi program studi yang unggul dalam pelayanan kebidanan komunitas
              berbasis penanggulangan bencana pada tahun 2030."
            </p>
            <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div v-for="point in visiPoints" :key="point" class="flex items-start gap-3 rounded-xl bg-medblue/5 px-4 py-3">
                <Target class="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span class="text-sm font-medium text-ink/80">{{ point }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Misi -->
        <div data-aos="fade-up" class="mx-auto mt-20 max-w-4xl">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-medblue to-blue-700 shadow-lg">
              <Target class="h-8 w-8 text-white" />
            </div>
            <h2 class="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Misi</h2>
            <PulseLine :width="90" class="mx-auto mt-4" />
          </div>

          <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div
              v-for="(item, i) in misiPoints"
              :key="item.title"
              class="group rounded-2xl bg-white p-6 shadow-lg shadow-navy/10 ring-1 ring-navy/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <span class="font-display text-lg font-bold">{{ i + 1 }}</span>
              </div>
              <h3 class="mt-4 font-display text-lg font-bold text-navy">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-ink/65">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Tujuan -->
        <div data-aos="fade-up" class="mx-auto mt-20 max-w-4xl">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 shadow-lg">
              <CheckCircle2 class="h-8 w-8 text-white" />
            </div>
            <h2 class="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Tujuan</h2>
            <PulseLine :width="90" class="mx-auto mt-4" />
          </div>

          <div class="mt-10 rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 shadow-xl sm:p-12">
            <ul class="space-y-4">
              <li v-for="item in tujuan" :key="item" class="flex items-start gap-4">
                <span class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20">
                  <CheckCircle2 class="h-4 w-4 text-gold" />
                </span>
                <span class="text-sm leading-relaxed text-white/80 sm:text-base">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- CTA -->
        <div data-aos="fade-up" class="mx-auto mt-16 text-center">
          <p class="text-sm text-ink/60">Pelajari lebih lanjut tentang program studi kami</p>
          <div class="mt-4">
            <Button tag="router-link" to="/prodi" variant="primary">Program Studi</Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
