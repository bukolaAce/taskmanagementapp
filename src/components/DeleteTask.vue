<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  taskIndex: Number,
});

const emits = defineEmits(['deleteTask']);

const deleteTask = () => {
  emits('deleteTask', props.taskIndex);
};
</script>

<template>
  <button
    @click="deleteTask"
    class="px-4 py-2 text-white bg-blue-800 border-none btn hover:bg-blue-700"
  >
    Delete
  </button>
</template>
