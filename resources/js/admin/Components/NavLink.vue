<template>
  <Link :href="to" class="text-base flex w-full rounded-xl" :class="{
    'text-white': !active,
    'bg-orange-400 text-gray-700 p-2 rounded-xl hover:bg-orange-400': active,
    'px-6 py-3 hover:bg-blue-800': !isOnDropDown,
    'text-slate-900 px-6 py-2 hover:bg-gray-300 rounded-md last:rounded-b-xl border-b border-gray-300': isOnDropDown
  }">
  <slot />
  </Link>
</template>


<script setup>

defineProps({
  to: String,
  active: Boolean,
  isOnDropDown: Boolean,
})

</script>
