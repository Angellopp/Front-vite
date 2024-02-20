/* eslint-disable react/prop-types */
import { Navigate, Outlet , useLocation} from "react-router-dom";
import useVerifyToken from "../../api/useVerifyToken";
import Loading from "../indicators/Loading";
// import AuthForm from "../AuthForm";
// import Login from "../../Pages/Login";

export const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { data: isAllowed, isLoading } = useVerifyToken();
    if (isLoading) {
        return <Loading/>;
    }
    if (isAllowed) {
      return children ? <Navigate to={children.path}/> : <Outlet />;
    }
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
};
