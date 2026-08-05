import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

const MainContainer = () => {
  const movies = useSelector(store=> store.movies?.nowPlayingMovies)

  if(!movies) return null; //as i dont want the runtime error null[0] will give error so we did "Early Return"
  //I want one main movie 
  const mainMovie = movies[0]

  const{original_title, overview, id} = mainMovie

  return (
    <div className="relative w-full h-screen bg-black">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer