import { Star } from "lucide-react"
import { IMG_CDN_URL } from "../utils/constants"
import NoPosterExist from "../assets/images/noPoster.png"


const GptMovieCard = ({title,movieData,genres}) => {

    const {poster_path, vote_average, release_date, genre_ids} = movieData
    const movieGenres = genre_ids.slice(0,2).map((id)=>genres[id]).join(", ")

  return (
    <div>
        <div className="h-80 border-[1px] border-amber-50/10 rounded-xl overflow-hidden">
            <div className="w-full h-3/4">
                <img
                    className="w-full h-full object-contain"
                    src={poster_path ? IMG_CDN_URL + poster_path : NoPosterExist}
                    alt={title}
                />
            </div>
            <div className="flex flex-col justify-between p-2 space-y-2">
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
  )
}

export default GptMovieCard