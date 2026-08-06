import { useSelector } from "react-redux"
import MovieList from "../MovieList"


const TVSection = () => {
  const tv = useSelector(store=>store.tv)

  if(!tv.airingToday || !tv.popularTV || !tv.topRatedTV || !tv.onTheAir) return null;

  console.log("secondary,",tv.nowPlayingMovies)
  return (
    <div className=" text-white  relative z-30 px-4 py-5 sm:px-6 md:px-10 lg:px-12">
        <MovieList title={"Airing Today"} media={tv.airingToday} type={"tv"} />
        <MovieList title={"Popular"} media={tv.popularTV} type={"tv"} />
        <MovieList title={"Top Rated"} media={tv.topRatedTV} type={"tv"} />
        <MovieList title={"Upcoming"} media={tv.onTheAir} type={"tv"} />
    </div>
  )
}

export default TVSection


