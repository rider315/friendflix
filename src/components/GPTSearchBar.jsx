// src/components/GPTSearchBar.jsx
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult, setLoading } from "../utils/gptSlice";
import { Search } from "lucide-react";
import debounce from "lodash/debounce";

// Predefined list of movie titles
const MOVIE_POOL = [
  "Gadar", "Sholay", "Don", "Golmaal", "Koi Mil Gaya", "Dhoom", "Kabhi Khushi Kabhie Gham",
  "3 Idiots", "Lagaan", "Dilwale Dulhania Le Jayenge", "Bajrangi Bhaijaan", "PK",
  "Chennai Express", "Singham", "Dabangg", "Rowdy Rathore", "Housefull", "Ready"
];

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((store) => store?.config?.lang || "en");
  const searchText = useRef("");
  const [fetchCount, setFetchCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchCount >= 2) {
      const timer = setTimeout(() => {
        setFetchCount(0);
        setShowModal(false);
        setError(null);
      }, 60000); // 1 minute
      return () => clearTimeout(timer);
    }
  }, [fetchCount]);

  const searchMovies = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      console.log("TMDB Response for", movie, ":", json); // Debug TMDB response
      const movieData = json.results[0] || { poster_path: null, title: movie };
      const thumbnail = movieData.poster_path
        ? `https://image.tmdb.org/t/p/w200${movieData.poster_path}`
        : null;
      console.log("Generated Thumbnail URL:", thumbnail); // Debug thumbnail URL
      return [{
        ...movieData,
        thumbnail,
      }]; // Return array with single movie
    } catch (error) {
      console.error("TMDB Search Error for", movie, ":", error);
      return [{ title: movie, thumbnail: null }]; // Return array with fallback
    }
  };

  async function search(searchInput) {
    if (fetchCount >= 2) {
      setShowModal(true);
      setError("Request limit reached. Wait 1 minute and try again.");
      return;
    }

    dispatch(setLoading(true));
    setError(null);
    try {
      setFetchCount((prev) => prev + 1);
      // Randomly select 5 unique movies from the pool
      const shuffled = MOVIE_POOL.sort(() => 0.5 - Math.random());
      const mockNames = shuffled.slice(0, 5);

      const promiseArray = mockNames.map((movie) => searchMovies(movie));
      const mockResults = await Promise.all(promiseArray);

      dispatch(addGPTMovieResult({ movieNames: mockNames, movieResults: mockResults }));
    } catch (error) {
      console.error("Search Error:", error);
      setError("Failed to fetch movie data. Please try again later.");
    } finally {
      dispatch(setLoading(false));
    }
  }

  const debouncedSearch = debounce(handleSearch, 1000);

  function handleSearch() {
    const inputValue = searchText?.current?.value?.trim();
    if (!inputValue) return;

    // Simulate a GPT-like query without actual API call
    search("Act as a Movie Recommendation system and suggest some movies for the query : " + inputValue + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya");
  }

  return (
    <>
      <div className="flex md:justify-around w-full ml-[70px] -mt-10 md:mt-28 left-0 right-0 fixed mb-9 items-center z-50 md:w-1/3 md:mx-auto">
        <input
          ref={searchText}
          className="flex w-[280px] md:w-3/4 rounded-full shadow-xl dark:bg-stone-800 dark:text-brand-beige bg-transparent px-4 py-2 text-sm dark:placeholder:text-neutral-500 placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder={lang[selectedLanguage].gptSearchPlaceholder}
          onChange={debouncedSearch} // Trigger on change for real-time suggestions
        />
        <button
          onClick={debouncedSearch}
          disabled={showModal}
          className="hover:bg-opacity-80 font-semibold rounded-full text-white ml-2 px-1 py-1"
        >
          {showModal ? (
            <div className="rounded-full px-4 py-2 bg-red-500">
              <p>Limited</p>
            </div>
          ) : (
            <Search color="red" />
          )}
        </button>
      </div>
      {error && (
        <div className="fixed top-20 left-0 right-0 mx-auto w-1/2 text-center text-red-500 bg-black bg-opacity-75 p-2 rounded">
          {error}
        </div>
      )}
    </>
  );
};

export default GPTSearchBar;