<script setup>
import { ref, computed, onMounted } from 'vue'
import { Target, Eye, CheckCircle2, Loader2, AlertTriangle } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'
import Button from '../components/ui/Button.vue'

const API = '/api/v1/halaman/slug/visi-misi'
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
      errMsg.value = 'Data visi misi tidak tersedia'
    }
  } catch {
    errMsg.value = 'Gagal memuat data visi misi'
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

const misiItems = computed(() => {
  if (!data.value?.misi) return []
  return data.value.misi.map(m => typeof m === 'object' ? (m.deskripsi || '') : m)
})
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

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-40 top-1/3 h-64 w-64 rounded-full border border-medblue/10"></div>
        <div class="absolute -right-40 bottom-1/4 h-48 w-48 rounded-full border border-gold/10"></div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <Loader2 class="w-10 h-10 text-medblue animate-spin" />
        <p class="mt-4 text-sm text-ink/50">Memuat data visi misi...</p>
      </div>

      <div v-else-if="errMsg" class="flex flex-col items-center justify-center py-32">
        <AlertTriangle class="w-10 h-10 text-red-400" />
        <p class="mt-4 text-sm text-ink/50">{{ errMsg }}</p>
      </div>

      <div v-else-if="data" class="relative mx-auto max-w-4xl px-5 lg:px-8">
        <!-- Visi -->
        <div data-aos="fade-up">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-yellow-600 shadow-lg">
              <Eye class="h-8 w-8 text-white" />
            </div>
            <h2 class="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Visi</h2>
            <PulseLine :width="90" class="mx-auto mt-4" />
          </div>

          <div class="mt-10 rounded-3xl bg-white p-8 shadow-xl shadow-navy/10 ring-1 ring-navy/5 sm:p-10">
            <div class="text-lg leading-relaxed text-navy font-semibold text-center max-w-3xl mx-auto [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1" v-html="data.visi" />
          </div>
        </div>

        <!-- Misi -->
        <div v-if="data.misi && data.misi.length" data-aos="fade-up" class="mt-20">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-medblue to-blue-700 shadow-lg">
              <Target class="h-8 w-8 text-white" />
            </div>
            <h2 class="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Misi</h2>
            <PulseLine :width="90" class="mx-auto mt-4" />
          </div>

          <div class="mt-10 rounded-3xl bg-white p-8 shadow-xl shadow-navy/10 ring-1 ring-navy/5 sm:p-10">
            <ol class="space-y-5">
              <li v-for="(item, i) in misiItems" :key="i" class="flex items-start gap-4">
                <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-medblue/10 text-base font-bold text-medblue">{{ i + 1 }}</span>
                <span class="text-base leading-relaxed text-ink/75 pt-1">{{ item }}</span>
              </li>
            </ol>
          </div>
        </div>

        <!-- Tujuan -->
        <div v-if="data.data?.tujuan && data.data.tujuan.length" data-aos="fade-up" class="mt-20">
          <div class="text-center">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 shadow-lg">
              <CheckCircle2 class="h-8 w-8 text-white" />
            </div>
            <h2 class="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Tujuan</h2>
            <PulseLine :width="90" class="mx-auto mt-4" />
          </div>

          <div class="mt-10 rounded-3xl bg-gradient-to-br from-navy to-navy-light p-8 shadow-xl sm:p-10">
            <ul class="space-y-4">
              <li v-for="(item, i) in data.data.tujuan" :key="i" class="flex items-start gap-4">
                <span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20">
                  <CheckCircle2 class="h-4 w-4 text-gold" />
                </span>
                <span class="text-base leading-relaxed text-white/80 pt-0.5">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- CTA -->
        <div data-aos="fade-up" class="mx-auto mt-16 text-center">
          <p class="text-sm text-ink/60">Pelajari lebih lanjut tentang program studi kami</p>
          <div class="mt-4">
            <Button tag="router-link" to="/program-studi" variant="primary">Program Studi</Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
