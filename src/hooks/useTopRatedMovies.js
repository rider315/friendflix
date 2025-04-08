import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?page=1&api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };

  useEffect(() => {
    if (!topRatedMovies) getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;