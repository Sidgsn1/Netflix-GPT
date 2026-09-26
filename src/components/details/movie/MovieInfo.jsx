import { CalendarDays, Clock3, Languages, CircleDollarSign } from "lucide-react";

const MovieInfo = ({ movie }) => {

    if (!movie) return null;

    return (
        <section className="py-8">

            <h2 className="text-2xl font-semibold text-yellow-100 mb-6">
                Movie Details
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                {/* Release Date */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <CalendarDays size={16} />
                        <span>Release Date</span>
                    </div>

                    <p className="text-white">
                        {movie.release_date || "N/A"}
                    </p>
                </div>


                {/* Runtime */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <Clock3 size={16} />
                        <span>Runtime</span>
                    </div>

                    <p className="text-white">
                        {movie.runtime
                            ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                            : "N/A"
                        }
                    </p>
                </div>


                {/* Original Language */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <Languages size={16} />
                        <span>Original Language</span>
                    </div>

                    <p className="text-white uppercase">
                        {movie.original_language || "N/A"}
                    </p>
                </div>


                {/* Budget */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <CircleDollarSign size={16} />
                        <span>Budget</span>
                    </div>

                    <p className="text-white">
                        {movie.budget
                            ? `$${movie.budget.toLocaleString()}`
                            : "N/A"
                        }
                    </p>
                </div>

                {/* Revenue */}

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                        <CircleDollarSign size={16} />
                        <span>Revenue</span>
                    </div>

                    <p className="text-white">
                        {movie.revenue
                            ? `$${movie.revenue.toLocaleString()}`
                            : "N/A"
                        }
                    </p>
                </div>

            </div>


            {/* Additional Information */}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <h3 className="text-sm text-white/40 mb-2">
                        Original Title
                    </h3>

                    <p className="text-white">
                        {movie.original_title || "N/A"}
                    </p>
                </div>


                <div>
                    <h3 className="text-sm text-white/40 mb-2">
                        Status
                    </h3>

                    <p className="text-white">
                        {movie.status || "N/A"}
                    </p>
                </div>


                <div>
                    <h3 className="text-sm text-white/40 mb-2">
                        Production Companies
                    </h3>

                    <p className="text-white">
                        {movie.production_companies?.length
                            ? movie.production_companies
                                .map(company => company.name)
                                .join(", ")
                            : "N/A"
                        }
                    </p>
                </div>


                <div>
                    <h3 className="text-sm text-white/40 mb-2">
                        Production Countries
                    </h3>

                    <p className="text-white">
                        {movie.production_countries?.length
                            ? movie.production_countries
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

export default MovieInfo;