import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useSearchMedia = (searchQuery)=>{

    //states
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(searchQuery.length < 2){
            setResults([])
            setError(null)
            return
        }
        const timer = setTimeout(()=>{
            const searchMedia = async ()=>{
                setLoading(true)
                setError(null)
                try{
                    const jsonData = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchQuery)}`,API_OPTIONS)
                    if (!jsonData.ok) {
                        throw new Error("Failed to search media");
                    }
                    const data = await jsonData.json()
                    setResults(data.results)
                }
                catch(error){
                    setError(error.message)
                    setResults([])
                }
                finally{
                    setLoading(false)
                }
            } 
            searchMedia()
        },500)

        return ()=>{
            clearTimeout(timer)

        }
    },[searchQuery])


    return{
        results,loading,error
    }

}

export default useSearchMedia;