import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedTV } from "../utils/tvSlice";

const useTopRatedTv = () => {

    const dispatch = useDispatch();

    const topRatedTV = useSelector(store => store.tv.topRatedTV);

    const getTopRatedTV = async () => {

        const data = await fetch(
            "https://api.themoviedb.org/3/tv/top_rated?page=1",
            API_OPTIONS
        );

        const jsonData = await data.json();

        dispatch(addTopRatedTV(jsonData.results));
    };

    useEffect(() => {

        if (topRatedTV) return;

        getTopRatedTV();

    }, []);

};

export default useTopRatedTv;