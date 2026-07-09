import Browse from "./Browse"
import Login from "./Login"
import Error from "./Error"
import { useEffect } from "react"
import { createBrowserRouter} from "react-router"
import { RouterProvider } from "react-router"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "../utils/userSlice"
const Body = () => {

  const dispatch = useDispatch()

  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<Login />
    },
    {
      path:"/browse",
      element: <Browse />
    },
    {
      path:"/error",
      element: <Error />
    }
  ])
  
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const {uid,email,displayName,photoURL} = user;
        //will update my store by dispatching the action
        dispatch(addUser({uid: uid, email: email, displayName: displayName,photoURL: photoURL}))
        //now as soon as the user sign's in ,I want him to redirect to the browse page(how to do that-> by using hook useNavigate)
        
      } else {
        // User is signed out
        dispatch(removeUser())
        //if my user is sign's out then I want him to navigate to the main page(login page)
        
      }
    });
  },[])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body