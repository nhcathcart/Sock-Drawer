import { createSlice } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from '../store'

interface viewChoice {
  fresh: boolean;
  inProgress: boolean;
  completed: boolean;
  dashboard: boolean
}

const initialState: viewChoice = {
  fresh: false,
  inProgress: false,
  completed: false,
  dashboard: false,
}

export const viewChoice = createSlice({
  name: 'viewChoice',
  initialState,
  reducers: {
    chooseFresh: (state) => {
        const newState = Object.assign({}, initialState);
        newState.fresh = true;
        return newState;
    },
    chooseInProgress: (state) => {
        const newState = Object.assign({}, initialState);
        newState.inProgress = true;
        return newState;
    },
    chooseCompleted: (state) => {
        const newState = Object.assign({}, initialState);
        newState.completed = true;
        return newState;
    },
    chooseDashboard: (state) => {
        const newState = Object.assign({}, initialState);
        newState.dashboard = true;
        return newState;
    },
  },
})



export const { chooseFresh, chooseInProgress, chooseCompleted, chooseDashboard } = viewChoice.actions

export default viewChoice.reducer