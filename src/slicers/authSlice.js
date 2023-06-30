import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      if(state.userId){
        state.userId = action.payload.userId;
      } 
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const logState = () => (dispatch, getState) => {
  const state = getState().auth;
  console.log(state);
};

export default authSlice.reducer;
