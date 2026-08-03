import { Bookmark, Clock, Star } from "lucide-react";
import { IMG_CDN_URL } from "../utils/constants";
import NoPosterExist from "../assets/images/noPoster.png"
import { formatRelativeTime } from "../utils/formatRelativeTime";

const WatchlistListCard = ({movieData,genres}) => {
    const {title,poster_path,vote_average,release_date,genre_ids,overview,addedAt,} = movieData;

    const movieGenres =genre_ids?.slice(0, 2)?.map((id) => genres?.[id])?.join(", ") || "Unknown";
    const releaseYear = release_date? release_date.split("-")[0]: "-";
    const addedDate = addedAt?.toDate().toLocaleDateString("en-GB", {day: "numeric",month: "short",year: "numeric",});

  return (
    <div  className=" group flex items-center gap-6 h-38 rounded-2xl border border-zinc-800 bg-[#101012] px-5 transition-all
        duration-300 hover:border-violet-500/40 hover:bg-[#151518]">
        <div className="w-48 h-26 shrink-0 overflow-hidden rounded-xl">

            <img className="w-full h-full object-contain object-top" src={poster_path?IMG_CDN_URL+poster_path:NoPosterExist}/>

        </div>

        <div className="flex-1">
            <div className="flex gap-2 items-center">
                <h2 className="font-semibold text-2xl text-white">{title}</h2>
                <Bookmark  fill="#8B5CF6" color="#8B5CF6"/>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                {overview || "No overview available"}
            </p>
        </div>
        <div className="w-20">
            <span className="rounded-lg bg-violet-900/40 px-2 py-2 text-sm font-semibold tracking-wider text-white">
                {releaseYear}
            </span>
        </div>

        <div className="w-44 text-sm text-zinc-300">
            {movieGenres || "unknown"}
        </div>

        <div className="flex items-center gap-2 w-20 text-white">
            <Star fill="gold" color="gold" size={18}/><span className="font-semibold text-sm tracking-wider">{vote_average?.toFixed(1)}</span>
        </div>

        <div className="flex  w-32  gap-2 text-white">
            <Clock color="#8B5CF6" size={20}/>
            <div className="flex flex-col gap-1">
                <span className="text-sm">{formatRelativeTime(addedAt)}</span>
                <span className="text-xs">{addedDate}</span>
            </div>
        </div>
        <button>
            ...
        </button>
    </div>
  )
}

export default WatchlistListCard