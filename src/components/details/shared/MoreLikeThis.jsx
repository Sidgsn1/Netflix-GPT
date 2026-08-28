import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMG_CDN_URL } from "../../../utils/constants";
import { useNavigate } from "react-router";
import NoPosterExist from "../../../assets/images/noPoster.png";

const MoreLikeThis = ({ media }) => {
    
    const navigate = useNavigate();

    if (!media || media.length === 0) return null;

    const scrollMedia = (direction) => {
        const container = document.getElementById("more-like-this-container");

        if (!container) return;

        container.scrollBy({
            left: direction === "left" ? -600 : 600,
            behavior: "smooth",
        });
    };

    return (
        <section className="px-6 py-8">

            {/* Heading + Arrows */}

            <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-semibold text-yellow-100">
                    More Like This
                </h2>

                <div className="flex gap-3">

                    <button
                        onClick={() => scrollMedia("left")}
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={() => scrollMedia("right")}
                        className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
                    >
                        <ChevronRight size={20} />
                    </button>

                </div>

            </div>


            {/* Movies Container */}

            <div
                id="more-like-this-container"
                className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
            >

                {media.map((item) => {

                    const title = item.title || item.name;

                    return (
                        <div
                            key={item.id}
                            className="group cursor-pointer shrink-0 w-44"
                            onClick={() => navigate(`/movie/${item.id}`)}
                        >

                            <div className="aspect-[2/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">

                                <img
                                    src={
                                        item.poster_path
                                            ? IMG_CDN_URL + item.poster_path
                                            : NoPosterExist
                                    }
                                    alt={title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                            </div>

                            <div className="mt-3">

                                <h3 className="text-sm font-medium text-white truncate">
                                    {title}
                                </h3>

                                <div className="flex items-center gap-2 mt-1 text-xs text-white/40">

                                    <span>
                                        {
                                            (
                                                item.release_date ||
                                                item.first_air_date
                                            )?.split("-")[0] || "-"
                                        }
                                    </span>

                                    <span>•</span>

                                    <span>
                                        ⭐ {item.vote_average?.toFixed(1) || "N/A"}
                                    </span>

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
};

export default MoreLikeThis;