<script setup>
import { defineProps, defineEmits, reactive } from "vue";

const props = defineProps({
  newTask: String,
});
const state = reactive({
  addModal: false,
});

const emits = defineEmits(["update:newTask", "addTask"]);

// Method to handle form submission
const submitTask = () => {
  if (props.newTask.trim() !== "") {
    emits("addTask");
    state.addModal = false;
    emits("update:newTask", ""); // Clear the input field after adding the task
  }
};

const toggleModal = (e) => {
  state.addModal = !state.addModal;
};
</script>

<template>
  <div class="flex items-center justify-center mt-8">
    <input
      type="submit"
      value=" Add a New Task"
      class="text-white bg-blue-900 border-none hover:bg-blue-800 btn btn-md"
      @click="toggleModal"
    />
  </div>
  <div
    v-if="state.addModal"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div
      class="relative z-10 w-full max-w-lg p-6 bg-blue-900 rounded-lg shadow-lg"
    >
      <form
        @submit.prevent="submitTask"
        class="flex flex-col items-center gap-2"
      >
        <input
          type="text"
          :value="props.newTask"
          @input="$emit('update:newTask', $event.target.value)"
          placeholder="Add a New Task"
          class="input input-bordered max-w-xs w-[70%] focus:outline-none bg-white text-black"
        />
        <div class="flex mt-4 space-x-4 text-center">
          <input
            type="submit"
            value="Submit"
            class="px-4 text-sm text-gray-800 bg-gray-200 rounded-lg cursor-pointer py-s2 hover:bg-gray-300 active:bg-gray-200"
          />
          <button
            class="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 active:bg-red-600"
            @click="toggleModal"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
