import { useSelector } from "react-redux"
import WatchlistCard from "./WatchlistCard"

const WatchlistGrid = () => {
  const watchlistMovies=useSelector(store=>store.watchlist.movies)
  const genres = useSelector(store => store.movies.genres)

  if(watchlistMovies.length === 0) return <h1>No movies</h1>
  
    return (  
    <section className="bg-[#09090B] px-6 lg:px-10 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {
                watchlistMovies.map(movie=>(
                    <WatchlistCard key={movie.movieId} movieData={movie} genres={genres} />
                ))
            }
        </div>
    </section>
  )
}

export default WatchlistGrid