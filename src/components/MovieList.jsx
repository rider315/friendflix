// src/components/MovieList.jsx
/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

const MovieList = ({ title, movies }) => {
  const loading = useSelector((store) => store?.movies?.loading);

  // If loading, return null; if no movies, show a message
  if (loading) return null;
  if (!movies || movies.length === 0) {
    return (
      <div className="p-6 z-40 text-white">
        <h1 className="md:text-3xl text-2xl font-bold py-6 text-white"> {title}</h1>
        <p>No movies available</p>
      </div>
    );
  }

  return (
    <div className="p-6 z-40 relative">
      <h1 className="md:text-3xl text-2xl font-bold py-6 text-white bg-black bg-opacity-90 px-4 rounded-t-lg shadow-lg">
        {title}
      </h1>
      <div className="flex overflow-x-scroll scrollbar-none scrollbar-hide">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard
              key={movie?.id}
              id={movie?.id}
              posterPath={movie?.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;