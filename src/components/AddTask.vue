<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  newTask: String,
});

const emits = defineEmits(['update:newTask', 'addTask']);

// Method to handle form submission
const submitTask = () => {
  if (props.newTask.trim() !== '') {
    emits('addTask');
    emits('update:newTask', ''); // Clear the input field after adding the task
  }
};
</script>

<template>
  <form @submit.prevent="submitTask" class="flex items-center justify-center gap-2 mt-4">
    <input
      type="text"
      :value="props.newTask"
      @input="$emit('update:newTask', $event.target.value)"
      placeholder="Type here"
      class="input input-bordered max-w-xs w-[70%] focus:outline-none bg-white text-black"
    />
    <input
      type="submit"
      value="Submit"
      class="text-white bg-blue-900 border-none hover:bg-blue-800 btn btn-md"
    />
  </form>
</template>
