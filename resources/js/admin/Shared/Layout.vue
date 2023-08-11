<template>
  <ToastList />
  <div class="flex flex-row min-h-screen bg-gray-300">
    <nav class="px-8 flex flex-col space-y-16 w-1/5 bg-phpvms items-center">
      <img :src="Logo" alt="phpvms logo" class="flex mt-8 max-h-14">
      <div class="flex flex-col space-y-3">
        <NavLink to="/admin" :active="$page.component === 'Dashboard'">
          <PresentationChartBarIcon class="mr-4 h-6" />Dashboard
        </NavLink>
        <NavDisclosure title="Operations">
          <NavLink to="/admin/pireps" is-on-drop-down>
            <CloudArrowUpIcon class="mr-4 h-6" />Pireps
          </NavLink>
          <NavLink to="/admin" is-on-drop-down>
            <PresentationChartBarIcon class="mr-4 h-6" />Dashboard
          </NavLink>
        </NavDisclosure>
      </div>
    </nav>
  <main class="flex flex-col w-full">
    <slot />
  </main>
</div>
</template>

<script setup>
import { CloudArrowUpIcon, PresentationChartBarIcon } from '@heroicons/vue/24/outline'

import Logo from '../../../../public/assets/img/logo_blue_bg.svg'
import NavLink from '../Components/NavLink.vue';
import NavDisclosure from '../Components/NavDisclosure.vue';
import ToastList from "../Components/ToastList.vue";

</script>
