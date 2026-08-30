import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setTVSeasonEpisodes } from "../utils/tvDetailsSlice";

const useTvSeasonEpisodes = (tvId, seasonNumber) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!tvId || seasonNumber === undefined || seasonNumber === null) {
            return;
        }

        const fetchSeasonEpisodes = async () => {
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}`,
                    API_OPTIONS
                );

                if (!data.ok) {
                    throw new Error(
                        "Failed to fetch season episodes"
                    );
                }

                const jsonData = await data.json();

                console.log("Season Episodes:", jsonData);

                dispatch(setTVSeasonEpisodes(jsonData));

            } catch (error) {
                console.error(
                    "TV Season Episodes Error:",
                    error
                );
            }
        };

        fetchSeasonEpisodes();

    }, [tvId, seasonNumber, dispatch]);
};

export default useTvSeasonEpisodes;