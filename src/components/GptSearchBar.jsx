import { ArrowRight, Search } from "lucide-react"

const GptSearchBar = () => {
  return (
    <div className="relative w-full flex items-center justify-between rounded-full  p-[2px] bg-gradient-to-r from-purple-800 via-red-600 to-blue-800 shadow-[0_0_15px_rgba(145,10,224,0.2)]">
        <div className="relative w-full bg-black flex items-center rounded-full px-6">
            <Search strokeWidth={1.5} stroke="white" size={32}/>
            <form className="w-full">
                <input type="text" className="w-11/12 px-6 py-2 m-4 text-white outline-0" placeholder="What would you like to watch today?"></input>
            </form>
            <button className="px-3 py-3 rounded-full bg-gradient-to-r from-[#910ae0] to-[#fa02b8]">
                <ArrowRight stroke="white"/>
            </button>
        </div>
    </div>
  )
}

export default GptSearchBar