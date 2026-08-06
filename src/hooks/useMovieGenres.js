import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { addMovieGenres } from "../utils/moviesSlice"
import { useEffect } from "react"

const useMovieGenres = ()=>{
    const dispatch = useDispatch()
    
    const genres = useSelector(store => store.movies.genres);

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
        if (Object.keys(genres).length > 0) return;
        getMovieGenres()
    },[])
}

export default useMovieGenres