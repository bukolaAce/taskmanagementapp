<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import EditTask from './EditTask.vue';
import { TaskModalProps,TaskModalEmits } from '../types/Tasks';

const props = defineProps<TaskModalProps>();
const emits = defineEmits<TaskModalEmits>();

</script>

<template>
  <div v-if="showModal" class="flex items-center gap-2">
    <div
      class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
    >
      <div
        class="relative w-full max-w-lg p-6 bg-blue-900 rounded-lg shadow-lg"
      >
        <EditTask
          :taskText="taskText"
          @saveEdit="emits('saveEdit', $event)"
          @cancelEdit="emits('cancelEdit')"
        />
      </div>
    </div>
  </div>
</template>
