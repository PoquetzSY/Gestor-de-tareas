<template>
  <div
    @click.self="openModal"
    :class="[
      'bg-neutral-800 border-neutral-800 cursor-pointer border-l-4 border-2 text-white rounded-xl p-3 flex flex-col gap-2 hover:border-neutral-300 transition-all',
      priorityColor,
    ]"
  >
    <h3 class="md:text-lg text-base" @click.self="openModal">{{ props.title }}</h3>
    <p class="md:text-sm text-xs flex-1 line-clamp-3" @click.self="openModal">{{ props.description }}</p>
    <div class="flex justify-between items-center">
      <p class="text-xs text-gray-400" @click.self="openModal">Vence el: {{ props.expiration_date }}</p>
      <div class="flex gap-2 items-center z-20">
        <AddEditTask :to-update="true" :task-id="props.id" />
        <DeleteTask :title="props.title" :id-to-delete="props.id" />
      </div>
    </div>
  </div>
  <TaskInfo
    :isOpen="isOpen"
    :title="props.title"
    :description="props.description"
    :expiration_date="props.expiration_date"
    :priority="props.priority"
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
      const datePattern = /^\d{2}-\d{2}-\d{4}$/
      return datePattern.test(value)
    },
  },
  priority: {
    type: String,
    default: 'baja',
    validator: (value) => ['alta', 'media', 'baja'].includes(value),
  },
})

const priorityColor = computed(() => ({
  'border-l-blue-600': props.priority === 'baja',
  'border-l-yellow-600': props.priority === 'media',
  'border-l-red-600': props.priority === 'alta',
}))

const openModal = () => {
  isOpen.value = true
}
const isOpen = ref(false)
</script>

<style scoped></style>
