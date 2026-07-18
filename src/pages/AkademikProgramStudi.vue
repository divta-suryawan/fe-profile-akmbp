<script setup>
import { ref, onMounted } from 'vue'
import { GraduationCap, Award, BookOpen, Target, Loader2, AlertTriangle } from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'

const API = '/api/v1/program-studi'
const prodi = ref(null)
const loading = ref(true)
const errMsg = ref(null)

async function fetchProdi() {
  loading.value = true
  try {
    const res = await fetch(API)
    const json = await res.json()
    if (json.success && json.data && json.data.length > 0) {
      prodi.value = json.data[0]
    } else {
      errMsg.value = 'Data program studi tidak tersedia'
    }
  } catch {
    errMsg.value = 'Gagal memuat data program studi'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProdi)
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
        <h1 class="font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl">Program Studi</h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">Program Studi D3 Kebidanan Akademi Kebidanan Mega Buana Palu</p>
      </div>
    </section>

    <section class="relative bg-surface py-20 lg:py-28">
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-medblue/[0.02] blur-[100px]"></div>
        <div class="absolute -left-40 bottom-0 h-64 w-64 rounded-full bg-gold/[0.02] blur-[80px]"></div>
      </div>
      <div class="relative mx-auto max-w-7xl px-5 lg:px-8">

        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-32">
          <Loader2 class="w-10 h-10 text-medblue animate-spin" />
          <p class="mt-4 text-sm text-ink/50">Memuat data program studi...</p>
        </div>

        <!-- Error -->
        <div v-else-if="errMsg" class="flex flex-col items-center justify-center py-32">
          <AlertTriangle class="w-10 h-10 text-red-400" />
          <p class="mt-4 text-sm text-ink/50">{{ errMsg }}</p>
        </div>

        <template v-else-if="prodi">
          <!-- Akreditasi -->
          <div data-aos="fade-up" class="mx-auto max-w-3xl">
            <div class="rounded-2xl bg-white p-8 text-center shadow-lg ring-1 ring-navy/5 sm:p-12">
              <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/10">
                <Award class="h-10 w-10 text-gold" />
              </div>
              <h2 class="mt-6 font-display text-2xl font-bold text-navy">Status Akreditasi</h2>
              <PulseLine :width="80" class="mx-auto mt-4" />
              <p class="mt-4 text-base leading-relaxed text-ink/70">
                {{ prodi.nama }} Akademi Kebidanan Mega Buana Palu telah terakreditasi dengan peringkat
                <strong class="bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent"> {{ prodi.akreditasi || '-' }} </strong>
                oleh Lembaga Akreditasi Mandiri Pendidikan Tinggi Kesehatan (LAM-PTKes).
              </p>
            </div>
          </div>

          <!-- Visi & Misi -->
          <div class="mt-20">
            <div class="text-center">
              <h2 class="font-display text-2xl font-bold text-navy sm:text-3xl">Visi &amp; Misi</h2>
              <PulseLine :width="80" class="mx-auto mt-4" />
            </div>
            <div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div data-aos="fade-right" class="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-navy/5">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-medblue/10 text-medblue">
                  <Target class="h-7 w-7" />
                </div>
                <h3 class="mt-6 font-display text-xl font-bold text-navy">Visi</h3>
                <div class="mt-4 text-sm leading-relaxed text-ink/70 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 [&_strong]:font-semibold" v-html="prodi.visi" />
              </div>
              <div data-aos="fade-left" class="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-navy/5">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <BookOpen class="h-7 w-7" />
                </div>
                <h3 class="mt-6 font-display text-xl font-bold text-navy">Misi</h3>
                <ul v-if="prodi.misi && prodi.misi.length" class="mt-4 space-y-3 text-sm leading-relaxed text-ink/70">
                  <li v-for="(item, idx) in prodi.misi" :key="idx" class="flex items-start gap-3">
                    <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span>
                    {{ item }}
                  </li>
                </ul>
                <p v-else class="mt-4 text-sm text-ink/50">Belum ada data misi.</p>
              </div>
            </div>
          </div>

          <!-- Info Prodi -->
          <div class="mt-20">
            <div class="text-center">
              <h2 class="font-display text-2xl font-bold text-navy sm:text-3xl">Informasi Program Studi</h2>
              <PulseLine :width="80" class="mx-auto mt-4" />
            </div>
            <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="(info, i) in [
                  { label: 'Jenjang', value: prodi.jenjang || '-', icon: GraduationCap, color: 'text-blue-600 bg-blue-100' },
                  { label: 'Gelar Lulusan', value: prodi.gelar_lulusan || '-', icon: Award, color: 'text-amber-600 bg-amber-100' },
                  { label: 'Lama Studi', value: prodi.lama_studi || '-', icon: BookOpen, color: 'text-emerald-600 bg-emerald-100' },
                  { label: 'Akreditasi', value: prodi.akreditasi || '-', icon: Award, color: 'text-gold bg-gold/10' },
                  { label: 'No. SK Akreditasi', value: prodi.nomor_sk_akreditasi || '-', icon: Award, color: 'text-purple-600 bg-purple-100' },
                  { label: 'Biaya Kuliah', value: prodi.biaya_kuliah || '-', icon: GraduationCap, color: 'text-rose-600 bg-rose-100' },
                ]"
                :key="i"
                data-aos="fade-up"
                :data-aos-delay="i * 60"
                class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-navy/5"
              >
                <div :class="[info.color]" class="flex h-12 w-12 items-center justify-center rounded-xl">
                  <component :is="info.icon" class="h-6 w-6" />
                </div>
                <p class="mt-4 text-xs font-semibold uppercase tracking-wider text-ink/50">{{ info.label }}</p>
                <p class="mt-1 font-display text-base font-bold text-navy">{{ info.value }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
