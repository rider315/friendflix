import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies, setLoading, setError } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store?.movies?.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    dispatch(setLoading(true)); // Set loading to true before fetching
    try {
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      if (!apiKey) throw new Error("TMDB API key is missing");

      const data = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
      const json = await data.json();
      dispatch(addNowPlayingMovies(json?.results));
    } catch (error) {
      console.error("Error fetching now playing movies:", error.message);
      dispatch(setError(error.message)); // Store the error in Redux
    } finally {
      dispatch(setLoading(false)); // Set loading to false after fetch completes
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) getNowPlayingMovies();
  }, [nowPlayingMovies]); // Added nowPlayingMovies to dependency array
};

export default useNowPlayingMovies;