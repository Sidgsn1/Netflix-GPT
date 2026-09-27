
// import {
//   Filter,
//   LayoutGrid,
//   List,
//   ChevronDown,
//   SlidersHorizontal,
// } from "lucide-react";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setSortBy,
//   setView,
//   setFilter,
// } from "../utils/watchlistUISlice";

// const WatchlistToolbar = () => {
//   const [showSortMenu, setShowSortMenu] = useState(false);
//   const [showFilterMenu, setShowFilterMenu] = useState(false);

//   const dispatch = useDispatch();

//   const selectedSort = useSelector(
//     (store) => store.watchlistUI.sortBy
//   );

//   const selectedFilter = useSelector(
//     (store) => store.watchlistUI.filter
//   );

//   const selectedView = useSelector(
//     (store) => store.watchlistUI.view
//   );

//   const getFilterButtonClass = (filterName) => {
//     return `h-10 rounded-xl px-5 text-sm font-medium transition-all ${
//       selectedFilter === filterName
//         ? "bg-violet-900 text-white"
//         : "border border-zinc-800 bg-[#0F0F12] text-zinc-300 hover:border-violet-500/40 hover:bg-violet-500/10"
//     }`;
//   };

//   const getViewButtonClass = (viewName) => {
//     return `flex h-10 w-11 items-center justify-center rounded-xl transition-all duration-300 ${
//       selectedView === viewName
//         ? "bg-violet-900 text-white"
//         : "border border-zinc-800 bg-[#0F0F12] text-zinc-300 hover:border-violet-500/40 hover:bg-violet-500/10"
//     }`;
//   };

//   const sortOptions = [
//     "Recently Added",
//     "Oldest Added",
//     "Highest Rated",
//     "Lowest Rated",
//     "Newest Release",
//     "Oldest Release",
//   ];

//   const filterOptions = [
//     { label: "All", value: "all" },
//     { label: "Movies", value: "movie" },
//     { label: "TV Shows", value: "tv" },
//   ];

//   const selectedFilterLabel =
//     filterOptions.find(
//       (option) => option.value === selectedFilter
//     )?.label || "All";

//   return (
//     <section className="bg-[#09090B] px-4 md:px-6 lg:px-10 py-5 md:py-6">

//       <div className="w-full flex items-center justify-between gap-2 md:gap-4">

//         {/* ================= MOBILE FILTER ================= */}

//         <div className="relative md:hidden">

//           <button
//             onClick={() => setShowFilterMenu((prev) => !prev)}
//             className={`
//               flex items-center gap-3
//               h-10
//               rounded-xl
//               px-4
//               text-sm font-medium
//               border
//               transition-all
//               ${
//                 showFilterMenu
//                   ? "border-violet-500 bg-violet-500/10 text-white"
//                   : "border-zinc-800 bg-[#0F0F12] text-zinc-300"
//               }
//             `}
//           >
//             <Filter size={17} />

//             <span>{selectedFilterLabel}</span>

//             <ChevronDown
//               size={17}
//               className={`transition-transform duration-300 ${
//                 showFilterMenu ? "rotate-180" : ""
//               }`}
//             />
//           </button>


//           {/* Mobile Filter Menu */}

//           {showFilterMenu && (
//             <div
//               className="
//                 absolute
//                 left-0
//                 top-12
//                 w-36
//                 rounded-xl
//                 border border-zinc-800
//                 bg-[#111114]
//                 p-2
//                 shadow-2xl
//                 z-50
//               "
//             >
//               {filterOptions.map((option) => (
//                 <button
//                   key={option.value}
//                   onClick={() => {
//                     dispatch(setFilter(option.value));
//                     setShowFilterMenu(false);
//                   }}
//                   className={`
//                     w-full
//                     flex items-center justify-between
//                     px-3
//                     py-2.5
//                     rounded-lg
//                     text-sm
//                     transition-all
//                     ${
//                       selectedFilter === option.value
//                         ? "bg-violet-900 text-white"
//                         : "text-zinc-300 hover:bg-zinc-800"
//                     }
//                   `}
//                 >
//                   {option.label}

//                   {selectedFilter === option.value && "✓"}
//                 </button>
//               ))}
//             </div>
//           )}

//         </div>


//         {/* ================= DESKTOP FILTER ================= */}

