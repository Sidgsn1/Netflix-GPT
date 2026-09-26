import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { IMG_CDN_URL } from "../../../utils/constants";
import NoPosterExist from "../../../assets/images/noPoster.png";

const CastSection = ({ cast }) => {

    const castContainerRef = useRef(null);

    if (!cast || cast.length === 0) return null;

    const scrollLeft = () => {
        castContainerRef.current?.scrollBy({
            left: -400,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        castContainerRef.current?.scrollBy({
            left: 400,
            behavior: "smooth",
        });
    };

    return (
        <section className="py-8">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold text-yellow-100">
                    Cast & Crew
                </h2>

                <div className="flex gap-2">

                    <button
                        onClick={scrollLeft}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <button
                        onClick={scrollRight}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
                    >
                        <ChevronRight size={18} />
                    </button>

                </div>

            </div>


            <div
                ref={castContainerRef}
                className="flex lg:gap-5 mt-6 overflow-x-auto pb-4 no-scrollbar"
            >

                {cast.map((person) => (

                    <div
                        key={person.id}
                        className="group shrink-0 w-32"
                    >

                        <div className="w-28 h-32 lg:w-32 lg:h-40 rounded-xl overflow-hidden bg-white/5 border border-white/10">

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