<template>
  <div class="bg-neutral-900 rounded-xl px-4 py-6 gap-4 flex flex-col grow max-w-96">
    <h2 class="text-lg">{{ props.title }}</h2>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style scoped></style>
