import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers, fetchUser, registerUser, loginUser,
} from './authActions';

const initialState = {
  users: [],
  currentUser: {},
  token: '',
  error: null,
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
      localStorage.setItem('auth', JSON.stringify(false));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => (
        { ...state, currentUser: payload, error: null }
      ))
      .addCase(fetchUser.rejected, (state, { payload }) => ({ ...state, error: payload }))

      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        const newUsers = [];
        const keys = Object.keys(payload);
        keys.map((key) => newUsers.push(payload[key]));

        return {
          ...state,
          users: newUsers,
          isLoading: false,
          error: null,
        };
      })
      .addCase(fetchUsers.rejected, (state, { payload }) => ({ ...state, error: payload }))

      .addCase(registerUser.pending, (state) => (
        { ...state, isLoading: true, error: null }
      ))
      .addCase(registerUser.fulfilled, (state) => (
        { ...state, isLoading: false, error: null }
      ))
      .addCase(registerUser.rejected, (state, { payload }) => ({ ...state, error: payload }))

      .addCase(loginUser.pending, (state) => (
        { ...state, isLoading: true, error: null }
      ))
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        localStorage.setItem('status', JSON.stringify(true));
        localStorage.setItem('auth', JSON.stringify(true));
        return {
          ...state,
          isLoading: false,
          token: payload,
          error: null,
        };
      })
      .addCase(loginUser.rejected, (state, { payload }) => ({ ...state, error: payload }));
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
