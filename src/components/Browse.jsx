import { useSelector } from "react-redux"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies"
import useTopRatedMovies from "../hooks/useTopRatedMovies"
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import GptSearch from "./GptSearch"
import MainContainer from "./MainContainer"
import useMovieGenres from "../hooks/useMovieGenres"
import useWatchlist from "../hooks/useWatchlist"
import useOnTheAirTV from "../hooks/useOnTheAirTv"
import useTopRatedTV from "../hooks/useTopRatedTv"
import usePopularTV from "../hooks/usePopularTv"
import useAiringTodayTv from "../hooks/useAiringTodayTV"
import useTVGenres from "../hooks/useTvGenres"
import useTrendingMedia from "../hooks/useTrendingMedia"
import HomeContainer from "./HomeContainer"

const Browse=()=>{

    const showGptSearch = useSelector(store=>store.gpt.showGptSearch)
    //Fetch Data from TMDB API and update store
    useTrendingMedia()

    useNowPlayingMovies()
    usePopularMovies()
    useTopRatedMovies()
    useUpcomingMovies()

    useAiringTodayTv();
    usePopularTV();
    useTopRatedTV();
    useOnTheAirTV();

    useMovieGenres()
    useTVGenres()
    useWatchlist()
    console.log("browse page is herer")
    return(
        <div className="bg-black">
            {
                showGptSearch ? (<GptSearch />) : (
                    <>
                        <MainContainer />
                        <HomeContainer />
                    </>
                )
            }
        </div>
    )
}

export default Browse