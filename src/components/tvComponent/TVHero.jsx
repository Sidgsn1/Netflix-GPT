
// import { ArrowRight, Bookmark, Play, Star } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";

// import { addMovie, removeMovie } from "../../utils/watchlistSlice";
// import {
//   addMovieToWatchlist,
//   removeMovieFromWatchlist,
// } from "../../utils/firestore";

// const TVHero = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const trendingToday = useSelector(
//     (store) => store.movies.trendingToday
//   );

//   const uid = useSelector((store) => store.user?.uid);

//   const watchlistMovies = useSelector(
//     (store) => store.watchlist.movies
//   );

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const trendingTVShows =
//     trendingToday
//       ?.filter((item) => item.media_type === "tv")
//       .slice(0, 5) || [];

//   useEffect(() => {
//     if (trendingTVShows.length === 0) return;

//     const interval = setInterval(() => {
//       setCurrentIndex(
//         (prev) => (prev + 1) % trendingTVShows.length
//       );
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [trendingTVShows.length]);

//   const tv = trendingTVShows[currentIndex];

//   const isAdded = watchlistMovies.some(
//     (item) =>
//       String(item.movieId) === String(tv?.id) &&
//       item.mediaType === "tv"
//   );

//   const handleWatchlist = async () => {
//     if (!uid || !tv) return;

//     if (isAdded) {
//       await removeMovieFromWatchlist(
//         uid,
//         tv.id,
//         "tv"
//       );

//       dispatch(
//         removeMovie({
//           movieId: tv.id,
//           mediaType: "tv",
//         })
//       );

//       return;
//     }

//     const savedTV = await addMovieToWatchlist(
//       uid,
//       tv,
//       "tv"
//     );

//     dispatch(addMovie(savedTV));
//   };

//   if (!tv) return null;

//   return (
//     <section className="relative h-[520px] md:h-[600px] overflow-hidden">

//       {/* Backdrop */}
//       <div className="absolute inset-0">

//         <img
//           src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
//           alt={tv.name}
//           className="w-full h-full object-cover object-top"
//         />

//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

//       </div>


//       {/* Hero Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 pt-44">

//         <div className="flex items-center gap-8">

//           {/* Poster */}
//           <div className="hidden lg:block w-56 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
//               alt={tv.name}
//               className="w-full aspect-[2/3] object-cover"
//             />
//           </div>


//           {/* TV Details */}
//           <div className="max-w-3xl">

//             <p className="text-yellow-400 font-semibold tracking-widest text-sm mb-3">
//               TRENDING NOW
//             </p>


//             <h1
//               className={`font-bold text-white ${
//                 tv.name.length > 15
//                   ? "text-3xl md:text-4xl lg:text-6xl"
//                   : "text-4xl lg:text-6xl"
//               }`}
//             >
//               {tv.name}
//             </h1>


//             {/* Meta */}
//             <div className="flex items-center gap-4 mt-5 text-sm text-white/70">

//               {tv.first_air_date && (
//                 <span>
//                   {tv.first_air_date.split("-")[0]}
//                 </span>
//               )}

//               <span>•</span>

//               <span className="flex items-center gap-1 text-yellow-400">
//                 <Star size={20} fill="gold" />
//                 {tv.vote_average?.toFixed(1) || "N/A"}
//               </span>

//             </div>


//             {/* Overview */}
//             <p className="mt-4 md:mt-5 text-white/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl line-clamp-4 md:line-clamp-none">
//               {tv.overview}
//             </p>


//             {/* Buttons */}
//             <div className="flex items-center gap-3 mt-7">

//               {/* More Info */}
//               <button
//                 onClick={() => navigate(`/tv/${tv.id}`)}
//                 className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-white text-black text-sm md:text-base font-semibold shadow-[0_0_25px_rgba(250,204,21,0.25)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:bg-yellow-50 transition-all duration-300 cursor-pointer"
//               >
//                 <Play
//                   size={16}
//                   className="md:w-[17px] md:h-[17px]"
//                   fill="currentColor"
//                 />

//                 <span>More Info</span>

//                 <ArrowRight
//                   size={17}
//                   className="md:w-[18px] md:h-[18px] transition-transform duration-300 group-hover:translate-x-1"
//                 />
//               </button>


//               {/* Bookmark */}
//               <button
//                 onClick={handleWatchlist}
//                 className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 cursor-pointer ${
//                   isAdded
//                     ? "bg-yellow-400/15 border-yellow-400 text-yellow-400"
//                     : "bg-black/40 border-white/20 text-white hover:border-yellow-400 hover:text-yellow-400 hover:bg-black/60"
//                 }`}
//               >
//                 <Bookmark
//                   size={18}
//                   className="md:w-5 md:h-5"
//                   fill={isAdded ? "currentColor" : "none"}
//                 />
//               </button>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* Slide Indicators */}
//       <div className="absolute bottom-8 right-10 z-20 flex gap-2">

