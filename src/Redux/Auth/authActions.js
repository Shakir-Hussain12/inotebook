import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjc1YjQ4NTViZTFjMDUzMmYyMDQ5In0sImlhdCI6MTcxMzM1NDE3Mn0.IfT__HK34JmuOm10KYN6TBqCIFWjd-C4TRm7J3GNT50',
  },
};

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/');
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/getuser', {}, config);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (user) => {
  const newUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    password: user.password,
  };

  try {
    const response = await axios.post('http://localhost:5000/api/auth/createuser', newUser, config);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (user) => {
  const newUser = {
    email: user.email,
    password: user.password,
  };

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', newUser);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
