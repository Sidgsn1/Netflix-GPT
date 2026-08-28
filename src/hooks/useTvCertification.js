import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setTVCertification } from "../utils/tvDetailsSlice";

const useTvCertification = (tvId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!tvId) return;

        const fetchCertification = async () => {
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/tv/${tvId}/content_ratings`,
                    API_OPTIONS
                );

                if (!data.ok) {
                    throw new Error("Failed to fetch TV certification");
                }

                const jsonData = await data.json();

                const indiaRatingData = jsonData.results?.find(
                    (country) => country.iso_3166_1 === "IN"
                );

                const usRatingData = jsonData.results?.find(
                    (country) => country.iso_3166_1 === "US"
                );

                const certification =
                    indiaRatingData?.rating ||
                    usRatingData?.rating ||
                    "N/A";

                dispatch(setTVCertification(certification));

            } catch (error) {
                console.error("TV Certification Error:", error);
            }
        };

        fetchCertification();

    }, [tvId, dispatch]);
};

export default useTvCertification;