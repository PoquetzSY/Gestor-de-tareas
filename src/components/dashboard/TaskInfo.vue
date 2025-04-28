<template>
  <Transition>
    <div
      v-show="props.isOpen"
      class="bg-black/50 fixed inset-0 z-20 flex justify-center items-center"
    >
      <div class="bg-neutral-900 flex flex-col rounded-xl p-7 w-lg gap-4">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold mb-4">
            {{ props.title }}
          </h2>
          <button @click="closeModal" class="focus:outline-0 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              />
            </svg>
          </button>
        </div>
        <div>
          <p class="text-sm text-gray-400 mb-2">Descripción</p>
          <p class="text-base text-white mb-4 line-clamp-3">{{ props.description }}</p>
          <div class="flex gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-400 mb-2">Vence el</p>
              <p class="text-base text-white mb-4">{{ props.expiration_date }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-400 mb-2">Prioridad</p>
              <p class="text-base text-white mb-4">{{ props.priority }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-400 mb-2">Estado</p>
              <p class="text-base text-white mb-4">{{ props.status }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-400 mb-2">Usuario</p>
              <p class="text-base text-white mb-4">{{ props.user }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  expiration_date: { type: String, required: true },
  priority: { type: String, default: 'baja' },
  id: { type: Number, required: true },
  status: { type: String, required: true },
  user: { type: String, required: true },
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<style scoped></style>
