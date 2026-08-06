import { useSelector } from "react-redux"
import MovieList from "../MovieList"


const MovieSection = () => {
  const movies = useSelector(store=>store.movies)

  if(!movies.nowPlayingMovies || !movies.popularMovies || !movies.topRatedMovies || !movies.upcomingMovies) return null;

  console.log("secondary,",movies.nowPlayingMovies)
  return (
    <div className=" text-white  relative z-30 px-4 py-5 sm:px-6 md:px-10 lg:px-12">
        <MovieList title={"Now Playing"} media={movies.nowPlayingMovies} type={"movie"} />
        <MovieList title={"Popular"} media={movies.popularMovies} type={"movie"} />
        <MovieList title={"Top Rated"} media={movies.topRatedMovies} type={"movie"} />
        <MovieList title={"Upcoming"} media={movies.upcomingMovies} type={"movie"} />
    </div>
  )
}

export default MovieSection


