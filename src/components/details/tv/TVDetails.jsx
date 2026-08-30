import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { addMovie, removeMovie } from "../../../utils/watchlistSlice";
import {addMovieToWatchlist,removeMovieFromWatchlist} from "../../../utils/firestore";

import useTvDetails from "../../../hooks/useTvDetails";
import useTvCertification from "../../../hooks/useTvCertification";
import useTvWatchProviders from "../../../hooks/useTvWatchProviders"

import DetailHero from "../shared/DetailHero";
import TVInfo from "./TVInfo";
import MovieTrailer from "../movie/MovieTrailer";
import CastSection from "../shared/CastSection";
import MoreLikeThis from "../shared/MoreLikeThis";
import WhereToWatch from "../shared/WhereToWatch";
import CurrentSeason from "./CurrentSeason";

const TVDetails = () => {
    const { tvId } = useParams();
    const dispatch = useDispatch();
    const navigate= useNavigate()

    // Fetch TV details
    useTvDetails(tvId);

    // Fetch certification
    useTvCertification(tvId);

    // Fetch watch providers
    useTvWatchProviders(tvId);

    const uid = useSelector((store) => store.user?.uid);

    const watchlistMovies = useSelector((store) => store.watchlist.movies);

    const tv = useSelector(
        (store) => store.tvDetails.data
    );



console.log("TV ID:", tvId);
console.log("TV DATA:", tv);
console.log("SEASONS:", tv?.seasons);

    const isAdded = watchlistMovies.some((item) =>
        item.movieId === tv?.id &&
        item.mediaType === "tv"
    );

    const handleWatchlist = async () => {
        if (!uid) {
            console.log("User not logged in");
            return;
        }
        if (isAdded) {
            await removeMovieFromWatchlist(
                uid,
                tv.id,
                "tv"
            );

            dispatch(
                removeMovie({
                    movieId: tv.id,
                    mediaType: "tv",
                })
            );

            return;
        }

        const savedTV = await addMovieToWatchlist(uid,tv,"tv");

        dispatch(addMovie(savedTV));
    };

    const certification = useSelector(
        (store) => store.tvDetails.certification
    );

    const watchProviders = useSelector(
        (store) => store.tvDetails.watchProviders
    );

    const handleTrailerClick = () => {
        document.getElementById("trailer")?.scrollIntoView({
            behavior: "smooth",
        });
    };
    const handleSeasonClick = (seasonNumber) => {
        console.log("Selected Season:", seasonNumber);

        navigate(`/tv/${tvId}/season/${seasonNumber}`);
    };


console.log("TV:", tv);
console.log("Genres:", tv?.genres);
console.log("Videos:", tv?.videos?.results);
console.log("Cast:", tv?.credits?.cast);
console.log("Recommendations:", tv?.recommendations?.results);

    if (!tv) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            <DetailHero
                title={tv.name}
                backdropPath={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
                posterPath={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                year={tv.first_air_date?.split("-")[0]}
                runtime={tv.episode_run_time?.[0]}
                certification={certification}
                genres={tv.genres}
                rating={tv.vote_average}
                voteCount={tv.vote_count}
                overview={tv.overview}
                onWatchlist={handleWatchlist}
                isAdded={isAdded}
                onTrailer={handleTrailerClick}
            />

            <div className="max-w-7xl mx-auto px-6 py-10">

                <WhereToWatch
                    watchProviders={watchProviders}
                />

                <CurrentSeason seasons={tv.seasons} onSeasonClick={handleSeasonClick}/>

                <TVInfo tv={tv} />

                <MovieTrailer
                    videos={tv.videos?.results}
                />

                <CastSection
                    cast={tv.credits?.cast}
                />

                <MoreLikeThis
                    media={tv.recommendations?.results}
                />

            </div>

        </div>
    );
};

export default TVDetails;