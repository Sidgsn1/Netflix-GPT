import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTVGenres } from "../utils/tvSlice";
import { useEffect } from "react";

const useTVGenres = () => {

    const dispatch = useDispatch();

    const genres = useSelector(store => store.tv.genres);

    const getTVGenres = async () => {

        const data = await fetch(
            "https://api.themoviedb.org/3/genre/tv/list?language=en",
            API_OPTIONS
        );

        const jsonData = await data.json();

        console.log("All TV Genres", jsonData);

        const genreMap = {};

        jsonData.genres.forEach((genre) => {
            genreMap[genre.id] = genre.name;
        });

        dispatch(addTVGenres(genreMap));
    };

    useEffect(() => {

        if (Object.keys(genres).length > 0) return;

        getTVGenres();

    }, []);

};

export default useTVGenres;