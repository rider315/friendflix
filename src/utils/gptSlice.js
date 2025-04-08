// src/utils/gptSlice.js
import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    gptMovies: null,
    movieResults: null,
    movieNames: null,
    loading: false,
    error: null, // Added
  },
  reducers: {
    toggleGPTSearch: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGPTMovieResult: (state, { payload }) => {
      const { movieNames, movieResults } = payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setGPTError: (state, { payload }) => { // Added
      state.error = payload;
    },
  },
});

export const { toggleGPTSearch, setLoading, addGPTMovieResult, setGPTError } = gptSlice.actions;

export default gptSlice.reducer;