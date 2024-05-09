import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers, fetchUser, registerUser, loginUser,
} from './authActions';

const initialState = {
  user: {},
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
      .addCase(fetchUser.fulfilled, ({ payload }) => {
        console.log(`User found : ${payload}`);
      })
      .addCase(fetchUser.rejected, ({ error }) => {
        console.log(`Error : ${error.message}`);
      })
      .addCase(fetchUsers.fulfilled, ({ payload }) => {
        console.log(`Users found : ${payload}`);
      })
      .addCase(registerUser.fulfilled, ({ payload }) => {
        console.log(`User registered: ${payload}`);
      })
      .addCase(loginUser.fulfilled, ({ payload }) => {
        console.log(`User logged in: ${payload}`);
      });
  },
});

export default authSlice.reducer;
