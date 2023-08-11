<template>
  <div class="flex flex-col bg-white rounded-md border-1 border-white p-4 w-1/2">
    <div class="flex bg-phpvms text-white rounded-full h-14 w-14 justify-center items-center">
      <slot />
    </div>
    <span class="text-lg font-medium text-gray-500 mt-4">{{ label }}</span>
    <h4 class="text-4xl mt-2 font-bold text-slate-900">{{ value }}</h4>
  </div>
</template>

<script setup>

defineProps({
  label: String,
  value: Number,
})

</script>
