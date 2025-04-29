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
      @click.stop="openModal"
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
            <CustomSelect
              v-show="!props.toUpdate"
              v-model="formData.user_id"
              :error-message="errors.user_id"
              id="priority"
              label="Usuario asignado"
              :options="users"
            />
            <div class="flex items-center gap-2 w-full">
              <CustomSelect
                v-model="formData.priority_id"
                :error-message="errors.priority_id"
                id="priority"
                label="Nivel de prioridad"
                :options="priorityOptions"
              />
              <div class="flex flex-col gap-2 w-full">
                <label class="text-neutral-500 text-sm sm:text-base" for="expiration-date"
                  >Fecha de vencimiento</label
                >
                <input
                  class="border border-neutral-500 bg-neutral-800 py-2 px-4 text-sm sm:text-base rounded-2xl w-full focus:outline-0"
                  id="expiration-date"
                  type="date"
                  v-model="formData.expiration_date"
                />
              </div>
            </div>
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
import CustomSelect from '@/components/form/CustomSelect.vue'
import { useFormValidation } from '@/utils/FormValidator'
import { showToast } from '@/utils/alerts'
import TaskService from '@/service/TaskFacade'
import UserService from '@/service/UserFacade'
import { ref } from 'vue'

const props = defineProps({
  toUpdate: { type: Boolean, default: false },
  taskId: { type: Number, default: null },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  expiration_date: { type: String, default: '' },
  priority_id: { type: Number, default: 1 },
  status_id: { type: Number, default: 1 },
  user_id: { type: Number, default: null },
})

const isOpen = ref(false)
const isLoading = ref(false)
const users = ref([])
const emit = defineEmits(['refresh'])

const priorityOptions = [
  { id: 1, name: 'Baja' },
  { id: 2, name: 'Media' },
  { id: 3, name: 'Alta' },
]

const formData = ref({
  title: '',
  description: '',
  expiration_date: '',
  status_id: 1,
  priority_id: 1,
  user_id: null,
})

const errors = ref({
  title: '',
  description: '',
  expiration_date: '',
  priority_id: '',
  user_id: '',
})

const getUsers = async () => {
  try {
    const response = await UserService.getUsers()
    users.value = response.users
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
    showToast('error', 'Error al cargar los usuarios', error.message)
  }
}

const openModal = async () => {
  isOpen.value = true
  if (!props.toUpdate) {
    await getUsers()
  }
  if (props.toUpdate) {
    formData.value = {
      title: props.title,
      description: props.description,
      expiration_date: props.expiration_date,
      status_id: props.status_id,
      priority_id: props.priority_id,
      user_id: props.user_id,
    }
  } else {
    resetForm()
  }
}

const closeModal = () => {
  isOpen.value = false
  resetForm()
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    expiration_date: '',
    status_id: 1,
    priority_id: 1,
    user_id: null,
  }
  errors.value = {
    title: '',
    description: '',
    expiration_date: '',
    priority_id: '',
    user_id: '',
  }
}

const fieldValidations = {
  title: { message: 'El título es obligatorio' },
  description: { message: 'La descripción es obligatoria' },
  expiration_date: { message: 'La fecha de vencimiento es obligatoria' },
}

const { validateForm } = useFormValidation(formData, errors, fieldValidations)

const validatePriority = () => {
  if (!formData.value.priority_id) {
    errors.value.priority_id = 'El nivel de prioridad es obligatorio'
    return false
  }
  errors.value.priority_id = ''
  return true
}

const onSubmit = async () => {
  console.log('Form data:', formData.value)
  if (!validateForm() && !validatePriority()) return

  isLoading.value = true
  try {
    if (props.toUpdate && props.taskId) {
      delete formData.value.user_id
      await TaskService.updateTask(props.taskId, formData.value)
      showToast('success', 'Éxito', 'Tarea actualizada correctamente')
    } else {
      const response = await TaskService.createTask(formData.value)
      
      await TaskService.assignTaskToUser(
        response.task.id,
        formData.value.user_id
      )

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
