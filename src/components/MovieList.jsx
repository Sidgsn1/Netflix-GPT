import MovieCard from "./MovieCard"

const MovieList=({title,movies})=>{
    console.log("movieList",movies)    
    return(
        <div className="bg-transparent">
            <h1 className="text-md md:text-xl lg:text-2xl font-semibold tracking-tighter py-5">{title}</h1>
            <div className="flex overflow-x-scroll no-scrollbar">
                <div className="flex gap-4">
                    {movies.map(movie=><MovieCard key={movie.id} posterPath={movie?.poster_path} />)}
                </div>
            </div>
        </div>
    )
}

export default MovieList