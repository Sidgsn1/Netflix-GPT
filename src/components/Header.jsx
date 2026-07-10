import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate=useNavigate()
  const user=useSelector(store=>store.user)
  const dispatch=useDispatch();

  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch(() => {
      // An error happened.
      navigate("/error")
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const {uid,email,displayName,photoURL} = user;
        //will update my store by dispatching the action
        dispatch(addUser({uid: uid, email: email, displayName: displayName,photoURL: photoURL}))
        //now as soon as the user sign's in ,I want him to redirect to the browse page(how to do that-> by using hook useNavigate)
        
        //always navigate to the /browse route when signed in
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser())
        //if my user is sign's out then I want him to navigate to the main page(login page)
        
        //always stay at Login page when not loggedin
        navigate("/")
      }
    });

    //This will be called when component unmounts and this will unsubscribe my onAuthStateChanged 
    return ()=> unsubscribe();
  },[])
  return (
    <div className="absolute top-0 left-0 z-20 w-full bg-gradient-to-b from-black/80 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10 lg:px-12">
        <img className="w-28 sm:w-32 md:w-36 lg:w-40" src={LOGO} alt="netflix-logo"></img>

        {/* Right side buttons baad me */}
        {user && <div className="flex gap-4">
          <img className="w-12" src={user?.photoURL} alt="user-profile"></img>
          <button className="cursor-pointer text-white" onClick={handleSignOut}>Sign Out</button>
        </div>}
      </div>
    </div>
  );
};

export default Header