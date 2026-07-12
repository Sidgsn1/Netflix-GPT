import { useDispatch } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"
import { useEffect } from "react"
import { API_OPTIONS } from "../utils/constants"

const useMovieTrailer=(movieId)=>{
    const dispatch = useDispatch()
    //fetching the trailer video and updating the store with trailer video data
    const getMovieVideo=async()=>{
        const data= await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
        const jsonData = await data.json()
        const trailerVdo=jsonData?.results?.find((vdo)=>vdo?.type?.toLowerCase() === "trailer") ?? jsonData?.results?.[0]
        // console.log("trailervideo",trailerVdo)
        dispatch(addTrailerVideo(trailerVdo))
    }
    useEffect(()=>{
        getMovieVideo()
    },[])
}

export default useMovieTrailer