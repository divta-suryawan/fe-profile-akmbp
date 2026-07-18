<script setup>
import { ref, onMounted } from 'vue'
import { Quote, Loader2 } from 'lucide-vue-next'
import PulseLine from '../ui/PulseLine.vue'
import Button from '../ui/Button.vue'

const API = '/api/v1/halaman/slug/sambutan-direktur'
const data = ref(null)
const loading = ref(true)

async function fetchData() {
  try {
    const res = await fetch(API)
    const json = await res.json()
    if (json.success && json.data) {
      data.value = json.data
    }
  } catch {
    // silently fail
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

function autoInitials(name) {
  if (!name) return 'DR'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}
</script>

<template>
  <section id="director" class="relative overflow-hidden bg-navy py-20 lg:py-28">
    <!-- Decorative background patterns -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, rgba(212,175,55,0.5) 1px, transparent 1px); background-size: 24px 24px;"></div>
      <div class="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-gold/10"></div>
      <div class="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-tr from-gold/10 to-transparent blur-[100px]"></div>
      <svg class="absolute inset-x-0 top-1/2 h-48 w-full -translate-y-1/2 opacity-[0.04]" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none">
        <path d="M0 80H500L540 20L600 140L650 80H1440" stroke="#D4AF37" stroke-width="3" />
      </svg>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 lg:px-8">
      <div v-if="loading" class="flex items-center justify-center py-28">
        <Loader2 class="w-8 h-8 text-gold animate-spin" />
      </div>

      <div v-else-if="data" class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <!-- Left: image -->
        <div data-aos="fade-right" class="relative mx-auto max-w-sm lg:mx-0">
          <div class="absolute -inset-4 rounded-[2rem] border-2 border-gold/20 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
          <div class="relative">
            <div class="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/20 via-transparent to-medblue/20 blur-3xl"></div>
            <div class="overflow-hidden rounded-3xl shadow-2xl shadow-navy/30 ring-1 ring-white/10">
              <img
                :src="data.pegawai?.foto || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&auto=format&fit=crop'"
                alt="Direktur Akademi Kebidanan Mega Buana Palu"
                class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div class="absolute -bottom-2 left-8 right-8 h-1.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold opacity-70"></div>
          </div>
        </div>

        <!-- Right: text card -->
        <div data-aos="fade-left" class="relative">
          <div class="absolute -left-4 -top-4 text-6xl font-display font-extrabold text-white/5 sm:-left-6 sm:-top-6 sm:text-8xl">
            <Quote class="h-16 w-16 sm:h-24 sm:w-24" />
          </div>

          <div class="relative rounded-3xl bg-white/95 p-8 shadow-2xl shadow-navy/25 backdrop-blur-sm sm:p-10" style="max-height: 600px; overflow-y: auto;">
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-medblue">Kata Sambutan</span>
            <h2 class="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Sambutan Direktur</h2>
            <PulseLine :width="110" class="mt-4" />

            <div class="mt-6 space-y-4 text-sm leading-relaxed text-ink/70 sm:text-base prose prose-sm max-w-none" v-html="data.konten" />

            <div class="mt-8 flex items-center gap-4 border-t border-navy/5 pt-6">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-yellow-600 text-sm font-bold text-white shadow-lg">
                {{ data.data?.inisial || autoInitials(data.pegawai?.nama) }}
              </div>
              <div>
                <p class="font-display text-base font-bold text-navy">{{ data.pegawai?.jabatan || 'Direktur' }} Akbid Mega Buana Palu</p>
                <p class="text-xs text-ink/50">{{ data.pegawai?.nama || '-' }}</p>
              </div>
            </div>

            <div class="mt-6">
              <Button tag="router-link" to="/sambutan-direktur" variant="ghost">Baca Selengkapnya &rarr;</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
