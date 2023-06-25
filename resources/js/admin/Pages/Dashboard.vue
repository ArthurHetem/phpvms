<template>
  <Head>
    <title>Dashboard</title>
  </Head>
  <PageHeader>
    <div class="flex w-full justify-between">
      <h1 class="text-gray-900 text-3xl font-medium">Dashboard</h1>
      <div class="flex bg-phpvms rounded-xl">
        <img src="" alt="" srcset="">
        {{ user }}
      </div>
    </div>
  </PageHeader>
  <div class="flex flex-col w-full px-8 pt-6">
    <!-- Cards -->
    <div class="flex w-full justify-between space-x-8">
      <div class="flex flex-col bg-white rounded-md border-1 border-white p-4 w-1/2">
        <div class="flex bg-phpvms text-white rounded-full h-14 w-14 justify-center items-center">
          <UsersIcon class="w-8 h-8" />
        </div>
        <span class="text-lg font-medium text-gray-500 mt-4">Pending pilots</span>
        <h4 class="text-4xl mt-2 font-bold text-slate-900">{{ pending_users }}</h4>
      </div>
      <div class="flex flex-col bg-white rounded-md border-1 border-white p-4 w-1/2">
        <div class="flex bg-phpvms text-white rounded-full h-14 w-14 justify-center items-center">
          <CloudArrowUpIcon class="w-8 h-8" />
        </div>
        <span class="text-lg font-medium text-gray-500 mt-4">Pending pireps</span>
        <h4 class="text-4xl mt-2 font-bold text-slate-900">{{ pending_pireps }}</h4>
      </div>
    </div>
    <!-- End Cards -->
    <div class="flex w-full mt-8 justify-between space-x-8">
      <div class="flex flex-col w-1/2 bg-white rounded-md border-1 border-1 p-4">
        <h3 class="text-2xl font-bold text-slate-900">Latest News</h3>
        <div class="flex flex-col space-y-0.5 p-2">
          <div class="flex flex-col pt-4 border-b border-b-gray-300" v-for="news in news.data">
            <div class="flex justify-between">
              <h4 class="text-lg font-bold text-slate-900">{{ news.subject }}</h4>
              <button v-on:click="router.delete('/admin/dashboard/news', {
                data: {
                  news_id: news.id
                }
              }, {
                onSuccess: () => {
                  router.reload({ only: ['news'] })
                }
              })"
                class="flex p-1 text-sm rounded-md bg-red-500 text-white font-normal cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed justify-center hover:bg-red-600 transition-all duration-150">
                <TrashIcon class="h-5 mr-1" /> Delete
              </button>
            </div>
            <div class="text-md font-normal text-slate-900 mt-2">
              {{ news.body }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-1/2 bg-white rounded-md border-1 border-1 p-4">
        <h3 class="text-2xl font-bold text-slate-900">Add News</h3>
        <form @submit.prevent="form.post('/admin/dashboard/news', {
          onSuccess: () => {
            form.reset()
            router.reload({ only: ['news'] })
          }
        })" class="flex flex-col space-y-4 mt-2">
          <div class="flex flex-col p-1 w-full">
            <label for="subject" class="p-1 font-normal text-gray-500 text-md">Subject</label>
            <input type="text" v-model="form.subject"
              class="flex rounded-md p-2 w-full bg-gray-100 border-2 border-gray-400 focus:ring focus:ring-phpvms text-slate-900"
              name="subject">
            <div v-if="form.errors.subject">{{ form.errors.subject }}</div>
          </div>
          <div class="flex flex-col p-1 w-full">
            <label for="body" class="p-1 font-normal text-gray-500 text-md">Body</label>
            <textarea v-model="form.body" name="body"
              class="flex rounded-md p-2 w-full bg-gray-100 border-2 border-gray-400 focus:ring focus:ring-phpvms text-slate-900"></textarea>
            <div v-if="form.errors.body">{{ form.errors.body }}</div>
          </div>
          <!-- submit -->
          <button type="submit" :disabled="form.processing"
            class="flex p-2 rounded-md bg-green-500 text-white font-bold cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed justify-center hover:bg-green-600 transition-all duration-150">
            <PlusIcon class="h-6 text-white mr-1" /> Add
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>

import { Head, useForm, router, usePage } from '@inertiajs/vue3';
import { UsersIcon, CloudArrowUpIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

defineProps({
  errors: Object,
  news: Object,
  pending_pireps: Number,
  pending_users: Number,
  cron_problem_exists: Boolean
})

const form = useForm({
  subject: null,
  body: null,
})

const page = usePage()

const user = computed(() => page.props.auth.user)

console.log(page.props.auth.country);

</script>
