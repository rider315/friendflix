// src/components/Browse.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import HeroContainer from "./HeroContainer";
import MoviesListContainer from "./MoviesListContainer";
import GPTSearch from "./GPTSearch";
import { User2, Home, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { toggleGPTSearch } from "../utils/gptSlice";
import Footer from "./Footer";
import BrowseFilterModal from "./BrowseFilterModal";

const Browse = () => {
  const showGPT = useSelector((store) => store.gpt.showGPTSearch);
  const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies, filteredMovies, loading, error } =
    useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch movie data using custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  // Define default movie lists
  const movieLists = [
    { title: "Now Playing", movies: nowPlayingMovies },
    { title: "Popular", movies: popularMovies },
    { title: "Top Rated", movies: topRatedMovies },
    { title: "Upcoming", movies: upcomingMovies },
  ].filter((list) => list.movies && list.movies.length > 0); // Filter out empty lists

  // Handlers for modal toggle
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      {showGPT ? (
        <>
          <GPTSearch />
          <div className="md:hidden flex justify-around bg-brand-coal text-white fixed bottom-0 h-[52px] w-screen z-50">
            <Link to={"/"}>
              <Home className="my-3" />
            </Link>
            <Rocket
              fill="yellow"
              color="yellow"
              onClick={() => dispatch(toggleGPTSearch())}
              className="my-3 cursor-pointer"
            />
            <Link to={"/user"}>
              <User2 className="my-3" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <HeroContainer />
          <div className="p-4 bg-black text-white sticky top-0 z-40">
            <button
              onClick={openModal}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={loading} // Disable button while loading
            >
              Filter Movies
            </button>
          </div>
          <BrowseFilterModal isOpen={isModalOpen} onClose={closeModal} />
          <div className="px-4 pb-20">
            {loading && (
              <div className="text-white p-4 text-center">Loading movies...</div>
            )}
            {error && (
              <div className="text-red-500 p-4 text-center">Error: {error}</div>
            )}
            {!loading && !error && (
              <>
                {filteredMovies && filteredMovies.length > 0 ? (
                  <div className="bg-black">
                    <h2 className="text-white text-2xl p-4">Filtered Movies</h2>
                    <MoviesListContainer movies={[{ title: "Filtered Movies", movies: filteredMovies }]} />
                  </div>
                ) : (
                  movieLists.length > 0 ? (
                    <MoviesListContainer movies={movieLists} />
                  ) : (
                    <div className="text-white p-4 text-center">
                      No movies available. Try adjusting your filters or check your connection.
                    </div>
                  )
                )}
              </>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Browse;