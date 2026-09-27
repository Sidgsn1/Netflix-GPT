
// // import { Bookmark, Clock, MoreVertical, Star } from "lucide-react";
// // import { IMG_CDN_URL } from "../utils/constants";
// // import NoPosterExist from "../assets/images/noPoster.png";
// // import { formatRelativeTime } from "../utils/formatRelativeTime";

// // const WatchlistListCard = ({ movieData, genres }) => {
// //   const {
// //     backdrop_path,
// //     poster_path,
// //     title,
// //     vote_average,
// //     release_date,
// //     genre_ids,
// //     overview,
// //     addedAt,
// //   } = movieData;

// //   const movieGenres =
// //     genre_ids
// //       ?.slice(0, 2)
// //       ?.map((id) => genres?.[id])
// //       ?.join(", ") || "Unknown";

// //   const releaseYear = release_date
// //     ? release_date.split("-")[0]
// //     : "-";

// //   const addedDate = addedAt?.toDate().toLocaleDateString("en-GB", {
// //     day: "numeric",
// //     month: "short",
// //     year: "numeric",
// //   });

// //   return (
// //     <div
// //       className="
// //         group
// //         flex items-center gap-4
// //         md:gap-6
// //         min-h-[116px]
// //         md:h-38
// //         rounded-2xl
// //         border border-zinc-800
// //         bg-[#101012]
// //         p-3
// //         md:px-5
// //         transition-all duration-300
// //         hover:border-violet-500/40
// //         hover:bg-[#151518]
// //       "
// //     >

// //       {/* Poster */}

// //       <div className="w-20 h-24 md:w-48 md:h-26 shrink-0 overflow-hidden rounded-xl">
// //         <picture>

// //           {/* Mobile → Poster */}
// //           <source
// //             media="(max-width: 767px)"
// //             srcSet={
// //               poster_path
// //                 ? IMG_CDN_URL + poster_path
// //                 : NoPosterExist
// //             }
// //           />

// //           {/* Tablet / Desktop → Backdrop */}
// //           <img
// //             className="w-full h-full object-cover"
// //             src={
// //               backdrop_path
// //                 ? IMG_CDN_URL + backdrop_path
// //                 : poster_path
// //                 ? IMG_CDN_URL + poster_path
// //                 : NoPosterExist
// //             }
// //             alt={title}
// //           />

// //         </picture>
// //       </div>


// //       {/* Main Content */}

// //       <div className="flex-1 min-w-0">

// //         {/* Title */}

// //         <div className="flex items-center justify-between gap-2">

// //           <h2 className="font-semibold text-sm md:text-2xl text-white truncate">
// //             {title}
// //           </h2>

// //           {/* Bookmark */}

// //           <Bookmark
// //             className="shrink-0 text-violet-500"
// //             fill="currentColor"
// //             size={18}
// //           />

// //         </div>


// //         {/* Desktop Overview */}

// //         <p className="hidden md:block mt-2 line-clamp-2 text-sm text-zinc-400">
// //           {overview || "No overview available"}
// //         </p>


// //         {/* Mobile Meta */}

// //         <div className="md:hidden">

// //           {/* Year + Runtime */}

// //           <p className="mt-1 text-xs text-zinc-500">
// //             {releaseYear}

// //             <span className="mx-1.5">
// //               •
// //             </span>

// //             {movieData.runtime || "2h 15m"}
// //           </p>


// //           {/* Rating + Genres */}

// //           <div className="flex items-center gap-2 mt-2 flex-wrap">

// //             {/* Rating */}

// //             <span className="flex items-center gap-1 text-xs font-semibold text-white">

// //               <Star
// //                 size={13}
// //                 fill="gold"
// //                 color="gold"
// //               />

// //               {vote_average?.toFixed(1) || "N/A"}

// //             </span>


// //             {/* Genres */}

