import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularTV } from "../utils/tvSlice";

const usePopularTV = () => {

    const dispatch = useDispatch();

    const popularTV = useSelector(store => store.tv.popularTV);

    const getPopularTV = async () => {

        const data = await fetch(
            "https://api.themoviedb.org/3/tv/popular?page=1",
            API_OPTIONS
        );

        const jsonData = await data.json();

        dispatch(addPopularTV(jsonData.results));
    };

    useEffect(() => {

        if (popularTV) return;

        getPopularTV();

    }, []);

};

export default usePopularTV;