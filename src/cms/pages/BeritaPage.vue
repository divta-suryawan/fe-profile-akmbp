<script setup>
import { ref, computed } from 'vue'
import { Plus, Search, Edit3, Trash2, Eye, EyeOff } from 'lucide-vue-next'
import { useToast } from '../composables/useToast'
import Modal from '../components/Modal.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { dummyBerita } from '../data/dummyData'

const { success, error } = useToast()

const items = ref([...dummyBerita])
const search = ref('')
const showModal = ref(false)
const editingItem = ref(null)
const confirmDelete = ref({ show: false, item: null })
const deleting = ref(false)

const filteredItems = computed(() => {
  if (!search.value) return items.value
  const q = search.value.toLowerCase()
  return items.value.filter(
    (i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q),
  )
})

const form = ref({ title: '', category: '', status: 'draft', date: '', image: '', content: '' })

function openAdd() {
  editingItem.value = null
  form.value = { title: '', category: '', status: 'draft', date: '', image: '', content: '' }
  showModal.value = true
}

function openEdit(item) {
  editingItem.value = item
  form.value = { ...item }
  showModal.value = true
}

function save() {
  if (!form.value.title || !form.value.category) {
    error('Harap lengkapi data yang diperlukan')
    return
  }
  const data = { ...form.value }
  if (editingItem.value) {
    Object.assign(editingItem.value, data)
    success('Berita berhasil diperbarui')
  } else {
    data.id = Math.max(...items.value.map((i) => i.id)) + 1
    items.value.unshift(data)
    success('Berita berhasil ditambahkan')
  }
  showModal.value = false
}

function requestDelete(item) {
  confirmDelete.value = { show: true, item }
}

function confirmDeleteItem() {
  deleting.value = true
  setTimeout(() => {
    items.value = items.value.filter((i) => i.id !== confirmDelete.value.item.id)
    confirmDelete.value = { show: false, item: null }
    deleting.value = false
    success('Berita berhasil dihapus')
  }, 500)
}

function cancelDelete() {
  confirmDelete.value = { show: false, item: null }
}

function toggleStatus(item) {
  item.status = item.status === 'published' ? 'draft' : 'published'
  const msg = item.status === 'published' ? 'Berita dipublikasikan' : 'Berita diarsipkan'
  success(msg)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-navy font-display">Kelola Berita</h1>
        <p class="text-gray-500 text-sm mt-1">Kelola konten berita website</p>
      </div>
      <button
        @click="openAdd"
        class="flex items-center gap-2 bg-gold text-navy font-medium px-4 py-2.5 rounded-lg hover:bg-gold/90 transition-colors shadow-sm"
      >
        <Plus class="w-4 h-4" />
        Tambah Berita
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="p-4 border-b border-gray-100">
        <div class="relative max-w-sm">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            v-model="search"
            type="text"
            placeholder="Cari berita..."
            class="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/50">
              <th class="px-6 py-3">Judul</th>
              <th class="px-6 py-3">Kategori</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Tanggal</th>
              <th class="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="item in filteredItems"
              :key="item.id"
              class="hover:bg-gray-50/50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <p class="text-sm font-medium text-gray-900 line-clamp-1">{{ item.title }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                  {{ item.category }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'text-xs font-medium px-2.5 py-1 rounded-full border',
                    item.status === 'published'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200',
                  ]"
                >
                  {{ item.status === 'published' ? 'Terbit' : 'Draft' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ item.date }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button
                    @click="toggleStatus(item)"
                    class="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                    :title="item.status === 'published' ? 'Arsipkan' : 'Terbitkan'"
                  >
                    <Eye v-if="item.status === 'published'" class="w-4 h-4" />
                    <EyeOff v-else class="w-4 h-4" />
                  </button>
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
              <td colspan="5" class="px-6 py-12 text-center text-gray-400 text-sm">
                Tidak ada data berita
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Modal
      :open="showModal"
      :title="editingItem ? 'Edit Berita' : 'Tambah Berita'"
      @close="showModal = false"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Judul Berita <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.title"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            placeholder="Masukkan judul berita"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Kategori <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            >
              <option value="">Pilih kategori</option>
              <option>Akademik</option>
              <option>Prestasi</option>
              <option>Event</option>
              <option>Pengabdian</option>
              <option>Pengumuman</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            >
              <option value="draft">Draft</option>
              <option value="published">Terbit</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
            <input
              v-model="form.date"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
            <input
              v-model="form.image"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              placeholder="https://..."
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Konten</label>
          <textarea
            v-model="form.content"
            rows="5"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            placeholder="Masukkan konten berita (HTML)"
          />
        </div>
      </div>

      <template #footer>
        <button
          @click="showModal = false"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          @click="save"
          class="px-4 py-2 text-sm font-medium text-navy bg-gold rounded-lg hover:bg-gold/90 transition-colors"
        >
          {{ editingItem ? 'Simpan Perubahan' : 'Tambah Berita' }}
        </button>
      </template>
    </Modal>

    <ConfirmDialog
      :open="confirmDelete.show"
      title="Hapus Berita"
      :message="`Apakah Anda yakin ingin menghapus berita &quot;${confirmDelete.item?.title}&quot;? Tindakan ini tidak dapat dibatalkan.`"
      confirm-text="Ya, Hapus"
      :loading="deleting"
      @confirm="confirmDeleteItem"
      @cancel="cancelDelete"
    />
  </div>
</template>
