import { CircleX, Star } from "lucide-react"
import { IMG_CDN_URL } from "../utils/constants"
import NoPosterExist from "../assets/images/noPoster.png"
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "../utils/watchlistSlice";
import { removeMovieFromWatchlist } from "../utils/firestore";

const WatchlistCard = ({movieData,genres}) => {

    const dispatch = useDispatch()
    const uid = useSelector(store => store.user?.uid)

    // const isAdded = watchlistMovies.some(movie=>movie.movieId === movieData.id)

    if (!movieData || !genres) return null;
    const {poster_path, vote_average, release_date, genre_ids,title} = movieData
    const movieGenres = genre_ids?.slice(0,2)?.map((id)=>genres[id])?.join(", ")||"unknown"

    
    const handleRemoveFromWatchlist = async () => {

        if (!uid) return;

        await removeMovieFromWatchlist(uid, movieData.movieId);

        dispatch(removeMovie(movieData.movieId));
    }
    
  return (
    <div>
        <div className="group relative rounded-xl p-[1.5px] transition-all duration-500 ease-out cursor-pointer hover:bg-gradient-to-r hover:from-[#7C3AED] hover:via-[#A855F7] hover:to-[#FBBF24] hover:shadow-[0_0_20px_rgba(168,85,247,.35)]">
            <div className="border-[1px] border-amber-50/10 rounded-xl overflow-hidden">
                <div className="relative">
                    <img
                        className="w-full h-full object-cover"
                        src={poster_path ? IMG_CDN_URL + poster_path : NoPosterExist}
                        alt={title}
                    />
                </div>
                <button
                    onClick={handleRemoveFromWatchlist}
                    className="
                        absolute top-3 right-3 h-8 w-8 rounded-full bg-black backdrop-blur-md flex items-center justify-center border
                        border-white/10 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 cursor-pointer"
                >
                    <CircleX size={30} color="white"/>
                </button>
                
                <div className="flex flex-col justify-between p-2 space-y-2 bg-black">
                    <div className="flex items-center justify-between">
                        <h1 className="text-md text-yellow-100 truncate flex-1">{title}</h1>
                        <div className="flex items-center justify-center border-[1px] border-amber-100/20 text-yellow-100 rounded-md p-1 px-2 gap-2 text-sm shrink-0">
                            <h1 className="tracking-wider leading-none text-sm">{vote_average ? vote_average.toFixed(1):"N/A"}</h1>
                            <Star size={13} fill="gold" color="gold"/>
                        </div>
                    </div>
                    <div className="flex gap-2 text-amber-100/40 items-center text-sm">
                        <h1>{release_date ? release_date.split("-")[0]:"-"}</h1>
                        <div className="w-1 h-1 bg-amber-100/40 rounded-full"></div>
                        <h1 className="truncate">{movieGenres || "unknown"}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WatchlistCard