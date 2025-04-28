<template>
  <div class="bg-neutral-800 h-screen flex items-center justify-center text-white">
    <form
      @submit.prevent="onsubmit"
      class="bg-neutral-700 px-10 py-6 rounded-md shadow-neutral-500/40 shadow-md w-80 flex flex-col items-center gap-4"
    >
      <h1 class="text-center text-2xl my-5">Gestor de tareas</h1>
      <div class="flex flex-col gap-3 w-full">
        <CustomInput
          id="email"
          v-model="formData.email"
          placeholder="Correo electrónico"
          type="email"
          :error-message="errors.email"
        />
        <CustomInput
          id="password"
          v-model="formData.password"
          placeholder="Contraseña"
          type="password"
          :error-message="errors.password"
        />
      </div>
      <button
        type="submit"
        class="transition-all hover:bg-neutral-500 border border-neutral-500 py-2 px-6 rounded-xl cursor-pointer w-fit"
      >
        <span v-if="!isLoading">Entrar</span>
        <LoadingSpinner v-if="isLoading" />
      </button>
    </form>
  </div>
</template>

<script setup>
import CustomInput from '@/components/form/CustomInput.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { useFormValidation } from '@/utils/FormValidator'
import AuthService from '@/service/AuthFacade'
import { showToast } from '@/utils/alerts'
import router from '@/router'
import { ref } from 'vue'

const isLoading = ref(false)

const formData = ref({
  email: '',
  password: '',
})

const errors = ref({
  email: '',
  password: '',
})

const fieldValidations = {
  email: {
    message: 'El correo electrónico es obligatorio',
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    message: 'La contraseña es obligatoria',
    customValidation: (value) =>
      value.length >= 8 || 'La contraseña debe ser de al menos 8 caracteres',
  },
}

const { validateForm } = useFormValidation(formData, errors, fieldValidations)

const onsubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    console.log('Iniciando sesión con:', formData.value)
    await AuthService.login(formData.value)

    const lastRoute = sessionStorage.getItem('lastAttemptedRoute')

    if (lastRoute) {
      sessionStorage.removeItem('lastAttemptedRoute')
      router.push(lastRoute)
    } else {
      router.push({ name: 'dashboard' })
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    showToast('error', 'Error al iniciar sesión', error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
