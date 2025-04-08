import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?page=1&api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  useEffect(() => {
    if (!upcomingMovies) getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;