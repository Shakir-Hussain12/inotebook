import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers, fetchUser, registerUser, loginUser,
} from './authActions';

const initialState = {
  users: [],
  currentUser: {},
  token: '',
  isLoading: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = {};
      state.token = '';
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => (
        { ...state, currentUser: payload }
      ))
      .addCase(fetchUser.rejected, (state, { error }) => ({ ...state, error: error.message }))
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const { payload } = action;
        const keys = Object.keys(payload);
        keys.map((key) => state.users.push(payload[key]));
        return state;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, { error }) => ({ ...state, error: error.message }))
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        isLoggedIn: true,
        token: payload.token,
      }))
      .addCase(loginUser.rejected, (state, { error }) => ({ ...state, error: error.message }));
  },
});

export default authSlice.reducer;
