import {
    CalendarDays,
    Clock3,
    Languages,
    Tv,
    Film
} from "lucide-react";

const TVInfo = ({ tv }) => {

    if (!tv) return null;

    return (
        <section className="py-8">

            <h2 className="text-xl font-semibold text-yellow-100 mb-6">
                TV Details
            </h2>

            {/* Main Information */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {/* First Air Date */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">

                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <CalendarDays size={16} />
                        <span>First Air Date</span>
                    </div>

                    <p className="text-white">
                        {tv.first_air_date || "N/A"}
                    </p>

                </div>


                {/* Last Air Date */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">

                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <CalendarDays size={16} />
                        <span>Last Air Date</span>
                    </div>

                    <p className="text-white">
                        {tv.last_air_date || "N/A"}
                    </p>

                </div>


                {/* Seasons */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">

                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <Tv size={16} />
                        <span>Seasons</span>
                    </div>

                    <p className="text-white">
                        {tv.number_of_seasons || "N/A"}
                    </p>

                </div>


                {/* Episodes */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">

                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <Film size={16} />
                        <span>Episodes</span>
                    </div>

                    <p className="text-white">
                        {tv.number_of_episodes || "N/A"}
                    </p>

                </div>

            </div>


            {/* Additional Information */}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Original Title */}

                <div>

                    <h3 className="text-sm text-white/40 mb-2">
                        Original Name
                    </h3>

                    <p className="text-white">
                        {tv.original_name || "N/A"}
                    </p>

                </div>


                {/* Status */}

                <div>

                    <h3 className="text-sm text-white/40 mb-2">
                        Status
                    </h3>

                    <p className="text-white">
                        {tv.status || "N/A"}
                    </p>

                </div>


                {/* Original Language */}

                <div>

                    <h3 className="text-sm text-white/40 mb-2">
                        Original Language
                    </h3>

                    <p className="text-white uppercase">
                        {tv.original_language || "N/A"}
                    </p>

                </div>


                {/* Episode Runtime */}

                <div>

                    <h3 className="text-sm text-white/40 mb-2">
                        Episode Runtime
                    </h3>

                    <p className="text-white flex items-center gap-2">
                        <Clock3 size={16} />
                        {tv.episode_run_time?.length
                            ? `${tv.episode_run_time[0]} min`
                            : "N/A"
                        }
                    </p>

                </div>


                {/* Production Companies */}

                <div>

                    <h3 className="text-sm text-white/40 mb-2">
                        Production Companies
                    </h3>

                    <p className="text-white">
                        {tv.production_companies?.length
                            ? tv.production_companies
                                .map(company => company.name)
                                .join(", ")
                            : "N/A"
                        }
                    </p>

                </div>


                {/* Production Countries */}

                <div>

                    <h3 className="text-sm text-white/40 mb-2">
                        Production Countries
                    </h3>

                    <p className="text-white">
                        {tv.production_countries?.length
                            ? tv.production_countries
                                .map(country => country.name)
                                .join(", ")
                            : "N/A"
                        }
                    </p>

                </div>

            </div>

        </section>
    );
};

export default TVInfo;