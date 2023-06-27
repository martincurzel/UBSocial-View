import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userId: null,
  loginToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.loginToken = action.payload.loginToken;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
      state.loginToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const logState = () => (dispatch, getState) => {
  const state = getState().auth;
  console.log(state);
};

export default authSlice.reducer;
