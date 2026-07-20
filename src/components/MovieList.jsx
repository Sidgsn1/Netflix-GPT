import { useSelector } from "react-redux"
import GptMovieCard from "./GptMovieCard"

const MovieList=({title,movies})=>{
    // console.log("movieList",movies)    
    const genres = useSelector(store => store.movies.genres)

    return(
        <div className="bg-transparent">
            <h1 className="text-md md:text-xl lg:text-2xl font-semibold tracking-tighter py-5">{title}</h1>
            <div className="flex overflow-x-scroll no-scrollbar">
                <div className="flex gap-4">
                    {/* {movies.map(movie=><GptMovieCard key={movie.id} title={movie.title} genres={genres} movieData={movie} />)} */}
                    {movies.map((movie) => (
                        <div key={movie.id} className="w-52 shrink-0">
                        <GptMovieCard
                            title={movie.title}
                            genres={genres}
                            movieData={movie}
                        />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieList