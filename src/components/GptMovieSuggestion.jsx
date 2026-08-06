import { Sparkles } from "lucide-react"
import GptMovieCard from "./GptMovieCard"
import { useSelector } from "react-redux"


const GptMovieSuggestion = () => {
    const gpt = useSelector(store => store.gpt)
    const genres = useSelector(store => store.movies.genres)
    const { gptMovies,movieNames } = gpt

    if(!movieNames) return null
  return (
    <div className="max-w-7xl mx-auto mt-16 flex flex-col gap-2 rounded-3xl border border-white/5 backdrop-blur-xl p-8">
        <h2 className="text-2xl text-yellow-100 flex items-center gap-2">
            <Sparkles fill="purple" color="purple"/>
            AI Recommendations
        </h2>
        <p className="text-white/40 tracking-wider text-sm">Movies picked just for you</p>
        <div className="grid grid-cols-6 gap-3 my-5">
            {
                gptMovies.map((movie,index)=>{
                    if(!movie) return null
                    return(
                        <GptMovieCard key={movie.id} title={movieNames[index]} genres={genres} mediaData={movie} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default GptMovieSuggestion