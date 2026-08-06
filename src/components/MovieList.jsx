import { useSelector } from "react-redux"
import GptMovieCard from "./GptMovieCard"

const MovieList=({title,media,type})=>{
    // console.log("movieList",movies)    
    const movieGenres = useSelector(store => store.movies.genres)
    const tvGenres = useSelector(store => store.tv.genres)

    if (!media) return null;
    
    return(
        <div className="bg-transparent">
            <h1 className="text-md md:text-xl lg:text-2xl font-semibold tracking-tighter py-5">{title}</h1>
            <div className="flex overflow-x-scroll no-scrollbar">
                <div className="flex gap-4">
                    {/* {movies.map(movie=><GptMovieCard key={movie.id} title={movie.title} genres={genres} movieData={movie} />)} */}
                    {media.map((item) => (
                        <div key={item.id} className="w-52 shrink-0">
                        <GptMovieCard
                            title={item.title || item.name}
                            genres={type === "movie"
                            ? movieGenres
                            : type === "tv"
                            ? tvGenres
                            : item.media_type === "tv"
                            ? tvGenres
                            : movieGenres}
                            mediaData={item}
                            type={type}
                        />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieList