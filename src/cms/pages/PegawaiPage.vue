<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Plus, Search, Edit3, Trash2, Users, Loader2,
  Hash, Type, BadgeCheck, ListOrdered, ToggleLeft, CheckCircle, XCircle,
  Database, AlertTriangle, Briefcase, GraduationCap, BookOpen, Image, Upload, X
} from 'lucide-vue-next'
import { useToast } from '../composables/useToast'
import Modal from '../components/Modal.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const { success, error } = useToast()

const API = '/api/v1/pegawai'
const PRODI_API = '/api/v1/program-studi'

const items = ref([])
const search = ref('')
const showModal = ref(false)
const editingItem = ref(null)
const confirmDelete = ref({ show: false, item: null })
const deleting = ref(false)
const loading = ref(false)
const submitting = ref(false)
const errors = ref({})

const fotoFile = ref(null)
const fotoPreview = ref('')
const existingFoto = ref('')
const activeProdi = ref(null)

const filteredItems = computed(() => {
  const data = items.value || []
  if (!search.value) return data
  const q = search.value.toLowerCase()
  return data.filter(
    (i) =>
      (i.nama || '').toLowerCase().includes(q) ||
      (i.jabatan || '').toLowerCase().includes(q) ||
      (i.nip_nidn || '').toLowerCase().includes(q),
  )
})

const form = ref({
  nama: '',
  nip_nidn: '',
  jabatan: '',
  jenis: '',
  bidang: '',
  pendidikan_terakhir: '',
  urutan: 0,
  is_active: true,
})

const jenisOptions = [
  { value: 'direktur', label: 'Direktur' },
  { value: 'dosen_tetap', label: 'Dosen Tetap' },
  { value: 'dosen_praktisi', label: 'Dosen Praktisi' },
  { value: 'staff', label: 'Staff' },
]

const jenisLabel = {
  direktur: 'Direktur',
  dosen_tetap: 'Dosen Tetap',
  dosen_praktisi: 'Dosen Praktisi',
  staff: 'Staff',
}

function resetForm() {
  form.value = {
    nama: '',
    nip_nidn: '',
    jabatan: '',
    jenis: '',
    bidang: '',
    pendidikan_terakhir: '',
    urutan: (items.value || []).length + 1,
    is_active: true,
  }
  fotoFile.value = null
  fotoPreview.value = ''
  existingFoto.value = ''
}

async function apiFetch(url, options = {}) {
  const res = await fetch(url, options)
  let body
  try {
    body = await res.json()
  } catch {
    body = null
  }
  if (!res.ok) {
    const msg = body?.message || body?.error || `Server error (${res.status})`
    throw new Error(msg)
  }
  return body
}

async function fetchItems() {
  loading.value = true
  try {
    const json = await apiFetch(API)
    items.value = json.data || []
  } catch (e) {
    error(e.message)
    items.value = []
  } finally {
    loading.value = false
  }
}

async function fetchActiveProdi() {
  try {
    const json = await apiFetch(`${PRODI_API}?is_active=true`)
    const list = json.data || []
    if (list.length > 0) {
      activeProdi.value = list[0]
    }
  } catch {
    activeProdi.value = null
  }
}

onMounted(() => {
  fetchItems()
  fetchActiveProdi()
})

function clearError(field) {
  delete errors.value[field]
}

function onFotoChange(e) {
  const file = e.target.files?.[0]
  if (!file) {
    resetFoto()
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    error('Ukuran foto maksimal 2 MB')
    e.target.value = ''
    return
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) {
    error('Format foto harus JPG, PNG, atau WebP')
    e.target.value = ''
    return
  }

  fotoFile.value = file
  const reader = new FileReader()
  reader.onload = (ev) => { fotoPreview.value = ev.target.result }
  reader.readAsDataURL(file)
  clearError('foto')
}

function resetFoto() {
  fotoFile.value = null
  fotoPreview.value = ''
  existingFoto.value = ''
}

function removeFoto() {
  resetFoto()
}

function openAdd() {
  editingItem.value = null
  errors.value = {}
  resetForm()
  showModal.value = true
}

function openEdit(item) {
  editingItem.value = item
  errors.value = {}
  form.value = {
    nama: item.nama || '',
    nip_nidn: item.nip_nidn || '',
    jabatan: item.jabatan || '',
    jenis: item.jenis || '',
    bidang: item.bidang || '',
    pendidikan_terakhir: item.pendidikan_terakhir || '',
    urutan: item.urutan || 0,
    is_active: item.is_active ?? true,
  }
  fotoFile.value = null
  fotoPreview.value = ''
  existingFoto.value = item.foto || ''
  showModal.value = true
}

