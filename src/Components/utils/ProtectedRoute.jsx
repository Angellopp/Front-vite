/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAllowed, children, redirectPath="/login" }) => { 
    if (!isAllowed) {
      return <Navigate to={redirectPath} />;
    }
    return children ? children : <Outlet />;
  };
