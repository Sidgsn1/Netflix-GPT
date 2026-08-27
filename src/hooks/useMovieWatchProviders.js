import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setMovieWatchProviders } from "../utils/movieDetailsSlice";

const useMovieWatchProviders = (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!movieId) return;

        const fetchWatchProviders = async () => {
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
                    API_OPTIONS
                );

                if (!data.ok) {
                    throw new Error("Failed to fetch watch providers");
                }

                const jsonData = await data.json();

                const indiaProviders = jsonData.results?.IN || null;

                dispatch(setMovieWatchProviders(indiaProviders));

            } catch (error) {
                console.error("Movie Watch Providers Error:", error);
            }
        };

        fetchWatchProviders();

    }, [movieId, dispatch]);
};

export default useMovieWatchProviders;