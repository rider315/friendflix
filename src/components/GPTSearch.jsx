// src/components/GPTSearch.jsx
import { BG_URL, GPT_MODE_IMG } from "../utils/constants";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import GPTSearchBar from "./GPTSearchBar";
import { useSelector } from "react-redux";
import { BrowseShimmer, DesktopBrowseShimmer } from "./Shimmer";

const GPTSearch = () => {
  const { movieResults, loading, error } = useSelector((store) => store.gpt);

  return (
    <div className="relative min-h-screen bg-black">
      <GPTSearchBar />
      <div className="pt-32 md:pt-40 text-center"> {/* Increased padding to avoid overlap */}
        {loading && (
          <div className="text-white">
            <p>Loading recommendations...</p>
          </div>
        )}
        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}
        {!movieResults && !loading && !error && (
          <div className="md:max-w-sm max-w-[300px] mx-auto md:my-0 my-60 py-4 md:absolute md:left-[500px] md:top-[250px]">
            <img src={GPT_MODE_IMG} alt="Movie Placeholder" />
          </div>
        )}
        {movieResults && !loading && (
          <>
            <div className="md:block hidden absolute z-50">
              <GPTMovieSuggestions />
            </div>
            <div className="md:hidden absolute z-50">
              <GPTMovieSuggestions />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GPTSearch;