// //             {movieGenres
// //               .split(", ")
// //               .slice(0, 2)
// //               .map((genre) => (
// //                 <span
// //                   key={genre}
// //                   className="
// //                     rounded-full
// //                     bg-[#1B1B24]
// //                     px-2.5
// //                     py-1
// //                     text-[10px]
// //                     text-zinc-300
// //                   "
// //                 >
// //                   {genre}
// //                 </span>
// //               ))}

// //           </div>

// //         </div>

// //       </div>


// //       {/* Desktop Year */}

// //       <div className="hidden md:block w-20">

// //         <span
// //           className="
// //             rounded-lg
// //             bg-violet-900/40
// //             px-2
// //             py-2
// //             text-sm
// //             font-semibold
// //             tracking-wider
// //             text-white
// //           "
// //         >
// //           {releaseYear}
// //         </span>

// //       </div>


// //       {/* Desktop Genres */}

// //       <div className="hidden md:block w-44 text-sm text-zinc-300">
// //         {movieGenres}
// //       </div>


// //       {/* Desktop Rating */}

// //       <div className="hidden md:flex items-center gap-2 w-20 text-white">

// //         <Star
// //           fill="gold"
// //           color="gold"
// //           size={18}
// //         />

// //         <span className="font-semibold text-sm tracking-wider">
// //           {vote_average?.toFixed(1)}
// //         </span>

// //       </div>


// //       {/* Desktop Added */}

// //       <div className="hidden md:flex w-32 gap-2 text-white">

// //         <Clock
// //           color="#8B5CF6"
// //           size={20}
// //         />

// //         <div className="flex flex-col gap-1">

// //           <span className="text-sm">
// //             {formatRelativeTime(addedAt)}
// //           </span>

// //           <span className="text-xs">
// //             {addedDate}
// //           </span>

// //         </div>

// //       </div>


// //       {/* More Button */}

// //       <button
// //         className="
// //           shrink-0
// //           flex items-center justify-center
// //           w-8 h-8
// //           rounded-full
// //           text-zinc-400
// //           hover:bg-zinc-800
// //           hover:text-white
// //           transition
// //         "
// //       >
// //         <MoreVertical size={18} />
// //       </button>

// //     </div>
// //   );
// // };

// // export default WatchlistListCard;

// import {
//   Bookmark,
//   Clock,
//   MoreVertical,
//   Star,
//   Info,
//   Trash2,
// } from "lucide-react";

// import { IMG_CDN_URL } from "../utils/constants";
// import NoPosterExist from "../assets/images/noPoster.png";
// import { formatRelativeTime } from "../utils/formatRelativeTime";
// import { useState } from "react";

// const WatchlistListCard = ({ movieData, genres }) => {
//   const [showMenu, setShowMenu] = useState(false);

//   const {
//     backdrop_path,
//     poster_path,
//     title,
//     vote_average,
//     release_date,
//     genre_ids,
//     overview,
//     addedAt,
//   } = movieData;

//   const movieGenres =
//     genre_ids
//       ?.slice(0, 2)
//       ?.map((id) => genres?.[id])
//       ?.join(", ") || "Unknown";

//   const releaseYear = release_date
//     ? release_date.split("-")[0]
//     : "-";

//   const addedDate = addedAt?.toDate().toLocaleDateString("en-GB", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <div
//       className="
//         group
//         flex items-center gap-4
//         md:gap-6
//         min-h-[116px]
//         md:h-38
//         rounded-2xl
//         border border-zinc-800
//         bg-[#101012]
//         p-3
//         md:px-5
//         transition-all duration-300
//         hover:border-violet-500/40
//         hover:bg-[#151518]
//       "
//     >

//       {/* Poster */}

//       <div className="w-20 h-24 md:w-48 md:h-26 shrink-0 overflow-hidden rounded-xl">

//         <picture>

//           {/* Mobile → Poster */}

//           <source
//             media="(max-width: 767px)"
//             srcSet={
//               poster_path
//                 ? IMG_CDN_URL + poster_path
//                 : NoPosterExist
//             }
//           />

