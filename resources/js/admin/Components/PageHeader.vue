<template>
  <div class="flex min-w-full bg-gray-100 h-24 border-gray-400 border-b-2 px-8 pt-4">
    <div class="flex w-full justify-between">
      <h1 class="text-gray-900 text-3xl font-medium pt-2">{{ title }}</h1>
      <div class="mr-1">
        <Menu as="div" class="relative inline-block text-left" v-slot="{ open }">
          <div>
            <MenuButton
              class="inline-flex w-full justify-center items-center rounded-3xl bg-phpvms px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <img :src="userAvatar" alt="user avatar" class="w-10 rounded-full mr-3 border-2 border-white" />
              {{ userName.split(' ')[0] }}
              <ChevronDownIcon class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true"  v-if="!open"/>
              <ChevronUpIcon class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" v-else/>
            </MenuButton>
          </div>

          <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
              class="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                <a href="/profile" :class="[
                  active ? 'bg-phpvms text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]">
                  <UserIcon :active="active" class="mr-2 h-5 w-5 text-phpvms" aria-hidden="true" />
                  Profile
                </a>
                </MenuItem>
              </div>
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                <a href="/logout" :class="[
                  active ? 'bg-phpvms text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]">
                  <LockClosedIcon :active="active" class="mr-2 h-5 w-5 text-phpvms" aria-hidden="true" />
                  Logout
                </a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/20/solid'
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue'

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { ChevronDownIcon, ChevronUpIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const page = usePage()

const userName = computed(() => page.props.user_name)

const userAvatar = computed(() => page.props.user_avatar)

defineProps({
  title: String,
})

</script>
