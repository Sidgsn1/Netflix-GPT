import { IMG_CDN_URL } from "../../utils/constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { closeSpotlight } from "../../utils/spotlightSlice";

const SearchResultItem = ({ media,isSelected,onSelect,resultRef }) => {
    const {title,year,posterPath,mediaType,rating,} = media;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div
            ref={resultRef}
            className={`
                flex items-center gap-3 sm:gap-4 px-3 sm:px-8 py-3
                rounded-lg
                hover:bg-white/5
                cursor-pointer
                transition
                ${isSelected ? "bg-white/10" : "hover:bg-white/5"}
            `}
            onClick={() => {
                onSelect()
                dispatch(closeSpotlight())
                if (media.mediaType === "movie") {
                    navigate(`/movie/${media.id}`);
                } else {
                    navigate(`/tv/${media.id}`);
                }
            }}
        >
            {/* Poster */}
            <img
                src={`${IMG_CDN_URL}${posterPath}`}
                alt={title}
                className="
                    h-20 w-16 sm:h-16 sm:w-12
                    object-cover
                    rounded-md
                    bg-zinc-800
                    shrink-0
                "
            />

            {/* Information */}
            <div className="flex-1 min-w-0">

                <h3 className="text-white font-medium truncate">
                    {title}
                </h3>

                <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-white/50">

                    <span>{year || "N/A"}</span>

                    <span>•</span>

                    <span>
                        {mediaType === "movie" ? "Movie" : "TV Show"}
                    </span>

                    <span>•</span>

                    <span>
                        ⭐ {rating ? rating.toFixed(1) : "N/A"}
                    </span>

                </div>

            </div>
        </div>
    );
};

export default SearchResultItem;