import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotes, addNote, deleteNote, updateNote,
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
        keys.map((key) => state.notes.push({ ...payload[key], isEditable: false }));
        state.isLoading = false;
        return state;
      })

      .addCase(addNote.fulfilled, (state, { payload }) => {
        const newNote = { ...payload.note, isEditable: false };
        state.notes.push(newNote);
        state.isLoading = false;
      })

      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        const id = '_id';
        state.notes.filter((note) => note[id] !== payload);
        state.isLoading = false;
      })

      .addCase(updateNote.fulfilled, (state, { payload }) => {
        const id = '_id';
        state.notes = state.notes.map((note) => {
          if (note[id] === payload.note[id]) {
            return { ...note, ...payload.note };
          }
          return note;
        });
        state.isLoading = false;
      });
  },
});

export default noteSlice.reducer;
