<script setup>
import { ref, onMounted } from 'vue'
import { Quote, Loader2, AlertTriangle } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import Button from '../components/ui/Button.vue'

const API = '/api/v1/halaman/slug/sambutan-direktur'
const data = ref(null)
const loading = ref(true)
const errMsg = ref(null)

async function fetchData() {
  loading.value = true
  try {
    const res = await fetch(API)
    const json = await res.json()
    if (json.success && json.data) {
      data.value = json.data
    } else {
      errMsg.value = 'Data sambutan tidak tersedia'
    }
  } catch {
    errMsg.value = 'Gagal memuat data sambutan'
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <div>
    <section class="relative mt-0 overflow-hidden bg-navy py-24 sm:py-32">
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
          Sambutan Direktur
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Kata sambutan dari pimpinan Akademi Kebidanan Mega Buana Palu
        </p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-40 top-1/3 h-64 w-64 rounded-full border border-medblue/10"></div>
        <div class="absolute -right-40 bottom-1/4 h-48 w-48 rounded-full border border-gold/10"></div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <Loader2 class="w-10 h-10 text-medblue animate-spin" />
        <p class="mt-4 text-sm text-ink/50">Memuat data sambutan...</p>
      </div>

      <div v-else-if="errMsg" class="flex flex-col items-center justify-center py-32">
        <AlertTriangle class="w-10 h-10 text-red-400" />
        <p class="mt-4 text-sm text-ink/50">{{ errMsg }}</p>
      </div>

      <div v-else-if="data" class="relative mx-auto max-w-5xl px-5 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div data-aos="fade-right" class="relative mx-auto max-w-sm lg:mx-0">
            <div class="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/20 via-transparent to-medblue/20 blur-3xl"></div>
            <div class="relative overflow-hidden rounded-3xl shadow-2xl shadow-navy/20 ring-1 ring-navy/5">
              <img
                :src="data.pegawai?.foto || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop'"
                alt="Direktur Akademi Kebidanan Mega Buana Palu"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="absolute -bottom-2 left-8 right-8 h-1.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold opacity-70"></div>

            <div class="relative mx-auto -mt-8 w-3/4 rounded-2xl bg-white/95 px-5 py-4 text-center shadow-xl shadow-navy/15 backdrop-blur-md ring-1 ring-black/5">
              <p class="font-display text-base font-bold text-navy">{{ data.pegawai?.jabatan || 'Direktur' }}</p>
              <p class="text-xs text-ink/60">{{ data.pegawai?.nama || '-' }}</p>
            </div>
          </div>

          <div data-aos="fade-left">
            <div class="relative">
              <Quote class="absolute -left-2 -top-2 h-12 w-12 text-gold/20 sm:-left-4 sm:-top-4 sm:h-16 sm:w-16" />
              <div class="space-y-5 text-base leading-relaxed text-ink/75 sm:text-lg" v-html="data.konten" />
            </div>

            <div class="mt-8 flex items-center gap-4 border-t border-navy/10 pt-6">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-yellow-600 text-lg font-bold text-white shadow-lg">
                {{ data.data?.inisial || (data.pegawai?.nama || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'DR' }}
              </div>
              <div>
                <p class="font-display text-lg font-bold text-navy">{{ data.pegawai?.nama || '-' }}</p>
                <p class="text-sm text-ink/50">{{ data.pegawai?.jabatan || 'Direktur' }} Akademi Kebidanan Mega Buana Palu</p>
              </div>
            </div>

            <div class="mt-8">
              <Button tag="router-link" to="/visi-misi" variant="primary">Visi dan Misi</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
