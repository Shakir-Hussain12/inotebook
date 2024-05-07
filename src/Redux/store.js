import { configureStore } from '@reduxjs/toolkit';
import authReducers from './Auth/authSlice';
import noteReducers from './Note/noteSlice';

const store = configureStore({
  reducer: {
    auth: authReducers,
    note: noteReducers,
  },
});

export default store;
