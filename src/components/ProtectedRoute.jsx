import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {

    const user = useSelector(store => store.user);

    console.log(user);

    if(!user){
        return <Navigate to="/" />
    }

    return children;
}

export default ProtectedRoute;