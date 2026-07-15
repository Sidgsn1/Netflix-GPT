import { useSelector } from "react-redux"
import MovieList from "./MovieList"


const SecondaryContainer = () => {
  const movies = useSelector(store=>store.movies)

  if(!movies.nowPlayingMovies || !movies.popularMovies || !movies.topRatedMovies || !movies.upcomingMovies) return null;

  console.log("secondary,",movies.nowPlayingMovies)
  return (
    <div className=" text-white -mt-40 relative z-30 px-4 py-5 sm:px-6 md:px-10 lg:px-12">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
    </div>
  )
}

export default SecondaryContainer