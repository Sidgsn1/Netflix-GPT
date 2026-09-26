import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGO } from "../utils/constants";
import { LogOut,ChevronDown,Sparkles, Heart,Search } from "lucide-react";
import {openSpotlight,closeSpotlight} from "../utils/spotlightSlice";
import SpotlightSearch from "./search/SpotlightSearch";

const Header = () => {
  const [showProfileMenu,setShowProfileMenu] = useState(false)
  console.log("show kru ki nhi",showProfileMenu)
  const navigate=useNavigate()
  const user=useSelector(store=>store.user)
  const watchlistMovies = useSelector(store=>store.watchlist.movies)
  const showSpotlight = useSelector(store => store.spotlight.showSpotlight);
  const dispatch=useDispatch();

  const navLinkClass = ({ isActive }) =>
  `text-xl font-medium transition-all duration-300
  ${
    isActive
      ? "text-white border-b-2 border-violet-500 pb-1"
      : "text-zinc-400 hover:text-white"
  }`;

  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch(() => {
      // An error happened.
      navigate("/error")
    });
  }


  const handleSpotlightClick = () => {
      if (showSpotlight) {
          dispatch(closeSpotlight());
          return;
      }

      dispatch(openSpotlight());
  };

  useEffect(() => {
      const handleKeyDown = (e) => {
          if (e.ctrlKey && e.key.toLowerCase() === "k") {
              e.preventDefault();
              handleSpotlightClick();
          }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
          window.removeEventListener("keydown", handleKeyDown);
      };
  }, [showSpotlight]);

  const handleWatchlistClick = () => {
      setShowProfileMenu(false);

      dispatch(closeSpotlight())

      navigate("/watchlist");
  };
  return (
    <div className="fixed top-0 left-0  z-50 w-full bg-gradient-to-b from-black/90 to-transparent">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6 md:px-10 lg:px-12">
        <img className="w-28 sm:w-32 md:w-36 lg:w-40" src={LOGO} alt="netflix-logo"></img>

            {user && (
              <nav className="hidden lg:flex items-center gap-8">

                  <NavLink
                      to="/browse"
                      className={navLinkClass}
                      onClick={() => dispatch(closeSpotlight())}
                  >
                      Home
                  </NavLink>

                  <NavLink
                      to="/movies"
                      className={navLinkClass}
                      onClick={() => dispatch(closeSpotlight())}
                  >
                      Movies
                  </NavLink>

                  <NavLink
                      to="/tvshows"
                      className={navLinkClass}
                      onClick={() => dispatch(closeSpotlight())}
                  >
                      TV Shows
                  </NavLink>

                  <NavLink
                      to="/watchlist"
                      className={navLinkClass}
                      onClick={() => dispatch(closeSpotlight())}
                  >
                      Watchlist
                  </NavLink>

              </nav>
          )}

        {/* Right side buttons baad me */}
        {user && <div className="flex items-center gap-2 lg:gap-5">
          <button
            onClick={handleSpotlightClick}
            className="group flex items-center justify-center gap-2 h-10 w-10 md:w-auto md:px-3 rounded-xl bg-zinc-900/30 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-200 cursor-pointer"
          >
              <Search
                size={20}
                strokeWidth={2}
                className="text-zinc-400 group-hover:text-white"
              />

              <span className="hidden md:block text-sm">
                Search
              </span>

              <kbd className="hidden md:block ml-1 text-[11px] text-zinc-500 bg-zinc-800 border border-white/10 rounded-md px-1.5 py-0.5">
                Ctrl K
              </kbd>
          </button>
          <div className="relative">
            <button className="flex items-center gap-3 cursor-pointer" onClick={()=>setShowProfileMenu(prev=>!prev)}>
              <div className="border-2 border-white/20 rounded-md p-1">
                <img className="w-10 lg:w-12 rounded-md" src={user?.photoURL} alt="user-profile"></img>
              </div>
              <ChevronDown  strokeWidth={1.5} color="white" className={`transition-transform duration-300 ${showProfileMenu ? "rotate-180":""}`}/>
            </button>
            {/* menu */}
            {showProfileMenu && <div className="absolute right-0 top-20 w-60 lg:w-70 bg-zinc-900 border border-white/25 rounded-2xl text-white px-6">
                <div className="flex gap-5 py-6">
                  <img className="w-12 rounded-md" src={user?.photoURL} alt="user-profile"></img>
                  <div>
                    <h1>{user?.displayName}</h1>
                    <h6 className="text-gray-400 text-sm">{user?.email}</h6>
                  </div>
                </div>
                <button className="w-full border-amber-50/25 border-t border-b lg:border-b-0 py-6 " onClick={handleWatchlistClick}>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-5">
                      <Heart fill="red" size={20} color="red"/>
                      <h1 className="text-sm font-light lg:text-md">My Watchlist</h1>
                    </div>
                    <div className="px-3 py-1 rounded-xl bg-zinc-800 tracking-wide flex items-center justify-center text-sm font-light">{watchlistMovies.length}</div>
                  </div>
                </button>
                <button className="lg:hidden cursor-pointer text-white py-6  border-white flex gap-2 text-sm font-semibold" onClick={handleSignOut}>
                  <LogOut color="red" size={20}/>
                  Sign Out
                </button>
              </div>
            }
          </div>
          <button className="hidden lg:flex cursor-pointer text-white py-4 px-4 border-white flex gap-2 font-semibold" onClick={handleSignOut}>
            <LogOut color="red"/>
            Sign Out</button>
        </div>}
      </div>

      {showSpotlight && <SpotlightSearch />}
    </div>
  );
};

export default Header