<template>
  <div
    :class="[
      'bg-neutral-800 border-neutral-800  border-l-4 border-2 text-white rounded-xl p-3 flex flex-col gap-2 hover:border-neutral-300 transition-all',
      priorityColor,
    ]"
  >
    <h3 class="text-lg">{{ props.title }}</h3>
    <p class="text-sm">{{ props.description }}</p>
    <div class="flex justify-between items-center">
      <span class="text-xs text-gray-400">Vence el: {{ props.expiration_date }}</span>
      <div class="flex gap-2 items-center">
        <AddEditTask :to-update="true" :task-id="props.id" />
        <DeleteTask :title="props.title" :id-to-delete="props.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AddEditTask from '../modals/AddEditTask.vue'
import DeleteTask from '../modals/DeleteTask.vue'

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
</script>

<style scoped></style>
