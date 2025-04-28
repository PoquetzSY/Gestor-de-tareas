<template>
  <div class="bg-neutral-700 min-h-screen flex flex-col text-white py-6 px-4">
    <div class="flex flex-col md:flex-row justify-center md:justify-between items-center mb-6">
      <h1 class="text-2xl">Gestor de tareas</h1>
      <AddEditTask @refresh="fetchTasks"/>
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
        <option value="1">Baja</option>
        <option value="2">Media</option>
        <option value="3">Alta</option>
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
                :id="element.id"
                :user="element.user"
                :title="element.title"
                :description="element.description"
                :expiration_date="element.expiration_date"
                :priority_id="element.priority_id"
                :status_id="element.status_id"
                @refresh="fetchTasks"
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
                :id="element.id"
                :user="element.user"
                :title="element.title"
                :description="element.description"
                :expiration_date="element.expiration_date"
                :priority_id="element.priority_id"
                :status_id="element.status_id"
                @refresh="fetchTasks"
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
                :id="element.id"
                :user="element.user"
                :title="element.title"
                :description="element.description"
                :expiration_date="element.expiration_date"
                :priority_id="element.priority_id"
                :status_id="element.status_id"
                @refresh="fetchTasks"
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
import TaskService from '@/service/TaskFacade'
import { showToast } from '@/utils/alerts'
import { onMounted, ref } from 'vue'

const todo = ref([])
const inProgress = ref([])
const done = ref([])
const isLoading = ref(false)
const users = ref(['Ana', 'Luis', 'Carlos'])
const selectedUser = ref('')
const selectedPriority = ref('')

const fetchTasks = async () => {
  isLoading.value = true
  try {
    const response = await TaskService.getTasks()
    const tasks = response.tasks
    if (Array.isArray(tasks)) {
      todo.value = tasks.filter((task) => task.status_id === 1)
      inProgress.value = tasks.filter((task) => task.status_id === 2)
      done.value = tasks.filter((task) => task.status_id === 3)

      if (todo.value.length === 0 && inProgress.value.length === 0 && done.value.length === 0) {
        showToast('info', 'No hay tareas', 'No se encontraron tareas.')
      }
    } else {
      showToast('error', 'Error al cargar las tareas', 'Formato de tareas inválido.')
    }
  } catch (error) {
    console.error('Error al obtener las tareas:', error)
    showToast('error', 'Error al cargar las tareas', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchTasks)
</script>

<style scoped></style>