//         {trendingTVShows.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`h-2 rounded-full transition-all duration-300 ${
//               currentIndex === index
//                 ? "w-8 bg-yellow-400"
//                 : "w-2 bg-white/40"
//             }`}
//           />
//         ))}

//       </div>

//     </section>
//   );
// };

// export default TVHero;

import { ArrowRight, Bookmark, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { addMovie, removeMovie } from "../../utils/watchlistSlice";
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../../utils/firestore";

const TVHero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const trendingToday = useSelector(
    (store) => store.movies.trendingToday
  );

  const uid = useSelector((store) => store.user?.uid);

  const watchlistMovies = useSelector(
    (store) => store.watchlist.movies
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const trendingTVShows =
    trendingToday
      ?.filter((item) => item.media_type === "tv")
      .slice(0, 5) || [];

  useEffect(() => {
    if (trendingTVShows.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % trendingTVShows.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [trendingTVShows.length]);

  const tv = trendingTVShows[currentIndex];

  const isAdded = watchlistMovies.some(
    (item) =>
      String(item.movieId) === String(tv?.id) &&
      item.mediaType === "tv"
  );

  const handleWatchlist = async () => {
    if (!uid || !tv) return;

    if (isAdded) {
      await removeMovieFromWatchlist(
        uid,
        tv.id,
        "tv"
      );

      dispatch(
        removeMovie({
          movieId: tv.id,
          mediaType: "tv",
        })
      );

      return;
    }

    const savedTV = await addMovieToWatchlist(
      uid,
      tv,
      "tv"
    );

    dispatch(addMovie(savedTV));
  };

  if (!tv) return null;

  return (
    <section className="relative h-[520px] md:h-[600px] overflow-hidden">

      {/* Backdrop */}
      <div className="absolute inset-0">

        <img
          src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
          alt={tv.name}
          className="w-full h-full object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

      </div>


      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 pt-44">

        <div className="flex items-center gap-8">

          {/* Poster */}
          <div className="hidden lg:block w-56 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">

            <img
              src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
              alt={tv.name}
              className="w-full aspect-[2/3] object-cover"
            />

          </div>


          {/* TV Details */}
          <div className="w-full max-w-3xl">

            {/* Trending */}
            <p className="text-yellow-400 font-semibold tracking-widest text-sm mb-2 md:mb-3">
              TRENDING NOW
            </p>


            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
              {tv.name}
            </h1>


            {/* Meta */}
            <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-5 text-sm text-white/70">

              {tv.first_air_date && (
                <span>
                  {tv.first_air_date.split("-")[0]}
                </span>
              )}

              <span>•</span>

              <span className="flex items-center gap-1 text-yellow-400">
                <Star
                  size={18}
                  className="md:w-5 md:h-5"
                  fill="gold"
                />
                {tv.vote_average?.toFixed(1) || "N/A"}
              </span>

            </div>


            {/* Overview */}
            <p className="mt-3 md:mt-5 text-white/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl line-clamp-3 md:line-clamp-none">
              {tv.overview}
            </p>


            {/* Buttons */}
            <div className="flex items-center gap-3 mt-5 md:mt-7">

              {/* More Info */}
              <button
                onClick={() => navigate(`/tv/${tv.id}`)}
                className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-white text-black text-sm md:text-base font-semibold shadow-[0_0_25px_rgba(250,204,21,0.25)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:bg-yellow-50 transition-all duration-300 cursor-pointer"
              >

                <Play
                  size={16}
                  className="md:w-[17px] md:h-[17px]"
                  fill="currentColor"
                />

                <span>More Info</span>

                <ArrowRight
                  size={17}
                  className="md:w-[18px] md:h-[18px] transition-transform duration-300 group-hover:translate-x-1"
                />

              </button>


              {/* Watchlist */}
              <button
                onClick={handleWatchlist}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isAdded
                    ? "bg-yellow-400/15 border-yellow-400 text-yellow-400"
                    : "bg-black/40 border-white/20 text-white hover:border-yellow-400 hover:text-yellow-400 hover:bg-black/60"
                }`}
              >

                <Bookmark
                  size={18}
                  className="md:w-5 md:h-5"
                  fill={isAdded ? "currentColor" : "none"}
                />

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-10 z-20 flex gap-2">

        {trendingTVShows.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-8 bg-yellow-400"
                : "w-2 bg-white/40"
            }`}
          />
        ))}

      </div>

    </section>
  );
};

export default TVHero;