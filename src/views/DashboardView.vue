<template>
  <div class="bg-neutral-700 min-h-screen flex flex-col text-white py-6 px-4">
    <h1 class="text-2xl">Gestor de tareas</h1>
    <section class="flex justify-between gap-10 p-4 container mx-auto">
      <TaskColumns title="Por hacer">
        <TaskCard />
      </TaskColumns>
      <TaskColumns title="En progreso">
        <TaskCard />
      </TaskColumns>
      <TaskColumns title="Completadas">
        <TaskCard />
      </TaskColumns>
    </section>
  </div>
</template>

<script setup>
import TaskCard from '@/components/dashboard/TaskCard.vue'
import TaskColumns from '@/components/dashboard/TaskColumns.vue'
</script>

<style scoped></style>
