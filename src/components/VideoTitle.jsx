import { Play, ArrowRight, Bookmark, Star } from "lucide-react";

const VideoTitle = ({ title, overview,releaseDate,genreIds,voteAverage,movieGenres,tvGenres,mediaType,runtime,onWatchlist, isAdded, onMoreInfo, }) => {
    
    const year = releaseDate?.split("-")[0];

    const genreMap = mediaType === "tv" ? tvGenres : movieGenres;

    const genres = genreIds
    ?.map(id => genreMap?.[id])
    .filter(Boolean)
    .slice(0, 2);
  return (
    <div className="w-full h-full absolute text-white bg-gradient-to-r from-black via-black/40 to-transparent flex items-center z-10 px-4 sm:px-6 md:px-10 lg:px-12">

      <div className="flex flex-col mt-28 md:mt-20 lg:mt-0 gap-2.5 md:gap-4 lg:gap-5">

        {/* Label */}
        <p className="text-xs sm:text-sm tracking-[0.25em] text-zinc-400 uppercase">
          Trending Now
        </p>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-3 text-xs sm:text-sm text-zinc-400">

        {year && (
            <>
            <span>{year}</span>
            <span>•</span>
            </>
        )}

        {genres?.map((genre, index) => (
            <span key={genre}>
            {genre}
            {index < genres.length - 1 && " •"}
            </span>
        ))}

        {genres?.length > 0 && <span>•</span>}

        {runtime && (
        <>
            <span>{runtime}</span>
            <span>•</span>
        </>
        )}

        <span className="flex items-center gap-1 text-yellow-400">
            <Star size={14} fill="currentColor" />
            <span className="text-white">
            {voteAverage?.toFixed(1)}
            </span>
        </span>

        </div>

        {/* Overview */}
        <p className="hidden lg:block w-full lg:w-2/6 text-sm lg:text-base text-zinc-300 leading-6">
          {overview}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 mt-2 lg:mt-5">

          {/* More Info */}
          <button
            onClick={onMoreInfo}
            className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-white text-black text-sm md:text-base font-semibold shadow-[0_0_25px_rgba(250,204,21,0.25)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:bg-yellow-50 transition-all duration-300 cursor-pointer"
          >
            <Play size={18} fill="black" />

            <span>More Info</span>

            <ArrowRight size={20} />
          </button>

          {/* Watchlist */}
          <button
            onClick={onWatchlist}
            className=" flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/25  bg-black/20  text-white backdrop-blur-sm  hover:border-white/50  hover:bg-white/10 transition-all duration-300 cursor-pointer"
          >
          <Bookmark
              size={18}
              className="sm:w-[21px] sm:h-[21px]"
              fill={isAdded ? "currentColor" : "none"}
            />
          </button>

        </div>

      </div>

    </div>
  );
};

export default VideoTitle;