import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addOnTheAirTV } from "../utils/tvSlice";

const useOnTheAirTv = () => {

    const dispatch = useDispatch();

    const onTheAir = useSelector(store => store.tv.onTheAir);

    const getOnTheAirTV = async () => {

        const data = await fetch(
            "https://api.themoviedb.org/3/tv/on_the_air?page=1",
            API_OPTIONS
        );

        const jsonData = await data.json();

        dispatch(addOnTheAirTV(jsonData.results));
    };

    useEffect(() => {

        if (onTheAir) return;

        getOnTheAirTV();

    }, []);

};

export default useOnTheAirTv;