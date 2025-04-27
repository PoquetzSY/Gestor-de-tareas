<template>
  <div class="bg-neutral-800 h-screen flex items-center justify-center text-white">
    <form
      @submit.prevent="handleLogin"
      class="bg-neutral-700 px-10 py-6 rounded-md shadow-neutral-500/40 shadow-md w-80 flex flex-col items-center gap-4"
    >
      <h1 class="text-center text-2xl my-5">Gestor de tareas</h1>
      <div class="flex flex-col gap-3 w-full">
        <CustomInput id="email" type="email" placeholder="Correo electrónico" />
        <CustomInput id="password" type="password" placeholder="Contraseña" />
      </div>
      <button
        type="submit"
        class="transition-all hover:bg-neutral-500 border border-neutral-500 py-2 px-6 rounded-xl cursor-pointer w-fit"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import CustomInput from '@/components/form/CustomInput.vue'
</script>

<style scoped></style>
