import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/sambutan-direktur',
    name: 'sambutan',
    component: () => import('../pages/ProfileSambutan.vue'),
  },
  {
    path: '/sejarah',
    name: 'sejarah',
    component: () => import('../pages/ProfileSejarah.vue'),
  },
  {
    path: '/visi-misi',
    name: 'visi-misi',
    component: () => import('../pages/ProfileVisiMisi.vue'),
  },
  {
    path: '/dosen',
    name: 'dosen',
    component: () => import('../pages/ProfileDosen.vue'),
  },
  {
    path: '/berita',
    name: 'berita',
    component: () => import('../pages/BeritaPage.vue'),
  },
  {
    path: '/berita/:slug',
    name: 'berita-detail',
    component: () => import('../pages/BeritaDetailPage.vue'),
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: () => import('../pages/AgendaPage.vue'),
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('../pages/DownloadPage.vue'),
  },
  {
    path: '/pengumuman',
    name: 'pengumuman',
    component: () => import('../pages/PengumumanPage.vue'),
  },
  {
    path: '/fasilitas',
    name: 'fasilitas',
    component: () => import('../pages/FasilitasPage.vue'),
  },
  {
    path: '/galeri',
    name: 'galeri',
    component: () => import('../pages/GaleriPage.vue'),
  },
  {
    path: '/program-studi',
    name: 'program-studi',
    component: () => import('../pages/AkademikProgramStudi.vue'),
  },
  {
    path: '/tracer-study',
    name: 'tracer-study',
    component: () => import('../pages/AkademikTracerStudy.vue'),
  },
  {
    path: '/penelitian',
    name: 'penelitian',
    component: () => import('../pages/AkademikPenelitian.vue'),
  },
  {
    path: '/pengabdian',
    name: 'pengabdian',
    component: () => import('../pages/AkademikPengabdian.vue'),
  },
  {
    path: '/lpm',
    name: 'lpm',
    component: () => import('../pages/AkademikLPM.vue'),
  },
  {
    path: '/lppm',
    name: 'lppm',
    component: () => import('../pages/AkademikLPPM.vue'),
  },
  {
    path: '/kemahasiswaan',
    name: 'kemahasiswaan',
    component: () => import('../pages/AkademikKemahasiswaan.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
