import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../AxiosInterceptor';

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('http://localhost:5000/api/auth/getuser', {});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (user, { rejectWithValue }) => {
  const newUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    password: user.password,
  };

  let userExists = '';
  const { data } = await axios.get('http://localhost:5000/api/auth/');
  userExists = data.find((user) => user.email === newUser.email);

  if (userExists) {
    return rejectWithValue('User already exists');
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/createuser', newUser);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (user, { rejectWithValue }) => {
  const newUser = {
    email: user.email,
    password: user.password,
  };

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', newUser, { withCredentials: true });
    console.log('User Logged In');
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
