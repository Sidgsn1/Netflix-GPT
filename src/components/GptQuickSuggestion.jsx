import { Brain, Crosshair, Ghost, Rocket, Smile, Sparkles } from "lucide-react";


const GptQuickSuggestion = () => {
const suggestions = [
  {
    title: "Mind-Bending Movies",
    border: "border-pink-500/40",
    hover: "hover:bg-pink-500/15",
    icon: <Brain className="text-pink-500/80"/>,
    color: "text-pink-200"
  },
  {
    title: "Sci-Fi Adventures",
    border: "border-blue-500/40",
    hover: "hover:bg-blue-500/15",
    icon: <Rocket className="text-blue-500/80"/>,
    color: "text-blue-200"

  },
  {
    title: "Best Action Movies",
    border: "border-violet-500/40",
    hover: "hover:bg-violet-500/15",
    icon: <Crosshair className="text-violet-500/80"/>,
    color: "text-violet-200"
  },
  {
    title: "Horror Movies",
    border: "border-red-500/40",
    hover: "hover:bg-red-500/15",
    icon: <Ghost className="text-red-500/80"/>,
    color: "text-red-200"
  },
  {
    title: "Feel-good Comedies",
    border: "border-green-500/40",
    hover: "hover:bg-green-500/15",
    icon: <Smile className="text-green-500/80"/>,
    color: "text-green-200"
  },
  {
    title: "Anime Movies",
    border: "border-yellow-500/40",
    hover: "hover:bg-yellow-500/15",
    icon: <Sparkles className="text-yellow-500/80"/>,
    color: "text-yellow-200"
  },
];
  return (
        <div className="w-full text-white flex flex-col gap-6 items-center">
            <div className="flex gap-2">
                <Sparkles size={20} fill="white"/>
                <h4 className="text-sm tracking-wider">Try these popular searches</h4>
            </div>
            <div className="w-full flex gap-2">
                {
                    suggestions.map(item=>(
                        <button key={item.title}
                            className={`px-4 py-3 flex gap-2 transition-all duration-300 cursor-pointer bg-black rounded-full border-2 ${item.border} ${item.hover} ${item.color}`}
                        
                        >
                            {item.icon}{item.title}</button>
                    ))
                }
            </div>
        </div>
  )
}

export default GptQuickSuggestion