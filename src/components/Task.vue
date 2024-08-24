 <script setup>
import { reactive, onMounted, watch } from 'vue';
import AddTask from './AddTask.vue';
import TaskList from './TaskList.vue';
import Modal from './Modal.vue';

const state = reactive({
  tasks: [],
  newTask: '',
  editingTaskIndex: null,
  editingTaskText: '',
  openModal: false,
});

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    state.tasks = JSON.parse(storedTasks);
  }
});

watch(
  () => state.tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  },
  { deep: true }
);

const addTask = () => {
  if (state.newTask.trim() !== '') {
    state.tasks.push({ text: state.newTask, done: false });
    state.newTask = '';
  }
};

const deleteTask = (index) => {
  state.tasks.splice(index, 1);
};

const editTask = (index) => {
  // console.log("Editing task at index:", index); Debugging log
  state.editingTaskIndex = index;
  state.editingTaskText = state.tasks[index].text;
  state.openModal = true;
};

const saveEdit = (updatedText) => {
  if (updatedText.trim() !== '') {
    state.tasks[state.editingTaskIndex].text = updatedText;
    state.editingTaskIndex = null;
    state.openModal = false;
  }
};

const cancelEdit = () => {
  state.editingTaskIndex = null;
  state.editingTaskText = '';
  state.openModal = false;
};

const toggleDone = (index) => {
  state.tasks[index].done = !state.tasks[index].done;
};
</script>

<template>
  <div class="flex justify-center w-full min-h-screen bg-blend-darken">
    <div class="flex-col justify-center w-4/5 sm:w-1/2">
      <AddTask
        :newTask="state.newTask"
        @update:newTask="state.newTask = $event"
        @addTask="addTask"
      />
      
      <!-- toast -->
      <transition name="toast">
        <div
          v-if="state.tasks.length === 0"
          class="p-3 mx-auto mt-10 text-xl font-bold text-center text-white bg-blue-900 rounded-md md:w-1/2"
        >
          <h1>No Task To Show</h1>
        </div>
      </transition>


      <TaskList
        :tasks="state.tasks"
        @editTask="editTask"
        @deleteTask="deleteTask"
        @toggleDone="toggleDone"
      />

      <Modal
        :taskText="state.editingTaskText"
        :showModal="state.openModal"
        @saveEdit="saveEdit"
        @cancelEdit="cancelEdit"
      />
    </div>
  </div>
</template>
<style>
.toast-enter-active {
  animation: wobble 2s ease;
}

@keyframes wobble {
  0% {
    transform: translateY(-60px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
    opacity: 1;
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(4px);
  }
  90% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