//         <div className="hidden md:flex items-center gap-3">

//           {/* Filter */}

//           <button
//             className="
//               h-10
//               w-11
//               rounded-xl
//               border
//               border-zinc-800
//               bg-[#0F0F12]
//               flex
//               items-center
//               justify-center
//               text-zinc-300
//               transition-all
//               duration-300
//               hover:border-violet-500/40
//               hover:bg-violet-500/10
//             "
//           >
//             <Filter size={18} />
//           </button>


//           {/* All */}

//           <button
//             onClick={() => dispatch(setFilter("all"))}
//             className={getFilterButtonClass("all")}
//           >
//             All
//           </button>


//           {/* Movies */}

//           <button
//             onClick={() => dispatch(setFilter("movie"))}
//             className={getFilterButtonClass("movie")}
//           >
//             Movies
//           </button>


//           {/* TV */}

//           <button
//             onClick={() => dispatch(setFilter("tv"))}
//             className={getFilterButtonClass("tv")}
//           >
//             TV
//           </button>

//         </div>


//         {/* ================= RIGHT SIDE ================= */}

//         <div className="relative flex items-center gap-2 md:gap-4">

//           {/* Sort Label */}

//           <p className="hidden md:block text-sm text-zinc-400">
//             Sort by:
//           </p>


//           {/* Sort Dropdown */}

//           <button
//             onClick={() =>
//               setShowSortMenu((prev) => !prev)
//             }
//             className="
//               flex
//               h-10
//               items-center
//               gap-2 md:gap-3
//               rounded-xl
//               border
//               border-zinc-800
//               bg-[#0F0F12]
//               px-3 md:px-5
//               text-xs md:text-sm
//               font-medium
//               text-white
//               transition-all
//               hover:border-violet-500/40
//             "
//           >

//             {/* Mobile Sort Icon */}

//             <SlidersHorizontal
//               size={16}
//               className="md:hidden"
//             />

//             <span className="max-w-[95px] md:max-w-none truncate">
//               {selectedSort}
//             </span>

//             <ChevronDown
//               size={17}
//               className={`shrink-0 transition-transform duration-300 ${
//                 showSortMenu ? "rotate-180" : ""
//               }`}
//             />

//           </button>


//           {/* Sort Menu */}

//           {showSortMenu && (
//             <div
//               className="
//                 absolute
//                 right-0
//                 top-12
//                 md:right-16
//                 md:top-14
//                 w-52 md:w-56
//                 rounded-xl
//                 border
//                 border-zinc-800
//                 bg-[#111114]
//                 p-2
//                 shadow-2xl
//                 z-50
//               "
//             >
//               {sortOptions.map((option) => (
//                 <button
//                   key={option}
//                   onClick={() => {
//                     dispatch(setSortBy(option));
//                     setShowSortMenu(false);
//                   }}
//                   className={`
//                     w-full
//                     flex
//                     justify-between
//                     items-center
//                     px-3 md:px-4
//                     py-3
//                     rounded-lg
//                     text-sm
//                     transition-all
//                     ${
//                       selectedSort === option
//                         ? "bg-violet-900 text-white"
//                         : "text-zinc-300 hover:bg-zinc-800"
//                     }
//                   `}
//                 >
//                   {option}

//                   {selectedSort === option && "✓"}
//                 </button>
//               ))}
//             </div>
//           )}


//           {/* Grid */}

//           <button
//             onClick={() => dispatch(setView("grid"))}
//             className={`
//               flex h-10 w-10 md:w-11
//               items-center justify-center
//               rounded-xl
//               transition-all duration-300
//               ${
//                 selectedView === "grid"
//                   ? "bg-violet-900 text-white"
//                   : "border border-zinc-800 bg-[#0F0F12] text-zinc-300 hover:border-violet-500/40 hover:bg-violet-500/10"
//               }
//             `}
//           >
//             <LayoutGrid size={18} />
//           </button>


//           {/* List */}

//           <button
//             onClick={() => dispatch(setView("list"))}
//             className={`
//               flex h-10 w-10 md:w-11
//               items-center justify-center
//               rounded-xl
//               transition-all duration-300
//               ${
//                 selectedView === "list"
//                   ? "bg-violet-900 text-white"
//                   : "border border-zinc-800 bg-[#0F0F12] text-zinc-300 hover:border-violet-500/40 hover:bg-violet-500/10"
//               }
//             `}
//           >
//             <List size={18} />
//           </button>

