import { IMG_CDN_URL } from "../../../utils/constants";
import NoPosterExist from "../../../assets/images/noPoster.png";

const SeasonEpisodes = ({ episodes }) => {

    if (!episodes || episodes.length === 0) {
        return null;
    }

    return (
        <section className="px-6 py-8">

            <h2 className="text-2xl font-semibold text-yellow-100 mb-6">
                Episodes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {episodes.map((episode) => (

                    <div
                        key={episode.id}
                        className="group flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500 transition-all duration-300"
                    >

                        {/* Episode Image */}
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

                        {/* Episode Info */}
                        <div className="flex flex-col justify-center min-w-0">

                            <p className="text-xs text-purple-400">
                                Episode {episode.episode_number}
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-1 truncate">
                                {episode.name}
                            </h3>

                            <div className="flex flex-wrap gap-2 mt-2 text-xs text-white/50">

                                {episode.air_date && (
                                    <span>
                                        {episode.air_date}
                                    </span>
                                )}

                                {episode.runtime && (
                                    <>
                                        <span>•</span>
                                        <span>
                                            {episode.runtime} min
                                        </span>
                                    </>
                                )}

                                <span>•</span>

                                <span>
                                    ⭐ {episode.vote_average?.toFixed(1) || "N/A"}
                                </span>

                            </div>

                            <p className="text-sm text-white/50 mt-3 line-clamp-2">
                                {episode.overview ||
                                    "No description available."}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default SeasonEpisodes;