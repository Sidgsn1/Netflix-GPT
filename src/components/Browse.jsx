import { useSelector } from "react-redux"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies"
import useTopRatedMovies from "../hooks/useTopRatedMovies"
import useUpcomingMovies from "../hooks/useUpcomingMovies"
import GptSearch from "./GptSearch"
import Header from "./Header"
import MainContainer from "./MainContainer"
import SecondaryContainer from "./SecondaryContainer"
import useMovieGenres from "../hooks/useMovieGenres"
import useWatchlist from "../hooks/useWatchlist"

const Browse=()=>{

    const showGptSearch = useSelector(store=>store.gpt.showGptSearch)
    //Fetch Data from TMDB API and update store
    useNowPlayingMovies()
    usePopularMovies()
    useTopRatedMovies()
    useUpcomingMovies()
    useMovieGenres()
    useWatchlist()

    return(
        <div className="bg-black">
            <Header />
            {
                showGptSearch ? (<GptSearch />) : (
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>
                )
            }
        </div>
    )
}

export default Browse