import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setMovieDetails, clearMovieDetails } from "../utils/movieDetailsSlice";

const useMovieDetails = (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!movieId) return;
        dispatch(clearMovieDetails());
        const fetchMovieDetails = async () => {
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,videos,recommendations,similar`,
                    API_OPTIONS
                );

                if (!data.ok) {
                    throw new Error("Failed to fetch movie details");
                }

                const json = await data.json();
                console.log("TMDB:", json);

                dispatch(setMovieDetails(json));

                console.log("Fetching movie:", movieId);
                console.log("Response:", data.status);

            } catch (error) {
                console.error("Movie Details Error:", error);
            }
        };

        fetchMovieDetails();

    }, [movieId, dispatch]);
};

export default useMovieDetails;