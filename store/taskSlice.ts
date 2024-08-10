import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "@/types";

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: []
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.items.push(action.payload);
    },
    toggleDone: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((task) =>
        task.id === action.payload ? {...task, done: !task.done} : task
      );
    },
    editTask: (state, action: PayloadAction<{id: number; data: Task}>) => {
      state.items = state.items.map((task) =>
        task.id === action.payload.id ? {...task, ...action.payload.data} : task
      );
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    }
  }
});

export const {
  fetchTasks: fetchTasksAction,
  addTask: addTaskAction,
  toggleDone: toggleDoneAction,
  editTask: editTaskAction,
  removeTask: removeTaskAction
} = tasksSlice.actions;

export default tasksSlice.reducer;
