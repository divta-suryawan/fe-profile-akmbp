<script setup>
import { ref, onMounted } from 'vue'
import {
  BookOpen, Loader2, Hash, Type, GraduationCap, Award, Clock, UserCheck,
  AlignLeft, ListOrdered, ToggleLeft, AlertTriangle, Eye, ListChecks, Save,
  Plus, Pencil, X, CheckCircle2, XCircle
} from 'lucide-vue-next'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useToast } from '../composables/useToast'

const { success, error } = useToast()

const API = '/api/v1/program-studi'

const item = ref(null)
const loading = ref(false)
const submitting = ref(false)
const errors = ref({})
const mode = ref('empty')

const form = ref({
  slug: '',
  nama: '',
  jenjang: '',
  akreditasi: '',
  nomor_sk_akreditasi: '',
  biaya_kuliah: '',
  lama_studi: '',
  gelar_lulusan: '',
  deskripsi: '',
  visi: '',
  misi: '',
  urutan: 0,
  is_active: true,
})

const jenjangOptions = ['D3', 'D4', 'S1', 'S2', 'S3']
const akreditasiOptions = ['A', 'B', 'C', 'Baik', 'Baik Sekali', 'Unggul']

const quillToolbar = [
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  ['clean'],
]

function misiArrayToHtml(arr) {
  if (!arr || arr.length === 0) return ''
  return `<ol>${arr.map((m) => `<li>${m}</li>`).join('')}</ol>`
}

function htmlToMisiArray(html) {
  if (!html) return []
  const div = document.createElement('div')
  div.innerHTML = html
  const items = div.querySelectorAll('li')
  return Array.from(items).map((li) => li.textContent.trim()).filter(Boolean)
}

function onBiayaInput(e) {
  form.value.biaya_kuliah = e.target.value.replace(/\D/g, '')
  clearError('biaya_kuliah')
}

function formatBiaya(val) {
  const num = val.replace(/\D/g, '')
  if (!num) return ''
  return `Rp ${Number(num).toLocaleString('id-ID')}/semester`
}

function parseBiaya(val) {
  if (!val) return ''
  return val.replace(/[^\d]/g, '')
}

