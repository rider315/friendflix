// src/hooks/useFilteredMovies.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFilteredMovies, setLoading, setError } from "../utils/moviesSlice";

const useFilteredMovies = (filters) => {
  const dispatch = useDispatch();
  const filteredMovies = useSelector((store) => store.movies.filteredMovies);

  const getFilteredMovies = async () => {
    dispatch(setLoading(true));
    try {
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      if (!apiKey) throw new Error("TMDB API key is missing");

      const { genre, minRating, sortBy } = filters || {};
      const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1${
        genre ? `&with_genres=${genre}` : ""
      }${minRating ? `&vote_average.gte=${minRating}` : ""}${
        sortBy ? `&sort_by=${sortBy}` : ""
      }&api_key=${apiKey}`; // Include API key directly in URL

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      dispatch(addFilteredMovies(json.results));
    } catch (error) {
      console.error("Error fetching filtered movies:", error.message);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (filters && Object.values(filters).some((val) => val)) getFilteredMovies();
  }, [filters]);
};

export default useFilteredMovies;