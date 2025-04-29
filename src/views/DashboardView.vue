<template>
  <div class="bg-neutral-700 min-h-screen flex flex-col text-white py-6 px-4">
    <div class="flex flex-col md:flex-row justify-center md:justify-between items-center mb-6">
      <h1 class="text-2xl">Gestor de tareas</h1>
      <AddEditTask @refresh="fetchTasks" />
    </div>

    <div class="flex flex-col md:flex-row justify-center gap-4 mb-6">
      <select v-model="selectedUser" class="p-2 rounded bg-neutral-800 outline-none border-none">
        <option value="">Todos los usuarios</option>
        <option v-for="user in users" :key="user" :value="user.name">{{ user.name }}</option>
      </select>

      <select
        v-model="selectedPriority"
        class="p-2 rounded bg-neutral-800 outline-none border-none"
      >
        <option :value="0">Todas las prioridades</option>
        <option :value="1">Baja</option>
        <option :value="2">Media</option>
        <option :value="3">Alta</option>
      </select>
    </div>

    <section
      class="flex flex-wrap md:flex-row justify-center md:justify-between gap-5 md:gap-10 p-4 container mx-auto"
    >
      <TaskColumns title="Por hacer">
        <draggable
          ref="todoList"
          v-model="todo"
          group="tasks"
          item-key="id"
          class="flex flex-col gap-2"
          @end="onTaskDrop"
        >
          <template #item="{ element }">
            <div
              v-if="
                (selectedUser === '' || element.users[0].name === selectedUser) &&
                (selectedPriority === 0 || element.priority_id === selectedPriority)
              "
            >
              <TaskCard
                :id="element.id"
                :user="element.users[0].name"
                :user_id="element.users[0].id"
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
        <draggable
          ref="inProgressList"
          v-model="inProgress"
          group="tasks"
          item-key="id"
          class="flex flex-col gap-2"
          @end="onTaskDrop"
        >
          <template #item="{ element }">
            <div
              v-if="
                (selectedUser === '' || element.users[0].name === selectedUser) &&
                (selectedPriority === 0 || element.priority_id === selectedPriority)
              "
            >
              <TaskCard
                :id="element.id"
                :user="element.users[0].name"
                :user_id="element.users[0].id"
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
        <draggable
          ref="doneList"
          v-model="done"
          group="tasks"
          item-key="id"
          class="flex flex-col gap-2"
          @end="onTaskDrop"
        >
          <template #item="{ element }">
            <div
              v-if="
                (selectedUser === '' || element.users[0].name === selectedUser) &&
                (selectedPriority === 0 || element.priority_id === selectedPriority)
              "
            >
              <TaskCard
                :id="element.id"
                :user="element.users[0].name"
                :user_id="element.users[0].id"
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
import UserService from '@/service/UserFacade'

const todo = ref([])
const inProgress = ref([])
const done = ref([])
const todoList = ref(null)
const inProgressList = ref(null)
const doneList = ref(null)
const isLoading = ref(false)
const users = ref([])
const selectedUser = ref('')
const selectedPriority = ref(0)

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

const onTaskDrop = async (event) => {
  const movedTask = event.item.__draggable_context?.element
  const to = event.to

  if (!movedTask) {
    console.error('No se encontró la tarea movida.')
    return
  }

  let destinationStatusId = 1

  if (to === todoList.value?.$el) {
    destinationStatusId = 1
  } else if (to === inProgressList.value?.$el) {
    destinationStatusId = 2
  } else if (to === doneList.value?.$el) {
    destinationStatusId = 3
  }

  console.log('Status destino:', destinationStatusId)

  try {
    await TaskService.changeTaskStatus(movedTask.id, destinationStatusId)

    showToast('success', 'Tarea actualizada', 'El estado de la tarea se actualizó correctamente.')
  } catch (error) {
    console.error('Error al actualizar el estado de la tarea:', error)
    showToast('error', 'Error', 'No se pudo actualizar el estado de la tarea.')

    await fetchTasks()
  }
}

const getUsers = async () => {
  try {
    const response = await UserService.getUsers()
    users.value = response.users
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
    showToast('error', 'Error al cargar los usuarios', error.message)
  }
}

onMounted(() => {
  fetchTasks()
  getUsers()
})
</script>
