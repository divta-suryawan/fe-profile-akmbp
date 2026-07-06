<script setup>
import { ref, onMounted } from 'vue'
import { GraduationCap, BookOpenCheck, Award, Users } from 'lucide-vue-next'

const stats = [
  { icon: GraduationCap, value: 15, suffix: '+', label: 'Tahun Mendidik', color: 'from-blue-500 to-medblue' },
  { icon: BookOpenCheck, value: 3, suffix: '', label: 'Program Studi', color: 'from-gold to-yellow-600' },
  { icon: Users, value: 1200, suffix: '+', label: 'Alumni Bidan', color: 'from-emerald-500 to-green-700' },
  { icon: Award, value: 1, suffix: '', label: 'Akreditasi BAN-PT', color: 'from-purple-500 to-indigo-600' },
]

const displayValues = ref(stats.map(() => 0))
const animated = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated.value) {
          animated.value = true
          animateCounters()
        }
      })
    },
    { threshold: 0.3 }
  )

  const el = document.getElementById('stats-strip')
  if (el) observer.observe(el)
})

function animateCounters() {
  const duration = 2000
  const start = Date.now()

  function tick() {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)

    stats.forEach((stat, i) => {
      displayValues.value[i] = Math.floor(ease * stat.value)
    })

    if (progress < 1) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
}
</script>

<template>
  <div id="stats-strip" class="relative z-20 mx-auto -mt-14 max-w-6xl px-5 sm:-mt-16 lg:px-8">
    <!-- Decorative bg glow -->
    <div class="pointer-events-none absolute -inset-10 -z-10">
      <div class="mx-auto h-40 w-40 rounded-full bg-gold/10 blur-[80px]"></div>
    </div>

    <div
      data-aos="fade-up"
      class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gradient-to-br from-white/30 to-white/10 shadow-2xl shadow-navy/20 ring-1 ring-black/5 backdrop-blur-xl sm:grid-cols-4"
    >
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="group relative overflow-hidden bg-white/95 px-4 py-7 text-center transition-all duration-500 hover:bg-white sm:px-6 sm:py-8"
      >
        <!-- Corner decoration -->
        <div class="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br opacity-0 transition-all duration-500 group-hover:opacity-10" :class="stat.color"></div>

        <!-- Icon -->
        <div class="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1" :class="stat.color">
          <component :is="stat.icon" class="h-6 w-6 text-white" :stroke-width="1.8" />
        </div>

        <!-- Value -->
        <p class="relative mt-4 font-display text-3xl font-extrabold text-navy tabular-nums sm:text-4xl">
          <template v-if="animated">
            {{ stat.label === 'Akreditasi BAN-PT' ? 'A' : displayValues[i] }}
          </template>
          <template v-else>
            {{ stat.label === 'Akreditasi BAN-PT' ? 'A' : '0' }}
          </template>
          <span class="text-gold">{{ stat.suffix }}</span>
        </p>

        <!-- Label -->
        <p class="relative mt-1 text-[11px] font-semibold uppercase tracking-wider text-ink/50 sm:text-xs">
          {{ stat.label }}
        </p>

        <!-- Bottom accent bar -->
        <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full" :class="stat.color"></div>
      </div>
    </div>
  </div>
</template>
