import { useSelector } from "react-redux"
import WatchlistCard from "./WatchlistCard"
import WatchlistEmpty from "./WatchlistEmpty"
import WatchlistListCard from "./WatchlistListCard"

const WatchlistGrid = () => {
  const watchlistMovies=useSelector(store=>store.watchlist.movies)
  const movieGenres = useSelector(store => store.movies.genres);
  const tvGenres = useSelector(store => store.tv.genres);
  const selectedSort = useSelector(store => store.watchlistUI.sortBy);
  const selectedView = useSelector(store => store.watchlistUI.view);
  const selectedFilter = useSelector(store => store.watchlistUI.filter);

    if(watchlistMovies.length === 0) return <WatchlistEmpty />

    let filteredMovies = [...watchlistMovies];

    switch (selectedFilter) {

        case "movie":
            filteredMovies = filteredMovies.filter(
                (item) => item.mediaType === "movie"
            );
            break;

        case "tv":
            filteredMovies = filteredMovies.filter(
                (item) => item.mediaType === "tv"
            );
            break;

        default:
            break;
    }

    let sortedMovies = [...filteredMovies];

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
    <section className="bg-[#09090B] px-4 sm:px-6 lg:px-10 pb-24 md:pb-16">

        {
            selectedView === "grid" ? (

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">

                    {
                        sortedMovies.map(movie => (
                            <WatchlistCard
                                key={`${movie.mediaType}_${movie.movieId}`}
                                movieData={movie}
                                genres={
                                    movie.mediaType === "tv"
                                        ? tvGenres
                                        : movieGenres
                                }
                            />
                        ))
                    }

                </div>

            ) : (

                <div className="flex flex-col gap-5">

                    {
                        sortedMovies.map(movie => (
                            <WatchlistListCard
                                key={`${movie.mediaType}_${movie.movieId}`}
                                movieData={movie}
                                genres={
                                    movie.mediaType === "tv"
                                        ? tvGenres
                                        : movieGenres
                                }
                            />
                        ))
                    }

                </div>

            )
        }

    </section>
  )
}

export default WatchlistGrid