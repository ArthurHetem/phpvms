<template>
  <div class="flex w-20 justify-center mx-auto font-bold text-sm text-indigo-500 border-2 border-indigo-500 rounded-lg"
    v-if="pirep.state === 0">
    In Progress</div>
  <div class="flex w-20 justify-center mx-auto font-bold text-sm text-yellow-500 border-2 border-yellow-500 rounded-lg"
    v-else-if="pirep.state === 1">
    Pending Approval</div>
  <div class="flex w-20 justify-center mx-auto font-bold text-sm text-green-500 border-2 border-green-500 rounded-lg"
    v-else-if="pirep.state === 2">
    Accepted</div>
  <div class="flex w-20 justify-center mx-auto font-bold text-sm text-red-500 border-2 border-red-500 rounded-lg"
    v-else-if="pirep.state === 6">
    Rejected</div>
  <div class="flex w-20 justify-center mx-auto font-bold text-sm text-gray-500 border-2 border-gray-500 rounded-lg" v-else>
    Paused/Draft/Deleted</div>
</template>

<script setup>

defineProps({
  pirep: Object
})

</script>
