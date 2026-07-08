<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="min-h-screen bg-surface">
    <Navbar v-if="!isAdmin" />

    <main>
      <RouterView />
    </main>

    <Footer v-if="!isAdmin" />
  </div>
</template>
