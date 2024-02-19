/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import useVerifyToken from "../../api/useVerifyToken";

export const ProtectedRoute = ({ children, redirectPath="/login" }) => { 
    const { data: isAllowed } = useVerifyToken();
    if (!isAllowed) {
      return <Navigate to={redirectPath} />;
    }
    return children ? children : <Outlet />;
  };
