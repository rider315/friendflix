import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);

  const getMoviesVideos = async () => {
    try {
      const apiKey = import.meta.env.VITE_TMDB_KEY;
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
      const json = await data.json();
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Error fetching trailer video:", error);
    }
  };

  useEffect(() => {
    if (!trailerVideo) getMoviesVideos();
  }, []);
};

export default useTrailer;