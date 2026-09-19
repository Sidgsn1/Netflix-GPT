import WatchlistHero from "./WatchlistHero"
import WatchlistToolbar from "./WatchlistToolbar"
import WatchlistGrid from "./WatchlistGrid"

const WatchlistPage = () => {
    return (
        <div className="min-h-screen bg-[#09090B]">
            <WatchlistHero />
            <WatchlistToolbar />
            <WatchlistGrid />
        </div>
    )
}

export default WatchlistPage