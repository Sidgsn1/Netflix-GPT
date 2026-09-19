const SearchResultSkeleton = () => {
    return (
        <div className="flex flex-col  gap-4 px-8">
            <h1 className="text-white font-bold">Movies</h1>
            <div className="elem flex items-center gap-4">
                {/* Poster skeleton */}
                <div className="h-16 w-20 rounded-md bg-zinc-700 animate-pulse" />

                {/* Text skeleton */}
                <div className="flex-1 space-y-3">

                    <div className="h-4 w-1/2 rounded-full bg-zinc-700 animate-pulse" />

                    <div className="h-4 w-1/3 rounded-full bg-zinc-800 animate-pulse" />

                </div>
            </div>
            <div className="elem flex items-center gap-4">
                {/* Poster skeleton */}
                <div className="h-16 w-20 rounded-md bg-zinc-700 animate-pulse" />

                {/* Text skeleton */}
                <div className="flex-1 space-y-3">

                    <div className="h-4 w-1/2 rounded-full bg-zinc-700 animate-pulse" />

                    <div className="h-4 w-1/3 rounded-full bg-zinc-800 animate-pulse" />

                </div>
            </div>

            <h1 className="text-white font-bold">Tv Shows</h1>
            <div className="elem flex items-center gap-4">
                {/* Poster skeleton */}
                <div className="h-16 w-20 rounded-md bg-zinc-700 animate-pulse" />

                {/* Text skeleton */}
                <div className="flex-1 space-y-3">

                    <div className="h-4 w-1/2 rounded-full bg-zinc-700 animate-pulse" />

                    <div className="h-4 w-1/3 rounded-full bg-zinc-800 animate-pulse" />

                </div>
            </div>
            <div className="elem flex items-center gap-4">
                {/* Poster skeleton */}
                <div className="h-16 w-20 rounded-md bg-zinc-700 animate-pulse" />

                {/* Text skeleton */}
                <div className="flex-1 space-y-3">

                    <div className="h-4 w-1/2 rounded-full bg-zinc-700 animate-pulse" />

                    <div className="h-4 w-1/3 rounded-full bg-zinc-800 animate-pulse" />

                </div>
            </div>


        </div>
    );
};

export default SearchResultSkeleton;