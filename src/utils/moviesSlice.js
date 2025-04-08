// src/utils/moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trailerVideo: null,
    filteredMovies: null, // Added for filtered movies
    loading: true,
    error: null, // Added for error handling
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addFilteredMovies: (state, action) => { // New action for filtered movies
      state.filteredMovies = action.payload;
    },
    setLoading: (state, action) => { // Updated to accept payload
      state.loading = action.payload;
    },
    setError: (state, action) => { // New action for errors
      state.error = action.payload;
    },
  },
});

export const {
  addTopRatedMovies,
  setLoading,
  addUpcomingMovies,
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addFilteredMovies, // Export new action
  setError, // Export new action
} = moviesSlice.actions;

export default moviesSlice.reducer;