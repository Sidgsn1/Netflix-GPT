import { IMG_CDN_URL } from "../../../utils/constants";
import NoPosterExist from "../../../assets/images/noPoster.png";

const CastSection = ({ cast }) => {

    if (!cast || cast.length === 0) return null;

    return (
        <section className="px-6 py-8">

            <h2 className="text-2xl font-semibold text-yellow-100">
                Cast & Crew
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-5 mt-6">

                {cast.map((person) => (

                    <div
                        key={person.id}
                        className="group"
                    >

                        <div className="aspect-[2/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">

                            <img
                                src={
                                    person.profile_path
                                        ? IMG_CDN_URL + person.profile_path
                                        : NoPosterExist
                                }
                                alt={person.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                        </div>

                        <div className="mt-3">

                            <h3 className="text-sm font-medium text-white truncate">
                                {person.name}
                            </h3>

                            <p className="text-xs text-white/40 truncate mt-1">
                                {person.character || "Unknown"}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default CastSection;