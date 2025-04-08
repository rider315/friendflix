// src/components/HeroContainer.jsx
import { useSelector } from "react-redux/es/hooks/useSelector";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { HomeShimmer } from "./Shimmer";

const HeroContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const loading = useSelector((store) => store?.movies?.loading);

  if (loading) return <HomeShimmer />;
  if (!movies || movies.length < 3) return null; // Avoid index error if insufficient movies

  const mainMovie = movies[2];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[10%] md:py-0 md:-mt-24 bg-black">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default HeroContainer;