import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../utils/firebase"; 
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LOGIN_BG, USER_AVATAR } from "../utils/constants";

const Login=()=>{
    const [isSignInForm,setIsSignInForm] = useState(true)
    const [errorMessage,setErrorMessage] = useState(null)

    const dispatch=useDispatch()
    const googleProvider = new GoogleAuthProvider()

    const name=useRef(null)
    const email=useRef(null)
    const password=useRef(null)

    const toggleSignInForm=()=>{
        setIsSignInForm((prev)=>!prev)
        setErrorMessage(null)
    }

    const handleGoogleSignIn = async ()=>{
        try{
            await signInWithPopup(auth,googleProvider)
        }
        catch(error){
            setErrorMessage(error.code+" - "+error.message)
        }
    }

    const handleButtonClick=()=>{
        //validate the form
        const msg=checkValidData(isSignInForm,name.current?.value,email.current.value,password.current.value)
        setErrorMessage(msg)

        if(msg) return; //if msg is there means something was not valid (msg is not null)

        //Sign In and Sign Up Logic
        if(!isSignInForm){
            //sign Up logic
            createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
                .then((userCredential) => {

                const user = userCredential.user;
                //after user is created i will update 
                updateProfile(user, {
                    displayName: name.current.value, photoURL: USER_AVATAR
                }).then(() => {
                    // Profile updated!
                    //now update in the store also
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                    //will update my store by dispatching the action
                    dispatch(addUser({uid: uid, email: email, displayName: displayName,photoURL: photoURL}))
                }).catch((error) => {
                    // An error occurred
                    setErrorMessage(error.message)
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage)
            });
        }
        else{
            //sign In logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("sign in completed",user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" + errorMessage)
            });
        }

        
    }
    return(
        <div className="relative h-screen overflow-hidden">
            
            <Header />

            <div className="relative">
                <img className="w-full h-full object-cover" src={LOGIN_BG} alt="background-img"></img>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.45),rgba(0,0,0,0.8))]"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <form onSubmit={(e)=>e.preventDefault()} className="w-full max-w-sm bg-black/80 rounded-sm p-10 space-y-6 text-white">
                    <h1 className="font-bold text-2xl">{isSignInForm?"Sign In":"Sign Up"}</h1>
                    <div className="flex flex-col gap-4">
                        {!isSignInForm && <input ref={name} className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="text" placeholder="Full Name" />}
                        <input ref={email} className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="text" placeholder="Email Address" />
                        <input ref={password} className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="password" placeholder="Password" />
                    </div>
                    <p className="text-red-500">{errorMessage}</p>
                    <div className="flex justify-center items-center gap-2">
                        <div className="w-full bg-white h-0.5"></div>
                        OR
                        <div className="w-full bg-white h-0.5"></div>
                    </div>
                    <button type="button" className="w-full flex justify-center items-center gap-4 py-2 px-5 font-semibold text-black rounded-sm cursor-pointer bg-white hover:bg-zinc-400 transition"
                     onClick={handleGoogleSignIn}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5"/>
                        Continue With Google</button>
                    <button type="button" className="w-full py-2 px-5 font-semibold bg-[#E50914] cursor-pointer rounded-sm" onClick={handleButtonClick}>{isSignInForm?"Sign In":"Get Started"}</button>
                    <p className="text-sm text-gray-500">{isSignInForm ? "New To Netflix? ":"Already Registred? "}<span className="text-red-500 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "Sign Up Now":"Sign In Now"}</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login