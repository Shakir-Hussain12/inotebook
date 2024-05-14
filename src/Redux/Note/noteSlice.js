import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotes, addNote, deleteNote, updateNote,
} from './noteActions';

const initialState = {
  notes: [],
  error: null,
  isLoading: false,
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  error: null,
  reducers: {
    setIsEditable: (state, { payload: { target } }) => {
      const id = '_id';
      state.notes.map((note) => {
        if (note[id] === target) {
          note.isEditable = !note.isEditable;
        }
        return note;
      });
    },
    resetNotes: (state) => {
      state.notes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => (
        { ...state, isLoading: true }
      ))
      .addCase(fetchNotes.fulfilled, (state, { payload }) => {
        const newNotes = [];
        const keys = Object.keys(payload);
        keys.map((key) => newNotes.push(
          { ...payload[key], isEditable: false },
        ));

        return {
          ...state,
          notes: newNotes,
          isLoading: false,
        };
      })
      .addCase(fetchNotes.rejected, (state, { payload }) => (
        { ...state, isLoading: true, error: payload }
      ))

      .addCase(addNote.fulfilled, (state, { payload }) => {
        const newNote = { ...payload.note, isEditable: false };
        state.notes.push(newNote);
        state.isLoading = false;

        return state;
      })

      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        const id = '_id';
        state.notes = state.notes.filter((note) => note[id] !== payload);
        state.isLoading = false;

        return state;
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

        return state;
      });
  },
});

export const { setIsEditable, resetNotes } = noteSlice.actions;
export default noteSlice.reducer;
