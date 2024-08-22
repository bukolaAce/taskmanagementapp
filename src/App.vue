<script setup>
import { reactive, onMounted, watch } from "vue";

const state = reactive({
  tasks: [],
  newTask: "",
  editingTaskIndex: null,
  editingTaskText: "",
  openModal: false,
});

onMounted(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    state.tasks = JSON.parse(storedTasks);
  }
});

// Watch the tasks array and update localStorage when it changes
watch(
  () => state.tasks,
  (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  { deep: true }
);

// Add a new task to the list
const addTask = () => {
  if (state.newTask.trim() !== "") {
    state.tasks.push({ text: state.newTask, done: false }); // Each task has a text and done property
    state.newTask = "";
  }
};

// Delete a task from the list
const deleteTask = (index) => {
  state.tasks.splice(index, 1);
};

// Start editing a task
const editTask = (index) => {
  state.editingTaskIndex = index;
  state.editingTaskText = state.tasks[index].text;
  state.openModal = true;
};

// Save the edited task
const saveEdit = () => {
  if (state.editingTaskText.trim() !== "") {
    state.tasks[state.editingTaskIndex].text = state.editingTaskText;
    state.editingTaskIndex = null;
    state.openModal = false;
  }
};

// Cancel the edit
const cancelEdit = () => {
  state.editingTaskIndex = null;
  state.editingTaskText = "";
  state.openModal = false;
};
</script>

<template>
  <div class="flex justify-center w-full min-h-screen bg-blend-darken">
    <div class="flex-col justify-center w-4/5 sm:w-1/2">
      <form
        @submit.prevent="addTask"
        class="flex items-center justify-center gap-2 mt-4"
      >
        <input
          type="text"
          v-model="state.newTask"
          placeholder="Type here"
          class="input input-bordered max-w-xs w-[70%] focus:outline-none bg-white text-black"
        />
        <input
          type="submit"
          value="Submit"
          class="text-white bg-blue-900 border-none hover:bg-blue-800 btn btn-md"
        />
      </form>

      <!-- Toast -->
      <transition>
        <div
          v-if="state.tasks.length === 0"
          class="p-3 mx-auto mt-10 text-xl font-bold text-center text-white bg-blue-900 rounded-md md:w-1/2"
        >
          <h1>No Task To Show</h1>
        </div>
      </transition>

      <transition-group
        name="task"
        tag="ul"
        class="flex flex-col items-center justify-center gap-4 mt-10"
      >
        <li
          v-for="(task, index) in state.tasks"
          :key="index"
          class="w-[90%] md:w-[60%] bg-blue-900 rounded-md p-3 text-xl font-bold flex items-center justify-between text-white"
        >
          <div class="flex items-center gap-2">
            <!-- Checkbox to mark task as done -->
            <input
              type="checkbox"
              v-model="task.done"
              class="w-5 h-5 text-blue-600 form-checkbox"
            />
            <span :class="{ 'line-through': task.done }">
              {{ task.text }}
            </span>
          </div>

          <div class="flex gap-2">
            <button
              @click="editTask(index)"
              class="px-4 py-2 text-white bg-blue-800 border-none btn hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              @click="deleteTask(index)"
              class="px-4 py-2 text-white bg-blue-800 border-none btn hover:bg-blue-700"
            >
              Delete
            </button>
          </div>
        </li>
      </transition-group>
    </div>

    <!-- Modal for editing tasks -->
    <div v-if="state.openModal" class="flex items-center gap-2">
      <div
        class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
      >
        <div
          class="relative w-full max-w-lg p-6 bg-blue-900 rounded-lg shadow-lg"
        >
          <div class="my-4 text-center">
            <input
              v-model="state.editingTaskText"
              type="text"
              placeholder="Type here"
              class="w-full max-w-xs text-black bg-white input input-bordered focus:outline-none"
            />
            <div class="mt-8 space-x-4 text-center">
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
        </div>
      </div>
    </div>
  </div>
</template>


<style>
/* Customizing Tailwind's default transition behavior */
.task-enter-active,
.task-leave-active {
  @apply transition duration-300 ease-in-out;
}

.task-enter-from {
  @apply opacity-0 -translate-y-5;
}

.task-enter-to {
  @apply opacity-100 translate-y-0;
}

.task-leave-from {
  @apply opacity-100 translate-y-0;
}

.task-leave-to {
  @apply opacity-0 translate-y-5;
}

.toast-enter-active {
  animation: wobble 0.5s ease;
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
