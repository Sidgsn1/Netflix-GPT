import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setTVWatchProviders } from "../utils/tvDetailsSlice";

const useTVWatchProviders = (tvId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!tvId) return;

        const fetchWatchProviders = async () => {
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/tv/${tvId}/watch/providers`,
                    API_OPTIONS
                );

                if (!data.ok) {
                    throw new Error("Failed to fetch TV watch providers");
                }

                const jsonData = await data.json();

                const indiaProviders = jsonData.results?.IN || null;

                dispatch(setTVWatchProviders(indiaProviders));

            } catch (error) {
                console.error("TV Watch Providers Error:", error);
            }
        };

        fetchWatchProviders();

    }, [tvId, dispatch]);
};

export default useTVWatchProviders;