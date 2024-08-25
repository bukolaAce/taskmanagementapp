<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import DeleteTask from './DeleteTask.vue';
import { TaskListProps, TaskListEmits } from '../types/Tasks';

const props = defineProps<TaskListProps>();
const emits = defineEmits<TaskListEmits>();

</script>

<template>
  <transition-group
    tag="ul"
    name="list"
    class="relative flex flex-col items-center justify-center gap-4 mt-10"
  >
    <li
      v-for="(task, index) in tasks"
      :key="index"
      class="w-full md:w-[60%] bg-blue-900 rounded-md p-3 sm:text-xl text-lg font-bold flex items-center justify-between text-white f"
    >
      <div class="flex items-center flex-1 gap-2">
        <input
          type="checkbox"
          defaultChecked
          v-model="task.done"
          className="checkbox checkbox-md"
          @click="emits('toggleDone', index)"
        />
        <span :class="{ 'line-through': task.done } ">
          {{ task.text }}
        </span>
      </div>
      <div class="flex gap-2">
        <button
          @click="emits('editTask', index)"
          class="px-2 py-2 text-sm text-white bg-blue-800 border-none rounded sm:px-2 sm:text-md hover:bg-blue-700 sm:py-2"
        >
          Edit
        </button>
        <DeleteTask
          :taskIndex="index"
          @deleteTask="emits('deleteTask', $event)"
        />
      </div>
    </li>
  </transition-group>
</template>

<style>
/* list transition */
/* entering transition */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active {
  transition: all 0.5s ease;
}

/* existing transition */
.list-leave-from {
  opacity: 1;
  transform: scale(1);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.5s ease;
  position: absolute;
 
}
.list-move {
  transition: all 0.5s ease;
}
</style>