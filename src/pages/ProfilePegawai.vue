<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  GraduationCap, BookOpen, Award, Users, ChevronDown,
  Loader2, AlertTriangle, ChevronRight, Briefcase, Mail, Phone,
  BadgeCheck, BookText
} from 'lucide-vue-next'
import PulseLine from '../components/ui/PulseLine.vue'

const API = '/api/v1/pegawai'
const allPegawai = ref([])
const loading = ref(true)
const errMsg = ref(null)

async function fetchData() {
  loading.value = true
  try {
    const res = await fetch(API)
    const json = await res.json()
    if (json.success && Array.isArray(json.data)) {
      allPegawai.value = json.data.filter(p => p.is_active !== false)
    } else {
      errMsg.value = 'Data pegawai tidak tersedia'
    }
  } catch {
    errMsg.value = 'Gagal memuat data pegawai'
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

const sorted = computed(() => {
  return [...allPegawai.value].sort((a, b) => (a.urutan ?? 999) - (b.urutan ?? 999))
})

function getLevel(jabatan) {
  const j = (jabatan || '').toLowerCase()
  if (j.includes('direktur')) return 1
  if (j.includes('ketua')) return 2
  if (j.includes('kepala')) return 3
  return 4
}

const levels = computed(() => {
  const grouped = { 1: [], 2: [], 3: [], 4: [] }
  for (const p of sorted.value) {
    const lv = getLevel(p.jabatan)
    grouped[lv].push(p)
  }
  return grouped
})

const stats = computed(() => {
  const total = allPegawai.value.length
  const l1 = allPegawai.value.filter(p => getLevel(p.jabatan) === 1).length
  const l2 = allPegawai.value.filter(p => getLevel(p.jabatan) === 2).length
  const l3 = allPegawai.value.filter(p => getLevel(p.jabatan) === 3).length
  const l4 = allPegawai.value.filter(p => getLevel(p.jabatan) === 4).length
  return { total, pimpinan: l1, struktural: l2 + l3, staff: l4 }
})

function fotoUrl(foto) {
  if (!foto) return 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop'
  if (foto.startsWith('http')) return foto
  return foto
}
</script>

<template>
  <div>
    <!-- Hero -->
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
          Pegawai
        </h1>
        <PulseLine :width="110" class="mx-auto mt-5" />
        <p class="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          Sumber daya manusia yang profesional dan berdedikasi di Akademi Kebidanan Mega Buana Palu
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
        <p class="mt-4 text-sm text-ink/50">Memuat data pegawai...</p>
      </div>

      <div v-else-if="errMsg" class="flex flex-col items-center justify-center py-32">
        <AlertTriangle class="w-10 h-10 text-red-400" />
        <p class="mt-4 text-sm text-ink/50">{{ errMsg }}</p>
      </div>

      <div v-else class="relative mx-auto max-w-7xl px-5 lg:px-8">
        <!-- Stats -->
        <div class="mx-auto max-w-4xl">
          <div class="grid grid-cols-4 gap-px overflow-hidden rounded-2xl bg-white/10 shadow-lg shadow-navy/10 ring-1 ring-black/5">
            <div class="bg-white px-4 py-6 text-center sm:px-6 sm:py-8">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Users class="h-6 w-6" />
              </div>
              <p class="mt-3 font-display text-2xl font-extrabold text-navy">{{ stats.total }}</p>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">Total Pegawai</p>
            </div>
            <div class="bg-white px-4 py-6 text-center sm:px-6 sm:py-8">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Briefcase class="h-6 w-6" />
              </div>
              <p class="mt-3 font-display text-2xl font-extrabold text-navy">{{ stats.pimpinan }}</p>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">Pimpinan</p>
            </div>
            <div class="bg-white px-4 py-6 text-center sm:px-6 sm:py-8">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-medblue/10 text-medblue">
                <BookOpen class="h-6 w-6" />
              </div>
              <p class="mt-3 font-display text-2xl font-extrabold text-navy">{{ stats.struktural }}</p>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">Struktural</p>
            </div>
            <div class="bg-white px-4 py-6 text-center sm:px-6 sm:py-8">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <GraduationCap class="h-6 w-6" />
              </div>
              <p class="mt-3 font-display text-2xl font-extrabold text-navy">{{ stats.staff }}</p>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">Staff</p>
            </div>
          </div>
        </div>

        <!-- Struktur Organisasi -->
        <div data-aos="fade-up" class="mt-20">
          <div class="text-center">
            <h2 class="font-display text-3xl font-extrabold text-navy sm:text-4xl">Struktur Organisasi</h2>
            <PulseLine :width="90" class="mx-auto mt-4" />
            <p class="mt-4 text-sm text-ink/60 max-w-xl mx-auto">Bagan struktur organisasi Akademi Kebidanan Mega Buana Palu</p>
          </div>

          <div class="mt-10 flex flex-col items-center">
            <!-- Level 1: Pimpinan -->
            <div v-if="levels[1].length" class="flex justify-center">
              <div v-for="p in levels[1]" :key="p.id" data-aos="fade-up">
                <div class="w-72 rounded-2xl bg-gradient-to-br from-navy to-navy-light p-6 shadow-xl ring-1 ring-white/10 text-center">
                  <div class="mx-auto h-16 w-16 overflow-hidden rounded-full ring-2 ring-gold/40 mb-3">
                    <img :src="fotoUrl(p.foto)" :alt="p.nama" class="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <h3 class="font-display text-base font-bold text-white">{{ p.nama }}</h3>
                  <p class="mt-1 text-sm font-semibold text-gold">{{ p.jabatan }}</p>
                </div>
                <div class="mx-auto my-3 flex justify-center">
                  <svg width="2" height="24" class="text-medblue/40">
                    <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Garis cabang ke level 2 -->
            <div v-if="levels[2].length" class="w-full max-w-2xl">
              <svg viewBox="0 0 400 20" class="w-full h-5 text-medblue/30">
                <line x1="200" y1="0" x2="200" y2="10" stroke="currentColor" stroke-width="2" />
                <line x1="100" y1="10" x2="300" y2="10" stroke="currentColor" stroke-width="2" />
                <line v-for="n in levels[2].length" :key="n" :x1="100 + ((n-1) * 200 / Math.max(1, levels[2].length - 1))" y1="10" :x2="100 + ((n-1) * 200 / Math.max(1, levels[2].length - 1))" y2="20" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>

            <!-- Level 2: Kaprodi -->
            <div v-if="levels[2].length" class="flex flex-wrap justify-center gap-6">
              <div v-for="p in levels[2]" :key="p.id" data-aos="fade-up" data-aos-delay="100">
                <div class="w-64 rounded-2xl bg-white p-5 shadow-lg shadow-navy/10 ring-1 ring-navy/5 text-center">
                  <div class="mx-auto h-14 w-14 overflow-hidden rounded-full ring-2 ring-medblue/20 mb-2">
                    <img :src="fotoUrl(p.foto)" :alt="p.nama" class="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <h3 class="font-display text-sm font-bold text-navy">{{ p.nama }}</h3>
                  <p class="mt-0.5 text-xs font-medium text-medblue">{{ p.jabatan }}</p>
                </div>
                <div v-if="levels[3].length" class="mx-auto my-3 flex justify-center">
                  <svg width="2" height="20" class="text-gold/30">
                    <line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Garis cabang ke level 3 -->
            <div v-if="levels[3].length" class="w-full max-w-4xl">
              <svg viewBox="0 0 600 20" class="w-full h-5 text-gold/25">
                <line x1="300" y1="0" x2="300" y2="10" stroke="currentColor" stroke-width="2" />
                <line x1="100" y1="10" x2="500" y2="10" stroke="currentColor" stroke-width="2" />
                <line v-for="n in levels[3].length" :key="n" :x1="100 + ((n-1) * 400 / Math.max(1, levels[3].length - 1))" y1="10" :x2="100 + ((n-1) * 400 / Math.max(1, levels[3].length - 1))" y2="20" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>

            <!-- Level 3: Kepala Unit -->
            <div v-if="levels[3].length" class="flex flex-wrap justify-center gap-5">
              <div v-for="p in levels[3]" :key="p.id" data-aos="fade-up" data-aos-delay="150">
                <div class="w-56 rounded-2xl bg-white p-4 shadow shadow-navy/5 ring-1 ring-navy/5 text-center">
                  <div class="mx-auto h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold/15 mb-2">
                    <img :src="fotoUrl(p.foto)" :alt="p.nama" class="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <h3 class="font-display text-sm font-bold text-navy">{{ p.nama }}</h3>
                  <p class="text-xs text-ink/60 mt-0.5">{{ p.jabatan }}</p>
                </div>
                <div v-if="levels[4].length" class="mx-auto my-3 flex justify-center">
                  <svg width="2" height="20" class="text-emerald-400/30">
                    <line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Garis cabang ke level 4 -->
            <div v-if="levels[4].length" class="w-full max-w-4xl">
              <svg viewBox="0 0 600 20" class="w-full h-5 text-emerald-400/25">
                <line x1="300" y1="0" x2="300" y2="10" stroke="currentColor" stroke-width="2" />
                <line x1="100" y1="10" x2="500" y2="10" stroke="currentColor" stroke-width="2" />
                <line v-for="n in levels[4].length" :key="n" :x1="100 + ((n-1) * 400 / Math.max(1, levels[4].length - 1))" y1="10" :x2="100 + ((n-1) * 400 / Math.max(1, levels[4].length - 1))" y2="20" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>

            <!-- Level 4: Staff -->
            <div v-if="levels[4].length" class="flex flex-wrap justify-center gap-5">
              <div v-for="p in levels[4]" :key="p.id" data-aos="fade-up" data-aos-delay="200">
                <div class="w-52 rounded-2xl bg-white p-4 shadow shadow-navy/5 ring-1 ring-navy/5 text-center">
                  <div class="mx-auto h-12 w-12 overflow-hidden rounded-full ring-2 ring-gray-100 mb-2">
                    <img :src="fotoUrl(p.foto)" :alt="p.nama" class="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <h3 class="font-display text-sm font-bold text-navy">{{ p.nama }}</h3>
                  <p class="text-xs text-ink/60 mt-0.5">{{ p.jabatan }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Semua Pegawai Grid -->
        <div data-aos="fade-up" class="mt-20">
          <div class="text-center">
            <h2 class="font-display text-3xl font-extrabold text-navy sm:text-4xl">Semua Pegawai</h2>
            <PulseLine :width="90" class="mx-auto mt-4" />
            <p class="mt-4 text-sm text-ink/60 max-w-xl mx-auto">Seluruh pegawai Akademi Kebidanan Mega Buana Palu</p>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div
              v-for="(p, i) in sorted"
              :key="p.id"
              :data-aos="'fade-up'"
              :data-aos-delay="(i % 4) * 80"
              class="group rounded-2xl bg-white p-5 shadow-lg shadow-navy/5 ring-1 ring-navy/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div class="relative mx-auto h-24 w-24 overflow-hidden rounded-2xl ring-2 ring-gold/20 transition-all duration-500 group-hover:ring-gold/60">
                <img
                  :src="fotoUrl(p.foto)"
                  :alt="p.nama"
                  class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div class="mt-4 text-center">
                <h3 class="font-display text-base font-bold text-navy">{{ p.nama }}</h3>
                <p class="mt-0.5 text-sm font-semibold text-medblue">{{ p.jabatan }}</p>
                <div class="mt-3 space-y-1 text-xs text-ink/60">
                  <p v-if="p.nip_nidn" class="flex items-center justify-center gap-1.5">
                    <BadgeCheck class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    NIP/NIDN: {{ p.nip_nidn }}
                  </p>
                  <p v-if="p.bidang" class="flex items-center justify-center gap-1.5">
                    <BookText class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    Bidang: {{ p.bidang }}
                  </p>
                  <p v-if="p.pendidikan_terakhir" class="flex items-center justify-center gap-1.5">
                    <GraduationCap class="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    Pendidikan: {{ p.pendidikan_terakhir }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
