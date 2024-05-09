import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjc1YjQ4NTViZTFjMDUzMmYyMDQ5In0sImlhdCI6MTcxNDI5MzA4NX0.nbxQqBMvi_5jbM6u5ntoiG5vKVG64sqOZz8tumuZbLo',
  },
};

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/auth/');
  return response.data;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await axios.get('http://localhost:5000/api/auth/getuser', config);
  return response.data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (user) => {
  const newUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    password: user.password,
  };

  const response = await axios.post('http://localhost:5000/api/auth/createuser', newUser, config);
  return response.data;
});

export const loginUser = createAsyncThunk('auth/loginUser', async (user) => {
  const newUser = {
    email: user.email,
    password: user.password,
  };

  const response = await axios.post('http://localhost:5000/api/auth/login', newUser);
  return response.data;
});
