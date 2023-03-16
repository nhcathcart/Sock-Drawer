import { createSlice } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router';
import type { RootState, AppDispatch } from '../store'

interface loginInfo {
  username: string | undefined;
  password: string | undefined;
  isLoggedIn: boolean
}

const initialState: loginInfo = {
  username: undefined,
  password: undefined,
  isLoggedIn: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload
    },
    updatePassword: (state, action) => {
      state.password = action.payload
    },
    validateCreds: (state) => {
      if (state.username === 'test' && state.password === 'test') state.isLoggedIn = true;
    }
  },
})

export function validate () {
  return async function (dispatch : any, getState: any ){
    await dispatch(validateCreds());
    const { isLoggedIn } = getState().login
    return isLoggedIn
  }
}

export const { updateUsername, updatePassword, validateCreds } = loginSlice.actions

export default loginSlice.reducer