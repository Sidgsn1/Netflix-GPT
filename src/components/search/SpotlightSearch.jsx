import { useEffect, useRef, useState } from "react";
import {Search,Sparkles,History,TrendingUp,X,ArrowUp,ArrowDown,CornerDownLeft, SearchIcon, XCircle,} from "lucide-react";
import { useDispatch } from "react-redux";
import { closeSpotlight } from "../../utils/spotlightSlice";
import useSearchMedia from "../../hooks/useSearchMedia";
import SearchResultSkeleton from "./SearchResultSkeleton";
import SearchResultItem from "./SearchResultItem";
import { useNavigate } from "react-router";

const SpotlightSearch = () => {

    const [activeTab, setActiveTab] = useState("search");
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { results, loading, error } = useSearchMedia(searchQuery);

    const navigate = useNavigate()

    //only getting the tv and movie media type not the people one
    const filterMedia=results.filter((res)=>{
        return res.media_type === "tv" || res.media_type === "movie"
    })

    const normalizedMedia = filterMedia.map((res) => {
        return {
           id : res.id, 
           title : res.media_type === "movie" ? res.title : res.name,
           year : res.media_type === "movie" ? res.release_date?.split("-")[0] : res.first_air_date?.split("-")[0],
           posterPath: res.poster_path,
           mediaType: res.media_type,
           rating: res.vote_average,    
        }
    })

    const movies = normalizedMedia.filter(
        (media) => media.mediaType === "movie"
    );

    const tvShows = normalizedMedia.filter(
        (media) => media.mediaType === "tv"
    );

    const allResults = [...movies, ...tvShows];



    console.log(results)

    const spotlightRef = useRef(null);

    const dispatch = useDispatch()
    const inputRef = useRef(null);
    const resultRefs = useRef([])

    const [recentSearches,setRecentSearches] = useState(()=>{
        const savedSearches = localStorage.getItem("recentSearches");

        if (savedSearches) {
            return JSON.parse(savedSearches);
        }

        return [];
    });

    const saveRecentSearch = (query) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        const updatedSearches = [
            trimmedQuery,
            ...recentSearches.filter((search) => search !== trimmedQuery)
        ].slice(0, 7);

        setRecentSearches(updatedSearches);

        localStorage.setItem(
            "recentSearches",
            JSON.stringify(updatedSearches)
        );
    };

    const removeRecentSearch = (searchToRemove) => {
        const updatedSearches = recentSearches.filter(
            (search) => search !== searchToRemove
        );

        setRecentSearches(updatedSearches);

        localStorage.setItem(
            "recentSearches",
            JSON.stringify(updatedSearches)
        );
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    const trendingSearches = [
        "deadpool & wolverine",
        "house of the dragon",
        "stranger things",
        "the boys",
        "james bond",
        "john wick",
        "the equalizer 3",
    ];


    // Automatically focus search input
    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    // Close Spotlight with Escape
    useEffect(() => {

        const handleKeyDown = (e) => {

            if (e.key === "Escape") {
                dispatch(closeSpotlight());
            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [dispatch]);

    // Close Spotlight when clicking outside
    useEffect(() => {

        const handleClickOutside = (e) => {

            if (
                spotlightRef.current &&
                !spotlightRef.current.contains(e.target)
            ) {
                dispatch(closeSpotlight());
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (e) => {

            if (e.key === "Enter") {
                e.preventDefault();

                if (selectedIndex === -1) return;

                const selectedMedia = allResults[selectedIndex];

                if (!selectedMedia) return;
                
                saveRecentSearch(searchQuery);

                dispatch(closeSpotlight());

                if (selectedMedia.mediaType === "movie") {
                    navigate(`/movie/${selectedMedia.id}`);
                } else {
                    navigate(`/tv/${selectedMedia.id}`);
                }
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();

                setSelectedIndex((prev) => {
                    if (prev < allResults.length - 1) {
                        return prev + 1;
                    }

                    return 0;
                });
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();

                setSelectedIndex((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    }

                    return allResults.length - 1;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [allResults.length,selectedIndex, navigate, dispatch]);

    useEffect(() => {
        if (selectedIndex >= 0) {
            resultRefs.current[selectedIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [selectedIndex]);
    
    useEffect(() => {
        setSelectedIndex(-1);
    }, [searchQuery]);

    return (
        <div className="fixed inset-0 z-[100] h-full">

            {/* Background Overlay */}

            <div
                
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />


            {/* Spotlight Modal */}

            <div className="relative flex justify-center px-4 pt-16">

                <div  ref={spotlightRef}  
                    className="
                        w-full max-w-4xl
                        overflow-hidden
                        rounded-2xl
                        border border-white/20
                        bg-zinc-950/95
                        shadow-2xl
                    "
                >

                    {/* Search Input */}

                    <div className="p-5 pb-3">

                        <div
                            className="
                                flex items-center gap-4
                                rounded-2xl
                                bg-zinc-800/70
                                border border-white/5
                                px-5 py-4
                            "
                        >

                            <Search
                                size={25}
                                className="text-white/80 shrink-0"
                            />

                            <input
                                ref={inputRef}
                                value={searchQuery}
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
                                placeholder="Search movies, TV shows, people..."
                                className="
                                    flex-1
                                    bg-transparent
                                    outline-none
                                    text-white
                                    text-lg
                                    placeholder:text-white/45
                                "
                            />

                            { searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")} 
                                    className="flex items-center gap-1 cursor-pointer">
                                    <X size={26} color="white"/>
                                </button>
                                )
                            }

                        </div>

                    </div>


                    {/* Tabs */}

                    <div className="flex items-center px-8">

                        {/* Search Tab */}

                        <button
                            onClick={() => setActiveTab("search")}
                            className={` flex-1 flex items-center justify-center gap-3 py-3 text-md transition border-b-2 cursor-pointer
                                ${
                                    activeTab === "search"
                                        ? "text-purple-400 border-purple-500"
                                        : "text-white/60 border-transparent hover:text-white"
                                }
                            `}
                        >

                            <Search size={20} />

                            <span>Search</span>

                        </button>


                        {/* Divider */}

                        <div className="h-7 w-px bg-white/10" />


                        {/* Ask AI Tab */}

                        <button
                            onClick={() => setActiveTab("ai")}
                            className={`flex-1 flex items-center justify-center gap-3 py-3 text-md transition border-b-2 cursor-pointer
                                ${
                                    activeTab === "ai"
                                        ? "text-purple-400 border-purple-500"
                                        : "text-white/60 border-transparent hover:text-white"
                                }
                            `}
                        >

                            <Sparkles size={20} />

                            <span>Ask AI</span>

                        </button>

                    </div>


                    {/* Content */}

                    <div className="border-t border-white/10">

                        {activeTab === "search" ? (
                            searchQuery ? (loading ? (<SearchResultSkeleton />) : (
                                <div>
                                    {
                                        error ? (
                                            <div className="min-h-[250px] flex flex-col items-center justify-center text-center px-6">
                                                <X
                                                    size={36}
                                                    className="text-red-400/70 mb-4"
                                                />

                                                <h3 className="text-lg font-medium text-white">
                                                    Something went wrong
                                                </h3>

                                                <p className="text-sm text-white/40 mt-2">
                                                    We couldn't complete your search. Please try again.
                                                </p>
                                            </div>
                                        ):(
                                        allResults.length === 0 ? (
                                            <div className="min-h-[250px] flex flex-col items-center justify-center text-center">
                                                <Search
                                                    size={36}
                                                    className="text-white/30 mb-4"
                                                />

                                                <h3 className="text-lg font-medium text-white">
                                                    No results found
                                                </h3>

                                                <p className="text-sm text-white/40 mt-2">
                                                    We couldn't find anything for "{searchQuery}"
                                                </p>
                                            </div>
                                        ) : (
                                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-4 py-5">
                                            {movies.length > 0 && (
                                                <div>
                                                    <h3 className="px-4 mb-3 text-sm font-semibold text-white/50 uppercase">Movies</h3>
                                                    {movies.map((movie,index) => (
                                                        <SearchResultItem
                                                            key={`movie-${movie.id}`}
                                                            media={movie}
                                                            isSelected={selectedIndex === index}
                                                            onSelect={() => saveRecentSearch(searchQuery)}
                                                            resultRef = {(el)=>{
                                                                resultRefs.current[index] = el;
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                            {tvShows.length > 0 && (
                                                <div className="mt-5">
                                                    <h3 className="px-4 mb-3 text-sm font-semibold text-white/50 uppercase">Tv Shows</h3>

                                                    {tvShows.map((show,index) => (
                                                        <SearchResultItem
                                                            key={`tv-${show.id}`}
                                                            media={show}
                                                            isSelected={selectedIndex === movies.length + index}
                                                            onSelect={() => saveRecentSearch(searchQuery)}
                                                            resultRef={(el) => {
                                                                resultRefs.current[movies.length + index] = el;
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        ))}
                                </div>
                            )) 
                            : (
                                // Recent and Trending
                                <div className="grid grid-cols-2">

                                    {/* Recent Searches */}

                                    <div className="px-8 py-7 border-r border-white/10">

                                        <div className="flex items-center justify-between mb-6">

                                            <div className="flex items-center gap-3">

                                                <History
                                                    size={20}
                                                    className="text-white/70"
                                                />

                                                <h3 className="text-lg font-medium">
                                                    Recent Searches
                                                </h3>

                                            </div>

                                            <button
                                                onClick={clearRecentSearches}
                                                className="text-sm text-purple-400 hover:text-purple-300 cursor-pointer"
                                            >
                                                Clear all
                                            </button>

                                        </div>


                                        <div className="space-y-5">

                                            {recentSearches.length > 0 ? (
                                                recentSearches.map((search) => (

                                                    <div
                                                        key={search}
                                                        className=" flex items-center justify-between gap-4 group"
                                                    >

                                                        <button
                                                            onClick={() =>
                                                                setSearchQuery(search)
                                                            }
                                                            className=" flex items-center gap-4  text-white/70  hover:text-white transition cursor-pointer text-left
                                                            "
                                                        >

                                                            <History
                                                                size={19}
                                                                className="text-white/40"
                                                            />

                                                            <span>
                                                                {search}
                                                            </span>

                                                        </button>


                                                        <button
                                                            onClick={() => removeRecentSearch(search)}
                                                            className="  text-white/40  hover:text-white opacity-0 group-hover:opacity-100 transition cursor-pointer
                                                            "
                                                        >
                                                            <X size={18} />
                                                        </button>

                                                    </div>

                                                ))
                                            ):(
                                                <div className="text-white/40 text-sm">
                                                    No recent searches
                                                </div>
                                                )
                                            }

                                        </div>

                                    </div>


                                    {/* Trending Searches */}

                                    <div className="px-8 py-7">

                                        <div className="flex items-center gap-3 mb-6">

                                            <TrendingUp
                                                size={20}
                                                className="text-white/70"
                                            />

                                            <h3 className="text-lg font-medium">
                                                Trending Searches
                                            </h3>

                                        </div>


                                        <div className="space-y-5">

                                            {trendingSearches.map((search) => (

                                                <button
                                                    key={search}
                                                    onClick={() =>
                                                        setSearchQuery(search)
                                                    }
                                                    className=" flex items-center gap-4  text-white/70  hover:text-white transition cursor-pointer
                                                    "
                                                >

                                                    <TrendingUp
                                                        size={18}
                                                        className="text-white/40"
                                                    />

                                                    <span>
                                                        {search}
                                                    </span>

                                                </button>

                                            ))}

                                        </div>

                                    </div>

                                </div>
                            )
                        ) : (

                            /* Ask AI */

                            <div className="min-h-[350px] flex flex-col items-center justify-center text-center px-6">

                                <Sparkles
                                    size={40}
                                    className="text-purple-400 mb-4"
                                />

                                <h3 className="text-xl font-semibold">
                                    Ask AI
                                </h3>

                                <p className="text-white/50 mt-2 max-w-md">
                                    Ask anything about movies and TV shows.
                                    AI-powered recommendations are coming here.
                                </p>

                            </div>

                        )}

                    </div>


                    {/* Keyboard Footer */}

                    <div
                        className=" border-t border-white/10 px-8 py-4 flex flex-wrap items-center justify-center gap-6 text-sm  text-white/50
                        "
                    >

                        <div className="flex items-center gap-2">

                            <kbd className="key">
                                Ctrl
                            </kbd>

                            <kbd className="key">
                                K
                            </kbd>

                            <span>to close</span>

                        </div>


                        <div className="w-px h-5 bg-white/10" />


                        <div className="flex items-center gap-2">

                            <kbd className="key">
                                <ArrowUp size={14} />
                            </kbd>

                            <kbd className="key">
                                <ArrowDown size={14} />
                            </kbd>

                            <span>to navigate</span>

                        </div>


                        <div className="w-px h-5 bg-white/10" />


                        <div className="flex items-center gap-2">

                            <kbd className="key">
                                <CornerDownLeft size={14} />
                            </kbd>

                            <span>to select</span>

                        </div>


                        <div className="w-px h-5 bg-white/10" />


                        <div className="flex items-center gap-2">

                            <kbd className=" min-w-8 h-7 px-2 flex items-center justify-center rounded-md  bg-white/10 border border-white/10 text-xs  text-white/70
                                ">
                                Esc
                            </kbd>

                            <span>to close</span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default SpotlightSearch;