import { useNavigate } from "react-router"
import watchlistEmptyBg from "../assets/images/watchlistEmptyBg.png"

const WatchlistEmpty = () => {
    const navigate=useNavigate()
  return (
    <section className="px-6 lg:px-10 pb-16">
        <div className="mx-auto max-w-6xld rounded-3xl border border-white/5 p-8 lg-p-12 bg-[#050508]">
            <div className="grid lg:grid-cols-2 items-center gap-12">
                <div className="relative flex justify-center p-10 lg:p-14 overflow-hidden">
                    <img src={watchlistEmptyBg} alt="watchlist empty" className="border-2 scale-150" />
                    {/* Left Fade */}
                    <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#050508] to-transparent" />

                    {/* Right Fade */}
                    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#050508] to-transparent" />

                    {/* Top Fade */}
                    <div className="absolute top-0 left-0 h-24 w-full bg-gradient-to-b from-[#050508] to-transparent" />

                    {/* Bottom Fade */}
                    <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#050508] to-transparent" />

                </div>

                <div className="px-10 lg:px-14 py-12">
                    <h1 className="text-5xl font-bold text-white leading-tight">Your Watchlist is {" "} <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">Empty</span></h1>

                    <p className="mt-6 text-lg text-zinc-400 leading-8 max-w-md">
                    Save movies and TV shows to watch later.
                    Build your own collection and never lose
                    track of what you want to watch next.
                </p>

                <button className=" mt-10 rounded-xl p-[2px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 cursor-pointer"
                    onClick={()=>navigate("/browse")}>
                    <div className=" flex items-center gap-2 rounded-xl bg-[#111116] px-8 py-4  text-white font-medium">
                        Browse Movies
                    </div>
                </button>
                </div>
            </div>

        </div>
    </section>
  )
}

export default WatchlistEmpty