<script setup>
import { defineProps } from 'vue';

defineProps({
  tasks:[],
})
</script>

<template>
  
   <transition>
        <div
          v-if="tasks.length === 0"
          class="p-3 mx-auto mt-10 text-xl font-bold text-center text-white bg-blue-900 rounded-md md:w-1/2"
        >
          <h1>No Task To Show</h1>
        </div>
      </transition>
</template>