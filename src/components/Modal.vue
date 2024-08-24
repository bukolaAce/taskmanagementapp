<script setup>
import { defineProps, defineEmits } from 'vue';
import EditTask from './EditTask.vue';

const props = defineProps({
  taskText: String,
  showModal: Boolean,
});

const emits = defineEmits(['saveEdit', 'cancelEdit']);

</script>

<template>
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black opacity-50" ></div>
    <transition-group class="relative z-10 w-full max-w-lg p-6 bg-blue-900 rounded-lg shadow-lg" tag="div" name="modal">
      <EditTask
        :taskText="taskText"
        @saveEdit="emits('saveEdit', $event)"
        @cancelEdit="emits('cancelEdit')"
      />
    </transition-group>
  </div>
</template>

<style>
.modal-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.modal-enter-to {
  opacity: 1;
  transform: scale(1);
}
.modal-enter-active {
  transition: all 0.5s ease;
}

/* existing transition */
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
.modal-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.modal-leave-active {
  transition: all 0.5s ease;
  position: absolute;
 
}
.modal-move {
  transition: all 0.5s ease;
}
</style>
