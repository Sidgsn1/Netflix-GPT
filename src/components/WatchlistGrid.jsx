import { useSelector } from "react-redux"
import WatchlistCard from "./WatchlistCard"
import WatchlistEmpty from "./WatchlistEmpty"

const WatchlistGrid = () => {
  const watchlistMovies=useSelector(store=>store.watchlist.movies)
  const genres = useSelector(store => store.movies.genres)
  const selectedSort = useSelector(store => store.watchlistUI.sortBy);

  if(watchlistMovies.length === 0) return <WatchlistEmpty />

  let sortedMovies = [...watchlistMovies];

  switch (selectedSort) {

    case "Recently Added":
        sortedMovies.sort(
            (a, b) => (b.addedAt?.seconds ?? 0) - (a.addedAt?.seconds ?? 0)
        );
        break;

    case "Oldest Added":
        sortedMovies.sort(
            (a, b) => (a.addedAt?.seconds ?? 0) - (b.addedAt?.seconds ?? 0)
        );
        break;

    case "Highest Rated":
        sortedMovies.sort(
            (a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0)
        );
        break;

    case "Lowest Rated":
        sortedMovies.sort(
            (a, b) => (a.vote_average ?? 0) - (b.vote_average ?? 0)
        );
        break;

    case "Newest Release":
        sortedMovies.sort(
            (a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0)
        );
        break;

    case "Oldest Release":
        sortedMovies.sort(
            (a, b) => new Date(a.release_date || 0) - new Date(b.release_date || 0)
        );
        break;

    default:
        break;
 }


    return (  
    <section className="bg-[#09090B] px-6 lg:px-10 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {
                sortedMovies.map(movie=>(
                    <WatchlistCard key={movie.movieId} movieData={movie} genres={genres} />
                ))
            }
        </div>
    </section>
  )
}

export default WatchlistGrid