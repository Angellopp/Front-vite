import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ children, path = "/login"}) => {
    if(!localStorage.getItem("user")) {
       return <Navigate to={path} />
    }
    return children ? children : <Outlet />
}

export default ProtectedRoute
