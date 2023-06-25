<template>
  <div class="flex-col mx-auto w-full rounded-2xl">
    <Disclosure v-slot="{ open }">
      <DisclosureButton class="flex w-full rounded-xl px-6 py-3 text-base text-white hover:bg-blue-800"
        :class="{ 'bg-orange-400 rounded-b-none hover:bg-orange-500 text-slate-900': open }">
        <ChevronRightIcon :class="open ? 'rotate-90 transform' : ''" class="h-6 mr-4" />
        <span>{{ title }}</span>
      </DisclosureButton>
      <DisclosurePanel class="flex flex-col bg-white rounded-xl rounded-t-none pt-1">
        <slot />
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

defineProps({
  open: Boolean,
  title: String
})
</script>
