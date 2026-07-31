import Browse from "./Browse"
import Login from "./Login"
import Error from "./Error"
import { createBrowserRouter} from "react-router"
import { RouterProvider } from "react-router"
import WatchlistPage from "./WatchlistPage"
import AuthListener from "./AuthListener";
import ProtectedRoute from "./ProtectedRoute"
import GuestRoute from "./GuestRoute"

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
      path:"/browse",
      element: (
        <ProtectedRoute>
          <Browse />
        </ProtectedRoute>
      )
    },
    {
      path:"/error",
      element: <Error />
    },
    {
      path:"/watchlist",
      element:(
        <ProtectedRoute>
          <WatchlistPage />
        </ProtectedRoute>
      )
    }
  ])
  


  return (
    <div>
      <AuthListener />
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body