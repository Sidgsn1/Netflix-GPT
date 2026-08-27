import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setMovieCertification } from "../utils/movieDetailsSlice";

const useMovieCertification = (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!movieId) return;

        const fetchCertification = async () => {
            try {
                const data = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/release_dates`,
                    API_OPTIONS
                );

                if (!data.ok) {
                    throw new Error("Failed to fetch movie certification");
                }

                const jsonData = await data.json();

                const getCertification = (countryData) => {
                    return countryData?.release_dates?.find(
                        (release) => release.certification
                    )?.certification || null;
                };

                const indiaReleaseData = jsonData.results?.find(
                    (country) => country.iso_3166_1 === "IN"
                );

                const usReleaseData = jsonData.results?.find(
                    (country) => country.iso_3166_1 === "US"
                );

                const certification =
                    getCertification(indiaReleaseData) ||
                    getCertification(usReleaseData) ||
                    "N/A";

                dispatch(setMovieCertification(certification));

            } catch (error) {
                console.error("Movie Certification Error:", error);
            }
        };

        fetchCertification();

    }, [movieId, dispatch]);
};

export default useMovieCertification;