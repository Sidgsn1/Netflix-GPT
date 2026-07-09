
export const checkValidData=(isSignInForm,name,email,password)=>{

    if(!isSignInForm){
        const fullNameValid = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/.test(name.trim());
        if(!fullNameValid) return "Invalid Name"
    }

    const isEmailValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const isPasswordValid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)

    if(!isEmailValid) return "Email ID is not valid"
    if(!isPasswordValid) return "Password is not valid"
    return null //means there is no problem both are valid
}