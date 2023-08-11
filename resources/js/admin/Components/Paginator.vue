<template>
<div class="flex items-center justify-between rounded-b-md border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ data.from }}</span> to
            <span class="font-medium">{{ data.to }}</span> of
            <span class="font-medium">{{ data.total }}</span> results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link :href="data.prev_page_url"
              class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="!data.prev_page_url" as="button">
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Previous</span>
            </Link>
            <template v-for="link in data.links">
              <Link :href="link.url" :class="{
                'relative z-10 inline-flex items-center border border-phpvms bg-blue-50 px-4 py-2 text-sm font-medium text-phpvms focus:z-20': link.active,
                'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20': !link.active
              }" v-if="link.label.length < 6">
              {{ link.label }}
              </Link>
            </template>
            <Link :href="data.next_page_url"
              class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="!data.next_page_url" as="button">
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Next</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
</template>


<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';

defineProps({
  data: Object
})
</script>
