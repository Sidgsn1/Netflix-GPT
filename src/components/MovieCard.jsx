import { IMG_CDN_URL } from "../utils/constants"


function MovieCard({posterPath}) {
console.log("Movie card poster",posterPath)
  return (
    <div className="w-48 rounded-md overflow-hidden">
        <img className="w-full object-cover" alt="movie card" src={IMG_CDN_URL + posterPath}></img>
    </div>
  )
}

export default MovieCard