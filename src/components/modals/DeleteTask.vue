<template>
  <div>
    <button @click.stop="openModal" class="text-red-600 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path
          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
        />
      </svg>
    </button>

    <Transition>
      <div v-show="isOpen" class="bg-black/50 fixed inset-0 z-20 flex justify-center items-center">
        <div class="bg-neutral-900 flex flex-col rounded-xl p-10 w-md gap-6">
          <p class="text-3xl text-center">¿Deseas eliminar la tarea {{ props.title }}?</p>
          <div class="flex justify-center gap-4">
            <MainButton :loading="isDeleting" @buttonClick="deleteData">
              Confirmar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </MainButton>

            <MainButton variant="outline" @buttonClick="closeModal">
              Cancelar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                />
              </svg>
            </MainButton>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import MainButton from '@/components/common/MainButton.vue'
import { showToast } from '@/utils/alerts'
import TaskService from '@/service/TaskFacade'
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  idToDelete: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['refresh'])

const isOpen = ref(false)
const isDeleting = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

const deleteData = async () => {
  isDeleting.value = true
  try {
    await TaskService.deleteTask(props.idToDelete)
    showToast('success', `Tarea "${props.title}" eliminado correctamente`)
    emit('refresh')
    closeModal()
  } catch (error) {
    console.error('Error al eliminar la tarea:', error)
    showToast('error', `Error al eliminar la tarea`, error.response?.data?.message || error.message)
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped></style>
