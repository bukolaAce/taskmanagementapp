<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { DeleteTaskProps, DeleteTaskEmits } from '../types/Tasks';

const props = defineProps<DeleteTaskProps>();
const emits = defineEmits<DeleteTaskEmits>();

const deleteTask = () => {
  emits('deleteTask', props.taskIndex);
};
</script>

<template>
  <button
    @click="deleteTask"
    class="px-2 py-2 text-sm text-white bg-blue-800 border-none rounded sm:px-2 sm:text-md hover:bg-blue-700 sm:py-2"
  >
    Delete
  </button>
</template>