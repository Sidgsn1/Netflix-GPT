import {
  Filter,
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const WatchlistToolbar = () => {
    const [showSortMenu, setShowSortMenu] = useState(false);

    const [selectedSort, setSelectedSort] = useState("Recently Added");
    const sortOptions = [
        "Recently Added",
        "Oldest Added",
        "Highest Rated",
        "Lowest Rated",
        "Newest Release",
        "Oldest Release",
    ];
  return (
    <section className="bg-[#09090B] px-6 lg:px-10 py-6">

      <div className="w-full flex items-center justify-between">

        {/* Left Side */}

        <div className="flex items-center gap-3">

          {/* Filter */}

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
            className="
            h-10
            rounded-xl
            bg-violet-900
            px-5
            text-sm
            font-medium
            text-white
            transition-all
            hover:bg-violet-800
            "
          >
            All
          </button>

          {/* Movies */}

          <button
            className="
            h-10
            rounded-xl
            border
            border-zinc-800
            bg-[#0F0F12]
            px-5
            text-sm
            font-medium
            text-zinc-300
            transition-all
            hover:border-violet-500/40
            hover:bg-violet-500/10
            "
          >
            Movies
          </button>

          {/* TV */}

          <button
            className="
            h-10
            rounded-xl
            border
            border-zinc-800
            bg-[#0F0F12]
            px-5
            text-sm
            font-medium
            text-zinc-300
            transition-all
            hover:border-violet-500/40
            hover:bg-violet-500/10
            "
          >
            TV Shows
          </button>

        </div>

        {/* Right Side */}

        <div className="relative flex items-center gap-4">

          <p className="text-sm text-zinc-400">
            Sort by:
          </p>

          {/* Dropdown */}

          <button
            onClick={() => setShowSortMenu(prev => !prev)}
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

        {
            showSortMenu && (

            <div className="absolute right-16 top-14 w-56 rounded-xl border border-zinc-800 bg-[#111114] p-2 shadow-2xl z-50">

                {
                    sortOptions.map((option)=>(
                        <button
                            key={option}
                            onClick={()=>{
                                setSelectedSort(option)
                                setShowSortMenu(false)
                            }}
                            className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm transition-all
                                ${
                                    selectedSort===option
                                    ? "bg-violet-900 text-white"
                                    : "text-zinc-300 hover:bg-zinc-800"
                                }`}
                        >

                            {option}

                            {
                                selectedSort===option && "   ✓"
                            }

                        </button>
                    ))
                }

            </div>

            )
            }

          {/* Grid */}

          <button
            className="
            flex
            h-10
            w-11
            items-center
            justify-center
            rounded-xl
            bg-violet-900
            text-white
            transition-all
            hover:bg-violet-800
            "
          >
            <LayoutGrid size={18} />
          </button>

          {/* List */}

          <button
            className="
            flex
            h-10
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-zinc-800
            bg-[#0F0F12]
            text-zinc-300
            transition-all
            hover:border-violet-500/40
            hover:bg-violet-500/10
            "
          >
            <List size={18} />
          </button>

        </div>

      </div>

    </section>
  );
};

export default WatchlistToolbar;