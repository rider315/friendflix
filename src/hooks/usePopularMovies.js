import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { setLoading } from "../utils/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_KEY; // Access the API key directly
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=1&api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
      dispatch(setLoading());
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    if (!popularMovies) getPopularMovies();
  }, []);

  return null; // Since this is a hook, it doesn’t need to return anything unless used in JSX
};

export default usePopularMovies;