function validate() {
  const errs = {}
  const v = (s) => (s || '').trim()

  if (!v(form.value.nama)) errs.nama = 'Nama wajib diisi'
  else if (v(form.value.nama).length < 3) errs.nama = 'Nama minimal 3 karakter'
  else if (v(form.value.nama).length > 255) errs.nama = 'Nama maksimal 255 karakter'

  if (!v(form.value.jabatan)) errs.jabatan = 'Jabatan wajib diisi'
  else if (v(form.value.jabatan).length > 255) errs.jabatan = 'Jabatan maksimal 255 karakter'

  if (!form.value.jenis) errs.jenis = 'Jenis pegawai wajib diisi'

  if (form.value.nip_nidn && v(form.value.nip_nidn).length > 30) errs.nip_nidn = 'NIP/NIDN/NUPTK maksimal 30 karakter'

  if (form.value.bidang && v(form.value.bidang).length > 255) errs.bidang = 'Bidang maksimal 255 karakter'

  if (form.value.pendidikan_terakhir && v(form.value.pendidikan_terakhir).length > 50) errs.pendidikan_terakhir = 'Pendidikan terakhir maksimal 50 karakter'

  errors.value = errs
  return Object.keys(errs).length === 0
}

function buildFormData() {
  const fd = new FormData()
  fd.append('nama', form.value.nama.trim())
  fd.append('nip_nidn', form.value.nip_nidn.trim())
  fd.append('jabatan', form.value.jabatan.trim())
  fd.append('jenis', form.value.jenis)
  fd.append('bidang', form.value.bidang.trim())
  fd.append('pendidikan_terakhir', form.value.pendidikan_terakhir.trim())
  fd.append('urutan', String(Number(form.value.urutan) || 0))
  fd.append('is_active', String(form.value.is_active))

  if (activeProdi.value) {
    fd.append('program_studi_id', activeProdi.value.id)
  }

  if (fotoFile.value) {
    fd.append('foto', fotoFile.value)
  }

  return fd
}

async function save() {
  errors.value = {}
  if (!validate()) {
    error('Periksa inputan Anda')
    return
  }

  submitting.value = true
  const fd = buildFormData()

  try {
    if (editingItem.value) {
      await apiFetch(`${API}/${editingItem.value.id}`, {
        method: 'PUT',
        body: fd,
      })
      await fetchItems()
      success('Pegawai berhasil diperbarui')
      showModal.value = false
    } else {
      await apiFetch(API, {
        method: 'POST',
        body: fd,
      })
      await fetchItems()
      success('Pegawai berhasil ditambahkan')
      showModal.value = false
    }
  } catch (e) {
    error(e.message)
  } finally {
    submitting.value = false
  }
}

function requestDelete(item) {
  confirmDelete.value = { show: true, item }
}

async function confirmDeleteItem() {
  deleting.value = true
  try {
    await apiFetch(`${API}/${confirmDelete.value.item.id}`, { method: 'DELETE' })
    await fetchItems()
    success('Pegawai berhasil dihapus')
  } catch (e) {
    error(e.message)
  } finally {
    confirmDelete.value = { show: false, item: null }
    deleting.value = false
  }
}

function cancelDelete() {
  confirmDelete.value = { show: false, item: null }
}

