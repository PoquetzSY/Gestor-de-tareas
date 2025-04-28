<template>
  <div class="bg-neutral-700 min-h-screen flex flex-col text-white py-6 px-4">
    <h1 class="text-2xl">Gestor de tareas</h1>
    <section class="flex justify-between gap-10 p-4 container mx-auto">
      <TaskColumns title="Por hacer">
        <draggable v-model="todo" group="tasks" item-key="id" class="flex flex-col gap-2">
          <template #item="{ element }">
            <TaskCard :task="element" />
          </template>
        </draggable>
      </TaskColumns>

      <TaskColumns title="En progreso">
        <draggable v-model="inProgress" group="tasks" item-key="id" class="flex flex-col gap-2">
          <template #item="{ element }">
            <TaskCard :task="element" />
          </template>
        </draggable>
      </TaskColumns>

      <TaskColumns title="Completadas">
        <draggable v-model="done" group="tasks" item-key="id" class="flex flex-col gap-2">
          <template #item="{ element }">
            <TaskCard :task="element" />
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
  { id: 1, title: 'Tarea 1', description: 'Descripción de la tarea 1' },
  { id: 2, title: 'Tarea 2', description: 'Descripción de la tarea 2' },
])
const inProgress = ref([
  { id: 3, title: 'Tarea 3', description: 'Descripción de la tarea 3' },
  { id: 4, title: 'Tarea 4', description: 'Descripción de la tarea 4' },
])
const done = ref([
  { id: 5, title: 'Tarea 5', description: 'Descripción de la tarea 5' },
  { id: 6, title: 'Tarea 6', description: 'Descripción de la tarea 6' },
])

</script>

<style scoped></style>
