import { createSlice } from '@reduxjs/toolkit';
import fetchUser from './authActions';

const initialState = {
  user: {},
  isLoading: false,
  isLoggedIn: false,
  isRegistered: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => (
        {
          ...state,
          isLoading: true,
        }
      ))
      .addCase(fetchUser.fulfilled, (state, { payload }) => (
        {
          ...state,
          isLoading: false,
          isLoggedIn: true,
          user: payload,
        }
      ));
  },
});

export default authSlice.reducer;
