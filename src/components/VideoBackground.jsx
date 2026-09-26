import { useSelector } from "react-redux"
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({movieId}) => {

  const mainTrailerVideo = useSelector(store=>store.movies?.trailerVideo);
  useMovieTrailer(movieId)
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
        {mainTrailerVideo && <iframe
            className="w-full h-full aspect-video scale-320 lg:scale-150" 
            src={`https://www.youtube.com/embed/${mainTrailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${mainTrailerVideo?.key}&start=20`} 
            // src={`https://www.youtube.com/embed/${mainTrailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${mainTrailerVideo?.key}&start=20&modestbranding=1&rel=0&playsinline=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            >
        </iframe>}
    </div>
  )
}

export default VideoBackground


