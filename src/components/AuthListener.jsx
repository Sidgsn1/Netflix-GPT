import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const AuthListener = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {

                const { uid, email, displayName, photoURL } = user;

                dispatch(
                    addUser({
                        uid,
                        email,
                        displayName,
                        photoURL
                    })
                );
                console.log("authlistener display name and photo url",displayName,photoURL)

            } else {

                dispatch(removeUser());

            }
            

        });

        return () => unsubscribe();

    }, []);

    return null;
}

export default AuthListener;