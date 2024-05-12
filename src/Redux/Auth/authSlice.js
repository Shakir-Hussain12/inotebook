import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers, fetchUser, registerUser, loginUser,
} from './authActions';

const initialState = {
  users: [],
  currentUser: {},
  token: '',
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = {};
      state.token = '';
      state.isLoading = false;
      localStorage.setItem('status', JSON.stringify(false));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => (
        { ...state, currentUser: payload }
      ))

      .addCase(fetchUser.rejected, (state, { error }) => ({ ...state, error: error.message }))

      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        const newUsers = [];
        const keys = Object.keys(payload);
        keys.map((key) => newUsers.push(payload[key]));

        return {
          ...state,
          users: newUsers,
          isLoading: false,
        };
      })

      .addCase(registerUser.pending, (state) => (
        { ...state, isLoading: true }
      ))

      .addCase(registerUser.fulfilled, (state) => (
        { ...state, isLoading: false }
      ))

      .addCase(registerUser.rejected, (state, { error }) => ({ ...state, error: error.message }))

      .addCase(loginUser.pending, (state) => (
        { ...state, isLoading: true }
      ))

      .addCase(loginUser.fulfilled, (state, { payload }) => {
        localStorage.setItem('status', JSON.stringify(true));
        return {
          ...state,
          isLoading: false,
          token: payload.token,
        };
      })

      .addCase(loginUser.rejected, (state, { error }) => (
        { ...state, error: error.message }
      ));
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
