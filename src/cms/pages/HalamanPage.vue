<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import {
  MessageSquareText, Clock, Target, Eye, BookOpen,
  AlertTriangle, Loader2, Save, Plus, Trash2, User,
  Pencil, X, CheckCircle2, XCircle, ListChecks
} from 'lucide-vue-next'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useToast } from '../composables/useToast'

const { success, error } = useToast()

const API = '/api/v1/halaman'
const PEGAWAI_API = '/api/v1/pegawai'

const tabs = [
  { key: 'sambutan', label: 'Sambutan', slug: 'sambutan-direktur', judul: 'Sambutan Direktur' },
  { key: 'sejarah', label: 'Sejarah', slug: 'sejarah', judul: 'Sejarah' },
  { key: 'visi-misi', label: 'Visi & Misi', slug: 'visi-misi', judul: 'Visi & Misi' },
]

const activeTab = ref('sambutan')
const loading = ref(false)
const saving = ref(false)
const mode = ref('empty')
const pageData = reactive({})
const errors = ref({})

const quillToolbar = [
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  ['clean'],
]

const emptyForms = {
  sambutan: { konten: '' },
  sejarah: { konten: '', milestones: [] },
  'visi-misi': { visi: '', misi: [], tujuan: [] },
}

const pegawaiList = ref([])

const direktur = computed(() => {
  return pegawaiList.value.find(p => p.jenis === 'direktur') || null
})

async function apiFetch(url, options = {}) {
  const res = await fetch(url, options)
  let body
  try {
    body = await res.json()
  } catch {
    body = null
  }
  if (!res.ok) {
    throw new Error(body?.message || body?.error || `Server error (${res.status})`)
  }
  return body
}

async function fetchPegawai() {
  try {
    const json = await apiFetch(PEGAWAI_API)
    if (json.success && Array.isArray(json.data)) {
      pegawaiList.value = json.data
    }
  } catch {
    // silently fail
  }
}

function initTab(tabKey) {
  if (!pageData[tabKey]) {
    pageData[tabKey] = { ...emptyForms[tabKey], id: null }
  }
}

function setModeByTab() {
  const tab = activeTab.value
  initTab(tab)
  if (pageData[tab].id) {
    mode.value = 'view'
  } else {
    mode.value = 'empty'
  }
}

async function loadAll() {
  loading.value = true
  for (const tab of tabs) {
    try {
      const json = await apiFetch(`${API}/slug/${tab.slug}`)
      if (!json.success || !json.data) continue
      const d = json.data
      pageData[tab.key] = {
        id: d.id,
        konten: d.konten || '',
        visi: d.visi || '',
        milestones: d.data || [],
        misi: Array.isArray(d.misi) ? d.misi.map(m => typeof m === 'object' ? (m.deskripsi || '') : m) : [],
        tujuan: d.data?.tujuan || [],
      }
    } catch {
      // page not found yet, use empty form
    }
  }
  initTab(activeTab.value)
  setModeByTab()
  loading.value = false
}

onMounted(() => {
  loadAll()
  fetchPegawai()
})

function onTabChange(tabKey) {
  activeTab.value = tabKey
  mode.value = 'empty'
  errors.value = {}
  setModeByTab()
}

function startCreate() {
  const tab = activeTab.value
  pageData[tab] = { ...emptyForms[tab], id: null }
  errors.value = {}
  mode.value = 'create'
}

function startEdit() {
  errors.value = {}
  mode.value = 'edit'
}

function cancelForm() {
  errors.value = {}
  setModeByTab()
}

function addMilestone() {
  pageData[activeTab.value].milestones.push({ tahun: '', judul: '', deskripsi: '' })
}

function removeMilestone(idx) {
  pageData[activeTab.value].milestones.splice(idx, 1)
}

function addMisi() {
  pageData['visi-misi'].misi.push('')
}

function removeMisi(idx) {
  pageData['visi-misi'].misi.splice(idx, 1)
}

function addTujuan() {
  pageData['visi-misi'].tujuan.push('')
}

function removeTujuan(idx) {
  pageData['visi-misi'].tujuan.splice(idx, 1)
}

