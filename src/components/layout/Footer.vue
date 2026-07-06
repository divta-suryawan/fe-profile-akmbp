<script setup>
import { ref } from 'vue'
import { Instagram, Facebook, Youtube, Music2, ArrowUp, Mail, MapPin, Phone, Clock } from 'lucide-vue-next'
import PulseLine from '../ui/PulseLine.vue'

const email = ref('')

const quickLinks = [
  { label: 'Profil Akademi', to: '/#welcome' },
  { label: 'Program Studi', to: '/prodi' },
  { label: 'Berita & Kegiatan', to: '/berita' },
  { label: 'Fasilitas', to: '/fasilitas' },
  { label: 'Penerimaan Mahasiswa Baru', to: '/pmb' },
]

const socials = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Facebook', href: '#', icon: Facebook },
  { label: 'YouTube', href: '#', icon: Youtube },
  { label: 'TikTok', href: '#', icon: Music2 },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative bg-navy text-white">
    <!-- Decorative top border -->
    <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold opacity-60"></div>

    <!-- Newsletter section -->
    <div class="relative mx-auto max-w-7xl px-5 pt-16 lg:px-8">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-medblue to-navy-light p-8 shadow-xl sm:p-12">
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-[60px]"></div>
          <div class="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-[40px]"></div>
        </div>
        <div class="relative flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <h3 class="font-display text-xl font-bold sm:text-2xl">Dapatkan Informasi Terbaru</h3>
            <p class="mt-2 text-sm text-white/70">Berlangganan untuk menerima berita dan pengumuman terbaru.</p>
          </div>
          <div class="flex w-full max-w-md gap-3">
            <input
              v-model="email"
              type="email"
              placeholder="Masukkan email Anda"
              class="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/20 transition-all focus:ring-gold"
            />
            <button class="shrink-0 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-gold-light hover:-translate-y-0.5">
              Langganan
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main footer -->
    <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Brand + address -->
        <div>
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-yellow-600 font-display text-lg font-extrabold text-white shadow-lg">
              MB
            </div>
            <div>
              <p class="font-display text-base font-bold">Akbid Mega Buana</p>
              <p class="text-[11px] uppercase tracking-widest text-gold/80">Palu</p>
            </div>
          </div>
          <PulseLine color="#D4AF37" :width="90" class="mt-5 opacity-60" />
          <div class="mt-5 space-y-3 text-sm leading-relaxed text-white/60">
            <div class="flex items-start gap-3">
              <MapPin class="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
              <span>Jl. Towua No. 3, Palu, Sulawesi Tengah, Indonesia 94111</span>
            </div>
            <div class="flex items-center gap-3">
              <Phone class="h-4 w-4 shrink-0 text-gold/60" />
              <span>0811-4800-0073</span>
            </div>
            <div class="flex items-center gap-3">
              <Mail class="h-4 w-4 shrink-0 text-gold/60" />
              <span>akbidpalu@umegabuana.ac.id</span>
            </div>
            <div class="flex items-center gap-3">
              <Clock class="h-4 w-4 shrink-0 text-gold/60" />
              <span>Senin–Jumat, 08.00–16.00 WITA</span>
            </div>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <h3 class="font-display text-sm font-semibold uppercase tracking-widest text-gold">Tautan Cepat</h3>
          <ul class="mt-5 space-y-3">
            <li v-for="link in quickLinks" :key="link.label">
              <router-link :to="link.to" class="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold">
                <span class="h-px w-3 bg-white/20 transition-all group-hover:w-5 group-hover:bg-gold"></span>
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Program Studi -->
        <div>
          <h3 class="font-display text-sm font-semibold uppercase tracking-widest text-gold">Program Studi</h3>
          <ul class="mt-5 space-y-3">
            <li>
              <router-link to="/prodi" class="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold">
                <span class="h-px w-3 bg-white/20 transition-all group-hover:w-5 group-hover:bg-gold"></span>
                D-III Kebidanan
              </router-link>
            </li>
            <li>
              <router-link to="/prodi" class="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold">
                <span class="h-px w-3 bg-white/20 transition-all group-hover:w-5 group-hover:bg-gold"></span>
                S1 Kebidanan
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="font-display text-sm font-semibold uppercase tracking-widest text-gold">Media Sosial</h3>
          <div class="mt-5 flex gap-3">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-white/60 shadow-lg transition-all hover:scale-110 hover:bg-gradient-to-br hover:from-gold hover:to-yellow-600 hover:text-navy hover:shadow-gold/20"
            >
              <component :is="social.icon" class="h-4.5 w-4.5" :stroke-width="1.8" />
            </a>
          </div>
          <p class="mt-5 text-xs leading-relaxed text-white/40">
            Ikuti kami di media sosial untuk informasi terbaru seputar kegiatan akademik dan penerimaan mahasiswa baru.
          </p>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
        <p>&copy; {{ new Date().getFullYear() }} Akademi Kebidanan Mega Buana Palu. Seluruh hak cipta dilindungi.</p>
        <p>Dibangun untuk pendidikan kesehatan yang terpercaya.</p>
      </div>
    </div>

    <!-- Back to top -->
    <button
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy shadow-xl shadow-gold/20 transition-all hover:bg-gold-light hover:-translate-y-1 hover:shadow-gold/30"
      aria-label="Kembali ke atas"
    >
      <ArrowUp class="h-5 w-5" :stroke-width="2.5" />
    </button>
  </footer>
</template>
