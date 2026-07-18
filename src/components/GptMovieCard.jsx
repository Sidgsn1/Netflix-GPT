import { Star } from "lucide-react"

const GptMovieCard = () => {
  return (
    <div>
        <div className="h-80 border-[1px] border-amber-50/10 rounded-xl overflow-hidden">
            <div className="w-full h-3/4 bg-red-500"></div>
            <div className="flex flex-col justify-between p-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg text-yellow-100">Intesteller</h1>
                    <div className="flex items-center justify-center border-[1px] border-amber-100/20 text-yellow-100 rounded-md p-1 px-2 gap-2 text-sm">
                        <h1 className="tracking-wider leading-none">9.8</h1>
                        <Star size={13} fill="gold" color="gold"/>
                    </div>
                </div>
                <div className="flex gap-2 text-amber-100/40 items-center">
                    <h1>2014</h1>
                    <div className="w-1 h-1 bg-amber-100/40 rounded-full"></div>
                    <h1>Sci-Fi,Adventure</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GptMovieCard