//         </div>

//       </div>

//     </section>
//   );
// };

// export default WatchlistToolbar;


import {
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortBy,
  setView,
  setFilter,
} from "../utils/watchlistUISlice";

const WatchlistToolbar = () => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const dispatch = useDispatch();

  const selectedSort = useSelector(
    (store) => store.watchlistUI.sortBy
  );

  const selectedFilter = useSelector(
    (store) => store.watchlistUI.filter
  );

  const selectedView = useSelector(
    (store) => store.watchlistUI.view
  );

  const getFilterButtonClass = (filterName) => {
    return `h-10 rounded-xl px-5 text-sm font-medium transition-all ${
      selectedFilter === filterName
        ? "bg-violet-900 text-white"
        : "border border-zinc-800 bg-[#0F0F12] text-zinc-300 hover:border-violet-500/40 hover:bg-violet-500/10"
    }`;
  };

  const getViewButtonClass = (viewName) => {
    return `flex h-10 w-10 md:w-11 items-center justify-center rounded-xl transition-all duration-300 ${
      selectedView === viewName
        ? "bg-violet-900 text-white"
        : "border border-zinc-800 bg-[#0F0F12] text-zinc-300 hover:border-violet-500/40 hover:bg-violet-500/10"
    }`;
  };

  const sortOptions = [
    "Recently Added",
    "Oldest Added",
    "Highest Rated",
    "Lowest Rated",
    "Newest Release",
    "Oldest Release",
  ];

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
  ];

  const selectedFilterLabel =
    filterOptions.find(
      (option) => option.value === selectedFilter
    )?.label || "All";

  return (
    <section className="bg-[#09090B] px-4 md:px-6 lg:px-10 py-5 md:py-6">

      {/* ================= MOBILE ================= */}

      <div className="md:hidden flex flex-col gap-3">

        {/* Top Row */}

        <div className="flex items-center justify-between">

          {/* Filter */}

          <div className="relative">

            <button
              onClick={() =>
                setShowFilterMenu((prev) => !prev)
              }
              className={`
                flex items-center gap-3
                h-10
                rounded-xl
                px-4
                text-sm font-medium
                border
                transition-all
                ${
                  showFilterMenu
                    ? "border-violet-500 bg-violet-500/10 text-white"
                    : "border-zinc-800 bg-[#0F0F12] text-zinc-300"
                }
              `}
            >
              <Filter size={17} />

              <span>{selectedFilterLabel}</span>

              <ChevronDown
                size={17}
                className={`transition-transform duration-300 ${
                  showFilterMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Filter Menu */}

            {showFilterMenu && (
              <div
                className="
                  absolute
                  left-0
                  top-12
                  w-36
                  rounded-xl
                  border border-zinc-800
                  bg-[#111114]
                  p-2
                  shadow-2xl
                  z-50
                "
              >
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      dispatch(setFilter(option.value));
                      setShowFilterMenu(false);
                    }}
                    className={`
                      w-full
                      flex items-center justify-between
                      px-3
                      py-2.5
                      rounded-lg
                      text-sm
                      transition-all
                      ${
                        selectedFilter === option.value
                          ? "bg-violet-900 text-white"
                          : "text-zinc-300 hover:bg-zinc-800"
                      }
                    `}
                  >
                    {option.label}

                    {selectedFilter === option.value && "✓"}
                  </button>
                ))}
              </div>
            )}

          </div>


          {/* Grid / List */}

          <div className="flex items-center gap-2">

            {/* Grid */}

            <button
              onClick={() => dispatch(setView("grid"))}
              className={getViewButtonClass("grid")}
            >
              <LayoutGrid size={18} />
            </button>


            {/* List */}

            <button
              onClick={() => dispatch(setView("list"))}
              className={getViewButtonClass("list")}
            >
              <List size={18} />
            </button>

          </div>

        </div>


        {/* Sort */}

        <div className="relative w-full">

          <button
            onClick={() =>
              setShowSortMenu((prev) => !prev)
            }
            className="
              w-full
              flex
              h-10
              items-center
              gap-3
              rounded-xl
              border
              border-zinc-800
              bg-[#0F0F12]
              px-3
              text-xs
              font-medium
              text-white
              transition-all
              hover:border-violet-500/40
            "
          >

            <SlidersHorizontal size={16} />

            <span className="flex-1 text-left truncate">
              {selectedSort}
            </span>

            <ChevronDown
              size={17}
              className={`shrink-0 transition-transform duration-300 ${
                showSortMenu ? "rotate-180" : ""
              }`}
            />

          </button>


          {/* Sort Menu */}

          {showSortMenu && (
            <div
              className="
                absolute
                left-0
                right-0
                top-12
                w-full
                rounded-xl
                border border-zinc-800
                bg-[#111114]
                p-2
                shadow-2xl
                z-50
              "
            >
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    dispatch(setSortBy(option));
                    setShowSortMenu(false);
                  }}
                  className={`
                    w-full
                    flex
                    justify-between
                    items-center
                    px-3
                    py-3
                    rounded-lg
                    text-sm
                    transition-all
                    ${
                      selectedSort === option
                        ? "bg-violet-900 text-white"
                        : "text-zinc-300 hover:bg-zinc-800"
                    }
                  `}
                >
                  {option}

                  {selectedSort === option && "✓"}
                </button>
              ))}
            </div>
          )}

        </div>

      </div>


      {/* ================= DESKTOP ================= */}

      <div className="hidden md:flex items-center justify-between gap-4">

        {/* Left Side */}

        <div className="flex items-center gap-3">

          {/* Filter Icon */}

          <button
            className="
              h-10
              w-11
              rounded-xl
              border
              border-zinc-800
              bg-[#0F0F12]
              flex
              items-center
              justify-center
              text-zinc-300
              transition-all
              duration-300
              hover:border-violet-500/40
              hover:bg-violet-500/10
            "
          >
            <Filter size={18} />
          </button>


          {/* All */}

          <button
            onClick={() => dispatch(setFilter("all"))}
            className={getFilterButtonClass("all")}
          >
            All
          </button>


          {/* Movies */}

          <button
            onClick={() => dispatch(setFilter("movie"))}
            className={getFilterButtonClass("movie")}
          >
            Movies
          </button>


          {/* TV */}

          <button
            onClick={() => dispatch(setFilter("tv"))}
            className={getFilterButtonClass("tv")}
          >
            TV
          </button>

        </div>


        {/* Right Side */}

        <div className="relative flex items-center gap-4">

          <p className="text-sm text-zinc-400">
            Sort by:
          </p>


          {/* Sort */}

          <button
            onClick={() =>
              setShowSortMenu((prev) => !prev)
            }
            className="
              flex
              h-10
              items-center
              gap-3
              rounded-xl
              border
              border-zinc-800
              bg-[#0F0F12]
              px-5
              text-sm
              font-medium
              text-white
              transition-all
              hover:border-violet-500/40
            "
          >
            {selectedSort}

            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                showSortMenu ? "rotate-180" : ""
              }`}
            />
          </button>


          {/* Sort Menu */}

          {showSortMenu && (
            <div
              className="
                absolute
                right-16
                top-14
                w-56
                rounded-xl
                border border-zinc-800
                bg-[#111114]
                p-2
                shadow-2xl
                z-50
              "
            >
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    dispatch(setSortBy(option));
                    setShowSortMenu(false);
                  }}
                  className={`
                    w-full
                    flex
                    justify-between
                    items-center
                    px-4
                    py-3
                    rounded-lg
                    text-sm
                    transition-all
                    ${
                      selectedSort === option
                        ? "bg-violet-900 text-white"
                        : "text-zinc-300 hover:bg-zinc-800"
                    }
                  `}
                >
                  {option}

                  {selectedSort === option && "✓"}
                </button>
              ))}
            </div>
          )}


          {/* Grid */}

          <button
            onClick={() => dispatch(setView("grid"))}
            className={getViewButtonClass("grid")}
          >
            <LayoutGrid size={18} />
          </button>


          {/* List */}

          <button
            onClick={() => dispatch(setView("list"))}
            className={getViewButtonClass("list")}
          >
            <List size={18} />
          </button>

        </div>

      </div>

    </section>
  );
};

export default WatchlistToolbar;