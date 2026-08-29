import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
    setTVDetails,
    clearTVDetails,
} from "../utils/tvDetailsSlice";

const useTvDetails = (tvId) => {

    const dispatch = useDispatch();

    useEffect(() => {

        if (!tvId) return;

        // Clear previous TV details
        dispatch(clearTVDetails());

        const fetchTVDetails = async () => {

            try {

                const data = await fetch(
                    `https://api.themoviedb.org/3/tv/${tvId}?append_to_response=credits,videos,recommendations,similar`,
                    API_OPTIONS
                );

                if (!data.ok) {
                    throw new Error("Failed to fetch TV details");
                }

                const json = await data.json();

                dispatch(setTVDetails(json));

            } catch (error) {

                console.error("TV Details Error:", error);

            }
        };

        fetchTVDetails();

    }, [tvId, dispatch]);
};

export default useTvDetails;