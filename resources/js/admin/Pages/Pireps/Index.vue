<template>
  <Head>
    <title>Pilot Reports</title>
  </Head>
  <PageHeader title="Pilot Reports" />
  <div class="flex flex-col w-full px-8 pt-6">
    <div class="flex flex-col w-full bg-white rounded-md border-1 border-1 p-4">
      <h3 class="text-2xl font-bold text-slate-900">Pilot Reports</h3>
      <div class="flex flex-col">
        <div
          class="grid grid-cols-3 gap-5 px-2 py-4 odd:bg-gray-200 border-b-2 border-b-phpvms first:border-t-2 first:rounded-t-md last:rounded-b-md"
          v-for="pirep in  pireps.data " :key="pirep.id">
          <div class="flex flex-col w-full justify-center border-r-2 border-gray-400">
            <h5 class="flex justify-center">
              <Link :href="`/admin/pireps/${pirep.id}/edit`"
                class="text-xl text-orange-400 font-medium mb-3 hover:text-orange-500 transition-all duration-150">{{
                  `${pirep.airline.icao +
                  pirep.flight_number +
                  '/C.' +
                  pirep.route_code +
                  '/L.' + pirep.route_leg}` }}</Link>
            </h5>

            <PirepBadge :pirep="pirep" />
          </div>
          <div class="flex flex-col">
            <h4 class="text-md text-slate-900"><span class="font-bold">Pilot</span> ({{ pirep.user_id }}) {{
              pirep.id }}</h4>
            <h4 class="text-md text-slate-900"><span class="font-bold">DEP</span> {{ pirep.dpt_airport_id }} <span
                class="font-bold">ARR</span> {{ pirep.arr_airport_id }}</h4>
            <h4 class="text-md text-slate-900"><span class="font-bold">Flight Time</span> {{
              minutesToTime(pirep.flight_time) }}</h4>
            <h4 class="text-md text-slate-900"><span class="font-bold">Aircraft</span> {{ pirep.aircraft.registration }}
              '{{ pirep.aircraft.name }}'
            </h4>
            <h4 class="text-md text-slate-900"><span class="font-bold">Flight Level</span> {{ pirep.level }}</h4>
            <h4 class="text-md text-slate-900"><span class="font-bold">Filed Using</span> {{ pirep.source_name }}</h4>
            <h4 class="text-md text-slate-900"><span class="font-bold">File Date</span> {{ new
              Date(pirep.created_at).toLocaleString('en-US') }}</h4>
          </div>
          <div class="flex justify-center items-end gap-4">
            <button class="p-2 text-white border border-green-500 bg-green-500 rounded-md" @click="sendForm(pirep, '2')" >Accept</button>
            <button class="p-2 text-white border border-orange-500 bg-orange-500 rounded-md" @click="sendForm(pirep, '6')">Reject</button>
            <Link href="" class="p-2 text-white border border-red-500 bg-red-500 rounded-md">Delete</Link>
            <Link href="" class="p-2 text-white border border-blue-500 bg-blue-500 rounded-md">Edit</Link>
            <a :href="'/pireps/' + pirep.id" class="p-2 text-white border border-green-500 bg-green-500 rounded-md flex"><EyeIcon class="w-4" />View Pirep</a>
          </div>
        </div>
      </div>
    </div>
      <Paginator :data="pireps" />
  </div>
</template>

<script setup>
import { EyeIcon } from '@heroicons/vue/20/solid';
import { router, useForm } from '@inertiajs/vue3';

import PirepBadge from '../../Components/PirepBadge.vue';
import Paginator from '../../Components/Paginator.vue';
import minutesToTime from '../../helpers/minutesToTime';
import Alert from "../../Components/Alert.vue";

defineProps({
    pireps: Object
})

const form = useForm({
    pirep_id: null,
    new_status: null,
})

function sendForm(pirep, new_status) {
    form.post('/admin/pireps/' + pirep.id + '/status', {
        data: {
            pirep_id: pirep.id,
            new_status: new_status,
        },
        onSuccess: () => {
            router.reload({ only: ['pireps'] })
        }
    })
}

</script>
