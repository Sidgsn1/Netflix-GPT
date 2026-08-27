import batmanBg from "../../assets/images/moviesBanner/batmanBg.jpg"
import movieBg from "../../assets/images/moviesBanner/Moviehero.jpeg"
import watchlistBg from "../../assets/images/watchlistBg.png"


const MovieHero = () => {

  return (
    <section className='relative h-[360px] overflow-hidden flex pt-20'>
      {/* Background img */}
      <div className="absolute inset-0 bg-cover bg-no-repeat"style={{backgroundImage:`url(${movieBg})`,backgroundSize:"100%",backgroundPosition:"100% 30%"}}></div>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#000000]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
      {/* content */}

      <div className="relative z-30 p-10 pt-20">
        <div className="flex gap-5 text-white">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl lg:text-5xl font-bold">Movies</h1>
            <p className="text-sm lg:text-lg text-zinc-300">Movies and shows you've saved to watch later</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default MovieHero