function fillForm(data) {
  item.value = data
  form.value = {
    slug: data.slug || '',
    nama: data.nama || '',
    jenjang: data.jenjang || '',
    akreditasi: data.akreditasi || '',
    nomor_sk_akreditasi: data.nomor_sk_akreditasi || '',
    biaya_kuliah: parseBiaya(data.biaya_kuliah || ''),
    lama_studi: data.lama_studi || '',
    gelar_lulusan: data.gelar_lulusan || '',
    deskripsi: data.deskripsi || '',
    visi: data.visi || '',
    misi: misiArrayToHtml(data.misi),
    urutan: data.urutan || 0,
    is_active: data.is_active ?? true,
  }
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

async function fetchItem() {
  loading.value = true
  try {
    const json = await apiFetch(API)
    const list = json.data || []
    if (list.length > 0) {
      item.value = list[0]
      fillForm(list[0])
      mode.value = 'view'
    } else {
      item.value = null
      mode.value = 'empty'
    }
  } catch (e) {
    error(e.message)
    item.value = null
    mode.value = 'empty'
  } finally {
    loading.value = false
  }
}

onMounted(fetchItem)

function startCreate() {
  item.value = null
  form.value = {
    slug: '',
    nama: '',
    jenjang: '',
    akreditasi: '',
    nomor_sk_akreditasi: '',
    biaya_kuliah: '',
    lama_studi: '',
    gelar_lulusan: '',
    deskripsi: '',
    visi: '',
    misi: '',
    urutan: 0,
    is_active: true,
  }
  errors.value = {}
  mode.value = 'create'
}

function startEdit() {
  errors.value = {}
  mode.value = 'edit'
}

function cancelForm() {
  errors.value = {}
  if (item.value) {
    fillForm(item.value)
    mode.value = 'view'
  } else {
    mode.value = 'empty'
  }
}

function clearError(field) {
  delete errors.value[field]
}

function validate() {
  const errs = {}
  const v = (s) => (s || '').trim()

  if (!v(form.value.nama)) errs.nama = 'Nama program studi wajib diisi'
  else if (v(form.value.nama).length < 3) errs.nama = 'Nama minimal 3 karakter'
  else if (v(form.value.nama).length > 255) errs.nama = 'Nama maksimal 255 karakter'

  if (!form.value.jenjang) errs.jenjang = 'Jenjang wajib diisi'

  if (!v(form.value.akreditasi)) errs.akreditasi = 'Akreditasi wajib diisi'
  else if (v(form.value.akreditasi).length > 20) errs.akreditasi = 'Akreditasi maksimal 20 karakter'

  if (!v(form.value.lama_studi)) errs.lama_studi = 'Lama studi wajib diisi'
  else if (v(form.value.lama_studi).length > 50) errs.lama_studi = 'Lama studi maksimal 50 karakter'

  if (!v(form.value.gelar_lulusan)) errs.gelar_lulusan = 'Gelar lulusan wajib diisi'
  else if (v(form.value.gelar_lulusan).length > 100) errs.gelar_lulusan = 'Gelar lulusan maksimal 100 karakter'

  if (!v(form.value.nomor_sk_akreditasi)) errs.nomor_sk_akreditasi = 'Nomor SK akreditasi wajib diisi'

  if (!v(form.value.biaya_kuliah)) errs.biaya_kuliah = 'Biaya kuliah wajib diisi'

  if (!v(form.value.deskripsi)) errs.deskripsi = 'Deskripsi wajib diisi'

  if (!v(form.value.visi)) errs.visi = 'Visi wajib diisi'

  const misiList = htmlToMisiArray(form.value.misi)
  if (misiList.length === 0) errs.misi = 'Misi wajib diisi (minimal 1 item)'

  errors.value = errs
  return Object.keys(errs).length === 0
}

async function save() {
  errors.value = {}
  if (!validate()) {
    error('Periksa inputan Anda')
    return
  }

  submitting.value = true
  const payload = {
    slug: form.value.slug.trim(),
    nama: form.value.nama.trim(),
    jenjang: form.value.jenjang,
    akreditasi: form.value.akreditasi,
    nomor_sk_akreditasi: form.value.nomor_sk_akreditasi.trim(),
    biaya_kuliah: formatBiaya(form.value.biaya_kuliah),
    lama_studi: form.value.lama_studi.trim(),
    gelar_lulusan: form.value.gelar_lulusan.trim(),
    deskripsi: form.value.deskripsi.trim(),
    visi: form.value.visi,
    misi: htmlToMisiArray(form.value.misi),
    urutan: Number(form.value.urutan) || 0,
    is_active: form.value.is_active,
  }

  try {
    if (item.value) {
      await apiFetch(`${API}/${item.value.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      await fetchItem()
      success('Program studi berhasil diperbarui')
    } else {
      await apiFetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      await fetchItem()
      success('Program studi berhasil ditambahkan')
    }
  } catch (e) {
    error(e.message)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <BookOpen class="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-navy font-display">Program Studi</h1>
          <p class="text-gray-500 text-sm mt-0.5">Kelola data program studi</p>
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

    <!-- loading -->
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <Loader2 class="w-8 h-8 text-medblue animate-spin mb-3" />
      <p class="text-sm text-gray-500">Memuat data...</p>
    </div>

    <!-- empty -->
    <div
      v-else-if="mode === 'empty'"
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
    >
      <div class="py-12">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <BookOpen class="w-7 h-7 text-gray-400" />
        </div>
        <h3 class="text-base font-semibold text-gray-700 mb-1">Belum ada data program studi</h3>
        <p class="text-sm text-gray-400 mb-6">Tambahkan program studi untuk mulai menampilkan informasi</p>
        <button
          @click="startCreate"
          class="inline-flex items-center gap-2 bg-gold text-navy font-medium px-5 py-2.5 rounded-lg hover:bg-gold/90 transition-colors shadow-sm"
        >
          <Plus class="w-4 h-4" />
          Tambah Program Studi
        </button>
      </div>
    </div>

    <!-- form (create / edit) -->
    <div
      :key="mode"
      v-else-if="mode === 'create' || mode === 'edit'"
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div class="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-navy">
          {{ mode === 'create' ? 'Tambah Program Studi' : 'Edit Program Studi' }}
        </h2>
        <div class="flex items-center gap-2">
          <button
            @click="save"
            :disabled="submitting"
            class="flex items-center gap-2 bg-gold text-navy font-medium px-4 py-2 rounded-lg hover:bg-gold/90 disabled:opacity-50 transition-colors shadow-sm text-sm"
          >
            <Loader2 v-if="submitting" class="w-4 h-4 animate-spin" />
            <Save v-else class="w-4 h-4" />
            {{ submitting ? 'Menyimpan...' : 'Simpan' }}
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

      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Hash class="w-4 h-4 text-gray-400" />
              Slug <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.slug"
              type="text"
              @input="clearError('slug')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.slug && !errors.slug,
                'border-red-400 bg-red-50': errors.slug,
                'border-gray-300': !errors.slug && !form.slug
              }"
              placeholder="d3-kebidanan"
            />
            <p v-if="errors.slug" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.slug }}
            </p>
          </div>
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Type class="w-4 h-4 text-gray-400" />
              Nama Program Studi <span class="text-red-500">*</span>
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
              placeholder="D3 Kebidanan"
            />
            <p v-if="errors.nama" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.nama }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <GraduationCap class="w-4 h-4 text-gray-400" />
              Jenjang <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.jenjang"
              @change="clearError('jenjang')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.jenjang && !errors.jenjang,
                'border-red-400 bg-red-50': errors.jenjang,
                'border-gray-300': !errors.jenjang && !form.jenjang
              }"
            >
              <option value="">Pilih jenjang</option>
              <option v-for="opt in jenjangOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <p v-if="errors.jenjang" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.jenjang }}
            </p>
          </div>
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Award class="w-4 h-4 text-gray-400" />
              Akreditasi
            </label>
            <select
              v-model="form.akreditasi"
              @change="clearError('akreditasi')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.akreditasi && !errors.akreditasi,
                'border-red-400 bg-red-50': errors.akreditasi,
                'border-gray-300': !errors.akreditasi && !form.akreditasi
              }"
            >
              <option value="">Pilih akreditasi</option>
              <option v-for="opt in akreditasiOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
            <p v-if="errors.akreditasi" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.akreditasi }}
            </p>
          </div>
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
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Clock class="w-4 h-4 text-gray-400" />
              Lama Studi
            </label>
            <input
              v-model="form.lama_studi"
              type="text"
              @input="clearError('lama_studi')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.lama_studi && !errors.lama_studi,
                'border-red-400 bg-red-50': errors.lama_studi,
                'border-gray-300': !errors.lama_studi && !form.lama_studi
              }"
              placeholder="3 Tahun"
            />
            <p v-if="errors.lama_studi" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.lama_studi }}
            </p>
          </div>
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <UserCheck class="w-4 h-4 text-gray-400" />
              Gelar Lulusan
            </label>
            <input
              v-model="form.gelar_lulusan"
              type="text"
              @input="clearError('gelar_lulusan')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.gelar_lulusan && !errors.gelar_lulusan,
                'border-red-400 bg-red-50': errors.gelar_lulusan,
                'border-gray-300': !errors.gelar_lulusan && !form.gelar_lulusan
              }"
              placeholder="Ahli Madya Kebidanan (A.Md.Keb)"
            />
            <p v-if="errors.gelar_lulusan" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.gelar_lulusan }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <Award class="w-4 h-4 text-gray-400" />
              No. SK Akreditasi <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.nomor_sk_akreditasi"
              type="text"
              @input="clearError('nomor_sk_akreditasi')"
              class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
              :class="{
                'border-green-400 bg-green-50': form.nomor_sk_akreditasi && !errors.nomor_sk_akreditasi,
                'border-red-400 bg-red-50': errors.nomor_sk_akreditasi,
                'border-gray-300': !errors.nomor_sk_akreditasi && !form.nomor_sk_akreditasi
              }"
              placeholder="SK No. 123/BAN-PT/Akred/D3/XII/2024"
            />
            <p v-if="errors.nomor_sk_akreditasi" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.nomor_sk_akreditasi }}
            </p>
          </div>
          <div>
            <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
              <BookOpen class="w-4 h-4 text-gray-400" />
              Biaya Kuliah <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rp</span>
              <input
                v-model="form.biaya_kuliah"
                type="text"
                inputmode="numeric"
                @input="onBiayaInput"
                class="w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
                :class="{
                  'border-green-400 bg-green-50': form.biaya_kuliah && !errors.biaya_kuliah,
                  'border-red-400 bg-red-50': errors.biaya_kuliah,
                  'border-gray-300': !errors.biaya_kuliah && !form.biaya_kuliah
                }"
                placeholder="5000000"
              />
            </div>
            <p v-if="errors.biaya_kuliah" class="flex items-center gap-1 text-xs text-red-500 mt-1">
              <AlertTriangle class="w-3 h-3" /> {{ errors.biaya_kuliah }}
            </p>
            <p class="text-xs text-gray-400 mt-1">Masukkan nominal tanpa titik (contoh: 5000000)</p>
          </div>
        </div>

        <div>
          <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
            <AlignLeft class="w-4 h-4 text-gray-400" />
            Deskripsi
          </label>
          <textarea
            v-model="form.deskripsi"
            rows="4"
            @input="clearError('deskripsi')"
            class="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            :class="{
              'border-green-400 bg-green-50': form.deskripsi && !errors.deskripsi,
              'border-red-400 bg-red-50': errors.deskripsi,
              'border-gray-300': !errors.deskripsi && !form.deskripsi
            }"
            placeholder="Masukkan deskripsi program studi"
          />
          <p v-if="errors.deskripsi" class="flex items-center gap-1 text-xs text-red-500 mt-1">
            <AlertTriangle class="w-3 h-3" /> {{ errors.deskripsi }}
          </p>
        </div>

        <div>
          <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
            <Eye class="w-4 h-4 text-gray-400" />
            Visi <span class="text-red-500">*</span>
          </label>
          <div
            :class="{
              'border rounded-lg overflow-hidden transition-colors': true,
              'border-green-400': form.visi && !errors.visi,
              'border-red-400': errors.visi,
              'border-gray-300': !errors.visi && !form.visi
            }"
          >
            <QuillEditor
              v-model:content="form.visi"
              content-type="html"
              :toolbar="quillToolbar"
              :style="{ minHeight: '120px' }"
              @update:content="clearError('visi')"
            />
          </div>
          <p v-if="errors.visi" class="flex items-center gap-1 text-xs text-red-500 mt-1">
            <AlertTriangle class="w-3 h-3" /> {{ errors.visi }}
          </p>
        </div>

        <div>
          <label class="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
            <ListChecks class="w-4 h-4 text-gray-400" />
            Misi <span class="text-red-500">*</span>
          </label>
          <div
            :class="{
              'border rounded-lg overflow-hidden transition-colors': true,
              'border-green-400': form.misi && !errors.misi,
              'border-red-400': errors.misi,
              'border-gray-300': !errors.misi && !form.misi
            }"
          >
            <QuillEditor
              v-model:content="form.misi"
              content-type="html"
              :toolbar="quillToolbar"
              :style="{ minHeight: '180px' }"
              @update:content="clearError('misi')"
            />
          </div>
          <p v-if="errors.misi" class="flex items-center gap-1 text-xs text-red-500 mt-1">
            <AlertTriangle class="w-3 h-3" /> {{ errors.misi }}
          </p>
        </div>

        <div class="flex items-center gap-2.5 pt-2">
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
    </div>

    <!-- view -->
    <div
      v-else-if="mode === 'view' && item"
      class="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div class="grid grid-cols-2 gap-6">
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Slug</p>
          <p class="text-sm font-medium text-gray-800">{{ item.slug }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Nama Program Studi</p>
          <p class="text-sm font-medium text-gray-800">{{ item.nama }}</p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6 mt-5 pt-5 border-t border-gray-100">
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Jenjang</p>
          <p class="text-sm font-medium text-gray-800">{{ item.jenjang || '-' }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Akreditasi</p>
          <p class="text-sm font-medium text-gray-800">{{ item.akreditasi || '-' }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Urutan</p>
          <p class="text-sm font-medium text-gray-800">{{ item.urutan ?? 0 }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mt-5 pt-5 border-t border-gray-100">
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Lama Studi</p>
          <p class="text-sm font-medium text-gray-800">{{ item.lama_studi || '-' }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Gelar Lulusan</p>
          <p class="text-sm font-medium text-gray-800">{{ item.gelar_lulusan || '-' }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mt-5 pt-5 border-t border-gray-100">
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">No. SK Akreditasi</p>
          <p class="text-sm font-medium text-gray-800">{{ item.nomor_sk_akreditasi || '-' }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Biaya Kuliah</p>
          <p class="text-sm font-medium text-gray-800">{{ item.biaya_kuliah || '-' }}</p>
        </div>
      </div>

      <div class="mt-5 pt-5 border-t border-gray-100">
        <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Deskripsi</p>
        <p class="text-sm text-gray-800">{{ item.deskripsi || '-' }}</p>
      </div>

      <div class="mt-5 pt-5 border-t border-gray-100">
        <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Visi</p>
        <div v-if="item.visi" class="text-sm text-gray-800 prose prose-sm max-w-none" v-html="item.visi"></div>
        <p v-else class="text-sm text-gray-400">-</p>
      </div>

      <div class="mt-5 pt-5 border-t border-gray-100">
        <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Misi</p>
        <div v-if="item.misi && item.misi.length" class="text-sm text-gray-800">
          <ol class="list-decimal list-inside space-y-1">
            <li v-for="(m, i) in item.misi" :key="i">{{ m }}</li>
          </ol>
        </div>
        <p v-else class="text-sm text-gray-400">-</p>
      </div>

      <div class="mt-5 pt-5 border-t border-gray-100">
        <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</p>
        <div class="flex items-center gap-1.5 mt-1">
          <CheckCircle2 v-if="item.is_active" class="w-4 h-4 text-green-500" />
          <XCircle v-else class="w-4 h-4 text-red-400" />
          <span class="text-sm font-medium" :class="item.is_active ? 'text-green-600' : 'text-red-500'">
            {{ item.is_active ? 'Aktif' : 'Tidak Aktif' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
