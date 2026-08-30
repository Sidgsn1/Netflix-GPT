import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import useTvSeasonEpisodes from "../../../hooks/useTvSeasonEpisodes";
import { IMG_CDN_URL } from "../../../utils/constants";
import NoPosterExist from "../../../assets/images/noPoster.png";

const TVSeasonDetails = () => {

    const { tvId, seasonNumber } = useParams();
    const navigate = useNavigate();

    // Fetch selected season episodes
    useTvSeasonEpisodes(tvId, Number(seasonNumber));

    const season = useSelector(
        (store) => store.tvDetails.seasonEpisodes
    );

    const tv = useSelector(
        (store) => store.tvDetails.data
    );

    const certification = useSelector(
        (store) => store.tvDetails.certification
    );

    console.log("TV ID:", tvId);
    console.log("Season Number:", seasonNumber);
    console.log("Season Data:", season);
    console.log("Episodes:", season?.episodes);

    if (!season) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* ================= SEASON HERO ================= */}
            <section className="relative min-h-[75vh] overflow-hidden">

                {/* ================= BACKDROP ================= */}
                <div className="absolute inset-0">

                    {tv?.backdrop_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
                            alt={tv?.name || season.name}
                            className="w-full h-full object-cover object-top"
                        />
                    )}

                    {/* Right/Left Dark Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

                    {/* Bottom Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

                </div>


                {/* ================= BACK BUTTON ================= */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-24 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white hover:bg-white/10 transition cursor-pointer"
                >
                    ← Back
                </button>


                {/* ================= HERO CONTENT ================= */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-10">

                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">

                        {/* ================= POSTER ================= */}
                        <div className="w-52 md:w-52 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">

                            <img
                                src={
                                    season.poster_path
                                        ? IMG_CDN_URL + season.poster_path
                                        : NoPosterExist
                                }
                                alt={season.name}
                                className="w-full aspect-[2/3] object-cover"
                            />

                        </div>


                        {/* ================= SEASON DETAILS ================= */}
                        <div className="max-w-3xl">

                            {/* TV SHOW NAME */}
                            <p className="text-sm text-purple-400 font-medium">
                                {tv?.name || "TV SERIES"}
                            </p>


                            {/* SEASON NAME */}
                            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
                                {season.name}
                            </h1>


                            {/* META */}
                            <div className="flex flex-wrap items-center gap-3 mt-5 text-sm text-white/60">

                                {/* Episodes */}
                                <span>
                                    {season.episodes?.length || 0} Episodes
                                </span>

                                <span>•</span>

                                {/* Year */}
                                {season.air_date && (
                                    <>
                                        <span>
                                            {season.air_date.split("-")[0]}
                                        </span>

                                        <span>•</span>
                                    </>
                                )}

                                {/* Certification */}
                                {certification && (
                                    <>
                                        <span className="px-2 py-1 border border-white/20 rounded-md text-white">
                                            {certification}
                                        </span>

                                        <span>•</span>
                                    </>
                                )}

                                {/* Genres */}
                                {tv?.genres?.length > 0 && (
                                    <span>
                                        {tv.genres
                                            .slice(0, 3)
                                            .map((genre) => genre.name)
                                            .join(", ")}
                                    </span>
                                )}

                            </div>


                            {/* OVERVIEW */}
                            <p className="mt-6 text-white/70 leading-relaxed text-base md:text-md">
                                {season.overview ||
                                    "No description available for this season."}
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= EPISODES ================= */}
            <section className="max-w-7xl mx-auto px-6 py-8">

                <h2 className="text-2xl font-semibold text-yellow-100 mb-6">
                    Episodes
                </h2>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {season.episodes?.map((episode) => (

                        <div
                            key={episode.id}
                            className="group flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 transition-all duration-300 hover:border-purple-500"
                        >

                            {/* ================= EPISODE IMAGE ================= */}
                            <div className="w-40 shrink-0">

                                <div className="aspect-video rounded-lg overflow-hidden bg-white/5">

                                    <img
                                        src={
                                            episode.still_path
                                                ? IMG_CDN_URL + episode.still_path
                                                : NoPosterExist
                                        }
                                        alt={episode.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                </div>

                            </div>


                            {/* ================= EPISODE INFO ================= */}
                            <div className="flex-1 min-w-0">

                                <div className="flex items-center justify-between gap-2">

                                    <h3 className="font-semibold text-white truncate">
                                        {episode.episode_number}.{" "}
                                        {episode.name}
                                    </h3>

                                    <span className="text-sm text-yellow-400 shrink-0">
                                        ⭐{" "}
                                        {episode.vote_average?.toFixed(1) || "N/A"}
                                    </span>

                                </div>


                                {/* AIR DATE */}
                                {episode.air_date && (
                                    <p className="text-xs text-white/40 mt-2">
                                        {episode.air_date}
                                    </p>
                                )}


                                {/* OVERVIEW */}
                                <p className="text-sm text-white/50 mt-3 line-clamp-3">
                                    {episode.overview ||
                                        "No description available."}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </div>
    );
};

export default TVSeasonDetails;