//           {/* Tablet / Desktop → Backdrop */}

//           <img
//             className="w-full h-full object-cover"
//             src={
//               backdrop_path
//                 ? IMG_CDN_URL + backdrop_path
//                 : poster_path
//                 ? IMG_CDN_URL + poster_path
//                 : NoPosterExist
//             }
//             alt={title}
//           />

//         </picture>

//       </div>


//       {/* Main Content */}

//       <div className="flex-1 min-w-0">

//         {/* Title */}

//         <div className="flex items-center justify-between gap-2">

//           <h2 className="font-semibold text-sm md:text-2xl text-white truncate">
//             {title}
//           </h2>

//           {/* Bookmark */}

//           <Bookmark
//             className="shrink-0 text-violet-500"
//             fill="currentColor"
//             size={18}
//           />

//         </div>


//         {/* Desktop Overview */}

//         <p className="hidden md:block mt-2 line-clamp-2 text-sm text-zinc-400">
//           {overview || "No overview available"}
//         </p>


//         {/* Mobile Meta */}

//         <div className="md:hidden">

//           {/* Year + Runtime */}

//           <p className="mt-1 text-xs text-zinc-500">

//             {releaseYear}

//             <span className="mx-1.5">
//               •
//             </span>

//             {movieData.runtime || "2h 15m"}

//           </p>


//           {/* Rating + Genres */}

//           <div className="flex items-center gap-2 mt-2 flex-wrap">

//             {/* Rating */}

//             <span className="flex items-center gap-1 text-xs font-semibold text-white">

//               <Star
//                 size={13}
//                 fill="gold"
//                 color="gold"
//               />

//               {vote_average?.toFixed(1) || "N/A"}

//             </span>


//             {/* Genres */}

//             {movieGenres
//               .split(", ")
//               .slice(0, 2)
//               .map((genre) => (
//                 <span
//                   key={genre}
//                   className="
//                     rounded-full
//                     bg-[#1B1B24]
//                     px-2.5
//                     py-1
//                     text-[10px]
//                     text-zinc-300
//                   "
//                 >
//                   {genre}
//                 </span>
//               ))}

//           </div>

//         </div>

//       </div>


//       {/* Desktop Year */}

//       <div className="hidden md:block w-20">

//         <span
//           className="
//             rounded-lg
//             bg-violet-900/40
//             px-2
//             py-2
//             text-sm
//             font-semibold
//             tracking-wider
//             text-white
//           "
//         >
//           {releaseYear}
//         </span>

//       </div>


//       {/* Desktop Genres */}

//       <div className="hidden md:block w-44 text-sm text-zinc-300">
//         {movieGenres}
//       </div>


//       {/* Desktop Rating */}

//       <div className="hidden md:flex items-center gap-2 w-20 text-white">

//         <Star
//           fill="gold"
//           color="gold"
//           size={18}
//         />

//         <span className="font-semibold text-sm tracking-wider">
//           {vote_average?.toFixed(1)}
//         </span>

//       </div>


//       {/* Desktop Added */}

//       <div className="hidden md:flex w-32 gap-2 text-white">

//         <Clock
//           color="#8B5CF6"
//           size={20}
//         />

//         <div className="flex flex-col gap-1">

//           <span className="text-sm">
//             {formatRelativeTime(addedAt)}
//           </span>

//           <span className="text-xs">
//             {addedDate}
//           </span>

//         </div>

//       </div>


//       {/* More Button + Menu */}

//       <div className="relative shrink-0">

//         <button
//           onClick={() => setShowMenu((prev) => !prev)}
//           className="
//             flex items-center justify-center
//             w-8 h-8
//             rounded-full
//             text-zinc-400
//             hover:bg-zinc-800
//             hover:text-white
//             transition
//             cursor-pointer
//           "
//         >
//           <MoreVertical size={18} />
//         </button>


