import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotes, addNote, deleteNote,
} from './noteActions';

const initialState = {
  notes: [],
  isLoading: false,
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => (
        { ...state, isLoading: true }
      ))

      .addCase(fetchNotes.fulfilled, (state, { payload }) => {
        const keys = Object.keys(payload);
        keys.map((key) => state.push({ ...payload[key], isEditable: false }));
        return {
          ...state,
          isLoading: false,
        };
      })

      .addCase(addNote.fulfilled, (state, { payload }) => {
        const newNote = { ...payload, isEditable: false };
        state.notes.push(newNote);
        state.isLoading = false;
      })

      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        const id = '_id';
        state.notes.filter((note) => note[id] !== payload);
        state.isLoading = false;
      });
  },
});

export default noteSlice.reducer;
