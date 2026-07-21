import { Sparkles } from "lucide-react"
import GptQuickSuggestion from "./GptQuickSuggestion"
import GptSearchBar from "./GptSearchBar"

function GptHeroSection() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-25">
        <div className=" w-full max-w-7xl flex flex-col items-center px-6 space-y-7">
            <div className="flex items-center gap-3">
                <Sparkles size={40} className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] via-[#ef3f50] to-[#FBBF24] overflow-hidden drop-shadow-[0_0_10px_#d946ef]"/>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-[#7C3AED] via-[#A855F7] via-[#ef3f50] to-[#FBBF24] bg-clip-text text-transparent ">GPT Search</h1>
            </div>
            <p className="text-gray-300 text-lg font-normal">Ask AI anything about the movies and get personalized recommendations.</p>
            <div className="w-2/3">
                <GptSearchBar />
            </div>
            <GptQuickSuggestion />
        </div>

    </div>
  )
}

export default GptHeroSection