<template>
<div class="bg-blue-100 flex p-4 rounded-md space-x-3">
    <div class="shrink-0">
        <InformationCircleIcon class="w-6 h-6 text-blue-700"/>
    </div>
    <div class="flex-1 space-y-2">
        <h2 class="font-medium text-blue-900">title</h2>
        <div class="text-sm text-blue-800">content</div>
    </div>
    <div class="shrink-0">
      <button class="text-blue-900/70 hover:text-blue-900 hover:bg-blue-200 p-[1/2] rounded-md">
          <XMarkIcon class="w-6 h-6"/>
      </button>
    </div>
</div>
</template>

<script setup>
import { InformationCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid';

</script>
