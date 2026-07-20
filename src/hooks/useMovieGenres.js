import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { addMovieGenres } from "../utils/moviesSlice"
import { useEffect } from "react"

const useMovieGenres = ()=>{
    const dispatch = useDispatch()

    const getMovieGenres = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en',API_OPTIONS)
        const jsonData = await data.json()
        console.log("all genres",jsonData)

        const genreMap={}
        jsonData.genres.forEach((genre)=>{
            genreMap[genre.id]=genre.name
        })

        dispatch(addMovieGenres(genreMap))
    }

    useEffect(()=>{
        getMovieGenres()
    },[])
}

export default useMovieGenres