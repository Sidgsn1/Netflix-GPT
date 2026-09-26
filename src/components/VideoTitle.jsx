import {Info, Play} from 'lucide-react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className="w-full h-full absolute text-white bg-gradient-to-r from-black via-black/30 to-transparent flex items-center z-10 px-4 py-5 sm:px-6 md:px-10 lg:px-12">
        <div className='flex flex-col gap-3 lg:gap-5'>
            <h1 className="text-4xl sm:2xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
            <p className="w-full  text-sm md:text-base lg:w-2/6 lg:text-md">{overview}</p>
            <div className="flex items-center gap-4">
            <button className="px-5 lg:px-7 py-2 rounded-md text-black flex items-center gap-2 font-medium transition-all duration-300 hover:bg-white/40 cursor-pointer bg-white">
                <Play fill='black' size={18} />Play
            </button>
            <button className='px-5 lg:px-6 py-2 rounded-md flex items-center gap-2 font-medium cursor-pointer text-white bg-zinc-500/40'>
                <Info size={20} />more Info
            </button>
        </div>       
        </div>  
    </div>
  )
}

export default VideoTitle