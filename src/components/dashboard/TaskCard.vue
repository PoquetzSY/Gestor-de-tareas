<template>
  <div
    @click.self="openModal"
    :class="[
      'bg-neutral-800 border-neutral-800 cursor-pointer border-l-4 border-2 text-white rounded-xl p-3 flex flex-col gap-2 hover:border-neutral-300 transition-all',
      priorityColor,
    ]"
  >
    <h3 class="md:text-lg text-base" @click.self="openModal">{{ props.title }}</h3>
    <p class="md:text-sm text-xs flex-1 line-clamp-3" @click.self="openModal">
      {{ props.description }}
    </p>
    <div class="flex justify-between items-center">
      <p class="text-xs text-gray-400" @click.self="openModal">
        Vence el: {{ props.expiration_date }}
      </p>
      <div class="flex gap-2 items-center z-10">
        <AddEditTask
          :to-update="true"
          :task-id="props.id"
          :title="props.title"
          :description="props.description"
          :expiration_date="props.expiration_date"
          :priority_id="props.priority_id"
          :status_id="props.status_id"
          :user_id="props.user_id"
          @refresh="emit('refresh')"
        />
        <DeleteTask :title="props.title" :id-to-delete="props.id" @refresh="emit('refresh')"/>
      </div>
    </div>
  </div>
  <TaskInfo
    :isOpen="isOpen"
    :title="props.title"
    :description="props.description"
    :expiration_date="props.expiration_date"
    :priority="priority"
    :id="props.id"
    :status="status"
    :user="user"
    @close="isOpen = false"
  />
</template>

<script setup>
import { computed } from 'vue'
import { ref } from 'vue'
import AddEditTask from '../modals/AddEditTask.vue'
import DeleteTask from '../modals/DeleteTask.vue'
import TaskInfo from './TaskInfo.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: String,
    required: true,
    validator: (value) => {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/
      return datePattern.test(value)
    },
  },
  priority_id: {
    type: Number,
    required: true,
  },
  status_id: {
    type: Number,
    required: true,
  },
  user: {
    type: String,
    default: 'Sin asignar',
  },
  user_id: {
    type: Number,
    default: null,
  },
})

const priorityColor = computed(() => ({
  'border-l-blue-600': props.priority_id === 1,
  'border-l-yellow-600': props.priority_id === 2,
  'border-l-red-600': props.priority_id === 3,
}))

const status = computed(() => {
  switch (props.status_id) {
    case 1:
      return 'Por hacer'
    case 2:
      return 'En progreso'
    case 3:
      return 'Completada'
    default:
      return 'Sin estado'
  }
})

const priority = computed(() => {
  switch (props.priority_id) {
    case 1:
      return 'Baja'
    case 2:
      return 'Media'
    case 3:
      return 'Alta'
    default:
      return 'Sin prioridad'
  }
})

const openModal = () => {
  isOpen.value = true
}
const isOpen = ref(false)

const emit = defineEmits(['refresh'])
</script>

<style scoped></style>
