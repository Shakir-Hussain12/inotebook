import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers, fetchUser, registerUser, loginUser,
} from './authActions';

const initialState = {
  users: [],
  currentUser: {},
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjc1YjQ4NTViZTFjMDUzMmYyMDQ5In0sImlhdCI6MTcxMzM1NDE3Mn0.IfT__HK34JmuOm10KYN6TBqCIFWjd-C4TRm7J3GNT50',
  isLoading: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.token = '';
      state.isLoggedIn = false;
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
      .addCase(fetchUsers.rejected, ({ error }) => {
        console.log(`Users found : ${error.message}`);
      })
      .addCase(registerUser.fulfilled, ({ payload }) => {
        console.log(`User registered: ${payload}`);
      })
      .addCase(registerUser.rejected, ({ error }) => {
        console.log(`User registered: ${error.message}`);
      })
      .addCase(loginUser.fulfilled, ({ payload }) => {
        console.log(`User logged in: ${payload}`);
      })
      .addCase(loginUser.rejected, ({ error }) => {
        console.log(`User logged in: ${error.message}`);
      });
  },
});

export default authSlice.reducer;
