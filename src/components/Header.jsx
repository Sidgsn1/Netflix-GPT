import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
// import { addUser, removeUser } from "../utils/userSlice"
import { LOGO } from "../utils/constants";
import { LogOut,ChevronDown,Sparkles, Heart } from "lucide-react";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const [showProfileMenu,setShowProfileMenu] = useState(false)
  console.log("show kru ki nhi",showProfileMenu)
  const navigate=useNavigate()
  const user=useSelector(store=>store.user)
  const watchlistMovies = useSelector(store=>store.watchlist.movies)
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch)
  const dispatch=useDispatch();

  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch(() => {
      // An error happened.
      navigate("/error")
    });
  }

  // useEffect(()=>{
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in
  //       const {uid,email,displayName,photoURL} = user;
  //       //will update my store by dispatching the action
  //       dispatch(addUser({uid: uid, email: email, displayName: displayName,photoURL: photoURL}))
  //       //now as soon as the user sign's in ,I want him to redirect to the browse page(how to do that-> by using hook useNavigate)
        
  //       //always navigate to the /browse route when signed in
  //       navigate("/browse")
  //     } else {
  //       // User is signed out
  //       dispatch(removeUser())
  //       //if my user is sign's out then I want him to navigate to the main page(login page)
        
  //       //always stay at Login page when not loggedin
  //       navigate("/")
  //     }
  //   });

  //   //This will be called when component unmounts and this will unsubscribe my onAuthStateChanged 
  //   return ()=> unsubscribe();
  // },[])

  const handleGptSearchClick = ()=>{
    //Toggle GPT Search 
    dispatch(toggleGptSearchView())
  }
  const handleWatchlistClick = () => {
    setShowProfileMenu(false);   // dropdown band
    navigate("/watchlist");      // page change
};
  return (
    <div className="absolute top-0 left-0  z-20 w-full bg-gradient-to-b from-black/80 to-transparent">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6 md:px-10 lg:px-12">
        <img className="w-28 sm:w-32 md:w-36 lg:w-40" src={LOGO} alt="netflix-logo"></img>

        {/* Right side buttons baad me */}
        {user && <div className="flex items-center justify-between gap-5">
          <button className="w-48 h-12 relative group flex items-center justify-center rounded-md mr-10 p-[2px] bg-gradient-to-r from-purple-800 via-red-600 to-blue-800 cursor-pointer"
            onClick={handleGptSearchClick}>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-800 via-red-600 to-blue-800 blur-md opacity-0 transition-all duration-300 group-hover:opacity-60 -z-10">
            </div>
            <div className="relative w-full h-full flex items-center justify-center gap-2 rounded-md bg-black">
              <Sparkles
                size={22}
                className="text-violet-500 fill-violet-500"
              />
              <span className="text-white font-medium text-xl">
                {showGptSearch ? "Homepage" : "GPT Search"}
              </span>
            </div>
          </button>
          <div className="relative">
            <button className="flex items-center gap-3 cursor-pointer" onClick={()=>setShowProfileMenu(prev=>!prev)}>
              <div className="border-2 border-white/20 rounded-md p-1">
                <img className="w-12 rounded-md" src={user?.photoURL} alt="user-profile"></img>
              </div>
              <ChevronDown  strokeWidth={1.5} color="white" className={`transition-transform duration-300 ${showProfileMenu ? "rotate-180":""}`}/>
            </button>
            {/* menu */}
            {showProfileMenu && <div className="absolute right-0 top-20 w-70 bg-zinc-900 border border-white/25 rounded-2xl text-white px-6">
                <div className="flex gap-5 py-6">
                  <img className="w-12 rounded-md" src={user?.photoURL} alt="user-profile"></img>
                  <div>
                    <h1>{user?.displayName}</h1>
                    <h6 className="text-gray-400 text-sm">{user?.email}</h6>
                  </div>
                </div>
                <button className="w-full border-amber-50/25 border-t-1 py-6 " onClick={handleWatchlistClick}>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5">
                      <Heart fill="red" color="red"/>
                      <h1 className="font-light">My Watchlist</h1>
                    </div>
                    <div className="px-3 py-1 rounded-xl bg-zinc-800 tracking-wide flex items-center justify-center text-sm font-light">{watchlistMovies.length}</div>
                  </div>
                </button>
              </div>
            }
          </div>
          <button className="cursor-pointer text-white py-4 px-4 border-white flex gap-2 font-semibold" onClick={handleSignOut}>
            <LogOut color="red"/>
            Sign Out</button>
        </div>}
      </div>
    </div>
  );
};

export default Header