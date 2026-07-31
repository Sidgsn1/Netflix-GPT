import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const GuestRoute = ({ children }) => {

    const user = useSelector(store => store.user);

    if (user) {
        return <Navigate to="/browse" replace />;
    }

    return children;
}

export default GuestRoute;