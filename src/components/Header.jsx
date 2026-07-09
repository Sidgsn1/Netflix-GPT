import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate=useNavigate()
  const user=useSelector(store=>store.user)

  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")

    }).catch((error) => {
      // An error happened.
      navigate("/error")
    });
  }
  return (
    <div className="absolute top-0 left-0 z-20 w-full bg-gradient-to-b from-black/80 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-10 lg:px-12">
        <img className="w-28 sm:w-32 md:w-36 lg:w-40" src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAeuLioOK1ZSC8bQbffYbz1gZFxugAQdkx7UsMvqKDtFJLk3EWkpY-w8IBimYy_0xmg1aTzugh7JDHsGzv6hqIL9_qklFo-PFSH81MwCe9rokU4kGkdki.svg" alt="netflix-logo"></img>

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