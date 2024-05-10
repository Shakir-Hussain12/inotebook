import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjc1YjQ4NTViZTFjMDUzMmYyMDQ5In0sImlhdCI6MTcxNDI5MzA4NX0.nbxQqBMvi_5jbM6u5ntoiG5vKVG64sqOZz8tumuZbLo',
  },
};

export const fetchNotes = createAsyncThunk('api/FetchNotes',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes', config);
      return response.data;
    } catch (error) {
      return error;
    }
  });

export const addNote = createAsyncThunk('api/AddNote',
  async (note) => {
    try {
      const response = await axios.post('http://localhost:5000/api/notes/', note, config);
      return response.data;
    } catch (error) {
      return error;
    }
  });

export const updateNote = createAsyncThunk('api/UpdateNote',
  async (note) => {
    const id = '_id';
    try {
      const response = await axios.put(`http://localhost:5000/api/notes/${note[id]}`, note, config);
      return response.data;
    } catch (error) {
      return error;
    }
  });

export const deleteNote = createAsyncThunk('api/DeleteNote',
  async ({ _id }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/notes/${_id}`, config);
      return response.data;
    } catch (error) {
      return error;
    }
  });
