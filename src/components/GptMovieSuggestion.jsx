import { Sparkles } from "lucide-react"
import GptMovieCard from "./GptMovieCard"


const GptMovieSuggestion = () => {
  return (
    <div className="max-w-7xl mx-auto mt-16 flex flex-col gap-2 rounded-3xl border border-white/5 backdrop-blur-xl p-8">
        <h2 className="text-2xl text-yellow-100 flex items-center gap-2">
            <Sparkles fill="purple" color="purple"/>
            AI Recommendations
        </h2>
        <p className="text-white/40 tracking-wider text-sm">Movies picked just for you</p>
        <div className="grid grid-cols-5 gap-3 my-5">
            <GptMovieCard />
        </div>
    </div>
  )
}

export default GptMovieSuggestion