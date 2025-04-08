// src/components/BrowseFilterModal.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useFilteredMovies from "../hooks/useFilteredMovies";

const BrowseFilterModal = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    genre: "",
    minRating: "",
    sortBy: "",
  });

  const { loading, error } = useSelector((store) => store.movies); // Get loading and error from Redux
  useFilteredMovies(filters); // Fetch filtered movies based on filters

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(); // Close the modal after applying filters
  };

  // Ensure modal only renders when isOpen is true
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg text-white w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Browse Movies</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Genre</label>
            <select
              name="genre"
              value={filters.genre}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              disabled={loading} // Disable while loading
            >
              <option value="">Select Genre</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Minimum Rating</label>
            <input
              type="number"
              name="minRating"
              value={filters.minRating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className="w-full p-2 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="0-10"
              disabled={loading} // Disable while loading
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              disabled={loading} // Disable while loading
            >
              <option value="">Select Sort</option>
              <option value="popularity.desc">Popularity</option>
              <option value="vote_average.desc">Rating</option>
              <option value="release_date.desc">Release Date</option>
            </select>
          </div>

          {/* Feedback for loading and error states */}
          {loading && <p className="text-yellow-400 mb-4">Applying filters...</p>}
          {error && <p className="text-red-500 mb-4">Error: {error}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 transition disabled:opacity-50"
              disabled={loading} // Disable while loading
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
              disabled={loading} // Disable while loading
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrowseFilterModal;