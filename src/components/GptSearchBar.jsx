import { ArrowRight, Search } from "lucide-react"
import { useRef } from "react"

import geminiAi from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const searchText = useRef(null)
    const dispatch = useDispatch()

    const searchMediaTMDB = async (media) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/multi?query=" +
            encodeURIComponent(media) +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );

        const jsonData = await data.json();

        return jsonData.results?.find(
            item =>
                item.media_type === "movie" ||
                item.media_type === "tv"
        );
    };
    const handleGptSearchClick = async () => {
        try {
            console.count("Gemini API Call");
            const query = `
                Act as an expert movie and TV show recommendation system.

                Recommend exactly 6 movies or TV shows for the following request:

                "${searchText.current.value}"

                Rules:
                - Return ONLY the movie or TV show titles.
                - Separate each title with a comma.
                - Do not add numbering.
                - Do not write explanations.
            `;
            const response = await geminiAi.models.generateContent({
                model: "gemini-3.5-flash",
                contents:query
            });
            const geminiMovies =  response.text.split(",").map(movie => movie.trim());
            console.log(geminiMovies)
            //here we got an array of movies ['Gol Maal', ' Chupke Chupke', ' Jaane Bhi Do Yaaro', ' Padosan', ' Angoor']
            //now for each movie I will search TMDB API
            const promiseArray = geminiMovies.map(movie => searchMediaTMDB(movie)) //here we will get [Promise,Promise,Promise,Promise,Promise] 

            const tmdbResults = await Promise.all(promiseArray) //when all the promise will be resolved then only we will get the tmdbResults
            console.log(tmdbResults)

            dispatch(addGptMovieResult({geminiMovies,tmdbResults}))

        } catch (error) {
            console.error(error);
        }
    };

    
  return (
    <div className="relative w-full flex items-center justify-between rounded-full  p-[2px] bg-gradient-to-r from-purple-800 via-red-600 to-blue-800 shadow-[0_0_15px_rgba(145,10,224,0.2)]">
        <div className="relative w-full bg-black flex items-center rounded-full px-6">
            <Search strokeWidth={1.5} stroke="white" size={32}/>
            <form className="w-full flex items-center" onSubmit={(e)=>e.preventDefault()}>
                <input ref={searchText} type="text" className="w-11/12 px-6 py-2 m-4 text-white outline-0" placeholder="What would you like to watch today?"></input>
                <button type="button" className="px-3 py-3 rounded-full cursor-pointer bg-gradient-to-r from-[#910ae0] to-[#fa02b8]"
                onClick={handleGptSearchClick}>
                    <ArrowRight stroke="white"/>
                </button>
            </form>
        </div>
    </div>
  )
}

export default GptSearchBar