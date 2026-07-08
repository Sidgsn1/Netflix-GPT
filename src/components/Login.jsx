import { useState } from "react"
import Header from "./Header"

const Login=()=>{
    const [isSignInForm,setIsSignInForm]=useState(true)

    const toggleSignInForm=()=>{
        setIsSignInForm((prev)=>!prev)
    }
    return(
        <div className="relative h-screen overflow-hidden">
            <Header />
            <div className="relative">
                <img className="w-full h-full object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/2f42605e-e786-4a06-8612-ebc67c55ba6c/web/IN-en-20260629-TRIFECTA-perspective_76b17e8c-cff9-4c65-9938-08ca5029be6b_small.jpg" alt="background-img"></img>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.45),rgba(0,0,0,0.8))]"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <form className="w-full max-w-sm bg-black/80 rounded-sm p-10  text-white">
                    <h1 className="font-bold text-2xl mb-5">{isSignInForm?"Sign In":"Sign Up"}</h1>
                    <div className="flex flex-col gap-4">
                        {!isSignInForm && <input className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="text" placeholder="Full Name" />}
                        <input className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="text" placeholder="Email Address" />
                        <input className="w-full bg-zinc-900 text-gray-300 py-2 px-5 rounded-sm" type="password" placeholder="Password" />
                    </div>
                    <button className="w-full py-2 px-5 my-7 font-semibold bg-[#E50914] cursor-pointer rounded-sm">{isSignInForm?"Sign In":"Get Started"}</button>
                    <p className="text-sm text-gray-500">{isSignInForm ? "New To Netflix? ":"Already Registred? "}<span className="text-white cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "Sign Up Now":"Sign In Now"}</span></p>
                </form>
            </div>
        </div>
    )
}

export default Login