function clearError(field) {
  delete errors.value[field]
}

function validate() {
  const tab = activeTab.value
  const errs = {}
  if (tab === 'sambutan') {
    if (!pageData[tab].konten) errs.konten = 'Konten sambutan wajib diisi'
  } else if (tab === 'sejarah') {
    if (!pageData[tab].konten) errs.konten = 'Konten sejarah wajib diisi'
    if (pageData[tab].milestones.length === 0) errs.milestones = 'Minimal 1 milestone'
    else {
      for (const m of pageData[tab].milestones) {
        if (!m.tahun || !m.judul || !m.deskripsi) errs.milestones = 'Semua field milestone wajib diisi'
      }
    }
  } else if (tab === 'visi-misi') {
    if (!pageData[tab].visi) errs.visi = 'Visi wajib diisi'
    if (pageData[tab].misi.length === 0) errs.misi = 'Minimal 1 misi'
    else {
      for (const m of pageData[tab].misi) {
        if (!m) errs.misi = 'Semua misi wajib diisi'
      }
    }
  }
  errors.value = errs
  return Object.keys(errs).length === 0
}

async function save() {
  const tab = activeTab.value
  const tabDef = tabs.find(t => t.key === tab)
  errors.value = {}
  if (!validate()) {
    error('Periksa inputan Anda')
    return
  }

  saving.value = true

  let body
  if (tab === 'sambutan') {
    if (!direktur.value) {
      error('Belum ada data direktur. Tambahkan pegawai dengan jenis Direktur terlebih dahulu.')
      saving.value = false
      return
    }
    body = {
      slug: tabDef.slug,
      judul: tabDef.judul,
      konten: pageData[tab].konten,
      pegawai_id: direktur.value.id,
    }
  } else if (tab === 'sejarah') {
    body = {
      slug: tabDef.slug,
      judul: tabDef.judul,
      konten: pageData[tab].konten,
      data: pageData[tab].milestones.filter(m => m.tahun && m.judul && m.deskripsi),
    }
  } else if (tab === 'visi-misi') {
    body = {
      slug: tabDef.slug,
      judul: tabDef.judul,
      visi: pageData[tab].visi,
      misi: pageData[tab].misi.filter(Boolean),
      data: { tujuan: pageData[tab].tujuan.filter(Boolean) },
    }
  }

  try {
    if (pageData[tab].id) {
      await apiFetch(`${API}/${pageData[tab].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      success('Data berhasil diperbarui')
    } else {
      const json = await apiFetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      pageData[tab].id = json.data.id
      success('Data berhasil disimpan')
    }
    await loadAll()
  } catch (e) {
    error(e.message)
  } finally {
    saving.value = false
  }
}

function autoInitials(name) {
  if (!name) return 'DR'
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
          <BookOpen class="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-navy font-display">Kelola Profil</h1>
          <p class="text-gray-500 text-sm mt-0.5">Kelola halaman profil akademi</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="mode === 'view'"
          @click="startEdit"
          class="flex items-center gap-2 bg-medblue text-white font-medium px-4 py-2.5 rounded-lg hover:bg-medblue/90 transition-colors shadow-sm"
        >
          <Pencil class="w-4 h-4" />
          Edit
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-32 bg-white rounded-xl shadow-sm border border-gray-100">
      <Loader2 class="w-8 h-8 text-medblue animate-spin mb-3" />
      <p class="text-sm text-gray-500">Memuat data...</p>
    </div>

    <template v-else>
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-8">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="onTabChange(tab.key)"
          class="flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === tab.key
            ? 'border-gold text-gold'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          <component :is="
            tab.key === 'sambutan' ? MessageSquareText :
            tab.key === 'sejarah' ? Clock : Target
          " class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>

      <!-- ==================== EMPTY ==================== -->
      <div
        v-if="mode === 'empty'"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
      >
        <div class="py-12">
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <component :is="activeTab === 'sambutan' ? MessageSquareText : activeTab === 'sejarah' ? Clock : Target" class="w-7 h-7 text-gray-400" />
          </div>
          <h3 class="text-base font-semibold text-gray-700 mb-1">
            {{ activeTab === 'sambutan' ? 'Belum ada sambutan direktur' : activeTab === 'sejarah' ? 'Belum ada data sejarah' : 'Belum ada visi & misi' }}
          </h3>
          <p class="text-sm text-gray-400 mb-6">
            {{ activeTab === 'sambutan' ? 'Tambahkan sambutan direktur untuk ditampilkan' : activeTab === 'sejarah' ? 'Tambahkan sejarah akademi' : 'Tambahkan visi, misi, dan tujuan akademi' }}
          </p>
          <button
            @click="startCreate"
            class="inline-flex items-center gap-2 bg-gold text-navy font-medium px-5 py-2.5 rounded-lg hover:bg-gold/90 transition-colors shadow-sm"
          >
            <Plus class="w-4 h-4" />
            {{ activeTab === 'sambutan' ? 'Tambah Sambutan' : activeTab === 'sejarah' ? 'Tambah Sejarah' : 'Tambah Visi & Misi' }}
          </button>
        </div>
      </div>

      <!-- ==================== VIEW ==================== -->
      <div
        v-if="mode === 'view' && pageData[activeTab]"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <!-- SAMBUTAN VIEW -->
        <template v-if="activeTab === 'sambutan'">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Direktur</p>
            <div v-if="direktur" class="flex items-center gap-3 mt-1">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <span class="text-sm font-semibold text-blue-600">{{ autoInitials(direktur.nama) }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-800">{{ direktur.nama }}</p>
                <p v-if="direktur.jabatan" class="text-xs text-gray-400">{{ direktur.jabatan }}</p>
              </div>
            </div>
            <p v-else class="text-sm text-yellow-600">Belum ada data direktur</p>
          </div>
          <div class="mt-5 pt-5 border-t border-gray-100">
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-3">Konten Sambutan</p>
            <div class="text-sm text-gray-800 prose prose-sm max-w-none" v-html="pageData.sambutan.konten" />
          </div>
        </template>

        <!-- SEJARAH VIEW -->
        <template v-if="activeTab === 'sejarah'">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-3">Konten Intro</p>
            <div class="text-sm text-gray-800 prose prose-sm max-w-none" v-html="pageData.sejarah.konten" />
          </div>
          <div class="mt-5 pt-5 border-t border-gray-100">
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-3">Milestone / Timeline</p>
            <div v-if="pageData.sejarah.milestones.length === 0" class="text-sm text-gray-400">-</div>
            <div v-else class="space-y-3">
              <div v-for="(m, i) in pageData.sejarah.milestones" :key="i" class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-sm font-bold text-gold">{{ m.tahun }}</div>
                <div>
                  <p class="text-sm font-semibold text-gray-800">{{ m.judul }}</p>
                  <p class="text-xs text-gray-500 mt-0.5">{{ m.deskripsi }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- VISI-MISI VIEW -->
        <template v-if="activeTab === 'visi-misi'">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-3">Visi</p>
            <div class="text-sm text-gray-800 prose prose-sm max-w-none" v-html="pageData['visi-misi'].visi" />
          </div>
          <div class="mt-5 pt-5 border-t border-gray-100">
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-3">Misi</p>
            <div v-if="pageData['visi-misi'].misi.length === 0" class="text-sm text-gray-400">-</div>
            <ol v-else class="space-y-2">
              <li v-for="(item, i) in pageData['visi-misi'].misi" :key="i" class="flex items-start gap-3">
                <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-medblue/10 text-xs font-bold text-medblue">{{ i + 1 }}</span>
                <span class="text-sm text-gray-700 pt-0.5">{{ item }}</span>
              </li>
            </ol>
          </div>
          <div class="mt-5 pt-5 border-t border-gray-100">
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-3">Tujuan</p>
            <div v-if="!pageData['visi-misi'].tujuan || pageData['visi-misi'].tujuan.length === 0" class="text-sm text-gray-400">-</div>
            <ul v-else class="space-y-2">
              <li v-for="(item, i) in pageData['visi-misi'].tujuan" :key="i" class="flex items-start gap-3">
                <CheckCircle2 class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span class="text-sm text-gray-700">{{ item }}</span>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <!-- ==================== FORM (CREATE / EDIT) ==================== -->
      <div
        :key="mode"
        v-if="mode === 'create' || mode === 'edit'"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div class="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-navy">
            {{ mode === 'create' ? 'Tambah Data' : 'Edit Data' }}
          </h2>
          <div class="flex items-center gap-2">
            <button
              @click="save"
              :disabled="saving"
              class="flex items-center gap-2 bg-gold text-navy font-medium px-4 py-2 rounded-lg hover:bg-gold/90 disabled:opacity-50 transition-colors shadow-sm text-sm"
            >
              <Loader2 v-if="saving" class="w-4 h-4 animate-spin" />
              <Save v-else class="w-4 h-4" />
              {{ saving ? 'Menyimpan...' : 'Simpan' }}
            </button>
            <button
              @click="cancelForm"
              class="flex items-center gap-2 border border-gray-300 text-gray-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <X class="w-4 h-4" />
              Batal
            </button>
          </div>
        </div>

        <!-- === SAMBUTAN FORM === -->
        <template v-if="activeTab === 'sambutan'">
          <div class="space-y-5">
            <div>
              <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <User class="w-4 h-4 text-gray-400" />
                Direktur
              </label>
              <div
                v-if="direktur"
                class="flex items-center gap-3 max-w-md px-3 py-2.5 border border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-700"
              >
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span class="text-xs font-semibold text-blue-600">{{ autoInitials(direktur.nama) }}</span>
                </div>
                <div>
                  <p class="font-medium">{{ direktur.nama }}</p>
                  <p v-if="direktur.jabatan" class="text-xs text-gray-400">{{ direktur.jabatan }}</p>
                </div>
              </div>
              <div v-else class="flex items-center gap-2 max-w-md px-3 py-2.5 border border-yellow-200 bg-yellow-50 rounded-lg text-sm text-yellow-700">
                <AlertTriangle class="w-4 h-4 shrink-0" />
                <span>Belum ada data direktur. Tambahkan pegawai dengan jenis <strong>Direktur</strong> terlebih dahulu.</span>
              </div>
              <p class="text-xs text-gray-400 mt-1">Sambutan otomatis diberikan oleh direktur yang terdaftar</p>
            </div>

            <div>
              <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <MessageSquareText class="w-4 h-4 text-gray-400" />
                Konten Sambutan <span class="text-red-500">*</span>
              </label>
              <div class="border border-gray-300 rounded-lg overflow-hidden">
                <QuillEditor
                  v-model:content="pageData.sambutan.konten"
                  content-type="html"
                  :toolbar="quillToolbar"
                  :style="{ minHeight: '300px' }"
                />
              </div>
              <p v-if="errors.konten" class="flex items-center gap-1 text-xs text-red-500 mt-1">
                <AlertTriangle class="w-3 h-3" /> {{ errors.konten }}
              </p>
            </div>
          </div>
        </template>

        <!-- === SEJARAH FORM === -->
        <template v-if="activeTab === 'sejarah'">
          <div class="space-y-5">
            <div>
              <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <MessageSquareText class="w-4 h-4 text-gray-400" />
                Konten Intro <span class="text-red-500">*</span>
              </label>
              <div class="border border-gray-300 rounded-lg overflow-hidden">
                <QuillEditor
                  v-model:content="pageData.sejarah.konten"
                  content-type="html"
                  :toolbar="quillToolbar"
                  :style="{ minHeight: '200px' }"
                />
              </div>
              <p v-if="errors.konten" class="flex items-center gap-1 text-xs text-red-500 mt-1">
                <AlertTriangle class="w-3 h-3" /> {{ errors.konten }}
              </p>
            </div>

            <div class="border-t border-gray-100 pt-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-700">Milestone / Timeline</h3>
                <button
                  @click="addMilestone"
                  class="flex items-center gap-1.5 text-sm font-medium text-medblue hover:text-blue-700 transition-colors"
                >
                  <Plus class="w-4 h-4" />
                  Tambah
                </button>
              </div>
              <div v-if="pageData.sejarah.milestones.length === 0" class="text-center py-8 text-sm text-gray-400">
                Belum ada milestone. Klik "Tambah" untuk menambahkan.
              </div>
              <div v-for="(m, idx) in pageData.sejarah.milestones" :key="idx" class="p-4 bg-gray-50 rounded-lg mb-3">
                <div class="flex items-start gap-3">
                  <div class="flex-1 space-y-3">
                    <div class="grid grid-cols-[120px_1fr] gap-3">
                      <input
                        v-model="m.tahun"
                        type="text"
                        class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                        placeholder="Tahun (2006)"
                      />
                      <input
                        v-model="m.judul"
                        type="text"
                        class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                        placeholder="Judul milestone"
                      />
                    </div>
                    <textarea
                      v-model="m.deskripsi"
                      rows="3"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
                      placeholder="Deskripsi milestone"
                    ></textarea>
                  </div>
                  <button @click="removeMilestone(idx)" class="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0 mt-1">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p v-if="errors.milestones" class="flex items-center gap-1 text-xs text-red-500 mt-1">
                <AlertTriangle class="w-3 h-3" /> {{ errors.milestones }}
              </p>
            </div>
          </div>
        </template>

        <!-- === VISI-MISI FORM === -->
        <template v-if="activeTab === 'visi-misi'">
          <div class="space-y-5">
            <div>
              <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                <Eye class="w-4 h-4 text-gray-400" />
                Visi <span class="text-red-500">*</span>
              </label>
              <div class="border border-gray-300 rounded-lg overflow-hidden">
                <QuillEditor
                  v-model:content="pageData['visi-misi'].visi"
                  content-type="html"
                  :toolbar="quillToolbar"
                  :style="{ minHeight: '150px' }"
                />
              </div>
              <p v-if="errors.visi" class="flex items-center gap-1 text-xs text-red-500 mt-1">
                <AlertTriangle class="w-3 h-3" /> {{ errors.visi }}
              </p>
            </div>

            <div class="border-t border-gray-100 pt-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-700">Misi</h3>
                <button
                  @click="addMisi"
                  class="flex items-center gap-1.5 text-sm font-medium text-medblue hover:text-blue-700 transition-colors"
                >
                  <Plus class="w-4 h-4" />
                  Tambah
                </button>
              </div>
              <div v-if="pageData['visi-misi'].misi.length === 0" class="text-center py-8 text-sm text-gray-400">
                Belum ada misi. Klik "Tambah" untuk menambahkan.
              </div>
              <div v-for="(m, idx) in pageData['visi-misi'].misi" :key="idx" class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg mb-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-sm font-bold text-gold">
                  {{ idx + 1 }}
                </div>
                <div class="flex-1">
                  <textarea
                    v-model="pageData['visi-misi'].misi[idx]"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
                    placeholder="Deskripsi misi"
                  ></textarea>
                </div>
                <button @click="removeMisi(idx)" class="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0 mt-2">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
              <p v-if="errors.misi" class="flex items-center gap-1 text-xs text-red-500 mt-1">
                <AlertTriangle class="w-3 h-3" /> {{ errors.misi }}
              </p>
            </div>

            <div class="border-t border-gray-100 pt-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-sm font-semibold text-gray-700">Tujuan</h3>
                <button
                  @click="addTujuan"
                  class="flex items-center gap-1.5 text-sm font-medium text-medblue hover:text-blue-700 transition-colors"
                >
                  <Plus class="w-4 h-4" />
                  Tambah
                </button>
              </div>
              <div v-if="pageData['visi-misi'].tujuan.length === 0" class="text-center py-8 text-sm text-gray-400">
                Belum ada tujuan. Klik "Tambah" untuk menambahkan.
              </div>
              <div v-for="(item, idx) in pageData['visi-misi'].tujuan" :key="idx" class="flex items-start gap-3 mb-3">
                <input
                  v-model="pageData['visi-misi'].tujuan[idx]"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
                  placeholder="Tujuan..."
                />
                <button @click="removeTujuan(idx)" class="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
