import { useState } from "react";
import { CalendarDays, ChevronRight, ChevronDown } from "lucide-react";
import { IMG_CDN_URL } from "../../../utils/constants";
import NoPosterExist from "../../../assets/images/noPoster.png";

const CurrentSeason = ({ seasons }) => {

    const [showAllSeasons, setShowAllSeasons] = useState(false);

    if (!seasons || seasons.length === 0) return null;

    const actualSeasons = seasons.filter(
        (season) => season.season_number > 0
    );

    if (actualSeasons.length === 0) return null;

    const currentSeason =
        actualSeasons[actualSeasons.length - 1];

    const sortedSeasons = [...actualSeasons].reverse();

    const formatDate = (date) => {
        if (!date) return null;

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const SeasonCard = ({ season, isCurrent }) => {

        return (
            <div
                className={`
                    flex flex-col md:flex-row gap-6 p-4
                    rounded-xl
                    bg-white/[0.02]
                    border border-transparent
                    transition-all duration-300 ease-in-out cursor-pointer hover:border-purple-500
                `}
            >

                {/* Poster */}
                <div className="w-full md:w-64 shrink-0">

                    <div className="aspect-[16/10] rounded-lg overflow-hidden bg-white/5">

                        <img
                            src={
                                season.poster_path
                                    ? IMG_CDN_URL + season.poster_path
                                    : NoPosterExist
                            }
                            alt={season.name}
                            className="w-full h-full object-cover"
                        />

                    </div>

                </div>


                {/* Details */}
                <div className="flex-1 flex flex-col justify-center">

                    <div className="flex items-center gap-3 flex-wrap">

                        <h3 className="text-xl font-semibold text-white">
                            {season.name}
                        </h3>

                        {isCurrent && (
                            <span className="px-2 py-1 rounded-full border border-purple-500 text-purple-400 text-xs">
                                Current
                            </span>
                        )}

                    </div>


                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">

                        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-sm text-white/70">
                            {season.episode_count || 0} Episodes
                        </span>

                        {season.air_date && (
                            <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-sm text-white/70">
                                {season.air_date.split("-")[0]}
                            </span>
                        )}

                    </div>


                    {/* Overview */}
                    <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-3xl">

                        {season.overview ||
                            "No description available for this season."}

                    </p>


                    {/* Air Date */}
                    {season.air_date && (
                        <div className="flex items-center gap-2 mt-5 text-sm text-white/50">

                            <CalendarDays size={16} />

                            <span>
                                Aired on {formatDate(season.air_date)}
                            </span>

                        </div>
                    )}

                </div>


                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center px-2">

                    <ChevronRight
                        size={22}
                        className="text-white/70"
                    />

                </div>

            </div>
        );
    };


    return (
        <section className="px-6 py-8">

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">

                {/* Heading */}
                <div className="px-6 pt-6">

                    <h2 className="text-xl font-semibold text-white">
                        {showAllSeasons
                            ? "All Seasons"
                            : "Current Season"}
                    </h2>

                </div>


                {/* Season Content */}
                <div className="p-6 space-y-3">

                    {showAllSeasons ? (

                        // ALL SEASONS
                        sortedSeasons.map((season) => (

                            <SeasonCard
                                key={season.id}
                                season={season}
                                isCurrent={
                                    season.id === currentSeason.id
                                }
                            />

                        ))

                    ) : (

                        // CURRENT SEASON
                        <SeasonCard
                            season={currentSeason}
                            isCurrent={true}
                        />

                    )}

                </div>


                {/* Toggle */}
                {actualSeasons.length > 1 && (

                    <div className="border-t border-white/10 px-6 py-4">

                        <button
                            onClick={() =>
                                setShowAllSeasons(!showAllSeasons)
                            }
                            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition cursor-pointer"
                        >

                            <span>
                                {showAllSeasons
                                    ? "Hide All Seasons"
                                    : "View All Seasons"}
                            </span>

                            <ChevronDown
                                size={18}
                                className={`
                                    transition-transform duration-300
                                    ${
                                        showAllSeasons
                                            ? "rotate-180"
                                            : ""
                                    }
                                `}
                            />

                        </button>

                    </div>

                )}

            </div>

        </section>
    );
};

export default CurrentSeason;