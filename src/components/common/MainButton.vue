<template>
  <button
    class="border border-gray-500 hover:bg-gray-500 text-neutral-200 px-4 py-2 flex items-center gap-2 font-semibold rounded-xl text-center transition-all focus:outline-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    :disabled="isLoading"
    @click="emitClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['buttonClick'])

const emitClick = () => {
  if (!props.isLoading) emit('buttonClick')
}
</script>

<style scoped>
.outline-button {
  border: 1px solid #9ca3af;
}
</style>
