
import watchlistBg from "../../assets/images/watchlistBg.png"


const TVHero = () => {

  return (
    <section className='relative h-[360px] overflow-hidden flex pt-20'>
      {/* Background img */}
      <div className="absolute inset-0 bg-cover bg-no-repeat"style={{backgroundImage:`url(${watchlistBg})`,backgroundSize:"65%",backgroundPosition:"100% 30%"}}></div>
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#09090B]" />
      {/* content */}

      <div className="relative z-30 p-10 pt-20">
        <div className="flex gap-5 text-white">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl lg:text-5xl font-bold">TV Shows</h1>
            <p className="text-sm lg:text-lg text-zinc-300">Discover the best TV Shows from around the world.</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default TVHero