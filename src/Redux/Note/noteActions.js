import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotes = createAsyncThunk('api/FetchNotes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const addNote = createAsyncThunk('api/AddNote',
  async (note, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/notes/', note, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const updateNote = createAsyncThunk('api/UpdateNote',
  async (note, { rejectWithValue }) => {
    const id = '_id';
    try {
      const response = await axios.put(`http://localhost:5000/api/notes/${note[id]}`, note, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });

export const deleteNote = createAsyncThunk('api/DeleteNote',
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${_id}`, { withCredentials: true });
      return _id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
