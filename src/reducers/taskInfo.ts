import { createSlice } from "@reduxjs/toolkit";
import { InProgress } from "../components/InProgress";
import type { RootState, AppDispatch } from "../store";

interface tasksInfo {
  freshTasks: Array<task>;
  inProgressTasks: Array<task>;
  completedTasks: Array<task>;
  newTask: task;
  newNote: string;
  newSubTask: string;
}

interface task {
  title: string;
  status: string;
  notes: Array<string>;
  subTasks: Array<subtask>;
}

export interface subtask {
  text: string;
  completed: boolean;
}
const initialState: tasksInfo = {
  freshTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  newTask: {
    title: "",
    status: "",
    notes: [],
    subTasks: [],
  },
  newNote: "",
  newSubTask: "",
};

export const tasksInfo = createSlice({
  name: "tasksInfo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.freshTasks?.push(action.payload);
    },
    updateNewTaskTitle: (state, action) => {
      state.newTask.title = action.payload;
    },
    addFreshTask: (state, action) => {
      state.freshTasks.splice(action.payload.index, 0, action.payload.toAdd);
    },
    addInProgressTask: (state, action) => {
      state.inProgressTasks.splice(
        action.payload.index,
        0,
        action.payload.toAdd
      );
    },
    addCompletedTask: (state, action) => {
      state.completedTasks.splice(
        action.payload.index,
        0,
        action.payload.toAdd
      );
    },
    removeFreshTask: (state, action) => {
      state.freshTasks.splice(action.payload, 1);
    },
    removeInProgressTask: (state, action) => {
      state.inProgressTasks.splice(action.payload, 1);
    },
    removeCompletedTask: (state, action) => {
      state.completedTasks.splice(action.payload, 1);
    },
    addNoteToFreshTask: (state, action) => {
      state.freshTasks[action.payload.index].notes.push(action.payload.addNote);
    },
    addNoteToInProgressTask: (state, action) => {
      state.inProgressTasks[action.payload.index].notes.push(
        action.payload.addNote
      );
    },
    addNoteToCompletedTask: (state, action) => {
      state.completedTasks[action.payload.index].notes.push(
        action.payload.addNote
      );
    },
    updateNewNote: (state, action) => {
      state.newNote = action.payload;
    },
    addInProgressSubTask: (state, action) => {
      state.inProgressTasks[action.payload.index].subTasks.push(
        {text: action.payload.addSubTask, completed: false}
      );
    },
    addCompletedSubTask: (state, action) => {
      state.completedTasks[action.payload.index].subTasks.push(
        {text: action.payload.addSubTask, completed: false}
      );
    },
    addFreshSubTask: (state, action) => {
      state.freshTasks[action.payload.index].subTasks.push(
        {text: action.payload.addSubTask, completed: false}
      );
    },
    updateNewSubTask: (state, action) => {
      state.newSubTask = action.payload;
    },
    clearNewStates: (state) => {
      const newState = Object.assign({}, state);
      newState.newSubTask = '';
      newState.newNote = '';
      newState.newTask = {
        title: "",
        status: "",
        notes: [],
        subTasks: [],
      }
      return newState
    }
  },
});

export const {
  addTask,
  updateNewTaskTitle,
  addFreshTask,
  addInProgressTask,
  addCompletedTask,
  removeFreshTask,
  removeInProgressTask,
  removeCompletedTask,
  addNoteToInProgressTask,
  addNoteToCompletedTask,
  addNoteToFreshTask,
  updateNewNote,
  addInProgressSubTask,
  addCompletedSubTask,
  addFreshSubTask,
  updateNewSubTask,
  clearNewStates
} = tasksInfo.actions;

export default tasksInfo.reducer;
