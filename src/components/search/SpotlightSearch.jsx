import { useEffect, useRef, useState } from "react";
import {Search,Sparkles,History,TrendingUp,X,ArrowUp,ArrowDown,CornerDownLeft, SearchIcon, XCircle,} from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { closeSpotlight } from "../../utils/spotlightSlice";
import useSearchMedia from "../../hooks/useSearchMedia";
import SearchResultSkeleton from "./SearchResultSkeleton";
import SearchResultItem from "./SearchResultItem";
import { useNavigate } from "react-router";
import geminiAi from "../../utils/gemini";
import { addGptMovieResult,clearGptMovieResult } from "../../utils/gptSlice";
import { API_OPTIONS } from "../../utils/constants";

const SpotlightSearch = () => {

    const [activeTab, setActiveTab] = useState("search");

    const [query, setQuery] = useState("");

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState(null);
    
    const { results, loading, error } = useSearchMedia(activeTab === "search" ? query : "");

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    const gptMovies = useSelector((store) => store.gpt.gptMovies);

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

    const normalizedAiResults = (gptMovies || [])
    .filter(Boolean)
    .map((res) => {
        return {
        id: res.id,
        title: res.media_type === "movie" ? res.title : res.name,
        year:
            res.media_type === "movie"
            ? res.release_date?.split("-")[0]
            : res.first_air_date?.split("-")[0],
        posterPath: res.poster_path,
        mediaType: res.media_type,
        rating: res.vote_average,
        };
    });

    const aiMovies = normalizedAiResults.filter(
        (media) => media.mediaType === "movie"
    );

    const aiTvShows = normalizedAiResults.filter(
        (media) => media.mediaType === "tv"
    );

    const aiAllResults = [...aiMovies, ...aiTvShows];

    console.log(results)

    const spotlightRef = useRef(null);


    
    const inputRef = useRef(null);
    const resultRefs = useRef([])
    const lastAiQuery = useRef("");

    const [recentSearches,setRecentSearches] = useState(()=>{
        const savedSearches = localStorage.getItem("recentSearches");

        if (savedSearches) {
            return JSON.parse(savedSearches);
        }

        return [];
    });

    const searchMediaTMDB = async ({ title, type }) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/multi?query=" +
            encodeURIComponent(title) +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );

        const jsonData = await data.json();

        return jsonData.results?.find(
            (item) =>
            item.media_type === type
        );
    };

    const handleAiSearch = async () => {
        try {
            if (!query.trim()) return;
            
            setAiError(null);
            dispatch(clearGptMovieResult());
            setAiLoading(true);

            const prompt = `
                Act as an expert movie and TV show recommendation system.

                Recommend exactly 6 movies or TV shows for the following request:

                "${query}"

                Return the result as a JSON array.

                Each item must contain:
                - title: the movie or TV show title
                - type: either "movie" or "tv"

                Example:
                [
                    { "title": "Interstellar", "type": "movie" },
                    { "title": "Dark", "type": "tv" }
                ]

                Return ONLY valid JSON.
                `;
            const response = await geminiAi.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            });

            const geminiMovies = JSON.parse(response.text);
console.log("Gemini Results:", geminiMovies);
            const promiseArray = geminiMovies.map((movie) =>
            searchMediaTMDB(movie)
            );

            const tmdbResults = (await Promise.all(promiseArray)).filter(Boolean);
