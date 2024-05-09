import { createSlice } from '@reduxjs/toolkit';
// import fetchNotes from './noteActions';

const initialState = {
  notes: [],
  isLoading: false,
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchNotes.pending, (state) => (
  //       {
  //         ...state,
  //         isLoading: true,
  //       }
  //     ))
  //     .addCase(fetchNotes.fulfilled, (state, { payload }) => (
  //       {
  //         ...state,
  //         isLoading: false,
  //         notes: payload,
  //       }
  //     ));
  // },
});

export default noteSlice.reducer;
