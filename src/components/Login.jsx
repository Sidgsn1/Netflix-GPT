import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase"; 
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login=()=>{
    const [isSignInForm,setIsSignInForm] = useState(true)
    const [errorMessage,setErrorMessage] = useState(null)

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const name=useRef(null)
    const email=useRef(null)
    const password=useRef(null)

    const toggleSignInForm=()=>{
        setIsSignInForm((prev)=>!prev)
        setErrorMessage(null)
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
                // navigate("/browse")
                //after user is created i will update 
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://i.pinimg.com/736x/fd/a7/9a/fda79a9471d43a39d2d8eabc8720f8aa.jpg"
                }).then(() => {
                    // Profile updated!
                    //now update in the store also
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                    //will update my store by dispatching the action
                    dispatch(addUser({uid: uid, email: email, displayName: displayName,photoURL: photoURL}))
                    //now navigate
                    //if it is a successfull sign up then i will redirect from here
                    navigate("/browse")
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
                navigate("/browse")
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
                <img className="w-full h-full object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/2f42605e-e786-4a06-8612-ebc67c55ba6c/web/IN-en-20260629-TRIFECTA-perspective_76b17e8c-cff9-4c65-9938-08ca5029be6b_small.jpg" alt="background-img"></img>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.45),rgba(0,0,0,0.8))]"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <form onSubmit={(e)=>e.preventDefault()} className="w-full max-w-sm bg-black/80 rounded-sm p-10  text-white">
                    <h1 className="font-bold text-2xl mb-5">{isSignInForm?"Sign In":"Sign Up"}</h1>
                    <div className="flex flex-col gap-4">
                        {!isSignInForm && <input ref={name} className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="text" placeholder="Full Name" />}
                        <input ref={email} className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="text" placeholder="Email Address" />
                        <input ref={password} className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="password" placeholder="Password" />
                    </div>
                    <p className="text-red-500">{errorMessage}</p>
                    <button className="w-full py-2 px-5 my-7 font-semibold bg-[#E50914] cursor-pointer rounded-sm" onClick={handleButtonClick}>{isSignInForm?"Sign In":"Get Started"}</button>
                    <p className="text-sm text-gray-500">{isSignInForm ? "New To Netflix? ":"Already Registred? "}<span className="text-white cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "Sign Up Now":"Sign In Now"}</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login