console.log("TMDB Results:", tmdbResults);

            if (tmdbResults.length === 0) {
                setAiError("Sorry, we couldn't find any matching titles.");
                return;
            }

            lastAiQuery.current = query.trim();
            dispatch(addGptMovieResult({geminiMovies,tmdbResults,}));

        } catch (error) {
            console.error("AI ERROR:", error);

            setAiError(error?.message || "Something went wrong. Please try again.");
        } finally {
            setAiLoading(false);
        }
    };
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

            const currentResults =
                activeTab === "ai" ? aiAllResults : allResults;


            if (e.key === "Enter") {
                e.preventDefault();

                const currentQuery = query.trim();

                // AI tab + query changed / no results = new AI search
                if (
                    activeTab === "ai" &&
                    (
                        currentQuery !== lastAiQuery.current ||
                        currentResults.length === 0
                    )
                ) {
                    handleAiSearch();
                    return;
                }

                // Nothing selected
                if (selectedIndex === -1) return;

                const selectedMedia = currentResults[selectedIndex];

                if (!selectedMedia) return;

                saveRecentSearch(query);

                dispatch(closeSpotlight());

                if (selectedMedia.mediaType === "movie") {
                    navigate(`/movie/${selectedMedia.id}`);
                } else {
                    navigate(`/tv/${selectedMedia.id}`);
                }
            }


            if (e.key === "ArrowDown") {
                e.preventDefault();

                if (currentResults.length === 0) return;

                setSelectedIndex((prev) => {
                    if (prev < currentResults.length - 1) {
                        return prev + 1;
                    }

                    return 0;
                });
            }


            if (e.key === "ArrowUp") {
                e.preventDefault();

                if (currentResults.length === 0) return;

                setSelectedIndex((prev) => {
                    if (prev > 0) {
                        return prev - 1;
                    }

                    return currentResults.length - 1;
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [allResults.length,aiAllResults.length,selectedIndex,navigate,dispatch,activeTab,query]);

    useEffect(() => {
        if (selectedIndex >= 0) {
            resultRefs.current[selectedIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [selectedIndex]);
    


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
                                value={query}
                                onChange={(e) =>{
                                    setQuery(e.target.value)
                                    setSelectedIndex(-1)
                                    resultRefs.current = []
                                }}
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

                            { query && (
                                <button
                                    onClick={() => setQuery("")} 
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
                            onClick={() => {
                                setActiveTab("search");
                                setSelectedIndex(-1);
                                resultRefs.current = [];
                            }}
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
                            onClick={() => {
                                setActiveTab("ai");
                                setSelectedIndex(-1);
                                resultRefs.current = [];
                            }}
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
                            query ? (loading ? (<SearchResultSkeleton />) : (
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
                                                    We couldn't find anything for "{query}"
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
                                                            onSelect={() => saveRecentSearch(query)}
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
                                                            onSelect={() => saveRecentSearch(query)}
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
                                                                setQuery(search)
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
                                                        setQuery(search)
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

                            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-4 py-5">

                            {aiLoading ? (
                                <SearchResultSkeleton />
                            ): aiError ? (
                                <div className="min-h-[250px] flex flex-col items-center justify-center text-center">
                                    <X
                                        size={40}
                                        className="text-red-400/70 mb-4"
                                    />

                                    <h3 className="text-lg font-medium text-white">
                                        Something went wrong
                                    </h3>

                                    <p className="text-sm text-white/40 mt-2">
                                        {aiError}
                                    </p>
                                </div>
                            ) :
                            normalizedAiResults.length === 0 ? (
                                <div className="min-h-[250px] flex flex-col items-center justify-center text-center">
                                    <Sparkles
                                        size={40}
                                        className="text-purple-400 mb-4"
                                    />

                                    <h3 className="text-xl font-semibold text-white">
                                        Ask AI
                                    </h3>

                                    <p className="text-white/50 mt-2 max-w-md">
                                        Type what you are looking for and press Enter.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="px-4 mb-3 text-sm font-semibold text-white/50 uppercase">
                                        AI Recommendations
                                    </h3>

                                    {aiMovies.length > 0 && (
                                        <div>
                                            <h3 className="px-4 mb-3 text-sm font-semibold text-white/50 uppercase">
                                                Movies
                                            </h3>

                                            {aiMovies.map((movie, index) => (
                                                <SearchResultItem
                                                    key={`ai-movie-${movie.id}`}
                                                    media={movie}
                                                    isSelected={selectedIndex === index}
                                                    onSelect={() => saveRecentSearch(query)}
                                                    resultRef={(el) => {
                                                        resultRefs.current[index] = el;
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {aiTvShows.length > 0 && (
                                        <div className="mt-5">
                                            <h3 className="px-4 mb-3 text-sm font-semibold text-white/50 uppercase">
                                                TV Shows
                                            </h3>

                                            {aiTvShows.map((show, index) => (
                                                <SearchResultItem
                                                    key={`ai-tv-${show.id}`}
                                                    media={show}
                                                    isSelected={selectedIndex === aiMovies.length + index}
                                                    onSelect={() => saveRecentSearch(query)}
                                                    resultRef={(el) => {
                                                        resultRefs.current[aiMovies.length + index] = el;
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

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