import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

import { addMovie, removeMovie } from "../utils/watchlistSlice";

import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../utils/firestore";

import useMovieDetails from "../hooks/useMovieDetails";
import useTvDetails from "../hooks/useTvDetails";

const MainContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User
  const user = useSelector(store => store.user);

  // Watchlist
  const watchlistMovies = useSelector(
    store => store.watchlist.movies
  );

  // Trending media
  const trendingMedia = useSelector(
    store => store.movies?.trendingToday
  );

  // Main hero media
  const mainMedia = trendingMedia?.[8];

  // Genre maps
  const movieGenres = useSelector(
    store => store.movies?.genres
  );

  const tvGenres = useSelector(
    store => store.tv?.genres
  );

  // Details
  const movieDetails = useSelector(
    store => store.movieDetails?.data
  );

  const tvDetails = useSelector(
    store => store.tvDetails?.data
  );

  // Fetch movie details only for movie
  useMovieDetails(
    mainMedia?.media_type === "movie"
      ? mainMedia.id
      : null
  );

  // Fetch TV details only for TV
  useTvDetails(
    mainMedia?.media_type === "tv"
      ? mainMedia.id
      : null
  );

  // Wait until hero media is available
  if (!mainMedia) return null;

  const {
    title,
    name,
    overview,
    id,
    media_type,
    release_date,
    first_air_date,
    genre_ids,
    vote_average,
  } = mainMedia;

  // Current media details
  const details =
    media_type === "tv"
      ? tvDetails
      : movieDetails;

  // Runtime
  const runtime =
    media_type === "tv"
      ? details?.episode_run_time?.[0]
      : details?.runtime;

  const runtimeText = runtime
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : null;

  // Check if current media is already in watchlist
  const isAdded = watchlistMovies.some(
    item =>
      item.movieId === id &&
      item.mediaType === media_type
  );

  // More Info
  const handleMoreInfo = () => {

    if (media_type === "tv") {
      navigate(`/tv/${id}`);
    } else {
      navigate(`/movie/${id}`);
    }

  };

  // Add / Remove Watchlist
  const handleWatchlist = async () => {

    if (!user?.uid) return;

    // Remove from watchlist
    if (isAdded) {

      await removeMovieFromWatchlist(
        user.uid,
        id,
        media_type
      );

      dispatch(
        removeMovie({
          movieId: id,
          mediaType: media_type,
        })
      );

      return;
    }

    // Add to watchlist
    const savedMedia = await addMovieToWatchlist(
      user.uid,
      mainMedia,
      media_type
    );

    dispatch(addMovie(savedMedia));
  };

  return (
    <div className="relative w-full h-[75vh] md:h-[80vh] lg:h-screen bg-black">

      <VideoTitle
        title={title || name}
        overview={overview}

        releaseDate={
          release_date || first_air_date
        }

        genreIds={genre_ids}

        voteAverage={vote_average}

        movieGenres={movieGenres}
        tvGenres={tvGenres}

        mediaType={media_type}

        runtime={runtimeText}

        onMoreInfo={handleMoreInfo}
        onWatchlist={handleWatchlist}
        isAdded={isAdded}
      />

      <VideoBackground
        movieId={id}
        mediaType={media_type}
      />

    </div>
  );
};

export default MainContainer;