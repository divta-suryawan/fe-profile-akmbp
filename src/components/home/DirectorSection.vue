<script setup>
import { Quote } from 'lucide-vue-next'
import PulseLine from '../ui/PulseLine.vue'
</script>

<template>
  <section id="director" class="relative overflow-hidden bg-navy py-20 lg:py-28">
    <!-- Decorative background patterns -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- Grid dots -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, rgba(212,175,55,0.5) 1px, transparent 1px); background-size: 24px 24px;"></div>

      <!-- Large circle -->
      <div class="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-gold/10"></div>

      <!-- Gold gradient orb -->
      <div class="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-tr from-gold/10 to-transparent blur-[100px]"></div>

      <!-- Ambient line -->
      <svg class="absolute inset-x-0 top-1/2 h-48 w-full -translate-y-1/2 opacity-[0.04]" viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none">
        <path d="M0 80H500L540 20L600 140L650 80H1440" stroke="#D4AF37" stroke-width="3" />
      </svg>
    </div>

    <div class="relative mx-auto max-w-7xl px-5 lg:px-8">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <!-- Left: image -->
        <div data-aos="fade-right" class="relative mx-auto max-w-sm lg:mx-0">
          <!-- Gold ring frame -->
          <div class="absolute -inset-4 rounded-[2rem] border-2 border-gold/20 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>

          <div class="relative">
            <!-- Glow behind -->
            <div class="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-gold/20 via-transparent to-medblue/20 blur-3xl"></div>

            <!-- Image -->
            <div class="overflow-hidden rounded-3xl shadow-2xl shadow-navy/30 ring-1 ring-white/10">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1600&auto=format&fit=crop"
                alt="Direktur Akademi Kebidanan Mega Buana Palu"
                class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>

            <!-- Gold accent bar -->
            <div class="absolute -bottom-2 left-8 right-8 h-1.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold opacity-70"></div>
          </div>
        </div>

        <!-- Right: text card -->
        <div data-aos="fade-left" class="relative">
          <!-- Quote icon background -->
          <div class="absolute -left-4 -top-4 text-6xl font-display font-extrabold text-white/5 sm:-left-6 sm:-top-6 sm:text-8xl">
            <Quote class="h-16 w-16 sm:h-24 sm:w-24" />
          </div>

          <div class="relative rounded-3xl bg-white/95 p-8 shadow-2xl shadow-navy/25 backdrop-blur-sm sm:p-10">
            <span class="text-xs font-semibold uppercase tracking-[0.2em] text-medblue">Kata Sambutan</span>
            <h2 class="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Sambutan Direktur</h2>
            <PulseLine :width="110" class="mt-4" />

            <div class="mt-6 space-y-4 text-sm leading-relaxed text-ink/70 sm:text-base">
              <p>
                Assalamu'alaikum Warahmatullahi Wabarakatuh. Puji syukur kami panjatkan atas
                kepercayaan yang diberikan kepada Akademi Kebidanan Mega Buana Palu untuk turut
                berperan dalam mencetak generasi tenaga kesehatan yang unggul.
              </p>
              <p>
                Kami memahami bahwa profesi bidan menuntut kompetensi klinis yang tinggi sekaligus
                empati kemanusiaan yang mendalam. Oleh karena itu, seluruh proses pembelajaran di
                kampus ini dirancang untuk menyeimbangkan aspek akademik, keterampilan praktik, dan
                pembentukan karakter.
              </p>
              <p>
                Kepada seluruh mahasiswa, jadikanlah masa studi ini sebagai perjalanan membangun
                kompetensi sekaligus jati diri sebagai calon tenaga kesehatan yang amanah. Kami
                yakin, dengan kerja keras dan dukungan seluruh civitas akademika, cita-cita tersebut
                dapat kita wujudkan bersama.
              </p>
            </div>

            <div class="mt-8 flex items-center gap-4 border-t border-navy/5 pt-6">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold to-yellow-600 text-sm font-bold text-white shadow-lg">
                SW
              </div>
              <div>
                <p class="font-display text-base font-bold text-navy">Direktur Akbid Mega Buana Palu</p>
                <p class="text-xs text-ink/50">Bd. Sriwahyuni, S.ST., M.Kes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