async function toggleActive(item) {
  const next = !item.is_active
  try {
    const fd = new FormData()
    fd.append('is_active', String(next))
    await apiFetch(`${API}/${item.id}`, {
      method: 'PUT',
      body: fd,
    })
    await fetchItems()
    success(next ? 'Pegawai diaktifkan' : 'Pegawai dinonaktifkan')
  } catch (e) {
    error(e.message)
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <Users class="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-navy font-display">Kelola Pegawai</h1>
          <p class="text-gray-500 text-sm mt-0.5">Kelola data pegawai dan dosen</p>
        </div>
      </div>
      <button
        @click="openAdd"
        class="flex items-center gap-2 bg-gold text-navy font-medium px-4 py-2.5 rounded-lg hover:bg-gold/90 transition-colors shadow-sm"
      >
        <Plus class="w-4 h-4" />
        Tambah Pegawai
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="p-4 border-b border-gray-100 flex items-center gap-3">
        <div class="relative flex-1 max-w-sm">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            v-model="search"
            type="text"
            placeholder="Cari pegawai..."
            class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
          />
        </div>
        <div class="flex items-center gap-1.5 text-xs text-gray-400">
          <Database class="w-3.5 h-3.5" />
          {{ (items || []).length }} data
        </div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <Loader2 class="w-8 h-8 text-medblue animate-spin mb-3" />
        <p class="text-sm text-gray-500">Memuat data...</p>
      </div>

      <div v-else-if="(items || []).length === 0 && !search" class="flex flex-col items-center justify-center py-20">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Users class="w-8 h-8 text-gray-300" />
        </div>
        <h3 class="text-base font-semibold text-gray-700 mb-1">Belum Ada Pegawai</h3>
        <p class="text-sm text-gray-400 mb-4">Belum ada data pegawai, silakan tambah baru.</p>
        <button
          @click="openAdd"
          class="flex items-center gap-2 bg-gold text-navy font-medium px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors text-sm"
        >
          <Plus class="w-4 h-4" />
          Tambah Pegawai
        </button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
              <th class="px-6 py-3">
                <div class="flex items-center gap-1.5">
                  <Hash class="w-3.5 h-3.5" /> No
                </div>
              </th>
              <th class="px-6 py-3">
                <div class="flex items-center gap-1.5">
                  <Type class="w-3.5 h-3.5" /> Nama
                </div>
              </th>
              <th class="px-6 py-3">NIP/NIDN/NUPTK</th>
              <th class="px-6 py-3">
                <div class="flex items-center gap-1.5">
                  <Briefcase class="w-3.5 h-3.5" /> Jabatan
                </div>
              </th>
              <th class="px-6 py-3">
                <div class="flex items-center gap-1.5">
                  <BadgeCheck class="w-3.5 h-3.5" /> Jenis
                </div>
              </th>
              <th class="px-6 py-3">
                <div class="flex items-center gap-1.5">
                  <GraduationCap class="w-3.5 h-3.5" /> Pend. Terakhir
                </div>
              </th>
              <th class="px-6 py-3">
                <div class="flex items-center gap-1.5">
                  <ListOrdered class="w-3.5 h-3.5" /> Urutan
                </div>
              </th>
              <th class="px-6 py-3">
                <div class="flex items-center gap-1.5">
                  <ToggleLeft class="w-3.5 h-3.5" /> Status
                </div>
              </th>
              <th class="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="(item, index) in filteredItems"
              :key="item.id"
              class="hover:bg-gray-50/50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-gray-500">{{ index + 1 }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 overflow-hidden"
                  >
                    <img
                      v-if="item.foto"
                      :src="item.foto"
                      :alt="item.nama"
                      class="w-full h-full object-cover"
                    />
                    <Users v-else class="w-4 h-4 text-indigo-500" />
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ item.nama }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ item.nip_nidn || '-' }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ item.jabatan }}</td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border',
                    item.jenis === 'direktur'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : item.jenis === 'dosen_tetap' || item.jenis === 'dosen_praktisi'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-50 text-gray-700 border-gray-200',
                  ]"
                >
                  <BadgeCheck class="w-3 h-3" />
                  {{ jenisLabel[item.jenis] || item.jenis }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ item.pendidikan_terakhir || '-' }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ item.urutan }}</td>
              <td class="px-6 py-4">
                <button
                  @click="toggleActive(item)"
                  :class="[
                    'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors',
                    item.is_active
                      ? 'bg-green-50 text-green-700 border-green-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
                      : 'bg-red-50 text-red-700 border-red-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200',
                  ]"
                >
                  <component :is="item.is_active ? CheckCircle : XCircle" class="w-3 h-3" />
                  {{ item.is_active ? 'Aktif' : 'Nonaktif' }}
                </button>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button
                    @click="openEdit(item)"
                    class="p-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-600"
                    title="Edit"
                  >
                    <Edit3 class="w-4 h-4" />
                  </button>
                  <button
                    @click="requestDelete(item)"
                    class="p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-600"
                    title="Hapus"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredItems.length === 0">
              <td colspan="9" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <Search class="w-6 h-6 text-gray-300" />
                  <p class="text-sm text-gray-400">Tidak ada hasil ditemukan</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal
      :open="showModal"
      :title="editingItem ? 'Edit Pegawai' : 'Tambah Pegawai'"
      @close="showModal = false"
    >
      <div class="space-y-5">
        <div v-if="activeProdi" class="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <BookOpen class="w-4 h-4 shrink-0" />
          Program Studi: <strong>{{ activeProdi.nama }}</strong>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Type class="w-4 h-4 text-gray-400" />
              Nama <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.nama"
              type="text"
              @input="clearError('nama')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.nama && !errors.nama,
                'border-red-400 bg-red-50': errors.nama,
                'border-gray-300': !errors.nama && !form.nama
              }"
              placeholder="Nama lengkap pegawai"
            />
            <p v-if="errors.nama" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.nama }}
            </p>
          </div>
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Hash class="w-4 h-4 text-gray-400" />
              NIP/NIDN/NUPTK
            </label>
            <input
              v-model="form.nip_nidn"
              type="text"
              @input="clearError('nip_nidn')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.nip_nidn && !errors.nip_nidn,
                'border-red-400 bg-red-50': errors.nip_nidn,
                'border-gray-300': !errors.nip_nidn && !form.nip_nidn
              }"
              placeholder="NIP/NIDN/NUPTK"
            />
            <p v-if="errors.nip_nidn" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.nip_nidn }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Briefcase class="w-4 h-4 text-gray-400" />
              Jabatan <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.jabatan"
              type="text"
              @input="clearError('jabatan')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.jabatan && !errors.jabatan,
                'border-red-400 bg-red-50': errors.jabatan,
                'border-gray-300': !errors.jabatan && !form.jabatan
              }"
              placeholder="Direktur"
            />
            <p v-if="errors.jabatan" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.jabatan }}
            </p>
          </div>
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <BadgeCheck class="w-4 h-4 text-gray-400" />
              Jenis <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.jenis"
              @change="clearError('jenis')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.jenis && !errors.jenis,
                'border-red-400 bg-red-50': errors.jenis,
                'border-gray-300': !errors.jenis && !form.jenis
              }"
            >
              <option value="">Pilih jenis</option>
              <option v-for="opt in jenisOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
            <p v-if="errors.jenis" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.jenis }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <BookOpen class="w-4 h-4 text-gray-400" />
              Bidang
            </label>
            <input
              v-model="form.bidang"
              type="text"
              @input="clearError('bidang')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.bidang && !errors.bidang,
                'border-red-400 bg-red-50': errors.bidang,
                'border-gray-300': !errors.bidang && !form.bidang
              }"
              placeholder="Kebidanan"
            />
            <p v-if="errors.bidang" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.bidang }}
            </p>
          </div>
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <GraduationCap class="w-4 h-4 text-gray-400" />
              Pendidikan Terakhir
            </label>
            <input
              v-model="form.pendidikan_terakhir"
              type="text"
              @input="clearError('pendidikan_terakhir')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.pendidikan_terakhir && !errors.pendidikan_terakhir,
                'border-red-400 bg-red-50': errors.pendidikan_terakhir,
                'border-gray-300': !errors.pendidikan_terakhir && !form.pendidikan_terakhir
              }"
              placeholder="S2 Kebidanan"
            />
            <p v-if="errors.pendidikan_terakhir" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.pendidikan_terakhir }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <ListOrdered class="w-4 h-4 text-gray-400" />
              Urutan
            </label>
            <input
              v-model.number="form.urutan"
              type="number"
              min="0"
              class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            />
          </div>
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Image class="w-4 h-4 text-gray-400" />
              Foto
            </label>
            <div
              class="relative border-2 border-dashed rounded-lg p-3 text-center transition-colors cursor-pointer hover:bg-gray-50"
              :class="fotoPreview || existingFoto ? 'border-green-300 bg-green-50/30' : 'border-gray-300'"
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @change="onFotoChange"
              />

              <div v-if="fotoPreview || existingFoto" class="relative inline-block">
                <img
                  :src="fotoPreview || existingFoto"
                  class="w-28 h-28 object-cover rounded-lg mx-auto"
                />
                <button
                  type="button"
                  @click.stop="removeFoto"
                  class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
              <div v-else class="flex flex-col items-center gap-1.5 py-4">
                <Upload class="w-8 h-8 text-gray-300" />
                <p class="text-sm text-gray-500">Klik untuk upload foto</p>
                <p class="text-xs text-gray-400">Maks. 2 MB (JPG, PNG, WebP)</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <div
            class="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center"
            :class="{ 'bg-green-100': form.is_active }"
          >
            <ToggleLeft class="w-4 h-4" :class="form.is_active ? 'text-green-600' : 'text-gray-400'" />
          </div>
          <input
            v-model="form.is_active"
            type="checkbox"
            :true-value="true"
            :false-value="false"
            id="is_active"
            class="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold"
          />
          <label for="is_active" class="text-sm font-medium text-gray-700">Aktif</label>
        </div>
      </div>

      <template #footer>
        <button
          @click="showModal = false"
          :disabled="submitting"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Batal
        </button>
        <button
          @click="save"
          :disabled="submitting"
          class="px-5 py-2 text-sm font-medium text-navy bg-gold rounded-lg hover:bg-gold/90 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
        >
          <Loader2 v-if="submitting" class="w-4 h-4 animate-spin" />
          {{ submitting ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Pegawai' }}
        </button>
      </template>
    </Modal>

    <ConfirmDialog
      :open="confirmDelete.show"
      title="Hapus Pegawai"
      :message="confirmDelete.item
        ? `Apakah Anda yakin ingin menghapus pegawai &quot;${confirmDelete.item.nama}&quot;? Tindakan ini tidak dapat dibatalkan.`
        : ''"
      confirm-text="Ya, Hapus"
      :loading="deleting"
      @confirm="confirmDeleteItem"
      @cancel="cancelDelete"
    />
  </div>
</template>
