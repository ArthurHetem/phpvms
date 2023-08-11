<script setup>
import ToastListItem from "./ToastListItem.vue";
import { onUnmounted } from "vue";
import { router, usePage } from "@inertiajs/vue3";
import  toast from '../Stores/toast';

const page = usePage();

let removeFinishEventListener =  router.on('finish', () => {
    console.log(page.props.flash.success);
  if(page.props.flash.success || page.props.flash.error) {
    toast.add({message: page.props.flash.success || page.props.flash.error});
  }
})

onUnmounted(() => {
  removeFinishEventListener();
});

function remove(index) {
    toast.remove(index);
}
</script>

<template>
    <div class="fixed top-28 right-4 z-50 space-y-4 w-full max-w-xs">
      <ToastListItem
              v-for="(item, index) in toast.items"
              :key="index"
              :message="item.message"
              @remove="remove(index)"
      />
    </div>
</template>
