import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { addMovie, removeMovie } from "../../../utils/watchlistSlice";
import {addMovieToWatchlist,removeMovieFromWatchlist} from "../../../utils/firestore";

import useMovieDetails from "../../../hooks/useMovieDetails";
import useMovieCertification from "../../../hooks/useMovieCertification";
import useMovieWatchProviders from "../../../hooks/useMovieWatchProviders";

import DetailHero from "../shared/DetailHero";
import MovieInfo from "./MovieInfo";
import MovieTrailer from "./MovieTrailer";
import CastSection from "../shared/CastSection";
import MoreLikeThis from "../shared/MoreLikeThis";
import WhereToWatch from "../shared/WhereToWatch";

const MovieDetails = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();

    // Fetch movie details
    useMovieDetails(movieId);

    // Fetch certification
    useMovieCertification(movieId);

    // Fetch where to watch data
    useMovieWatchProviders(movieId);

    const handleTrailerClick = () => {
    document.getElementById("trailer")?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const movie = useSelector((store) => store.movieDetails.data);
    const certification = useSelector(
        (store) => store.movieDetails.certification
    );
    const watchProviders = useSelector(
        (store) => store.movieDetails.watchProviders
    );

    const uid = useSelector((store) => store.user?.uid);

    const watchlistMovies = useSelector(
        (store) => store.watchlist.movies
    );

    const isAdded = watchlistMovies.some((item) =>
        item.movieId === movie?.id &&
        item.mediaType === "movie"
    );

    const handleWatchlist = async () => {
        if (!uid) {
            console.log("User not logged in");
            return;
        }

        if (isAdded) {
            await removeMovieFromWatchlist(
                uid,
                movie.id,
                "movie"
            );

            dispatch(
                removeMovie({
                    movieId: movie.id,
                    mediaType: "movie",
                })
            );

            return;
        }

        const savedMovie = await addMovieToWatchlist(
            uid,
            movie,
            "movie"
        );

        dispatch(addMovie(savedMovie));
    };

    console.log("movieId:", movieId);
    console.log("movie:", movie);

    if (!movie) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-white/60 text-lg">
                    Loading movie...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            
            {/* Back Button */}
            {/* DetailHero */}
            <DetailHero
                title={movie.title}
                backdropPath={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                year={movie.release_date?.split("-")[0]}
                runtime={movie.runtime}
                certification={certification}
                genres={movie.genres}
                rating={movie.vote_average}
                voteCount={movie.vote_count}
                overview={movie.overview}
                onTrailer={handleTrailerClick}
                onWatchlist={handleWatchlist}
                isAdded={isAdded}
            />

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Watch Providers */}
                <WhereToWatch watchProviders={watchProviders} />
                {/* Movie Details */}
                <MovieInfo movie={movie} />
                {/* Movie Trailer */}
                <MovieTrailer videos={movie.videos?.results} />
                {/* Cast Section */}
                <CastSection cast={movie.credits?.cast} />
                {/* More Like This */}
                <MoreLikeThis media={movie.recommendations?.results}/>

            </div>
        </div>
    );
};

export default MovieDetails;