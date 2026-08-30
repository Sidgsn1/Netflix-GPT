import Browse from "./Browse"
import Login from "./Login"
import Error from "./Error"
import { createBrowserRouter} from "react-router"
import { RouterProvider } from "react-router"
import WatchlistPage from "./WatchlistPage"
import AuthListener from "./AuthListener";
import ProtectedRoute from "./ProtectedRoute"
import GuestRoute from "./GuestRoute"
import AppLayout from "./AppLayout"
import MoviesPage from "./movieComponent/MoviesPage"
import TVPage from "./tvComponent/TVPage"
import MovieDetails from "./details/movie/MovieDetails";
import TVDetails from "./details/tv/TVDetails";
import TVSeasonDetails from "./details/tv/TVSeasonDetails";

const Body = () => {

  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:(
        <GuestRoute>
          <Login />
        </GuestRoute>
      )
    },
    {
      
      element:(
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children:[
        {
          path:"/browse",
          element:<Browse />
        },
        {
          path:"/watchlist",
          element:<WatchlistPage />
        },
        {
          path:"/movies",
          element:<MoviesPage />
        },
        {
          path:"/tvshows",
          element:<TVPage />
        },
        {
          path: "/movie/:movieId",
          element: <MovieDetails />
        },
        {
          path: "/tv/:tvId",
          element: <TVDetails />
        },
        {
          path: "/tv/:tvId/season/:seasonNumber",
          element: <TVSeasonDetails />
        },
      ]
    },
    {
      path:"/error",
      element: <Error />
    },
  ])
  


  return (
    <div>
      <AuthListener />
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body