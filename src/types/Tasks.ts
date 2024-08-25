export interface Task {
  text: string;
  done: boolean;
}

export interface EditTaskProps {
  taskText: string;
}

export interface EditTaskEmits {
  (event: "saveEdit", updatedText: string): void;
  (event: "cancelEdit"): void;
}

export interface DeleteTaskProps {
  taskIndex: number;
}

export interface DeleteTaskEmits {
  (event: "deleteTask", index: number): void;
}

export interface TaskModalProps {
  taskText: string;
  showModal: boolean;
}

export interface TaskModalEmits {
  (event: "saveEdit", updatedText: string): void;
  (event: "cancelEdit"): void;
}

export interface TaskListProps {
  tasks: Task[];
}

export interface TaskListEmits {
  (event: "editTask", index: number): void;
  (event: "deleteTask", index: number): void;
  (event: "toggleDone", index: number): void;
}

export interface AppState {
  tasks: Task[];
  newTask: string;
  editingTaskIndex: number | null;
  editingTaskText: string;
  openModal: boolean;
}
