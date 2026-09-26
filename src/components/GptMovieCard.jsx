import {  CirclePlus, Heart, Star, Trash2 } from "lucide-react"
import { IMG_CDN_URL } from "../utils/constants"
import NoPosterExist from "../assets/images/noPoster.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addMovie } from "../utils/watchlistSlice";
import { addMovieToWatchlist } from "../utils/firestore";
import { removeMovie } from "../utils/watchlistSlice";
import { removeMovieFromWatchlist } from "../utils/firestore";

const GptMovieCard = ({title,mediaData,genres,type}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const uid = useSelector(store => store.user?.uid)
    const watchlistMovies = useSelector(store=>store.watchlist.movies)

    if (!mediaData || !genres) return null;
    const mediaType = mediaData.media_type || type || "movie";

    const isAdded = watchlistMovies.some(
        (movie) =>
            movie.movieId === mediaData.id &&
            movie.mediaType === mediaType
    );

    const {poster_path, vote_average, release_date,first_air_date, genre_ids} = mediaData
    const movieGenres = genre_ids?.slice(0,2)?.map((id)=>genres[id])?.join(", ")||"unknown"

    const handleAddToWatchlist = async()=>{
        if (!uid) {
        console.log("User not logged in");
        return;
        }
        console.log("UID:", uid);
        console.log("Movie:", mediaData);

        const savedMovie = await addMovieToWatchlist(uid,mediaData,mediaType);
        dispatch(addMovie(savedMovie));
    }
    
    const handleRemoveFromWatchlist = async () => {

        if (!uid) return;

        await removeMovieFromWatchlist(uid,mediaData.id,mediaType);

        dispatch(removeMovie({movieId: mediaData.id,mediaType: mediaType,}));
    }
    
  return (
    <div>
        <div onClick={() =>navigate(`/${mediaType === "tv" ? "tv" : "movie"}/${mediaData.id}`)}
            className="group relative rounded-xl p-[1.5px]  transition-all duration-500 ease-out cursor-pointer hover:bg-gradient-to-r hover:from-[#7C3AED] hover:via-[#A855F7] hover:to-[#FBBF24] hover:shadow-[0_0_20px_rgba(168,85,247,.35)]">
            <div className="border-[1px] border-amber-50/10 rounded-xl overflow-hidden">
                <div className="relative w-full h-3/4">
                    <img
                        className="w-full h-full object-contain"
                        src={poster_path ? IMG_CDN_URL + poster_path : NoPosterExist}
                        alt={title}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/60 to-transparent
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100">
                    </div>
                    {isAdded && <div className="absolute top-2 left-2 flex items-center gap-2 transition-all duration-200 bg-black/60 px-3 py-2 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <Heart size={18} color="red" fill="red"/>
                        <span className="hidden lg:inline text-sm tracking-wider text-white">In Watchlist</span>
                    </div>}
                    <button className="w-full absolute bottom-3 flex justify-center cursor-pointer
                        opacity-0
                        translate-y-3
                        transition-all
                        duration-300
                        group-hover:opacity-100
                        group-hover:translate-y-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isAdded) {
                                handleRemoveFromWatchlist();
                            } else {
                                handleAddToWatchlist();
                            }
                        }}
                        >
                        <div className="hidden lg:block relative text-white rounded-xl p-[1.5px] bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#FBBF24]">
                            {isAdded ? (<div className="bg-black rounded-xl flex gap-5 px-4 py-3 text-sm">
                                <Trash2 size={20} color="red"/>
                                <span className="font-semibold tracking-wider text-red-500">Remove</span>
                            </div>) 
                            :(<div className="bg-black rounded-xl flex gap-2 px-4 py-3 text-sm">
                                <CirclePlus size={20}/>
                                <span className="font-semibold tracking-wide">Add To Watchlist</span>
                            </div>)}
                        </div>
                    </button>
                </div>
                
                <div className="flex flex-col justify-between p-2 space-y-2 bg-black">
                    <div className="lg:flex items-center justify-between">
                        <h1 className="text-md text-yellow-100 truncate flex-1">{title}</h1>
                        <div className="flex items-center justify-center border-[1px] border-amber-100/20 text-yellow-100 rounded-md p-1 px-2 gap-2 text-sm shrink-0">
                            <h1 className="tracking-wider leading-none text-xs lg:text-sm">{vote_average ? vote_average.toFixed(1):"N/A"}</h1>
                            <Star size={13} fill="gold" color="gold"/>
                        </div>
                    </div>
                    <div className="hidden lg:flex gap-2 text-amber-100/40 items-center text-sm">
                        <h1>{(release_date || first_air_date)? (release_date || first_air_date).split("-")[0]: "-"}</h1>
                        <div className="w-1 h-1 bg-amber-100/40 rounded-full"></div>
                        <h1 className="truncate">{movieGenres || "unknown"}</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GptMovieCard