//         {/* Quick Actions */}

//         {showMenu && (
//           <div
//             className=" absolute right-10 top-1/2 -translate-y-1/2 w-40 rounded-xl border border-zinc-800  bg-[#111114] p-1.5 shadow-2xl z-50"
//           >

//             {/* More Info */}

//             <button
//               className="
//                 w-full
//                 flex items-center gap-3
//                 px-3 py-2.5
//                 rounded-lg
//                 text-sm
//                 text-zinc-300
//                 hover:bg-violet-500/10
//                 hover:text-white
//                 transition
//                 cursor-pointer
//               "
//             >
//               <Info size={17} />

//               <span>
//                 More Info
//               </span>
//             </button>


//             {/* Remove */}

//             <button
//               className="
//                 w-full
//                 flex items-center gap-3
//                 px-3 py-2.5
//                 rounded-lg
//                 text-sm
//                 text-red-400
//                 hover:bg-red-500/10
//                 transition
//                 cursor-pointer
//               "
//             >
//               <Trash2 size={17} />

//               <span>
//                 Remove
//               </span>
//             </button>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// };

// export default WatchlistListCard;

import {
  Bookmark,
  Clock,
  MoreVertical,
  Star,
  Info,
  Trash2,
} from "lucide-react";

import { IMG_CDN_URL } from "../utils/constants";
import NoPosterExist from "../assets/images/noPoster.png";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeMovie } from "../utils/watchlistSlice";
import { removeMovieFromWatchlist } from "../utils/firestore";

