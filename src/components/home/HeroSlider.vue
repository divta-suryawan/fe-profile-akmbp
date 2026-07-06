<script setup>
import { onMounted, onUnmounted } from 'vue'
import Swiper from 'swiper'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Button from '../ui/Button.vue'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1600&auto=format&fit=crop',
    title: 'Mencetak Bidan Profesional, Terampil, dan Berintegritas',
    subtitle: 'Pendidikan kebidanan berkualitas dengan fasilitas praktik klinik modern di Palu. Bergabunglah bersama kami untuk masa depan yang cerah.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&auto=format&fit=crop',
    title: 'Fasilitas Laboratorium & Praktik Klinik Terstandar',
    subtitle: 'Belajar langsung dengan peralatan medis modern bersama dosen berpengalaman di bidangnya.',
  },
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&auto=format&fit=crop',
    title: 'Penerimaan Mahasiswa Baru 2026/2027',
    subtitle: 'Wujudkan cita-cita menjadi tenaga kesehatan profesional. Daftarkan diri Anda sekarang juga!',
  },
]

let swiperInstance = null

onMounted(() => {
  swiperInstance = new Swiper('.hero-swiper', {
    modules: [Autoplay, EffectFade, Navigation, Pagination],
    effect: 'fade',
    fadeEffect: { crossFade: true },
    loop: true,
    speed: 900,
    autoplay: { delay: 5500, disableOnInteraction: false },
    pagination: {
      el: '.hero-pagination',
      clickable: true,
      renderBullet: (_, className) => `<span class="${className}"><span class="bullet-inner"></span></span>`,
    },
    navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
  })
})

onUnmounted(() => {
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null
  }
})
</script>

<template>
  <section id="home" class="relative h-[72vh] w-full sm:h-[82vh] lg:h-[88vh]">
    <!-- Animated grid overlay -->
    <div class="pointer-events-none absolute inset-0 z-[5] opacity-[0.04]">
      <div class="h-full w-full" style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 60px 60px;"></div>
    </div>

    <!-- Decorative shapes -->
    <div class="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      <div class="absolute -left-20 top-1/4 h-72 w-72 rounded-full border border-gold/10"></div>
      <div class="absolute -right-32 top-1/3 h-96 w-96 rounded-full border border-white/5"></div>
      <div class="absolute bottom-1/4 left-1/3 h-32 w-32 rounded-full bg-gold/5 blur-3xl"></div>
    </div>

    <div class="hero-swiper h-full w-full overflow-hidden">
      <div class="swiper-wrapper">
        <div v-for="(slide, i) in slides" :key="i" class="swiper-slide relative">
          <img
            :src="slide.image"
            :alt="slide.title"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-medblue/30"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(212,175,55,0.18),transparent_45%)]"></div>

          <div class="absolute inset-0 flex items-center">
            <div class="mx-auto w-full max-w-7xl px-5 lg:px-8">
              <div class="max-w-2xl">
                <span class="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold backdrop-blur-sm">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
                    <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold"></span>
                  </span>
                  Akademi Kebidanan Mega Buana Palu
                </span>
                <h1 class="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                  {{ slide.title }}
                </h1>
                <p class="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                  {{ slide.subtitle }}
                </p>
                <div class="mt-9 flex flex-wrap gap-4">
                  <Button tag="router-link" to="/pmb" variant="primary">Daftar Sekarang</Button>
                  <Button tag="a" href="#welcome" variant="outline">Selengkapnya</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-pagination absolute bottom-28 left-1/2 z-10 -translate-x-1/2 sm:bottom-10"></div>
      <button class="hero-prev absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-navy hover:scale-110 sm:flex" aria-label="Slide sebelumnya">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button class="hero-next absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-navy hover:scale-110 sm:flex" aria-label="Slide berikutnya">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce sm:block">
      <div class="flex flex-col items-center gap-1.5">
        <span class="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Scroll</span>
        <svg class="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </div>

    <svg
      class="pointer-events-none absolute -bottom-px left-0 z-10 h-12 w-full text-surface sm:h-20"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <path d="M0,48 C240,88 480,8 720,32 C960,56 1200,88 1440,40 L1440,80 L0,80 Z" />
    </svg>
  </section>
</template>

<style scoped>
:deep(.hero-pagination) {
  display: flex;
  align-items: center;
  gap: 8px;
}
:deep(.hero-pagination .swiper-pagination-bullet) {
  background: transparent;
  opacity: 1;
  width: 28px;
  height: 6px;
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
  background: rgba(255,255,255,0.25);
  transition: all 0.3s ease;
}
:deep(.hero-pagination .swiper-pagination-bullet .bullet-inner) {
  display: block;
  height: 100%;
  width: 0%;
  border-radius: 9999px;
  background: #d4af37;
  transition: width 0.3s ease;
}
:deep(.hero-pagination .swiper-pagination-bullet-active) {
  background: rgba(255,255,255,0.25);
  width: 56px;
}
:deep(.hero-pagination .swiper-pagination-bullet-active .bullet-inner) {
  width: 100%;
  animation: fill-bullet 5.5s linear forwards;
}
@keyframes fill-bullet {
  from { width: 0%; }
  to { width: 100%; }
}
</style>
