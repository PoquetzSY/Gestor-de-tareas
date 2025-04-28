<template>
  <div>
    <MainButton v-show="!props.toUpdate" @buttonClick="openModal">
      Nueva tarea
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
    </MainButton>

    <button
      v-show="props.toUpdate"
      class="focus:outline-0 text-neutral-400 cursor-pointer"
      @click="openModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path
          d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
        />
      </svg>
    </button>

    <Transition>
      <div v-show="isOpen" class="bg-black/50 fixed inset-0 z-20 flex justify-center items-center">
        <div class="bg-neutral-900 flex flex-col rounded-xl p-7 w-lg gap-4">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold mb-4">
              {{ props.toUpdate ? 'Editar tarea' : 'Nueva tarea' }}
            </h2>
            <button @click="closeModal" class="focus:outline-0 cursor-pointer">
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
            </button>
          </div>

          <form class="flex flex-col gap-4 items-end" @submit.prevent="onSubmit">
            <CustomInput
              v-model="formData.title"
              :error-message="errors.title"
              id="title"
              label="Título"
            />
            <CustomInput
              v-model="formData.description"
              :error-message="errors.description"
              id="description"
              label="Descripción"
            />
            <MainButton type="submit">
              <span v-if="!isLoading">Guardar</span>
              <LoadingSpinner v-if="isLoading" />
            </MainButton>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '../common/LoadingSpinner.vue'
import MainButton from '../common/MainButton.vue'
import CustomInput from '@/components/form/CustomInput.vue'
import { useFormValidation } from '@/utils/FormValidator'
import { showToast } from '@/utils/alerts'
import { ref } from 'vue'

const props = defineProps({
  toUpdate: { type: Boolean, default: false },
  taskId: { type: Number, default: null },
})

const isOpen = ref(false)
const isLoading = ref(false)
const emit = defineEmits(['refresh'])

const formData = ref({
  title: '',
  description: '',
  assigned_users: [],
  status_id: 0,
})

const errors = ref({
  title: '',
  description: '',
  developers: '',
  status_id: '',
})

const openModal = async () => {
  if (props.toUpdate && props.taskId) {
    try {
      const response = await TaskService.getTask(props.taskId)
      formData.value = {
        title: response.data.title,
        description: response.data.description,
        assigned_users: response.data.assigned_users.map((user) => user.id),
        status_id: response.data.status_id,
      }
    } catch (error) {
      console.error('Error al cargar la tarea:', error)
      showToast('error', 'Error', 'No se pudo cargar la tarea')
      return
    }
  }
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    assigned_users: [],
    status_id: 1,
  }
  errors.value = {
    title: '',
    description: '',
    developers: '',
    status_id: '',
  }
}

const fieldValidations = {
  title: { message: 'El título es obligatorio' },
  description: { message: 'La descripción es obligatoria' },
}

const { validateForm } = useFormValidation(formData, errors, fieldValidations)

const validateDevs = () => {
  if (formData.value.assigned_users.length === 0) {
    errors.value.developers = 'Debes seleccionar al menos un desarrollador'
    return false
  }
  errors.value.developers = ''
  return true
}

const onSubmit = async () => {
  console.log('Form data:', formData.value)
  if (!validateForm() && !validateDevs()) return

  isLoading.value = true
  try {
    if (props.toUpdate && props.taskId) {
      delete formData.value.project_id
      await TaskService.updateTask(props.taskId, formData.value)
      showToast('success', 'Éxito', 'Tarea actualizada correctamente')
    } else {
      delete formData.value.status_id
      await TaskService.createTask(formData.value)
      showToast('success', 'Éxito', 'Tarea creada correctamente')
    }

    emit('refresh')
    closeModal()
  } catch (error) {
    console.error('Error al guardar tarea:', error)
    showToast('error', 'Error', 'No se pudo guardar la tarea')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
