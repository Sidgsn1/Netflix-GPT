import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants";
import { addAiringTodayTV } from "../utils/tvSlice";
import { useEffect } from "react";


const useAiringTodayTv = ()=>{
    const dispatch = useDispatch();

    const airingToday = useSelector(store => store.tv.airingToday)

    const getAiringTodayTv = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',API_OPTIONS)
        const jsonData = await data.json()

        dispatch(addAiringTodayTV(jsonData.results))
    }

    useEffect(()=>{
        if(airingToday) return

        getAiringTodayTv()
    },[])
}

export default useAiringTodayTv