import { CalendarDays, Clock3, Plus, Star } from "lucide-react";
import { useNavigate } from "react-router";

const DetailHero = ({
    title,
    backdropPath,
    posterPath,
    year,
    runtime,
    certification,
    genres,
    rating,
    voteCount,
    overview,
    onWatchlist,
    onTrailer,
    isAdded,
}) => {

    const formattedRuntime = runtime
        ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
        : null;

    const navigate = useNavigate();

    return (
        <section className="relative min-h-[75vh] overflow-hidden">

            {/* Backdrop */}

            <div className="absolute inset-0">

                <img
                    src={backdropPath}
                    alt={title}
                    className="w-full h-full object-cover object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

            </div>

            <button
                onClick={() => navigate(-1)}
                className="absolute top-24 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white hover:bg-white/10 transition cursor-pointer"
            >
                ← Back
            </button>


            {/* Hero Content */}

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-10">

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">

                    {/* Poster */}

                    <div className="w-62 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">

                        <img
                            src={posterPath}
                            alt={title}
                            className="w-full aspect-[2/3] object-cover object-center"
                        />

                    </div>


                    {/* Details */}

                    <div className="max-w-3xl">

                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            {title}
                        </h1>


                        {/* Meta */}

                        <div className="flex flex-wrap items-center gap-3 mt-5 text-sm text-white/60">

                            {year && (
                                <span className="flex items-center gap-1">
                                    <CalendarDays size={15} />
                                    {year}
                                </span>
                            )}

                            {formattedRuntime && (
                                <span className="flex items-center gap-1">
                                    <Clock3 size={15} />
                                    {formattedRuntime}
                                </span>
                            )}

                            {certification && (
                                <span className="px-2 py-1 border border-white/20 rounded-md text-white">
                                    {certification}
                                </span>
                            )}

                        </div>


                        {/* Genres */}

                        {genres?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">

                                {genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-white/70"
                                    >
                                        {genre.name}
                                    </span>
                                ))}

                            </div>
                        )}


                        {/* Rating */}

                        <div className="flex items-center gap-3 mt-5">

                            <div className="flex items-center gap-2 text-yellow-400">
                                <Star
                                    size={20}
                                    fill="currentColor"
                                />

                                <span className="text-xl font-semibold">
                                    {rating?.toFixed(1) || "N/A"}
                                </span>
                            </div>

                            {voteCount > 0 && (
                                <span className="text-sm text-white/40">
                                    {voteCount.toLocaleString()} votes
                                </span>
                            )}

                        </div>


                        {/* Overview */}

                        {overview && (
                            <p className="mt-6 text-white/70 leading-relaxed text-base md:text-md">
                                {overview}
                            </p>
                        )}


                        {/* Actions */}

                        <div className="flex flex-wrap gap-4 mt-7">

                            <button
                                onClick={onWatchlist}
                                className="flex items-center text-md  gap-2 px-3 lg:px-6 py-3 rounded-xl bg-white/10 border border-white/20  text-white font-semibold transition-transform hover:scale-105 cursor-pointer"
                            >
                                <Plus color="#ffffff" />
                                {isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
                            </button>

                            <button
                                onClick={onTrailer}
                                className="px-3 lg:px-6 py-3 text-md rounded-xl bg-white/10 border border-white/20 text-white cursor-pointer font-semibold backdrop-blur-md hover:bg-white/20 transition-all"
                            >
                                Watch Trailer
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default DetailHero;