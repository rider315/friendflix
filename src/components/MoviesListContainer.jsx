// src/components/MoviesListContainer.jsx
import MovieList from "./MovieList";

const MoviesListContainer = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="p-6 z-40 text-white">
        <p>No movies available</p>
      </div>
    );
  }

  return (
    <div className="bg-black">
      {movies.map((movieList, index) => (
        <MovieList
          key={index}
          title={movieList.title}
          movies={movieList.movies}
        />
      ))}
    </div>
  );
};

export default MoviesListContainer;