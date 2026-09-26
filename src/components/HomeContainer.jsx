import { useSelector } from "react-redux"
import MovieList from "./MovieList"


const HomeContainer = () => {
  const movies = useSelector(store=>store.movies)
  const tv = useSelector(store=>store.tv)

  if(!movies.trendingToday || !movies.trendingWeek || !movies.topRatedMovies || !tv.topRatedTV) return null;

  console.log("secondary,",movies.nowPlayingMovies)
  return (
    <div className=" text-white -mt-40 relative z-30 px-4 py-5 sm:px-6 md:px-10 lg:px-12 pb-20">
        <MovieList title={"Trending Today!"} media={movies.trendingToday} type={"mixed"} />
        <MovieList title={"Treding This Week!"} media={movies.trendingWeek} type={"mixed"} />
        <MovieList title={"Top Rated Movies"} media={movies.topRatedMovies} type={"movie"} />
        <MovieList title={"Top Rated TV Shows"} media={tv.topRatedTV} type={"tv"} />
    </div>
  )
}

export default HomeContainer


