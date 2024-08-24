<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  taskText: String,
});

const emits = defineEmits(["saveEdit", "cancelEdit"]);

const localTaskText = ref(props.taskText);

const saveEdit = () => {
  if (localTaskText.value.trim() !== "") {
    emits("saveEdit", localTaskText.value);
    taskText.value="";
  }
};

const cancelEdit = () => {
  emits("cancelEdit");
};
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <input
      v-model="localTaskText"
      type="text"
      placeholder="Type here"
      class="w-full max-w-xs text-black bg-white input input-bordered focus:outline-none"
    />
    <div class="flex mt-4 space-x-4 text-center">
      <button
        @click="saveEdit"
        type="button"
        class="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 active:bg-gray-200"
      >
        Save
      </button>
      <button
        @click="cancelEdit"
        type="button"
        class="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 active:bg-red-600"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
