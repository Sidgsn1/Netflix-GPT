import { useRef } from "react";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";

import GptMovieCard from "./GptMovieCard";

const MovieList = ({ title, media, type }) => {

    const movieGenres = useSelector((store) => store.movies.genres);
    const tvGenres = useSelector((store) => store.tv.genres);

    const scrollRef = useRef(null);

    if (!media) return null;

    const scroll = (direction) => {

        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({
            left: direction === "left" ? -500 : 500,
            behavior: "smooth",
        });
    };

    return (
        <div className="bg-transparent">

            {/* Section Title */}
            <h1 className="text-lg md:text-2xl font-semibold tracking-tighter py-5">
                {title}
            </h1>

            {/* Scroll Container */}
            <div className="relative">

                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto no-scrollbar scroll-smooth"
                >

                    <div className="flex gap-2 lg:gap-4">

                        {media.map((item) => (

                            <div
                                key={item.id}
                                className="w-32 lg:w-52 shrink-0"
                            >

                                <GptMovieCard
                                    title={item.title || item.name}

                                    genres={
                                        type === "movie"
                                            ? movieGenres
                                            : type === "tv"
                                            ? tvGenres
                                            : item.media_type === "tv"
                                            ? tvGenres
                                            : movieGenres
                                    }

                                    mediaData={item}
                                    type={type}
                                />

                            </div>

                        ))}

                    </div>

                </div>


                {/* Left Arrow */}

                <button
                    onClick={() => scroll("left")}
                    className=" absolute left-2 top-2/5 lg:top-1/2 -translate-y-1/2 z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full  bg-black/70 backdrop-blur-md border  border-white/10  text-white flex items-center justify-center  hover:bg-white/20 transition cursor-pointer
                    "
                >
                    <ChevronLeft size={22} />
                </button>


                {/* Right Arrow */}

                <button
                    onClick={() => scroll("right")}
                    className=" absolute right-2 top-2/5 lg:top-1/2 -translate-y-1/2 z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full  bg-black/70 backdrop-blur-md border  border-white/10  text-white flex items-center justify-center  hover:bg-white/20 transition cursor-pointer
                    "
                >
                    <ChevronRight size={22} />
                </button>

            </div>

        </div>
    );
};

export default MovieList;