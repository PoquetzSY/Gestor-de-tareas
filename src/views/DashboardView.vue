<template>
  <div class="bg-neutral-700 min-h-screen flex flex-col text-white py-6 px-4">
    <h1 class="text-2xl">Gestor de tareas</h1>
    <div class="flex gap-4 mb-6">
      <select v-model="selectedUser" class="text-black p-2 rounded">
        <option value="">Todos los usuarios</option>
        <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
      </select>

      <select v-model="selectedPriority" class="text-black p-2 rounded">
        <option value="">Todas las prioridades</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
    </div>

    <section class="flex justify-between gap-10 p-4 container mx-auto">
      <TaskColumns title="Por hacer">
        <draggable v-model="todo" group="tasks" item-key="id" class="flex flex-col gap-2">
          <template #item="{ element }">
            <TaskCard
              :title="element.title"
              :description="element.description"
              :dueDate="element.dueDate"
              :priority="element.priority"
            />
          </template>
        </draggable>
      </TaskColumns>

      <TaskColumns title="En progreso">
        <draggable v-model="inProgress" group="tasks" item-key="id" class="flex flex-col gap-4">
          <template #item="{ element }">
            <TaskCard
              :title="element.title"
              :description="element.description"
              :dueDate="element.dueDate"
              :priority="element.priority"
            />
          </template>
        </draggable>
      </TaskColumns>

      <TaskColumns title="Completadas">
        <draggable v-model="done" group="tasks" item-key="id" class="flex flex-col gap-2">
          <template #item="{ element }">
            <TaskCard
              :title="element.title"
              :description="element.description"
              :dueDate="element.dueDate"
              :priority="element.priority"
            />
          </template>
        </draggable>
      </TaskColumns>
    </section>
  </div>
</template>

<script setup>
import TaskCard from '@/components/dashboard/TaskCard.vue'
import TaskColumns from '@/components/dashboard/TaskColumns.vue'

import draggable from 'vuedraggable'

import { ref } from 'vue'
const todo = ref([
  {
    id: 1,
    title: 'Tarea 1',
    description: 'Descripción de la tarea 1',
    dueDate: '08-10-2025',
    priority: 'baja',
  },
  {
    id: 2,
    title: 'Tarea 2',
    description: 'Descripción de la tarea 2',
    dueDate: '08-10-2025',
    priority: 'media',
  },
])
const inProgress = ref([
  {
    id: 3,
    title: 'Tarea 3',
    description: 'Descripción de la tarea 3',
    dueDate: '08-10-2025',
    priority: 'alta',
  },
])
const done = ref([
  {
    id: 4,
    title: 'Tarea 4',
    description: 'Descripción de la tarea 4',
    dueDate: '08-10-2025',
    priority: 'baja',
  },
])
</script>

<style scoped></style>
