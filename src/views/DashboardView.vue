<template>
  <div class="bg-neutral-700 min-h-screen flex flex-col text-white py-6 px-4">
    <div class="flex flex-col md:flex-row justify-center md:justify-between items-center mb-6">
      <h1 class="text-2xl">Gestor de tareas</h1>
      <AddEditTask />
    </div>
    <div class="flex flex-col md:flex-row justify-center gap-4 mb-6">
      <select v-model="selectedUser" class="p-2 rounded bg-neutral-800 outline-none border-none">
        <option value="">Todos los usuarios</option>
        <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
      </select>

      <select
        v-model="selectedPriority"
        class="p-2 rounded bg-neutral-800 outline-none border-none"
      >
        <option value="">Todas las prioridades</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
    </div>

    <section
      class="flex flex-wrap md:flex-row justify-center md:justify-between gap-5 md:gap-10 p-4 container mx-auto"
    >
      <TaskColumns title="Por hacer">
        <draggable v-model="todo" group="tasks" item-key="id" class="flex flex-col gap-2">
          <template #item="{ element }">
            <div
              v-if="
                (selectedUser === '' || element.user === selectedUser) &&
                (selectedPriority === '' || element.priority === selectedPriority)
              "
            >
              <TaskCard
                :title="element.title"
                :description="element.description"
                :expiration_date="element.expiration_date"
                :priority="element.priority"
              />
            </div>
          </template>
        </draggable>
      </TaskColumns>

      <TaskColumns title="En progreso">
        <draggable v-model="inProgress" group="tasks" item-key="id" class="flex flex-col gap-2">
          <template #item="{ element }">
            <div
              v-if="
                (selectedUser === '' || element.user === selectedUser) &&
                (selectedPriority === '' || element.priority === selectedPriority)
              "
            >
              <TaskCard
                :title="element.title"
                :description="element.description"
                :expiration_date="element.expiration_date"
                :priority="element.priority"
              />
            </div>
          </template>
        </draggable>
      </TaskColumns>

      <TaskColumns title="Completadas">
        <draggable v-model="done" group="tasks" item-key="id" class="flex flex-col gap-2">
          <template #item="{ element }">
            <div
              v-if="
                (selectedUser === '' || element.user === selectedUser) &&
                (selectedPriority === '' || element.priority === selectedPriority)
              "
            >
              <TaskCard
                :title="element.title"
                :description="element.description"
                :expiration_date="element.expiration_date"
                :priority="element.priority"
              />
            </div>
          </template>
        </draggable>
      </TaskColumns>
    </section>
  </div>
</template>

<script setup>
import TaskCard from '@/components/dashboard/TaskCard.vue'
import AddEditTask from '@/components/modals/AddEditTask.vue'
import TaskColumns from '@/components/dashboard/TaskColumns.vue'
import draggable from 'vuedraggable'
import { ref } from 'vue'

const todo = ref([
  {
    id: 1,
    title: 'Tarea 1',
    description: 'Descripción de la tarea 1',
    expiration_date: '08-10-2025',
    priority: 'baja',
    user: 'Ana',
  },
  {
    id: 2,
    title: 'Tarea 2',
    description: 'Descripción de la tarea 2',
    expiration_date: '08-10-2025',
    priority: 'media',
    user: 'Carlos',
  },
])
const inProgress = ref([
  {
    id: 3,
    title: 'Tarea 3',
    description: 'Descripción de la tarea 3',
    expiration_date: '08-10-2025',
    priority: 'alta',
    user: 'Carlos',
  },
])
const done = ref([
  {
    id: 4,
    title: 'Tarea 4',
    description: 'Descripción de la tarea 4',
    expiration_date: '08-10-2025',
    priority: 'baja',
    user: 'Ana',
  },
  {
    id: 5,
    title: 'Tarea 5',
    description:
      'Descripción de la tarea 5 sdfsdkfjbskujfskjdhfkjsdfjkhsdfsddffffffffffffffffffffffffffffffffffffffffffffffffffffsjfskdfskdfsdfsdfsfsdfsdf fsjhjsdfjsdfjhsfhsjfjdsfh sdfjsdfjsjdfjsfjsfj sdfjsjdfjsfjsfj',
    expiration_date: '08-10-2025',
    priority: 'media',
    user: 'Luis',
  },
  {
    id: 6,
    title: 'Tarea 6',
    description: 'Descripción de la tarea 6',
    expiration_date: '08-10-2025',
    priority: 'alta',
    user: 'Carlos',
  },
])
const users = ref(['Ana', 'Luis', 'Carlos'])
const selectedUser = ref('')
const selectedPriority = ref('')
</script>

<style scoped></style>
