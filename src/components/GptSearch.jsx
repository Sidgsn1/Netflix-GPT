import GptMovieSuggestion from "./GptMovieSuggestion"
import GptHeroSection from "./GptHeroSection"
import bgImg from "../assets/images/gptbackground.png"

const GptSearch = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-no-repeat" style={{backgroundImage:`url(${bgImg})`}}>
       {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Page Content */}

      <div className="relative z-10">
        <GptHeroSection />
        <GptMovieSuggestion />
      </div>
    </div>
  )
}

export default GptSearch