import { useSelector } from "react-redux"
import Header from "./Header"
import WatchlistHero from "./WatchlistHero"
import GptSearch from "./GptSearch"
import WatchlistToolbar from "./WatchlistToolbar"
import WatchlistGrid from "./WatchlistGrid"

const WatchlistPage = ()=>{
    const showGptSearch = useSelector(store=>store.gpt.showGptSearch)
    return(
        <div className="min-h-screen bg-[#09090B]">

            <Header />
            {
                showGptSearch ? (<GptSearch />) : (
                    <>
                        <WatchlistHero />
                        <WatchlistToolbar />
                        <WatchlistGrid />
                    </>
                )
            }

        </div>
    )
}

export default WatchlistPage