const WatchlistListCard = ({ movieData, genres }) => {
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uid = useSelector((store) => store.user?.uid);

  const {
    backdrop_path,
    poster_path,
    title,
    vote_average,
    release_date,
    genre_ids,
    overview,
    addedAt,
    movieId,
    mediaType,
  } = movieData;

  const movieGenres =
    genre_ids
      ?.slice(0, 2)
      ?.map((id) => genres?.[id])
      ?.join(", ") || "Unknown";

  const releaseYear = release_date
    ? release_date.split("-")[0]
    : "-";

  const addedDate = addedAt?.toDate().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // More Info
  const handleMoreInfo = () => {
    setShowMenu(false);

    if (mediaType === "tv") {
      navigate(`/tv/${movieId}`);
    } else {
      navigate(`/movie/${movieId}`);
    }
  };

  // Remove from Watchlist
  const handleRemove = async () => {
    if (!uid) return;

    await removeMovieFromWatchlist(
      uid,
      movieId,
      mediaType
    );

    dispatch(
      removeMovie({
        movieId,
        mediaType,
      })
    );

    setShowMenu(false);
  };

  return (
    <div
      className="
        group
        flex items-center gap-4
        md:gap-6
        min-h-[116px]
        md:h-38
        rounded-2xl
        border border-zinc-800
        bg-[#101012]
        p-3
        md:px-5
        transition-all duration-300
        hover:border-violet-500/40
        hover:bg-[#151518]
      "
    >

      {/* Poster */}

      <div className="w-20 h-24 md:w-48 md:h-26 shrink-0 overflow-hidden rounded-xl">

        <picture>

          {/* Mobile → Poster */}

          <source
            media="(max-width: 767px)"
            srcSet={
              poster_path
                ? IMG_CDN_URL + poster_path
                : NoPosterExist
            }
          />

          {/* Tablet / Desktop → Backdrop */}

          <img
            className="w-full h-full object-cover"
            src={
              backdrop_path
                ? IMG_CDN_URL + backdrop_path
                : poster_path
                ? IMG_CDN_URL + poster_path
                : NoPosterExist
            }
            alt={title}
          />

        </picture>

      </div>


      {/* Main Content */}

      <div className="flex-1 min-w-0">

        {/* Title */}

        <div className="flex items-center justify-between gap-2">

          <h2 className="font-semibold text-sm md:text-2xl text-white truncate">
            {title}
          </h2>

          {/* Bookmark */}

          <Bookmark
            className="shrink-0 text-violet-500"
            fill="currentColor"
            size={18}
          />

        </div>


        {/* Desktop Overview */}

        <p className="hidden md:block mt-2 line-clamp-2 text-sm text-zinc-400">
          {overview || "No overview available"}
        </p>


        {/* Mobile Meta */}

        <div className="md:hidden">

          {/* Year + Runtime */}

          <p className="mt-1 text-xs text-zinc-500">

            {releaseYear}

            <span className="mx-1.5">
              •
            </span>

            {movieData.runtime || "2h 15m"}

          </p>


          {/* Rating + Genres */}

          <div className="flex items-center gap-2 mt-2 flex-wrap">

            {/* Rating */}

            <span className="flex items-center gap-1 text-xs font-semibold text-white">

              <Star
                size={13}
                fill="gold"
                color="gold"
              />

              {vote_average?.toFixed(1) || "N/A"}

            </span>


            {/* Genres */}

            {movieGenres
              .split(", ")
              .slice(0, 2)
              .map((genre) => (
                <span
                  key={genre}
                  className="
                    rounded-full
                    bg-[#1B1B24]
                    px-2.5
                    py-1
                    text-[10px]
                    text-zinc-300
                  "
                >
                  {genre}
                </span>
              ))}

          </div>

        </div>

      </div>


      {/* Desktop Year */}

      <div className="hidden md:block w-20">

        <span
          className="
            rounded-lg
            bg-violet-900/40
            px-2
            py-2
            text-sm
            font-semibold
            tracking-wider
            text-white
          "
        >
          {releaseYear}
        </span>

      </div>


      {/* Desktop Genres */}

      <div className="hidden md:block w-44 text-sm text-zinc-300">
        {movieGenres}
      </div>


      {/* Desktop Rating */}

      <div className="hidden md:flex items-center gap-2 w-20 text-white">

        <Star
          fill="gold"
          color="gold"
          size={18}
        />

        <span className="font-semibold text-sm tracking-wider">
          {vote_average?.toFixed(1)}
        </span>

      </div>


      {/* Desktop Added */}

      <div className="hidden md:flex w-32 gap-2 text-white">

        <Clock
          color="#8B5CF6"
          size={20}
        />

        <div className="flex flex-col gap-1">

          <span className="text-sm">
            {formatRelativeTime(addedAt)}
          </span>

          <span className="text-xs">
            {addedDate}
          </span>

        </div>

      </div>


      {/* More Button + Menu */}

      <div className="relative shrink-0">

        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="
            flex items-center justify-center
            w-8 h-8
            rounded-full
            text-zinc-400
            hover:bg-zinc-800
            hover:text-white
            transition
            cursor-pointer
          "
        >
          <MoreVertical size={18} />
        </button>


        {/* Quick Actions */}

        {showMenu && (
          <div
            className="
              absolute
              right-10
              top-1/2
              -translate-y-1/2
              w-40
              rounded-xl
              border border-zinc-800
              bg-[#111114]
              p-1.5
              shadow-2xl
              z-50
            "
          >

            {/* More Info */}

            <button
              onClick={handleMoreInfo}
              className="
                w-full
                flex items-center gap-3
                px-3 py-2.5
                rounded-lg
                text-sm
                text-zinc-300
                hover:bg-violet-500/10
                hover:text-white
                transition
                cursor-pointer
              "
            >
              <Info size={17} />

              <span>
                More Info
              </span>
            </button>


            {/* Remove */}

            <button
              onClick={handleRemove}
              className="
                w-full
                flex items-center gap-3
                px-3 py-2.5
                rounded-lg
                text-sm
                text-red-400
                hover:bg-red-500/10
                transition
                cursor-pointer
              "
            >
              <Trash2 size={17} />

              <span>
                Remove
              </span>
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default WatchlistListCard;