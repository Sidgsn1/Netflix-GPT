import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import Header from "./Header"

const Browse=()=>{

    //Fetch Data from TMDB API and update store
    useNowPlayingMovies()

    return(
        <div>
            <Header />
        </div>
    )
}

export default Browse