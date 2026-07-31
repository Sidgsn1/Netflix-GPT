import { useSelector } from "react-redux"
import watchlistBg from "../assets/images/watchlistBg.png"
import { ArrowLeft, Bookmark } from "lucide-react"
import { useNavigate } from "react-router"


const WatchlistHero = () => {
  const watchlistMovies = useSelector(store=>store.watchlist.movies)
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className='relative h-[360px] overflow-hidden flex pt-20'>
      {/* Background img */}
      <div className="absolute inset-0 bg-cover bg-no-repeat"style={{backgroundImage:`url(${watchlistBg})`,backgroundSize:"65%",backgroundPosition:"100% 30%"}}></div>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#09090B]" />
      {/* content */}

      <div className="relative z-30 p-20">
        <div className="flex gap-5 text-white">
          <button
            onClick={handleGoBack}
            className="flex h-12 w-12 items-center justify-center rounded-full
                      border border-white/10 bg-white/5 backdrop-blur-md
                      transition-all duration-300
                      hover:scale-105 hover:border-violet-500/50 hover:bg-violet-500/10 cursor-pointer"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl lg:text-5xl font-bold">My Watchlist</h1>
            <p className="text-sm lg:text-lg text-zinc-300">Movies and shows you've saved to watch later</p>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 px-4 py-1 rounded-lg border-1 border-zinc-700/50">
                <Bookmark className="text-violet-500" size={20} />
                <h4><span className="text-violet-500">{watchlistMovies.length}</span> Items</h4>
              </div>
              
              <div className="bg-zinc-300/50 w-[1px] h-5"></div>
              
              <div className="flex items-center text-zinc-300">{watchlistMovies.length === 0 ? "Start building your collection" : "Updated just now"}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WatchlistHero